import hf from "../ai/clients/hugginface.client.js";
import extractJson from "../utils/extractJson.js";

import { buildResumeAnalysisPrompt } from "../ai/prompts/resumeAnalysis.prompt.js";

export const analyzeResumeWithAI = async (
  resumeText
) => {
  try {
    const prompt =
      buildResumeAnalysisPrompt(resumeText);

    const response = await hf.textGeneration({
      model:
        "mistralai/Mistral-7B-Instruct-v0.2",

      inputs: prompt,

      parameters: {
        max_new_tokens: 700,
        temperature: 0.2,
        return_full_text: false,
      },
    });

    if (!response?.generated_text) {
      throw new Error(
        "No response received from AI"
      );
    }

    const parsedResponse = extractJson(
      response.generated_text
    );

    return parsedResponse;
  } catch (error) {
    console.error(
      "AI Analysis Error:",
      error.message
    );

    throw new Error(
      "Failed to analyze resume"
    );
  }
};