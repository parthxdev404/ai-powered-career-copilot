export const buildResumeAnalysisPrompt = (
  resumeText
) => `
You are an expert ATS and technical recruiter.

Analyze the following resume.

Return ONLY valid JSON.

{
  "skills": [],
  "technologies": [],
  "projects": [],
  "strengths": [],
  "weaknesses": [],
  "experienceSummary": "",
  "aiSummary": "",
  "atsScore": 0
}

Rules:
- atsScore must be between 0 and 100
- Return only JSON
- No markdown
- No explanation
- No extra text

Resume:

${resumeText}
`;