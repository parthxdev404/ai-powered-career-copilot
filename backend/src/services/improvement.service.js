import groq from "../ai/clients/groq.client.js";
import extractJson from "../utils/extractJson.js";
import { buildImprovementPrompt } from "../ai/prompts/improvement.prompt.js";

export const generateImprovements =
  async (analysis) => {
    try {
      const prompt =
        buildImprovementPrompt(
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
                content:
                  prompt,
              },
            ],

            temperature: 0.2,

            response_format:
              {
                type:
                  "json_object",
              },
          }
        );

      const content =
        response.choices?.[0]
          ?.message
          ?.content;

      if (!content) {
        throw new Error(
          "No improvements generated"
        );
      }

      return extractJson(
        content
      );
    } catch (error) {
      console.error(
        "Improvement Generation Error:",
        error.message
      );

      throw new Error(
        "Failed to generate improvements"
      );
    }
  };