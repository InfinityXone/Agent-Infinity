
// ElevenLabs Voice Hook (auto-imported in _app.tsx or layout.tsx)
import { useEffect } from 'react';

export const useElevenLabsVoice = (text: string) => {
  useEffect(() => {
    if (!text) return;
    fetch('/api/elevenlabs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
  }, [text]);
};
