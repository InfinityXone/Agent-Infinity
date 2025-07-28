import { NextResponse } from 'next/server'
export async function POST(req: Request) {
  const { code } = await req.json();
  const output = "Codex processed: " + code + "\n\n🧠 [Simulated Agent Output]";
  return NextResponse.json({ output });
}