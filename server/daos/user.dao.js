import { clerkClient } from "@clerk/express";

export const getFreeUsage = async (userId) => {
  const user = await clerkClient.users.getUser(userId);
  return user.privateMetadata?.free_usage || 0;
};

export const incrementFreeUsage = async (userId, current) => {
  const next = current === -1 ? 0 : current + 1;
  await clerkClient.users.updateUserMetadata(userId, {
    privateMetadata: {
      free_usage: next,
    },
  });
};
