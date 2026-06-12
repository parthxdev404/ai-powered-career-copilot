import Job from "../models/job.model.js";
import { fetchRemotiveJobs } from "../services/jobfetcher.service.js";
import { enrichJobWithAI } from "../services/jobEnrichment.service.js";
import { cleanJobDescription } from "../utils/cleanDescription.js";

export const syncJobs = async (req, res) => {
  try {
    const jobs = (await fetchRemotiveJobs()).slice(0, 5);

    let inserted = 0;
    let skipped = 0;

    for (const job of jobs) {
      const existingJob = await Job.findOne({
        sourceJobId: String(job.id),
      });

      if (existingJob) {
        skipped++;
        continue;
      }
      for (const job of jobs) {
        const existingJob = await Job.findOne({
          sourceJobId: String(job.id),
        });

        if (existingJob) {
          skipped++;
          continue;
        }

        const cleanDescription = cleanJobDescription(job.description || "");

        const enrichedData = await enrichJobWithAI(
          job.title || "",
          cleanDescription,
        );

        await Job.create({
          title: job.title || "Unknown",

          company: job.company_name || "Unknown",

          description: cleanDescription,

          skills: enrichedData.skills || [],

          technologies: enrichedData.technologies || [],

          location: job.candidate_required_location || "Remote",

          jobType: "Full-Time",

          source: "remotive",

          sourceJobId: String(job.id),

          jobUrl: job.url || "",
        });

        inserted++;
      }
    }
    return res.status(200).json({
      success: true,
      inserted,
      skipped,
      totalFetched: jobs.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
