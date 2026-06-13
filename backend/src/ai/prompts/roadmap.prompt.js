export const buildRoadmapPrompt =
  (
    analysis,
    matchedJobs
  ) => {
    return `
You are an expert career coach.

Based on the resume analysis and job market data provided below, generate a personalized skill gap roadmap.

Resume Analysis:

Skills:
${analysis.skills.join(", ")}

Technologies:
${analysis.technologies.join(", ")}

Strengths:
${analysis.strengths.join(", ")}

Weaknesses:
${analysis.weaknesses.join(", ")}

Matched Jobs:

${matchedJobs
  .map(
    (job) => `
Title: ${job.job.title}
Skills: ${job.job.skills.join(", ")}
Technologies: ${job.job.technologies.join(", ")}
`
  )
  .join("\n")}

Identify the most important missing skills.

Return ONLY valid JSON.

{
  "roadmap": [
    {
      "skill": "Docker",
      "priority": "High",
      "reason": "Appears in most matching jobs",
      "estimatedTime": "1-2 weeks"
    }
  ]
}
`;
  };