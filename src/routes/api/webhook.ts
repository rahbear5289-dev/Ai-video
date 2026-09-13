import { createAPIFileRoute } from "@tanstack/react-start/api";

import { handleWebhookRequest } from "@/server/webhook";

export const APIRoute = createAPIFileRoute("/api/webhook")({
  POST: async ({ request }) => {
    return handleWebhookRequest(request);
  },
});
