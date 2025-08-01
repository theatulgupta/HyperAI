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

export const getCreation = async (id) => {
  return await sql`
    SELECT * FROM creations
    WHERE id = ${id}
  `;
};

export const getCreations = async (userId, limit = 10, offset = 0) => {
  return await sql`
    SELECT * FROM creations
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;
};

export const getPublishedCreations = async (limit = 10, offset = 0) => {
  return await sql`
    SELECT * FROM creations
    WHERE publish = true
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;
};

export const updateCreation = async (id, likes) => {
  await sql`
    UPDATE creations
    SET likes = ${likes}::text[]
    WHERE id = ${id}
  `;
};
