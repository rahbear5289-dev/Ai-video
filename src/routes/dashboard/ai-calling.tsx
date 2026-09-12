import { createFileRoute } from "@tanstack/react-router";
import { Phone, PhoneCall, PhoneOutgoing, PhoneIncoming, Voicemail } from "lucide-react";

export const Route = createFileRoute("/dashboard/ai-calling")({
  head: () => ({
    meta: [
      { title: "AI Calling — Northlight" },
      { name: "description", content: "AI powered calling." },
    ],
  }),
  component: AICalling,
});

function AICalling() {
  const calls = [
    { name: "John Smith", type: "outgoing", duration: "3:24", status: "completed" },
    { name: "Sarah Jones", type: "incoming", duration: "1:45", status: "completed" },
    { name: "Mike Brown", type: "missed", duration: "—", status: "missed" },
    { name: "Lisa Davis", type: "outgoing", duration: "5:12", status: "completed" },
  ];

  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          AI Calling
        </h1>
        <p className="mt-1 text-sm text-mute">
          AI-powered phone calls for outreach and support.
        </p>
      </div>

      {/* Call buttons */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: PhoneOutgoing, label: "Make Call", desc: "Call anyone", color: "bg-ink text-paper" },
          { icon: PhoneIncoming, label: "Receive", desc: "AI answers", color: "bg-gold text-ink" },
          { icon: Voicemail, label: "Voicemail", desc: "AI leaves message", color: "bg-emerald-500/15 text-emerald-600" },
        ].map((item) => (
          <button
            key={item.label}
            className="rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/80"
          >
            <div className={`mx-auto flex size-12 items-center justify-center rounded-full ${item.color}`}>
              <item.icon size={22} />
            </div>
            <h3 className="mt-3 font-display text-base font-semibold text-ink">
              {item.label}
            </h3>
            <p className="mt-1 text-xs text-mute">{item.desc}</p>
          </button>
        ))}
      </div>

      {/* Call history */}
      <div className="mt-6 rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl">
        <h3 className="font-display text-lg font-semibold text-ink">
          Call History
        </h3>
        <div className="mt-4 space-y-2">
          {calls.map((call) => (
            <div
              key={call.name}
              className="flex items-center justify-between rounded-lg bg-black/[0.03] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className={`flex size-8 items-center justify-center rounded-full ${
                  call.status === "missed" ? "bg-red-500/15 text-red-600" : "bg-gold/15 text-gold"
                }`}>
                  {call.type === "outgoing" ? <PhoneOutgoing size={12} /> : <PhoneIncoming size={12} />}
                </div>
                <span className="text-sm font-medium text-ink">{call.name}</span>
              </div>
              <span className="text-xs text-mute">{call.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
