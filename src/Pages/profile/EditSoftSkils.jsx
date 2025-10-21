import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { createProfile } from "../../apis/userApis";
import SkillsSelector from "../../Components/SkillSelector";
import Button from "../../Components/Button";

const EditSoftSkils = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [skills, setSkills] = useState([]);
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const handleContinue = useCallback(() => {
      if (skills.length === 0) {
        toast.error("Select at least one skill to continue");
        return;
      }
      userDetails.softSkills = skills;
      setIsLoading(true);
      createProfile(userDetails)
        .then(() => {
          setIsLoading(false);
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          toast.success("Soft skills updated successfully");
          navigate(-1);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message);
        });
    }, [skills, navigate, createProfile]);
  return (
    <div className="space-y-[25px] mb-[20px]">
      
      <div className="flex flex-col items-center smallShadow rounded-[20px] bg-white">
       

        
          <SkillsSelector
            title={"Soft Skills"}
            selectedItems={userDetails?.softSkills || []}
            items={
              JSON.parse(localStorage.getItem("generatedSoftSkills")) || [
                "Communication",
                "Teamwork and Collaboration",
                "Adaptability and Flexibility",
                "Problem-Solving",
                "Creativity and Innovation",
                "Time Management",
                "Leadership",
                "Emotional Intelligence",
                "Critical Thinking",
                "Work Ethic and Professionalism",
                "Attention to Detail",
                "Interpersonal Skills",
                "Decision-Making",
                "Negotiation",
                "Conflict Resolution",
                "Presentation Skills",
                "Organizational Skills",
                "Stress Management",
                "Self-Motivation",
                "Responsibility and Dependability",
              ]
            }
            onChange={setSkills}
          />
     
      </div>
      <Button
        text="Continue"
        onClick={() => handleContinue()}
        loading={isLoading}
        disabled={isLoading}
      />
    </div>
  );
};

export default EditSoftSkils;
