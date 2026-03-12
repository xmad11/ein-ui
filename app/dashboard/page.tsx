"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  { icon: FolderKanban, label: "Projects", href: "/dashboard/projects" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="flex h-screen relative z-10">
        {/* Side Menu */}
        <aside
          className={`${
            sidebarCollapsed ? "w-16" : "w-64"
          } bg-slate-900/50 border-r border-slate-800/50 backdrop-blur-xl transition-all duration-300 flex flex-col`}
        >
          {/* Logo */}
          <div className="p-4 border-b border-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-white">Dashboard</h1>
                  <p className="text-xs text-slate-400">Control Panel</p>
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-3 space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={`w-full ${
                  sidebarCollapsed ? "justify-center px-2" : "justify-start px-3"
                } text-slate-300 hover:text-white hover:bg-slate-800/50`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
              </Button>
            ))}
          </nav>

          {/* Collapse Toggle */}
          <div className="p-3 border-t border-slate-800/50">
            <Button
              variant="ghost"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full justify-center text-slate-400 hover:text-white hover:bg-slate-800/50"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <>
                  <ChevronLeft className="h-5 w-5" />
                  <span className="ml-2">Collapse</span>
                </>
              )}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="h-16 bg-slate-900/30 border-b border-slate-800/50 backdrop-blur-xl flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-64"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            </div>
          </header>

          {/* Page Content - Empty for now */}
          <div className="flex-1 p-6 overflow-auto">
            <Card className="h-full glass-card flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <LayoutDashboard className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-slate-400">Dashboard Content</h2>
                <p className="text-slate-500 mt-2">This area is ready for your content</p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
