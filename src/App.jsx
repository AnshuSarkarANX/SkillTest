import { useEffect, useState } from "react";
import { bottomBar} from "./state/store";
import { CiSearch } from "react-icons/ci";
import Button from "./Components/Button";
import Specialization from "./Pages/onboarding/Specialization";
import ResourceCard from "./Components/ResourceCard";
import { useNavigate } from "react-router";
import { getProfile } from "./apis/userApis";
import toast from "react-hot-toast";
function App() {
  const useBottomBar = bottomBar((state) => state);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    useBottomBar.setActive(true);
  }, []);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const skills = [
    { label: "React", image: "/assets/reactImage.svg" },
    { label: "Node js", image: "/assets/nodeImage.svg" },
    { label: "Collaboration", image: "/assets/collaborationImage.svg" },
    { label: "SQL", image: "/assets/sqlImage.svg" },
    { label: "Figma", image: "/assets/figmaImage.svg" },
    { label: "Co-operation", image: "/assets/co-operationImage.svg" },
  ];


  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem("email");
      const storedUserDetails = localStorage.getItem("userDetails");

      if (!email) {
        console.log("No email found");
        return;
      }

      if (storedUserDetails) {
        console.log("User details already cached");
        return;
      }

      try {
        const data = await getProfile(email);
        localStorage.setItem("userDetails", JSON.stringify(data));
      } catch (error) {
        toast.error("Error fetching user details, please log in again");
        console.error(error);
      }
    };
    +fetchProfile();
  }, []);

  return (
    <div className="space-y-[40px]">
      <div className="bg-gradient-to-b from-secondary from-50%  to-background px-[20px] pt-[30px]">
        <div className="H-26 font-bold ">
          Welcome, {userDetails ? userDetails?.fullName : ""}
          <br />
          Get your skills tested by <p className="text-primary">SkillTest</p>
        </div>
        <div className="flex items-center gap-[10px] mt-[20px]">
          <input
            type="text"
            placeholder="You can search by skills"
            className="w-full h-[40px]  px-[25px] rounded-[10px] bg-white py-[25px] focus:outline-none focus:ring-background focus:ring-2 text-text"
          />
          <button className="p-[12px] rounded-[10px]  bg-white">
            <CiSearch className="text-[25px] text-primary font-semibold" />
          </button>
        </div>
      </div>
      {/*Skills*/}
      <div className="px-[20px] space-y-[20px]">
        <div className="H-18 font-bold ">Choose a skill to start the test</div>

        <div className="grid grid-cols-3 gap-[10px]  w-full">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-[5px] px-[10px] py-[15px] rounded-[10px] bg-white border smallShadow ${
                selectedIndex === index ? "border-primary" : "border-white"
              }`}
              onClick={() => {
                (setSelectedIndex(index),
                  sessionStorage.setItem("selectedSkill", skill.label));
                setTimeout(() => navigate(`/skills/${skill.label}`), 200);
              }}
              style={{ cursor: "pointer" }}
            >
              <img
                src={skill.image}
                alt={skill.label}
                className="w-[50px] h-[50px]"
              />
              <p className="H-14 font-bold">{skill.label}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto w-[130px]">
          <Button text="View More" onClick={() => navigate("/skills")} />
        </div>
      </div>
      
    </div>
  );
}

export default App;
