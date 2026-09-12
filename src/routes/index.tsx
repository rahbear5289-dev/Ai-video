import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Hero,
  head: () => ({
    meta: [
      {
        title: "Northlight 2.0 — The stage is set for your brightest launch",
      },
      {
        name: "description",
        content:
          "A launch platform that turns the wait into the moment. Position, focus, and reveal — each release lands exactly when the light is on you.",
      },
      {
        property: "og:title",
        content: "Northlight 2.0 — The stage is set for your brightest launch",
      },
      {
        property: "og:description",
        content:
          "A launch platform that turns the wait into the moment. Position, focus, and reveal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Hero() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-paper font-body">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="bg-drift absolute -top-40 left-1/2 h-[120vh] w-[160vw] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 42%, rgba(207,152,54,0.20) 0%, rgba(243,239,231,0) 60%), radial-gradient(80% 70% at 50% 80%, rgba(23,20,15,0.10) 0%, rgba(243,239,231,0) 55%)",
          }}
        />
        <div
          className="beam absolute left-1/2 top-0 h-[70vh] w-[38vw] -translate-x-1/2"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,255,255,0))",
            filter: "blur(6px)",
          }}
        />
        <div className="absolute left-1/2 top-0 h-[140vh] w-px -translate-x-1/2 bg-gradient-to-b from-white/60 via-white/10 to-transparent" />
      </div>

      {/* Floating frosted shards */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="floaty absolute left-[8%] top-[22%] h-40 w-40 rounded-[min(3vw,28px)] bg-white/40 ring-1 ring-black/5 backdrop-blur-xl"
          style={{ animationDelay: "-2s" }}
        />
        <div
          className="floaty absolute right-[10%] top-[30%] h-28 w-28 rounded-[min(2vw,22px)] bg-gold/10 ring-1 ring-black/5 backdrop-blur-xl"
          style={{ animationDelay: "-5s" }}
        />
        <div
          className="floaty absolute left-[16%] bottom-[16%] h-24 w-24 rounded-[min(2vw,22px)] bg-white/30 ring-1 ring-black/5 backdrop-blur-xl"
          style={{ animationDelay: "-7s" }}
        />
        <div
          className="floaty absolute right-[18%] bottom-[20%] h-16 w-16 rounded-[min(1.6vw,18px)] bg-white/40 ring-1 ring-black/5 backdrop-blur-xl"
          style={{ animationDelay: "-3.5s" }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        {/* Eyebrow */}
        <div
          className="hero-anim mb-8 flex items-center gap-3 rounded-full bg-white/50 px-4 py-1.5 ring-1 ring-black/5 backdrop-blur-md"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="size-1.5 rounded-full bg-gold" />
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-mute">
            Introducing Northlight 2.0
          </span>
        </div>

        {/* Headline */}
        <h1
          className="hero-anim font-display text-[clamp(2.9rem,9vw,7rem)] font-medium leading-[0.95] tracking-[-0.02em] text-ink"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="block max-w-[16ch] text-balance">The stage is</span>
          <span className="block max-w-[16ch] text-balance italic text-gold">
            set for your
          </span>
          <span className="block max-w-[16ch] text-balance">brightest launch.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="hero-anim mt-8 max-w-[46ch] text-base leading-relaxed text-mute sm:text-lg"
          style={{ animationDelay: "0.35s" }}
        >
          A launch platform that turns the wait into the moment. Position, focus, and
          reveal — each release lands exactly when the light is on you.
        </p>

        {/* CTA cluster */}
        <div
          className="hero-anim mt-10 flex flex-col items-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.5s" }}
        >
          <a
            href="#"
            className="cta-sheen group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-paper ring-1 ring-gold/40 transition-transform duration-300 hover:-translate-y-0.5"
          >
            See the reveal
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-white/40 px-6 py-3.5 text-sm font-medium text-ink ring-1 ring-black/5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span aria-hidden="true">◷</span>
            Watch the 90-sec film
          </a>
        </div>

        {/* Frosted stat panel */}
        <div
          className="panel-anim mt-16 w-full max-w-2xl rounded-[min(2.5vw,22px)] bg-white/35 p-2 ring-1 ring-black/5 backdrop-blur-2xl"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="grid grid-cols-3 divide-x divide-black/5">
            <div className="px-4 py-6">
              <div className="font-display text-3xl font-medium text-ink">1.2M</div>
              <div className="mt-1 text-xs uppercase tracking-[0.14em] text-mute">
                Reveals hosted
              </div>
            </div>
            <div className="px-4 py-6">
              <div className="font-display text-3xl font-medium text-ink">48ms</div>
              <div className="mt-1 text-xs uppercase tracking-[0.14em] text-mute">
                Spotlight lag
              </div>
            </div>
            <div className="px-4 py-6">
              <div className="font-display text-3xl font-medium text-ink">99.98%</div>
              <div className="mt-1 text-xs uppercase tracking-[0.14em] text-mute">
                On-cue uptime
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
