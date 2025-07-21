import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { generateArticle } from "../controllers/ai.controller.js";

const aiRouter = Router();

aiRouter.post("/generate-article", auth, generateArticle);

export default aiRouter;
