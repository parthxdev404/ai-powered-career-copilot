import mongoose from "mongoose";

const interviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    jobTitle: {
      type: String,
      default: "",
    },

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

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    answers: [
      {
        question: {
          type: String,
          required: true,
        },

        userAnswer: {
          type: String,
          default: "",
        },

        score: {
          type: Number,
          default: 0,
        },

        strengths: [String],

        weaknesses: [String],

        improvedAnswer: {
          type: String,
          default: "",
        },

        feedback: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const InterviewSession = mongoose.model(
  "InterviewSession",
  interviewSessionSchema,
);

export default InterviewSession;
