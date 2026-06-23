import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

import { getMyResumes } from "../services/resumeService";
import { generateCareerInsights , getCareerInsights } from "../services/careerService";

interface Resume {
_id: string;
fileName: string;
}

interface CareerInsight {
careerLevel: string;
strengths: string[];
improvementAreas: string[];
recommendedRoles: string[];
learningRecommendations: string[];
roadmap: string[];
}

const CareerInsights = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

const [resumes, setResumes] = useState<Resume[]>([]);
const [selectedResume, setSelectedResume] = useState("");

const [insight, setInsight] =
useState<CareerInsight | null>(null);

const [loading, setLoading] = useState(false);

useEffect(() => {
fetchResumes();
}, []);

useEffect(() => {
if (selectedResume) {
fetchInsight();
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

const fetchInsight = async () => {
try {
setLoading(true);
  const response =
    await getCareerInsights(selectedResume);

  setInsight(response.data);
} catch (error) {
  console.log(
    "No previous insight found. Generating..."
  );

  try {
    const response =
      await generateCareerInsights(
        selectedResume
      );

    setInsight(response.data);
  } catch (err) {
    console.log(err);
  }
} finally {
  setLoading(false);
}


};

const handleLogout = () => {
dispatch(logout());
localStorage.removeItem("token");

navigate("/");
};

return ( <DashboardLayout onLogOut={handleLogout}> <section className="bg-white p-6 border-b"> 
<h1 className="text-3xl font-bold">Career Insights </h1>

    <p className="text-gray-500 mt-2">
      AI powered career guidance based on your resume.
    </p>
  </section>

  <main className="p-6 space-y-8">
    {/* Resume Selector */}

    <section className="bg-white p-6 rounded-xl border shadow-sm">
      <select
        value={selectedResume}
        onChange={(e) =>
          setSelectedResume(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
      >
        <option value="">
          Select Resume
        </option>

        {resumes.map((resume) => (
          <option
            key={resume._id}
            value={resume._id}
          >
            {resume.fileName}
          </option>
        ))}
      </select>
    </section>

    {loading ? (
      <div className="text-center text-gray-500">
        Generating Career Insights...
      </div>
    ) : !insight ? (
      <div className="bg-white p-10 rounded-xl border text-center text-gray-500">
        Select a resume to view insights.
      </div>
    ) : (
      <>
        {/* Career Level */}

        <section className="bg-white border rounded-xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Career Level
          </h2>

          <div className="text-5xl font-bold text-violet-600">
            {insight.careerLevel}
          </div>
        </section>

        {/* Strengths + Improvements */}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-5">
              Strengths
            </h2>

            <ul className="space-y-3">
              {insight.strengths?.map(
                (item, index) => (
                  <li
                    key={index}
                    className="bg-green-50 text-green-700 p-3 rounded-lg"
                  >
                    ✓ {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-5">
              Improvement Areas
            </h2>

            <ul className="space-y-3">
              {insight.improvementAreas?.map(
                (item, index) => (
                  <li
                    key={index}
                    className="bg-red-50 text-red-700 p-3 rounded-lg"
                  >
                    ✗ {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </section>

        {/* Recommended Roles */}

        <section className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">
            Recommended Roles
          </h2>

          <div className="flex flex-wrap gap-3">
            {insight.recommendedRoles?.map(
              (role, index) => (
                <span
                  key={index}
                  className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full"
                >
                  {role}
                </span>
              )
            )}
          </div>
        </section>

        {/* Learning Recommendations */}

        <section className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">
            Learning Recommendations
          </h2>

          <div className="space-y-4">
            {insight.learningRecommendations?.map(
              (item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </section>

        {/* Career Roadmap */}

        <section className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">
            Career Roadmap
          </h2>

          <div className="space-y-4">
            {insight.roadmap?.map(
              (step, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-start"
                >
                  <div className="bg-violet-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>

                  <div className="border rounded-lg p-4 flex-1">
                    {step}
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </>
    )}
  </main>
</DashboardLayout>


);
};

export default CareerInsights
