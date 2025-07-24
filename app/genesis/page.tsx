"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { RightPanel } from "@/components/right-panel"
import { Brain, Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Genesis() {
  const [activeModule, setActiveModule] = useState("genesis")
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleStart = () => {
    setIsRunning(true)
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const handleReset = () => {
    setIsRunning(false)
    setProgress(0)
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
              <Brain className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-3xl font-bold text-cyan-400">Genesis</h1>
                <p className="text-gray-400">AI Model Training & Neural Network Genesis</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Control Panel */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Genesis Control Panel</CardTitle>
                <CardDescription className="text-gray-400">Manage AI model training and evolution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={handleStart}
                      disabled={isRunning}
                      className="bg-green-500 hover:bg-green-600 text-black"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Genesis
                    </Button>
                    <Button
                      onClick={() => setIsRunning(false)}
                      disabled={!isRunning}
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Training Progress</span>
                      <span className="text-cyan-400">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Model Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-gray-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400 text-lg">Neural Networks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">Active</div>
                  <p className="text-gray-400 text-sm">12 networks running</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400 text-lg">Learning Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">0.001</div>
                  <p className="text-gray-400 text-sm">Adaptive learning</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400 text-lg">Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">94.7%</div>
                  <p className="text-gray-400 text-sm">Current model</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <RightPanel />
      </div>
    </div>
  )
}
