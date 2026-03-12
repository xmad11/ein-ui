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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-16">
      {/* Background grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="flex h-[calc(100vh-4rem)] relative z-10">
        {/* Side Menu */}
        <aside
          className={`${
            sidebarCollapsed ? "w-16" : "w-64"
          } bg-slate-900/50 border-r border-slate-800/50 backdrop-blur-xl transition-all duration-300 flex flex-col`}
        >
          {/* Menu Items */}
          <nav className="flex-1 p-3 space-y-1 pt-4">
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

        {/* Main Content - Empty for now */}
        <main className="flex-1 p-6 overflow-auto">
          <Card className="h-full glass-card flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <LayoutDashboard className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-400">Dashboard Content</h2>
              <p className="text-slate-500 mt-2">This area is ready for your content</p>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
