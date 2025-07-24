import { NextResponse } from "next/server"

export async function GET() {
  try {
    const sectors = [
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

    return NextResponse.json({ sectors })
  } catch (error) {
    console.error("Sector data error:", error)
    return NextResponse.json({ error: "Failed to fetch sector data" }, { status: 500 })
  }
}
