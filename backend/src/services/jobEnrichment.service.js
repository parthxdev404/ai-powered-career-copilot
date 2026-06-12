import groq from "../ai/clients/groq.client.js";

import extractJson from "../utils/extractJson.js";

import { buildJobSkillPrompt } from "../ai/prompts/jobSkillExtraction.prompt.js";

export const enrichJobWithAI = async (title, description) => {
  try {

    const prompt = buildJobSkillPrompt(title, description);

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.1,
    });

    const content = response.choices[0].message.content;

    const parsedResponse = extractJson(content);

    return {
      skills: parsedResponse.skills || [],

      technologies: parsedResponse.technologies || [],
    };
  } catch (error) {
    console.error("Job Enrichment Error:", error.message);

    return {
      skills: [],
      technologies: [],
    };
  }
};
