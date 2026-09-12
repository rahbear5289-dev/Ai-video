import { createFileRoute } from "@tanstack/react-router";
import {
  AlarmClock,
  Calendar,
  CheckCircle2,
  Clock,
  Hourglass,
  MapPin,
  Radio,
  Rocket,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule — Northlight" },
      { name: "description", content: "Schedule your launches." },
    ],
  }),
  component: DashboardSchedule,
});

  const events: { name: string; date: string; time: string; status: string }[] = [
  { name: "Aurora Frames", date: "Today", time: "3:00 PM", status: "live" },
  { name: "Quiet Signal", date: "Tomorrow", time: "10:00 AM", status: "scheduled" },
  { name: "Team Review", date: "Jan 5, 2026", time: "2:00 PM", status: "scheduled" },
  { name: "Morrow Press", date: "Jan 8, 2026", time: "6:00 PM", status: "scheduled" },
  { name: "Velvet Night", date: "Feb 14, 2026", time: "8:00 PM", status: "draft" },
];

function DashboardSchedule() {
  return (
    <div className="page-enter">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
            Schedule
          </h1>
          <p className="mt-1 text-sm text-mute">
            Plan and manage upcoming launches.
          </p>
        </div>
        <button className="cta-sheen flex gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5">
          <Rocket size={16} />
          Schedule Launch
        </button>
      </div>

      {/* Calendar placeholder */}
      <div className="rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">
            January 2026
          </h3>
          <div className="flex items-center gap-2 text-sm text-mute">
            <Clock size={14} />
            <span>All times are local</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-mute">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <span key={d} className="font-medium">
              {d}
            </span>
          ))}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
            const hasEvent = [8, 15].includes(d);
            return (
              <span
                key={d}
                className={`rounded-lg py-2 transition-colors ${
                  d === 15
                    ? "bg-gold text-ink font-semibold"
                    : hasEvent
                      ? "bg-ink/10 text-ink font-medium"
                      : "hover:bg-black/5"
                }`}
              >
                {d}
              </span>
            );
          })}
        </div>
      </div>

      {/* Upcoming */}
      <div className="mt-6 rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl">
        <h3 className="font-display text-lg font-semibold text-ink">
          Upcoming
        </h3>
        <div className="mt-4 space-y-3">
          {events.map((event, i) => (
            <div
              key={event.name}
              className="flex items-center justify-between rounded-xl bg-black/[0.03] px-4 py-3 transition-all hover:bg-black/[0.06]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-ink text-paper">
                  <span className="text-[9px] font-bold uppercase leading-none">
                    {event.date.slice(0, 3)}
                  </span>
                  <span className="text-sm font-display font-bold leading-none">
                    {event.date === "Today"
                      ? "Today"
                      : event.date === "Tomorrow"
                        ? "Tom"
                        : event?.date?.split(",")[0]?.split(" ")[1] ?? ""}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{event.name}</p>
                  <p className="flex items-center gap-1 text-xs text-mute">
                    <MapPin size={10} />
                    {event.time} · Northlight Stage
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {event.status === "live" ? (
                  <span className="flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-0.5 text-xs font-semibold text-red-600">
                    <Radio size={10} />
                    Live Now
                  </span>
                ) : event.status === "scheduled" ? (
                  <span className="flex items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold">
                    <AlarmClock size={10} />
                    Scheduled
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 rounded-full bg-mute/15 px-2.5 py-0.5 text-xs font-semibold text-mute">
                    <Hourglass size={10} />
                    Draft
                  </span>
                )}
                {event.status === "live" && (
                  <CheckCircle2 size={16} className="text-emerald-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
