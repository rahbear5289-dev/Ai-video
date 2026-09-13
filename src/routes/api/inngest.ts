import { createAPIFileRoute } from "@tanstack/react-start/api";
import { serve } from "inngest/edge";

import { inngest } from "@/inngest/client";
import { meetingsProcessing } from "@/inngest/functions";

const handler = serve({
  client: inngest,
  functions: [meetingsProcessing],
});

export const APIRoute = createAPIFileRoute("/api/inngest")({
  GET: async ({ request }) => handler(request),
  POST: async ({ request }) => handler(request),
  PUT: async ({ request }) => handler(request),
});
