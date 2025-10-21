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
    email,
    gender,
    dob,
    qualification,
    specialization,
    softSkills,
    techSkills,
  } = JSON.parse(localStorage.getItem("userDetails")) || {};

  const [name, setName] = useState(fullName || "");
  const [Gender, setGender] = useState(gender || "");
  const [birthDate, setBirthDate] = useState(formatDate(dob) || "");
  const [Qualification, setQualification] = useState(qualification || "");
  const [Specialization, setSpecialization] = useState(specialization || "");
  const [isLoading, setIsLoading] = useState(false);
  const onSave = () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
    userDetails.fullName = name;
    userDetails.gender = Gender;
    userDetails.dob = birthDate;
    userDetails.qualification = Qualification;
    userDetails.specialization = Specialization;
    console.log("details", userDetails);
  };
  const navigate = useNavigate();


    const handleContinue = useCallback(() => {
     
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
       userDetails.fullName = name;
       userDetails.gender = Gender;
       userDetails.dob = birthDate;
       userDetails.qualification = Qualification;
       userDetails.specialization = Specialization;
       console.log("details", userDetails);

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
    }, [name, Gender, birthDate, Qualification, Specialization, navigate, createProfile]);

  const qOptions = [
    { value: "high_school", label: "High School" },
    { value: "bachelor", label: "Bachelor's Degree" },
    { value: "master", label: "Master's Degree" },
    { value: "phd", label: "PhD" },
    { value: "college", label: "College" },
  ];
  const sOptions = [
    { value: "programming", label: "Programming" },
    { value: "data_analysis", label: "Data Analysis" },
    { value: "ui_ux_design", label: "UI/UX Design" },
    { value: "marketing", label: "Marketing" },
    { value: "software_engineering", label: "Software Engineering" },
  ];
  return (
    <div>
      <div className="rounded-[20px] bg-[linear-gradient(360deg,_rgba(152,74,217,0.81)_0%,_rgba(152,74,217,0.624046)_17.73%,_rgba(152,74,217,0.479094)_39.49%,_rgba(152,74,217,0.304639)_66.28%,_rgba(152,74,217,0.09)_100%)] p-6 flex flex-col items-center">
        <ProfileAvatar name={fullName} />
      </div>

      {/*Personal Details*/}

      <div className="mt-4 bg-background rounded-[20px] smallShadow p-[20px] space-y-[20px]">
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
          <p className="font-semibold ml-[5px] text-text2 mb-[5px]">Gender</p>
          <select
            style={{
              boxShadow: "0px 4px 12px 0px #0000001A",
            }}
            value={Gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full h-[50px] rounded-[15px] px-[25px] py-[px] focus:outline-none focus:ring-primary focus:ring-2"
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <p className="font-semibold ml-[5px] text-text2 mb-[5px]">
            Date of Birth
          </p>
          <input
            style={{
              boxShadow: "0px 4px 12px 0px #0000001A",
            }}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            type="date"
            placeholder="Enter your birth date"
            className="w-full h-[40px] rounded-[20px] px-[25px] py-[25px] focus:outline-none focus:ring-primary focus:ring-2"
          />
        </div>
        <div>
          <p className="font-semibold ml-[5px] text-text2 mb-[5px]">
            Qualification
          </p>
          <select
            style={{
              boxShadow: "0px 4px 12px 0px #0000001A",
            }}
            required
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="w-full  rounded-[20px] px-[25px] py-[15px] focus:outline-none focus:ring-primary focus:ring-2"
          >
            <option value="" disabled className="">
              Select your qualification
            </option>
            {qOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="font-semibold ml-[5px] text-text2 mb-[5px]">Skills</p>
          <select
            style={{
              boxShadow: "0px 4px 12px 0px #0000001A",
            }}
            required
            value={Specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full  rounded-[20px] px-[25px] py-[15px] focus:outline-none focus:ring-primary focus:ring-2"
          >
            <option value="" disabled className="">
              Select your qualification
            </option>
            {sOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button text="Save" onClick={handleContinue} loading={isLoading} disabled={isLoading} />
    </div>
  );
};

export default EditProfile;
