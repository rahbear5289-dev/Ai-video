import { createFileRoute } from "@tanstack/react-router";
import { AICallingSuite } from "@/components/dashboard/ai-calling";

export const Route = createFileRoute("/dashboard/ai-calling")({
  head: () => ({
    meta: [
      { title: "AI Calling & Agents — Northlight" },
      {
        name: "description",
        content:
          "Manage AI agent personas, schedule meetings, and launch real-time video calls with automated summaries and transcripts.",
      },
    ],
  }),
  component: AICallingPage,
});

function AICallingPage() {
  return <AICallingSuite />;
}
