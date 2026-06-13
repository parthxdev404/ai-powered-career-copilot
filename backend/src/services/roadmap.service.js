import groq from "../ai/clients/groq.client.js";
import extractJson from "../utils/extractJson.js";
import { buildRoadmapPrompt } from "../ai/prompts/roadmap.prompt.js";


export const generateRoadmap =
  async (
    analysis,
    matchedJobs
  ) => {
    try {
      const prompt =
        buildRoadmapPrompt(
          analysis,
          matchedJobs
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
          "No roadmap generated"
        );
      }

      return extractJson(
        content
      );
    } catch (error) {
      console.error(
        "Roadmap Generation Error:",
        error.message
      );

      throw new Error(
        "Failed to generate roadmap"
      );
    }
  };