import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/ai.route.js";
import { env } from "./configs/env.config.js";
import morgan from "morgan";
import userRouter from "./routes/user.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello from Server!");
});

app.use("/api/ai", requireAuth(), aiRouter);
app.use("/api/user", requireAuth(), userRouter);

// Global Error Handler
app.use(errorHandler);

app.listen(env.PORT || 3000, () => {
  console.log(`Server is running on port ${env.PORT}`);
});

export default app;
