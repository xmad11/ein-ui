import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Cpu,
  HardDrive,
  Wifi,
  Shield,
  CheckCircle2,
  Settings,
  Power,
  RefreshCw
} from "lucide-react"

export default function XmadDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      {/* Main container */}
      <div className="relative z-10 container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">⬡</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">XMAD Control Center</h1>
              <p className="text-sm text-slate-400">v4.0</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Widgets Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* OpenClaw Widget */}
          <Card className="glass-card p-4 border-cyan-500/30 hover:border-cyan-500/50 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Cpu className="h-4 w-4 text-cyan-400" />
              </div>
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Running
              </Badge>
            </div>
            <h3 className="text-sm font-semibold text-slate-300 mb-1">OpenClaw</h3>
            <p className="text-2xl font-bold text-white mb-1">527 MB</p>
            <p className="text-xs text-slate-400">AI Gateway</p>
          </Card>

          {/* Guardian Widget */}
          <Card className="glass-card p-4 border-purple-500/30 hover:border-purple-500/50 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Shield className="h-4 w-4 text-purple-400" />
              </div>
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Online
              </Badge>
            </div>
            <h3 className="text-sm font-semibold text-slate-300 mb-1">Guardian</h3>
            <p className="text-2xl font-bold text-white mb-1">4/6</p>
            <p className="text-xs text-slate-400">Agents Active</p>
          </Card>

          {/* Memory Widget */}
          <Card className="glass-card p-4 border-blue-500/30 hover:border-blue-500/50 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <HardDrive className="h-4 w-4 text-blue-400" />
              </div>
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Good
              </Badge>
            </div>
            <h3 className="text-sm font-semibold text-slate-300 mb-1">Memory</h3>
            <p className="text-2xl font-bold text-white mb-1">790 MB</p>
            <p className="text-xs text-slate-400">Free RAM</p>
          </Card>

          {/* Network Widget */}
          <Card className="glass-card p-4 border-indigo-500/30 hover:border-indigo-500/50 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <Wifi className="h-4 w-4 text-indigo-400" />
              </div>
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            </div>
            <h3 className="text-sm font-semibold text-slate-300 mb-1">Network</h3>
            <p className="text-2xl font-bold text-white mb-1">VPN</p>
            <p className="text-xs text-slate-400">Tailscale</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto py-3 flex-col gap-2">
              <Power className="h-4 w-4" />
              <span className="text-sm">Optimize PC</span>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex-col gap-2">
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Restart</span>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex-col gap-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Guardian</span>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex-col gap-2">
              <Settings className="h-4 w-4" />
              <span className="text-sm">Settings</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
