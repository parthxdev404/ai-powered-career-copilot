import groq from "../ai/clients/groq.client.js";
import extractJson from "../utils/extractJson.js";

import {buildInterviewReportPrompt} from "../ai/prompts/interviewReport.prompt.js"

export const generateInterviewReport =
  async (answers) => {
    try {
      const prompt =
        buildInterviewReportPrompt(
          answers
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
          "No report generated"
        );
      }

      return extractJson(content);
    } catch (error) {
      console.error(
        "Interview Report Error:",
        error.message
      );

      throw new Error(
        "Failed to generate interview report"
      );
    }
  };