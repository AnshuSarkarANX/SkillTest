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
      .then((res) => {
        localStorage.setItem("userDetails", JSON.stringify(res.user)); // ✅ update with server data
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false); // ✅ always runs
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
          src="/assets/detailsImage.webp"
          alt="name"
          className="w-[250px] h-[250px] my-[20px]"
        />

        <div className="w-full p-[15px]">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <SkillsSelector
              title={"Technical Skills"}
              items={JSON.parse(localStorage.getItem("generatedTechSkills"))}
              onChange={setSkills}
            />
          )}
        </div>
      </div>
      <Button
        text="Continue"
        onClick={() => handleContinue()}
        loading={isLoading}
      />
    </div>
  );
}

export default TechSkillsPage