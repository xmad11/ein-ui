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

const tabs = [
  { value: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { value: "analytics", icon: BarChart3, label: "Analytics" },
  { value: "users", icon: Users, label: "Users" },
  { value: "projects", icon: FolderKanban, label: "Projects" },
  { value: "settings", icon: Settings, label: "Settings" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <GlassTabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-16 flex flex-col"
    >
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
            <div className="text-center">
              <Users className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-400">Users</h2>
              <p className="text-slate-500 mt-2">Manage team members</p>
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
