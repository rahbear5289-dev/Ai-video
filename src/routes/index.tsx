import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  component: HomePage,
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

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <nav
          className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
            scrolled
              ? "bg-white/60 shadow-[0_8px_30px_rgba(23,20,15,0.08)] ring-1 ring-black/5 backdrop-blur-2xl"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:rotate-45">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="7" cy="7" r="2.5" fill="currentColor" />
              </svg>
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              Northlight
            </span>
          </a>

          {/* Links */}
          <div className="hidden items-center gap-1 md:flex">
            {[
              ["Features", "#features"],
              ["Showcase", "#showcase"],
              ["Pricing", "#pricing"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="rounded-full px-4 py-2 text-sm font-medium text-mute transition-colors duration-300 hover:bg-black/5 hover:text-ink"
              >
                {label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#pricing"
              className="hidden text-sm font-medium text-ink transition-opacity hover:opacity-60 sm:block"
            >
              Sign in
            </a>
            <a
              href="#pricing"
              className="cta-sheen rounded-full px-5 py-2.5 text-sm font-semibold text-paper ring-1 ring-gold/40 transition-transform duration-300 hover:-translate-y-0.5"
            >
              Get started
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal>
        <div className="inline-flex items-center gap-3 rounded-full bg-white/50 px-4 py-1.5 ring-1 ring-black/5 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-gold" />
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-mute">
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ink text-balance">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={220}>
        <p className="mt-5 text-base leading-relaxed text-mute sm:text-lg">{sub}</p>
      </Reveal>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: "◉",
      title: "Timed spotlight",
      text: "Schedule your reveal down to the second. The stage lights rise exactly when your audience is watching.",
    },
    {
      icon: "◧",
      title: "Cinematic pages",
      text: "Launch pages that feel like title sequences — typography, motion, and sound composed into one moment.",
    },
    {
      icon: "◔",
      title: "Live anticipation",
      text: "Countdown rooms, waitlists, and whisper campaigns. Build tension before the curtain lifts.",
    },
    {
      icon: "◫",
      title: "Reveal analytics",
      text: "Watch the spike as it happens. Every view, share, and conversion measured from first light.",
    },
  ];

  return (
    <section id="features" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Features"
          title={
            <>
              Everything the launch needs, <span className="italic text-gold">nothing it doesn't.</span>
            </>
          }
          sub="Four instruments, tuned to a single performance. No clutter backstage."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 110}>
              <div className="group h-full rounded-[min(2.5vw,22px)] bg-white/35 p-7 ring-1 ring-black/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/55 hover:shadow-[0_20px_50px_rgba(23,20,15,0.08)]">
                <div className="flex size-11 items-center justify-center rounded-full bg-gold/15 text-lg text-gold transition-transform duration-500 group-hover:scale-110">
                  <span aria-hidden="true">{f.icon}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-medium text-ink">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mute">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseSection() {
  return (
    <section id="showcase" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Showcase"
          title={
            <>
              Launches that <span className="italic text-gold">owned the light.</span>
            </>
          }
          sub="A few of the moments staged on Northlight — each one landing on cue."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {[
            {
              name: "Aurora Frames",
              tag: "Hardware · 214k viewers",
              grad: "from-[oklch(0.82_0.1_80)] to-[oklch(0.6_0.13_60)]",
              big: true,
            },
            {
              name: "Quiet Signal",
              tag: "App · 96k viewers",
              grad: "from-[oklch(0.88_0.05_95)] to-[oklch(0.72_0.09_85)]",
            },
            {
              name: "Morrow Press",
              tag: "Editorial · 58k viewers",
              grad: "from-[oklch(0.8_0.06_70)] to-[oklch(0.55_0.1_75)]",
            },
          ].map((c, i) => (
            <Reveal key={c.name} delay={i * 130} className={c.big ? "md:row-span-1" : ""}>
              <a
                href="#showcase"
                className="group relative block h-72 overflow-hidden rounded-[min(2.5vw,22px)] ring-1 ring-black/5 md:h-80"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${c.grad} transition-transform duration-700 group-hover:scale-105`}
                />
                <div className="floaty absolute right-6 top-6 h-16 w-16 rounded-2xl bg-white/40 ring-1 ring-black/5 backdrop-blur-xl" style={{ animationDelay: `${i * -2}s` }} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/30 to-transparent p-6 pt-16">
                  <div className="font-display text-2xl font-medium text-white">{c.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.14em] text-white/80">
                    {c.tag}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Rehearsal",
      price: "$0",
      note: "For the first dress run",
      items: ["1 staged launch", "Countdown room", "Basic analytics"],
      featured: false,
    },
    {
      name: "Opening Night",
      price: "$49",
      note: "Per launch, fully lit",
      items: ["Cinematic launch pages", "Live anticipation tools", "Reveal analytics", "Priority spotlight"],
      featured: true,
    },
    {
      name: "Residency",
      price: "$299",
      note: "Monthly, unlimited stages",
      items: ["Unlimited launches", "Custom domains", "Team backstage", "Dedicated showrunner"],
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Pick your <span className="italic text-gold">seat in the house.</span>
            </>
          }
          sub="Start free in the rehearsal room. Upgrade when the lights matter."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <div
                className={`relative h-full rounded-[min(2.5vw,22px)] p-8 ring-1 transition-transform duration-500 hover:-translate-y-1.5 ${
                  p.featured
                    ? "bg-ink text-paper ring-gold/40 shadow-[0_24px_60px_rgba(23,20,15,0.22)]"
                    : "bg-white/35 ring-black/5 backdrop-blur-xl"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                    Most staged
                  </span>
                )}
                <h3 className={`font-display text-lg font-medium ${p.featured ? "text-paper" : "text-ink"}`}>
                  {p.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className={`font-display text-5xl font-medium ${p.featured ? "text-paper" : "text-ink"}`}>
                    {p.price}
                  </span>
                </div>
                <p className={`mt-1 text-sm ${p.featured ? "text-paper/70" : "text-mute"}`}>{p.note}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.items.map((item) => (
                    <li key={item} className={`flex items-center gap-2.5 text-sm ${p.featured ? "text-paper/85" : "text-mute"}`}>
                      <span className="text-gold" aria-hidden="true">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#pricing"
                  className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 ${
                    p.featured
                      ? "bg-gold text-ink"
                      : "bg-ink text-paper"
                  }`}
                >
                  Choose {p.name}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      q: "How fast can I stage a launch?",
      a: "Most teams go from blank stage to scheduled reveal in under an hour. Templates handle the composition; you bring the moment.",
    },
    {
      q: "Can I rehearse before opening night?",
      a: "Yes — every launch gets a private rehearsal mode. Preview the full reveal, timing included, with your team before anyone else sees it.",
    },
    {
      q: "What happens if something goes wrong on cue?",
      a: "99.98% on-cue uptime, plus an automatic hold: if a dependency fails, the stage waits instead of showing a broken scene.",
    },
    {
      q: "Do you support custom domains?",
      a: "On Residency, yes. Your reveal lives on your stage, with your name on the marquee.",
    },
  ];

  return (
    <section id="faq" className="relative px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions from <span className="italic text-gold">backstage.</span>
            </>
          }
          sub="Everything people ask before the curtain rises."
        />
        <div className="mt-14 space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 90}>
              <details className="faq-item group rounded-[min(2vw,18px)] bg-white/35 ring-1 ring-black/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(23,20,15,0.07)] open:bg-white/60 open:ring-gold/30">
                <summary className="flex cursor-pointer list-none items-center justify-between px-7 py-5 font-display text-lg font-medium text-ink transition-colors [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    className="ml-4 flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold transition-all duration-500 group-open:rotate-[225deg] group-open:bg-gold group-open:text-ink"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="faq-body overflow-hidden">
                  <p className="px-7 pb-6 text-sm leading-relaxed text-mute">{f.a}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const columns = [
    {
      title: "Product",
      links: ["Features", "Showcase", "Pricing", "Changelog"],
    },
    {
      title: "Company",
      links: ["About", "Journal", "Careers", "Press kit"],
    },
    {
      title: "Support",
      links: ["Help center", "Status", "Contact", "FAQ"],
    },
  ];

  return (
    <footer className="relative px-6 pb-10 pt-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="overflow-hidden rounded-[min(2.5vw,22px)] bg-ink text-paper ring-1 ring-gold/30">
            {/* Top row */}
            <div className="grid gap-12 p-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:p-14">
              {/* Brand */}
              <div>
                <a href="#top" className="group flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-500 group-hover:rotate-45">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="7" cy="7" r="2.5" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="font-display text-xl font-semibold tracking-tight">
                    Northlight
                  </span>
                </a>
                <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-paper/60">
                  A launch platform that turns the wait into the moment. Every
                  release, exactly on cue.
                </p>
                <div className="mt-6 flex items-center gap-2">
                  {["𝕏", "in", "▶"].map((s) => (
                    <a
                      key={s}
                      href="#top"
                      className="flex size-9 items-center justify-center rounded-full bg-white/10 text-sm text-paper/80 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-gold hover:text-ink"
                      aria-label={`Social link ${s}`}
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>

              {/* Link columns */}
              {columns.map((col) => (
                <div key={col.title}>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    {col.title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#top"
                          className="footer-link relative inline-block text-sm text-paper/70 transition-colors duration-300 hover:text-paper"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 px-10 py-6 sm:flex-row md:px-14">
              <p className="text-xs text-paper/50">
                © 2026 Northlight. Every launch, on cue.
              </p>
              <div className="flex items-center gap-6 text-xs text-paper/50">
                <a href="#top" className="transition-colors hover:text-paper">
                  Privacy
                </a>
                <a href="#top" className="transition-colors hover:text-paper">
                  Terms
                </a>
                <span className="flex items-center gap-2">
                  <span className="status-dot size-1.5 rounded-full bg-gold" />
                  All systems on cue
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
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
            href="#pricing"
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
            href="#showcase"
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

      {/* Scroll hint */}
      <a
        href="#features"
        className="hero-anim absolute bottom-8 left-1/2 -translate-x-1/2 text-mute transition-colors hover:text-ink"
        style={{ animationDelay: "1s" }}
        aria-label="Scroll to features"
      >
        <div className="scroll-hint mx-auto h-10 w-6 rounded-full ring-1 ring-black/10" />
      </a>
    </section>
  );
}

function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-paper font-body">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <ShowcaseSection />
      <PricingSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
