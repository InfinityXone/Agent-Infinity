"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { RightPanel } from "@/components/right-panel"
import { Zap, Send, Copy, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const promptTemplates = [
  {
    id: 1,
    title: "Market Analysis",
    description: "Analyze market trends and opportunities",
    prompt:
      "Analyze the current market trends for [INDUSTRY] and identify 3 key opportunities for growth in the next quarter.",
    category: "Business",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Code Optimization",
    description: "Optimize code performance and structure",
    prompt: "Review this code and suggest optimizations for better performance and maintainability: [CODE]",
    category: "Development",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Creative Writing",
    description: "Generate creative content and stories",
    prompt: "Write a compelling story about [TOPIC] that incorporates [THEME] and appeals to [AUDIENCE].",
    category: "Creative",
    rating: 4.7,
  },
]

export default function EdgePrompts() {
  const [activeModule, setActiveModule] = useState("edge-prompts")
  const [selectedPrompt, setSelectedPrompt] = useState("")
  const [customPrompt, setCustomPrompt] = useState("")

  const handleUsePrompt = (prompt: string) => {
    setSelectedPrompt(prompt)
    setCustomPrompt(prompt)
  }

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 flex h-screen">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

        <div className="flex-1 flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-cyan-500/20 bg-black/30 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-3xl font-bold text-cyan-400">Edge Prompts</h1>
                <p className="text-gray-400">Advanced AI prompt templates for maximum efficiency</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Prompt Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {promptTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="bg-gray-900/50 border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-cyan-400">{template.title}</CardTitle>
                        <CardDescription className="text-gray-400">{template.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm">{template.rating}</span>
                      </div>
                    </div>
                    <div className="inline-block px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                      {template.category}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{template.prompt}</p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleUsePrompt(template.prompt)}
                        className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Use
                      </Button>
                      <Button
                        onClick={() => handleCopyPrompt(template.prompt)}
                        variant="outline"
                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Custom Prompt Editor */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Custom Prompt Editor</CardTitle>
                <CardDescription className="text-gray-400">Create and test your own prompts</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Enter your custom prompt here..."
                  className="min-h-[120px] bg-white/10 border-cyan-500/30 text-white placeholder:text-gray-400"
                />
                <div className="flex gap-2 mt-4">
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">
                    <Send className="w-4 h-4 mr-2" />
                    Test Prompt
                  </Button>
                  <Button
                    variant="outline"
                    className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
                  >
                    Save Template
                  </Button>
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
