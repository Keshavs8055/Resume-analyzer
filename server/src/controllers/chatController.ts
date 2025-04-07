import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/errorHandler";
import { catchAsync } from "../utils/catchAsync";
import { model } from "../utils/gemini";
import { redisClient } from "../utils/redisClient";

export const chatWithResume = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userMessage = req.body.message;
    const sessionId = req.headers["x-session-id"] as string;

    if (!sessionId) {
      return next(new AppError("Session ID missing", 400));
    }

    let resumeText: string | null;

    try {
      resumeText = await redisClient.get(sessionId);
    } catch (err) {
      console.error("Redis GET Error:", err);
      return next(new AppError("Failed to retrieve resume from cache", 500));
    }

    if (!resumeText) {
      return next(new AppError("Resume content not found", 400));
    }

    const prompt = `Resume:\n${resumeText}\n\nUser's Question:\n${userMessage}\n\nKeep the answers brief and to the point. Make responses graspable in a few words. All answers must be useful. Give examples when possible. Use simple words and explain in detail.`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    res.status(200).json({ response: responseText });
  }
);
