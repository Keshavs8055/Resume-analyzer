import { Request, Response, NextFunction } from "express";
import PdfParse from "pdf-parse";
// import PdfParse from "pdf-parse/lib/pdf-parse";

import { model } from "../utils/gemini";
import { catchAsync } from "../utils/catchAsync";
import { redisClient } from "../utils/redisClient";
import { AppError } from "../middlewares/errorHandler";

export const analyzeResume = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const fileBuffer = req.file?.buffer;
    if (!fileBuffer) {
      return next(new AppError("No file uploaded", 400));
    }

    const parsed = await PdfParse(fileBuffer);
    const pdfText = parsed.text;

    const sanitizedText = pdfText.replace(/[^a-zA-Z0-9 .,\n]/g, "");
    const sessionId = req.headers["x-session-id"] as string;

    if (!sessionId) {
      return next(new AppError("Session ID missing", 400));
    }

    try {
      await redisClient.set(sessionId, sanitizedText, { EX: 60 * 60 }); // 1 hour expiry
    } catch (err) {
      console.error("Redis SET Error:", err);
      return next(new AppError("Failed to store resume in cache", 500));
    }

    const prompt = `You are a resume analyzer. Review this resume and return:
- Top skills
- Weaknesses
- Summary
Resume content:
${sanitizedText}`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    res.status(200).json({ analysis: responseText });
  }
);
