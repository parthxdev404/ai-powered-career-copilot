import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      default: "",
    },

    skills: [String],

    experience: [String],

    education: [String],

    projects: [String],

    aiSummary: {
      type: String,
      default: "",
    },

    uploadStatus: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume" , resumeSchema)

export default Resume