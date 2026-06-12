import express from "express";

import {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication,
  getApplicationStats
} from "../controllers/application.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import {
  validateApplication,
  validateUpdateStatus,
} from "../validators/applicationValidator.js";

const router = express.Router();

router.post("/", protect, validateApplication, createApplication);
router.get("/", protect, getApplications);
router.get("/stats" , protect, getApplicationStats)
router.get("/:id", protect, getApplication);
router.patch("/:id", protect, validateUpdateStatus, updateApplication);
router.delete("/:id", protect, deleteApplication);

export default router
