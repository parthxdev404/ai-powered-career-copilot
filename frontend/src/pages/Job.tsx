import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

import { getMyResumes } from "../services/resumeService";
import { getMatchedJobs, syncJobs } from "../services/jobService";

interface Resume {
  _id: string;
  fileName: string;
}

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];

  description?: string;
  technologies?: string[];
  jobType?: string;
  source?: string;
  jobUrl?: string;
}

const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState("");

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  useEffect(() => {
    if (selectedResume) {
      fetchMatchedJobs();
    }
  }, [selectedResume]);

  const fetchResumes = async () => {
    try {
      const response = await getMyResumes();

      setResumes(response.resumes || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMatchedJobs = async () => {
    try {
      setLoading(true);

      const response = await getMatchedJobs(selectedResume);

      setJobs(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncJobs = async () => {
    try {
      await syncJobs();

      alert("Jobs synced successfully");

      if (selectedResume) {
        fetchMatchedJobs();
      }
    } catch (error) {
      console.log(error);
      alert("Failed to sync jobs");
    }
  };

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <DashboardLayout onLogOut={handleLogout}>
      <section className="bg-white p-6 border-b-4">
        <h1 className="text-3xl font-bold">Job Matching</h1>

        <p className="text-gray-500 mt-2">Find jobs that match your resume.</p>
      </section>

      <main className="p-6 space-y-8">
        <section className="bg-white p-6 border-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={selectedResume}
              onChange={(e) => setSelectedResume(e.target.value)}
              className="border-2 p-3 flex-1"
            >
              <option value="">Select Resume</option>

              {resumes.map((resume) => (
                <option key={resume._id} value={resume._id}>
                  {resume.fileName}
                </option>
              ))}
            </select>

            <button
              onClick={handleSyncJobs}
              className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700"
            >
              Sync Jobs
            </button>
          </div>
        </section>

        {loading ? (
          <div className="text-center text-gray-500">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border text-center text-gray-500">
            No matched jobs found.
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border-4 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold">{job.title}</h2>

                      <p className="text-gray-600">{job.company}</p>

                      <p className="text-sm text-gray-500">{job.location}</p>
                    </div>

                    <div className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-semibold text-sm">
                      {job.matchScore}% Match
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Matched Skills</h3>

                    <div className="flex flex-wrap gap-2">
                      {job.matchedSkills?.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Missing Skills</h3>

                    <div className="flex flex-wrap gap-2">
                      {job.missingSkills?.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </DashboardLayout>
  );
};

export default Jobs;
