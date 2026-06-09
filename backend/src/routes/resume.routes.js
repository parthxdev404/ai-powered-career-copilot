import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { uploadResume } from "../middlewares/upload.middleware.js";
import { validateResumeUpload } from "../validators/resumeValidator.js";

import { deleteResume, getMyResumes, getResumeById, uploadResumeController } from "../controllers/resume.controller.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  uploadResume.single("resume"),
  validateResumeUpload,
  uploadResumeController,
);

router.get("/my-resumes",protect,getMyResumes);
router.get(
  "/:id",
  protect,
  getResumeById
);

router.delete("/:id" ,protect, deleteResume )

export default router