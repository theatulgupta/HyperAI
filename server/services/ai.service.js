import { createGeminiChatCompletion } from "../configs/gemini.config.js";
import { getFreeUsage, incrementFreeUsage } from "../daos/user.dao.js";
import { saveCreation } from "../daos/creations.dao.js";
import { generateClipDropImage } from "../configs/clipdrop.config.js";
import { uploadImage } from "../configs/cloudinary.config.js";

export const generateArticleService = async ({
  userId,
  prompt,
  length,
  isPremium,
}) => {
  const free_usage = await getFreeUsage(userId);

  if (!isPremium && free_usage >= 10) {
    throw new Error(
      "Free usage limit reached. Upgrade to premium to continue."
    );
  }

  const response = await createGeminiChatCompletion({
    prompt,
    temperature: 0.7,
    max_tokens: length || 300,
  });

  const content = response.choices?.[0]?.message?.content;

  await saveCreation(userId, prompt, content, "article");

  if (!isPremium) await incrementFreeUsage(userId, free_usage);

  return content;
};

export const generateBlogTitleService = async ({
  userId,
  prompt,
  isPremium,
}) => {
  const free_usage = await getFreeUsage(userId);

  if (!isPremium && free_usage >= 10) {
    throw new Error(
      "Free usage limit reached. Upgrade to premium to continue."
    );
  }

  const response = await createGeminiChatCompletion({
    prompt,
    temperature: 0.7,
    max_tokens: 100,
  });

  const content = response.choices?.[0]?.message?.content;

  await saveCreation(userId, prompt, content, "blog-title");

  if (!isPremium) await incrementFreeUsage(userId, free_usage);

  return content;
};

export const generateImageService = async ({
  userId,
  prompt,
  publish,
  isPremium,
}) => {
  if (!isPremium) {
    throw new Error("This feature is only available for premium users.");
  }

  const image = await generateClipDropImage(prompt);
  const secure_url = await uploadImage(image);
  await saveCreation(userId, prompt, secure_url, "image", publish);
  return secure_url;
};
