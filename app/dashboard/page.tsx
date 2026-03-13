"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Settings,
  BarChart3,
  Activity,
  TrendingUp,
  UserPlus,
  Shield,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  Bell,
} from "lucide-react";
import { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent } from "@/registry/liquid-glass/glass-tabs";
import { WidgetCarousel } from "@/components/carousel/WidgetCarousel";

const tabs = [
  { value: "dashboard", icon: LayoutDashboard, label: "Dashboard", bg: "tab-bg-ocean" },
  { value: "analytics", icon: BarChart3, label: "Analytics", bg: "tab-bg-aurora" },
  { value: "users", icon: Users, label: "Users", bg: "tab-bg-forest" },
  { value: "projects", icon: FolderKanban, label: "Projects", bg: "tab-bg-sunset" },
  { value: "settings", icon: Settings, label: "Settings", bg: "tab-bg-midnight" },
];

const glowClasses = {
  cyan: "widget-glow-cyan",
  purple: "widget-glow-purple",
  blue: "widget-glow-blue",
  pink: "widget-glow-pink",
  green: "widget-glow-green",
};

const iconColors = {
  cyan: "text-cyan-400",
  purple: "text-purple-400",
  blue: "text-blue-400",
  pink: "text-pink-400",
  green: "text-emerald-400",
};

// Dashboard widgets - Ocean theme (Cyan+Blue)
const dashboardWidgets = [
  { icon: Activity, title: "Active Sessions", value: "1,234", change: "+12%" },
  { icon: TrendingUp, title: "Revenue", value: "$45.2K", change: "+8.3%" },
  { icon: UserPlus, title: "New Users", value: "89", change: "+24%" },
  { icon: Shield, title: "Security Score", value: "98%", change: "+2%" },
];

// Analytics widgets - Aurora theme (Purple+Pink)
const analyticsWidgets = [
  { icon: BarChart3, title: "Page Views", value: "45.2K", change: "+18%" },
  { icon: TrendingUp, title: "Conversion Rate", value: "3.2%", change: "+0.5%" },
  { icon: Activity, title: "Bounce Rate", value: "32%", change: "-4%" },
  { icon: Clock, title: "Avg. Session", value: "4m 32s", change: "+12s" },
];

// Users widgets - Forest theme (Emerald+Teal)
const usersWidgets = [
  { icon: Users, title: "Total Users", value: "12,453", change: "+156" },
  { icon: UserPlus, title: "Active Today", value: "2,341", change: "+89" },
  { icon: Shield, title: "Verified", value: "89%", change: "+3%" },
  { icon: Bell, title: "Pending Reviews", value: "23", change: "-5" },
];

// Projects widgets - Sunset theme (Pink+Amber)
const projectsWidgets = [
  { icon: FolderKanban, title: "Active Projects", value: "24", change: "+3" },
  { icon: Cpu, title: "In Progress", value: "12", change: "+2" },
  { icon: HardDrive, title: "Completed", value: "156", change: "+8" },
  { icon: Clock, title: "Due This Week", value: "5", change: "-2" },
];

// Settings widgets - Midnight theme (Blue+Indigo)
const settingsWidgets = [
  { icon: Database, title: "Storage Used", value: "45.2 GB", change: "+2.1 GB" },
  { icon: Cpu, title: "API Calls", value: "1.2M", change: "+120K" },
  { icon: Wifi, title: "Uptime", value: "99.9%", change: "0%" },
  { icon: Shield, title: "Last Backup", value: "2h ago", change: "On schedule" },
];

interface WidgetCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  change: string;
  glowColor: "cyan" | "purple" | "blue" | "pink" | "green";
}

function WidgetCard({ icon: Icon, title, value, change, glowColor }: WidgetCardProps) {
  const isPositive = change.startsWith("+");
  const isNegative = change.startsWith("-");

  return (
    <div className={`w-full rounded-2xl backdrop-blur-xl p-4 ${glowClasses[glowColor]}`}>
      <div className="flex items-center justify-between mb-3">
        <Icon className={`h-5 w-5 ${iconColors[glowColor]}`} />
        <span
          className={`text-xs font-medium ${
            isPositive ? "text-emerald-400" : isNegative ? "text-rose-400" : "text-white/50"
          }`}
        >
          {change}
        </span>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-white/60">{title}</div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const currentTab = tabs.find((t) => t.value === activeTab);

  return (
    <GlassTabs
      value={activeTab}
      onValueChange={setActiveTab}
      className={`min-h-screen ${currentTab?.bg || "bg-background"} pt-16 flex flex-col transition-all duration-500`}
    >
      {/* Background grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Tab Content - Fills available space */}
      <div className="flex-1 relative z-10 overflow-auto p-6">
        <GlassTabsContent value="dashboard" className="h-full m-0 mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h2>
              <p className="text-white/60">Monitor your system performance and key metrics</p>
            </div>
            <WidgetCarousel>
              {dashboardWidgets.map((widget, index) => (
                <WidgetCard key={index} {...widget} glowColor="cyan" />
              ))}
            </WidgetCarousel>
          </div>
        </GlassTabsContent>

        <GlassTabsContent value="analytics" className="h-full m-0 mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Analytics</h2>
              <p className="text-white/60">Track your performance and growth metrics</p>
            </div>
            <WidgetCarousel>
              {analyticsWidgets.map((widget, index) => (
                <WidgetCard key={index} {...widget} glowColor="purple" />
              ))}
            </WidgetCarousel>
          </div>
        </GlassTabsContent>

        <GlassTabsContent value="users" className="h-full m-0 mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Users</h2>
              <p className="text-white/60">Manage your team and user accounts</p>
            </div>
            <WidgetCarousel>
              {usersWidgets.map((widget, index) => (
                <WidgetCard key={index} {...widget} glowColor="green" />
              ))}
            </WidgetCarousel>
          </div>
        </GlassTabsContent>

        <GlassTabsContent value="projects" className="h-full m-0 mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Projects</h2>
              <p className="text-white/60">View and manage your active projects</p>
            </div>
            <WidgetCarousel>
              {projectsWidgets.map((widget, index) => (
                <WidgetCard key={index} {...widget} glowColor="pink" />
              ))}
            </WidgetCarousel>
          </div>
        </GlassTabsContent>

        <GlassTabsContent value="settings" className="h-full m-0 mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
              <p className="text-white/60">Configure your preferences and system options</p>
            </div>
            <WidgetCarousel>
              {settingsWidgets.map((widget, index) => (
                <WidgetCard key={index} {...widget} glowColor="blue" />
              ))}
            </WidgetCarousel>
          </div>
        </GlassTabsContent>
      </div>

      {/* Floating Tab Bar - Bottom */}
      <div className="sticky bottom-0 z-20 flex justify-center pb-6 pt-4">
        <GlassTabsList className="flex items-center justify-center gap-1 px-2">
          {tabs.map((tab) => (
            <GlassTabsTrigger
              key={tab.value}
              value={tab.value}
              className="p-3"
              title={tab.label}
            >
              <tab.icon className="h-5 w-5" />
            </GlassTabsTrigger>
          ))}
        </GlassTabsList>
      </div>
    </GlassTabs>
  );
}
