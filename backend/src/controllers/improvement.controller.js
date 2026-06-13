import Improvement from "../models/improvement.model.js";
import Resume from "../models/resume.model.js";
import Analysis from "../models/analysis.model.js";
import { generateImprovements } from "../services/improvement.service.js";

export const createImprovement =
  async (req, res) => {
    try {
      const { resumeId } =
        req.params;

      const resume =
        await Resume.findById(
          resumeId
        );

      if (!resume) {
        return res.status(404).json({
          success: false,
          message:
            "Resume not found",
        });
      }

      const existing =
        await Improvement.findOne(
          {
            resume:
              resume._id,
          }
        );

      if (existing) {
        return res.status(200).json({
          success: true,
          cached: true,
          data: existing,
        });
      }

      const analysis =
        await Analysis.findOne({
          resume:
            resume._id,
        });

      if (!analysis) {
        return res.status(404).json({
          success: false,
          message:
            "Analysis not found",
        });
      }

      const aiResult =
        await generateImprovements(
          analysis
        );

      const improvement =
        await Improvement.create(
          {
            user:
              resume.user,

            resume:
              resume._id,

            overallScore:
              aiResult.overallScore,

            improvements:
              aiResult.improvements ||
              [],
          }
        );

      return res.status(201).json({
        success: true,
        data: improvement,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  export const getImprovement =
  async (req, res) => {
    try {
      const improvement =
        await Improvement.findOne(
          {
            resume:
              req.params
                .resumeId,

            user:
              req.user._id,
          }
        );

      if (!improvement) {
        return res.status(404).json({
          success: false,
          message:
            "Improvement not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: improvement,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };