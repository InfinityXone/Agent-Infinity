export function smartProviderSelector(prompt: string): { provider: string; model: string } {
  const length = prompt.length;
  const lower = prompt.toLowerCase();

  // 🧠 Choose by intent
  const isCode = /code|api|typescript|python|sql|build|generate function/.test(lower);
  const isStrategy = /plan|strategy|design|structure|roadmap|tokenomics/.test(lower);
  const isChat = /talk|chat|simulate|roleplay|story|character/.test(lower);
  const isSpeed = /quick|fast|cheap|draft/.test(lower);

  // 💡 Routing Logic
  if (isCode && length < 1000) {
    return { provider: 'deepinfra', model: 'deepseek-ai/DeepSeek-R1-Turbo' };
  }

  if (isStrategy && !isSpeed) {
    return { provider: 'openai', model: 'gpt-4' };
  }

  if (isChat) {
    return { provider: 'xai', model: 'grok-2-1212' };
  }

  if (isSpeed || length < 500) {
    return { provider: 'groq', model: 'deepseek-r1-distill-llama-70b' };
  }

  if (length > 3000) {
    return { provider: 'together', model: 'mistralai/Mixtral-8x7B-Instruct-v0.1' };
  }

  // 🛡️ Default
  return { provider: 'openrouter', model: 'openchat/openchat-3.5' };
}
