import groq from "../ai/clients/groq.client.js";
import extractJson from "../utils/extractJson.js";
import { buildMockInterviewPrompt } from "../ai/prompts/mockInterview.prompt.js";

export const generateMockInterview = async (
  analysis,
  matchedJobs
) => {
  try {
    const prompt =
      buildMockInterviewPrompt(
        analysis,
        matchedJobs
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

        temperature: 0.4,

        response_format: {
          type: "json_object",
        },
      });

    const content =
      response.choices?.[0]
        ?.message?.content;

    if (!content) {
      throw new Error(
        "No interview questions generated"
      );
    }

    return extractJson(content);
  } catch (error) {
    console.error(
      "Mock Interview Error:",
      error.message
    );

    throw new Error(
      "Failed to generate mock interview"
    );
  }
};