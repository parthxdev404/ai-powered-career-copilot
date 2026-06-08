import { uploadResumeService } from "../services/resume.service.js";

export const uploadResumeController = async (req, res) => {
  try {
    const resume = await uploadResumeController(req.user._id, req.file);
    res.status(201).json({
      success: true,
      message: "Resume Uploaded Successfully",
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
