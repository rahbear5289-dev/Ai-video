import { createFileRoute } from "@tanstack/react-router";
import { Images, ZoomIn, Grid3X3, Film } from "lucide-react";

export const Route = createFileRoute("/dashboard/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Northlight" },
      { name: "description", content: "Your media gallery." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const items = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    title: `Media ${i + 1}`,
    type: i % 3 === 0 ? "video" : "image",
  }));

  return (
    <div className="page-enter">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
            Gallery
          </h1>
          <p className="mt-1 text-sm text-mute">
            All your media in one place.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg bg-white/60 p-2 text-mute ring-1 ring-black/5 backdrop-blur-xl transition-colors hover:text-ink">
            <Grid3X3 size={16} />
          </button>
          <button className="rounded-lg bg-white/60 p-2 text-mute ring-1 ring-black/5 backdrop-blur-xl transition-colors hover:text-ink">
            <Film size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-[min(2vw,16px)] border border-black/5 bg-white/60 aspect-video backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className={`h-full ${
              i % 5 === 0
                ? "bg-gradient-to-br from-gold/30 to-purple-200/30"
                : i % 3 === 0
                  ? "bg-gradient-to-br from-emerald-200/30 to-blue-200/30"
                  : "bg-gradient-to-br from-ink/5 to-gold/20"
            }`} />
            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex size-10 items-center justify-center rounded-full bg-white/80 transition-transform group-hover:scale-110">
                  <ZoomIn size={16} className="text-ink" />
                </div>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
              <span className="text-xs font-medium text-white">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
