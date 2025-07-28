import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const settings = {
      voiceEnabled: false,
      theme: "dark",
      experimentalFeatures: false,
      notifications: true,
      autoSave: true,
      language: "en",
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error("Settings GET error:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const settings = await request.json()

    // Here you would save to database
    console.log("Saving settings:", settings)

    return NextResponse.json({
      success: true,
      settings,
      message: "Settings saved successfully",
    })
  } catch (error) {
    console.error("Settings POST error:", error)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}
