import express from "express";
import { analyzeResume } from "../controllers/ai.controller";
import { protect } from "../middlewares/auth.middleware";
import { validateResumeAnalysis } from "../validators/analysisValidator";

const router = express.Router();

router.post(
  "/analyze/:resumeId",
  protect,
  validateResumeAnalysis,
  analyzeResume,
);

export default router;
