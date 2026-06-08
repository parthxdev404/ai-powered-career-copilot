export const buildResumeAnalysisPrompt = (
  resumeText
) => `
Analyze the following resume.

Return ONLY valid JSON.

{
  "skills": [],
  "technologies": [],
  "projects": [],
  "strengths": [],
  "weaknesses": [],
  "experienceSummary": ""
}

Resume:
${resumeText}
`;