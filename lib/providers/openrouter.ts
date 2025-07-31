type Message = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};

export async function queryOpenRouter({ model, messages }: { model: string; messages: Message[] }) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data?.choices?.[0]?.message?.content ?? '⚠️ No response from OpenRouter.';
}
