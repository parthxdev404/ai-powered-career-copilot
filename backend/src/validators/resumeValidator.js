export const validateResumeUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Resume file is required ",
    });
  }

  next();
};
