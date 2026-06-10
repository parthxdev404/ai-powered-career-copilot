import express from "express";
import { analyzeResume } from "../controllers/ai.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validateResumeAnalysis } from "../validators/analysisValidator.js";
import { analyzeResumeWithAI } from "../services/ai.service.js";
const router = express.Router();

router.post(
  "/analyze/:resumeId",
  protect,
  validateResumeAnalysis,
  analyzeResume,
);

router.get("/test-ai", async (req, res) => {
  try {
    const result =
      await analyzeResumeWithAI(`
      MERN Stack Developer
      React
      Node.js
      MongoDB
      Express
      Tailwind CSS
      `);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
