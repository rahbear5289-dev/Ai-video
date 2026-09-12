import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/video-creator")({
  head: () => ({
    meta: [
      { title: "Video Creator — Northlight" },
      { name: "description", content: "Create videos." },
    ],
  }),
  component: VideoCreator,
});

function VideoCreator() {
  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Video Creator
        </h1>
        <p className="mt-1 text-sm text-mute">
          Create stunning videos with AI-powered templates.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {[
          { title: "Templates", desc: "Choose from 200+ templates", icon: "📋" },
          { title: "Upload", desc: "Upload your own footage", icon: "📤" },
          { title: "AI Generate", desc: "Let AI create for you", icon: "🤖" },
        ].map((item, i) => (
          <div
            key={item.title}
            className="stagger-in rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-8 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/80"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gold/15 text-3xl">
              {item.icon}
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-mute">{item.desc}</p>
            <button className="cta-sheen mt-4 rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5">
              Start Now
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl">
        <h3 className="font-display text-lg font-semibold text-ink">
          Recent Projects
        </h3>
        <div className="mt-4 space-y-3">
          {["Product Demo", "Brand Story", "Launch Teaser"].map((name, i) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-lg bg-black/[0.03] px-4 py-3 row-in transition-all duration-300 hover:bg-black/[0.06]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-sm font-medium text-ink">{name}</span>
              <span className="text-xs text-gold"> editing</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
