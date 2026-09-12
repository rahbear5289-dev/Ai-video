import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  LayoutDashboard,
  LogOut,
  Plus,
  Rocket,
  Settings,
  Users,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Northlight" },
      { name: "description", content: "Manage your launches on Northlight." },
    ],
  }),
  component: DashboardLayout,
});

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Launches", icon: Rocket, href: "/dashboard/launches" },
  { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { label: "Audience", icon: Users, href: "/dashboard/audience" },
  { label: "Schedule", icon: Calendar, href: "/dashboard/schedule" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/signin", replace: true });
    }
  }, [loading, user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/", replace: true });
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper">
        <div className="size-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </main>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-paper font-body">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-black/5 bg-white/60 backdrop-blur-xl md:flex ${
          sidebarOpen ? "" : "w-20"
        }`}
      >
        <div className="flex h-16 items-center border-b border-black/5 px-4">
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 hover:rotate-45">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="7" cy="7" r="2.5" fill="currentColor" />
                </svg>
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-ink">
                Northlight
              </span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto rounded-lg p-1.5 text-mute transition-colors hover:bg-black/5 hover:text-ink"
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-ink text-paper shadow-lg shadow-ink/20"
                    : "text-mute hover:bg-black/5 hover:text-ink"
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-black/5 p-3">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-mute transition-all duration-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} className="shrink-0" />
            {sidebarOpen && <span>Sign out</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <aside
            className="absolute left-0 top-0 h-full w-64 bg-white/95 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-16 items-center justify-between border-b border-black/5 px-4">
              <span className="font-display text-lg font-semibold text-ink">Northlight</span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="rounded-lg p-1.5 text-mute hover:bg-black/5"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <nav className="space-y-1 p-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.label;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveTab(item.label);
                      setMobileSidebarOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-ink text-paper"
                        : "text-mute hover:bg-black/5 hover:text-ink"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <div className="border-t border-black/5 p-3">
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileSidebarOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-mute hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={18} />
                Sign out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-black/5 bg-paper/80 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="rounded-lg p-2 text-mute hover:bg-black/5"
            >
              <LayoutDashboard size={20} />
            </button>
            <span className="font-display text-lg font-semibold text-ink">Northlight</span>
          </div>

          <div className="hidden items-center gap-2 text-sm text-mute md:flex">
            <span>Dashboard</span>
            <ChevronRight size={14} />
            <span className="text-ink font-medium">{activeTab}</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="hidden gap-2 rounded-full bg-ink text-paper hover:bg-ink/90 sm:flex"
            >
              <Plus size={16} />
              New Launch
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-sm font-semibold text-gold">
                {user.email?.charAt(0).toUpperCase() ?? "U"}
              </div>
              <span className="hidden text-sm font-medium text-ink md:block">
                {user.email?.split("@")[0] ?? "User"}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export function DashboardStats() {
  const stats = [
    {
      label: "Total Launches",
      value: "12",
      change: "+3 this month",
      icon: Rocket,
      color: "bg-gold/15 text-gold",
    },
    {
      label: "Active",
      value: "4",
      change: "Coming soon",
      icon: Clock,
      color: "bg-blue-500/15 text-blue-500",
    },
    {
      label: "Viewed",
      value: "48.2K",
      change: "+12% vs last month",
      icon: Users,
      color: "bg-emerald-500/15 text-emerald-500",
    },
    {
      label: "Avg. Wait Time",
      value: "2.4h",
      change: "-8% optimized",
      icon: BarChart3,
      color: "bg-purple-500/15 text-purple-500",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="rounded-[min(2vw,18px)] border-black/5 bg-white/60 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-mute">
                {stat.label}
              </CardTitle>
              <div className={`flex size-9 items-center justify-center rounded-full ${stat.color}`}>
                <Icon size={16} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-semibold text-ink">{stat.value}</div>
              <p className="mt-1 text-xs text-mute">{stat.change}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export function RecentLaunches() {
  const launches = [
    { name: "Aurora Frames", status: "Live", date: "Dec 15, 2025", views: "12.4K" },
    { name: "Quiet Signal", status: "Scheduled", date: "Jan 8, 2026", views: "8.1K" },
    { name: "Morrow Press", status: "Live", date: "Nov 22, 2025", views: "15.7K" },
    { name: "Velvet Night", status: "Draft", date: "—", views: "0" },
    { name: "Golden Hour", status: "Scheduled", date: "Feb 14, 2026", views: "3.2K" },
  ];

  const statusColors: Record<string, string> = {
    Live: "bg-emerald-500/15 text-emerald-600",
    Scheduled: "bg-gold/15 text-gold",
    Draft: "bg-mute/15 text-mute",
  };

  return (
    <Card className="mt-6 rounded-[min(2vw,18px)] border-black/5 bg-white/60 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-display text-lg text-ink">Recent Launches</CardTitle>
          <CardDescription>Your upcoming and past launches</CardDescription>
        </div>
        <Badge variant="secondary" className="rounded-full">
          {launches.length} total
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 text-xs uppercase tracking-wider text-mute">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium text-right">Views</th>
              </tr>
            </thead>
            <tbody>
              {launches.map((launch) => (
                <tr key={launch.name} className="border-b border-black/5 last:border-0">
                  <td className="py-3 font-medium text-ink">{launch.name}</td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        statusColors[launch.status as keyof typeof statusColors] ?? statusColors["Draft"]
                      }`}
                    >
                      {launch.status}
                    </span>
                  </td>
                  <td className="py-3 text-mute">{launch.date}</td>
                  <td className="py-3 text-right font-mono text-ink">{launch.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
