import { NextRequest } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI and Groq clients using API keys from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  // Groq's API is compatible with the OpenAI client but uses a different base URL
  baseURL: 'https://api.groq.com/openai/v1',
});

// Base URL for your internal prediction API
const PREDICT_API_BASE = process.env.NEXT_PUBLIC_PREDICT_API_BASE || '';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages || [];
  let predictData: any = null;

  // Inspect the last message for a command like "predict TICKER"
  if (messages.length > 0) {
    const lastContent = String(messages[messages.length - 1].content || '');
    const match = /predict\s+(\w+)/i.exec(lastContent);
    if (match) {
      const symbol = match[1].toUpperCase();
      try {
        const resp = await fetch(`${PREDICT_API_BASE}/stock/${symbol}/predict`);
        if (resp.ok) {
          predictData = await resp.json();
          // Prepend a summary of the prediction to the messages so the model can respond contextually
          if (predictData.summary) {
            messages.push({ role: 'assistant', content: `Prediction for ${symbol}: ${predictData.summary}` });
          }
        }
      } catch (err) {
        console.error('Prediction API error', err);
      }
    }
  }

  // Attempt to get a response from GPT-4
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      stream: false,
    });
    return new Response(
      JSON.stringify({ message: completion.choices[0].message, prediction: predictData }),
      { headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    // Fallback to Groq if OpenAI fails
    try {
      const completion = await groq.chat.completions.create({
        model: 'mixtral-8x7b-32768',
        messages,
        stream: false,
      });
      return new Response(
        JSON.stringify({ message: completion.choices[0].message, prediction: predictData }),
        { headers: { 'Content-Type': 'application/json' } },
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ error: 'Failed to get response from both OpenAI and Groq providers.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }
  }
}
/api/codex/route.ts
