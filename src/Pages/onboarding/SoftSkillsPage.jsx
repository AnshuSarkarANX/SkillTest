import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../../Components/Button";
import SkillsSelector from "../../Components/SkillSelector";


const SoftSkillsPage = () => {
 const navigate = useNavigate();

 const [skills, setSkills] = useState([]);
 const handleContinue = useCallback(() => {
   if (skills.length === 0) {
     toast.error("Select at least one skill to continue");
     return;
   }
   const userDetails = JSON.parse(localStorage.getItem("userDetails"));
   userDetails.softSkills = skills;
   localStorage.setItem("userDetails", JSON.stringify(userDetails));
   navigate("/onboarding/tech-skills");
 }, [ skills, navigate]);

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
         <SkillsSelector
           title={"Soft Skills"}
           items={
             JSON.parse(localStorage.getItem("generatedSoftSkills"))
           }
           onChange={setSkills}
         />
       </div>
     </div>
     <Button text="Continue" onClick={() => handleContinue()} />
   </div>
 );
}

export default SoftSkillsPage