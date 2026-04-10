import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { bottomBar, topBar } from "../../state/store";
import { IoIosArrowForward } from "react-icons/io";
import {  AnimatePresence } from "framer-motion";

const steps = [
  {
    image: "/assets/welcomeImage.webp",
    heading: "Smart Prep Starts Here",
    description:
      "Generate personalized tests from your CV and strengthen your skills before the big day",
    buttonText: "Continue",
    isSkip: true,
  },
];

const slideVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: { duration: 0.5 },
  }),
};

const WelcomePage = () => {
  const useBottomBar = bottomBar((state) => state);
  const useTopBar = topBar((state) => state);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1); // for animation direction
const onPrevious = () => {
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
};
  

  const onNext = () => {
    if (currentStep === steps.length - 1) { 
      navigate("/onboarding/details");
      return;
    }
    setDirection(1);
    setCurrentStep(currentStep + 1);
    
  };
  

  const onSkip = () => {
    navigate("/onboarding/details");
  };

  const step = steps[currentStep];
  

  return (
    <div>
      <div className="pt-[50px] bg-gradient-to-b from-background from-5% via-secondary to-bg  ">
        <img
          src={"/assets/welcomeImage.webp"}
          alt="welcome"
          className="w-fit h-fit scale-150 z-[20] my-[50px]"
        />
      </div>

      <div className={`w-full p-[20px] mx-auto `}>
        <div className="bg-primary rounded-[30px] p-[20px] text-center relative">
          <div className="mt-[30px] mb-[60px] whitespace-pre-line">
            <h2 className="text-white text-2xl font-bold mb-2">
              Smart Prep Starts Here
            </h2>
            <p className="text-white/80 text-sm">
              Generate personalized tests from your CV and strengthen your
              skills before the big day
            </p>
          </div>

          {/* Action button with overlap */}
          <div className="absolute left-1/2 -bottom-13 transform -translate-x-1/2">
            <button
              onClick={onNext}
              className={`rounded-full w-[100px] h-[100px] flex items-center justify-center border-[12px] border-background bg-CTA text-white text-4xl`}
              aria-label={step.buttonText}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>

        {/* Text or button below the card */}
        <p
          className="mt-14 text-center text-gray-500 font-bold h-16"
          onClick={onSkip}
        >
          {"Continue"}
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
