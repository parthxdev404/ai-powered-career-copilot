import express from "express";

import {
  createInterviewReport,
  getInterviewReport,
} from "../controllers/interviewReport.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:sessionId" , protect , createInterviewReport);
router.get("/:sessionId" , protect , getInterviewReport)

export default router
