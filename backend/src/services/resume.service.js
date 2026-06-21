import Resume from "../models/resume.model.js";
import { extractTextfromPDF } from "./parser.service.js";

export const uploadResumeService = async (
  userId,
  file
) => {
  const resume = await Resume.create({
    user: userId,
    originalFileName: file.originalname,
    filePath: file.path,
    fileSize: file.size,
    uploadStatus: "processing",
  });

  try {
    const extractedText =
      await extractTextfromPDF(file.path);

    resume.extractedText = extractedText;
    resume.uploadStatus = "completed";

    await resume.save();

    return resume;
  } catch (error) {
    resume.uploadStatus = "failed";
    await resume.save();

    throw error;
  }
};