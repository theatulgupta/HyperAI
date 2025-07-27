import asyncHandler from "express-async-handler";
import {
  getCreationsService,
  getPublishedCreationsService,
  toggleLikeCreationService,
} from "../services/user.service.js";

export const getUserCreations = asyncHandler(async (req, res) => {
  const { userId } = req;

  const creations = await getCreationsService(userId);

  res.status(200).json({ success: true, creations });
});

export const getPublishedCreations = asyncHandler(async (req, res) => {
  const creations = await getPublishedCreationsService();

  res.status(200).json({ success: true, creations });
});

export const toggleLikeCreation = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { id } = req.body;

  const message = await toggleLikeCreationService({ userId, id });

  res.status(200).json({ success: true, message });
});
