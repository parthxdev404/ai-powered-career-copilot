import express from "express";
import {
  createInterviewSession,
  getInterviewSession,
  submitAnswer,
} from "../controllers/interviewSession.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:sessionId/answer", protect, submitAnswer);
router.post("/:resumeId", protect, createInterviewSession);
router.get("/:resumeId", protect, getInterviewSession);
export default router;
