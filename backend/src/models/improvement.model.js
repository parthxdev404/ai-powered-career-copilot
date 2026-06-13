import mongoose from "mongoose";

const improvementSchema = new mongoose.Schema(
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

    overallScore: {
      type: Number,
      default: 0,
    },

    improvements: [
      {
        section: {
          type: String,
          required: true,
        },

        issue: {
          type: String,
          required: true,
        },

        currentText: {
          type: [String],
          default: [],
        },

        improvedText: {
          type: [String],
          default: [],
        },

        explanation: {
          type: String,
          required: true,
        },

        priority: {
          type: String,
          enum: ["High", "Medium", "Low"],
          default: "Medium",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Improvement = mongoose.model("Improvement", improvementSchema);

export default Improvement;
