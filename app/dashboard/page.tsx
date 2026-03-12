"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Settings,
  BarChart3,
} from "lucide-react";
import { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent } from "@/registry/liquid-glass/glass-tabs";
import { StockTickerWidget } from "@/registry/widgets/stock-widget";
import { ForecastWidget } from "@/registry/widgets/weather-widget";
import { DigitalClockWidget } from "@/registry/widgets/clock-widget";

const tabs = [
  { value: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { value: "analytics", icon: BarChart3, label: "Analytics" },
  { value: "users", icon: Users, label: "Users" },
  { value: "projects", icon: FolderKanban, label: "Projects" },
  { value: "settings", icon: Settings, label: "Settings" },
];

const forecastData = [
  { day: "Mon", high: 31, low: 24, condition: "sunny" as const },
  { day: "Tue", high: 29, low: 23, condition: "cloudy" as const },
  { day: "Wed", high: 27, low: 22, condition: "rainy" as const },
  { day: "Thu", high: 30, low: 24, condition: "sunny" as const },
  { day: "Fri", high: 32, low: 25, condition: "sunny" as const },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <GlassTabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-16 flex flex-col"
    >
      {/* Background grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Tab Content - Fills available space */}
      <div className="flex-1 relative z-10 overflow-auto">
        <GlassTabsContent value="dashboard" className="h-full m-0 mt-0">
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <LayoutDashboard className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-400">Dashboard</h2>
              <p className="text-slate-500 mt-2">Overview and statistics</p>
            </div>
          </div>
        </GlassTabsContent>

        <GlassTabsContent value="analytics" className="h-full m-0 mt-0">
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-400">Analytics</h2>
              <p className="text-slate-500 mt-2">Charts and reports</p>
            </div>
          </div>
        </GlassTabsContent>

        <GlassTabsContent value="users" className="h-full m-0 mt-0">
          <div className="h-full flex items-center justify-center p-6">
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <StockTickerWidget symbol="AAPL" price={198.45} change={2.34} changePercent={1.19} />
              <ForecastWidget forecast={forecastData} />
              <DigitalClockWidget showSeconds={false} className="w-full" />
            </div>
          </div>
        </GlassTabsContent>

        <GlassTabsContent value="projects" className="h-full m-0 mt-0">
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <FolderKanban className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-400">Projects</h2>
              <p className="text-slate-500 mt-2">Your active projects</p>
            </div>
          </div>
        </GlassTabsContent>

        <GlassTabsContent value="settings" className="h-full m-0 mt-0">
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <Settings className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-400">Settings</h2>
              <p className="text-slate-500 mt-2">Configure your preferences</p>
            </div>
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
