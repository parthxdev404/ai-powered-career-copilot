import api from "./api";

export const getJobs = async () => {
  const response = await api.get("/job");
  return response.data;
};

export const getSingleJob = async (
  jobId: string
) => {
  const response = await api.get(
    `/job/${jobId}`
  );

  return response.data;
};

export const getMatchedJobs = async (
  resumeId: string
) => {
  const response = await api.get(
    `/job/match/${resumeId}`
  );

  return response.data;
};

export const syncJobs = async () => {
  const response = await api.post(
    "/job/sync"
  );

  return response.data;
};