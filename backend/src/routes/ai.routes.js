import express from "express";
import { analyzeResume, getAnalysis } from "../controllers/ai.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validateResumeAnalysis } from "../validators/analysisValidator.js";
import { analyzeResumeWithAI } from "../services/ai.service.js";
import { aiLimiter } from "../middlewares/rateLimiter.js";
const router = express.Router();

router.post(
  "/analyze/:resumeId",
  protect,
  aiLimiter,
  validateResumeAnalysis,
  analyzeResume,
);
router.get(
  "/analyze/:resumeId",
  protect,
  getAnalysis,
);


export default router;
