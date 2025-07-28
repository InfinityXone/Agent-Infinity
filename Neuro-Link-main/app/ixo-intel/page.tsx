"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { RightPanel } from "@/components/right-panel"
import { Database, Key, Settings, Play, Pause, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function IXOIntel() {
  const [activeModule, setActiveModule] = useState("ixo-intel")
  const [apiKeys, setApiKeys] = useState({
    openai: "",
    anthropic: "",
    google: "",
    yahoo_finance: "",
  })
  const [scraperConfig, setScraperConfig] = useState({
    targets: ["news.ycombinator.com", "reddit.com/r/technology", "techcrunch.com"],
    interval: "30",
    keywords: "AI, technology, startup, innovation",
  })
  const [scraperStatus, setScraperStatus] = useState("stopped")

  const handleSaveConfig = async () => {
    try {
      const response = await fetch("/api/ixo/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKeys, scraperConfig }),
      })
      const data = await response.json()
      console.log("Config saved:", data)
    } catch (error) {
      console.error("Save error:", error)
    }
  }

  const toggleScraper = async () => {
    const newStatus = scraperStatus === "running" ? "stopped" : "running"
    setScraperStatus(newStatus)

    try {
      await fetch("/api/ixo/scraper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: newStatus }),
      })
    } catch (error) {
      console.error("Scraper toggle error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 flex h-screen">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

        <div className="flex-1 flex flex-col h-full">
          <div className="p-6 border-b border-cyan-500/20 bg-black/30 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-3xl font-bold text-cyan-400">IXO Intel</h1>
                <p className="text-gray-400">API Configuration & Data Scraping Management</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* API Keys Section */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Keys Configuration
                </CardTitle>
                <CardDescription className="text-gray-400">Manage your AI service API keys</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">OpenAI API Key</label>
                  <Input
                    type="password"
                    value={apiKeys.openai}
                    onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
                    placeholder="sk-..."
                    className="bg-white/10 border-cyan-500/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Anthropic API Key</label>
                  <Input
                    type="password"
                    value={apiKeys.anthropic}
                    onChange={(e) => setApiKeys({ ...apiKeys, anthropic: e.target.value })}
                    placeholder="sk-ant-..."
                    className="bg-white/10 border-cyan-500/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Google API Key</label>
                  <Input
                    type="password"
                    value={apiKeys.google}
                    onChange={(e) => setApiKeys({ ...apiKeys, google: e.target.value })}
                    placeholder="AIza..."
                    className="bg-white/10 border-cyan-500/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Yahoo Finance API Key</label>
                  <Input
                    type="password"
                    value={apiKeys.yahoo_finance}
                    onChange={(e) => setApiKeys({ ...apiKeys, yahoo_finance: e.target.value })}
                    placeholder="yf-..."
                    className="bg-white/10 border-cyan-500/30 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Scraper Configuration */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Scraper Configuration
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure data scraping targets and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Scraping Targets</label>
                  <Textarea
                    value={scraperConfig.targets.join("\n")}
                    onChange={(e) => setScraperConfig({ ...scraperConfig, targets: e.target.value.split("\n") })}
                    placeholder="Enter URLs, one per line"
                    className="bg-white/10 border-cyan-500/30 text-white"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Scraping Interval (minutes)</label>
                  <Input
                    type="number"
                    value={scraperConfig.interval}
                    onChange={(e) => setScraperConfig({ ...scraperConfig, interval: e.target.value })}
                    className="bg-white/10 border-cyan-500/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Keywords</label>
                  <Input
                    value={scraperConfig.keywords}
                    onChange={(e) => setScraperConfig({ ...scraperConfig, keywords: e.target.value })}
                    placeholder="AI, technology, startup"
                    className="bg-white/10 border-cyan-500/30 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Scraper Control */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Scraper Control</CardTitle>
                <CardDescription className="text-gray-400">Start/stop data scraping operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={toggleScraper}
                    className={`${
                      scraperStatus === "running" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    } text-black`}
                  >
                    {scraperStatus === "running" ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Stop Scraper
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Scraper
                      </>
                    )}
                  </Button>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${scraperStatus === "running" ? "bg-green-400" : "bg-red-400"}`}
                    />
                    <span className="text-gray-300">Status: {scraperStatus}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Configuration */}
            <div className="flex justify-end">
              <Button onClick={handleSaveConfig} className="bg-cyan-500 hover:bg-cyan-600 text-black">
                <RefreshCw className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </div>
        </div>

        <RightPanel />
      </div>
    </div>
  )
}
