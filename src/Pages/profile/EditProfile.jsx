import { use, useCallback, useEffect, useState } from "react";
import { ProfileAvatar } from "./Profile";
import Button from "../../Components/Button";
import { formatDate } from "../../hooks/SmallHooks";
import { createProfile } from "../../apis/userApis";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const EditProfile = () => {
  const {
    fullName,
    qualification,
    specialization,
  } = JSON.parse(localStorage.getItem("userDetails")) || {};

  const [name, setName] = useState(fullName || "");
  const [Qualification, setQualification] = useState(qualification || "");
  const [Specialization, setSpecialization] = useState(specialization || "");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


    const handleContinue = useCallback(() => {
     
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
       userDetails.fullName = name;
       userDetails.qualification = Qualification;
       userDetails.specialization = Specialization;
      // console.log("details", userDetails);

      setIsLoading(true);
      createProfile(userDetails)
        .then(() => {
          setIsLoading(false);
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          navigate(-1);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message);
        });
    }, [name, Qualification, Specialization]);


  return (
    <div className="space-y-[25px]">
      <div className="rounded-[20px] bg-[linear-gradient(360deg,_rgba(152,74,217,0.81)_0%,_rgba(152,74,217,0.624046)_17.73%,_rgba(152,74,217,0.479094)_39.49%,_rgba(152,74,217,0.304639)_66.28%,_rgba(152,74,217,0.09)_100%)] p-6 flex flex-col items-center">
        <ProfileAvatar name={fullName} />
      </div>

      {/*Personal Details*/}

      <div className=" bg-background rounded-[20px] smallShadow p-[20px] space-y-[20px]">
        <div>
          <p className="font-semibold ml-[5px] text-text2 mb-[5px]">Name</p>
          <input
            style={{
              boxShadow: "0px 4px 12px 0px #0000001A",
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
            className="w-full h-[40px] rounded-[15px] px-[25px] py-[25px] focus:outline-none focus:ring-primary focus:ring-2"
          />
        </div>
        <div>
          <p className="font-semibold ml-[5px] text-text2 mb-[5px]">
            Qualification
          </p>
          <input
            style={{
              boxShadow: "0px 4px 12px 0px #0000001A",
            }}
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            type="text"
            placeholder="Enter your qualification"
            className="w-full h-[40px] rounded-[15px] px-[25px] py-[25px] focus:outline-none focus:ring-primary focus:ring-2"
          />
        </div>
        <div>
          <p className="font-semibold ml-[5px] text-text2 mb-[5px]">
            Specialization
          </p>
          <input
            style={{
              boxShadow: "0px 4px 12px 0px #0000001A",
            }}
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            type="text"
            placeholder="Enter your specialization"
            className="w-full h-[40px] rounded-[15px] px-[25px] py-[25px] focus:outline-none focus:ring-primary focus:ring-2"
          />
        </div>
      </div>
      <Button
        text="Save"
        onClick={handleContinue}
        loading={isLoading}
        disabled={isLoading}
      />
    </div>
  );
};

export default EditProfile;
