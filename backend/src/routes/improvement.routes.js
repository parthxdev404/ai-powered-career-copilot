import express from "express";
import {
  createImprovement,
  getImprovement,
} from "../controllers/improvement.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:resumeId", protect, createImprovement);
router.get("/:resumeId", protect, getImprovement);

export default router;
