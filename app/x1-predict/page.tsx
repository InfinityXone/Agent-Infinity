"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { RightPanel } from "@/components/right-panel"
import { TrendingUp, DollarSign, Target, Trophy, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Prediction {
  id: string
  symbol: string
  currentPrice: number
  predictedPrice: number
  confidence: number
  timeframe: string
  status: "pending" | "correct" | "incorrect"
}

interface Trade {
  id: string
  symbol: string
  type: "buy" | "sell"
  quantity: number
  price: number
  timestamp: Date
  profit?: number
}

export default function X1Predict() {
  const [activeModule, setActiveModule] = useState("x1-predict")
  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      id: "1",
      symbol: "AAPL",
      currentPrice: 150.25,
      predictedPrice: 165.0,
      confidence: 87,
      timeframe: "7d",
      status: "pending",
    },
    {
      id: "2",
      symbol: "TSLA",
      currentPrice: 245.8,
      predictedPrice: 280.0,
      confidence: 72,
      timeframe: "14d",
      status: "correct",
    },
    {
      id: "3",
      symbol: "NVDA",
      currentPrice: 420.15,
      predictedPrice: 390.0,
      confidence: 65,
      timeframe: "7d",
      status: "incorrect",
    },
  ])
  const [trades, setTrades] = useState<Trade[]>([])
  const [portfolioValue, setPortfolioValue] = useState(100000)
  const [symbol, setSymbol] = useState("")

  const generatePrediction = async () => {
    if (!symbol.trim()) return

    try {
      const response = await fetch("/api/predict/model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: symbol.toUpperCase() }),
      })
      const data = await response.json()

      const newPrediction: Prediction = {
        id: Date.now().toString(),
        symbol: symbol.toUpperCase(),
        currentPrice: data.currentPrice || 100,
        predictedPrice: data.predictedPrice || 110,
        confidence: data.confidence || Math.floor(Math.random() * 40) + 60,
        timeframe: "7d",
        status: "pending",
      }

      setPredictions([newPrediction, ...predictions])
      setSymbol("")
    } catch (error) {
      console.error("Prediction error:", error)
    }
  }

  const simulateTrade = async (symbol: string, type: "buy" | "sell", quantity: number, price: number) => {
    try {
      const response = await fetch("/api/trade/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, type, quantity, price }),
      })
      const data = await response.json()

      const newTrade: Trade = {
        id: Date.now().toString(),
        symbol,
        type,
        quantity,
        price,
        timestamp: new Date(),
        profit: data.profit,
      }

      setTrades([newTrade, ...trades])
      setPortfolioValue((prev) => prev + (data.profit || 0))
    } catch (error) {
      console.error("Trade simulation error:", error)
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
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-3xl font-bold text-cyan-400">X1 Predict</h1>
                <p className="text-gray-400">AI Financial Predictions & Paper Trading</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gray-900/50 border-green-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-400 text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Portfolio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">${portfolioValue.toLocaleString()}</div>
                  <p className="text-green-400 text-sm">+5.2% today</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-blue-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-400 text-lg flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">73.5%</div>
                  <p className="text-gray-400 text-sm">Prediction accuracy</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-yellow-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-yellow-400 text-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Wins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">24</div>
                  <p className="text-gray-400 text-sm">Successful trades</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-red-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-red-400 text-lg">Losses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-400">9</div>
                  <p className="text-gray-400 text-sm">Failed trades</p>
                </CardContent>
              </Card>
            </div>

            {/* Generate Prediction */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Generate Prediction</CardTitle>
                <CardDescription className="text-gray-400">AI-powered stock price prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    placeholder="Enter stock symbol (e.g., AAPL)"
                    className="bg-white/10 border-cyan-500/30 text-white"
                  />
                  <Button onClick={generatePrediction} className="bg-cyan-500 hover:bg-cyan-600 text-black">
                    <Target className="w-4 h-4 mr-2" />
                    Predict
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Predictions Table */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Active Predictions</CardTitle>
                <CardDescription className="text-gray-400">AI model predictions and results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left p-2 text-gray-400">Symbol</th>
                        <th className="text-left p-2 text-gray-400">Current</th>
                        <th className="text-left p-2 text-gray-400">Predicted</th>
                        <th className="text-left p-2 text-gray-400">Confidence</th>
                        <th className="text-left p-2 text-gray-400">Timeframe</th>
                        <th className="text-left p-2 text-gray-400">Status</th>
                        <th className="text-left p-2 text-gray-400">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {predictions.map((prediction) => (
                        <tr key={prediction.id} className="border-b border-gray-800">
                          <td className="p-2 font-medium text-white">{prediction.symbol}</td>
                          <td className="p-2 text-gray-300">${prediction.currentPrice.toFixed(2)}</td>
                          <td className="p-2 text-cyan-400">${prediction.predictedPrice.toFixed(2)}</td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                prediction.confidence >= 80
                                  ? "bg-green-500/20 text-green-400"
                                  : prediction.confidence >= 60
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {prediction.confidence}%
                            </span>
                          </td>
                          <td className="p-2 text-gray-300">{prediction.timeframe}</td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                prediction.status === "correct"
                                  ? "bg-green-500/20 text-green-400"
                                  : prediction.status === "incorrect"
                                    ? "bg-red-500/20 text-red-400"
                                    : "bg-gray-500/20 text-gray-400"
                              }`}
                            >
                              {prediction.status}
                            </span>
                          </td>
                          <td className="p-2">
                            <Button
                              size="sm"
                              onClick={() => simulateTrade(prediction.symbol, "buy", 10, prediction.currentPrice)}
                              className="bg-green-500 hover:bg-green-600 text-black mr-2"
                            >
                              <Play className="w-3 h-3 mr-1" />
                              Trade
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Recent Trades */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Paper Trading History</CardTitle>
                <CardDescription className="text-gray-400">Simulated trading results</CardDescription>
              </CardHeader>
              <CardContent>
                {trades.length > 0 ? (
                  <div className="space-y-2">
                    {trades.slice(0, 5).map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              trade.type === "buy" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {trade.type.toUpperCase()}
                          </span>
                          <span className="font-medium">{trade.symbol}</span>
                          <span className="text-gray-400">
                            {trade.quantity} shares @ ${trade.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-medium ${(trade.profit || 0) >= 0 ? "text-green-400" : "text-red-400"}`}
                          >
                            {(trade.profit || 0) >= 0 ? "+" : ""}${(trade.profit || 0).toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-400">{trade.timestamp.toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No trades yet. Start by making a prediction!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <RightPanel />
      </div>
    </div>
  )
}
