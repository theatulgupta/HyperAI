import { clerkClient } from "@clerk/express";

export const getFreeUsage = async (userId) => {
  const user = await clerkClient.users.getUser(userId);
  const free_usage = user.privateMetadata?.free_usage ?? -1;
  return free_usage;
};

export const incrementFreeUsage = async (userId, current) => {
  const next = current === -1 ? 0 : current + 1;
  await clerkClient.users.updateUser(userId, {
    privateMetadata: { free_usage: next },
  });
};
