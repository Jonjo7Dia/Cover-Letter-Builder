const { OpenAIApi } = require("openai");
export interface OpenAICompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: Array<{
    text: string;
    index: number;
    logprobs: null;
    finish_reason: string;
  }>;
}
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAIApi({ apiKey });

export default openai;
