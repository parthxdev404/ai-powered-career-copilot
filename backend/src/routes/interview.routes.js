import express from "express";
import { getInterviewPrep , createInterview } from "../controllers/interview.controller.js";
import { protect } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/:resumeId", protect , createInterview);
router.get("/:resumeId",protect,getInterviewPrep)

export default router