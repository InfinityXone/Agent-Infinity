// /lib/brainRouter.ts

import { queryOpenAI } from './providers/openai';
import { queryGroq } from './providers/groq';
import { queryTogether } from './providers/together';
import { queryOpenRouter } from './providers/openrouter';
import { queryLocalLLM } from './providers/local'; // If you ever self-host

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
    case 'local':
      return await queryLocalLLM({ model, messages });
    default:
      throw new Error(`❌ Unknown provider: ${provider}`);
  }
}
