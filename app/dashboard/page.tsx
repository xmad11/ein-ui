"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Settings,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Target,
  Calendar,
  Bell,
  Search,
  ChevronRight,
} from "lucide-react";
import { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent } from "@/registry/liquid-glass/glass-tabs";
import { StockTickerWidget } from "@/registry/widgets/stock-widget";
import { ForecastWidget } from "@/registry/widgets/weather-widget";
import { DigitalClockWidget } from "@/registry/widgets/clock-widget";
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/registry/liquid-glass/glass-card";
import { GlassButton } from "@/registry/liquid-glass/glass-button";
import { GlassBadge } from "@/registry/liquid-glass/glass-badge";
import { GlassProgress } from "@/registry/liquid-glass/glass-progress";

const tabs = [
  { value: "users", icon: Users, label: "Users", color: "cyan" },
  { value: "dashboard", icon: LayoutDashboard, label: "Dashboard", color: "blue" },
  { value: "analytics", icon: BarChart3, label: "Analytics", color: "purple" },
  { value: "projects", icon: FolderKanban, label: "Projects", color: "emerald" },
  { value: "settings", icon: Settings, label: "Settings", color: "amber" },
];

const forecastData = [
  { day: "Mon", high: 31, low: 24, condition: "sunny" as const },
  { day: "Tue", high: 29, low: 23, condition: "cloudy" as const },
  { day: "Wed", high: 27, low: 22, condition: "rainy" as const },
  { day: "Thu", high: 30, low: 24, condition: "sunny" as const },
  { day: "Fri", high: 32, low: 25, condition: "sunny" as const },
];

// Tab-specific background gradients using project colors
const tabBackgrounds: Record<string, string> = {
  users: "from-cyan-950/30 via-slate-950 to-slate-950",
  dashboard: "from-blue-950/30 via-slate-950 to-slate-950",
  analytics: "from-purple-950/30 via-slate-950 to-slate-950",
  projects: "from-emerald-950/30 via-slate-950 to-slate-950",
  settings: "from-amber-950/30 via-slate-950 to-slate-950",
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("users"); // Users as default

  return (
    <GlassTabs
      value={activeTab}
      onValueChange={setActiveTab}
      className={`min-h-screen bg-gradient-to-br ${tabBackgrounds[activeTab]} pt-16 flex flex-col transition-all duration-500`}
    >
      {/* Background grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Tab Content - Fills available space */}
      <div className="flex-1 relative z-10 overflow-auto p-6">
        {/* Users Tab - Default */}
        <GlassTabsContent value="users" className="h-full m-0 mt-0">
          <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
            <StockTickerWidget symbol="AAPL" price={198.45} change={2.34} changePercent={1.19} />
            <ForecastWidget forecast={forecastData} />
            <DigitalClockWidget showSeconds={false} className="w-full" />
          </div>
        </GlassTabsContent>

        {/* Dashboard Tab */}
        <GlassTabsContent value="dashboard" className="h-full m-0 mt-0">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <GlassCard className="p-4">
                <div className="flex items-center gap-2 text-cyan-400 mb-2">
                  <Activity className="h-4 w-4" />
                  <span className="text-xs text-white/50">Revenue</span>
                </div>
                <div className="text-2xl font-bold text-white">$24.5K</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" /> +12.5%
                </div>
              </GlassCard>
              <GlassCard className="p-4">
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <Users className="h-4 w-4" />
                  <span className="text-xs text-white/50">Users</span>
                </div>
                <div className="text-2xl font-bold text-white">1,234</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" /> +8.2%
                </div>
              </GlassCard>
              <GlassCard className="p-4">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <Target className="h-4 w-4" />
                  <span className="text-xs text-white/50">Goals</span>
                </div>
                <div className="text-2xl font-bold text-white">89%</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" /> +3.1%
                </div>
              </GlassCard>
              <GlassCard className="p-4">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <Zap className="h-4 w-4" />
                  <span className="text-xs text-white/50">Performance</span>
                </div>
                <div className="text-2xl font-bold text-white">98.2%</div>
                <div className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3" /> -0.3%
                </div>
              </GlassCard>
            </div>

            {/* Progress Section */}
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle>Weekly Progress</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Development</span>
                    <span className="text-white">85%</span>
                  </div>
                  <GlassProgress value={85} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Design</span>
                    <span className="text-white">92%</span>
                  </div>
                  <GlassProgress value={92} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Testing</span>
                    <span className="text-white">67%</span>
                  </div>
                  <GlassProgress value={67} />
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>
        </GlassTabsContent>

        {/* Analytics Tab */}
        <GlassTabsContent value="analytics" className="h-full m-0 mt-0">
          <div className="max-w-4xl mx-auto space-y-4">
            <GlassCard>
              <GlassCardHeader>
                <div className="flex items-center justify-between">
                  <GlassCardTitle>Traffic Overview</GlassCardTitle>
                  <GlassBadge variant="primary">Live</GlassBadge>
                </div>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-3xl font-bold text-white">45.2K</div>
                    <div className="text-xs text-white/50 mt-1">Page Views</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-3xl font-bold text-white">3.2K</div>
                    <div className="text-xs text-white/50 mt-1">Unique Visitors</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-3xl font-bold text-white">2:34</div>
                    <div className="text-xs text-white/50 mt-1">Avg. Session</div>
                  </div>
                </div>
              </GlassCardContent>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GlassCard>
                <GlassCardHeader>
                  <GlassCardTitle>Top Sources</GlassCardTitle>
                </GlassCardHeader>
                <GlassCardContent className="space-y-3">
                  {[
                    { source: "Google", percent: 45 },
                    { source: "Direct", percent: 28 },
                    { source: "Twitter", percent: 15 },
                    { source: "GitHub", percent: 12 },
                  ].map((item) => (
                    <div key={item.source} className="flex items-center justify-between">
                      <span className="text-white/70">{item.source}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                        <span className="text-white/50 text-sm w-10">{item.percent}%</span>
                      </div>
                    </div>
                  ))}
                </GlassCardContent>
              </GlassCard>

              <GlassCard>
                <GlassCardHeader>
                  <GlassCardTitle>Recent Activity</GlassCardTitle>
                </GlassCardHeader>
                <GlassCardContent className="space-y-3">
                  {[
                    { action: "New user signup", time: "2 min ago" },
                    { action: "Project deployed", time: "15 min ago" },
                    { action: "Report generated", time: "1 hour ago" },
                    { action: "Settings updated", time: "3 hours ago" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-white/70">{item.action}</span>
                      <span className="text-white/40 text-sm">{item.time}</span>
                    </div>
                  ))}
                </GlassCardContent>
              </GlassCard>
            </div>
          </div>
        </GlassTabsContent>

        {/* Projects Tab */}
        <GlassTabsContent value="projects" className="h-full m-0 mt-0">
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { name: "Ein UI Dashboard", status: "In Progress", progress: 85, color: "cyan" },
              { name: "Mobile App Redesign", status: "Review", progress: 92, color: "purple" },
              { name: "API Integration", status: "In Progress", progress: 60, color: "blue" },
              { name: "Documentation", status: "Completed", progress: 100, color: "emerald" },
            ].map((project) => (
              <GlassCard key={project.name} className="hover:bg-white/5 transition-colors cursor-pointer">
                <GlassCardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-${project.color}-400`} />
                      <span className="text-white font-medium">{project.name}</span>
                    </div>
                    <GlassBadge variant={project.status === "Completed" ? "success" : "default"}>
                      {project.status}
                    </GlassBadge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${project.color}-500 rounded-full transition-all`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-white/50 text-sm">{project.progress}%</span>
                  </div>
                </GlassCardContent>
              </GlassCard>
            ))}
          </div>
        </GlassTabsContent>

        {/* Settings Tab */}
        <GlassTabsContent value="settings" className="h-full m-0 mt-0">
          <div className="max-w-2xl mx-auto space-y-4">
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle>General Settings</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="space-y-4">
                {[
                  { label: "Email Notifications", description: "Receive email updates" },
                  { label: "Push Notifications", description: "Enable push alerts" },
                  { label: "Auto-save", description: "Automatically save changes" },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div>
                      <div className="text-white font-medium">{setting.label}</div>
                      <div className="text-white/50 text-sm">{setting.description}</div>
                    </div>
                    <div className="w-12 h-6 bg-white/20 rounded-full p-1 cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                ))}
              </GlassCardContent>
            </GlassCard>

            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle>Account</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="space-y-3">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                    U
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">User Account</div>
                    <div className="text-white/50 text-sm">user@example.com</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/40" />
                </div>
              </GlassCardContent>
            </GlassCard>
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
              className="group"
            >
              <tab.icon className="h-4 w-4" />
              <span className="ml-2 hidden group-data-[state=active]:inline sm:inline">{tab.label}</span>
            </GlassTabsTrigger>
          ))}
        </GlassTabsList>
      </div>
    </GlassTabs>
  );
}
