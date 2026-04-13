// apis/userKeyApis.js
import api from "./api";

export const getUserApiKey = async () => {
  try {
    const res = await api.get("/api/user-key/get-api-key");
    // res.data = { success: true, key: "<something>" }
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch API key");
  }
};

export const setUserApiKey = async (apiKey) => {
  try {
    const res = await api.post("/api/user-key/set-api-key", { apiKey });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to save API key");
  }
};

export const removeUserApiKey = async () => {
  try {
    const res = await api.delete("/api/user-key/remove-api-key");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to remove API key");
  }
};
