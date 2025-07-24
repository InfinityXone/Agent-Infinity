"use client"
import { cn } from "@/lib/utils"
import { Zap, Brain, Database, Rocket, Link, TrendingUp, FileText, BarChart3, Settings, Shield, X } from "lucide-react"

interface SidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
  onClose?: () => void
}

const menuItems = [
  { id: "edge-prompts", label: "Edge Prompts", icon: Zap, href: "/edge-prompts" },
  { id: "genesis", label: "Genesis", icon: Brain, href: "/genesis" },
  { id: "ixo-intel", label: "IXO Intel", icon: Database, href: "/ixo-intel" },
  { id: "boost-ai", label: "Boost AI", icon: Rocket, href: "/boost-ai" },
  { id: "neurolink", label: "NeuroLink", icon: Link, href: "/neurolink" },
  { id: "x1-predict", label: "X1 Predict", icon: TrendingUp, href: "/x1-predict" },
  { id: "alpha-summary", label: "Alpha Summary", icon: FileText, href: "/alpha-summary" },
  { id: "analyze", label: "Analyze", icon: BarChart3, href: "/analyze" },
  { id: "stockbot", label: "StockBot", icon: TrendingUp, href: "/stockbot" },
]

export function Sidebar({ activeModule, setActiveModule, onClose }: SidebarProps) {
  const handleNavigation = (item: any) => {
    setActiveModule(item.id)
    if (item.href) {
      window.location.href = item.href
    }
    onClose?.()
  }

  return (
    <div className="w-64 md:w-64 bg-black/50 backdrop-blur-sm border-r border-cyan-500/20 flex flex-col h-full">
      {/* Hamburger Menu */}
      <div className="p-4 border-b border-cyan-500/20 flex items-center justify-between">
        <button
          onClick={() => (window.location.href = "/")}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
        >
          <div className="flex flex-col gap-1">
            <div className="w-5 h-0.5 bg-cyan-400 transition-all duration-300"></div>
            <div className="w-5 h-0.5 bg-cyan-400 transition-all duration-300"></div>
            <div className="w-5 h-0.5 bg-cyan-400 transition-all duration-300"></div>
          </div>
          <span className="font-medium">Home</span>
        </button>

        {/* Close button for mobile */}
        {onClose && (
          <button onClick={onClose} className="md:hidden p-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto min-h-0 scrollbar-full">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent",
                "text-left text-gray-300 hover:text-cyan-400",
                activeModule === item.id && "bg-cyan-500/20 border-cyan-500/50 text-cyan-400",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-cyan-500/20 space-y-2">
        <button
          onClick={() => handleNavigation({ id: "settings", href: "/settings" })}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
            "hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent",
            "text-left text-gray-300 hover:text-cyan-400",
            activeModule === "settings" && "bg-cyan-500/20 border-cyan-500/50 text-cyan-400",
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>

        <button
          onClick={() => handleNavigation({ id: "super-admin", href: "/super-admin" })}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
            "hover:bg-red-500/10 hover:border-red-500/30 border border-transparent",
            "text-left text-gray-300 hover:text-red-400",
            activeModule === "super-admin" && "bg-red-500/20 border-red-500/50 text-red-400",
          )}
        >
          <Shield className="w-5 h-5" />
          <span className="font-medium">Super Admin</span>
        </button>
      </div>
    </div>
  )
}
