import { createGeminiChatCompletion } from "../configs/gemini.config.js";
import { getFreeUsage, incrementFreeUsage } from "../daos/user.dao.js";
import { saveCreation } from "../daos/creations.dao.js";
import { generateClipDropImage } from "../configs/clipdrop.config.js";
import {
  uploadImage,
  uploadImageRemoveBackground,
  uploadImageRemoveObject,
} from "../configs/cloudinary.config.js";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const checkAndUpdateUsage = async (userId, isPremium) => {
  if (isPremium) return;

  const free_usage = await getFreeUsage(userId);
  if (free_usage >= 10) {
    throw new Error(
      "Free usage limit reached. Upgrade to premium to continue."
    );
  }
  await incrementFreeUsage(userId, free_usage);
};

export const generateArticleService = async ({
  userId,
  prompt,
  length,
  isPremium,
}) => {
  await checkAndUpdateUsage(userId, isPremium);

  const response = await createGeminiChatCompletion({
    prompt,
    temperature: 0.7,
    max_tokens: length || 300,
  });

  const content = response.choices?.[0]?.message?.content;

  await saveCreation(userId, prompt, content, "article");
  return content;
};

export const generateBlogTitleService = async ({
  userId,
  prompt,
  isPremium,
}) => {
  await checkAndUpdateUsage(userId, isPremium);

  const response = await createGeminiChatCompletion({
    prompt,
    temperature: 0.7,
    max_tokens: 100,
  });

  const content = response.choices?.[0]?.message?.content;
  if (!content) throw new Error("AI did not return a valid response.");

  await saveCreation(userId, prompt, content, "blog-title");
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

export const removeImageBackgroundService = async ({
  userId,
  image,
  isPremium,
}) => {
  if (!isPremium) {
    throw new Error("This feature is only available for premium users.");
  }

  const secure_url = await uploadImageRemoveBackground(image.path);
  await saveCreation(
    userId,
    "Remove background from image",
    secure_url,
    "image"
  );
  return secure_url;
};

export const removeImageObjectService = async ({
  userId,
  image,
  object,
  isPremium,
}) => {
  if (!isPremium) {
    throw new Error("This feature is only available for premium users.");
  }

  const secure_url = await uploadImageRemoveObject(image.path, object);
  await saveCreation(
    userId,
    `Removed ${object} from image.`,
    secure_url,
    "image"
  );
  return secure_url;
};

export const reviewResumeService = async ({ userId, resume, isPremium }) => {
  if (!isPremium) {
    throw new Error("This feature is only available for premium users.");
  }

  if (resume.size > 5 * 1042 * 1024) {
    throw new Error("Resume file size exceeds 5MB limit.");
  }

  const dataBuffer = fs.readFileSync(resume.path);
  const pdfData = await pdf(dataBuffer);

  const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`;

  const response = await createGeminiChatCompletion({
    prompt,
    temperature: 0.7,
    max_tokens: 1000,
  });

  const content = response.choices?.[0]?.message?.content;

  await saveCreation(userId, prompt, content, "resume-review");
  return content;
};
