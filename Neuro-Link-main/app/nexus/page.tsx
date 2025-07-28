'use client'
import { useState } from 'react';
export default function Nexus() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  async function ask() {
    const res = await fetch('/api/nexus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer || 'No response');
  }
  return (
    <div className="min-h-screen bg-black text-green-400 p-6">
      <h1 className="text-2xl">🔮 Nexus Prediction Core</h1>
      <textarea className="w-full mt-4 p-2 bg-gray-800" value={question} onChange={e => setQuestion(e.target.value)} />
      <button className="bg-green-700 mt-2 px-4 py-1" onClick={ask}>Ask Nexus</button>
      <pre className="mt-4">{answer}</pre>
    </div>
  );
}