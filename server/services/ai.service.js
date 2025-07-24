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
  const response = await createGeminiChatCompletion({
    prompt,
    temperature: 0.7,
    max_tokens: length || 300,
  });

  const content = response.choices?.[0]?.message?.content;

  await saveCreation(userId, prompt, content, "article");
  return content;
};

export const generateBlogTitleService = async ({ userId, prompt }) => {
  const response = await createGeminiChatCompletion({
    prompt,
    temperature: 0.7,
    max_tokens: 500,
  });

  const content = response.choices?.[0]?.message?.content;
  if (!content) throw new Error("AI did not return a valid response.");

  await saveCreation(userId, prompt, content, "blog-title");
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

  await saveCreation(userId, prompt, content, "resume-review");
  return content;
};
