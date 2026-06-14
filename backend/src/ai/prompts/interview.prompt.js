export const buildInterviewPrepPrompt = (
  analysis,
  matchedJobs
) => `
You are an expert technical interviewer, hiring manager, recruiter, and career coach.

Your task is to generate a personalized interview preparation plan.

Candidate Resume Analysis:

Skills:
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
    (job) =>
      `
Job Title: ${job.job.title}
Company: ${job.job.company}
Required Skills: ${job.matchedSkills.join(", ")}
`
  )
  .join("\n")}

IMPORTANT RULES:

1. Generate preparation content specifically for the candidate's skills and matched jobs.

2. Focus on the most frequently appearing technologies and skills.

3. Include both technical and behavioral questions.

4. Questions should be realistic and commonly asked in interviews.

5. Preparation tips should be practical and actionable.

6. Return ONLY valid JSON.

JSON FORMAT:

{
  "jobTitle": "",
  "topics": [],
  "technicalQuestions": [
    {
      "question": ""
    }
  ],
  "behavioralQuestions": [
    {
      "question": ""
    }
  ],
  "preparationTips": []
}

Return ONLY JSON.
No markdown.
No explanation.
`;