import { getFreeUsage, incrementFreeUsage } from "../daos/user.dao.js";

export const checkUserAccessService = async (req) => {
  const { userId, has } = await req.auth();
  const hasPremiumPlan = await has({ plan: "premium" });

  if (!userId) {
    throw { status: 401, message: "Unauthorized" };
  }

  if (!hasPremiumPlan) {
    const freeUsage = await getFreeUsage(userId);
    if (freeUsage >= 10) {
      throw {
        status: 403,
        message: "Free usage limit reached. Please upgrade to premium.",
      };
    }
    await incrementFreeUsage(userId, freeUsage);
  }

  return { userId, hasPremiumPlan };
};
