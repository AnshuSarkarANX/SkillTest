import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const generateSkills = async () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    const specialization = userDetails.specialization;
    const  qualification = userDetails.qualification;

  try {
    const response = await axios.post(`${API_URL}/api/ai/generate-skills`, {
      specialization,
      qualification,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to generate skills"
    );
  }
};