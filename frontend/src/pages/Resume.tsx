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

  // const currentResume =
  //   myResumes.length > 0 ? myResumes[0] : null;

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

          <div className="bg-white border-4 p-6 shadow-sm">
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
              className={`border-2 border-dashed p-12 text-center transition ${
                isDragging
                  ? "border-violet-600 bg-violet-50"
                  : "border-gray-700"
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
                className="inline-block mt-6 uppercase border-violet-600 bg-white text-black border-4 px-6 py-3 cursor-pointer transition hover:shadow-[6px_6px_0px_0px_#000]"
              >
                Choose File
              </label>
            </div>

            {resumeFile && (
              <>
                <div className="mt-6 border-4 p-4">
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
                  className="w-full mt-4 bg-violet-600 text-white py-3 border-4 hover:bg-violet-700 cursor-pointer transition"
                >
                  {loading ? "Uploading..." : "Upload Resume"}
                </button>
              </>
            )}
          </div>

        </section>
        {myResumes.length > 0 && (
          <section className="bg-white border-4 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Uploaded Resumes
            </h2>

            <div className="space-y-4">
              {myResumes.map((resume) => (
                <div
                  key={resume._id}
                  className="border-2 p-4 flex justify-between items-center"
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
                      className="bg-violet-600 text-white px-4 py-2 "
                    >
                      View
                    </a>

                    <button
                      onClick={() =>
                        navigate(`/analysis/${resume._id}`)
                      }
                      className="bg-blue-600 text-white px-4 py-2 "
                    >
                      Analyze
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteResume(resume._id)
                      }
                      className="bg-red-600 text-white px-4 py-2"
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