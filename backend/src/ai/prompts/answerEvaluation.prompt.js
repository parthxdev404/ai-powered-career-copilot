export const buildAnswerEvaluationPrompt = (
  question,
  answer
) => `
You are an expert technical interviewer, hiring manager, and communication coach.

Evaluate the candidate's answer.

Question:

${question}

Candidate Answer:

${answer}

SCORING RULES:

1. Score between 0 and 100.

2. Evaluate:
   - technical correctness
   - clarity
   - completeness
   - communication quality

3. Be constructive.

4. Identify strengths.

5. Identify weaknesses.

6. Generate an improved answer that demonstrates how a strong candidate would answer.

7. Give practical feedback for improvement.

Return ONLY valid JSON.

JSON FORMAT:

{
  "score": 0,

  "strengths": [],

  "weaknesses": [],

  "improvedAnswer": "",

  "feedback": ""
}

RULES:

- score must be between 0 and 100
- strengths must be concise
- weaknesses must be actionable
- improvedAnswer should be interview-ready
- feedback should explain how to improve future answers

Return ONLY JSON.
No markdown.
No explanation.
`;