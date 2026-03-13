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
  Zap,
  Star,
  Heart,
  Bell,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  Globe,
  Server,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent } from "@/registry/liquid-glass/glass-tabs";
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/registry/liquid-glass/glass-card";
import { GlassBadge } from "@/registry/liquid-glass/glass-badge";
import { GlassProgress } from "@/registry/liquid-glass/glass-progress";
import { GlassAvatar, GlassAvatarImage, GlassAvatarFallback } from "@/registry/liquid-glass/glass-avatar";
import { GlassGauge } from "@/registry/innovative/glass-gauge";
import { GlassMorphCard } from "@/registry/innovative/glass-morph-card";
import { GlassTimeline } from "@/registry/innovative/glass-timeline";
import { WidgetCarousel } from "@/components/carousel/WidgetCarousel";
import { GlassWidgetBase } from "@/registry/widgets/base-widget";

// Widgets
import { StockTickerWidget, CompactStockWidget, MarketOverviewWidget, CryptoWidget, PortfolioWidget } from "@/registry/widgets/stock-widget";
import { WeatherWidget, CurrentWeatherWidget, ForecastWidget, DetailedWeatherWidget, HourlyWeatherWidget } from "@/registry/widgets/weather-widget";
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

// Data
const forecastData = [
  { day: "Mon", high: 31, low: 24, condition: "sunny" as const },
  { day: "Tue", high: 29, low: 23, condition: "cloudy" as const },
  { day: "Wed", high: 27, low: 22, condition: "rainy" as const },
  { day: "Thu", high: 30, low: 24, condition: "sunny" as const },
  { day: "Fri", high: 32, low: 25, condition: "sunny" as const },
];

const marketIndices = [
  { name: "S&P 500", value: 5234.50, change: 45.20, changePercent: 0.87 },
  { name: "NASDAQ", value: 16428.82, change: -12.34, changePercent: -0.08 },
  { name: "DOW", value: 39127.14, change: 156.33, changePercent: 0.40 },
];

const todayEvents = [
  { id: "1", title: "Team Standup", time: "09:00 AM", color: "bg-cyan-500" },
  { id: "2", title: "Design Review", time: "02:00 PM", color: "bg-purple-500" },
  { id: "3", title: "Client Call", time: "04:30 PM", color: "bg-amber-500" },
];

const worldClocks = [
  { city: "New York", timezone: "America/New_York", isDay: true },
  { city: "London", timezone: "Europe/London", isDay: false },
  { city: "Tokyo", timezone: "Asia/Tokyo", isDay: false },
];

const timelineItems = [
  { id: "1", title: "Project Started", description: "Initial commit", date: "2024-01-15", icon: <Calendar className="w-4 h-4" /> },
  { id: "2", title: "Milestone 1", description: "Core features complete", date: "2024-02-01", icon: <CheckCircle2 className="w-4 h-4" /> },
  { id: "3", title: "Beta Release", description: "Testing phase", date: "2024-03-01", icon: <Zap className="w-4 h-4" /> },
  { id: "4", title: "Launch", description: "Public release", date: "2024-04-01", icon: <Star className="w-4 h-4" /> },
];

const portfolioHoldings = [
  { symbol: "AAPL", name: "Apple", shares: 50, avgCost: 175, currentPrice: 198.45 },
  { symbol: "GOOGL", name: "Google", shares: 20, avgCost: 140, currentPrice: 156.20 },
  { symbol: "MSFT", name: "Microsoft", shares: 30, avgCost: 380, currentPrice: 415.80 },
];

const hourlyWeather = [
  { time: "9AM", temperature: 22, icon: "sun" as const },
  { time: "12PM", temperature: 26, icon: "sun" as const },
  { time: "3PM", temperature: 28, icon: "cloud" as const },
  { time: "6PM", temperature: 25, icon: "cloud" as const },
  { time: "9PM", temperature: 21, icon: "sun" as const },
];

// Mini Card Component - Using GlassWidgetBase for consistency
function MiniStatCard({ icon: Icon, label, value, trend, glowColor }: { icon: React.ElementType; label: string; value: string; trend?: "up" | "down"; glowColor: "cyan" | "purple" | "blue" | "pink" | "green" | "amber" | "red" }) {
  return (
    <GlassWidgetBase size="md" width="sm" glowColor={glowColor}>
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-white/70" />
        {trend && (trend === "up" ? <ArrowUpRight className="h-4 w-4 text-emerald-400" /> : <ArrowDownRight className="h-4 w-4 text-rose-400" />)}
      </div>
      <div className="mt-3">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-white/60">{label}</div>
      </div>
    </GlassWidgetBase>
  );
}

// User Card Component - Using GlassWidgetBase for consistency
function UserCard({ name, role, avatar, status }: { name: string; role: string; avatar: string; status: "online" | "offline" | "busy" }) {
  const statusColors = { online: "bg-emerald-500", offline: "bg-gray-500", busy: "bg-amber-500" };
  return (
    <GlassWidgetBase size="md" width="sm" glowColor="green">
      <div className="flex items-center gap-3">
        <div className="relative">
          <GlassAvatar>
            <GlassAvatarImage src={avatar} />
            <GlassAvatarFallback>{name[0]}</GlassAvatarFallback>
          </GlassAvatar>
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${statusColors[status]} border-2 border-slate-900`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-medium truncate">{name}</div>
          <div className="text-white/50 text-sm truncate">{role}</div>
        </div>
        <GlassBadge variant={status === "online" ? "success" : "outline"}>{status}</GlassBadge>
      </div>
    </GlassWidgetBase>
  );
}

// Project Card Component - Using GlassWidgetBase for consistency
function ProjectCard({ name, progress, team, status }: { name: string; progress: number; team: number; status: string }) {
  return (
    <GlassWidgetBase size="md" width="sm" glowColor="pink">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-medium">{name}</span>
        <GlassBadge>{status}</GlassBadge>
      </div>
      <GlassProgress value={progress} className="mb-2" />
      <div className="flex items-center justify-between text-sm text-white/50">
        <span>{progress}% complete</span>
        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {team}</span>
      </div>
    </GlassWidgetBase>
  );
}

// Server Stat Card - Using GlassWidgetBase for consistency
function ServerStatCard({ icon: Icon, label, value, progress, glowColor }: { icon: React.ElementType; label: string; value: string; progress: number; glowColor: "cyan" | "purple" | "blue" | "pink" | "green" | "amber" | "red" }) {
  return (
    <GlassWidgetBase size="md" width="sm" glowColor={glowColor}>
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-white/70" />
        <div>
          <div className="text-white/60 text-sm">{label}</div>
          <div className="text-white text-xl font-bold">{value}</div>
        </div>
      </div>
      <GlassProgress value={progress} className="mt-2" />
    </GlassWidgetBase>
  );
}

// System Status Card - Using GlassWidgetBase for consistency
function SystemStatusCard({ icon: Icon, label, status, statusText, glowColor }: { icon: React.ElementType; label: string; status: "success" | "warning" | "error"; statusText: string; glowColor: "cyan" | "purple" | "blue" | "pink" | "green" | "amber" | "red" }) {
  return (
    <GlassWidgetBase size="md" width="sm" glowColor={glowColor}>
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-white/70" />
        <div>
          <div className="text-white/60 text-sm">{label}</div>
          <div className="text-white text-xl font-bold">{statusText}</div>
        </div>
      </div>
      <GlassBadge variant={status === "success" ? "success" : status === "warning" ? "warning" : "destructive"} className="mt-2">
        {status === "success" ? "Online" : status === "warning" ? "Warning" : "Error"}
      </GlassBadge>
    </GlassWidgetBase>
  );
}

// Quick Action Card - Using GlassWidgetBase for consistency
function QuickActionCard({ icon: Icon, label, colorClass, glowColor }: { icon: React.ElementType; label: string; colorClass: string; glowColor: "cyan" | "purple" | "blue" | "pink" | "green" | "amber" | "red" }) {
  return (
    <GlassWidgetBase size="md" width="sm" glowColor={glowColor}>
      <div className="flex flex-col items-center gap-2">
        <div className={`p-3 rounded-xl ${colorClass}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className="text-white text-sm">{label}</span>
      </div>
    </GlassWidgetBase>
  );
}

// Timeline Card - Using GlassWidgetBase for consistency
function TimelineCard({ title, items, glowColor }: { title: string; items: typeof timelineItems; glowColor: "cyan" | "purple" | "blue" | "pink" | "green" | "amber" | "red" }) {
  return (
    <GlassWidgetBase size="lg" width="md" glowColor={glowColor}>
      <GlassCardHeader>
        <GlassCardTitle className="text-white">{title}</GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        <GlassTimeline items={items} />
      </GlassCardContent>
    </GlassWidgetBase>
  );
}

// Events Card - Using GlassWidgetBase for consistency
function EventsCard({ title, events, glowColor }: { title: string; events: typeof todayEvents; glowColor: "cyan" | "purple" | "blue" | "pink" | "green" | "amber" | "red" }) {
  return (
    <GlassWidgetBase size="md" width="sm" glowColor={glowColor}>
      <GlassCardHeader>
        <GlassCardTitle className="text-white text-sm">{title}</GlassCardTitle>
      </GlassCardHeader>
      <div className="space-y-2">
        {events.map(e => (
          <div key={e.id} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${e.color}`} />
            <span className="text-white/70 text-sm">{e.title}</span>
            <span className="text-white/40 text-xs ml-auto">{e.time}</span>
          </div>
        ))}
      </div>
    </GlassWidgetBase>
  );
}

// Gauge Card - Using GlassWidgetBase for consistency
function GaugeCard({ value, label, colorScheme }: { value: number; label: string; colorScheme: "cyan" | "purple" | "green" | "orange" }) {
  // Map gauge colors to widget glow colors
  const glowColorMap: Record<string, "cyan" | "purple" | "green" | "amber"> = {
    cyan: "cyan",
    purple: "purple",
    green: "green",
    orange: "amber",
  };
  return (
    <GlassWidgetBase size="lg" width="sm" glowColor={glowColorMap[colorScheme]}>
      <GlassGauge value={value} label={label} colorScheme={colorScheme} />
    </GlassWidgetBase>
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
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="flex-1 relative z-10 overflow-auto p-6 space-y-6">
        {/* ==================== DASHBOARD TAB ==================== */}
        <GlassTabsContent value="dashboard" className="m-0 mt-0 space-y-6">
          {/* Carousel 1 - Clock & Time Widgets */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <DigitalClockWidget showSeconds />
            <AnalogClockWidget size="lg" />
            <WorldClockWidget clocks={worldClocks} />
            <StopwatchWidget />
            <TimerWidget initialMinutes={10} />
          </WidgetCarousel>

          {/* Carousel 2 - Weather Widgets */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <CurrentWeatherWidget location="San Francisco" temperature={24} condition="sunny" humidity={45} windSpeed={12} />
            <DetailedWeatherWidget temperature={28} condition="Sunny" humidity={55} windSpeed={8} location="New York" />
            <ForecastWidget forecast={forecastData} />
            <WeatherWidget temperature={22} condition="Cloudy" icon="cloud" location="London" />
            <HourlyWeatherWidget hours={hourlyWeather} />
          </WidgetCarousel>

          {/* Carousel 3 - Stats Cards */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <StatCard title="Active Users" value="2,847" change={{ value: 12.5, type: "increase" }} icon={<Activity className="w-5 h-5" />} glowColor="cyan" />
            <StatCard title="Revenue" value="$45.2K" change={{ value: 8.3, type: "increase" }} icon={<TrendingUp className="w-5 h-5" />} glowColor="cyan" />
            <CircularProgressStat label="CPU Usage" value={67} max={100} unit="%" glowColor="cyan" size="md" />
            <MetricStat label="Memory" value={7.8} max={16} unit="GB" glowColor="cyan" />
            <ComparisonStat title="Sessions" current={45234} previous={38210} format={(v) => v.toLocaleString()} glowColor="cyan" />
          </WidgetCarousel>

          {/* Carousel 4 - Mini Stats */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <MiniStatCard icon={Zap} label="Performance" value="98%" trend="up" glowColor="cyan" />
            <MiniStatCard icon={Heart} label="Health Score" value="95%" trend="up" glowColor="green" />
            <MiniStatCard icon={Shield} label="Security" value="100%" glowColor="purple" />
            <MiniStatCard icon={Globe} label="Uptime" value="99.9%" trend="up" glowColor="blue" />
            <MiniStatCard icon={Activity} label="Response" value="45ms" trend="down" glowColor="amber" />
          </WidgetCarousel>

          {/* Carousel 5 - Gauges */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <GaugeCard value={75} label="CPU" colorScheme="cyan" />
            <GaugeCard value={45} label="Memory" colorScheme="green" />
            <GaugeCard value={90} label="Disk" colorScheme="purple" />
            <GaugeCard value={30} label="Network" colorScheme="cyan" />
            <GaugeCard value={60} label="Battery" colorScheme="orange" />
          </WidgetCarousel>
        </GlassTabsContent>

        {/* ==================== ANALYTICS TAB ==================== */}
        <GlassTabsContent value="analytics" className="m-0 mt-0 space-y-6">
          {/* Carousel 1 - Stocks */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <StockTickerWidget symbol="AAPL" name="Apple Inc." price={198.45} change={2.34} changePercent={1.19} chartData={[190, 192, 188, 195, 193, 197, 198]} />
            <StockTickerWidget symbol="GOOGL" name="Alphabet" price={156.20} change={-1.45} changePercent={-0.92} chartData={[160, 158, 155, 157, 154, 156, 156]} />
            <StockTickerWidget symbol="MSFT" name="Microsoft" price={415.80} change={5.20} changePercent={1.27} chartData={[400, 405, 408, 410, 412, 415, 416]} />
            <MarketOverviewWidget indices={marketIndices} />
            <PortfolioWidget title="Portfolio" totalValue={125000} totalChange={8.5} holdings={portfolioHoldings} />
          </WidgetCarousel>

          {/* Carousel 2 - Crypto */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <CryptoWidget symbol="BTC" name="Bitcoin" price={67234} change24h={2.45} marketCap="$1.32T" volume24h="$28.5B" />
            <CryptoWidget symbol="ETH" name="Ethereum" price={3456} change24h={-1.23} marketCap="$415B" volume24h="$12.3B" />
            <CryptoWidget symbol="SOL" name="Solana" price={178} change24h={5.67} marketCap="$82B" volume24h="$3.2B" />
            <CompactStockWidget symbol="DOGE" price={0.15} change={0.02} changePercent={15.4} />
            <CompactStockWidget symbol="ADA" price={0.62} change={-0.03} changePercent={-4.6} />
          </WidgetCarousel>

          {/* Carousel 3 - Analytics Stats */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <StatCard title="Page Views" value="45.2K" change={{ value: 18, type: "increase" }} glowColor="purple" />
            <StatCard title="Bounce Rate" value="32%" change={{ value: 4, type: "decrease" }} glowColor="purple" />
            <StatCard title="Session Duration" value="4m 32s" change={{ value: 12, type: "increase" }} glowColor="purple" />
            <ComparisonStat title="Conversions" current={1247} previous={1069} format={(v) => v.toLocaleString()} glowColor="purple" />
            <MetricStat label="Goal Progress" value={78} max={100} unit="%" glowColor="purple" />
          </WidgetCarousel>

          {/* Carousel 4 - Performance Cards */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <ServerStatCard icon={Server} label="Server Load" value="45%" progress={45} glowColor="purple" />
            <ServerStatCard icon={Database} label="DB Queries" value="1.2K/s" progress={60} glowColor="purple" />
            <ServerStatCard icon={Wifi} label="Bandwidth" value="890 MB/s" progress={35} glowColor="purple" />
            <ServerStatCard icon={Cpu} label="API Calls" value="45K/min" progress={72} glowColor="purple" />
            <ServerStatCard icon={HardDrive} label="Storage I/O" value="234 MB/s" progress={55} glowColor="purple" />
          </WidgetCarousel>

          {/* Carousel 5 - Timeline */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <TimelineCard title="Activity Timeline" items={timelineItems} glowColor="purple" />
            <TimelineCard title="Recent Events" items={timelineItems.slice(0, 3)} glowColor="purple" />
            <TimelineCard title="Milestones" items={timelineItems.slice(2)} glowColor="purple" />
            <TimelineCard title="Weekly Progress" items={timelineItems} glowColor="purple" />
            <TimelineCard title="Team Updates" items={timelineItems.slice(1, 4)} glowColor="purple" />
          </WidgetCarousel>
        </GlassTabsContent>

        {/* ==================== USERS TAB ==================== */}
        <GlassTabsContent value="users" className="m-0 mt-0 space-y-6">
          {/* Carousel 1 - User Stats */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <StatCard title="Total Users" value="12,453" change={{ value: 15.2, type: "increase" }} icon={<Users className="w-5 h-5" />} glowColor="green" />
            <StatCard title="Active Today" value="2,341" change={{ value: 8.7, type: "increase" }} glowColor="green" />
            <StatCard title="Verified" value="89%" change={{ value: 3.2, type: "increase" }} icon={<Shield className="w-5 h-5" />} glowColor="green" />
            <CircularProgressStat label="Engagement" value={82} max={100} unit="%" glowColor="green" size="md" />
            <ComparisonStat title="New Signups" current={456} previous={312} format={(v) => v.toString()} glowColor="green" />
          </WidgetCarousel>

          {/* Carousel 2 - User Cards */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <UserCard name="Alice Johnson" role="Product Manager" avatar="" status="online" />
            <UserCard name="Bob Smith" role="Developer" avatar="" status="online" />
            <UserCard name="Carol Davis" role="Designer" avatar="" status="busy" />
            <UserCard name="David Wilson" role="Marketing" avatar="" status="offline" />
            <UserCard name="Eva Martinez" role="Engineer" avatar="" status="online" />
          </WidgetCarousel>

          {/* Carousel 3 - Communication Stats */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <MiniStatCard icon={Mail} label="Emails Sent" value="1,234" trend="up" glowColor="green" />
            <MiniStatCard icon={MessageSquare} label="Messages" value="856" trend="up" glowColor="green" />
            <MiniStatCard icon={Bell} label="Notifications" value="45" glowColor="green" />
            <MiniStatCard icon={Star} label="Avg Rating" value="4.8" trend="up" glowColor="green" />
            <MiniStatCard icon={Heart} label="Satisfaction" value="96%" trend="up" glowColor="green" />
          </WidgetCarousel>

          {/* Carousel 4 - World Clocks */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <WorldClockWidget clocks={[{ city: "New York", timezone: "America/New_York", isDay: true }]} />
            <WorldClockWidget clocks={[{ city: "London", timezone: "Europe/London", isDay: false }]} />
            <WorldClockWidget clocks={[{ city: "Tokyo", timezone: "Asia/Tokyo", isDay: false }]} />
            <WorldClockWidget clocks={[{ city: "Sydney", timezone: "Australia/Sydney", isDay: true }]} />
            <WorldClockWidget clocks={[{ city: "Dubai", timezone: "Asia/Dubai", isDay: true }]} />
          </WidgetCarousel>

          {/* Carousel 5 - Activity Gauges */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <GaugeCard value={85} label="Active" colorScheme="green" />
            <GaugeCard value={72} label="Retention" colorScheme="green" />
            <GaugeCard value={94} label="Satisfaction" colorScheme="cyan" />
            <GaugeCard value={68} label="Growth" colorScheme="green" />
            <GaugeCard value={91} label="Quality" colorScheme="cyan" />
          </WidgetCarousel>
        </GlassTabsContent>

        {/* ==================== PROJECTS TAB ==================== */}
        <GlassTabsContent value="projects" className="m-0 mt-0 space-y-6">
          {/* Carousel 1 - Project Stats */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <StatCard title="Active Projects" value="24" change={{ value: 12, type: "increase" }} glowColor="pink" />
            <StatCard title="In Progress" value="12" change={{ value: 8, type: "increase" }} glowColor="pink" />
            <StatCard title="Completed" value="156" change={{ value: 5, type: "increase" }} glowColor="pink" />
            <CircularProgressStat label="On Track" value={78} max={100} unit="%" glowColor="pink" size="md" />
            <ComparisonStat title="Tasks Done" current={234} previous={198} format={(v) => v.toString()} glowColor="pink" />
          </WidgetCarousel>

          {/* Carousel 2 - Project Cards */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <ProjectCard name="Website Redesign" progress={75} team={5} status="Active" />
            <ProjectCard name="Mobile App" progress={45} team={8} status="In Progress" />
            <ProjectCard name="API Integration" progress={90} team={3} status="Review" />
            <ProjectCard name="Dashboard v2" progress={30} team={4} status="Planning" />
            <ProjectCard name="Security Audit" progress={100} team={2} status="Complete" />
          </WidgetCarousel>

          {/* Carousel 3 - Calendar Widgets */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <EventsCalendarWidget events={todayEvents} />
            <CalendarWidget />
            <CompactCalendarWidget />
            <EventsCard title="Upcoming" events={todayEvents} glowColor="pink" />
            <GlassWidgetBase size="md" width="sm" glowColor="pink">
              <GlassCardHeader>
                <GlassCardTitle className="text-white text-sm">This Week</GlassCardTitle>
              </GlassCardHeader>
              <div className="text-white/60 text-sm">12 events scheduled</div>
              <GlassProgress value={40} className="mt-2" />
            </GlassWidgetBase>
          </WidgetCarousel>

          {/* Carousel 4 - Task Stats */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <MiniStatCard icon={CheckCircle2} label="Completed" value="89" trend="up" glowColor="pink" />
            <MiniStatCard icon={Clock} label="Pending" value="34" glowColor="pink" />
            <MiniStatCard icon={AlertCircle} label="Overdue" value="5" trend="down" glowColor="pink" />
            <MiniStatCard icon={Zap} label="Priority" value="12" glowColor="pink" />
            <MiniStatCard icon={Star} label="Starred" value="28" trend="up" glowColor="pink" />
          </WidgetCarousel>

          {/* Carousel 5 - Progress Gauges */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <GaugeCard value={75} label="Design" colorScheme="purple" />
            <GaugeCard value={60} label="Dev" colorScheme="purple" />
            <GaugeCard value={85} label="Testing" colorScheme="purple" />
            <GaugeCard value={40} label="Deploy" colorScheme="purple" />
            <GaugeCard value={92} label="Quality" colorScheme="purple" />
          </WidgetCarousel>
        </GlassTabsContent>

        {/* ==================== SETTINGS TAB ==================== */}
        <GlassTabsContent value="settings" className="m-0 mt-0 space-y-6">
          {/* Carousel 1 - System Stats */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <MetricStat label="Storage Used" value={45.2} max={100} unit="GB" glowColor="blue" />
            <MetricStat label="Memory" value={7.8} max={16} unit="GB" glowColor="blue" />
            <CircularProgressStat label="Uptime" value={99.9} max={100} unit="%" glowColor="blue" size="md" />
            <StatCard title="API Requests" value="1.2M" change={{ value: 15, type: "increase" }} glowColor="blue" />
            <ComparisonStat title="Errors" current={12} previous={45} format={(v) => v.toString()} glowColor="blue" />
          </WidgetCarousel>

          {/* Carousel 2 - System Health */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <SystemStatusCard icon={Server} label="Server Status" status="success" statusText="Healthy" glowColor="blue" />
            <SystemStatusCard icon={Database} label="Database" status="success" statusText="Connected" glowColor="blue" />
            <SystemStatusCard icon={Shield} label="Security" status="success" statusText="Protected" glowColor="blue" />
            <SystemStatusCard icon={Wifi} label="Network" status="success" statusText="Stable" glowColor="blue" />
            <SystemStatusCard icon={Cpu} label="CPU" status="success" statusText="Normal" glowColor="blue" />
          </WidgetCarousel>

          {/* Carousel 3 - Weather in Settings */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <WeatherWidget temperature={28} condition="Partly Cloudy" icon="cloud" location="Server Room" />
            <CurrentWeatherWidget location="Data Center" temperature={22} condition="cloudy" humidity={35} windSpeed={5} />
            <DetailedWeatherWidget temperature={25} condition="Clear" humidity={40} windSpeed={3} location="HQ" />
            <ForecastWidget forecast={forecastData} />
            <HourlyWeatherWidget hours={hourlyWeather} />
          </WidgetCarousel>

          {/* Carousel 4 - Quick Actions */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <QuickActionCard icon={Clock} label="Schedule" colorClass="bg-blue-500/20" glowColor="blue" />
            <QuickActionCard icon={Bell} label="Alerts" colorClass="bg-indigo-500/20" glowColor="purple" />
            <QuickActionCard icon={Shield} label="Security" colorClass="bg-violet-500/20" glowColor="purple" />
            <QuickActionCard icon={Database} label="Backup" colorClass="bg-purple-500/20" glowColor="purple" />
            <QuickActionCard icon={Settings} label="Config" colorClass="bg-fuchsia-500/20" glowColor="purple" />
          </WidgetCarousel>

          {/* Carousel 5 - System Gauges */}
          <WidgetCarousel className="w-full max-w-sm mx-auto">
            <GaugeCard value={55} label="CPU" colorScheme="cyan" />
            <GaugeCard value={70} label="RAM" colorScheme="cyan" />
            <GaugeCard value={40} label="Disk" colorScheme="purple" />
            <GaugeCard value={25} label="Network" colorScheme="purple" />
            <GaugeCard value={88} label="Health" colorScheme="cyan" />
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
