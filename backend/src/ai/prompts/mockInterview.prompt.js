export const buildMockInterviewPrompt = (
  analysis,
  matchedJobs
) => `
You are an expert technical interviewer and hiring manager.

Generate a realistic mock interview based on the candidate's profile.

Candidate Skills:
${analysis.skills.join(", ")}

Technologies:
${analysis.technologies.join(", ")}

Projects:
${analysis.projects.join(", ")}

Experience Summary:
${analysis.experienceSummary}

Matched Jobs:
${matchedJobs
  .slice(0, 5)
  .map(
    (job) => `
Job Title: ${job.job.title}
Company: ${job.job.company}
Matched Skills: ${job.matchedSkills.join(", ")}
`
  )
  .join("\n")}

RULES:

1. Questions must be personalized to the candidate.
2. Focus on technologies appearing in matched jobs.
3. Include practical and real-world questions.
4. Include behavioral questions.
5. Do not ask generic questions only.
6. Return ONLY valid JSON.

JSON FORMAT:

{
  "jobTitle": "",
  "technicalQuestions": [
    {
      "question": ""
    }
  ],
  "behavioralQuestions": [
    {
      "question": ""
    }
  ]
}

Generate:

- 10 technical questions
- 5 behavioral questions

Return ONLY JSON.
No markdown.
No explanation.
`;