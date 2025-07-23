import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/ai.route.js";
import { env } from "./configs/env.config.js";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRouter from "./routes/user.route.js";

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

// 🔒 Global error handler
app.use(errorHandler);

app.listen(env.PORT || 3000, () => {
  console.log(`Server is running on port ${env.PORT}`);
});

export default app;
