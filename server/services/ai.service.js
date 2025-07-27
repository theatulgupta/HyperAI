import { createGeminiChatCompletion } from "../configs/gemini.config.js";
import { saveCreation } from "../daos/creations.dao.js";
import { generateClipDropImage } from "../configs/clipdrop.config.js";
import {
  uploadImage,
  uploadImageRemoveBackground,
  uploadImageRemoveObject,
} from "../configs/cloudinary.config.js";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

export const generateArticleService = async ({ userId, prompt, length }) => {
  const originalPrompt = prompt;
  prompt = `Write a detailed, well-structured, and SEO-friendly article about "${prompt}" with approximately ${length} words. Make it informative and engaging for a general audience.`;

  const response = await createGeminiChatCompletion({
    prompt,
    temperature: 0.7,
    max_tokens: length,
  });

  const content = response.choices?.[0]?.message?.content;

  await saveCreation(
    userId,
    `Write an article about ${originalPrompt}`,
    content,
    "article"
  );
  return content;
};

export const generateBlogTitleService = async ({
  userId,
  keyword,
  category,
}) => {
  const prompt = `You are a professional blog content strategist. Generate 10 **bold**, engaging, SEO-optimized blog titles based on the keyword "${keyword}" in the "${category}" category. Titles should be unique, creative, and click-worthy. Format the response as a numbered list (1–5), with each title in **bold**, followed by a short 1-line normal text description that explains the blog post's value or angle. Keep the entire response under 120 words.`;

  const response = await createGeminiChatCompletion({
    prompt,
    temperature: 0.7,
    max_tokens: 500,
  });

  const content = response.choices?.[0]?.message?.content;

  await saveCreation(
    userId,
    `Generate blog-titles for ${keyword} in the ${category} category.`,
    content,
    "blog-title"
  );
  return content;
};

export const generateImageService = async ({ userId, prompt, publish }) => {
  const image = await generateClipDropImage(prompt);
  const secure_url = await uploadImage(image);
  await saveCreation(userId, prompt, secure_url, "image", publish);
  return secure_url;
};

export const removeImageBackgroundService = async ({ userId, image }) => {
  const secure_url = await uploadImageRemoveBackground(image.path);
  await saveCreation(
    userId,
    "Remove background from image",
    secure_url,
    "image"
  );
  return secure_url;
};

export const removeImageObjectService = async ({ userId, image, object }) => {
  const secure_url = await uploadImageRemoveObject(image.path, object);
  await saveCreation(
    userId,
    `Removed ${object} from image.`,
    secure_url,
    "image"
  );
  return secure_url;
};

export const reviewResumeService = async ({ userId, resume }) => {
  const dataBuffer = fs.readFileSync(resume.path);
  const pdfData = await pdf(dataBuffer);

  const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`;

  const response = await createGeminiChatCompletion({
    prompt,
    temperature: 0.7,
    max_tokens: 1000,
  });

  const content = response.choices?.[0]?.message?.content;

  await saveCreation(
    userId,
    "Review the uploaded resume",
    content,
    "resume-review",
    {
      isResume: true,
    }
  );
  return content;
};
