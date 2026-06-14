import mongoose from "mongoose";

const interviewReportSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      session: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "InterviewSession",
        required: true,
      },

      overallScore: {
        type: Number,
        default: 0,
      },

      technicalScore: {
        type: Number,
        default: 0,
      },

      communicationScore: {
        type: Number,
        default: 0,
      },

      confidenceScore: {
        type: Number,
        default: 0,
      },

      strengthAreas: [
        String,
      ],

      weakAreas: [
        String,
      ],

      recommendation: {
        type: String,
        default: "",
      },

      summary: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

const InterviewReport =
  mongoose.model(
    "InterviewReport",
    interviewReportSchema
  );

export default InterviewReport;