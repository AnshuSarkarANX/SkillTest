import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../../Components/Button";
import SkillsSelector from "../../Components/SkillSelector";
import { createProfile } from "../../apis/userApis";


const TechSkillsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState([]);
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
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  }, [skills, navigate, createProfile]);

  return (
    <div className="space-y-[25px] mb-[20px]">
      <div className="flex flex-col items-center">
        <h1 className="font-bold H-28 mb-[5px] ">Select Your Skills</h1>
        <p className="text-text2">Please fill in your details to continue.</p>
      </div>
      <div className="flex flex-col items-center smallShadow rounded-[20px] bg-white">
        <img
          src="/assets/specializationImage.svg"
          alt="name"
          className="w-[200px] h-[200px] my-[20px]"
        />

        <div className="w-full p-[15px]">
         
          <SkillsSelector
          title={"Technical Skills"}
            items={[
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
        </div>
      </div>
      <Button text="Continue" onClick={() => handleContinue()} loading={isLoading} />
    </div>
  );
}

export default TechSkillsPage