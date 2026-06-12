import mongoose from "mongoose";

export const validateApplication = async (req, res, next) => {
  const { jobId } = req.body;

  if (!jobId) {
    return res.status(400).json({
      success: false,
      message: "Job ID is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Job Id",
    });
  }
  next();
};

export const validateUpdateStatus = (req, res, next) => {
  const allowedStatus = ["Saved", "Applied", "Interview", "Rejected", "Offer"];

  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Status is required",
    });
  }

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Status",
    });
  }
  next();
};
