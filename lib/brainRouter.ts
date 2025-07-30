import { queryDeepInfra } from './providers/deepinfra';

export async function queryBrain({ provider, model, messages }) {
  switch (provider) {
    case 'openai':
      return await queryOpenAI({ model, messages });
    case 'groq':
      return await queryGroq({ model, messages });
    case 'together':
      return await queryTogether({ model, messages });
    case 'openrouter':
      return await queryOpenRouter({ model, messages });
    case 'deepinfra':
      return await queryDeepInfra({ model, messages });
    case 'local':
      return await queryLocalLLM({ model, messages });
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}
