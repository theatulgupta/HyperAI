import asyncHandler from "express-async-handler";
import { generateArticleService } from "../services/ai.service.js";

export const generateArticle = asyncHandler(async (req, res) => {
  const response = await generateArticleService(req);
  res.status(response.status).json(response.body);
});
