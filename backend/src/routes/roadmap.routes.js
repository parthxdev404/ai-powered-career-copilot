import express from "express";
import {
  createRoadmap,
  getRoadmap,
} from "../controllers/roadmap.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { aiLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/:resumeId", protect, aiLimiter,createRoadmap);
router.get("/:resumeId", protect, getRoadmap);

export default router;
