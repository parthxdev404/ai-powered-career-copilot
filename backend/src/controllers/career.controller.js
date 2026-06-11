import Analysis from "../models/analysis.model.js";
import CareerInsight from "../models/career.model.js";
import Resume from "../models/resume.model.js";

import {generateCareerInsights} from "../services/career.service.js";

export const generateInsight = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume Not Found",
      });
    }

    const analysis = await Analysis.findOne({
      resume: resumeId,
      user: req.user._id,
    });

    if (!analysis) {
        return res.status(404).json({
            success : false,
            message : "Resume Analysis not found"
        })
    }

    const existingInsight = await CareerInsight.findOne({
        resume : resumeId,
        user : req.user._id
    })

    if(existingInsight){
        return res.status(200).json({
            success : true,
            cached : true,
            data : existingInsight
        })
    }

    const aiResult = await generateCareerInsights(analysis);

    const insight = await CareerInsight.create({
        user : req.user._id,
        resume : resume._id,
        analysis : analysis._id,
        careerLevel : aiResult.careerLevel || "",
        strongAreas : aiResult.strongAreas || "",
        improvementAreas : aiResult.improvementAreas || "",
        recommendedRoles : aiResult.recommendedRoles || "",
        learningRecommendations : aiResult.learningRecommendations || "",
        roadmap : aiResult.roadmap || "",
        summary : aiResult.summary || "",
        
    });

    return res.status(201).json({
        success : true,
        cached : false,
        data : insight
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInsight =
  async (req, res) => {
    try {
      const insight =
        await CareerInsight.findOne(
          {
            resume:
              req.params
                .resumeId,
            user:
              req.user._id,
          }
        );

      if (!insight) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Career insight not found",
          });
      }

      return res
        .status(200)
        .json({
          success: true,
          data: insight,
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message:
            error.message,
        });
    }
  };