"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { ChatPanel } from "@/components/chat-panel"
import { RightPanel } from "@/components/right-panel"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  const [activeModule, setActiveModule] = useState<string>("chat")
  const [messages, setMessages] = useState<Array<{ id: string; content: string; sender: "user" | "ai" }>>([])
  const [isInstallable, setIsInstallable] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)

  useEffect(() => {
    // Add global error handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.warn("Unhandled promise rejection:", event.reason)
      // Prevent the error from crashing the app
      event.preventDefault()
    }

    // Add global error handler
    const handleError = (event: ErrorEvent) => {
      console.warn("Global error:", event.error)
    }

    window.addEventListener("unhandledrejection", handleUnhandledRejection)
    window.addEventListener("error", handleError)

    // PWA install prompt handling
    let deferredPrompt: any

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      deferredPrompt = e
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
      window.removeEventListener("error", handleError)
    }
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1),transparent_50%)]" />
        </div>

        {/* Main Layout */}
        <div className="relative z-10 flex h-screen">
          {/* Left Sidebar - Hidden on mobile by default */}
          <div
            className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-30 transition-transform duration-300 ease-in-out h-full`}
          >
            <Sidebar
              activeModule={activeModule}
              setActiveModule={setActiveModule}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          {/* Center Panel */}
          <div className="flex-1 flex flex-col h-full w-full md:w-auto">
            <ChatPanel
              activeModule={activeModule}
              messages={messages}
              setMessages={setMessages}
              onMenuClick={() => setSidebarOpen(true)}
              onRightPanelClick={() => setRightPanelOpen(true)}
            />
          </div>

          {/* Right Panel - Hidden on mobile by default */}
          <div
            className={`${rightPanelOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0 fixed md:relative z-30 right-0 transition-transform duration-300 ease-in-out h-full`}
          >
            <RightPanel onClose={() => setRightPanelOpen(false)} />
          </div>
        </div>

        {/* Mobile Overlay */}
        {(sidebarOpen || rightPanelOpen) && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => {
              setSidebarOpen(false)
              setRightPanelOpen(false)
            }}
          />
        )}

        {/* PWA Install Banner */}
        {isInstallable && (
          <div className="fixed bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 z-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-cyan-400 font-semibold">Install Infinity X One</h3>
                <p className="text-gray-300 text-sm">Add to your home screen for the best experience</p>
              </div>
              <button
                onClick={() => setIsInstallable(false)}
                className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Install
              </button>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  )
}
