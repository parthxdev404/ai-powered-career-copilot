export const calculateResumeScore = (aiResult) => {
  const skills = aiResult.skills || [];
  const projects = aiResult.projects || [];
  const summary =
    aiResult.experienceSummary || "";

  let atsScore = 0;

  // Skills (40 points)

  if (skills.length >= 12)
    atsScore += 40;
  else if (skills.length >= 8)
    atsScore += 35;
  else if (skills.length >= 5)
    atsScore += 25;
  else if (skills.length >= 3)
    atsScore += 15;
  else atsScore += 5;

  // Projects (30 points)

  if (projects.length >= 4)
    atsScore += 30;
  else if (projects.length >= 3)
    atsScore += 25;
  else if (projects.length >= 2)
    atsScore += 20;
  else if (projects.length >= 1)
    atsScore += 10;
  else atsScore += 0;

  // Experience / Summary (30 points)

  if (summary.length >= 300)
    atsScore += 30;
  else if (summary.length >= 150)
    atsScore += 25;
  else if (summary.length >= 75)
    atsScore += 15;
  else atsScore += 5;

  atsScore = Math.min(atsScore, 100);

  return {
    atsScore,

    sectionScores: [
      {
        name: "Skills",
        score: Math.min(
          100,
          skills.length * 8
        ),
      },

      {
        name: "Projects",
        score: Math.min(
          100,
          projects.length * 25
        ),
      },

      {
        name: "Experience",
        score:
          summary.length >= 300
            ? 95
            : summary.length >= 150
            ? 80
            : summary.length >= 75
            ? 65
            : 40,
      },

      {
        name: "Resume Quality",
        score: atsScore,
      },
    ],
  };
};