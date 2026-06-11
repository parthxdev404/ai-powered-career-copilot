import Job from "../models/job.model.js";
import Analysis from "../models/analysis.model.js";
import { getMatchedJobs } from "../services/job.service.js";

export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    return res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const job = await Job.find();
    return res.status(200).json({
      success: true,
      count: job.length,
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const matchJobs = async (req, res) => {
  try {

    const analysis = await Analysis.findOne({
      resume: req.params.resumeId,
        user: req.user._id,

    });


    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    const matches = await getMatchedJobs(analysis);


    return res.status(200).json({
      success: true,
      count: matches.length,
      data: matches,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
