import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  analyzeResume,
  getAnalysis,
} from "../services/analysisService";

const Analysis = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resumeId } = useParams();

  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!resumeId) return;

    fetchAnalysis();
  }, [resumeId]);

  const fetchAnalysis = async () => {
    try {
      setLoading(true);

      const response = await getAnalysis(resumeId!);

      console.log("GET ANALYSIS:", response);

      if (response.success) {
        setAnalysis(response.data);
      }
    } catch (error) {
      console.log(
        "No previous analysis found. Generating new one..."
      );

      try {
        const response = await analyzeResume(resumeId!);

        console.log("NEW ANALYSIS:", response);

        if (response.success) {
          setAnalysis(response.data);
        }
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

  if (loading) {
    return (
      <DashboardLayout onLogOut={handleLogout}>
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-3xl font-semibold">
            Analyzing Resume...
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  if (!analysis) {
    return (
      <DashboardLayout onLogOut={handleLogout}>
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-3xl font-semibold text-red-500">
            Failed To Load Analysis
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout onLogOut={handleLogout}>
      {/* Header */}

      <section className="bg-white p-6 border-b-4">
        <h1 className="text-3xl font-bold">
          Resume Analysis
        </h1>

        <p className="text-gray-500 mt-2">
          Detailed AI-Powered Insights About Your Resume
        </p>
      </section>

      <main className="p-6 space-y-8">
        <section className="bg-white  border-4 p-8 shadow-sm text-center">
          <h2 className="text-2xl font-semibold">
            ATS Score
          </h2>

          <div className="mt-6">
            <h1 className="text-7xl font-bold text-violet-600">
              {analysis?.atsScore || 0}
            </h1>

            <p className="text-gray-500 mt-2">
              out of 100
            </p>
          </div>
        </section>
        <section className="grid md:grid-cols-2 gap-6">

          <div className="bg-white border-4 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-5">
              Strengths
            </h2>

            <ul className="space-y-3">
              {analysis?.strengths?.map(
                (item: string, index: number) => (
                  <li
                    key={index}
                    className="bg-green-50 text-green-700 p-3 rounded-lg"
                  >
                   {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="bg-white border-4 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-5">
              Weaknesses
            </h2>

            <ul className="space-y-3">
              {analysis?.weaknesses?.map(
                (item: string, index: number) => (
                  <li
                    key={index}
                    className="bg-red-50 text-red-700 p-3 rounded-lg"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </section>

        {/* Missing Keywords */}

        <section className="bg-white border-4 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">
            Missing Keywords
          </h2>

          <div className="flex flex-wrap gap-3">
            {analysis?.missingKeywords?.map(
              (keyword: string, index: number) => (
                <span
                  key={index}
                  className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full"
                >
                  {keyword}
                </span>
              )
            )}
          </div>
        </section>

        {/* Section Scores */}

        <section className="bg-white border-4 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">
            Section Scores
          </h2>

          <div className="space-y-6">
            {analysis?.sectionScores?.map(
              (section: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span>{section.name}</span>

                    <span>{section.score}%</span>
                  </div>

                  <div className="w-full h-4 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-violet-600 rounded-full"
                      style={{
                        width: `${section.score}%`,
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* Suggestions */}

        <section className="bg-white border-4 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">
            Improvement Suggestions
          </h2>

          <div className="space-y-4">
            {analysis?.suggestions?.map(
              (suggestion: string, index: number) => (
                <div
                  key={index}
                  className="border-2 p-4"
                >
                  <span className="font-semibold">
                    {index + 1}.
                  </span>{" "}
                  {suggestion}
                </div>
              )
            )}
          </div>
        </section>

      </main>
    </DashboardLayout>
  );
};

export default Analysis;