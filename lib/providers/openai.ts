import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.AI_OPENAI_API_KEY })
);

export async function queryOpenAI({ model, messages }) {
  const res = await openai.createChatCompletion({ model, messages });
  return res.data.choices[0].message.content;
}
