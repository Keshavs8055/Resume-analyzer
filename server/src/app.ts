import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import analyzeRoutes from "./routes/analyzeRoutes";
import chatRoutes from "./routes/chatRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";

import { errorHandler } from "./middlewares/errorHandler";
import { limiter } from "./middlewares/limiter";
import { connectRedis } from "./utils/redisClient";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Log loaded environment variables (optional for debugging only)
if (!process.env.GOOGLE_API_KEY || !process.env.CLIENT_URL) {
  console.warn("⚠️ Missing essential environment variables.");
}

app.use("/test", (req, res) => {
  res.status(200).json({
    status: "working",
    message: "Hello World!",
  });
});

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", limiter);

// Redis connection
connectRedis().catch((err) => console.error("❌ Redis connection error:", err));

// Routes
app.use("/api", analyzeRoutes);
app.use("/api", chatRoutes);
app.use("/api", feedbackRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

export default app;
