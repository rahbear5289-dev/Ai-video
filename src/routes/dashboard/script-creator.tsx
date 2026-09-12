import { createFileRoute } from "@tanstack/react-router";
import { FileText, Wand2, Copy, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/script-creator")({
  head: () => ({
    meta: [
      { title: "Script Creator — Northlight" },
      { name: "description", content: "Create scripts." },
    ],
  }),
  component: ScriptCreator,
});

function ScriptCreator() {
  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Script Creator
        </h1>
        <p className="mt-1 text-sm text-mute">
          Generate scripts with AI for your launches.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {[
          {
            icon: FileText,
            title: "Product Demo",
            desc: "Showcase your product features",
          },
          {
            icon: Wand2,
            title: "Brand Story",
            desc: "Tell your brand's journey",
          },
          {
            icon: Copy,
            title: "Ad Copy",
            desc: "Short and punchy ad scripts",
          },
        ].map((item, i) => (
          <div
            key={item.title}
            className="stagger-in rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-gold">
              <item.icon size={20} />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-mute">{item.desc}</p>
            <button className="cta-sheen mt-4 rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5">
              Generate
            </button>
          </div>
        ))}
      </div>

      {/* Script editor */}
      <div className="mt-6 rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">
            Script Editor
          </h3>
          <button className="flex items-center gap-1 rounded-full bg-gold/15 px-3 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold/25">
            <Plus size={12} />
            New Scene
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {["Scene 1: Hook — 15s", "Scene 2: Problem — 20s", "Scene 3: Solution — 30s"].map(
            (scene, i) => (
              <div
                key={scene}
                className="row-in flex items-center justify-between rounded-lg bg-black/[0.03] px-4 py-3 transition-all duration-300 hover:bg-black/[0.06]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="text-sm text-ink">{scene}</span>
                <span className="text-xs text-gold"> AI</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
