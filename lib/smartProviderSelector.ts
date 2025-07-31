// 🧠 Enhanced Smart Provider Selector
export function smartProviderSelector(prompt: string): { provider: string; model: string } {
  const length = prompt.length;
  const lower = prompt.toLowerCase();

  // Intent Detection
  const isCode = /\b(code|api|typescript|python|sql|generate function)\b/.test(lower);
  const isStrategy = /\b(plan|strategy|design|structure|roadmap|tokenomics)\b/.test(lower);
  const isChat = /\b(talk|chat|simulate|roleplay|story|character)\b/.test(lower);
  const isSpeed = /\b(quick|fast|cheap|draft)\b/.test(lower);

  // Routing Logic
  if (isCode && length < 1000) {
    return { provider: 'deepinfra', model: 'deepseek-ai/DeepSeek-R1-Turbo' };
  }

  if (isStrategy && !isSpeed) {
    return { provider: 'openai', model: 'gpt-4' };
  
  }

  if (isSpeed || length < 500) {
    return { provider: 'groq', model: 'deepseek-r1-distill-llama-70b' };
  }

  if (length > 3000) {
    return { provider: 'together', model: 'mistralai/Mixtral-8x7B-Instruct-v0.1' };
  }

  // Default Fallback
  return { provider: 'openrouter', model: 'openchat/openchat-3.5' };
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
