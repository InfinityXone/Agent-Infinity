'use client'
import { useEffect, useState } from 'react';

export default function EchoAvatar() {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance("Hello, I am Echo. Welcome to the future of AI.");
    utterance.voice = speechSynthesis.getVoices().find(v => v.name.includes("Samantha") || v.default);
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    speechSynthesis.speak(utterance);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto rounded-xl">
      <video
        src="https://lsdvdmtuiwqpkxcvldye.supabase.co/storage/v1/object/public/echo-avatars/echo.mp4"
        autoPlay
        loop
        muted
        playsInline
        className={`w-full transition-all duration-500 ${speaking ? 'opacity-100' : 'opacity-70'}`}
      />
    </div>
  );
}