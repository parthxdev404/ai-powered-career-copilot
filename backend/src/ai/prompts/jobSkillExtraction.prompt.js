export const buildJobSkillPrompt = (
  title,
  description
) => {
  return `
You are an expert technical recruiter.

Analyze the following job posting.

Title:
${title}

Description:
${description}

Return ONLY valid JSON.

{
  "skills": [],
  "technologies": []
}

Rules:

- skills should contain programming languages,
  frameworks and technical skills.

- technologies should contain tools,
  cloud services, databases and platforms.

- remove duplicates.

- return ONLY JSON.
`;
};