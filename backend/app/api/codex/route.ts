import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

// Optional: Import Supabase if logging
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

export async function POST(req: Request) {
  const { code: prompt, user_id = "demo-user" } = await req.json();

  try {
    // 🧠 Send to GPT
    const messages = [
      { role: 'system', content: "You are Codex, the agentic system builder of InfinityXOne." },
      { role: 'user', content: prompt },
    ];

    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages,
      max_tokens: 1024,
    });

    const output = completion.data.choices[0].message.content;

    // 💾 Log to Supabase
    await supabase.from('agent_logs').insert({
      agent_name: 'Codex',
      task: prompt,
      result: output,
      status: 'complete',
    });

    await supabase.from('core_memory').insert({
      bot_name: 'Codex',
      last_action: prompt,
      prediction_summary: output,
      accuracy_estimate: 100,
      created_by: user_id,
      log_type: 'interaction',
    });

    return NextResponse.json({ output });
  } catch (error) {
    console.error("Codex error:", error);
    return NextResponse.json({ output: '⚠️ Codex encountered an error.', error }, { status: 500 });
  }
}
