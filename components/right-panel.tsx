"use client"

import { useState } from "react"
import { Plus, MoreHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Item {
  id: string
  type: "idea" | "task" | "project" | "schedule"
  title: string
  description?: string
  status?: "pending" | "active" | "completed"
}

interface RightPanelProps {
  onClose?: () => void
}

export function RightPanel({ onClose }: RightPanelProps) {
  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      type: "idea",
      title: "AI-powered market analysis",
      description: "Develop autonomous trading algorithms",
    },
    { id: "2", type: "task", title: "Update Genesis module", status: "active" },
    { id: "3", type: "project", title: "NeuroLink Integration", status: "pending" },
    { id: "4", type: "schedule", title: "Team sync - 3:00 PM" },
  ])

  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const addItem = (type: Item["type"]) => {
    const newItem: Item = {
      id: Date.now().toString(),
      type,
      title: `New ${type}`,
      status: type === "task" || type === "project" ? "pending" : undefined,
    }
    setItems([...items, newItem])
  }

  const moveItem = (itemId: string, newType: Item["type"]) => {
    setItems(items.map((item) => (item.id === itemId ? { ...item, type: newType } : item)))
  }

  const getTypeColor = (type: Item["type"]) => {
    switch (type) {
      case "idea":
        return "text-yellow-400 border-yellow-400/30"
      case "task":
        return "text-green-400 border-green-400/30"
      case "project":
        return "text-blue-400 border-blue-400/30"
      case "schedule":
        return "text-purple-400 border-purple-400/30"
      default:
        return "text-gray-400 border-gray-400/30"
    }
  }

  return (
    <div className="w-80 md:w-80 bg-black/50 backdrop-blur-sm border-l border-cyan-500/20 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-cyan-500/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-cyan-400">Workspace</h2>
          {onClose && (
            <button onClick={onClose} className="md:hidden p-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => addItem("idea")}
            variant="outline"
            size="sm"
            className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
          >
            <Plus className="w-4 h-4 mr-1" />
            Idea
          </Button>
          <Button
            onClick={() => addItem("task")}
            variant="outline"
            size="sm"
            className="border-green-400/30 text-green-400 hover:bg-green-400/10"
          >
            <Plus className="w-4 h-4 mr-1" />
            Task
          </Button>
          <Button
            onClick={() => addItem("project")}
            variant="outline"
            size="sm"
            className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10"
          >
            <Plus className="w-4 h-4 mr-1" />
            Project
          </Button>
          <Button
            onClick={() => addItem("schedule")}
            variant="outline"
            size="sm"
            className="border-purple-400/30 text-purple-400 hover:bg-purple-400/10"
          >
            <Plus className="w-4 h-4 mr-1" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-full" style={{ minHeight: 0 }}>
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "p-3 rounded-lg border transition-all duration-200 cursor-pointer",
              "bg-gray-900/50 hover:bg-gray-800/50",
              getTypeColor(item.type),
            )}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase font-semibold opacity-70">{item.type}</span>
                  {item.status && (
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        item.status === "active" && "bg-green-500/20 text-green-400",
                        item.status === "pending" && "bg-yellow-500/20 text-yellow-400",
                        item.status === "completed" && "bg-gray-500/20 text-gray-400",
                      )}
                    >
                      {item.status}
                    </span>
                  )}
                </div>
                <h4 className="font-medium text-white mb-1">{item.title}</h4>
                {item.description && <p className="text-sm text-gray-400">{item.description}</p>}
              </div>

              {hoveredItem === item.id && (
                <div className="flex gap-1 ml-2">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-white/10">
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>

            {/* Move Actions (shown on hover) */}
            {hoveredItem === item.id && (
              <div className="mt-2 pt-2 border-t border-gray-700/50">
                <div className="flex gap-1 text-xs">
                  {(["idea", "task", "project", "schedule"] as const).map(
                    (type) =>
                      type !== item.type && (
                        <button
                          key={type}
                          onClick={() => moveItem(item.id, type)}
                          className="px-2 py-1 rounded bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-colors"
                        >
                          → {type}
                        </button>
                      ),
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add some test items to demonstrate scrolling */}
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={`test-${i}`}
            className="p-3 rounded-lg border transition-all duration-200 cursor-pointer bg-gray-900/50 hover:bg-gray-800/50 text-gray-400 border-gray-400/30"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-semibold opacity-70">test</span>
            </div>
            <h4 className="font-medium text-white mb-1">Test Item {i + 1}</h4>
            <p className="text-sm text-gray-400">This is a test item to demonstrate scrolling functionality</p>
          </div>
        ))}
      </div>
    </div>
  )
}
