import OpenAI from "openai";
import { env } from "./env.config.js";

const AI = new OpenAI({
  apiKey: env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const createGeminiChatCompletion = async ({
  prompt,
  temperature,
  max_tokens,
}) => {
  return AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [{ role: "user", content: prompt }],
    temperature: temperature,
    max_completion_tokens: max_tokens,
  });
};

export { createGeminiChatCompletion };
