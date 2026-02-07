import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeImageBackground,
  removeImageObject,
  reviewResume,
} from "../controllers/ai.controller.js";
import upload from "../configs/multer.config.js";

const aiRouter = Router();

aiRouter.post("/generate-article", auth, generateArticle);
aiRouter.post("/generate-blog-title", auth, generateBlogTitle);
aiRouter.post("/generate-image", auth, generateImage);
aiRouter.post(
  "/remove-image-background",
  auth,
  upload.single("image"),
  removeImageBackground,
);
aiRouter.post(
  "/remove-image-object",
  auth,
  upload.single("image"),
  removeImageObject,
);
aiRouter.post("/review-resume", auth, upload.single("resume"), reviewResume);

export default aiRouter;
