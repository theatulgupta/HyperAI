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
import { upload } from "../configs/multer.config.js";

const aiRouter = Router();

aiRouter.post("/generate-article", auth, generateArticle);
aiRouter.post("/generate-blog-title", auth, generateBlogTitle);
aiRouter.post("/generate-image", auth, generateImage);
aiRouter.post(
  "remove-image-background",
  upload.single("image"),
  auth,
  removeImageBackground
);
aiRouter.post(
  "remove-image-object",
  upload.single("image"),
  auth,
  removeImageObject
);
aiRouter.post("/review-resume", upload.single("resume"), auth, reviewResume);

export default aiRouter;
