"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { RightPanel } from "@/components/right-panel"
import { Link, Mic, Video, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NeuroLink() {
  const [activeModule, setActiveModule] = useState("neurolink")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [videoEnabled, setVideoEnabled] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState("disconnected")

  const toggleConnection = () => {
    setConnectionStatus(connectionStatus === "connected" ? "disconnected" : "connected")
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
              <Link className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-3xl font-bold text-cyan-400">NeuroLink</h1>
                <p className="text-gray-400">Human-AI Neural Interface Connection</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Connection Status */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Connection Status</CardTitle>
                <CardDescription className="text-gray-400">Neural interface connection state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        connectionStatus === "connected" ? "bg-green-400" : "bg-red-400"
                      }`}
                    />
                    <span className="text-lg font-medium">
                      {connectionStatus === "connected" ? "Connected" : "Disconnected"}
                    </span>
                  </div>
                  <Button
                    onClick={toggleConnection}
                    className={`${
                      connectionStatus === "connected"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-black`}
                  >
                    {connectionStatus === "connected" ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Communication Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center gap-2">
                    <Mic className="w-5 h-5" />
                    Voice Interface
                  </CardTitle>
                  <CardDescription className="text-gray-400">Neural voice communication</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Voice Input</span>
                      <Button
                        onClick={() => setVoiceEnabled(!voiceEnabled)}
                        variant={voiceEnabled ? "default" : "outline"}
                        className={voiceEnabled ? "bg-cyan-500 text-black" : "border-cyan-500/30 text-cyan-400"}
                      >
                        {voiceEnabled ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                    <div className="h-32 bg-black/30 rounded-lg flex items-center justify-center border border-cyan-500/20">
                      <div className="text-center text-gray-400">
                        <Mic className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>Voice interface placeholder</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Video Interface
                  </CardTitle>
                  <CardDescription className="text-gray-400">Neural video communication</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Video Feed</span>
                      <Button
                        onClick={() => setVideoEnabled(!videoEnabled)}
                        variant={videoEnabled ? "default" : "outline"}
                        className={videoEnabled ? "bg-cyan-500 text-black" : "border-cyan-500/30 text-cyan-400"}
                      >
                        {videoEnabled ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                    <div className="h-32 bg-black/30 rounded-lg flex items-center justify-center border border-cyan-500/20">
                      <div className="text-center text-gray-400">
                        <Video className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>Video interface placeholder</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Layer */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Social Neural Network
                </CardTitle>
                <CardDescription className="text-gray-400">Connect with other neural interfaces</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-black/30 rounded-lg border border-cyan-500/20">
                    <div className="text-2xl font-bold text-cyan-400">0</div>
                    <div className="text-sm text-gray-400">Active Connections</div>
                  </div>
                  <div className="text-center p-4 bg-black/30 rounded-lg border border-cyan-500/20">
                    <div className="text-2xl font-bold text-green-400">12</div>
                    <div className="text-sm text-gray-400">Available Nodes</div>
                  </div>
                  <div className="text-center p-4 bg-black/30 rounded-lg border border-cyan-500/20">
                    <div className="text-2xl font-bold text-yellow-400">3</div>
                    <div className="text-sm text-gray-400">Pending Invites</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chatroom IDs */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Neural Chatrooms</CardTitle>
                <CardDescription className="text-gray-400">Available neural communication channels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["NEURO-001", "SYNC-ALPHA", "MIND-BRIDGE", "NEURAL-HUB"].map((roomId) => (
                    <div
                      key={roomId}
                      className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-cyan-500/20"
                    >
                      <div>
                        <div className="font-medium text-white">{roomId}</div>
                        <div className="text-sm text-gray-400">Neural communication channel</div>
                      </div>
                      <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-black">
                        Join
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <RightPanel />
      </div>
    </div>
  )
}
