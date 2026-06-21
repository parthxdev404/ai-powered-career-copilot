import DashboardLayout from "../layouts/DashboardLayout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import React, { useEffect, useState } from "react";

import {
  uploadResume,
  getMyResumes,
  deleteResume,
} from "../services/resumeService";

interface ResumeData {
  _id: string;
  fileName: string;
  fileUrl: string;
  size: number;
}

const Resume = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [myResumes, setMyResumes] = useState<ResumeData[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await getMyResumes();

      setMyResumes(response.resumes || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    if (!resumeFile) return;

    try {
      setLoading(true);

      await uploadResume(resumeFile);

      alert("Resume uploaded successfully");

      setResumeFile(null);

      fetchResumes();
    } catch (error) {
      console.log(error);

      alert("Failed to upload resume");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload only PDF or DOCX files");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size should not exceed 5 MB");
      return;
    }

    setResumeFile(file);
  };

  const handleDeleteResume = async (id: string) => {
    try {
      await deleteResume(id);

      fetchResumes();

      alert("Resume deleted successfully");
    } catch (error) {
      console.log(error);

      alert("Failed to delete resume");
    }
  };

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("token");

    navigate("/");
  };

  const currentResume =
    myResumes.length > 0 ? myResumes[0] : null;

  return (
    <DashboardLayout onLogOut={handleLogout}>
      <section className="bg-white p-6 border-b">
        <h1 className="text-3xl font-bold">
          Resume Management
        </h1>

        <p className="text-gray-500 mt-2">
          Upload, manage and analyze your resumes.
        </p>
      </section>

      <main className="p-6 space-y-8">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Card */}

          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Upload Resume
            </h2>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();

                setIsDragging(false);

                const file = e.dataTransfer.files[0];

                if (file) {
                  const fakeEvent = {
                    target: { files: [file] },
                  } as unknown as React.ChangeEvent<HTMLInputElement>;

                  handleFileChange(fakeEvent);
                }
              }}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition ${
                isDragging
                  ? "border-violet-600 bg-violet-50"
                  : "border-gray-300"
              }`}
            >
              <h3 className="text-lg font-medium">
                Drag & Drop Resume
              </h3>

              <p className="text-gray-500 mt-2">
                PDF or DOCX up to 5 MB
              </p>

              <input
                type="file"
                id="resumeUpload"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />

              <label
                htmlFor="resumeUpload"
                className="inline-block mt-6 bg-violet-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-violet-700 transition"
              >
                Choose File
              </label>
            </div>

            {resumeFile && (
              <>
                <div className="mt-6 border rounded-lg p-4">
                  <h3 className="font-semibold text-lg">
                    Selected File
                  </h3>

                  <p className="mt-2 text-gray-700">
                    {resumeFile.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                >
                  {loading ? "Uploading..." : "Upload Resume"}
                </button>
              </>
            )}
          </div>

          {/* Current Resume */}

          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Current Resume
            </h2>

            <div className="border rounded-lg p-5">
              <h3 className="text-xl font-semibold">
                {currentResume
                  ? currentResume.fileName
                  : "No Resume Uploaded"}
              </h3>

              <p className="text-gray-500 mt-2">
                {currentResume
                  ? `Size: ${(currentResume.size / 1024 / 1024).toFixed(
                      2
                    )} MB`
                  : "Upload a resume to continue"}
              </p>

              <div className="flex gap-4 mt-6 flex-wrap">
                <a
                  href={currentResume?.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-4 py-2 rounded-lg text-white ${
                    currentResume
                      ? "bg-violet-600"
                      : "bg-gray-300 pointer-events-none"
                  }`}
                >
                  Preview
                </a>

                <label
                  htmlFor="resumeUpload"
                  className="px-4 py-2 rounded-lg text-white cursor-pointer bg-gray-700"
                >
                  Replace
                </label>

                <button
                  onClick={() =>
                    currentResume &&
                    handleDeleteResume(currentResume._id)
                  }
                  disabled={!currentResume}
                  className={`px-4 py-2 rounded-lg text-white ${
                    currentResume
                      ? "bg-red-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Preview */}

        <section className="bg-white border rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">
            Resume Preview
          </h2>

          <div className="h-[700px] border rounded-lg overflow-hidden">
            {currentResume ? (
              <iframe
                src={currentResume.fileUrl}
                title="Resume Preview"
                className="w-full h-full"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                No Resume Uploaded
              </div>
            )}
          </div>
        </section>

        {/* Uploaded Resumes */}

        {myResumes.length > 0 && (
          <section className="bg-white border rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Uploaded Resumes
            </h2>

            <div className="space-y-4">
              {myResumes.map((resume) => (
                <div
                  key={resume._id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">
                      {resume.fileName}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {(resume.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={resume.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-violet-600 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </a>

                    <button
                      onClick={() =>
                        navigate(`/analysis/${resume._id}`)
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Analyze
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteResume(resume._id)
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </DashboardLayout>
  );
};

export default Resume;

