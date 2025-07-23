import {
  getCreations,
  getPublishedCreations,
  getCreation,
  updateCreation,
} from "../daos/creations.dao.js";

export const getCreationsService = (userId) => getCreations(userId);

export const getPublishedCreationsService = () => getPublishedCreations();

export const toggleLikeCreationService = async ({ userId, id }) => {
  const [creation] = await getCreation(id);
  if (!creation) throw new Error("Creation not found");

  const userIdStr = String(userId);
  const hasLiked = (creation.likes || []).includes(userIdStr);

  const updatedLikes = hasLiked
    ? creation.likes.filter((uid) => uid !== userIdStr)
    : [...creation.likes, userIdStr];

  await updateCreation(id, `{${updatedLikes.join(",")}}`);

  return hasLiked ? "Creation Unliked" : "Creation Liked";
};
