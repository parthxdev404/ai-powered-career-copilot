import groq from "../ai/clients/groq.client.js";

import extractJson from "../utils/extractJson.js";

import { buildCareerInsightPrompt } from "../ai/prompts/careerInsight.prompt.js";

export const generateCareerInsights =
  async (analysis) => {
    try {
      const prompt =
        buildCareerInsightPrompt(
          analysis
        );

      const response =
        await groq.chat.completions.create(
          {
            model:
              "llama-3.3-70b-versatile",

            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],

            temperature: 0.2,
          }
        );

      const content =
        response.choices[0].message
          .content;

      const parsedResponse =
        extractJson(content);

      return parsedResponse;
    } catch (error) {
      console.error(
        "Career Insight Error:",
        error.message
      );

      throw new Error(
        "Failed to generate career insights"
      );
    }
  };