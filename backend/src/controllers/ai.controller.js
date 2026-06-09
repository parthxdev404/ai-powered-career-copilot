import Resume from "../models/resume.model.js";
import Analysis from "../models/analysis.model.js";

import { analyzeResumeWithAI } from "../services/ai.service.js";

export const analyzeResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.json(400).json({
        success: false,
        message: "Resume not found",
      });
    }

    const aiResult = await analyzeResumeWithAI(resume.extractedText);
    const existingAnalysis = await Analysis.findOne({
      resume: resume._id,
    });

    if (existingAnalysis) {
      return res.status(200).json({
        success: true,
        data: existingAnalysis,
      });
    }
    const analysis = await Analysis.create({
      user: resume.user,
      resume: resume._id,

      skills: aiResult.skills || [],
      technologies: aiResult.technologies || [],
      projects: aiResult.projects || [],
      strengths: aiResult.strengths || [],
      weaknesses: aiResult.weaknesses || [],
      experienceSummary: aiResult.experienceSummary || [],
      aiSummary: aiResult.aiSummary || [],
      atsScore: aiResult.atsScore || [],
    });
    return res.status(201).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
