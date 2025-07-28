"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { RightPanel } from "@/components/right-panel"
import { TrendingUp, DollarSign, BarChart3, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function StockBot() {
  const [activeModule, setActiveModule] = useState("stock-bot")
  const [symbol, setSymbol] = useState("AAPL")

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
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-3xl font-bold text-cyan-400">Stock Bot</h1>
                <p className="text-gray-400">AI-Powered Stock Analysis & Trading Insights</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Stock Search */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Stock Analysis</CardTitle>
                <CardDescription className="text-gray-400">Enter a stock symbol to analyze</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    placeholder="Enter stock symbol (e.g., AAPL)"
                    className="bg-white/10 border-cyan-500/30 text-white placeholder:text-gray-400"
                  />
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analyze
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stock Data Placeholder - Your stock bot code will go here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gray-900/50 border-green-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-400 text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Price
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">$150.25</div>
                  <p className="text-green-400 text-sm">+2.5% (+$3.75)</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-blue-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-400 text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">2.5M</div>
                  <p className="text-gray-400 text-sm">Daily volume</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-yellow-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-yellow-400 text-lg">Market Cap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">$2.4T</div>
                  <p className="text-gray-400 text-sm">Total value</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-purple-400 text-lg">P/E Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">28.5</div>
                  <p className="text-gray-400 text-sm">Price to earnings</p>
                </CardContent>
              </Card>
            </div>

            {/* Chart Placeholder */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Stock Chart</CardTitle>
                <CardDescription className="text-gray-400">Price movement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-black/30 rounded-lg flex items-center justify-center border border-cyan-500/20">
                  <p className="text-gray-400">Chart will be rendered here with your stock bot code</p>
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
