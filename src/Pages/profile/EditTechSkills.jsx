import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { createProfile } from "../../apis/userApis";
import SkillsSelector from "../../Components/SkillSelector";
import Button from "../../Components/Button";

const EditTechSkills = () => {

    const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    setSkills(userDetails.techSkills || []);
  }, [])
  
  const handleContinue = useCallback(() => {
    if (skills.length === 0) {
      toast.error("Select at least one skill to continue");
      return;
    }
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    userDetails.techSkills = skills;
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    setIsLoading(true);
    createProfile(userDetails)
      .then(() => {
        setIsLoading(false);
        navigate(-1);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  }, [skills, navigate, createProfile]);

  return (
    <div className="space-y-[25px] mb-[20px]">
      
   
          <SkillsSelector
          title={"Technical Skills"}
            items={JSON.parse(localStorage.getItem("generatedTechSkills")) || [
              "Programming",
              "Web Development",
              "Database Management",
              "Data Analysis",
              "Cloud Computing",
              "Cybersecurity",
              "Network Administration",
              "Software Testing",
              "Mobile App Development",
              "Artificial Intelligence",
              "Machine Learning",
              "UI/UX Design",
              "Version Control (Git)",
              "API Integration",
              "DevOps",
              "Shell Scripting",
              "Quality Assurance",
              "Technical Writing",
              "Spreadsheet Proficiency",
              "Operating Systems (Linux/Windows)",
              "Business Intelligence",
              "CAD (Computer-Aided Design)",
              "Robotics",
              "Digital Marketing",
              "SEO Optimization",
              "Product Management",
              "CRM Platforms",
              "Project Management Tools",
              "Statistical Analysis",
              "Embedded Systems",
              "Blockchain",
            ]}
            onChange={setSkills}
          />
     
    
      <Button text="Continue" onClick={() => handleContinue()} loading={isLoading} />
    </div>
  )
}

export default EditTechSkills