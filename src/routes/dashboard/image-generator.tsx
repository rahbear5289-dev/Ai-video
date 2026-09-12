import { createFileRoute } from "@tanstack/react-router";
import { Image as ImageIcon, Wand2, Upload, Download, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/image-generator")({
  head: () => ({
    meta: [
      { title: "Image Generator — Northlight" },
      { name: "description", content: "Generate images." },
    ],
  }),
  component: ImageGenerator,
});

function ImageGenerator() {
  const images = [
    { id: 1, prompt: "Modern product on white background", seed: "a1b2" },
    { id: 2, prompt: "Abstract gradient art", seed: "c3d4" },
    { id: 3, prompt: "Tech dashboard UI mockup", seed: "e5f6" },
    { id: 4, prompt: "Mountain landscape at sunset", seed: "g7h8" },
    { id: 5, prompt: "Brand logo concept", seed: "i9j0" },
    { id: 6, prompt: "Minimalist illustration", seed: "k1l2" },
  ];

  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Image Generator
        </h1>
        <p className="mt-1 text-sm text-mute">
          Create AI-generated images from text prompts.
        </p>
      </div>

      {/* Prompt input */}
      <div className="rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Describe the image you want..."
            className="flex-1 rounded-xl bg-black/[0.04] px-4 py-3 text-sm text-ink ring-1 ring-black/10 placeholder:text-mute/50 focus:outline-none focus:ring-2 focus:ring-gold/60"
          />
          <button className="cta-sheen flex gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5">
            <Wand2 size={16} />
            Generate
          </button>
        </div>
      </div>

      {/* Gallery */}
      <h3 className="mb-4 mt-6 font-display text-lg font-semibold text-ink">
        Generated Images
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <div
            key={img.id}
            className="stagger-in media-zoom group overflow-hidden rounded-[min(2vw,16px)] border border-black/5 bg-white/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="aspect-video bg-gradient-to-br from-gold/20 via-ink/5 to-purple-100" />
            <div className="p-3">
              <p className="truncate text-xs text-mute">{img.prompt}</p>
              <div className="mt-2 flex items-center justify-between">
                <button className="rounded bg-black/5 px-2 py-1 text-[10px] text-mute transition-colors hover:bg-black/10">
                  <Upload size={10} className="inline" />
                </button>
                <button className="rounded bg-black/5 px-2 py-1 text-[10px] text-mute transition-colors hover:bg-black/10">
                  <Download size={10} className="inline" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
