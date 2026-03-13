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
  Shield,
} from "lucide-react";
import { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent } from "@/registry/liquid-glass/glass-tabs";

// Widgets
import { StockTickerWidget, MarketOverviewWidget, CryptoWidget } from "@/registry/widgets/stock-widget";
import { WeatherWidget, CurrentWeatherWidget, ForecastWidget } from "@/registry/widgets/weather-widget";
import { DigitalClockWidget, AnalogClockWidget, WorldClockWidget, StopwatchWidget, TimerWidget } from "@/registry/widgets/clock-widget";
import { StatCard, MetricStat, ComparisonStat, CircularProgressStat } from "@/registry/widgets/stats-widget";
import { CalendarWidget, CompactCalendarWidget, EventsCalendarWidget } from "@/registry/widgets/calendar-widget";

const tabs = [
  { value: "dashboard", icon: LayoutDashboard, label: "Dashboard", bg: "tab-bg-ocean" },
  { value: "analytics", icon: BarChart3, label: "Analytics", bg: "tab-bg-aurora" },
  { value: "users", icon: Users, label: "Users", bg: "tab-bg-forest" },
  { value: "projects", icon: FolderKanban, label: "Projects", bg: "tab-bg-sunset" },
  { value: "settings", icon: Settings, label: "Settings", bg: "tab-bg-midnight" },
];

// Weather forecast data
const forecastData = [
  { day: "Mon", high: 31, low: 24, condition: "sunny" as const },
  { day: "Tue", high: 29, low: 23, condition: "cloudy" as const },
  { day: "Wed", high: 27, low: 22, condition: "rainy" as const },
  { day: "Thu", high: 30, low: 24, condition: "sunny" as const },
  { day: "Fri", high: 32, low: 25, condition: "sunny" as const },
];

// Market indices data
const marketIndices = [
  { name: "S&P 500", value: 5234.50, change: 45.20, changePercent: 0.87 },
  { name: "NASDAQ", value: 16428.82, change: -12.34, changePercent: -0.08 },
  { name: "DOW", value: 39127.14, change: 156.33, changePercent: 0.40 },
];

// Calendar events
const todayEvents = [
  { id: "1", title: "Team Standup", time: "09:00 AM", color: "bg-cyan-500" },
  { id: "2", title: "Design Review", time: "02:00 PM", color: "bg-purple-500" },
  { id: "3", title: "Client Call", time: "04:30 PM", color: "bg-amber-500" },
];

// World clocks
const worldClocks = [
  { city: "New York", timezone: "America/New_York", isDay: true },
  { city: "London", timezone: "Europe/London", isDay: false },
  { city: "Tokyo", timezone: "Asia/Tokyo", isDay: false },
];

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

      {/* Tab Content */}
      <div className="flex-1 relative z-10 overflow-auto p-6">
        {/* Dashboard Tab - Ocean Theme */}
        <GlassTabsContent value="dashboard" className="h-full m-0 mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DigitalClockWidget showSeconds={false} className="col-span-1" />
              <CurrentWeatherWidget
                location="San Francisco"
                temperature={24}
                feelsLike={26}
                high={28}
                low={18}
                condition="sunny"
                humidity={45}
                windSpeed={12}
                className="col-span-1 md:col-span-2 lg:col-span-1"
              />
              <ForecastWidget forecast={forecastData} className="col-span-1" />
              <StatCard
                title="Active Users"
                value="2,847"
                change={{ value: 12.5, type: "increase" }}
                icon={<Activity className="w-5 h-5" />}
                glowColor="cyan"
              />
              <StatCard
                title="Revenue"
                value="$45.2K"
                change={{ value: 8.3, type: "increase" }}
                icon={<TrendingUp className="w-5 h-5" />}
                glowColor="cyan"
              />
              <CircularProgressStat
                label="CPU Usage"
                value={67}
                max={100}
                unit="%"
                glowColor="cyan"
                size="sm"
              />
            </div>
          </div>
        </GlassTabsContent>

        {/* Analytics Tab - Aurora Theme */}
        <GlassTabsContent value="analytics" className="h-full m-0 mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <StockTickerWidget
                symbol="AAPL"
                name="Apple Inc."
                price={198.45}
                change={2.34}
                changePercent={1.19}
                chartData={[190, 192, 188, 195, 193, 197, 198]}
                className="col-span-1"
              />
              <MarketOverviewWidget indices={marketIndices} className="col-span-1 md:col-span-2 lg:col-span-1" />
              <CryptoWidget
                symbol="BTC"
                name="Bitcoin"
                price={67234}
                change24h={2.45}
                marketCap="$1.32T"
                volume24h="$28.5B"
                className="col-span-1"
              />
              <ComparisonStat
                title="Page Views"
                current={45234}
                previous={38210}
                format={(v) => v.toLocaleString()}
                glowColor="purple"
              />
              <ComparisonStat
                title="Conversions"
                current={1247}
                previous={1069}
                format={(v) => v.toLocaleString()}
                glowColor="purple"
              />
              <MetricStat
                label="Bounce Rate"
                value={32}
                max={100}
                unit="%"
                glowColor="purple"
              />
            </div>
          </div>
        </GlassTabsContent>

        {/* Users Tab - Forest Theme */}
        <GlassTabsContent value="users" className="h-full m-0 mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard
                title="Total Users"
                value="12,453"
                change={{ value: 15.2, type: "increase" }}
                icon={<Users className="w-5 h-5" />}
                glowColor="green"
              />
              <StatCard
                title="Active Today"
                value="2,341"
                change={{ value: 8.7, type: "increase" }}
                glowColor="green"
              />
              <StatCard
                title="Verified"
                value="89%"
                change={{ value: 3.2, type: "increase" }}
                icon={<Shield className="w-5 h-5" />}
                glowColor="green"
              />
              <WorldClockWidget clocks={worldClocks} className="col-span-1 md:col-span-2 lg:col-span-1" />
              <AnalogClockWidget size="md" className="col-span-1" />
              <MetricStat
                label="Memory Usage"
                value={7.8}
                max={16}
                unit="GB"
                glowColor="green"
                className="col-span-1"
              />
            </div>
          </div>
        </GlassTabsContent>

        {/* Projects Tab - Sunset Theme */}
        <GlassTabsContent value="projects" className="h-full m-0 mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard
                title="Active Projects"
                value="24"
                change={{ value: 12, type: "increase" }}
                glowColor="pink"
              />
              <StatCard
                title="In Progress"
                value="12"
                change={{ value: 8, type: "increase" }}
                glowColor="pink"
              />
              <StatCard
                title="Completed"
                value="156"
                change={{ value: 5, type: "increase" }}
                glowColor="pink"
              />
              <EventsCalendarWidget events={todayEvents} className="col-span-1 md:col-span-2 lg:col-span-1" />
              <CalendarWidget className="col-span-1 md:col-span-2 lg:col-span-1" />
              <CompactCalendarWidget className="col-span-1" />
            </div>
          </div>
        </GlassTabsContent>

        {/* Settings Tab - Midnight Theme */}
        <GlassTabsContent value="settings" className="h-full m-0 mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricStat
                label="Storage Used"
                value={45.2}
                max={100}
                unit="GB"
                glowColor="blue"
              />
              <MetricStat
                label="Memory"
                value={7.8}
                max={16}
                unit="GB"
                glowColor="blue"
              />
              <CircularProgressStat
                label="Uptime"
                value={99.9}
                max={100}
                unit="%"
                glowColor="blue"
                size="sm"
              />
              <StopwatchWidget className="col-span-1" />
              <TimerWidget initialMinutes={5} className="col-span-1" />
              <WeatherWidget
                temperature={28}
                condition="Partly Cloudy"
                icon="cloud"
                location="Local"
                className="col-span-1"
              />
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
              className="group p-3"
            >
              <tab.icon className="h-4 w-4" />
              <span className="ml-2 hidden group-data-[state=active]:inline">
                {tab.label}
              </span>
            </GlassTabsTrigger>
          ))}
        </GlassTabsList>
      </div>
    </GlassTabs>
  );
}
