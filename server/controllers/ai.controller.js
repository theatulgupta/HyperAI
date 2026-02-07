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

  if (!prompt || !prompt.trim())
    return res.status(400).json({
      success: false,
      error: "Please provide a valid prompt.",
    });

  const parsedLength = Number(length) || 800;

  if (!isPremium && free_usage >= 10)
    return res.status(400).json({
      success: false,
      error: "Free usage limit reached. Upgrade to premium to continue.",
    });

  const content = await generateArticleService({
    userId,
    prompt: prompt.trim(),
    length: parsedLength,
  });
  await incrementFreeUsage(userId, free_usage);
  res.status(200).json({ success: true, content });
});

export const generateBlogTitle = asyncHandler(async (req, res) => {
  const { userId, plan } = req;
  const { keyword, category } = req.body;
  const isPremium = plan === "premium";

  const free_usage = await getFreeUsage(userId);

  if (!keyword || !keyword.trim())
    return res.status(400).json({
      success: false,
      error: "Please provide a valid keyword.",
    });

  if (!category || !category.trim())
    return res.status(400).json({
      success: false,
      error: "Please select a category.",
    });

  if (!isPremium && free_usage >= 10)
    return res.status(400).json({
      success: false,
      error: "Free usage limit reached. Upgrade to premium to continue.",
    });

  const content = await generateBlogTitleService({
    userId,
    keyword: keyword.trim(),
    category: category.trim(),
  });
  await incrementFreeUsage(userId, free_usage);
  res.status(200).json({ success: true, content });
});

export const generateImage = asyncHandler(async (req, res) => {
  const { userId, plan } = req;
  const { prompt, publish } = req.body;
  const isPremium = plan === "premium";

  if (!prompt || !prompt.trim())
    return res.status(400).json({
      success: false,
      error: "Please provide a valid prompt.",
    });

  if (!isPremium)
    return res.status(400).json({
      success: false,
      error: "This feature is only available for premium users.",
    });

  const secure_url = await generateImageService({
    userId,
    prompt: prompt.trim(),
    publish,
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

  if (!image)
    return res.status(400).json({
      success: false,
      error: "Please upload an image.",
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

  if (!image)
    return res.status(400).json({
      success: false,
      error: "Please upload an image.",
    });

  if (!object || !object.trim())
    return res.status(400).json({
      success: false,
      error: "Please provide the object to remove.",
    });

  const secure_url = await removeImageObjectService({
    userId,
    image,
    object: object.trim(),
  });
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

  if (!resume)
    return res.status(400).json({
      success: false,
      error: "Please upload a resume.",
    });

  if (resume.mimetype !== "application/pdf")
    return res.status(400).json({
      success: false,
      error: "Only PDF resumes are supported.",
    });

  if (resume.size > 5 * 1024 * 1024)
    return res.status(400).json({
      success: false,
      error: "File size is too large. Please upload a file smaller than 5MB.",
    });

  const content = await reviewResumeService({ userId, resume });
  res.status(200).json({ success: true, content });
});
