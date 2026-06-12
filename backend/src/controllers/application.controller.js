import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const createApplication = async (req, res) => {
  try {
    const { jobId, notes } = req.body;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(400).json({
        success: false,
        message: "Job not found",
      });
    }

    const existingJobApplication = await Application.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (existingJobApplication) {
      return res.status(400).json({
        success: false,
        message: "Application already exists",
      });
    }

    const application = await Application.create({
      user: req.user._id,
      job: jobId,
      notes: notes || "",
    }) ;

    return res.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id,
    })
      .populate("job")
      .sort({ createAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateApplication = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedData = { status };

    if (status === "Applied") {
      updatedData.appliedAt = new Date();
    }

    const application = await Application.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      updatedData,
      {
        new: true,
      },
    ).populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted SuccessFully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getApplicationStats = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id,
    });

    const stats = {
      saved: 0,
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
      total: applications.length,
    };

    applications.forEach((application) => {
      switch (application.status) {
        case "Saved":
          stats.saved++;
          break;
        case "Applied":
          stats.applied++;
          break;
        case "Interview":
          stats.interview++;
          break;
        case "Offer":
          stats.offer++;
          break;
        case "Rejected":
          stats.rejected++;
          break;
      }
    });
    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
