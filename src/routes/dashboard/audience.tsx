import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  MapPin,
  MessageCircle,
  Share2,
  Smartphone,
  Target,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/audience")({
  head: () => ({
    meta: [
      { title: "Audience — Northlight" },
      { name: "description", content: "Manage your audience." },
    ],
  }),
  component: DashboardAudience,
});

function DashboardAudience() {
  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Audience
        </h1>
        <p className="mt-1 text-sm text-mute">
          Understand who&apos;s watching and where they come from.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Audience overview */}
        <div className="rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs text-mute">Total Audience</p>
              <p className="font-display text-2xl font-semibold text-ink">
                28.4K
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {[
              { label: "Returning", value: "62%", color: "bg-gold" },
              { label: "New", value: "38%", color: "bg-ink" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs text-mute">
                  <span>{s.label}</span>
                  <span>{s.value}</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-black/5">
                  <div
                    className={`h-full rounded-full ${s.color}`}
                    style={{ width: s.value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-gold">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-mute">Top Locations</p>
              <p className="font-display text-2xl font-semibold text-ink">
                12 Countries
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {[
              { country: "Pakistan", pct: 45 },
              { country: "USA", pct: 22 },
              { country: "UK", pct: 15 },
              { country: "UAE", pct: 10 },
            ].map((loc) => (
              <div key={loc.country}>
                <div className="flex justify-between text-xs">
                  <span className="text-ink">{loc.country}</span>
                  <span className="text-mute">{loc.pct}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-black/5">
                  <div
                    className="h-full rounded-full bg-ink"
                    style={{ width: `${loc.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div className="rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Smartphone size={20} />
            </div>
            <div>
              <p className="text-xs text-mute">Devices</p>
              <p className="font-display text-2xl font-semibold text-ink">
                Mobile First
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { label: "Mobile", pct: "78%" },
              { label: "Desktop", pct: "18%" },
              { label: "Tablet", pct: "3%" },
              { label: "TV", pct: "1%" },
            ].map((d) => (
              <div
                key={d.label}
                className="rounded-lg bg-black/[0.03] px-3 py-2"
              >
                <p className="text-xs text-mute">{d.label}</p>
                <p className="font-display text-lg font-semibold text-ink">
                  {d.pct}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement */}
        <div className="rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-gold">
              <MessageCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-mute">Engagement</p>
              <p className="font-display text-2xl font-semibold text-ink">
                High
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {[
              { icon: Mail, label: "Email Opens", val: "64%" },
              { icon: Share2, label: "Shares", val: "18%" },
              { icon: Target, label: " CTR", val: "24.7%" },
            ].map(({ icon: Icon, label, val }) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-lg bg-black/[0.03] px-3 py-2"
              >
                <span className="flex items-center gap-2 text-xs text-mute">
                  <Icon size={12} />
                  {label}
                </span>
                <span className="font-display text-sm font-semibold text-ink">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
