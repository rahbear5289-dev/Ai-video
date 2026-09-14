import "dotenv/config";
// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

/**
 * Dev-only Vite plugin that intercepts /api/* requests and routes them to the
 * same handlers that server.ts uses in production, so tRPC calls work in dev.
 */
function devApiPlugin(): Plugin {
  return {
    name: "dev-api-handler",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? "";

        // Only intercept /api/* paths
        if (!url.startsWith("/api/")) return next();

        try {
          // Build a real Request object from the Node.js IncomingMessage
          const host = (req.headers["host"] as string) || "localhost:8080";
          const protocol = "http";
          const fullUrl = `${protocol}://${host}${url}`;

          const chunks: Buffer[] = [];
          await new Promise<void>((resolve, reject) => {
            req.on("data", (chunk: Buffer) => chunks.push(chunk));
            req.on("end", resolve);
            req.on("error", reject);
          });

          const body =
            req.method !== "GET" && req.method !== "HEAD" && chunks.length > 0
              ? Buffer.concat(chunks)
              : undefined;

          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (value === undefined) continue;
            if (Array.isArray(value)) {
              value.forEach((v) => headers.append(key, v));
            } else {
              headers.set(key, value);
            }
          }

          const request = new Request(fullUrl, {
            method: req.method || "GET",
            headers,
            body: body as BodyInit | undefined,
            // @ts-ignore — Node 18+ supports duplex
            duplex: body ? "half" : undefined,
          });

          // Dynamically import server handlers (so Vite can HMR them)
          let response: Response | undefined;

          if (url.startsWith("/api/trpc")) {
            const { fetchRequestHandler } = await server.ssrLoadModule(
              "@trpc/server/adapters/fetch",
            );
            const { appRouter } = await server.ssrLoadModule(
              "/src/trpc/routers/_app",
            );
            const { createTRPCContext } = await server.ssrLoadModule(
              "/src/trpc/init",
            );
            response = await fetchRequestHandler({
              endpoint: "/api/trpc",
              req: request,
              router: appRouter,
              createContext: () => createTRPCContext(request),
            });
          } else if (url === "/api/webhook") {
            const { handleWebhookRequest } = await server.ssrLoadModule(
              "/src/server/webhook",
            );
            response = await handleWebhookRequest(request);
          } else if (url.startsWith("/api/inngest")) {
            const { serve } = await server.ssrLoadModule("inngest/edge");
            const { inngest } = await server.ssrLoadModule(
              "/src/inngest/client",
            );
            const { meetingsProcessing } = await server.ssrLoadModule(
              "/src/inngest/functions",
            );
            const handler = serve({
              client: inngest,
              functions: [meetingsProcessing],
            });
            response = await handler(request);
          }

          if (!response) return next();

          // Write the Response back to Node's ServerResponse
          res.statusCode = response.status;
          response.headers.forEach((value, key) => {
            res.setHeader(key, value);
          });
          const buffer = await response.arrayBuffer();
          res.end(Buffer.from(buffer));
        } catch (err) {
          console.error("[dev-api-handler] Error:", err);
          next(err as Error);
        }
      });
    },
  };
}

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "pkce-challenge": "pkce-challenge/dist/index.node.js",
      },
    },
    plugins: [devApiPlugin()],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
