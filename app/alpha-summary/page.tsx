"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { RightPanel } from "@/components/right-panel"
import { FileText, TrendingUp, Calendar, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface NewsItem {
  id: string
  title: string
  summary: string
  source: string
  timestamp: Date
  sentiment: "positive" | "negative" | "neutral"
  impact: "high" | "medium" | "low"
}

interface MarketReason {
  id: string
  reason: string
  confidence: number
  category: "earnings" | "news" | "technical" | "macro"
}

export default function AlphaSummary() {
  const [activeModule, setActiveModule] = useState("alpha-summary")
  const [todaysSummary, setTodaysSummary] = useState<NewsItem[]>([])
  const [marketReasons, setMarketReasons] = useState<MarketReason[]>([])
  const [loading, setLoading] = useState(false)

  const fetchTodaysSummary = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/alpha/today")
      const data = await response.json()
      setTodaysSummary(data.news || [])
      setMarketReasons(data.reasons || [])
    } catch (error) {
      console.error("Alpha summary error:", error)
      // Mock data for demo
      setTodaysSummary([
        {
          id: "1",
          title: "Tech Stocks Rally on AI Breakthrough",
          summary: "Major technology companies saw significant gains following announcements of new AI capabilities...",
          source: "TechCrunch",
          timestamp: new Date(),
          sentiment: "positive",
          impact: "high",
        },
        {
          id: "2",
          title: "Federal Reserve Hints at Rate Changes",
          summary: "The Federal Reserve's latest statement suggests potential monetary policy adjustments...",
          source: "Reuters",
          timestamp: new Date(),
          sentiment: "neutral",
          impact: "medium",
        },
      ])
      setMarketReasons([
        { id: "1", reason: "Strong earnings reports from tech sector", confidence: 85, category: "earnings" },
        { id: "2", reason: "Positive AI adoption trends", confidence: 78, category: "news" },
        { id: "3", reason: "Technical breakout above resistance", confidence: 72, category: "technical" },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodaysSummary()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 flex h-screen">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

        <div className="flex-1 flex flex-col h-full">
          <div className="p-6 border-b border-cyan-500/20 bg-black/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-cyan-400" />
                <div>
                  <h1 className="text-3xl font-bold text-cyan-400">Alpha Summary</h1>
                  <p className="text-gray-400">Daily Market Intelligence & News Analysis</p>
                </div>
              </div>
              <Button
                onClick={fetchTodaysSummary}
                disabled={loading}
                className="bg-cyan-500 hover:bg-cyan-600 text-black"
              >
                {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                Refresh
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Market Reasons */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Today's Market Drivers
                </CardTitle>
                <CardDescription className="text-gray-400">AI-analyzed reasons for market movements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {marketReasons.map((reason) => (
                    <div key={reason.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-white">{reason.reason}</div>
                        <div className="text-sm text-gray-400 capitalize">{reason.category}</div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-sm font-medium ${
                            reason.confidence >= 80
                              ? "text-green-400"
                              : reason.confidence >= 60
                                ? "text-yellow-400"
                                : "text-red-400"
                          }`}
                        >
                          {reason.confidence}%
                        </div>
                        <div className="text-xs text-gray-400">confidence</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* News Summary */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today's News Breakdown
                </CardTitle>
                <CardDescription className="text-gray-400">Curated and analyzed market-moving news</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysSummary.map((news) => (
                    <div key={news.id} className="p-4 bg-black/30 rounded-lg border border-gray-700/50">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white text-lg">{news.title}</h3>
                        <div className="flex gap-2">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              news.sentiment === "positive"
                                ? "bg-green-500/20 text-green-400"
                                : news.sentiment === "negative"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {news.sentiment}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              news.impact === "high"
                                ? "bg-red-500/20 text-red-400"
                                : news.impact === "medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {news.impact} impact
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-3">{news.summary}</p>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>Source: {news.source}</span>
                        <span>{new Date(news.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Sentiment */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-900/50 border-green-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-400 text-lg">Bullish Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">67%</div>
                  <p className="text-gray-400 text-sm">Market optimism</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-red-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-red-400 text-lg">Bearish Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-400">23%</div>
                  <p className="text-gray-400 text-sm">Market pessimism</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-gray-400 text-lg">Neutral</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-400">10%</div>
                  <p className="text-gray-400 text-sm">Undecided</p>
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
