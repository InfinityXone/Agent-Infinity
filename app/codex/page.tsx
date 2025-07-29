'use client';

import { useState } from 'react';

export default function CodexPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  async function runCodex() {
    setLoading(true);
    const res = await fetch('/api/codex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt, // 🧠 this is the input Codex understands
        user_id: 'demo-user' // optional, for Supabase logs
      }),
    });

    const data = await res.json();
    setResponse(data.response || 'No response from Codex.');
    setLoading(false);
  }

  return (
    <div className="p-6 bg-black text-white min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-4">🧠 Codex: Agentic Builder</h1>

      <textarea
        className="w-full border border-gray-600 p-3 bg-gray-900 text-white rounded"
        rows={6}
        placeholder="Ask Codex to create an API, SQL table, or React component..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={runCodex}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 mt-4 rounded"
        disabled={loading}
      >
        {loading ? 'Running...' : 'Execute'}
      </button>

      <div className="mt-6 bg-gray-800 p-4 rounded text-sm whitespace-pre-wrap">
        <h2 className="text-xl mb-2">🧾 Codex Response</h2>
        {response}
      </div>
    </div>
  );
}
