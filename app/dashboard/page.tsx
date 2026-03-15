"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Brain,
  Zap,
  Monitor,
  HardDrive,
  Settings,
  Activity,
  TrendingUp,
  Shield,
  Cpu,
  Database,
  Wifi,
  Server,
  Clock,
  CheckCircle2,
  Pause,
  Play,
  FileText,
  Globe,
  Gauge,
  Binary,
  Terminal,
  Lock,
  RefreshCw,
  Plus,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Folder,
} from "lucide-react";
import { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent } from "@/registry/liquid-glass/glass-tabs";
import { GlassBadge } from "@/registry/liquid-glass/glass-badge";
import { GlassProgress } from "@/registry/liquid-glass/glass-progress";
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
} from "@/registry/liquid-glass/glass-card";
import { GlassButton } from "@/registry/liquid-glass/glass-button";
import { GlassInput } from "@/registry/liquid-glass/glass-input";
import { Label } from "@/components/ui/label";
import { WidgetCarousel } from "@/components/carousel/WidgetCarousel";
import { GlassWidgetBase } from "@/registry/widgets/base-widget";

// Widgets
import { StatCard, MetricStat, CircularProgressStat, MultiGaugeWidget, MultiProgressWidget } from "@/registry/widgets/stats-widget";
import { HourlyWeatherWidget, ForecastWidget, ForecastWeatherWidget, CurrentWeatherWidget } from "@/registry/widgets/weather-widget";
import { StockTickerWidget, CryptoWidget } from "@/registry/widgets/stock-widget";
import { DigitalClockWidget, WorldClockWidget, StopwatchWidget, TimerWidget, AnalogClockWidget } from "@/registry/widgets/clock-widget";
import { CompactCalendarWidget, EventsCalendarWidget } from "@/registry/widgets/calendar-widget";

// XMAD-Control Tabs Configuration
const tabs = [
  { value: "overview", icon: LayoutDashboard, label: "Overview", bg: "tab-bg-ocean" },
  { value: "chat", icon: MessageSquare, label: "AI Chat", bg: "tab-bg-aurora" },
  { value: "memory", icon: Brain, label: "Memory", bg: "tab-bg-forest" },
  { value: "automation", icon: Zap, label: "Automation", bg: "tab-bg-sunset" },
  { value: "screen", icon: Monitor, label: "Screen", bg: "tab-bg-midnight" },
  { value: "backups", icon: HardDrive, label: "Backups", bg: "tab-bg-ocean" },
  { value: "settings", icon: Settings, label: "Settings", bg: "tab-bg-aurora" },
];

// Tab collapse timing (in ms)
const TAB_COLLAPSE_DELAY = 2000;

// Mock Data for XMAD-Control
const systemStats = {
  cpu: 67,
  memory: { used: 7.8, total: 16, percentage: 48 },
  disk: { used: 234, total: 500, percentage: 46 },
  uptime: 864000,
};

const openClawStatus = {
  running: true,
  pid: 12345,
  uptime: 432000,
  memoryUsage: 256,
};

const tailscaleStatus = {
  connected: true,
  ip: "100.64.0.1",
  hostname: "xmad-server",
  peers: 5,
};

const automationTasks: Array<{
  id: string;
  name: string;
  status: "running" | "pending" | "completed" | "paused";
  progress: number;
}> = [
  { id: "1", name: "Daily Backup", status: "running", progress: 45 },
  { id: "2", name: "Log Cleanup", status: "pending", progress: 0 },
  { id: "3", name: "Security Scan", status: "completed", progress: 100 },
  { id: "4", name: "Cache Clear", status: "paused", progress: 60 },
];

const memoryFiles = [
  { name: "project-context.md", size: "12 KB", modified: "2 hours ago" },
  { name: "api-keys.json", size: "2 KB", modified: "1 day ago" },
  { name: "system-config.yaml", size: "8 KB", modified: "3 days ago" },
];

// Hourly system load data (converted from weather concept)
const hourlyLoadData = [
  { time: "1AM", temperature: 22, icon: "cloud" as const },
  { time: "2AM", temperature: 21, icon: "cloud" as const },
  { time: "3AM", temperature: 20, icon: "cloud" as const },
  { time: "4AM", temperature: 18, icon: "cloud" as const },
  { time: "5AM", temperature: 20, icon: "sun" as const },
  { time: "6AM", temperature: 22, icon: "sun" as const },
  { time: "7AM", temperature: 24, icon: "sun" as const },
  { time: "8AM", temperature: 26, icon: "sun" as const },
];

// API usage forecast data
const apiForecastData = [
  { day: "Mon", high: 24, low: 14, condition: "sunny" as const },
  { day: "Tue", high: 26, low: 15, condition: "sunny" as const },
  { day: "Wed", high: 22, low: 13, condition: "cloudy" as const },
  { day: "Thu", high: 20, low: 12, condition: "cloudy" as const },
  { day: "Fri", high: 23, low: 14, condition: "sunny" as const },
];

// Resource "stocks" data
const resourceStocks = [
  { symbol: "CPU", name: "Processor Load", price: 67.45, change: 2.34, changePercent: 3.61, chartData: [60, 62, 58, 65, 67, 64, 68, 67] },
  { symbol: "RAM", name: "Memory Usage", price: 48.20, change: -1.50, changePercent: -3.02, chartData: [52, 50, 48, 49, 47, 48, 50, 48] },
  { symbol: "DISK", name: "Storage Used", price: 46.80, change: 0.30, changePercent: 0.64, chartData: [45, 45, 46, 46, 46, 47, 46, 47] },
];

// Crypto-style tokens data
const tokenData = [
  { symbol: "XAI", name: "XMAD AI Token", price: 0.0847, change24h: 5.23, marketCap: "$2.4M", volume24h: "$124K", sparkline: [0.078, 0.080, 0.082, 0.079, 0.083, 0.085, 0.084, 0.0847] },
  { symbol: "MEM", name: "Memory Token", price: 1.24, change24h: -2.15, marketCap: "$890K", volume24h: "$45K", sparkline: [1.30, 1.28, 1.25, 1.26, 1.24, 1.23, 1.24, 1.24] },
];

// World clocks for server locations
const worldClocksData = [
  { city: "NYC", timezone: "America/New_York", isDay: true },
  { city: "London", timezone: "Europe/London", isDay: true },
  { city: "Tokyo", timezone: "Asia/Tokyo", isDay: false },
];

// Scheduled events
const scheduledEvents = [
  { id: "1", title: "Backup Cycle", time: "02:00 AM", color: "bg-cyan-500" },
  { id: "2", title: "Cache Flush", time: "06:00 AM", color: "bg-purple-500" },
  { id: "3", title: "Security Audit", time: "12:00 PM", color: "bg-amber-500" },
];

// Admin panel stats
const adminStats = [
  { title: "Total Backups", value: "12,456", change: "+12.5%", trend: "up", icon: Database },
  { title: "Storage Used", value: "54.3 GB", change: "+8.2%", trend: "up", icon: HardDrive },
  { title: "Success Rate", value: "99.1%", change: "+4.3%", trend: "up", icon: TrendingUp },
  { title: "Active Jobs", value: "3", change: "-2.1%", trend: "down", icon: Activity },
];

// Backup history
const backupHistory = [
  { name: "Daily Backup", type: "Incremental", status: "completed", size: "2.4 GB" },
  { name: "Weekly Full", type: "Full", status: "completed", size: "12.1 GB" },
  { name: "Database Dump", type: "Incremental", status: "running", size: "1.2 GB" },
  { name: "Config Backup", type: "Full", status: "completed", size: "0.5 GB" },
  { name: "Logs Archive", type: "Incremental", status: "pending", size: "0.8 GB" },
  { name: "Media Backup", type: "Full", status: "completed", size: "8.3 GB" },
];

// AI Chat stats
const chatStats = [
  { title: "Messages", value: "1,247", change: "+15%", trend: "up", icon: MessageSquare },
  { title: "Tokens Used", value: "845K", change: "+23%", trend: "up", icon: Cpu },
  { title: "API Quota", value: "67%", change: "+5%", trend: "up", icon: Gauge },
  { title: "Avg Response", value: "1.2s", change: "-8%", trend: "down", icon: Clock },
];

// Screen stats
const screenStats = [
  { title: "FPS", value: "30", change: "Stable", trend: "up", icon: Monitor },
  { title: "Quality", value: "85%", change: "+2%", trend: "up", icon: Activity },
  { title: "Latency", value: "45ms", change: "-5ms", trend: "up", icon: Globe },
  { title: "Bitrate", value: "4.2Mb", change: "+0.3", trend: "up", icon: Binary },
];

// ==================== WIDGET COMPONENTS ====================

function StatusBadge({ status }: { status: "online" | "offline" | "warning" }) {
  const config: Record<"online" | "offline" | "warning", { variant: "default" | "primary" | "success" | "warning" | "destructive"; label: string }> = {
    online: { variant: "success", label: "Online" },
    offline: { variant: "destructive", label: "Offline" },
    warning: { variant: "warning", label: "Warning" },
  };
  return <GlassBadge variant={config[status].variant}>{config[status].label}</GlassBadge>;
}

function ServerStatusCard({
  icon: Icon,
  label,
  status,
  detail,
  glowColor,
}: {
  icon: React.ElementType;
  label: string;
  status: "online" | "offline" | "warning";
  detail: string;
  glowColor: "cyan" | "purple" | "blue" | "pink" | "green" | "amber" | "red";
}) {
  return (
    <GlassWidgetBase size="md" width="sm" glowColor={glowColor}>
      <div className="flex items-center gap-3 mb-3">
        <Icon className="h-5 w-5 text-white/70" />
        <span className="text-white/60 text-sm">{label}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white text-lg font-medium">{detail}</span>
        <StatusBadge status={status} />
      </div>
    </GlassWidgetBase>
  );
}

function TaskCard({
  name,
  status,
  progress,
}: {
  name: string;
  status: "running" | "pending" | "completed" | "paused";
  progress: number;
}) {
  const statusConfig = {
    running: { icon: Play, color: "text-emerald-400", glow: "green" as const },
    pending: { icon: Clock, color: "text-amber-400", glow: "amber" as const },
    completed: { icon: CheckCircle2, color: "text-cyan-400", glow: "cyan" as const },
    paused: { icon: Pause, color: "text-purple-400", glow: "purple" as const },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <GlassWidgetBase size="sm" width="sm" glowColor={config.glow}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-white text-sm font-medium truncate">{name}</span>
        <Icon className={`h-4 w-4 ${config.color}`} />
      </div>
      {status === "running" && (
        <GlassProgress value={progress} className="mt-2" />
      )}
    </GlassWidgetBase>
  );
}

function MemoryFileCard({
  name,
  size,
  modified,
}: {
  name: string;
  size: string;
  modified: string;
}) {
  return (
    <GlassWidgetBase size="sm" width="sm" glowColor="blue">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="h-4 w-4 text-white/60" />
        <span className="text-white text-sm font-medium truncate">{name}</span>
      </div>
      <div className="flex items-center justify-between text-xs text-white/50">
        <span>{size}</span>
        <span>{modified}</span>
      </div>
    </GlassWidgetBase>
  );
}

function QuickActionCard({
  icon: Icon,
  label,
  description,
  glowColor,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  glowColor: "cyan" | "purple" | "blue" | "pink" | "green" | "amber" | "red";
}) {
  return (
    <GlassWidgetBase size="md" width="sm" glowColor={glowColor}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-white/10">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-white font-medium">{label}</div>
          <div className="text-white/50 text-xs">{description}</div>
        </div>
      </div>
    </GlassWidgetBase>
  );
}

// Small mini stat widget for 2-3 grid
function MiniStatWidget({
  icon: Icon,
  label,
  value,
  glowColor,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  glowColor: "cyan" | "purple" | "blue" | "pink" | "green" | "amber" | "red";
}) {
  return (
    <GlassWidgetBase size="sm" glowColor={glowColor}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4 text-white/60" />
        <span className="text-white/50 text-xs">{label}</span>
      </div>
      <div className="text-xl font-light text-white">{value}</div>
    </GlassWidgetBase>
  );
}

// ==================== MAIN DASHBOARD ====================

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [tabsExpanded, setTabsExpanded] = useState(true);
  const collapseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  const currentTab = tabs.find((t) => t.value === activeTab);

  const resetCollapseTimer = useCallback(() => {
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
    }
    setTabsExpanded(true);
    collapseTimerRef.current = setTimeout(() => {
      setTabsExpanded(false);
    }, TAB_COLLAPSE_DELAY);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // Start the collapse timer on initial mount
      collapseTimerRef.current = setTimeout(() => {
        setTabsExpanded(false);
      }, TAB_COLLAPSE_DELAY);
    }
    return () => {
      if (collapseTimerRef.current) {
        clearTimeout(collapseTimerRef.current);
      }
    };
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    resetCollapseTimer();
  }, [resetCollapseTimer]);

  const handleExpandTabs = useCallback(() => {
    resetCollapseTimer();
  }, [resetCollapseTimer]);

  return (
    <>
      {/* Full-screen gradient background - covers body bg */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="fixed top-1/2 left-1/2 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl animate-pulse z-0" />

      <GlassTabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="relative z-10 h-screen overflow-hidden pt-16 flex flex-col transition-all duration-500"
      >

      {/* Content area - scrollable vertically */}
      <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 md:px-4 lg:px-6 pb-24">

        {/* ==================== OVERVIEW TAB ==================== */}
        <GlassTabsContent value="overview" className="m-0 mt-0">

          {/* Row 1 - Large gauge widgets */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 3 }}>
              <MultiGaugeWidget
                gauges={[
                  { label: "RAM", value: systemStats.memory.percentage, unit: "%", color: "purple" },
                  { label: "CPU", value: systemStats.cpu, unit: "%", color: "cyan" },
                  { label: "Disk", value: systemStats.disk.percentage, unit: "%", color: "green" },
                ]}
                glowColor="green"
              />
              <MultiProgressWidget
                items={[
                  { label: "Memory", value: systemStats.memory.used, max: systemStats.memory.total, unit: "GB", color: "purple" },
                  { label: "Disk", value: systemStats.disk.used, max: systemStats.disk.total, unit: "GB", color: "blue" },
                  { label: "CPU Load", value: systemStats.cpu, unit: "%", color: "cyan" },
                ]}
                glowColor="purple"
              />
              <ForecastWeatherWidget
                current={{ temperature: systemStats.cpu, condition: "System Load", icon: "cloud" }}
                forecast={[
                  { day: "1h", high: 72, low: 45, condition: "sunny" },
                  { day: "2h", high: 68, low: 42, condition: "cloudy" },
                  { day: "3h", high: 75, low: 48, condition: "sunny" },
                ]}
              />
            </WidgetCarousel>
          </div>

          {/* Row 2 - Server status cards */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
              <ServerStatusCard
                icon={Server}
                label="OpenClaw Gateway"
                status={openClawStatus.running ? "online" : "offline"}
                detail={openClawStatus.running ? `PID: ${openClawStatus.pid}` : "Stopped"}
                glowColor="cyan"
              />
              <ServerStatusCard
                icon={Wifi}
                label="Tailscale VPN"
                status={tailscaleStatus.connected ? "online" : "offline"}
                detail={tailscaleStatus.connected ? tailscaleStatus.ip : "Disconnected"}
                glowColor="purple"
              />
              <ServerStatusCard
                icon={Shield}
                label="Guardian"
                status="online"
                detail="Monitoring Active"
                glowColor="green"
              />
              <CurrentWeatherWidget
                location="Server Room"
                temperature={22}
                feelsLike={21}
                high={24}
                low={18}
                condition="cloudy"
                humidity={45}
                windSpeed={2}
              />
            </WidgetCarousel>
          </div>

          {/* Row 3 - Stats and mini widgets in 2-column grid */}
          <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <MiniStatWidget icon={Activity} label="Requests/min" value="1.2K" glowColor="cyan" />
            <MiniStatWidget icon={Binary} label="Data In" value="45 MB" glowColor="green" />
            <MiniStatWidget icon={Binary} label="Data Out" value="128 MB" glowColor="purple" />
            <MiniStatWidget icon={Gauge} label="Latency" value="12ms" glowColor="amber" />
          </div>

          {/* Row 4 - Hourly chart and calendar */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 2 }}>
              <HourlyWeatherWidget hours={hourlyLoadData.map(h => ({ time: h.time, temperature: h.temperature, icon: h.icon }))} />
              <EventsCalendarWidget events={scheduledEvents} />
            </WidgetCarousel>
          </div>

          {/* Row 5 - Resource stocks */}
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {resourceStocks.map((stock) => (
              <StockTickerWidget key={stock.symbol} {...stock} />
            ))}
          </div>

        </GlassTabsContent>

        {/* ==================== AI CHAT TAB ==================== */}
        <GlassTabsContent value="chat" className="m-0 mt-0">

          {/* Row 1 - Stats Grid (2x2 on mobile, 4 columns on desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {chatStats.map((stat) => (
              <GlassCard key={stat.title}>
                <GlassCardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-white/60 mb-1">{stat.title}</p>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3 text-green-400" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-400" />
                        )}
                        <span className={`text-xs ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-white/10">
                      <stat.icon className="h-4 w-4 text-white/60" />
                    </div>
                  </div>
                </GlassCardContent>
              </GlassCard>
            ))}
          </div>

          {/* Row 2 - Mini stats grid */}
          <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <MiniStatWidget icon={Brain} label="Context Size" value="128K" glowColor="purple" />
            <MiniStatWidget icon={Cpu} label="GPU Usage" value="60%" glowColor="cyan" />
            <MiniStatWidget icon={Database} label="Cache Hits" value="94%" glowColor="green" />
            <MiniStatWidget icon={Clock} label="Queue Time" value="0.3s" glowColor="amber" />
          </div>

          {/* Row 3 - Model usage gauges */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 2 }}>
              <MultiGaugeWidget
                title="Model Usage"
                gauges={[
                  { label: "Claude", value: 45, unit: "%", color: "purple" },
                  { label: "GPT-4", value: 30, unit: "%", color: "cyan" },
                  { label: "Local", value: 25, unit: "%", color: "green" },
                ]}
                glowColor="purple"
              />
              <MultiProgressWidget
                title="Resource Consumption"
                items={[
                  { label: "Memory", value: 2.4, max: 8, unit: "GB", color: "purple" },
                  { label: "GPU", value: 60, unit: "%", color: "cyan" },
                  { label: "Queue", value: 12, max: 50, unit: "", color: "green" },
                ]}
                glowColor="cyan"
              />
            </WidgetCarousel>
          </div>

          {/* Row 4 - Tokens and forecast */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 3 }}>
              {tokenData.map((token) => (
                <CryptoWidget key={token.symbol} {...token} />
              ))}
              <ForecastWidget forecast={apiForecastData} />
            </WidgetCarousel>
          </div>

          {/* Row 5 - World clocks */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 3 }}>
              <WorldClockWidget clocks={worldClocksData} />
              <DigitalClockWidget showSeconds format="24h" />
              <AnalogClockWidget size="md" showNumbers />
            </WidgetCarousel>
          </div>

        </GlassTabsContent>

        {/* ==================== MEMORY TAB ==================== */}
        <GlassTabsContent value="memory" className="m-0 mt-0">

          {/* Row 1 - Memory stats */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
              <StatCard
                title="Total Files"
                value="156"
                change={{ value: 5, type: "increase" }}
                icon={<FileText className="w-5 h-5" />}
                glowColor="blue"
              />
              <StatCard
                title="Total Size"
                value="2.4 MB"
                glowColor="blue"
              />
              <CircularProgressStat
                label="Storage Used"
                value={35}
                max={100}
                unit="%"
                glowColor="blue"
                size="md"
              />
              <MetricStat
                label="Last Sync"
                value={5}
                unit="min ago"
                glowColor="cyan"
              />
            </WidgetCarousel>
          </div>

          {/* Row 2 - Mini stats */}
          <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <MiniStatWidget icon={FileText} label="Context Files" value="42" glowColor="blue" />
            <MiniStatWidget icon={Database} label="Embeddings" value="1.2K" glowColor="purple" />
            <MiniStatWidget icon={Binary} label="Vectors" value="8.4K" glowColor="cyan" />
            <MiniStatWidget icon={RefreshCw} label="Updates" value="24/h" glowColor="green" />
          </div>

          {/* Row 3 - Memory files */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
              {memoryFiles.map((file, i) => (
                <MemoryFileCard key={i} {...file} />
              ))}
              <MemoryFileCard name="user-preferences.json" size="4 KB" modified="5 hours ago" />
              <MemoryFileCard name="session-data.bin" size="1 KB" modified="1 week ago" />
            </WidgetCarousel>
          </div>

          {/* Row 4 - Storage forecast */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 2 }}>
              <ForecastWidget forecast={apiForecastData} />
              <MultiProgressWidget
                title="Memory Types"
                items={[
                  { label: "Context", value: 1.2, max: 2.4, unit: "MB", color: "blue" },
                  { label: "Cache", value: 0.8, max: 2.4, unit: "MB", color: "purple" },
                  { label: "Logs", value: 0.4, max: 2.4, unit: "MB", color: "cyan" },
                ]}
                glowColor="blue"
              />
            </WidgetCarousel>
          </div>

        </GlassTabsContent>

        {/* ==================== AUTOMATION TAB ==================== */}
        <GlassTabsContent value="automation" className="m-0 mt-0">

          {/* Row 1 - Task stats */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
              <StatCard
                title="Active Tasks"
                value="4"
                icon={<Zap className="w-5 h-5" />}
                glowColor="pink"
              />
              <StatCard
                title="Completed Today"
                value="23"
                change={{ value: 10, type: "increase" }}
                glowColor="green"
              />
              <CircularProgressStat
                label="Success Rate"
                value={96}
                max={100}
                unit="%"
                glowColor="green"
                size="md"
              />
              <MetricStat
                label="Avg Duration"
                value={2.5}
                unit="min"
                glowColor="amber"
              />
            </WidgetCarousel>
          </div>

          {/* Row 2 - Mini stats */}
          <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <MiniStatWidget icon={Zap} label="Queued" value="12" glowColor="amber" />
            <MiniStatWidget icon={CheckCircle2} label="Success" value="234" glowColor="green" />
            <MiniStatWidget icon={Pause} label="Paused" value="3" glowColor="purple" />
            <MiniStatWidget icon={Activity} label="Running" value="4" glowColor="cyan" />
          </div>

          {/* Row 3 - Tasks grid */}
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {automationTasks.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </div>

          {/* Row 4 - Timers and gauges */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 3 }}>
              <MultiGaugeWidget
                title="Task Distribution"
                gauges={[
                  { label: "Running", value: 1, color: "green" },
                  { label: "Pending", value: 1, color: "amber" },
                  { label: "Done", value: 2, color: "cyan" },
                ]}
                glowColor="pink"
              />
              <MultiProgressWidget
                title="Schedule Timeline"
                items={[
                  { label: "Hourly Tasks", value: 8, max: 10, color: "pink" },
                  { label: "Daily Tasks", value: 12, max: 15, color: "purple" },
                  { label: "Weekly Tasks", value: 3, max: 5, color: "blue" },
                ]}
                glowColor="purple"
              />
              <TimerWidget initialMinutes={25} />
            </WidgetCarousel>
          </div>

          {/* Row 5 - Stopwatch and calendar */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 2 }}>
              <StopwatchWidget />
              <CompactCalendarWidget />
            </WidgetCarousel>
          </div>

        </GlassTabsContent>

        {/* ==================== SCREEN TAB ==================== */}
        <GlassTabsContent value="screen" className="m-0 mt-0">

          {/* Row 1 - Stats Grid (2x2 on mobile, 4 columns on desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {screenStats.map((stat) => (
              <GlassCard key={stat.title}>
                <GlassCardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-white/60 mb-1">{stat.title}</p>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3 text-green-400" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-400" />
                        )}
                        <span className={`text-xs ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-white/10">
                      <stat.icon className="h-4 w-4 text-white/60" />
                    </div>
                  </div>
                </GlassCardContent>
              </GlassCard>
            ))}
          </div>

          {/* Row 2 - Mini stats */}
          <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <MiniStatWidget icon={Monitor} label="Resolution" value="1080p" glowColor="cyan" />
            <MiniStatWidget icon={Activity} label="Bitrate" value="4.2Mbps" glowColor="green" />
            <MiniStatWidget icon={Globe} label="Protocol" value="WebRTC" glowColor="purple" />
            <MiniStatWidget icon={Clock} label="Session" value="2h 15m" glowColor="amber" />
          </div>

          {/* Row 3 - Quick actions */}
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <QuickActionCard icon={Monitor} label="Fullscreen" description="Toggle fullscreen mode" glowColor="cyan" />
            <QuickActionCard icon={Settings} label="Quality" description="Adjust stream quality" glowColor="green" />
            <QuickActionCard icon={Database} label="Screenshot" description="Capture current frame" glowColor="purple" />
          </div>

          {/* Row 4 - Resource monitor */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 2 }}>
              <MultiProgressWidget
                title="Stream Resources"
                items={[
                  { label: "Bandwidth", value: 4.2, max: 10, unit: "Mbps", color: "cyan" },
                  { label: "CPU", value: 25, unit: "%", color: "purple" },
                  { label: "Buffer", value: 80, unit: "%", color: "green" },
                ]}
                glowColor="cyan"
              />
              <HourlyWeatherWidget hours={hourlyLoadData.slice(0, 6).map(h => ({ time: h.time, temperature: h.temperature + 30, icon: h.icon }))} />
            </WidgetCarousel>
          </div>

        </GlassTabsContent>

        {/* ==================== BACKUPS TAB ==================== */}
        <GlassTabsContent value="backups" className="m-0 mt-0">

          {/* Row 1 - Stats Grid (2x2 on mobile, 4 columns on desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {adminStats.map((stat) => (
              <GlassCard key={stat.title}>
                <GlassCardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-white/60 mb-1">{stat.title}</p>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3 text-green-400" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-400" />
                        )}
                        <span className={`text-xs ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-white/10">
                      <stat.icon className="h-4 w-4 text-white/60" />
                    </div>
                  </div>
                </GlassCardContent>
              </GlassCard>
            ))}
          </div>

          {/* Row 2 - Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Backup History Table */}
            <div className="lg:col-span-2">
              <GlassCard>
                <GlassCardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <GlassCardTitle>Backup History</GlassCardTitle>
                      <GlassCardDescription>Manage your backup jobs</GlassCardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <GlassInput className="pl-9 w-full sm:w-40" placeholder="Search..." />
                      </div>
                      <GlassButton variant="primary" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> New
                      </GlassButton>
                    </div>
                  </div>
                </GlassCardHeader>
                <GlassCardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 px-2 text-xs font-medium text-white/40 uppercase">Name</th>
                          <th className="text-left py-2 px-2 text-xs font-medium text-white/40 uppercase hidden sm:table-cell">Type</th>
                          <th className="text-left py-2 px-2 text-xs font-medium text-white/40 uppercase">Status</th>
                          <th className="text-left py-2 px-2 text-xs font-medium text-white/40 uppercase hidden sm:table-cell">Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {backupHistory.map((backup, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-2.5 px-2">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-white/10">
                                  <HardDrive className="h-3.5 w-3.5 text-cyan-400" />
                                </div>
                                <span className="text-sm text-white truncate">{backup.name}</span>
                              </div>
                            </td>
                            <td className="py-2.5 px-2 hidden sm:table-cell">
                              <span className="text-sm text-white/70">{backup.type}</span>
                            </td>
                            <td className="py-2.5 px-2">
                              <GlassBadge variant={backup.status === "completed" ? "success" : backup.status === "running" ? "primary" : "warning"}>
                                {backup.status}
                              </GlassBadge>
                            </td>
                            <td className="py-2.5 px-2 hidden sm:table-cell">
                              <span className="text-sm text-white/50">{backup.size}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GlassCardContent>
              </GlassCard>
            </div>

            {/* Sidebar Widgets */}
            <div className="space-y-4">
              {/* Storage */}
              <GlassCard>
                <GlassCardHeader>
                  <GlassCardTitle className="flex items-center gap-2 text-sm">
                    <Database className="h-4 w-4" /> Storage
                  </GlassCardTitle>
                </GlassCardHeader>
                <GlassCardContent>
                  <GlassProgress value={68} className="mb-3" />
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">68.5 GB used</span>
                    <span className="text-white/40">100 GB</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Folder className="h-3.5 w-3.5 text-cyan-400" />
                        <span className="text-white/70">Database</span>
                      </div>
                      <span className="text-white/50">24.5 GB</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Folder className="h-3.5 w-3.5 text-purple-400" />
                        <span className="text-white/70">Files</span>
                      </div>
                      <span className="text-white/50">32.1 GB</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Folder className="h-3.5 w-3.5 text-blue-400" />
                        <span className="text-white/70">Configs</span>
                      </div>
                      <span className="text-white/50">11.9 GB</span>
                    </div>
                  </div>
                </GlassCardContent>
              </GlassCard>

              {/* Recent Activity */}
              <GlassCard>
                <GlassCardHeader>
                  <GlassCardTitle className="text-sm">Recent Activity</GlassCardTitle>
                </GlassCardHeader>
                <GlassCardContent>
                  <div className="space-y-3">
                    {[
                      { action: "Backup completed", time: "2 min ago" },
                      { action: "New schedule added", time: "15 min ago" },
                      { action: "Storage cleaned", time: "1 hour ago" },
                      { action: "Full backup started", time: "3 hours ago" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-cyan-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/80 truncate">{item.action}</p>
                          <p className="text-xs text-white/40">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCardContent>
              </GlassCard>
            </div>
          </div>

          {/* Row 3 - Settings Tabs */}
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>Backup Settings</GlassCardTitle>
              <GlassCardDescription>Manage your backup preferences</GlassCardDescription>
            </GlassCardHeader>
            <GlassCardContent>
              <GlassTabs defaultValue="general">
                <GlassTabsList className="w-full">
                  <GlassTabsTrigger value="general" className="group flex-1">
                    <Settings className="h-4 w-4" />
                    <span className="ml-2 hidden group-data-[state=active]:inline sm:inline">General</span>
                  </GlassTabsTrigger>
                  <GlassTabsTrigger value="notifications" className="group flex-1">
                    <Bell className="h-4 w-4" />
                    <span className="ml-2 hidden group-data-[state=active]:inline sm:inline">Alerts</span>
                  </GlassTabsTrigger>
                  <GlassTabsTrigger value="security" className="group flex-1">
                    <Shield className="h-4 w-4" />
                    <span className="ml-2 hidden group-data-[state=active]:inline sm:inline">Security</span>
                  </GlassTabsTrigger>
                </GlassTabsList>
                <GlassTabsContent value="general">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <Label className="text-white/80">Backup Name</Label>
                      <GlassInput defaultValue="Daily System Backup" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-white/80">Schedule</Label>
                      <GlassInput defaultValue="Every 24 hours" />
                    </div>
                    <GlassButton variant="primary">Save Changes</GlassButton>
                  </div>
                </GlassTabsContent>
                <GlassTabsContent value="notifications">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <span className="text-white/80 text-sm">Email alerts</span>
                      <div className="w-10 h-6 bg-cyan-500/50 rounded-full relative">
                        <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <span className="text-white/80 text-sm">Push notifications</span>
                      <div className="w-10 h-6 bg-white/20 rounded-full relative">
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white/60 rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <span className="text-white/80 text-sm">Failure alerts</span>
                      <div className="w-10 h-6 bg-cyan-500/50 rounded-full relative">
                        <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </GlassTabsContent>
                <GlassTabsContent value="security">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <Label className="text-white/80">Encryption Key</Label>
                      <GlassInput type="password" placeholder="••••••••" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-white/80">Confirm Key</Label>
                      <GlassInput type="password" placeholder="••••••••" />
                    </div>
                    <GlassButton variant="primary">Update Encryption</GlassButton>
                  </div>
                </GlassTabsContent>
              </GlassTabs>
            </GlassCardContent>
          </GlassCard>

        </GlassTabsContent>

        {/* ==================== SETTINGS TAB ==================== */}
        <GlassTabsContent value="settings" className="m-0 mt-0">

          {/* Row 1 - System status */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
              <ServerStatusCard icon={Server} label="API Server" status="online" detail="Port 9870" glowColor="cyan" />
              <ServerStatusCard icon={Database} label="Database" status="online" detail="Connected" glowColor="purple" />
              <ServerStatusCard icon={Shield} label="Auth" status="online" detail="JWT Active" glowColor="green" />
              <ServerStatusCard icon={Wifi} label="Network" status="online" detail="VPN Active" glowColor="blue" />
            </WidgetCarousel>
          </div>

          {/* Row 2 - Mini stats */}
          <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <MiniStatWidget icon={Lock} label="SSL Status" value="Valid" glowColor="green" />
            <MiniStatWidget icon={Terminal} label="SSH Port" value="22" glowColor="cyan" />
            <MiniStatWidget icon={Globe} label="Domain" value="Active" glowColor="purple" />
            <MiniStatWidget icon={RefreshCw} label="Auto-Update" value="On" glowColor="amber" />
          </div>

          {/* Row 3 - Quick actions */}
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <QuickActionCard icon={Settings} label="General" description="System settings" glowColor="cyan" />
            <QuickActionCard icon={Shield} label="Security" description="Auth & keys" glowColor="purple" />
            <QuickActionCard icon={Globe} label="Network" description="VPN & proxy" glowColor="blue" />
            <QuickActionCard icon={Database} label="Storage" description="Backup config" glowColor="green" />
          </div>

          {/* Row 4 - System limits */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 2 }}>
              <MultiProgressWidget
                title="System Limits"
                items={[
                  { label: "API Rate", value: 750, max: 1000, unit: "/min", color: "cyan" },
                  { label: "Storage", value: 42, max: 100, unit: "%", color: "purple" },
                  { label: "Memory", value: 48, max: 100, unit: "%", color: "blue" },
                ]}
                glowColor="cyan"
              />
              <MultiGaugeWidget
                title="Performance"
                gauges={[
                  { label: "CPU", value: 67, unit: "%", color: "cyan" },
                  { label: "RAM", value: 48, unit: "%", color: "purple" },
                  { label: "Disk", value: 46, unit: "%", color: "blue" },
                ]}
                glowColor="purple"
              />
            </WidgetCarousel>
          </div>

          {/* Row 5 - Clocks */}
          <div className="mb-4">
            <WidgetCarousel gap="sm" itemsPerView={{ base: 1, sm: 1, lg: 3, xl: 3 }}>
              <DigitalClockWidget showSeconds format="24h" />
              <WorldClockWidget clocks={worldClocksData} />
              <AnalogClockWidget size="md" showNumbers={false} />
            </WidgetCarousel>
          </div>

        </GlassTabsContent>

      </div>

      {/* Floating Tab Bar - fixed at bottom of screen */}
      <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center pb-4 pt-2 pointer-events-none">
        {/* Collapsed state - single floating button (no arrow) */}
        <button
          onClick={handleExpandTabs}
          className={`
            transition-all duration-300 ease-out pointer-events-auto
            ${tabsExpanded ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}
            relative p-3 rounded-xl
            bg-white/10 backdrop-blur-xl border border-white/20
            shadow-[0_4px_16px_rgba(0,0,0,0.2)]
            hover:bg-white/15 active:scale-95
            before:absolute before:inset-0 before:rounded-xl
            before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none
          `}
          aria-label="Expand navigation"
        >
          <div className="relative z-10 flex items-center justify-center">
            {(() => {
              const TabIcon = currentTab?.icon || LayoutDashboard;
              return <TabIcon className="h-4 w-4 text-white" />;
            })()}
          </div>
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-lg opacity-60" />
        </button>

        {/* Expanded state - full tab bar centered, smaller for mobile */}
        <div
          className={`
            absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out origin-bottom pointer-events-auto
            ${tabsExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}
          `}
        >
          <GlassTabsList className="flex items-center justify-center gap-0.5 px-1.5 py-1 h-auto">
            {tabs.map((tab) => (
              <GlassTabsTrigger
                key={tab.value}
                value={tab.value}
                className="group p-2 transition-all duration-200 rounded-lg"
                onClick={resetCollapseTimer}
              >
                <tab.icon className="h-3.5 w-3.5" />
                <span className="ml-1.5 text-xs hidden group-data-[state=active]:inline whitespace-nowrap">{tab.label}</span>
              </GlassTabsTrigger>
            ))}
          </GlassTabsList>
        </div>
      </div>
    </GlassTabs>
    </>
  );
}
