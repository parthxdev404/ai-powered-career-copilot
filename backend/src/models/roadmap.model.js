import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
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
    roadmap: [
      {
        skill: String,

        priority: {
          type: String,
          enum: ["High", "Medium", "Low"],
        },

        reason: String,
        estimatedTime: String,
      },
    ],
  },

  { timestamps: true },
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);
export default Roadmap;
