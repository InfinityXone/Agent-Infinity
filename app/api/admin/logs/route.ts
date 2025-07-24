import { NextResponse } from "next/server"

export async function GET() {
  try {
    const logs = [
      {
        id: "1",
        timestamp: new Date().toISOString(),
        level: "info",
        message: "System startup completed",
        module: "system",
      },
      {
        id: "2",
        timestamp: new Date().toISOString(),
        level: "warning",
        message: "High memory usage detected",
        module: "monitor",
      },
    ]

    return NextResponse.json({ logs })
  } catch (error) {
    console.error("Admin logs error:", error)
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
  }
}
