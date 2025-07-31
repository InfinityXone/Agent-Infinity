import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Message = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};

export async function queryOpenAI({ model, messages }: { model: string; messages: Message[] }) {
  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature: 0.7,
  });

  return response.choices?.[0]?.message?.content ?? '⚠️ No response from OpenAI.';
}
