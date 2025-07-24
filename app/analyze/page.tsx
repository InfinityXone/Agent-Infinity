"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { RightPanel } from "@/components/right-panel"
import { BarChart3, Search, Info, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Sector {
  id: string
  name: string
  performance: number
  marketCap: string
  topStocks: string[]
  aiOpinion: string
  funFact: string
}

export default function Analyze() {
  const [activeModule, setActiveModule] = useState("analyze")
  const [sectors, setSectors] = useState<Sector[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null)

  useEffect(() => {
    fetchSectorData()
  }, [])

  const fetchSectorData = async () => {
    try {
      const response = await fetch("/api/sector-data")
      const data = await response.json()
      setSectors(data.sectors || mockSectors)
    } catch (error) {
      console.error("Sector data error:", error)
      setSectors(mockSectors)
    }
  }

  const mockSectors: Sector[] = [
    {
      id: "tech",
      name: "Technology",
      performance: 12.5,
      marketCap: "$15.2T",
      topStocks: ["AAPL", "MSFT", "GOOGL", "NVDA"],
      aiOpinion: "Strong growth potential driven by AI adoption and cloud computing expansion.",
      funFact: "Tech sector accounts for 28% of S&P 500 market cap",
    },
    {
      id: "healthcare",
      name: "Healthcare",
      performance: 8.3,
      marketCap: "$6.8T",
      topStocks: ["JNJ", "UNH", "PFE", "ABBV"],
      aiOpinion: "Stable sector with innovation in biotech and digital health solutions.",
      funFact: "Healthcare spending is expected to reach $6.2 trillion by 2028",
    },
    {
      id: "finance",
      name: "Financial Services",
      performance: -2.1,
      marketCap: "$4.9T",
      topStocks: ["JPM", "BAC", "WFC", "GS"],
      aiOpinion: "Facing headwinds from interest rate changes but strong fundamentals.",
      funFact: "Banks hold over $23 trillion in assets globally",
    },
  ]

  const filteredSectors = sectors.filter((sector) => sector.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
              <BarChart3 className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-3xl font-bold text-cyan-400">Analyze</h1>
                <p className="text-gray-400">Market Sector Explorer & Analysis</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Search */}
            <Card className="bg-gray-900/50 border-cyan-500/20">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search sectors..."
                    className="pl-10 bg-white/10 border-cyan-500/30 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSectors.map((sector) => (
                <Card
                  key={sector.id}
                  className="bg-gray-900/50 border-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer"
                  onClick={() => setSelectedSector(sector)}
                >
                  <CardHeader>
                    <CardTitle className="text-cyan-400 flex items-center justify-between">
                      {sector.name}
                      <span className={`text-sm ${sector.performance >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {sector.performance >= 0 ? "+" : ""}
                        {sector.performance}%
                      </span>
                    </CardTitle>
                    <CardDescription className="text-gray-400">Market Cap: {sector.marketCap}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Top Stocks</div>
                        <div className="flex flex-wrap gap-1">
                          {sector.topStocks.map((stock) => (
                            <span key={stock} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                              {stock}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">AI Opinion</div>
                        <p className="text-xs text-gray-300">{sector.aiOpinion}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <RightPanel />
      </div>

      {/* Sector Detail Modal */}
      {selectedSector && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="w-96 bg-gray-900 border-cyan-500/30 max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center justify-between">
                {selectedSector.name}
                <Button
                  onClick={() => setSelectedSector(null)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </Button>
              </CardTitle>
              <CardDescription className="text-gray-400">Detailed sector analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium text-white">Performance</span>
                </div>
                <div
                  className={`text-2xl font-bold ${
                    selectedSector.performance >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {selectedSector.performance >= 0 ? "+" : ""}
                  {selectedSector.performance}%
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium text-white">AI Analysis</span>
                </div>
                <p className="text-gray-300 text-sm">{selectedSector.aiOpinion}</p>
              </div>

              <div>
                <div className="font-medium text-white mb-2">Fun Fact</div>
                <p className="text-yellow-400 text-sm italic">{selectedSector.funFact}</p>
              </div>

              <div>
                <div className="font-medium text-white mb-2">Top Holdings</div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedSector.topStocks.map((stock) => (
                    <div key={stock} className="p-2 bg-black/30 rounded text-center text-cyan-400 font-medium">
                      {stock}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
