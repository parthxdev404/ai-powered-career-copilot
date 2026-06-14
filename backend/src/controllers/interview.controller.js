import Interview from "../models/interview.model.js";
import Resume from "../models/resume.model.js";
import Analysis from "../models/analysis.model.js";

import { getMatchedJobs } from "../services/job.service.js";
import { generateInterviewPrep } from "../services/interview.service.js";

export const createInterview = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findById(
      resumeId,
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found ",
      });
    }

    const existingPrep = await Interview.findOne({
      resume: resume._id,
    });

    if (existingPrep) {
      return res.status(200).json({
        success: true,
        cached: true,
        data: existingPrep,
      });
    }

    const analysis = await Analysis.findOne({
      resume: resume._id,
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found ",
      });
    }

    const matchedJobs = await getMatchedJobs(analysis);

    const aiResult = await generateInterviewPrep(analysis, matchedJobs);

    const prep = await Interview.create({
      user: resume.user,

      resume: resume._id,

      jobTitle: aiResult.jobTitle || "",

      topics: aiResult.topics || [],

      technicalQuestions: aiResult.technicalQuestions || [],

      behavioralQuestions: aiResult.behavioralQuestions || [],

      preparationTips: aiResult.preparationTips || [],
    });

    return res.status(201).json({
      success: true,
      data: prep,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInterviewPrep =
  async (req, res) => {
    try {
      const prep =
        await Interview.findOne(
          {
            resume:
              req.params
                .resumeId,

            user:
              req.user._id,
          }
        );

      if (!prep) {
        return res.status(404).json({
          success: false,
          message:
            "Interview preparation not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: prep,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };