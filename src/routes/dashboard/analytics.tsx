import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUp,
  BarChart2,
  Eye,
  MousePointer,
  TrendingUp,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Northlight" },
      { name: "description", content: "View launch analytics." },
    ],
  }),
  component: DashboardAnalytics,
});

function DashboardAnalytics() {
  const metrics = [
    { label: "Total Views", value: "48.2K", change: "+12%", up: true, icon: Eye },
    { label: "Unique Visitors", value: "31.8K", change: "+8%", up: true, icon: Users },
    { label: "Avg. Watch Time", value: "4m 23s", change: "-3%", up: false, icon: BarChart2 },
    { label: "Click Rate", value: "24.7%", change: "+5%", up: true, icon: MousePointer },
  ];

  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-mute">
          Track performance across all your launches.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="stagger-in rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-mute">
                  {m.label}
                </span>
                <div className="flex size-9 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon size={16} />
                </div>
              </div>
              <div className="mt-3 font-display text-3xl font-semibold text-ink">
                {m.value}
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                {m.up ? (
                  <ArrowUp size={12} className="text-emerald-500" />
                ) : (
                  <ArrowDown size={12} className="text-red-500" />
                )}
                <span className={m.up ? "text-emerald-600" : "text-red-500"}>
                  {m.change}
                </span>
                <span className="text-mute">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart placeholder */}
      <div className="mt-6 rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">
            Views Over Time
          </h3>
          <span className="text-xs text-mute">Last 30 days</span>
        </div>
        <div className="mt-4 flex items-end gap-2 h-40">
          {[40, 65, 50, 80, 55, 90, 70, 100, 75, 85, 60, 95].map((h, i) => (
            <div
              key={i}
              className="chart-bar flex-1 rounded-t-lg bg-gold/30 transition-all duration-500 hover:bg-gold/50"
              style={{
                height: `${h}%`,
                animationDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-mute">
          <span>Jan 1</span>
          <span>Jan 15</span>
          <span>Jan 30</span>
        </div>
      </div>

      {/* Top launches */}
      <div className="mt-6 rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl">
        <h3 className="font-display text-lg font-semibold text-ink">
          Top Performing
        </h3>
        <div className="mt-4 space-y-3">
          {["Aurora Frames", "Morrow Press", "Quiet Signal"].map((name, i) => (
            <div
              key={name}
              className="row-in flex items-center justify-between rounded-lg bg-black/[0.03] px-4 py-3 transition-all duration-300 hover:bg-black/[0.06]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs font-bold text-paper">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-ink">{name}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gold">
                <TrendingUp size={12} />
                +{35 - i * 10}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
