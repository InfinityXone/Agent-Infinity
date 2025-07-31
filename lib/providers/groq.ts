type Message = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};

export async function queryGroq({ model, messages }: { model: string; messages: Message[] }) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data?.choices?.[0]?.message?.content ?? '⚠️ No response from Groq.';
}
