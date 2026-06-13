import Roadmap from "../models/roadmap.model.js";
import Analysis from "../models/analysis.model.js";
import Resume from "../models/resume.model.js";
import { generateRoadmap } from "../services/roadmap.service.js";
import { getMatchedJobs } from "../services/job.service.js";

export const createRoadmap = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const existingRoadmap = await Roadmap.findOne({
      resume: resume._id,
    });

    if (existingRoadmap) {
      return res.status(200).json({
        success: true,
        cached: true,
        data: existingRoadmap,
      });
    }

    const analysis = await Analysis.findOne({
      resume: resume._id,
    });

    console.log(existingRoadmap);
    

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    const matchedJobs = await getMatchedJobs(analysis);

    const aiRoadmap = await generateRoadmap(analysis, matchedJobs);

    const roadmap = await Roadmap.create({
      user: resume.user,
      resume: resume._id,
      roadmap: aiRoadmap.roadmap || [],
    });

    return res.status(201).json({
      success: true,
      data: roadmap,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getRoadmap = async (req, res) => {
    try {
        const roadmap = await Roadmap.findOne({
            resume : req.params.resumeId,
            user : req.user._id
        })       

        if (!roadmap) {
            return res.status(404).json({
                success : false,
                message : "Roadmap not found"
            })
        }

        return res.status(200).json({
            success : true,
            data : roadmap
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            error : error.message
        })
    }    
};
