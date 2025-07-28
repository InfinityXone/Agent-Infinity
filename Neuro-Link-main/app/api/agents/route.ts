import { NextResponse } from "next/server"

export async function GET() {
  try {
    const agents = [
      { id: "1", name: "Genesis", role: "AI Trainer", status: "online", avatar: "🧠" },
      { id: "2", name: "Oracle", role: "Data Analyst", status: "online", avatar: "🔮" },
      { id: "3", name: "Nexus", role: "Code Assistant", status: "busy", avatar: "💻" },
      { id: "4", name: "Echo", role: "Research Agent", status: "offline", avatar: "📚" },
    ]

    return NextResponse.json({ agents })
  } catch (error) {
    console.error("Agents API error:", error)
    return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 })
  }
}
