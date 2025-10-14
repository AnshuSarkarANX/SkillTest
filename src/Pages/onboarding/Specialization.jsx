import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../../Components/Button";
import { generateSkills } from "../../apis/aiApis";

const Specialization = () => {
  const navigate = useNavigate();
  const [qualification, setQualification] = useState("");
  const [loading, setLoading] = useState(false);
  const handleContinue = useCallback(async () => {
    if (qualification.trim() === "") {
      toast.error("Select one to continue");
      return;
    }
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    userDetails.specialization = qualification;
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    setLoading(true);
    const res = await generateSkills();
    setLoading(false);
    console.log(res);

    if (res.softSkills.length > 0) {
      userDetails.softSkills = res.softSkills;
      localStorage.setItem(
        "generatedSoftSkills",
        JSON.stringify(res.softSkills)
      );
    }
    if (res.techSkills.length > 0) {
      userDetails.techSkills = res.techSkills;
      localStorage.setItem(
        "generatedTechSkills",
        JSON.stringify(res.techSkills)
      );
    }
    navigate("/onboarding/soft-skills");
  }, [qualification]);
  const options = [
    {
      value: "marketing",
      label: "Marketing",
    },
    {
      value: "software_engineering",
      label: "Software Engineering",
    },
  ];
  return (
    <div className="space-y-[25px]">
      <div className="flex flex-col items-center">
        <h1 className="font-bold H-28 mb-[5px] ">Your Specialization</h1>
        <p className="text-text2">Please fill in your details to continue.</p>
      </div>
      <div className="flex flex-col items-center smallShadow rounded-[20px] bg-white">
        <img
          src="/assets/specializationImage.svg"
          alt="name"
          className="w-[200px] h-[200px] my-[20px]"
        />

        <div className="w-full p-[15px]">
          <p className="font-semibold ml-[5px] text-text2 mb-[5px]">
            Specialization
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
              Select your specialization
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button
        text="Continue"
        loading={loading}
        disabled={loading}
        onClick={() => handleContinue()}
      />
    </div>
  );
};

export default Specialization;
