import { initTRPC, TRPCError } from "@trpc/server";
import { count, eq } from "drizzle-orm";
import { createClient } from "@supabase/supabase-js";

import { db } from "@/db";
import { agents, meetings, user } from "@/db/schema";
import { polarClient } from "@/lib/polar";
import { MAX_FREE_AGENTS, MAX_FREE_MEETINGS } from "@/modules/premium/constants";

export interface TRPCAuthUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export interface TRPCContext {
  req?: Request;
  auth?: {
    user: TRPCAuthUser;
  };
}

export const createTRPCContext = async (req?: Request): Promise<TRPCContext> => {
  if (!req) {
    return {};
  }

  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : null;

  const supabaseUrl = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
  const supabaseKey = process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

  if (token && supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase.auth.getUser(token);

      if (!error && data?.user) {
        const sbUser = data.user;
        const meta = (sbUser.user_metadata || {}) as Record<string, unknown>;
        const userName =
          (typeof meta["full_name"] === "string" && meta["full_name"]) ||
          (typeof meta["name"] === "string" && meta["name"]) ||
          sbUser.email?.split("@")[0] ||
          "User";
        const userEmail = sbUser.email || `${sbUser.id}@user.local`;
        const userImage = typeof meta["avatar_url"] === "string" ? meta["avatar_url"] : null;

        // Upsert user to Neon DB to keep relational foreign keys intact
        try {
          await db
            .insert(user)
            .values({
              id: sbUser.id,
              name: userName,
              email: userEmail,
              image: userImage,
            })
            .onConflictDoUpdate({
              target: user.id,
              set: {
                name: userName,
                image: userImage,
                updatedAt: new Date(),
              },
            });
        } catch (dbError) {
          console.warn("[tRPC] Warning: Could not upsert user to Neon DB:", dbError);
        }

        return {
          req,
          auth: {
            user: {
              id: sbUser.id,
              name: userName,
              email: userEmail,
              image: userImage,
            },
          },
        };
      }
    } catch (e) {
      console.warn("[tRPC] Token verification failed:", e);
    }
  }

  return { req };
};

const t = initTRPC.context<TRPCContext>().create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  if (!ctx.auth?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }

  return next({
    ctx: {
      ...ctx,
      auth: ctx.auth,
    },
  });
});

export const premiumProcedure = (entity: "meetings" | "agents") =>
  protectedProcedure.use(async ({ ctx, next }) => {
    let isPremium = false;

    if (process.env["POLAR_ACCESS_TOKEN"]) {
      try {
        const customer = await polarClient.customers.getStateExternal({
          externalId: ctx.auth.user.id,
        });
        isPremium = (customer.activeSubscriptions?.length ?? 0) > 0;
      } catch {
        // Fallback gracefully if Polar account has no customer yet
      }
    }

    const [userMeetings] = await db
      .select({
        count: count(meetings.id),
      })
      .from(meetings)
      .where(eq(meetings.userId, ctx.auth.user.id));

    const [userAgents] = await db
      .select({
        count: count(agents.id),
      })
      .from(agents)
      .where(eq(agents.userId, ctx.auth.user.id));

    const isFreeAgentLimitReached = (userAgents?.count ?? 0) >= MAX_FREE_AGENTS;
    const isFreeMeetingLimitReached = (userMeetings?.count ?? 0) >= MAX_FREE_MEETINGS;

    const shouldThrowMeetingError =
      entity === "meetings" && isFreeMeetingLimitReached && !isPremium;
    const shouldThrowAgentError =
      entity === "agents" && isFreeAgentLimitReached && !isPremium;

    if (shouldThrowMeetingError) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You have reached the maximum number of free meetings",
      });
    }

    if (shouldThrowAgentError) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You have reached the maximum number of free agents",
      });
    }

    return next({ ctx });
  });
