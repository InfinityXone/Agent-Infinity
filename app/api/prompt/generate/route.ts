import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { type, prompt } = await request.json()

    // Mock AI prompt generation - replace with real AI service
    const responses = {
      planning: "Here's a comprehensive plan based on your request...",
      ideation: "Here are some creative ideas to explore...",
      creative: "Let's create something innovative together...",
    }

    const response = responses[type as keyof typeof responses] || "Processing your prompt..."

    return NextResponse.json({
      response,
      type,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Prompt generation error:", error)
    return NextResponse.json({ error: "Failed to generate prompt" }, { status: 500 })
  }
}
