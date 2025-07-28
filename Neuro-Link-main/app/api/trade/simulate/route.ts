import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { symbol, type, quantity, price } = await request.json()

    // Mock trade simulation
    const profit = (Math.random() - 0.5) * quantity * price * 0.1

    return NextResponse.json({
      success: true,
      symbol,
      type,
      quantity,
      price,
      profit,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Trade simulation error:", error)
    return NextResponse.json({ error: "Failed to simulate trade" }, { status: 500 })
  }
}
