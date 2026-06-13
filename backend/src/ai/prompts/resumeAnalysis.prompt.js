export const buildResumeAnalysisPrompt = (
  resumeText
) => `
You are an expert ATS and technical recruiter.

Analyze the following resume.

Return ONLY valid JSON.

ATS SCORING RULES

1. Education is optional.

2. Do NOT reduce the ATS score because an education section is missing.

3. A resume without education can still receive a very high ATS score if it demonstrates strong:
   - technical skills
   - projects
   - technologies
   - experience
   - achievements
   - keyword relevance

4. If education exists, treat it as a small positive signal.

5. If education does not exist, simply ignore it.

6. Focus scoring primarily on:
   - skills
   - projects
   - technologies
   - experience
   - resume structure
   - keyword optimization

7. Never list missing education as a weakness.

8. Missing education must not reduce the ATS score.

9. Strong technical projects, open-source contributions, freelance work, internships, certifications, and practical experience can compensate for the absence of formal education.

10. Prioritize demonstrable skills and project quality over academic qualifications.

IMPORTANT:

projects must be an array of project names only.

Correct:
[
  "Generative AI GitHub Bot",
  "Azure Cloud Solution"
]

Incorrect:
[
  {
    "name": "Generative AI",
    "description": "..."
  }
]

Do not return project descriptions.
Do not return project links.
Do not return project objects.

{
  "skills": [],
  "technologies": [],
  "projects": [
    "Project Name 1",
    "Project Name 2"
  ],
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