import { createFileRoute } from "@tanstack/react-router";
import { Zap, TrendingUp, CreditCard, Wallet, Activity } from "lucide-react";

export const Route = createFileRoute("/dashboard/token")({
  head: () => ({
    meta: [
      { title: "Token — Northlight" },
      { name: "description", content: "Your tokens." },
    ],
  }),
  component: Token,
});

function Token() {
  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Token
        </h1>
        <p className="mt-1 text-sm text-mute">
          Manage your tokens and usage.
        </p>
      </div>

      {/* Token balance card */}
      <div className="rounded-[min(2vw,18px)] border border-black/5 bg-gradient-to-br from-ink to-ink/90 p-8 text-paper backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-gold/20">
            <Zap size={20} className="text-gold" />
          </div>
          <div>
            <p className="text-xs opacity-60">Token Balance</p>
            <p className="font-display text-4xl font-bold">12,450</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <TrendingUp size={14} className="text-emerald-400" />
          <span className="text-emerald-400">+15%</span>
          <span className="opacity-60">this month</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Activity, label: "Used Today", value: "342" },
          { icon: CreditCard, label: "This Month", value: "4.2K" },
          { icon: Wallet, label: "Last Month", value: "3.8K" },
        ].map((item, i) => (
          <div
            key={item.label}
            className="stagger-in rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-2">
              <item.icon size={16} className="text-gold" />
              <span className="text-xs text-mute">{item.label}</span>
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-ink">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Usage bar */}
      <div className="mt-6 rounded-[min(2vw,18px)] border border-black/5 bg-white/60 p-6 backdrop-blur-xl">
        <h3 className="font-display text-lg font-semibold text-ink">
          Monthly Usage
        </h3>
        <div className="mt-4 h-3 w-full rounded-full bg-black/5">
          <div className="bar-fill h-full rounded-full bg-gradient-to-r from-gold to-ink" style={{ width: "68%" }} />
        </div>
        <div className="mt-2 flex justify-between text-xs text-mute">
          <span>6,800 / 10,000 tokens</span>
          <span>68%</span>
        </div>
      </div>
    </div>
  );
}
