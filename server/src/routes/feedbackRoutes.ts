import express from "express";
import { FeedbackResume } from "../controllers/feedbackController";
import upload from "../middlewares/uploadMiddleware";

const router = express.Router();

router.post("/feedback", upload, FeedbackResume);

export default router;
