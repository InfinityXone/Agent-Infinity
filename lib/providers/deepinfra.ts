import { deepinfra } from '@ai-sdk/deepinfra';
import { streamText } from 'ai';

export async function queryDeepInfra({ model, messages }) {
  const userPrompt = messages.map(m => m.content).join('\n');

  const result = await streamText({
    model: deepinfra(model), // e.g. "deepseek-ai/DeepSeek-R1-Turbo"
    prompt: userPrompt
  });

  let fullText = '';
  for await (const chunk of result.textStream) {
    fullText += chunk;
  }

  return fullText || '⚠️ No response from DeepInfra.';
}
