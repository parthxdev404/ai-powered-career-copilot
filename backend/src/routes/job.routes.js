import express from "express";
import {
  createJob,
  getJobs,
  getSingleJob,
  matchJobs,
} from "../controllers/job.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { syncJobs } from "../controllers/jobsync.controller.js";

const router = express.Router();

router.post("/", protect, createJob);
router.get("/", protect, getJobs);
router.get("/:jobId", protect, getSingleJob);
router.get("/match/:resumeId", protect, matchJobs);
router.post("/sync" , protect , syncJobs);

export default router;
