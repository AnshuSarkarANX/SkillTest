import { useNavigate } from "react-router";
import Button from "../../Components/Button";

const Process = () => {
   const process = [
     {
       title: "Choose Your Skill Level",
       description:
         "Select your experience level so we can tailor the test to your ability.",
     },
     {
       title: "Take Your Skill Test",
       description:
         "Answer a mix of MCQs and practical questions based on your skills.",
     },
     {
       title: "Track Your Performance",
       description: "Get points, insights, and see where you stand.",
     },
   ];

    const navigate = useNavigate();
    return (
      <div className="space-y-[30px]">
        <h1 className="font-bold H-20 ">
          Lets have a look at the process for starting a test
        </h1>
        <div className="space-y-6">
          {process.map((step, index) => (
            <div key={index} className="relative">
              {/* Vertical Dashed Line - Only show if not last step */}
              {index !== process.length - 1 && (
                <div
                  className="absolute left-[30px] top-[60px] w-[2px] h-[120px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom,#fafafa, #984AD9, #fafafa)",
                    WebkitMaskImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 4px, black 4px, black 8px)",
                    maskImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 4px, black 4px, black 8px)",
                  }}
                ></div>
              )}

              <div className="flex gap-4 items-center">
                {/* Number Circle */}
                <div className="flex-shrink-0 w-[60px] h-[60px] rounded-full bg-purple-200 flex items-center justify-center z-[5]">
                  <span className="text-2xl font-bold text-purple-600">
                    {index + 1}
                  </span>
                </div>

                {/* Content Card */}
                <div
                  className={`flex-1 bg-white rounded-[20px] smallShadow p-[20px] `}
                >
                  <h3 className="H-16 font-bold  mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button
          text="Next step"
          onClick={() => navigate("/select-level")}
        />
      </div>
    );
}

export default Process