import { useNavigate } from "react-router";
import Button from "../../Components/Button";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";


const Name = () => {
  const navigate = useNavigate(); 
  const gender = JSON.parse(localStorage.getItem("userDetails")).gender;
  const [name,setName] = useState("");
  const handleContinue = useCallback(() => {
    if (name.trim() === "") {
      toast.error("Name cannot be empty");
        return;
    }
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    userDetails.name = name;
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    navigate("/onboarding/birthdate");
  }, [name, navigate]);
  return (
    <div className="space-y-[25px]">
      <div className="flex flex-col items-center">
        <h1 className="font-bold H-28 mb-[5px] ">Please Enter Your Name</h1>
        <p className="text-text2">Please fill in your details to continue.</p>
      </div>
      <div className="flex flex-col items-center smallShadow rounded-[20px] bg-white">
        {gender === "male" ? (
          <img
            src="/assets/maleImage.svg"
            alt="name"
            className="w-[200px] h-[200px] mb-[10px]"
          />
        ) : (
          <img
            src="/assets/femaleImage.svg"
            alt="name"
            className="w-[200px] h-[200px] mb-[10px]"
          />
        )}
        <div className="w-full p-[15px]">
          <p className="font-semibold ml-[5px] text-text2 mb-[5px]">Name</p>
          <input
            style={{
              boxShadow: "0px 4px 12px 0px #0000001A",
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
            className="w-full h-[40px] rounded-[20px] px-[25px] py-[25px] focus:outline-none focus:ring-primary focus:ring-2"
          />
        </div>
      </div>
      <Button text="Continue" onClick={() => handleContinue()} />
    </div>
  );
}

export default Name