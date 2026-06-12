import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    status: {
      type: String,
      enum: ["Saved", "Applied", "Interview", "Rejected", "Offer"],
      default: "Saved",
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
    appliedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

applicationSchema.index({ user: 1 });
applicationSchema.index({ job: 1 });
applicationSchema.index(
  {
    user: 1,
    status: 1,
  },

  {
    unique: true,
  },
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
