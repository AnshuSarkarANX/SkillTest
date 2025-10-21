import { useNavigate } from "react-router";
import Button from "../../Components/Button";

const Process = () => {
    const process = [
      {
        title: "Select Category for a certificate",
        description:
          "Choose your preferred domain or specialization to get started with the right certification track.",
      },
      {
        title: "Take Exam",
        description:
          "Choose your preferred domain or specialization to get started with the right certification track.",
      },
      {
        title: "Earn a Certifiacte",
        description:
          "Choose your preferred domain or specialization to get started with the right certification track.",
      },
    ];

    const navigate = useNavigate();
  return (
    <div className="space-y-[30px]">
      <h1 className="font-bold H-20 ">
        Lets Have A Look At The Process For
        <br />
        Earning A Certificate
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
      <Button text="Earn A Certificate" onClick={() => navigate("/select-level")} />
    </div>
  );
}

export default Process