import express from "express";
import multer from "multer";
import { analyzeResume } from "../controllers/analyzeController";
import upload from "../middlewares/uploadMiddleware";

const router = express.Router();

router.post("/analyze", upload, analyzeResume);

export default router;
