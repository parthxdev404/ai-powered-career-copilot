import groq from "../ai/clients/groq.client.js";
import extractJson from "../utils/extractJson.js";

import {
  buildResumeAnalysisPrompt,
} from "../ai/prompts/resumeAnalysis.prompt.js";

export const analyzeResumeWithAI = async (
  resumeText
) => {
  try {
    const prompt =
      buildResumeAnalysisPrompt(resumeText);

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content:
              "You are an ATS Resume Analyzer.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.2,

        response_format: {
          type: "json_object",
        },
      });

    const content =
      completion.choices[0].message.content;

    return extractJson(content);
  } catch (error) {
    console.error(
      "Groq Analysis Error:",
      error
    );

    throw new Error(
      "Failed to analyze resume"
    );
  }
};