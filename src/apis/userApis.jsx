import api from "./api";

export const getProfile = async (email) => {
  try {
    const response = await api.post(`/api/user/profile`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to get User profile");
  }
};
export const createProfile = async (profile) => {
    const email = localStorage.getItem("email");
  try {
    const response = await api.post(`/api/user/add`, {
      email,
      ...profile,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create User profile");
  }
};