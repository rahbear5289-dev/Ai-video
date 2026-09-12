import { createFileRoute } from "@tanstack/react-router";
import { Scissors, Play, Volume2, Film } from "lucide-react";

export const Route = createFileRoute("/dashboard/video-editor")({
  head: () => ({
    meta: [
      { title: "Video Editor — Northlight" },
      { name: "description", content: "Edit your videos." },
    ],
  }),
  component: VideoEditor,
});

function VideoEditor() {
  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Video Editor
        </h1>
        <p className="mt-1 text-sm text-mute">
          Professional editing tools powered by AI.
        </p>
      </div>

      {/* Editor layout */}
      <div className="grid gap-4 lg:grid-cols-4">
        {/* Tools sidebar */}
        <div className="stagger-in rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-4 backdrop-blur-xl">
          <h3 className="mb-3 font-display text-sm font-semibold text-ink">
            Tools
          </h3>
          <div className="space-y-1">
            {[
              { icon: Play, label: "Cut" },
              { icon: Scissors, label: "Trim" },
              { icon: Volume2, label: "Audio" },
              { icon: Film, label: "Effects" },
            ].map((tool) => (
              <button
                key={tool.label}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-mute transition-colors hover:bg-gold/15 hover:text-ink"
              >
                <tool.icon size={14} />
                {tool.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 stagger-in" style={{ animationDelay: "80ms" }}>
          <div className="rounded-[min(2vw,18px)] border border-black/5 bg-black/5 p-4 backdrop-blur-xl">
            <div className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-ink/10">
              <Play size={48} className="text-gold/40" />
            </div>
            <div className="mt-3 h-1 rounded-full bg-black/10">
              <div className="h-full w-1/3 rounded-full bg-gold" />
            </div>
          </div>
        </div>

        {/* Properties */}
        <div className="stagger-in rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-4 backdrop-blur-xl" style={{ animationDelay: "160ms" }}>
          <h3 className="mb-3 font-display text-sm font-semibold text-ink">
            Properties
          </h3>
          <div className="space-y-3">
            {["Resolution: 1080p", "FPS: 30", "Format: MP4", "Size: 24MB"].map(
              (prop) => (
                <div
                  key={prop}
                  className="flex justify-between text-xs"
                >
                  <span className="text-mute">{prop.split(":")[0]}</span>
                  <span className="text-ink">{prop.split(":")[1]}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
