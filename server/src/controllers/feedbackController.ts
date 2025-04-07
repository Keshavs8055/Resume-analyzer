import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import PdfParse from "pdf-parse";
// import PdfParse from "pdf-parse/lib/pdf-parse";
import { model } from "../utils/gemini";
import { AppError } from "../middlewares/errorHandler";

export const FeedbackResume = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const fileBuffer = req.file?.buffer;

    if (!fileBuffer) {
      return next(new AppError("No resume uploaded.", 400));
    }

    try {
      const parsed = await PdfParse(fileBuffer);
      const pdfText = parsed.text;

      if (!pdfText || pdfText.trim().length < 20) {
        return next(
          new AppError("Resume content is too short to analyze.", 400)
        );
      }

      const prompt = `
        You are a resume analyzer. Review the resume and return:
        - Top Skills
        - Weaknesses
        - A brief summary of the candidate

        Resume:
        ${pdfText}
      `;

      const result = await model.generateContent(prompt);
      const analysis = await result.response.text();

      res.status(200).json({
        success: true,
        analysis,
      });
    } catch (error) {
      console.error("Feedback Error:", error);
      return next(
        new AppError("An error occurred while analyzing the resume.", 500)
      );
    }
  }
);
