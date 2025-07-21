import sql from "../configs/db.config.js";

export const saveCreation = async (userId, prompt, content, type) => {
  await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, ${type})`;
};
