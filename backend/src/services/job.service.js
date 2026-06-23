import Job from "../models/job.model.js";
export const calculateMatchScore = (
  analysis,
  job
) => {
  const resumeSkills = [
    ...(analysis.skills || []),
    ...(analysis.technologies || []),
  ].map((skill) =>
    skill.toLowerCase()
  );

  const jobSkills = [
    ...(job.skills || []),
    ...(job.technologies || []),
  ].map((skill) =>
    skill.toLowerCase()
  );

  const matchedSkills =
    jobSkills.filter((skill) =>
      resumeSkills.includes(skill)
    );

  const missingSkills =
    jobSkills.filter(
      (skill) =>
        !resumeSkills.includes(skill)
    );

  const score = Math.round(
    (matchedSkills.length /
      Math.max(jobSkills.length, 1)) *
      100
  );

  return {
    score,
    matchedSkills,
    missingSkills,
  };
};

const MIN_MATCH_SCORE = 20;

export const getMatchedJobs = async (
  analysis
) => {
  const jobs = await Job.find({
    isActive: true,
  });

  const matches = jobs.map((job) => {
    const result =
      calculateMatchScore(
        analysis,
        job
      );

    return {
      ...job.toObject(),

      matchScore: result.score,

      matchedSkills:
        result.matchedSkills,

      missingSkills:
        result.missingSkills,
    };
  });

  const filteredMatches =
    matches.filter(
      (match) =>
        match.matchScore >=
        MIN_MATCH_SCORE
    );

  return filteredMatches
    .sort(
      (a, b) =>
        b.matchScore -
        a.matchScore
    )
    .slice(0, 10);
};