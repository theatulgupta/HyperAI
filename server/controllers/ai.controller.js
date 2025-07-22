import asyncHandler from "express-async-handler";
import {
  generateArticleService,
  generateBlogTitleService,
  generateImageService,
} from "../services/ai.service.js";

export const generateArticle = asyncHandler(async (req, res) => {
  const { userId, plan } = req;
  const isPremium = plan === "premium";
  const { prompt, length } = req.body;

  const content = await generateArticleService({
    userId,
    prompt,
    length,
    isPremium,
  });

  res.status(200).json({ success: true, content });
});

export const generateBlogTitle = asyncHandler(async (req, res) => {
  const { userId, plan } = req;
  const isPremium = plan === "premium";
  const { prompt } = req.body;

  const content = await generateBlogTitleService({
    userId,
    prompt,
    isPremium,
  });

  res.status(200).json({ success: true, content });
});

export const generateImage = asyncHandler(async (req, res) => {
  const { userId, plan, hasPremiumPlan } = req;

  const isPremium = plan === "premium";
  const { prompt, publish } = req.body;

  const secure_url = await generateImageService({
    userId,
    prompt,
    publish,
    isPremium,
  });

  res.status(200).json({ success: true, secure_url });
});
