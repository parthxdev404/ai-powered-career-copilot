import express from "express";
import {
  createInterviewSession,
  getInterviewSession,
  submitAnswer,
} from "../controllers/interviewSession.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { submitAnswerSchema } from "../validators/interviewValidator.js";
import { protect } from "../middlewares/auth.middleware.js";
import { aiLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/:sessionId/answer",  protect,validate(submitAnswerSchema) ,  submitAnswer);
router.post("/:resumeId", protect,aiLimiter ,  createInterviewSession);
router.get("/:resumeId", protect, getInterviewSession);
export default router;
