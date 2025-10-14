import axios from "axios";

const API_URL = "https://localhost:3000/api/ai";

export const generateSkills = async () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    const specialization = userDetails.specialization;
    const  qualification = userDetails.qualification;

  try {
    const response = await axios.post(`${API_URL}/generate-skills`, { specialization, qualification});
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to generate skills"
    );
  }
};