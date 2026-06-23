import api from "./api";

export const generateCareerInsights = async (
  resumeId: string
) => {
  const response = await api.post(
    `/career/generate/${resumeId}`
  );

  return response.data;
};

export const getCareerInsights = async (
  resumeId: string
) => {
  const response = await api.get(
    `/career/${resumeId}`
  );

  return response.data;
};