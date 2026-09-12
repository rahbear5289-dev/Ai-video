import { createFileRoute } from "@tanstack/react-router";
import { Brain, Sparkles, Zap, Layers, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/add-ai-model")({
  head: () => ({
    meta: [
      { title: "Add AI Model — Northlight" },
      { name: "description", content: "Add AI models." },
    ],
  }),
  component: AddAIModel,
});

function AddAIModel() {
  const models = [
    { name: "GPT-4o", provider: "OpenAI", status: "Connected", color: "bg-emerald-500/15 text-emerald-600" },
    { name: "Claude 3.5", provider: "Anthropic", status: "Connected", color: "bg-emerald-500/15 text-emerald-600" },
    { name: "Gemini Pro", provider: "Google", status: "Available", color: "bg-gold/15 text-gold" },
    { name: "Llama 3", provider: "Meta", status: "Available", color: "bg-gold/15 text-gold" },
    { name: "Mistral Large", provider: "Mistral", status: "Available", color: "bg-gold/15 text-gold" },
  ];

  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Add AI Model
        </h1>
        <p className="mt-1 text-sm text-mute">
          Connect AI models to power your features.
        </p>
      </div>

      <div className="grid gap-3">
        {models.map((model, i) => (
          <div
            key={model.name}
            className="stagger-in flex items-center justify-between rounded-[min(2vw,14px)] border border-black/5 bg-white/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-xl bg-ink/5">
                <Brain size={22} className="text-ink/60" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-ink">
                  {model.name}
                </h3>
                <p className="text-xs text-mute">{model.provider}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${model.color}`}>
                {model.status}
              </span>
              {model.status === "Available" && (
                <button className="cta-sheen rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5">
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 flex items-center gap-2 rounded-[min(2vw,14px)] border border-dashed border-black/10 bg-white/40 px-5 py-4 text-sm font-medium text-mute backdrop-blur-xl transition-colors hover:bg-white/60">
        <Sparkles size={16} />
        Add Custom Model
      </button>
    </div>
  );
}
