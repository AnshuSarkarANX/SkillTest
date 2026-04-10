import { useState } from "react";
import Button from "../../Components/Button";
import { useNavigate } from "react-router";


const Details = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate(); 
     return (
       <div className="space-y-[25px]">
         <div className="flex flex-col items-center">
           <h1 className="font-bold H-28 mb-[5px]">Fill Your Details</h1>
           <p className="text-text2">
             Please fill in your details to continue.
           </p>
         </div>
         <div className="smallShadow grid grid-cols-2 rounded-[20px] bg-white p-[30px] gap-[40px] justify-center">
           <div
             className={`flex flex-col items-center  bg-secondary   border border-[#F8F1FF80] p-[20px] rounded-[20px] transition-colors duration-300 ${
               selectedOption === "manual" ? " border-primary" : ""
             }`}
             onClick={() => setSelectedOption("manual")}
           >
             <img
               src="/assets/manualImage.webp"
               alt="manual"
               className="w-[100px] h-[100px] rounded-full"
             />
             <h1 className="font-bold">Fill Manually</h1>
           </div>
           <div
             className={`flex flex-col items-center  border border-[#F8F1FF80] bg-secondary p-[20px] rounded-[20px] transition-colors duration-300 ${
               selectedOption === "upload" ? " border-primary" : ""
             }`}
             onClick={() => setSelectedOption("upload")}
           >
             <img
               src="/assets/parseImage.webp"
               alt="technicalSkill"
               className="w-[100px] h-[100px] rounded-full"
             />
             <h1 className="font-bold">Upload CV</h1>
           </div>
         </div>
         <Button
           disabled={!selectedOption}
           text="Continue"
           onClick={() =>
             navigate(
               selectedOption === "manual"
                 ? "/onboarding/name"
                 : "/onboarding/upload-cv",
             )
           }
         />
       </div>
     );
}

export default Details