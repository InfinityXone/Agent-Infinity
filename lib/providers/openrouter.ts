export async function queryOpenRouter({ model, messages }) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AI_OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, messages })
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '⚠️ No response from OpenRouter';
}
