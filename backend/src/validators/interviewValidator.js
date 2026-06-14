import Joi from "joi";

export const submitAnswerSchema =
  Joi.object({
    question: Joi.string()
      .required(),

    answer: Joi.string()
      .min(5)
      .required(),
  });

export const generateReportSchema =
  Joi.object({});

  export const resumeIdSchema =
  Joi.object({
    resumeId: Joi.string()
      .required(),
  });