import { queryOpenAI } from './providers/openai';
import { queryGroq } from './providers/groq';
import { queryOpenRouter } from './providers/openrouter';
import { queryDeepInfra } from './providers/deepinfra';

type Message = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};

type QueryParams = {
  provider: string;
  model: string;
  messages: Message[];
};

export async function queryBrain({ provider, model, messages }: QueryParams) {
  switch (provider) {
    case 'openai':
      return await queryOpenAI({ model, messages });
    case 'groq':
      return await queryGroq({ model, messages });
    case 'openrouter':
      return await queryOpenRouter({ model, messages });
    case 'deepinfra':
      return await queryDeepInfra({ model, messages });
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}
case 'groq':
      return await queryGroq({ model, messages });
    case 'together':
      return await queryTogether({ model, messages });
    case 'openrouter':
      return await queryOpenRouter({ model, messages });
    case 'deepinfra':
      return await queryDeepInfra({ model, messages });
    case 'xai':
      return await queryXAI({ model, messages }); // 👈 ADD XAI
    case 'local':
      return await queryLocalLLM({ model, messages });
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}
