"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { RightPanel } from "@/components/right-panel"
import { Settings, Mic, Palette, Zap, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  const [activeModule, setActiveModule] = useState("settings")
  const [settings, setSettings] = useState({
    voiceEnabled: false,
    theme: "dark",
    experimentalFeatures: false,
    notifications: true,
    autoSave: true,
    language: "en",
  })

  const handleSaveSettings = async () => {
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      const data = await response.json()
      console.log("Settings saved:", data)
    } catch (error) {
      console.error("Settings save error:", error)
    }
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
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
              <Settings className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-3xl font-bold text-cyan-400">Settings</h1>
                <p className="text-gray-400">Configure your Infinity X One experience</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Voice Settings */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  Voice Interface
                </CardTitle>
                <CardDescription className="text-gray-400">Configure voice input and output settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">Voice Input</div>
                    <div className="text-sm text-gray-400">Enable voice commands</div>
                  </div>
                  <Button
                    onClick={() => updateSetting("voiceEnabled", !settings.voiceEnabled)}
                    variant={settings.voiceEnabled ? "default" : "outline"}
                    className={settings.voiceEnabled ? "bg-cyan-500 text-black" : "border-cyan-500/30 text-cyan-400"}
                  >
                    {settings.voiceEnabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Theme Settings */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Theme & Appearance
                </CardTitle>
                <CardDescription className="text-gray-400">Customize the visual appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium text-white mb-3">Theme</div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => updateSetting("theme", "dark")}
                      variant={settings.theme === "dark" ? "default" : "outline"}
                      className={
                        settings.theme === "dark" ? "bg-cyan-500 text-black" : "border-cyan-500/30 text-cyan-400"
                      }
                    >
                      Dark
                    </Button>
                    <Button
                      onClick={() => updateSetting("theme", "light")}
                      variant={settings.theme === "light" ? "default" : "outline"}
                      className={
                        settings.theme === "light" ? "bg-cyan-500 text-black" : "border-cyan-500/30 text-cyan-400"
                      }
                    >
                      Light
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experimental Features */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Experimental Features
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Enable cutting-edge features (may be unstable)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">Beta Features</div>
                    <div className="text-sm text-gray-400">Access experimental functionality</div>
                  </div>
                  <Button
                    onClick={() => updateSetting("experimentalFeatures", !settings.experimentalFeatures)}
                    variant={settings.experimentalFeatures ? "default" : "outline"}
                    className={
                      settings.experimentalFeatures ? "bg-cyan-500 text-black" : "border-cyan-500/30 text-cyan-400"
                    }
                  >
                    {settings.experimentalFeatures ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">Notifications</div>
                    <div className="text-sm text-gray-400">System notifications</div>
                  </div>
                  <Button
                    onClick={() => updateSetting("notifications", !settings.notifications)}
                    variant={settings.notifications ? "default" : "outline"}
                    className={settings.notifications ? "bg-cyan-500 text-black" : "border-cyan-500/30 text-cyan-400"}
                  >
                    {settings.notifications ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">Auto Save</div>
                    <div className="text-sm text-gray-400">Automatically save changes</div>
                  </div>
                  <Button
                    onClick={() => updateSetting("autoSave", !settings.autoSave)}
                    variant={settings.autoSave ? "default" : "outline"}
                    className={settings.autoSave ? "bg-cyan-500 text-black" : "border-cyan-500/30 text-cyan-400"}
                  >
                    {settings.autoSave ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Save Settings */}
            <div className="flex justify-end">
              <Button onClick={handleSaveSettings} className="bg-cyan-500 hover:bg-cyan-600 text-black">
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>

        <RightPanel />
      </div>
    </div>
  )
}
