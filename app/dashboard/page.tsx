"use client";

import { Card } from "@/components/ui/card";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-16">
      {/* Background grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Main Content - Empty for now */}
      <main className="p-6">
        <Card className="h-full glass-card flex items-center justify-center min-h-[calc(100vh-7rem)]">
          <div className="text-center">
            <LayoutDashboard className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-400">Dashboard Content</h2>
            <p className="text-slate-500 mt-2">This area is ready for your content</p>
          </div>
        </Card>
      </main>
    </div>
  );
}
