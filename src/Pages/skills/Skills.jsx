import { useNavigate } from "react-router";
import { useState } from "react";
import Button from "../../Components/Button";
import { RiSpeakAiLine } from "react-icons/ri";
import { AiOutlineLaptop } from "react-icons/ai";

const Skills = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  // Map strings → objects with label and type
  const techSkills = (userDetails?.techSkills || []).map((skill) => ({ label: skill, type: "tech" }));
  const softSkills = (userDetails?.softSkills || []).map((skill) => ({ label: skill, type: "soft" }));
  const skills = [...techSkills, ...softSkills];

  const navigate = useNavigate();

  return (
    <div>
      {/* Hidden SVG gradient definition — referenced by icons below */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--text2)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="space-y-[20px]">
        <div className="H-18 font-bold">Select a skill to start the test</div>
        <div className="grid grid-cols-3 gap-[10px] w-full">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-[5px] px-[10px] py-[15px] rounded-[10px] bg-white border smallShadow cursor-pointer ${
                selectedIndex === index ? "border-primary" : "border-white"
              }`}
              onClick={() => {
                setSelectedIndex(index);
                sessionStorage.setItem("selectedSkill", skill.label);
                setTimeout(() => navigate(`/process`), 200);
              }}
            >
              {skill.type === "soft" ? (
                <RiSpeakAiLine
                  style={{ fill: "url(#iconGradient)", fontSize: "28px" }}
                />
              ) : (
                <AiOutlineLaptop
                  style={{ fill: "url(#iconGradient)", fontSize: "28px" }}
                />
              )}
              <p className="H-14 font-bold text-center">{skill.label}</p>
            </div>
          ))}
        </div>
        <Button text="Add A Skill" onClick={() => navigate("/profile")} />
      </div>
    </div>
  );
};

export default Skills;

