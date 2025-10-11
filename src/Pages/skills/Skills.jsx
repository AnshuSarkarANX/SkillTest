import React, { useState } from "react";
import Button from "../../Components/Button";

const Skills = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const skills = [
    { label: "React", image: "/assets/reactImage.svg" },
    { label: "Node js", image: "/assets/nodeImage.svg" },
    { label: "Collaboration", image: "/assets/collaborationImage.svg" },
    { label: "SQL", image: "/assets/sqlImage.svg" },
    { label: "Figma", image: "/assets/figmaImage.svg" },
    { label: "Co-operation", image: "/assets/co-operationImage.svg" },
  ];

  return (
    <div>
      <div className="space-y-[20px]">
        <div className="H-18 font-bold">
          Select a Skill for a best certification
        </div>
        <div className="grid grid-cols-3 gap-[10px] w-full">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-[5px] px-[10px] py-[15px] rounded-[10px] bg-white border smallShadow ${
                selectedIndex === index ? "border-primary" : "border-white"
              }`}
              onClick={() => setSelectedIndex(index)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={skill.image}
                alt={skill.label}
                className="w-[50px] h-[50px]"
              />
              <p className="H-14 font-medium truncate">{skill.label}</p>
            </div>
          ))}
        </div>
        <Button text="Add A Skill" />
      </div>
    </div>
  );
};

export default Skills;
