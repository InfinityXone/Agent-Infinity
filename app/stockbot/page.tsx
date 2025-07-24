"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { RightPanel } from "@/components/right-panel"
import { TrendingUp, DollarSign, BarChart3, Activity, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface StockData {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: string
  peRatio: number
  prediction: number[]
  chartData: Array<{ time: string; price: number; volume: number }>
  indicators: {
    macd: number
    rsi: number
    sma: number
  }
}

export default function StockBot() {
  const [activeModule, setActiveModule] = useState("stockbot")
  const [symbol, setSymbol] = useState("AAPL")
  const [stockData, setStockData] = useState<StockData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchStockData = async (ticker: string) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/graph/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbol: ticker }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch stock data")
      }

      const data = await response.json()
      setStockData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      // Mock data for demo
      setStockData({
        symbol: ticker,
        price: 150.25,
        change: 3.75,
        changePercent: 2.5,
        volume: 2500000,
        marketCap: "$2.4T",
        peRatio: 28.5,
        prediction: [152, 155, 148, 160, 158],
        chartData: Array.from({ length: 30 }, (_, i) => ({
          time: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
          price: 145 + Math.random() * 20,
          volume: 2000000 + Math.random() * 1000000,
        })),
        indicators: {
          macd: 1.25,
          rsi: 65.4,
          sma: 148.75,
        },
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStockData(symbol)
  }, [])

  const handleAnalyze = () => {
    if (symbol.trim()) {
      fetchStockData(symbol.toUpperCase())
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
          {/* Header */}
          <div className="p-6 border-b border-cyan-500/20 bg-black/30 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-3xl font-bold text-cyan-400">StockBot</h1>
                <p className="text-gray-400">AI-Powered Stock Analysis & 5-Day Predictions</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Stock Search */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Stock Analysis</CardTitle>
                <CardDescription className="text-gray-400">Enter a stock symbol for real-time analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    placeholder="Enter stock symbol (e.g., AAPL)"
                    className="bg-white/10 border-cyan-500/30 text-white placeholder:text-gray-400"
                    onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                  />
                  <Button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="bg-cyan-500 hover:bg-cyan-600 text-black"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <BarChart3 className="w-4 h-4 mr-2" />
                    )}
                    Analyze
                  </Button>
                </div>
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              </CardContent>
            </Card>

            {stockData && (
              <>
                {/* Stock Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-gray-900/50 border-green-500/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-green-400 text-lg flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        {stockData.symbol}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-400">${stockData.price.toFixed(2)}</div>
                      <p className={`text-sm ${stockData.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {stockData.change >= 0 ? "+" : ""}
                        {stockData.changePercent.toFixed(2)}% (${stockData.change.toFixed(2)})
                      </p>
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
                      <div className="text-2xl font-bold text-blue-400">{(stockData.volume / 1000000).toFixed(1)}M</div>
                      <p className="text-gray-400 text-sm">Daily volume</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/50 border-yellow-500/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-yellow-400 text-lg">Market Cap</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-400">{stockData.marketCap}</div>
                      <p className="text-gray-400 text-sm">Total value</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/50 border-purple-500/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-purple-400 text-lg">P/E Ratio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-400">{stockData.peRatio}</div>
                      <p className="text-gray-400 text-sm">Price to earnings</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Price Chart */}
                <Card className="bg-gray-900/50 border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">Price Chart (30 Days)</CardTitle>
                    <CardDescription className="text-gray-400">Historical price movement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stockData.chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="time" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              border: "1px solid #06B6D4",
                              borderRadius: "8px",
                            }}
                          />
                          <Line type="monotone" dataKey="price" stroke="#06B6D4" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Technical Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gray-900/50 border-cyan-500/20">
                    <CardHeader>
                      <CardTitle className="text-cyan-400 text-lg">MACD</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-cyan-400">{stockData.indicators.macd}</div>
                      <p className="text-gray-400 text-sm">Moving Average Convergence</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/50 border-orange-500/20">
                    <CardHeader>
                      <CardTitle className="text-orange-400 text-lg">RSI</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-400">{stockData.indicators.rsi}</div>
                      <p className="text-gray-400 text-sm">Relative Strength Index</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/50 border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-green-400 text-lg">SMA</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-400">${stockData.indicators.sma}</div>
                      <p className="text-gray-400 text-sm">Simple Moving Average</p>
                    </CardContent>
                  </Card>
                </div>

                {/* 5-Day Prediction */}
                <Card className="bg-gray-900/50 border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">AI 5-Day Price Prediction</CardTitle>
                    <CardDescription className="text-gray-400">Machine learning forecast</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-4">
                      {stockData.prediction.map((price, index) => (
                        <div key={index} className="text-center p-3 bg-black/30 rounded-lg border border-cyan-500/20">
                          <div className="text-sm text-gray-400 mb-1">Day {index + 1}</div>
                          <div className="text-lg font-bold text-cyan-400">${price.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>

        <RightPanel />
      </div>
    </div>
  )
}
