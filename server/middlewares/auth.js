import asyncHandler from "express-async-handler";

export const auth = asyncHandler(async (req, res, next) => {
  const { userId, has } = await req.auth();
  const hasPremiumPlan = await has({ plan: "premium" });

  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  req.userId = userId;
  req.plan = hasPremiumPlan ? "premium" : "free";
  next();
});
