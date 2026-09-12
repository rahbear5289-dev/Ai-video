import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  Moon,
  Palette,
  Shield,
  User,
  Volume2,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Northlight" },
      { name: "description", content: "Account settings." },
    ],
  }),
  component: DashboardSettings,
});

function DashboardSettings() {
  const [dark, setDark] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Settings
        </h1>
        <p className="mt-1 text-sm text-mute">
          Manage your account and preferences.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Profile */}
        <div className="stagger-in rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-gold">
              <User size={20} />
            </div>
            <h3 className="font-display text-lg font-semibold text-ink">
              Profile
            </h3>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-xs text-mute">Display Name</label>
              <input
                type="text"
                defaultValue="User"
                className="mt-1 w-full rounded-xl bg-black/[0.04] px-3 py-2.5 text-sm text-ink ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-gold/60"
              />
            </div>
            <div>
              <label className="text-xs text-mute">Email</label>
              <input
                type="email"
                defaultValue="user@northlight.app"
                disabled
                className="mt-1 w-full cursor-not-allowed rounded-xl bg-black/[0.02] px-3 py-2.5 text-sm text-mute ring-1 ring-black/10"
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="stagger-in rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Palette size={20} />
            </div>
            <h3 className="font-display text-lg font-semibold text-ink">
              Appearance
            </h3>
          </div>
          <div className="mt-4 space-y-3">
            <button
              onClick={() => setDark(!dark)}
              className="flex w-full items-center justify-between rounded-xl bg-black/[0.04] px-4 py-3"
            >
              <span className="flex items-center gap-2 text-sm text-ink">
                <Moon size={14} />
                Dark Mode
              </span>
              <div
                className={`h-5 w-9 rounded-full transition-colors ${
                  dark ? "bg-ink" : "bg-black/20"
                }`}
              >
                <div
                  className={`h-4 w-4 translate-y-0.5 rounded-full bg-white transition-transform ${
                    dark ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </div>
            </button>
            <button className="flex w-full items-center justify-between rounded-xl bg-black/[0.04] px-4 py-3">
              <span className="flex items-center gap-2 text-sm text-ink">
                <Volume2 size={14} />
                Sound Effects
              </span>
              <ChevronDown size={14} className="text-mute" />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="stagger-in rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: "160ms" }}>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Bell size={20} />
            </div>
            <h3 className="font-display text-lg font-semibold text-ink">
              Notifications
            </h3>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setNotifications(!notifications)}
              className="flex w-full items-center justify-between rounded-xl bg-black/[0.04] px-4 py-3"
            >
              <span className="text-sm text-ink">Launch Reminders</span>
              <div
                className={`h-5 w-9 rounded-full transition-colors ${
                  notifications ? "bg-gold" : "bg-black/20"
                }`}
              >
                <div
                  className={`h-4 w-4 translate-y-0.5 rounded-full bg-white transition-transform ${
                    notifications ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="stagger-in rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: "240ms" }}>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Shield size={20} />
            </div>
            <h3 className="font-display text-lg font-semibold text-ink">
              Security
            </h3>
          </div>
          <div className="mt-4 space-y-3">
            <button className="cta-sheen w-full rounded-full bg-ink py-2.5 text-sm font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5">
              Change Password
            </button>
            <button className="w-full rounded-full bg-red-50 py-2.5 text-sm font-medium text-red-600 ring-1 ring-red-200 transition-all hover:bg-red-100">
              Sign Out All Devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
