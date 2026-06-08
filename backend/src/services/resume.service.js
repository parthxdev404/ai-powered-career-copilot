import Resume from "../models/resume.model";
import { extractTextfromPDF } from "./parser.service";

export const uploadResumeService = async (userId, file) => {
  const resume = await Resume.create({
    user: userId,
    originalFileName: file.originalname,
    filePath: file.path,
    uploadStatus: "processing",
  });

  try {
    const extractedText = await extractTextfromPDF(file.path);
    resume.extractedText = extractedText;
    resume.uploadStatus = "completed";

    await resume.save();
    return resume;
  } catch (error) {
    ((resume.uploadStatus = "failed"), await resume.save());

    throw error;
  }
};
