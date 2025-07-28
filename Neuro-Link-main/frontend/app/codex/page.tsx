'use client'
import { useState } from 'react';
export default function CodexPage() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  async function runCode() {
    const res = await fetch('/api/codex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    setResult(data.output || 'No response');
  }
  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold">🧠 Codex Dev Agent</h1>
      <textarea className="w-full border p-2 mt-4" rows={6} placeholder="Type code..." value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={runCode} className="bg-blue-500 text-white p-2 mt-2">Run</button>
      <pre className="bg-black text-white p-4 mt-4">{result}</pre>
    </div>
  );
}