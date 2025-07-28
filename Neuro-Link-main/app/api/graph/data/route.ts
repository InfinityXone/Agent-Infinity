import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { symbol } = await request.json()

    // Mock stock data - replace with real API calls to Yahoo Finance/Alpha Vantage
    const mockData = {
      symbol: symbol.toUpperCase(),
      price: 150.25 + (Math.random() - 0.5) * 20,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5,
      volume: Math.floor(2000000 + Math.random() * 3000000),
      marketCap: "$2.4T",
      peRatio: 25 + Math.random() * 10,
      prediction: Array.from({ length: 5 }, () => 145 + Math.random() * 20),
      chartData: Array.from({ length: 30 }, (_, i) => ({
        time: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        price: 145 + Math.random() * 20,
        volume: 2000000 + Math.random() * 1000000,
      })),
      indicators: {
        macd: (Math.random() - 0.5) * 5,
        rsi: 30 + Math.random() * 40,
        sma: 145 + Math.random() * 10,
      },
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Stock data API error:", error)
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 })
  }
}
