import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages,
    stream: false,
  });

  return new Response(JSON.stringify({ message: completion.choices[0].message }));
}


