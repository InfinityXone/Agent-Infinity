export async function queryGroq({ model, messages }) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AI_GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, messages })
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '⚠️ No response from Groq';
}
