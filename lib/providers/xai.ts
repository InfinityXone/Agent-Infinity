import { xai } from '@ai-sdk/xai';
import { streamText } from 'ai';

export async function queryXAI({ model, messages }) {
  const prompt = messages.map((m) => m.content).join('\n');

  const result = await streamText({
    model: xai(model), // e.g., "grok-2-1212"
    prompt
  });

  let fullText = '';
  for await (const chunk of result.textStream) {
    fullText += chunk;
  }

  return fullText || '⚠️ No response from Grok (xAI).';
}
