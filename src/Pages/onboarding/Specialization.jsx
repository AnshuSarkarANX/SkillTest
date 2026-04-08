import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../../Components/Button";
import { generateSkills } from "../../apis/aiApis";

const Specialization = () => {
  const navigate = useNavigate();
  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(false);
const handleContinue = useCallback(async () => {
  if (qualification.trim() === "" && specialization.trim() === "") {
    toast.error("Please fill in both Qualification and Specialization");
    return;
  }
  if (qualification.trim() === "") {
    toast.error("Please enter your Qualification");
    return;
  }
  if (specialization.trim() === "") {
    toast.error("Please enter your Specialization");
    return;
  }

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  userDetails.qualification = qualification;
  userDetails.specialization = specialization;
  localStorage.setItem("userDetails", JSON.stringify(userDetails));

  setLoading(true);
  try {
    const res = await generateSkills();
    console.log(res);

    if (res.softSkills.length > 0) {
      userDetails.softSkills = res.softSkills;
      localStorage.setItem(
        "generatedSoftSkills",
        JSON.stringify(res.softSkills),
      );
    }
    if (res.techSkills.length > 0) {
      userDetails.techSkills = res.techSkills;
      localStorage.setItem(
        "generatedTechSkills",
        JSON.stringify(res.techSkills),
      );
    }
    navigate("/onboarding/soft-skills");
  } catch (error) {
    console.log(error)
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
}, [qualification, specialization]);
  return (
    <div className="space-y-[25px]">
      <div className="flex flex-col items-center">
        <h1 className="font-bold H-24 mb-[5px] text-center ">
          Your Qualification & Specialization
        </h1>
        <p className="text-text2 H-14 text-center">
          This helps us generate skill-based tests tailored to your background.
        </p>
      </div>
      <div className="flex flex-col items-center smallShadow rounded-[20px] bg-white">
        <img
          src="/assets/detailsImage.webp"
          alt="name"
          className="w-[250px] h-[250px] my-[20px] scale-120"
        />

        <div className="w-full p-[15px]">
          <p className="font-semibold ml-[5px] text-text2 mb-[5px]">
            Highest Qualification
          </p>
          <input
            style={{
              boxShadow: "0px 4px 12px 0px #0000001A",
            }}
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            type="text"
            placeholder="Eg: B.Tech, MBA, B.Sc, M.Tech"
            className="w-full h-[40px] rounded-[20px] px-[25px] py-[25px] focus:outline-none focus:ring-primary focus:ring-2"
          />
        </div>
        <div className="w-full p-[15px]">
          <p className="font-semibold ml-[5px] text-text2 mb-[5px]">
            Specialization / Field of Study
          </p>
          <input
            style={{
              boxShadow: "0px 4px 12px 0px #0000001A",
            }}
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            type="text"
            placeholder="Eg: Mechanical Engineering, Marketing, Computer Science"
            className="w-full h-[40px] rounded-[20px] px-[25px] py-[25px] focus:outline-none focus:ring-primary focus:ring-2"
          />
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