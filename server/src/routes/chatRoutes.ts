import express from "express";
import { chatWithResume } from "../controllers/chatController";

const router = express.Router();

router.post("/chat", chatWithResume);

export default router;
