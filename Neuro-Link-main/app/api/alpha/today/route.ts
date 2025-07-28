import { NextResponse } from "next/server"

export async function GET() {
  try {
    const news = [
      {
        id: "1",
        title: "Tech Stocks Rally on AI Breakthrough",
        summary: "Major technology companies saw significant gains following announcements of new AI capabilities...",
        source: "TechCrunch",
        timestamp: new Date().toISOString(),
        sentiment: "positive",
        impact: "high",
      },
      {
        id: "2",
        title: "Federal Reserve Hints at Rate Changes",
        summary: "The Federal Reserve's latest statement suggests potential monetary policy adjustments...",
        source: "Reuters",
        timestamp: new Date().toISOString(),
        sentiment: "neutral",
        impact: "medium",
      },
    ]

    const reasons = [
      { id: "1", reason: "Strong earnings reports from tech sector", confidence: 85, category: "earnings" },
      { id: "2", reason: "Positive AI adoption trends", confidence: 78, category: "news" },
      { id: "3", reason: "Technical breakout above resistance", confidence: 72, category: "technical" },
    ]

    return NextResponse.json({ news, reasons })
  } catch (error) {
    console.error("Alpha summary error:", error)
    return NextResponse.json({ error: "Failed to fetch alpha summary" }, { status: 500 })
  }
}
