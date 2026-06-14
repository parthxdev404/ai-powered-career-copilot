export const buildInterviewReportPrompt = (
  answers
) => `
You are an expert technical interviewer and hiring manager.

Analyze the candidate's entire mock interview performance.

Interview Answers:

${JSON.stringify(answers, null, 2)}

IMPORTANT:

Evaluate the candidate based on:

1. Technical knowledge
2. Communication clarity
3. Confidence and completeness
4. Problem-solving ability
5. Overall interview readiness

Return ONLY valid JSON.

JSON FORMAT:

{
  "overallScore": 0,

  "technicalScore": 0,

  "communicationScore": 0,

  "confidenceScore": 0,

  "strengthAreas": [],

  "weakAreas": [],

  "recommendation": "",

  "summary": ""
}

RULES:

- Scores must be between 0 and 100
- recommendation must be one of:
  - "Not Ready"
  - "Needs Improvement"
  - "Interview Ready"
  - "Strong Candidate"

- strengthAreas should contain key strengths
- weakAreas should contain key improvement areas
- summary should be concise and actionable

Return ONLY JSON.
No markdown.
No explanation.
`;