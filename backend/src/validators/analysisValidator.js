export const validateResumeAnalysis = (
  req,
  res,
  next
) => {
  const { resumeId } = req.params;

  if (!resumeId) {
    return res.status(400).json({
      success: false,
      message: "Resume ID is required",
    });
  }

  next();
};