import { NextResponse } from 'next/server';
import { queryBrain } from '@/lib/brainRouter'; // This routes to your LLM
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { prompt, provider = 'openai', model = 'gpt-4', user_id = 'neo-pulse' } = await req.json();

    const messages = [
      { role: 'system', content: 'You are Codex, the recursive builder of InfinityXOne. You respond clearly and directly with working code or system actions.' },
      { role: 'user', content: prompt }
    ];

    const output = await queryBrain({ provider, model, messages });

    // Optional: log to memory
    await supabase.from('agent_logs').insert({
      agent_name: 'Codex',
      task: prompt,
      result: output,
      status: 'complete'
    });

    return NextResponse.json({ output });
  } catch (error) {
    console.error('❌ Codex Error:', error);
    return NextResponse.json({ output: '⚠️ Codex failed to respond.', error }, { status: 500 });
  }
}
