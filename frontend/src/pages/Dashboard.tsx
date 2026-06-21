import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/authSlice";

import Sidebar from "../layouts/Sidebad";
import DashboardLayout from "../layouts/DashboardLayout";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <DashboardLayout onLogOut={handleLogout}>
      <div className="flex min-h-screen">

        <div className="flex-1 flex flex-col bg-gray-50">
          <section className="bg-white p-6 border-b-4">
            <h1 className="text-3xl font-bold">
              Welcome Back,
              <span className="text-violet-700"> {user?.name} 👋</span>
            </h1>

            <p className="text-gray-500 mt-2">
              Track your resume performance, discover jobs, and accelerate your
              career growth.
            </p>
          </section>

          <main className="p-6 space-y-8">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border-4 p-6 text-center">
                <h2 className="text-gray-700">ATS Score</h2>
                <p className="text-5xl font-bold mt-3 text-violet-600">75</p>
              </div>

              <div className="bg-white border-4 p-6 text-center">
                <h2 className="text-gray-700">Job Matches</h2>
                <p className="text-5xl font-bold mt-3 text-violet-600">24</p>
              </div>

              <div className="bg-white border-4 p-6 text-center">
                <h2 className="text-gray-700">Skill Gaps</h2>
                <p className="text-5xl font-bold mt-3 text-violet-600">5</p>
              </div>

              <div className="bg-white border-4 p-6 text-center">
                <h2 className="text-gray-700">Interviews</h2>
                <p className="text-5xl font-bold mt-3 text-violet-600">12</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="bg-white border-4 p-6 hover:border-violet-500 transition cursor-pointer">
                  <h3 className="font-semibold text-lg">Upload Resume</h3>

                  <p className="text-gray-500 mt-2">Upload a new resume.</p>
                </button>

                <button className="bg-white border-4 p-6 hover:border-violet-500 transition cursor-pointer">
                  <h3 className="font-semibold text-lg">Analyze Resume</h3>

                  <p className="text-gray-500 mt-2">Generate ATS insights.</p>
                </button>

                <button className="bg-white border-4 p-6 hover:border-violet-500 transition cursor-pointer">
                  <h3 className="font-semibold text-lg">Find Jobs</h3>

                  <p className="text-gray-500 mt-2">Discover matching jobs.</p>
                </button>

                <button className="bg-white border-4 p-6 hover:border-violet-500 transition cursor-pointer">
                  <h3 className="font-semibold text-lg">Practice Interviews</h3>

                  <p className="text-gray-500 mt-2">
                    Start AI mock interviews.
                  </p>
                </button>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border-4 p-6">
                <h2 className="text-2xl font-semibold mb-6">Resume Analysis</h2>

                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Strengths</h3>

                  <ul className="space-y-2 text-gray-600">
                    <li>Strong React Skills</li>
                    <li>Good Project Experience</li>
                    <li>ATS Friendly Formatting</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Improvements</h3>

                  <ul className="space-y-2 text-gray-600">
                    <li>• Add More Metrics</li>
                    <li>• Improve Resume Keywords</li>
                    <li>• Add Certifications</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white border-4 p-6">
                <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>

                <ul className="space-y-4 text-gray-600">
                  <li className="border-b pb-3">
                    Resume analyzed successfully.
                  </li>

                  <li className="border-b pb-3">ATS score updated to 75.</li>

                  <li className="border-b pb-3">Career insights generated.</li>

                  <li>Interview session completed.</li>
                </ul>
              </div>
            </section>

            <section className="bg-white border-4 shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Profile Completion
              </h2>

              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-[70%] bg-violet-600 rounded-full" />
              </div>

              <p className="mt-4 text-gray-500">
                Your profile is 70% complete. Upload your latest resume to
                unlock all features.
              </p>
            </section>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
