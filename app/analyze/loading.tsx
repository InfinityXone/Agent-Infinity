import { BarChart3 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar Skeleton */}
        <div className="w-64 bg-black/50 backdrop-blur-sm border-r border-cyan-500/20 flex flex-col h-full">
          <div className="p-4 border-b border-cyan-500/20">
            <div className="h-12 bg-gray-700/50 rounded-lg animate-pulse" />
          </div>
          <div className="flex-1 p-4 space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-700/30 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 flex flex-col h-full">
          <div className="p-6 border-b border-cyan-500/20 bg-black/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-cyan-400 animate-pulse" />
              <div>
                <div className="h-8 w-32 bg-gray-700/50 rounded animate-pulse mb-2" />
                <div className="h-4 w-48 bg-gray-700/30 rounded animate-pulse" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Search Skeleton */}
            <div className="h-16 bg-gray-700/30 rounded-lg animate-pulse" />

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 bg-gray-700/30 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel Skeleton */}
        <div className="w-80 bg-black/50 backdrop-blur-sm border-l border-cyan-500/20 flex flex-col h-full">
          <div className="p-4 border-b border-cyan-500/20">
            <div className="h-8 bg-gray-700/50 rounded animate-pulse mb-4" />
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 bg-gray-700/30 rounded animate-pulse" />
              ))}
            </div>
          </div>
          <div className="flex-1 p-4 space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-700/30 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
