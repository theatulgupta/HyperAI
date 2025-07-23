import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import {
  getUserCreations,
  getPublishedCreations,
  toggleLikeCreation,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/get-user-creations", auth, getUserCreations);
userRouter.get("/get-published-creations", getPublishedCreations);
userRouter.post("/toggle-like-creation", auth, toggleLikeCreation);

export default userRouter;
