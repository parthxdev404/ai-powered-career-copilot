export const buildCareerInsightPrompt = (
  analysis
) => {
  return `
You are an expert AI Career Coach.

Analyze the following candidate profile and return ONLY valid JSON.

Candidate Analysis:

${JSON.stringify(analysis, null, 2)}

Return JSON in this exact format:

{
  "careerLevel": "",
  "strongAreas": [],
  "improvementAreas": [],
  "recommendedRoles": [],
  "learningRecommendations": [],
  "roadmap": [],
  "summary": ""
}

Rules:

- careerLevel must be one of:
  Beginner
  Intermediate
  Advanced

- strongAreas should contain strengths.

- improvementAreas should contain skills
  or areas the candidate should improve.

- recommendedRoles should contain
  suitable job roles.

- learningRecommendations should contain
  technologies or concepts to learn next.

- roadmap should contain step-by-step
  career growth actions.

- summary should be a concise
  professional career evaluation.

Return ONLY JSON.
`;
};