import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { title, type, description } = await request.json()

    const project = {
      id: Date.now().toString(),
      title,
      type,
      description,
      status: "active",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      project,
      response: `Project "${title}" created successfully!`,
    })
  } catch (error) {
    console.error("Project creation error:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
