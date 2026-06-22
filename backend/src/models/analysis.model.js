import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
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

    skills: [String],

    technologies: [String],

    projects: [String],

    strengths: [String],

    weaknesses: [String],
    missingKeywords: [String],

    suggestions: [String],

    sectionScores: [
      {
        name: String,
        score: Number,
      },
    ],

    experienceSummary: {
      type: String,
      default: "",
    },
    aiSummary: {
      type: String,
      default: "",
    },
    atsScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

analysisSchema.index({ user: 1 });
analysisSchema.index({ resume: 1 });

const Analysis = mongoose.model("Analysis", analysisSchema);
export default Analysis;
