import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    skills: [String],
    technologies: [String],

    location: {
      type: String,
      default: "Remote",
    },

    experiencelevel: {
      type: String,
      enum: ["Internship", "Junior", "Mid", "Senior"],
      default: "Junior",
    },

    salaryRange: {
      type: String,
      default: "",
    },

    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Internship"],
      default: "Full-Time",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

jobSchema.index({
  title: "text",
  company: "text",
  description: "text",
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
