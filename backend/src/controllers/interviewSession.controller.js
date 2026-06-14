import InterviewSession from "../models/interviewSession.model.js";
import Resume from "../models/resume.model.js";
import Analysis from "../models/analysis.model.js";

import { getMatchedJobs } from "../services/job.service.js";
import { generateMockInterview } from "../services/mockInterview.service.js";
import { evaluateAnswer } from "../services/answerEvaluation.service.js";

export const createInterviewSession = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const existingSession = await InterviewSession.findOne({
      resume: resume._id,
    });

    if (existingSession) {
      return res.status(200).json({
        success: true,
        cached: true,
        data: existingSession,
      });
    }

    const analysis = await Analysis.findOne({
      resume: resume._id,
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    const matchedJobs = await getMatchedJobs(analysis);

    const aiResult = await generateMockInterview(analysis, matchedJobs);

    const session = await InterviewSession.create({
      user: resume.user,

      resume: resume._id,

      jobTitle: aiResult.jobTitle || "",

      technicalQuestions: aiResult.technicalQuestions || [],

      behavioralQuestions: aiResult.behavioralQuestions || [],
    });

    return res.status(201).json({
      success: true,
      data: session,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInterviewSession = async (req, res) => {
  try {
    const session = await InterviewSession.findOne({
      resume: req.params.resumeId,

      user: req.user._id,
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { question, answer } = req.body;

    const session = await InterviewSession.findOne({
      _id: sessionId,
      user: req.user._id,
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found",
      });
    }

    const evaluation = await evaluateAnswer(question, answer);
    const alreadyAnswered = session.answers.find(
      (item) => item.question === question,
    );

    if (alreadyAnswered) {
      return res.status(400).json({
        success: false,
        message: "Question already answered",
      });
    }

    session.answers.push({
      question,

      userAnswer: answer,

      score: evaluation.score || 0,

      strengths: evaluation.strengths || [],

      weaknesses: evaluation.weaknesses || [],

      improvedAnswer: evaluation.improvedAnswer || "",

      feedback: evaluation.feedback || "",
    });

    await session.save();

    return res.status(200).json({
      success: true,
      progress: {
        answered: session.answers.length,
        total:
          session.technicalQuestions.length +
          session.behavioralQuestions.length,
      },
      data: evaluation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
