'use client'
import dynamic from 'next/dynamic'
const EchoAvatar = dynamic(() => import('@/components/EchoAvatar'), { ssr: false });

export default function EchoPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold">🎤 Echo (Visual GPT Agent)</h1>
      <EchoAvatar />
    </div>
  );
}