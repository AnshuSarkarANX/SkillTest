import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getProfile = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/api/user/profile`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to get User profile");
  }
};
export const createProfile = async (profile) => {
    const email = localStorage.getItem("email");
  try {
    const response = await axios.post(`${API_URL}/api/user/add`, {
      email,
      ...profile,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create User profile");
  }
};