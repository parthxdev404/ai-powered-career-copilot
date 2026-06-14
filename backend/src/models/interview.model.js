import mongoose from "mongoose";

const interviewPrepSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      resume: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Resume",
        required: true,
      },

      jobTitle: {
        type: String,
        default: "",
      },

      topics: [String],

      technicalQuestions: [
        {
          question: String,
        },
      ],

      behavioralQuestions: [
        {
          question: String,
        },
      ],

      preparationTips: [String],
    },
    {
      timestamps: true,
    }
  );

const Interview =
  mongoose.model(
    "InterviewPrep",
    interviewPrepSchema
  );

export default Interview;