import asyncHandler from "express-async-handler";
import { checkUserAccessService } from "../services/auth.service.js";

export const auth = asyncHandler(async (req, res, next) => {
  const { userId, hasPremiumPlan } = await checkUserAccessService(req);
  req.userId = userId;
  req.hasPremiumPlan = hasPremiumPlan;
  req.plan = hasPremiumPlan ? "premium" : "free";
  next();
});
