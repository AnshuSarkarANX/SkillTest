import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const requestOTP = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/request-otp`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to send OTP");
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/verify-otp`, {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to verify OTP");
  }
};
