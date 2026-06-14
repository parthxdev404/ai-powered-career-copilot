import InterviewReport from "../models/interviewReport.model.js";
import InterviewSession from "../models/interviewSession.model.js";

import { generateInterviewReport } from "../services/interviewReport.service.js";

export const createInterviewReport =
  async (req, res) => {
    try {
      const { sessionId } =
        req.params;

      const session =
        await InterviewSession.findOne({
          _id: sessionId,
          user: req.user._id,
        });

      if (!session) {
        return res.status(404).json({
          success: false,
          message:
            "Interview session not found",
        });
      }

      const existingReport =
        await InterviewReport.findOne({
          session: session._id,
        });

      if (existingReport) {
        return res.status(200).json({
          success: true,
          cached: true,
          data: existingReport,
        });
      }

      if (
        session.answers.length < 3
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Answer at least 3 questions before generating a report",
        });
      }

      const aiReport =
        await generateInterviewReport(
          session.answers
        );

      const report =
        await InterviewReport.create({
          user: req.user._id,

          session:
            session._id,

          overallScore:
            aiReport.overallScore ||
            0,

          technicalScore:
            aiReport.technicalScore ||
            0,

          communicationScore:
            aiReport.communicationScore ||
            0,

          confidenceScore:
            aiReport.confidenceScore ||
            0,

          strengthAreas:
            aiReport.strengthAreas ||
            [],

          weakAreas:
            aiReport.weakAreas ||
            [],

          recommendation:
            aiReport.recommendation ||
            "",

          summary:
            aiReport.summary ||
            "",
        });

      session.status =
        "completed";

      await session.save();

      return res.status(201).json({
        success: true,
        data: report,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export const getInterviewReport = async (req, res) => {
  try {
    const report = await InterviewReport.findOne({
      session: req.params.sessionId,
      user: req.user._id,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Interview report not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
