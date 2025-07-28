
import React, { useState } from 'react';
import Codex from '@/components/agents/Codex';
import Echo from '@/components/agents/Echo';
import FinSynapse from '@/components/agents/FinSynapse';

export default function InfinityShell() {
  const [activeAgent, setActiveAgent] = useState(null);
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex space-x-2">
        <button onClick={() => setActiveAgent('codex')}>⚙️</button>
        <button onClick={() => setActiveAgent('echo')}>🎤</button>
        <button onClick={() => setActiveAgent('fin')}>📈</button>
      </div>
      <div className="mt-2 bg-white rounded-xl shadow-xl p-4">
        {activeAgent === 'codex' && <Codex />}
        {activeAgent === 'echo' && <Echo />}
        {activeAgent === 'fin' && <FinSynapse />}
      </div>
    </div>
  );
}
