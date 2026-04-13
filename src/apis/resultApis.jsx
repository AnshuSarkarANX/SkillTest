import api from "./api";

export const saveResult = async (testResult) => {
  try {
    const response = await api.post("/api/results/save", testResult);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to save result");
  }
};

export const getResult = async (testResultId) => {
  try {
    const response = await api.get(`/api/results/${testResultId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch result");
  }
};

export const getHistory = async (limit = 10) => {
  try {
    const response = await api.get(`/api/results/history?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch history");
  }
};
