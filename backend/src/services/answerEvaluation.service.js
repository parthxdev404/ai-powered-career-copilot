import groq from "../ai/clients/groq.client.js";
import extractJson from "../utils/extractJson.js";
import { buildAnswerEvaluationPrompt } from "../ai/prompts/answerEvaluation.prompt.js";

export const evaluateAnswer = async (
  question,
  answer
) => {
  try {
    const prompt =
      buildAnswerEvaluationPrompt(
        question,
        answer
      );

    const response =
      await groq.chat.completions.create({
        model:
          "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.3,

        response_format: {
          type: "json_object",
        },
      });

    const content =
      response.choices?.[0]
        ?.message?.content;

    if (!content) {
      throw new Error(
        "No evaluation generated"
      );
    }

    return extractJson(content);
  } catch (error) {
    console.error(
      "Answer Evaluation Error:",
      error.message
    );

    throw new Error(
      "Failed to evaluate answer"
    );
  }
};