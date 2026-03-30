import { useCallback, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Button from "../../Components/Button";
import { useNavigate } from "react-router";
const SelectLevel = () => {
  const levels = [
    {
      level: "Beginner",
      title: "Start with the Basics",
      description:
        "Test your understanding of fundamental concepts. This level is ideal if you're just getting started or want to assess your basic knowledge in this skill.",
    },
    {
      level: "Intermediate",
      title: "Challenge Your Knowledge",
      description:
        "Evaluate your ability to apply core concepts in practical scenarios. This level is suited for those with some experience looking to test their problem-solving skills.",
    },
    {
      level: "Advanced",
      title: "Push Your Limits",
      description:
        "Assess your expertise with complex problems and in-depth concepts. This level is designed for experienced individuals confident in their understanding of the skill.",
    },
    {
      level: "Expert",
      title: "Prove Your Mastery",
      description:
        "Take on highly challenging questions that test deep knowledge and precision. This level is for professionals aiming to validate their top-tier expertise.",
    },
  ];
  const [selectedLevel, setSelectedLevel] = useState(0);
  const navigate = useNavigate();
  const handleContinue = useCallback(() => {
    sessionStorage.setItem("selectedLevel", levels[selectedLevel].level);
    console.log("Continue clicked");
    navigate("/test-instructions");
  }, [selectedLevel]);
  const skill = sessionStorage.getItem("selectedSkill");
  return (
    <div className="space-y-[30px]">
      <div className="w-full">
        <h1 className="font-bold H-18 ">Select Level for {skill}</h1>
      </div>

      <div className="bg-white rounded-[20px] smallShadow p-[20px] h-fit">
        <p className="mb-[10px] H-10 opacity-55 text-nowrap">
          <span> Tip: </span>Choose the level that best matches your current
          skill
        </p>
        <div className="grid grid-cols-3 gap-6">
          {/* Left Side - Level Selection */}
          <div className="space-y-3">
            {levels.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedLevel(index)}
                className={`w-full px-3 py-3 rounded-[10px] text-left font-medium transition-all flex duration-300 items-center justify-between smallShadow border-1 ${
                  selectedLevel === index
                    ? " border-primary text-primary "
                    : "text-text2/30 border-background "
                }`}
              >
                <span className="H-10 font-bold">{item.level}</span>
                <IoIosArrowForward className="h-[10px]" />
              </button>
            ))}
          </div>

          {/* Right Side - Description */}
          <div className="flex flex-col col-span-2 smallShadow p-[15px] rounded-[15px]">
            <h2 className="H-16 font-bold  mb-[10px]">
              {levels[selectedLevel].title}
            </h2>
            <p className="text-text2 H-12 leading-relaxed">
              {levels[selectedLevel].description}
            </p>
          </div>
        </div>
      </div>
      <Button text="Continue" onClick={handleContinue} />
    </div>
  );
};

export default SelectLevel;
