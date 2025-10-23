import { useCallback, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Button from "../../Components/Button";
import { useNavigate } from "react-router";
const SelectLevel = () => {

    const levels = [
      {
        level: "Beginner",
        title: "Kickstart Your Journey",
        description:
          "Choose your preferred domain or specialization to get started with the right certification track. Start your path to success! Choose a course, take your first lesson, and move closer to earning your professional certificate.",
      },
      {
        level: "Intermediate",
        title: "Level Up Your Skills",
        description:
          "Build on your foundation with advanced concepts and practical applications. Dive deeper into specialized topics and enhance your expertise with hands-on projects and real-world scenarios.",
      },
      {
        level: "Advanced",
        title: "Master Your Craft",
        description:
          "Become an expert in your field with cutting-edge techniques and industry best practices. Take on complex challenges and prepare yourself for leadership roles in your domain.",
      },
      {
        level: "Expert",
        title: "Specialize and Excel",
        description:
          "Focus on niche areas and become a sought-after specialist. Master advanced tools, frameworks, and methodologies that set you apart in the competitive landscape.",
      },
      {
        level: "Specialist",
        title: "Specialize and Excel",
        description:
          "Focus on niche areas and become a sought-after specialist. Master advanced tools, frameworks, and methodologies that set you apart in the competitive landscape.",
      },
    ];
    const [selectedLevel, setSelectedLevel] = useState(0);
    const navigate =useNavigate();
    const handleContinue = useCallback(() => {
     sessionStorage.setItem("selectedLevel", levels[selectedLevel].level);
      console.log("Continue clicked");
      navigate("/skill-test")
    }, [selectedLevel]);
  return (
    <div className="space-y-[30px]">
      <h1 className="font-bold H-18 ">
        Select A Level Of Category For A
        <br /> Certificate
      </h1>
      <div className="bg-white rounded-[20px] smallShadow p-[20px] min-h-[300px]">
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
