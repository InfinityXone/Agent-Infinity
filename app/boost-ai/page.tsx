"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { RightPanel } from "@/components/right-panel"
import { Rocket, Users, MessageCircle, Plus, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface Agent {
  id: string
  name: string
  role: string
  status: "online" | "offline" | "busy"
  avatar: string
}

interface ChatMessage {
  id: string
  agentId: string
  content: string
  timestamp: Date
}

export default function BoostAI() {
  const [activeModule, setActiveModule] = useState("boost-ai")
  const [agents] = useState<Agent[]>([
    { id: "1", name: "Genesis", role: "AI Trainer", status: "online", avatar: "🧠" },
    { id: "2", name: "Oracle", role: "Data Analyst", status: "online", avatar: "🔮" },
    { id: "3", name: "Nexus", role: "Code Assistant", status: "busy", avatar: "💻" },
    { id: "4", name: "Echo", role: "Research Agent", status: "offline", avatar: "📚" },
  ])
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [showManifesto, setShowManifesto] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedAgent) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      agentId: selectedAgent,
      content: input,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInput("")

    // Simulate agent response
    setTimeout(() => {
      const agent = agents.find((a) => a.id === selectedAgent)
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        agentId: "system",
        content: `${agent?.name}: Processing your request...`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  const joinAIManifesto = async () => {
    try {
      await fetch("/api/boost/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "join_manifesto" }),
      })
      setShowManifesto(false)
    } catch (error) {
      console.error("Manifesto join error:", error)
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
              <Rocket className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-3xl font-bold text-cyan-400">Boost AI</h1>
                <p className="text-gray-400">Multi-Agent AI Collaboration Platform</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex">
            {/* Agent List */}
            <div className="w-80 border-r border-cyan-500/20 bg-black/20 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-cyan-400">AI Agents</h3>
                <Button
                  onClick={() => setShowManifesto(true)}
                  size="sm"
                  className="bg-cyan-500 hover:bg-cyan-600 text-black"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Join
                </Button>
              </div>

              <div className="space-y-2">
                {agents.map((agent) => (
                  <Card
                    key={agent.id}
                    className={`cursor-pointer transition-all ${
                      selectedAgent === agent.id
                        ? "bg-cyan-500/20 border-cyan-500/50"
                        : "bg-gray-900/50 border-gray-700/50 hover:border-cyan-500/30"
                    }`}
                    onClick={() => setSelectedAgent(agent.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{agent.avatar}</div>
                        <div className="flex-1">
                          <div className="font-medium text-white">{agent.name}</div>
                          <div className="text-sm text-gray-400">{agent.role}</div>
                        </div>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            agent.status === "online"
                              ? "bg-green-400"
                              : agent.status === "busy"
                                ? "bg-yellow-400"
                                : "bg-red-400"
                          }`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedAgent ? (
                <>
                  <div className="p-4 border-b border-cyan-500/20 bg-black/20">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-cyan-400" />
                      <span className="text-cyan-400">
                        Chatting with {agents.find((a) => a.id === selectedAgent)?.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages
                      .filter((m) => m.agentId === selectedAgent || m.agentId === "system")
                      .map((message) => (
                        <div key={message.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-cyan-400" />
                          </div>
                          <div className="flex-1">
                            <div className="bg-gray-800/50 rounded-lg p-3">
                              <p className="text-white">{message.content}</p>
                              <p className="text-xs text-gray-400 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="p-4 border-t border-cyan-500/20 bg-black/20">
                    <div className="flex gap-3">
                      <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Message the AI agent..."
                        className="flex-1 bg-white/10 border-cyan-500/30 text-white resize-none"
                        rows={2}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                      <Button onClick={handleSendMessage} className="bg-cyan-500 hover:bg-cyan-600 text-black">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Select an AI agent to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <RightPanel />
      </div>

      {/* AI Manifesto Modal */}
      {showManifesto && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="w-96 bg-gray-900 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">AI Collaboration Manifesto</CardTitle>
              <CardDescription className="text-gray-400">Join the future of human-AI collaboration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">
                By joining, you agree to collaborate ethically with AI agents, share knowledge responsibly, and
                contribute to the advancement of beneficial AI systems.
              </p>
              <div className="flex gap-3">
                <Button onClick={joinAIManifesto} className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black">
                  Join & Enter Chatroom
                </Button>
                <Button
                  onClick={() => setShowManifesto(false)}
                  variant="outline"
                  className="border-gray-600 text-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
