import express from "express";
import {
  createRoadmap,
  getRoadmap,
} from "../controllers/roadmap.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:resumeId", protect, createRoadmap);
router.get("/:resumeId", protect, getRoadmap);

export default router;
