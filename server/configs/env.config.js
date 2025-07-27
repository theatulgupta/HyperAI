// Load environment variables from .env file
import "dotenv/config";

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  CLIPDROP_API_KEY: process.env.CLIPDROP_API_KEY,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
};

["DATABASE_URL", "CLERK_SECRET_KEY", "GEMINI_API_KEY"].forEach((key) => {
  if (!env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});
