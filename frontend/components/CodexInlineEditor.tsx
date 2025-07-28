
// Codex UI for editing frontend (agentic)
import { useState } from 'react';

export default function CodexInlineEditor({ initialCode = '' }) {
  const [code, setCode] = useState(initialCode);
  const handleRun = () => {
    try {
      eval(code); // Prototype only. In production, secure sandboxing required.
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="codex-editor">
      <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={10} cols={80} />
      <button onClick={handleRun}>Run Code</button>
    </div>
  );
}
