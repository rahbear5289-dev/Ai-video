import { createFileRoute } from "@tanstack/react-router";

import { CallView } from "@/modules/call/ui/views/call-view";

export const Route = createFileRoute("/call/$meetingId")({
  head: () => ({
    meta: [
      { title: "AI Call Room — Northlight" },
      { name: "description", content: "Join your AI-powered video meeting." },
    ],
  }),
  component: CallPage,
});

function CallPage() {
  const { meetingId } = Route.useParams();

  return (
    <div className="h-screen w-full overflow-hidden bg-[#101213]">
      <CallView meetingId={meetingId} />
    </div>
  );
}
