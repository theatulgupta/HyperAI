import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/ai.route.js";
import { env } from "./configs/env.config.js";
import morgan from "morgan";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());
app.use(morgan("dev"));

// Public Route
app.get("/", (req, res) => {
  res.send("Hello from Server!");
});

// API Routes (Protected)
app.use("/api/ai", requireAuth(), aiRouter);

app.listen(env.PORT || 3000, () => {
  console.log(`Server is running on port ${env.PORT}`);
});

export default app;
