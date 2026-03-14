"use client";

import { useState } from "react";
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
  AlertCircle,
  Pause,
  Play,
  FileText,
  Cloud,
  Terminal,
  Globe,
} from "lucide-react";
import { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent } from "@/registry/liquid-glass/glass-tabs";
import { GlassBadge } from "@/registry/liquid-glass/glass-badge";
import { GlassProgress } from "@/registry/liquid-glass/glass-progress";
import { GlassAvatar, GlassAvatarImage, GlassAvatarFallback } from "@/registry/liquid-glass/glass-avatar";
import { GlassGauge } from "@/registry/innovative/glass-gauge";
import { WidgetCarousel } from "@/components/carousel/WidgetCarousel";
import { GlassWidgetBase } from "@/registry/widgets/base-widget";

// Widgets
import { StatCard, MetricStat, ComparisonStat, CircularProgressStat, MultiGaugeWidget, MultiProgressWidget } from "@/registry/widgets/stats-widget";
import { WeatherWidget, CurrentWeatherWidget } from "@/registry/widgets/weather-widget";

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

// Mock Data for XMAD-Control
const systemStats = {
  cpu: 67,
  memory: { used: 7.8, total: 16, percentage: 48 },
  disk: { used: 234, total: 500, percentage: 46 },
  uptime: 864000, // 10 days in seconds
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

// ==================== WIDGET COMPONENTS ====================

// System Status Badge
function StatusBadge({ status }: { status: "online" | "offline" | "warning" }) {
  const config: Record<"online" | "offline" | "warning", { variant: "default" | "primary" | "success" | "warning" | "destructive"; label: string }> = {
    online: { variant: "success", label: "Online" },
    offline: { variant: "destructive", label: "Offline" },
    warning: { variant: "warning", label: "Warning" },
  };
  return <GlassBadge variant={config[status].variant}>{config[status].label}</GlassBadge>;
}

// Server Status Card
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

// Task Item Card
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
    running: { icon: Play, color: "text-emerald-400", glow: "green" },
    pending: { icon: Clock, color: "text-amber-400", glow: "amber" },
    completed: { icon: CheckCircle2, color: "text-cyan-400", glow: "cyan" },
    paused: { icon: Pause, color: "text-purple-400", glow: "purple" },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <GlassWidgetBase size="sm" width="sm" glowColor={config.glow as any}>
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

// Memory File Card
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

// Quick Action Card
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

// Network Info Card
function NetworkInfoCard({
  ip,
  hostname,
  peers,
}: {
  ip: string;
  hostname: string;
  peers: number;
}) {
  return (
    <GlassWidgetBase size="md" width="sm" glowColor="purple">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-white/70" />
        <span className="text-white/60 text-sm">Network</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-white/50 text-sm">IP Address</span>
          <span className="text-white font-mono text-sm">{ip}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/50 text-sm">Hostname</span>
          <span className="text-white text-sm">{hostname}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/50 text-sm">Peers</span>
          <span className="text-white text-sm">{peers} connected</span>
        </div>
      </div>
    </GlassWidgetBase>
  );
}

// Uptime Display
function UptimeCard({ seconds }: { seconds: number }) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  return (
    <GlassWidgetBase size="md" width="sm" glowColor="green">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-5 w-5 text-white/70" />
        <span className="text-white/60 text-sm">System Uptime</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-2xl font-light text-white">{days}</div>
          <div className="text-xs text-white/50">days</div>
        </div>
        <div className="text-white/30">:</div>
        <div className="text-center">
          <div className="text-2xl font-light text-white">{hours}</div>
          <div className="text-xs text-white/50">hours</div>
        </div>
        <div className="text-white/30">:</div>
        <div className="text-center">
          <div className="text-2xl font-light text-white">{mins}</div>
          <div className="text-xs text-white/50">mins</div>
        </div>
      </div>
    </GlassWidgetBase>
  );
}

// ==================== MAIN DASHBOARD ====================

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const currentTab = tabs.find((t) => t.value === activeTab);

  return (
    <GlassTabs
      value={activeTab}
      onValueChange={setActiveTab}
      className={`min-h-screen ${currentTab?.bg || "bg-background"} pt-16 flex flex-col transition-all duration-500`}
    >
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Content area - prevent horizontal scroll on page, only vertical */}
      <div className="flex-1 relative z-10 overflow-x-hidden overflow-y-auto px-3 py-4 md:px-4 lg:px-6">

        {/* ==================== OVERVIEW TAB ==================== */}
        <GlassTabsContent value="overview" className="m-0 mt-0">

          {/* Carousel 1 - Multi-Gauge System Stats */}
          <div className="mb-4">
            <WidgetCarousel
              gap="sm"
              itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 3 }}
            >
              <MultiGaugeWidget
                title="System Resources"
                gauges={[
                  { label: "CPU", value: systemStats.cpu, unit: "%", color: "cyan" },
                  { label: "RAM", value: systemStats.memory.percentage, unit: "%", color: "purple" },
                  { label: "Disk", value: systemStats.disk.percentage, unit: "%", color: "blue" },
                ]}
                glowColor="cyan"
              />
              <MultiProgressWidget
                title="Resource Details"
                items={[
                  { label: "Memory", value: systemStats.memory.used, max: systemStats.memory.total, unit: "GB", color: "purple" },
                  { label: "Disk", value: systemStats.disk.used, max: systemStats.disk.total, unit: "GB", color: "blue" },
                  { label: "CPU Load", value: systemStats.cpu, unit: "%", color: "cyan" },
                ]}
                glowColor="purple"
              />
              <MultiGaugeWidget
                title="Network I/O"
                gauges={[
                  { label: "Upload", value: 45, unit: "MB/s", color: "green" },
                  { label: "Download", value: 78, unit: "MB/s", color: "green" },
                  { label: "Latency", value: 12, unit: "ms", color: "amber" },
                ]}
                glowColor="green"
              />
            </WidgetCarousel>
          </div>

          {/* Carousel 2 - Status Cards */}
          <div className="mb-4">
            <WidgetCarousel
              gap="sm"
              itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}
            >
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
              <UptimeCard seconds={systemStats.uptime} />
            </WidgetCarousel>
          </div>

          {/* Carousel 3 - Quick Stats */}
          <div className="mb-4">
            <WidgetCarousel
              gap="sm"
              itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}
            >
              <StatCard
                title="API Requests"
                value="12.4K"
                change={{ value: 8.5, type: "increase" }}
                icon={<Activity className="w-5 h-5" />}
                glowColor="cyan"
              />
              <StatCard
                title="Active Sessions"
                value="24"
                change={{ value: 12, type: "increase" }}
                glowColor="purple"
              />
              <CircularProgressStat
                label="Health Score"
                value={95}
                max={100}
                unit="%"
                glowColor="green"
                size="md"
              />
              <MetricStat
                label="Cache Hit Rate"
                value={87}
                max={100}
                unit="%"
                glowColor="blue"
              />
            </WidgetCarousel>
          </div>

          {/* Carousel 4 - Quick Actions */}
          <div className="mb-4">
            <WidgetCarousel
              gap="sm"
              itemsPerView={{ base: 2, sm: 3, lg: 4, xl: 5 }}
            >
              <QuickActionCard
                icon={Terminal}
                label="Terminal"
                description="Open shell"
                glowColor="cyan"
              />
              <QuickActionCard
                icon={Database}
                label="Backups"
                description="3 available"
                glowColor="purple"
              />
              <QuickActionCard
                icon={Cloud}
                label="Sync"
                description="All synced"
                glowColor="green"
              />
              <QuickActionCard
                icon={Shield}
                label="Security"
                description="All clear"
                glowColor="blue"
              />
              <QuickActionCard
                icon={Settings}
                label="Config"
                description="System settings"
                glowColor="amber"
              />
            </WidgetCarousel>
          </div>
        </GlassTabsContent>

        {/* ==================== AI CHAT TAB ==================== */}
        <GlassTabsContent value="chat" className="m-0 mt-0 space-y-6">
          <WidgetCarousel
            className="w-full"
            gap="md"
            itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          >
            <StatCard
              title="Messages Today"
              value="1,247"
              change={{ value: 15, type: "increase" }}
              icon={<MessageSquare className="w-5 h-5" />}
              glowColor="purple"
            />
            <StatCard
              title="Tokens Used"
              value="845K"
              change={{ value: 23, type: "increase" }}
              glowColor="purple"
            />
            <CircularProgressStat
              label="API Quota"
              value={67}
              max={100}
              unit="%"
              glowColor="purple"
              size="md"
            />
            <MetricStat
              label="Avg Response"
              value={1.2}
              unit="s"
              glowColor="cyan"
            />
          </WidgetCarousel>

          <WidgetCarousel
            className="w-full"
            gap="md"
            itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 2 }}
          >
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
        </GlassTabsContent>

        {/* ==================== MEMORY TAB ==================== */}
        <GlassTabsContent value="memory" className="m-0 mt-0 space-y-6">
          <WidgetCarousel
            className="w-full"
            gap="md"
            itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          >
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

          {/* Memory Files Grid */}
          <WidgetCarousel
            className="w-full"
            gap="md"
            itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          >
            {memoryFiles.map((file, i) => (
              <MemoryFileCard key={i} {...file} />
            ))}
            <MemoryFileCard name="user-preferences.json" size="4 KB" modified="5 hours ago" />
            <MemoryFileCard name="session-data.bin" size="1 KB" modified="1 week ago" />
          </WidgetCarousel>
        </GlassTabsContent>

        {/* ==================== AUTOMATION TAB ==================== */}
        <GlassTabsContent value="automation" className="m-0 mt-0 space-y-6">
          <WidgetCarousel
            className="w-full"
            gap="md"
            itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          >
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

          {/* Tasks Grid */}
          <WidgetCarousel
            className="w-full"
            gap="md"
            itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          >
            {automationTasks.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </WidgetCarousel>

          <WidgetCarousel
            className="w-full"
            gap="md"
            itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 2 }}
          >
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
          </WidgetCarousel>
        </GlassTabsContent>

        {/* ==================== SCREEN TAB ==================== */}
        <GlassTabsContent value="screen" className="m-0 mt-0 space-y-6">
          <WidgetCarousel
            className="w-full"
            gap="md"
            itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          >
            <ServerStatusCard
              icon={Monitor}
              label="Screen Mirror"
              status="online"
              detail="Connected"
              glowColor="cyan"
            />
            <StatCard
              title="FPS"
              value="30"
              glowColor="green"
            />
            <CircularProgressStat
              label="Quality"
              value={85}
              max={100}
              unit="%"
              glowColor="green"
              size="md"
            />
            <MetricStat
              label="Latency"
              value={45}
              unit="ms"
              glowColor="cyan"
            />
          </WidgetCarousel>

          <WidgetCarousel
            className="w-full"
            gap="md"
            itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 3 }}
          >
            <QuickActionCard
              icon={Monitor}
              label="Fullscreen"
              description="Toggle fullscreen"
              glowColor="cyan"
            />
            <QuickActionCard
              icon={Settings}
              label="Quality"
              description="Adjust quality"
              glowColor="green"
            />
            <QuickActionCard
              icon={Database}
              label="Screenshot"
              description="Capture screen"
              glowColor="purple"
            />
          </WidgetCarousel>
        </GlassTabsContent>

        {/* ==================== BACKUPS TAB ==================== */}
        <GlassTabsContent value="backups" className="m-0 mt-0 space-y-6">
          <WidgetCarousel
            className="w-full"
            gap="md"
            itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          >
            <StatCard
              title="Total Backups"
              value="12"
              icon={<HardDrive className="w-5 h-5" />}
              glowColor="cyan"
            />
            <StatCard
              title="Total Size"
              value="4.2 GB"
              glowColor="purple"
            />
            <CircularProgressStat
              label="Storage"
              value={42}
              max={100}
              unit="%"
              glowColor="blue"
              size="md"
            />
            <MetricStat
              label="Last Backup"
              value={2}
              unit="hrs ago"
              glowColor="green"
            />
          </WidgetCarousel>

          <WidgetCarousel
            className="w-full"
            gap="md"
            itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 2 }}
          >
            <MultiGaugeWidget
              title="Backup Health"
              gauges={[
                { label: "Success", value: 11, color: "green" },
                { label: "Failed", value: 1, color: "red" },
                { label: "Pending", value: 0, color: "amber" },
              ]}
              glowColor="cyan"
            />
            <MultiProgressWidget
              title="Storage Breakdown"
              items={[
                { label: "Database", value: 1.8, max: 4.2, unit: "GB", color: "cyan" },
                { label: "Config", value: 0.5, max: 4.2, unit: "GB", color: "purple" },
                { label: "Files", value: 1.9, max: 4.2, unit: "GB", color: "blue" },
              ]}
              glowColor="blue"
            />
          </WidgetCarousel>
        </GlassTabsContent>

        {/* ==================== SETTINGS TAB ==================== */}
        <GlassTabsContent value="settings" className="m-0 mt-0 space-y-6">
          <WidgetCarousel
            className="w-full"
            gap="md"
            itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          >
            <ServerStatusCard
              icon={Server}
              label="API Server"
              status="online"
              detail="Port 9870"
              glowColor="cyan"
            />
            <ServerStatusCard
              icon={Database}
              label="Database"
              status="online"
              detail="Connected"
              glowColor="purple"
            />
            <ServerStatusCard
              icon={Shield}
              label="Auth"
              status="online"
              detail="JWT Active"
              glowColor="green"
            />
            <ServerStatusCard
              icon={Wifi}
              label="Network"
              status="online"
              detail="VPN Active"
              glowColor="blue"
            />
          </WidgetCarousel>

          <WidgetCarousel
            className="w-full"
            gap="md"
            itemsPerView={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          >
            <QuickActionCard
              icon={Settings}
              label="General"
              description="System settings"
              glowColor="cyan"
            />
            <QuickActionCard
              icon={Shield}
              label="Security"
              description="Auth & keys"
              glowColor="purple"
            />
            <QuickActionCard
              icon={Globe}
              label="Network"
              description="VPN & proxy"
              glowColor="blue"
            />
            <QuickActionCard
              icon={Database}
              label="Storage"
              description="Backup config"
              glowColor="green"
            />
          </WidgetCarousel>

          <WidgetCarousel
            className="w-full"
            gap="md"
            itemsPerView={{ base: 1, sm: 1, lg: 2, xl: 2 }}
          >
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
        </GlassTabsContent>

      </div>

      {/* Floating Tab Bar */}
      <div className="sticky bottom-0 z-20 flex justify-center pb-6 pt-4">
        <GlassTabsList className="flex items-center justify-center gap-1 px-2">
          {tabs.map((tab) => (
            <GlassTabsTrigger key={tab.value} value={tab.value} className="group p-3">
              <tab.icon className="h-4 w-4" />
              <span className="ml-2 hidden group-data-[state=active]:inline">{tab.label}</span>
            </GlassTabsTrigger>
          ))}
        </GlassTabsList>
      </div>
    </GlassTabs>
  );
}
