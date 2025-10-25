import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../../Components/Button";

const BirthDate = () => {
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState("");
  const handleContinue = useCallback(() => {
    if (birthDate.trim() === "") {
      toast.error("Birth date cannot be empty");
      return;
    }
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    userDetails.dob = birthDate;
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    navigate("/onboarding/qualification");
  }, [birthDate, navigate]);
  return (
    <div className="space-y-[25px]">
      <div className="flex flex-col items-center">
        <h1 className="font-bold H-28 mb-[5px] ">Please Confirm Your Age</h1>
        <p className="text-text2">Please fill in your details to continue.</p>
      </div>
      <div className="flex flex-col items-center smallShadow rounded-[20px] bg-white">
        <img
          src="/assets/calenderImage.svg"
          alt="name"
          className="w-[200px] h-[200px] mb-[10px]"
        />

        <div className="w-full p-[15px]">
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
      </div>
      <Button text="Continue" onClick={() => handleContinue()} />
    </div>
  );
};

export default BirthDate;