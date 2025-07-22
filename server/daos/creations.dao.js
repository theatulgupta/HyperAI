import sql from "../configs/db.config.js";

export const saveCreation = async (
  userId,
  prompt,
  content,
  type,
  publish = false
) => {
  await sql`
    INSERT INTO creations (user_id, prompt, content, type, publish)
    VALUES (${userId}, ${prompt}, ${content}, ${type}, ${publish})
  `;
};
