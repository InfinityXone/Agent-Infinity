import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Here you would upload to Supabase Storage or your preferred service
    // For now, just return success
    return NextResponse.json({
      success: true,
      filename: file.name,
      size: file.size,
      type: file.type,
      url: `/uploads/${file.name}`, // Mock URL
    })
  } catch (error) {
    console.error("Upload API error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
