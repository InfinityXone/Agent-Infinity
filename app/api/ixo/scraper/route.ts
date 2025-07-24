import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()

    // Here you would start/stop the scraper service
    console.log("Scraper action:", action)

    return NextResponse.json({
      success: true,
      status: action,
      message: `Scraper ${action} successfully`,
    })
  } catch (error) {
    console.error("Scraper control error:", error)
    return NextResponse.json({ error: "Failed to control scraper" }, { status: 500 })
  }
}
