import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../Components/Button";


const Gender = () => {
    const [selectedOption, setSelectedOption] = useState("");
        const navigate = useNavigate(); 
        const setGender = useCallback(() => {
          const userDetails = {gender: selectedOption}
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
            navigate("/onboarding/name");
        }, [selectedOption])

        
         return (
           <div className="space-y-[25px]">
             <div className="flex flex-col items-center">
               <h1 className="font-bold H-28  mb-[5px] ">Your Gender</h1>
               <p className="text-text2">
                 Please fill in your details to continue.
               </p>
             </div>
             <div className="smallShadow flex items-center rounded-[20px]  bg-white p-[30px] gap-[40px] justify-center">
               <div
                 className={`flex flex-col items-center bg-[#F8F1FF80]  border border-[#F8F1FF80] p-[20px] rounded-[20px] transition-colors duration-300 ${
                   selectedOption === "male" ? " border-primary" : ""
                 }`}
                 onClick={() => setSelectedOption("male")}
               >
                 <img
                   src="/assets/maleImage.svg"
                   alt="male"
                   className="w-[100px] h-[100px] rounded-full"
                 />
                 <h1 className="font-bold">Male</h1>
               </div>
               <div
                 className={`flex flex-col items-center border border-[#F8F1FF80] bg-[#F8F1FF80] p-[20px] rounded-[20px] transition-colors duration-300 ${
                   selectedOption === "female" ? " border-primary" : ""
                 }`}
                 onClick={() => setSelectedOption("female")}
               >
                 <img
                   src="/assets/femaleImage.svg"
                   alt="female"
                   className="w-[100px] h-[100px] rounded-full"
                 />
                 <h1 className="font-bold">Female</h1>
               </div>
             </div>
             <Button
               disabled={!selectedOption}
               text="Continue"
               onClick={() => setGender()}
             />
           </div>
         );
}

export default Gender