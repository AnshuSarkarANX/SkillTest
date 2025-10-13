import axios from "axios";

const API_URL = "https://localhost:3000/api/auth";

export const requestOTP = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/request-otp`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to send OTP");
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to verify OTP");
  }
};
