import express from "express";
import { analyzeResume } from "../controllers/ai.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validateResumeAnalysis } from "../validators/analysisValidator.js";

const router = express.Router();

router.post(
  "/analyze/:resumeId",
  protect,
  validateResumeAnalysis,
  analyzeResume,
);

export default router;
