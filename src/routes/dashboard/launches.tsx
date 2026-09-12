import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Radio,
  Rocket,
  Video,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/launches")({
  head: () => ({
    meta: [
      { title: "Launches — Northlight" },
      { name: "description", content: "Manage your launches." },
    ],
  }),
  component: DashboardLaunches,
});

const launches = [
  { name: "Aurora Frames", date: "Dec 15, 2025", views: "12.4K", live: true },
  { name: "Quiet Signal", date: "Jan 8, 2026", views: "8.1K", live: false },
  { name: "Morrow Press", date: "Nov 22, 2025", views: "15.7K", live: true },
  { name: "Velvet Night", date: "Feb 14, 2026", views: "3.2K", live: false },
  { name: "Golden Hour", date: "Mar 3, 2026", views: "0", live: false },
];

function DashboardLaunches() {
  return (
    <div className="page-enter">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
            Launches
          </h1>
          <p className="mt-1 text-sm text-mute">
            Create, schedule, and manage your launches.
          </p>
        </div>
        <button className="cta-sheen flex gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5">
          <Rocket size={16} />
          New Launch
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {launches.map((launch, i) => (
          <div
            key={launch.name}
            className="rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-lg"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  {launch.name}
                </h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-mute">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {launch.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Radio size={12} />
                    {launch.views} views
                  </span>
                </div>
              </div>
              {launch.live ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Live
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold">
                  <Clock size={12} />
                  Scheduled
                </span>
              )}
            </div>

            <div className="mt-4 h-20 rounded-xl bg-black/[0.03]" />

            <div className="mt-4 flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs text-mute">
                <MapPin size={12} />
                Northlight Stage
              </span>
              <Link
                to="/dashboard"
                className="flex items-center gap-1 text-xs font-medium text-ink transition-opacity hover:opacity-60"
              >
                Manage <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[min(2vw,18px)] border border-black/5 bg-white/40 p-8 text-center backdrop-blur-xl">
        <Video size={32} className="mx-auto text-gold/40" />
        <p className="mt-3 text-sm text-mute">
          Stream your launch with Northlight&apos;s built-in video platform.
        </p>
        <button className="cta-sheen mt-4 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5">
          Start a Broadcast
        </button>
      </div>
    </div>
  );
}
