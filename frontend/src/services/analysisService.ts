import api from "./api";

export const getAnalysis = async (
  resumeId: string
) => {
  const response = await api.get(
    `/analysis/analyze/${resumeId}`
  );

  return response.data;
};

export const analyzeResume = async (
  resumeId: string
) => {
  const response = await api.post(
    `/analysis/analyze/${resumeId}`
  );

  return response.data;
};