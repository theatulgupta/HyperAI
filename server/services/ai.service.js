import { createGeminiChatCompletion } from "../configs/gemini.config.js";
import { getFreeUsage, incrementFreeUsage } from "../daos/user.dao.js";
import { saveCreation } from "../daos/creations.dao.js";

export const generateArticleService = async (req) => {
  const { userId } = req.auth();

  if (!req.body) {
    return {
      status: 400,
      body: {
        success: false,
        message:
          "Request body is missing. Ensure you are sending a JSON body with a 'Content-Type: application/json' header.",
      },
    };
  }

  const { prompt, length } = req.body;
  if (!prompt) {
    return {
      status: 400,
      body: {
        success: false,
        message: "The 'prompt' property is missing from the request body.",
      },
    };
  }

  const { plan } = req;
  const isPremium = plan === "premium";

  const free_usage = await getFreeUsage(userId);

  if (!isPremium && free_usage >= 10) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Free usage limit reached. Upgrade to premium to continue.",
      },
    };
  }

  const response = await createGeminiChatCompletion({
    prompt,
    temperature: 0.7,
    max_tokens: length,
  });

  const content = response.choices[0].message.content;

  await saveCreation(userId, prompt, content, "article");

  if (!isPremium) await incrementFreeUsage(userId, free_usage);

  return {
    status: 200,
    body: { success: true, content },
  };
};
