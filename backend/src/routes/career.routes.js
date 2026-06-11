import express from "express";

import {
  generateInsight,
  getInsight,
} from "../controllers/career.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/generate/:resumeId",
  protect,
  generateInsight
);

router.get(
  "/:resumeId",
  protect,
  getInsight
);

export default router;