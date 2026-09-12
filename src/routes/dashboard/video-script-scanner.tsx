import { createFileRoute } from "@tanstack/react-router";
import { ScanLine, FileVideo, AlertCircle, CheckCircle2, Camera } from "lucide-react";

export const Route = createFileRoute("/dashboard/video-script-scanner")({
  head: () => ({
    meta: [
      { title: "Video Script Scanner — Northlight" },
      { name: "description", content: "Scan video scripts." },
    ],
  }),
  component: VideoScriptScanner,
});

function VideoScriptScanner() {
  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Video Script Scanner
        </h1>
        <p className="mt-1 text-sm text-mute">
          Upload a script and get AI-powered analysis.
        </p>
      </div>

      {/* Upload area */}
      <div className="stagger-in rounded-[min(2vw,18px)] border-2 border-dashed border-black/10 bg-white/40 p-12 text-center backdrop-blur-xl transition-all duration-300 hover:bg-white/60 hover:-translate-y-0.5">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gold/15">
          <ScanLine size={28} className="text-gold" />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-ink">
          Drop your script here
        </h3>
        <p className="mt-1 text-sm text-mute">
          Or click to upload a .txt or .docx file
        </p>
        <button className="cta-sheen mt-4 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5">
          <Camera size={14} className="mr-1 inline" />
          Browse Files
        </button>
      </div>

      {/* Analysis results */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { icon: CheckCircle2, label: "Pacing", value: "92%", color: "text-emerald-500" },
          { icon: AlertCircle, label: "Engagement", value: "78%", color: "text-gold" },
          { icon: FileVideo, label: "Word Count", value: "342", color: "text-ink" },
        ].map((item, i) => (
          <div
            key={item.label}
            className="stagger-in rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-2">
              <item.icon size={16} className={item.color} />
              <span className="text-xs text-mute">{item.label}</span>
            </div>
            <div className={`mt-1 font-display text-2xl font-bold ${item.color}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="mt-6 rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl">
        <h3 className="font-display text-lg font-semibold text-ink">
          Suggestions
        </h3>
        <ul className="mt-4 space-y-2">
          {[
            "Add a stronger hook in first 3 seconds",
            "Reduce word density by 15%",
            "Include a call-to-action at the end",
          ].map((suggestion) => (
            <li key={suggestion} className="flex items-start gap-2 text-sm text-mute">
              <AlertCircle size={14} className="mt-0.5 shrink-0 text-gold" />
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
