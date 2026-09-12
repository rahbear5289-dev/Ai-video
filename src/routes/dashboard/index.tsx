import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Calendar,
  LayoutDashboard,
  LayoutGrid,
  MessageSquare,
  Phone,
  Rocket,
  ScanLine,
  Settings,
  Sparkles,
  Users,
  Video,
  Zap,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { DashboardStats, RecentLaunches } from "../dashboard";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Overview — Northlight" },
      { name: "description", content: "Dashboard overview." },
    ],
  }),
  component: DashboardOverview,
});

const pages = [
  { label: "Overview", icon: LayoutDashboard, to: "/dashboard", desc: "Stats & recent activity" },
  { label: "Launches", icon: Rocket, to: "/dashboard/launches", desc: "Manage your launches" },
  { label: "Analytics", icon: BarChart3, to: "/dashboard/analytics", desc: "Performance insights" },
  { label: "Audience", icon: Users, to: "/dashboard/audience", desc: "Who's watching" },
  { label: "Schedule", icon: Calendar, to: "/dashboard/schedule", desc: "Upcoming events" },
  { label: "Video Creator", icon: Video, to: "/dashboard/video-creator", desc: "Create videos" },
  { label: "Video Editor", icon: Video, to: "/dashboard/video-editor", desc: "Edit videos" },
  { label: "Script Creator", icon: FileText, to: "/dashboard/script-creator", desc: "Create scripts" },
  { label: "Add AI Model", icon: Sparkles, to: "/dashboard/add-ai-model", desc: "Connect AI models" },
  { label: "Image Generator", icon: ImageIcon, to: "/dashboard/image-generator", desc: "Generate images" },
  { label: "AI Calling", icon: Phone, to: "/dashboard/ai-calling", desc: "AI phone calls" },
  { label: "AI Chatting", icon: MessageSquare, to: "/dashboard/ai-chatting", desc: "Chat with AI" },
  { label: "Script Scanner", icon: ScanLine, to: "/dashboard/video-script-scanner", desc: "Scan scripts" },
  { label: "Gallery", icon: LayoutGrid, to: "/dashboard/gallery", desc: "Your media" },
  { label: "Token", icon: Zap, to: "/dashboard/token", desc: "Your tokens" },
];

function DashboardOverview() {
  return (
    <div className="page-enter">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Overview
        </h1>
        <p className="mt-1 text-sm text-mute">
          Welcome back. Here&apos;s what&apos;s happening with your launches.
        </p>
      </div>

      <DashboardStats />
      <RecentLaunches />

      <div className="mt-8">
        <h2 className="mb-4 font-display text-lg font-semibold text-ink">
          All Pages
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page, i) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.label}
                to={page.to}
                className="group flex items-center gap-3 rounded-[min(2vw,14px)] border border-black/5 bg-white/60 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-lg"
                style={{ animationDelay: `${i * 50}ms` }}
                viewTransition
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold transition-transform duration-300 group-hover:scale-110">
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-ink">
                    {page.label}
                  </h3>
                  <p className="truncate text-[11px] text-mute">{page.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
