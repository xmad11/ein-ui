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
  DollarSign,
  ShoppingCart,
  CreditCard,
  Package,
  Star,
  Heart,
  MessageSquare,
  Eye,
  Clock,
  Globe,
  Server,
  Cpu,
  HardDrive,
} from "lucide-react";
import { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent } from "@/registry/liquid-glass/glass-tabs";
import { StockTickerWidget } from "@/registry/widgets/stock-widget";
import { ForecastWidget } from "@/registry/widgets/weather-widget";
import { DigitalClockWidget } from "@/registry/widgets/clock-widget";
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/registry/liquid-glass/glass-card";
import { GlassButton } from "@/registry/liquid-glass/glass-button";
import { GlassBadge } from "@/registry/liquid-glass/glass-badge";
import { GlassProgress } from "@/registry/liquid-glass/glass-progress";
import { GlassMorphCard } from "@/registry/innovative/glass-morph-card";
import { WidgetCarousel } from "@/components/carousel";

const tabs = [
  { value: "users", icon: Users, label: "Users", color: "cyan" as const },
  { value: "dashboard", icon: LayoutDashboard, label: "Dashboard", color: "blue" as const },
  { value: "analytics", icon: BarChart3, label: "Analytics", color: "purple" as const },
  { value: "projects", icon: FolderKanban, label: "Projects", color: "green" as const },
  { value: "settings", icon: Settings, label: "Settings", color: "pink" as const },
];

const forecastData = [
  { day: "Mon", high: 31, low: 24, condition: "sunny" as const },
  { day: "Tue", high: 29, low: 23, condition: "cloudy" as const },
  { day: "Wed", high: 27, low: 22, condition: "rainy" as const },
  { day: "Thu", high: 30, low: 24, condition: "sunny" as const },
  { day: "Fri", high: 32, low: 25, condition: "sunny" as const },
];

// Widget data for carousels
const usersWidgets = [
  { title: "Total Users", value: "1,234", change: "+12.5%", trend: "up", icon: Users },
  { title: "Active Now", value: "892", change: "+8.2%", trend: "up", icon: Activity },
  { title: "New Signups", value: "45", change: "+15.3%", trend: "up", icon: Target },
  { title: "User Retention", value: "94%", change: "+2.1%", trend: "up", icon: Heart },
  { title: "Messages", value: "3,421", change: "-3.2%", trend: "down", icon: MessageSquare },
];

const dashboardWidgets = [
  { title: "Revenue", value: "$24.5K", change: "+12.5%", trend: "up", icon: DollarSign },
  { title: "Orders", value: "1,893", change: "+9.8%", trend: "up", icon: ShoppingCart },
  { title: "Performance", value: "98.2%", change: "-0.3%", trend: "down", icon: Zap },
  { title: "Goals", value: "89%", change: "+3.1%", trend: "up", icon: Target },
  { title: "Uptime", value: "99.9%", change: "+0.1%", trend: "up", icon: Server },
];

const analyticsWidgets = [
  { title: "Page Views", value: "45.2K", change: "+18.3%", trend: "up", icon: Eye },
  { title: "Sessions", value: "12.8K", change: "+11.2%", trend: "up", icon: Clock },
  { title: "Bounce Rate", value: "32.1%", change: "-4.5%", trend: "down", icon: TrendingDown },
  { title: "Global Reach", value: "142", change: "+8", trend: "up", icon: Globe },
  { title: "Load Time", value: "1.2s", change: "-0.3s", trend: "up", icon: Cpu },
];

const projectsWidgets = [
  { title: "Active Projects", value: "12", change: "+2", trend: "up", icon: FolderKanban },
  { title: "Completed", value: "48", change: "+5", trend: "up", icon: Package },
  { title: "In Review", value: "7", change: "-1", trend: "up", icon: Star },
  { title: "On Hold", value: "3", change: "0", trend: "up", icon: Clock },
  { title: "Success Rate", value: "94%", change: "+2%", trend: "up", icon: Target },
];

const settingsWidgets = [
  { title: "Storage Used", value: "42.3 GB", change: "+1.2 GB", trend: "up", icon: HardDrive },
  { title: "API Calls", value: "124K", change: "+12K", trend: "up", icon: Server },
  { title: "Integrations", value: "8", change: "+1", trend: "up", icon: Package },
  { title: "Notifications", value: "23", change: "+5", trend: "up", icon: Bell },
  { title: "Security Score", value: "98%", change: "+1%", trend: "up", icon: Target },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("users"); // Users as default

  return (
    <GlassTabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-16 flex flex-col"
    >
      {/* Background grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Tab Content - Fills available space */}
      <div className="flex-1 relative z-10 overflow-auto p-6">
        {/* Users Tab - Default - Cyan */}
        <GlassTabsContent value="users" className="h-full m-0 mt-0">
          <GlassMorphCard glowColor="cyan" intensity={20} className="p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Users Overview</h2>

              <WidgetCarousel>
                {usersWidgets.map((widget, i) => (
                  <GlassCard key={i} className="p-4">
                    <div className="flex items-center gap-2 text-cyan-400 mb-2">
                      <widget.icon className="h-4 w-4" />
                      <span className="text-xs text-white/50">{widget.title}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{widget.value}</div>
                    <div className={`text-xs flex items-center gap-1 mt-1 ${
                      widget.trend === "up" ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {widget.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {widget.change}
                    </div>
                  </GlassCard>
                ))}
              </WidgetCarousel>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <StockTickerWidget symbol="AAPL" price={198.45} change={2.34} changePercent={1.19} />
                <ForecastWidget forecast={forecastData} />
                <DigitalClockWidget showSeconds={false} className="w-full" />
              </div>
            </div>
          </GlassMorphCard>
        </GlassTabsContent>

        {/* Dashboard Tab - Blue */}
        <GlassTabsContent value="dashboard" className="h-full m-0 mt-0">
          <GlassMorphCard glowColor="blue" intensity={20} className="p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Dashboard Overview</h2>

              <WidgetCarousel>
                {dashboardWidgets.map((widget, i) => (
                  <GlassCard key={i} className="p-4">
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <widget.icon className="h-4 w-4" />
                      <span className="text-xs text-white/50">{widget.title}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{widget.value}</div>
                    <div className={`text-xs flex items-center gap-1 mt-1 ${
                      widget.trend === "up" ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {widget.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {widget.change}
                    </div>
                  </GlassCard>
                ))}
              </WidgetCarousel>

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
          </GlassMorphCard>
        </GlassTabsContent>

        {/* Analytics Tab - Purple */}
        <GlassTabsContent value="analytics" className="h-full m-0 mt-0">
          <GlassMorphCard glowColor="purple" intensity={20} className="p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Analytics Overview</h2>

              <WidgetCarousel>
                {analyticsWidgets.map((widget, i) => (
                  <GlassCard key={i} className="p-4">
                    <div className="flex items-center gap-2 text-purple-400 mb-2">
                      <widget.icon className="h-4 w-4" />
                      <span className="text-xs text-white/50">{widget.title}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{widget.value}</div>
                    <div className={`text-xs flex items-center gap-1 mt-1 ${
                      widget.trend === "up" ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {widget.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {widget.change}
                    </div>
                  </GlassCard>
                ))}
              </WidgetCarousel>

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
            </div>
          </GlassMorphCard>
        </GlassTabsContent>

        {/* Projects Tab - Green */}
        <GlassTabsContent value="projects" className="h-full m-0 mt-0">
          <GlassMorphCard glowColor="green" intensity={20} className="p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Projects Overview</h2>

              <WidgetCarousel>
                {projectsWidgets.map((widget, i) => (
                  <GlassCard key={i} className="p-4">
                    <div className="flex items-center gap-2 text-emerald-400 mb-2">
                      <widget.icon className="h-4 w-4" />
                      <span className="text-xs text-white/50">{widget.title}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{widget.value}</div>
                    <div className={`text-xs flex items-center gap-1 mt-1 ${
                      widget.trend === "up" ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {widget.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {widget.change}
                    </div>
                  </GlassCard>
                ))}
              </WidgetCarousel>

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
          </GlassMorphCard>
        </GlassTabsContent>

        {/* Settings Tab - Pink */}
        <GlassTabsContent value="settings" className="h-full m-0 mt-0">
          <GlassMorphCard glowColor="pink" intensity={20} className="p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Settings Overview</h2>

              <WidgetCarousel>
                {settingsWidgets.map((widget, i) => (
                  <GlassCard key={i} className="p-4">
                    <div className="flex items-center gap-2 text-pink-400 mb-2">
                      <widget.icon className="h-4 w-4" />
                      <span className="text-xs text-white/50">{widget.title}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{widget.value}</div>
                    <div className={`text-xs flex items-center gap-1 mt-1 ${
                      widget.trend === "up" ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {widget.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {widget.change}
                    </div>
                  </GlassCard>
                ))}
              </WidgetCarousel>

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
            </div>
          </GlassMorphCard>
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
