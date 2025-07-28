"use client"

import type React from "react"

import { useState } from "react"
import { Send, Paperclip, Menu, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

interface ChatPanelProps {
  activeModule: string
  messages: Message[]
  setMessages: (messages: Message[]) => void
  onMenuClick?: () => void
  onRightPanelClick?: () => void
}

export function ChatPanel({ activeModule, messages, setMessages, onMenuClick, onRightPanelClick }: ChatPanelProps) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call chat endpoint with error handling
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          module: activeModule,
        }),
      }).catch((error) => {
        console.warn("Chat API error:", error)
        throw error
      })

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || `Processing your request through ${activeModule}...`,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      }).catch((error) => {
        console.warn("Upload API error:", error)
        throw error
      })

      const data = await response.json()

      const fileMessage: Message = {
        id: Date.now().toString(),
        content: `Uploaded file: ${file.name}`,
        sender: "user",
        timestamp: new Date(),
      }
      setMessages([...messages, fileMessage])
    } catch (error) {
      console.error("Upload error:", error)
    }
  }

  const handleQuickAction = async (action: string) => {
    try {
      let endpoint = ""
      let payload = {}

      switch (action) {
        case "plan":
          endpoint = "/api/prompt/generate"
          payload = { type: "planning", prompt: "Create a comprehensive plan" }
          break
        case "ideas":
          endpoint = "/api/prompt/generate"
          payload = { type: "ideation", prompt: "Generate creative ideas" }
          break
        case "create":
          endpoint = "/api/project/create"
          payload = { title: "New Project", type: "creative" }
          break
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).catch((error) => {
        console.warn("Quick action API error:", error)
        throw error
      })

      const data = await response.json()

      const actionMessage: Message = {
        id: Date.now().toString(),
        content: data.response || `${action} action completed`,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages([...messages, actionMessage])
    } catch (error) {
      console.error("Quick action error:", error)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-cyan-500/20 bg-black/30 backdrop-blur-sm">
        {/* Mobile Navigation */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <button onClick={onMenuClick} className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <button onClick={onRightPanelClick} className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <Grid3X3 className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white animate-pulse-electric">
            Infinity <span className="text-blue-400 animate-pulse-blue">X</span> One
          </h1>
          <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse-line" />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4 md:mt-6">
          <Button
            onClick={() => handleQuickAction("plan")}
            variant="outline"
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent text-sm"
          >
            Start with a plan
          </Button>
          <Button
            onClick={() => handleQuickAction("ideas")}
            variant="outline"
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent text-sm"
          >
            Generate ideas
          </Button>
          <Button
            onClick={() => handleQuickAction("create")}
            variant="outline"
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent text-sm"
          >
            Create something new
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] sm:max-w-[80%] p-3 md:p-4 rounded-lg",
                message.sender === "user"
                  ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-100"
                  : "bg-gray-800/50 border border-gray-700/50 text-gray-100",
              )}
            >
              <div>{message.content}</div>
              <div className="text-xs text-gray-400 mt-2">{message.timestamp.toLocaleTimeString()}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800/50 border border-gray-700/50 text-gray-100 p-3 md:p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 md:p-6 border-t border-cyan-500/20 bg-black/30 backdrop-blur-sm">
        <div className="w-full relative">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
            <label className="text-cyan-400 hover:text-cyan-300 transition-colors flex-shrink-0 cursor-pointer">
              <Paperclip className="w-5 h-5" />
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept="image/*,application/pdf,.doc,.docx,video/*"
              />
            </label>

            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What's on your mind Neo?"
              className="flex-1 bg-transparent border-none text-white placeholder:text-gray-400 resize-none min-h-[24px] max-h-32 focus:outline-none focus:ring-0 p-0 text-sm md:text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />

            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="text-cyan-400 hover:text-cyan-300 disabled:text-gray-600 transition-colors flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
