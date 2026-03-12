"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Settings,
  BarChart3,
  Sun,
  Moon,
} from "lucide-react";
import { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent } from "@/registry/liquid-glass/glass-tabs";
import { StockTickerWidget } from "@/registry/widgets/stock-widget";
import { ForecastWidget } from "@/registry/widgets/weather-widget";
import { DigitalClockWidget } from "@/registry/widgets/clock-widget";
import { Button } from "@/components/ui/button";

const tabs = [
  { value: "dashboard", icon: LayoutDashboard, label: "Dashboard", color: "cyan" },
  { value: "analytics", icon: BarChart3, label: "Analytics", color: "purple" },
  { value: "users", icon: Users, label: "Users", color: "emerald" },
  { value: "projects", icon: FolderKanban, label: "Projects", color: "blue" },
  { value: "settings", icon: Settings, label: "Settings", color: "pink" },
];

const forecastData = [
  { day: "Mon", high: 31, low: 24, condition: "sunny" as const },
  { day: "Tue", high: 29, low: 23, condition: "cloudy" as const },
  { day: "Wed", high: 27, low: 22, condition: "rainy" as const },
  { day: "Thu", high: 30, low: 24, condition: "sunny" as const },
  { day: "Fri", high: 32, low: 25, condition: "sunny" as const },
];

// Tab-specific background gradients
const tabBackgrounds: Record<string, string> = {
  dashboard: "from-cyan-950/30 via-slate-950 to-slate-950",
  analytics: "from-purple-950/30 via-slate-950 to-slate-950",
  users: "from-emerald-950/30 via-slate-950 to-slate-950",
  projects: "from-blue-950/30 via-slate-950 to-slate-950",
  settings: "from-pink-950/30 via-slate-950 to-slate-950",
};

// Light mode backgrounds
const tabBackgroundsLight: Record<string, string> = {
  dashboard: "from-cyan-100/50 via-white to-slate-50",
  analytics: "from-purple-100/50 via-white to-slate-50",
  users: "from-emerald-100/50 via-white to-slate-50",
  projects: "from-blue-100/50 via-white to-slate-50",
  settings: "from-pink-100/50 via-white to-slate-50",
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="text-slate-400">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-slate-400 hover:text-white dark:text-slate-500 dark:hover:text-slate-900 transition-colors"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get background based on active tab and theme
  const getBackground = () => {
    if (!mounted) return tabBackgrounds[activeTab];
    const backgrounds = theme === "dark" ? tabBackgrounds : tabBackgroundsLight;
    return backgrounds[activeTab];
  };

  return (
    <GlassTabs
      value={activeTab}
      onValueChange={setActiveTab}
      className={`min-h-screen bg-gradient-to-br ${getBackground()} pt-16 flex flex-col transition-colors duration-500`}
    >
      {/* Background grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none dark:opacity-10 opacity-5" />

      {/* Theme Toggle - Top Right */}
      <div className="fixed top-20 right-4 z-30">
        <ThemeToggle />
      </div>

      {/* Tab Content - Fills available space */}
      <div className="flex-1 relative z-10 overflow-auto">
        <GlassTabsContent value="dashboard" className="h-full m-0 mt-0">
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <LayoutDashboard className="h-16 w-16 text-slate-600 dark:text-slate-600 text-slate-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-400 dark:text-slate-400 text-slate-600">Dashboard</h2>
              <p className="text-slate-500 dark:text-slate-500 text-slate-400 mt-2">Overview and statistics</p>
            </div>
          </div>
        </GlassTabsContent>

        <GlassTabsContent value="analytics" className="h-full m-0 mt-0">
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-slate-600 dark:text-slate-600 text-slate-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-400 dark:text-slate-400 text-slate-600">Analytics</h2>
              <p className="text-slate-500 dark:text-slate-500 text-slate-400 mt-2">Charts and reports</p>
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
              <FolderKanban className="h-16 w-16 text-slate-600 dark:text-slate-600 text-slate-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-400 dark:text-slate-400 text-slate-600">Projects</h2>
              <p className="text-slate-500 dark:text-slate-500 text-slate-400 mt-2">Your active projects</p>
            </div>
          </div>
        </GlassTabsContent>

        <GlassTabsContent value="settings" className="h-full m-0 mt-0">
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <Settings className="h-16 w-16 text-slate-600 dark:text-slate-600 text-slate-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-400 dark:text-slate-400 text-slate-600">Settings</h2>
              <p className="text-slate-500 dark:text-slate-500 text-slate-400 mt-2">Configure your preferences</p>
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
