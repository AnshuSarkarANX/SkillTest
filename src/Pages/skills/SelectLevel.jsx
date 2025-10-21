import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

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
        level: "Specialist",
        title: "Specialize and Excel",
        description:
          "Focus on niche areas and become a sought-after specialist. Master advanced tools, frameworks, and methodologies that set you apart in the competitive landscape.",
      },
    ];
    const [selectedLevel, setSelectedLevel] = useState(0);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 min-h-[300px]">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Side - Level Selection */}
          <div className="space-y-3">
            {levels.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedLevel(index)}
                className={`w-full px-3 py-3 rounded-lg text-left font-medium transition-all flex items-center justify-between ${
                  selectedLevel === index
                    ? "border-2 border-primary text-primary shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{item.level}</span>
                <IoIosArrowForward className="w-5 h-5" />
              </button>
            ))}
          </div>

          {/* Right Side - Description */}
          <div className="flex flex-col justify-center col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {levels[selectedLevel].title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {levels[selectedLevel].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectLevel;
