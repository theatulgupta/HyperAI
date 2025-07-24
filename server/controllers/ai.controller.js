import asyncHandler from "express-async-handler";
import {
  generateArticleService,
  generateBlogTitleService,
  generateImageService,
  removeImageBackgroundService,
  removeImageObjectService,
  reviewResumeService,
} from "../services/ai.service.js";
import { getFreeUsage, incrementFreeUsage } from "../daos/user.dao.js";

export const generateArticle = asyncHandler(async (req, res) => {
  const { userId, plan } = req;
  const { prompt, length } = req.body;
  const isPremium = plan === "premium";
  const free_usage = await getFreeUsage(userId);

  if (!isPremium && free_usage >= 10)
    return res.status(400).json({
      success: false,
      error: "Free usage limit reached. Upgrade to premium to continue.",
    });

  const content = await generateArticleService({ userId, prompt, length });
  await incrementFreeUsage(userId, free_usage);
  res.status(200).json({ success: true, content });
});

export const generateBlogTitle = asyncHandler(async (req, res) => {
  const { userId, plan } = req;
  const { prompt } = req.body;
  const isPremium = plan === "premium";

  const free_usage = await getFreeUsage(userId);

  if (!isPremium && free_usage >= 10)
    return res.status(400).json({
      success: false,
      error: "Free usage limit reached. Upgrade to premium to continue.",
    });

  const content = await generateBlogTitleService({ userId, prompt, isPremium });
  await incrementFreeUsage(userId, free_usage);
  res.status(200).json({ success: true, content });
});

export const generateImage = asyncHandler(async (req, res) => {
  const { userId, plan } = req;
  const { prompt, publish } = req.body;
  const isPremium = plan === "premium";

  if (!isPremium)
    return res.status(400).json({
      success: false,
      error: "This feature is only available for premium users.",
    });

  const secure_url = await generateImageService({
    userId,
    prompt,
    publish,
    isPremium,
  });
  res.status(200).json({ success: true, secure_url });
});

export const removeImageBackground = asyncHandler(async (req, res) => {
  const { userId, plan } = req;
  const image = req.file;
  const isPremium = plan === "premium";

  if (!isPremium)
    return res.status(400).json({
      success: false,
      error: "This feature is only available for premium users.",
    });

  const secure_url = await removeImageBackgroundService({ userId, image });
  res.status(200).json({ success: true, secure_url });
});

export const removeImageObject = asyncHandler(async (req, res) => {
  const { userId, plan } = req;
  const { object } = req.body;
  const image = req.file;
  const isPremium = plan === "premium";

  if (!isPremium)
    return res.status(400).json({
      success: false,
      error: "This feature is only available for premium users.",
    });

  const secure_url = await removeImageObjectService({ userId, image, object });
  res.status(200).json({ success: true, secure_url });
});

export const reviewResume = asyncHandler(async (req, res) => {
  const { userId, plan } = req;
  const resume = req.file;
  const isPremium = plan === "premium";

  if (!isPremium)
    return res.status(400).json({
      success: false,
      error: "This feature is only available for premium users.",
    });

  if (resume.size > 5 * 1024 * 1024)
    return res.status(400).json({
      success: false,
      error: "File size is too large. Please upload a file smaller than 5MB.",
    });

  const content = await reviewResumeService({ userId, resume });
  res.status(200).json({ success: true, content });
});
