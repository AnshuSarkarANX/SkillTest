import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { bottomBar, topBar } from "../../state/store";
import { IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    image: "/assets/welcomeImage.svg",
    heading: "Set Your Learning Goals\nWith Certification",
    description:
      "Sign in to sync your course history, download certificates, and continue where you left off",
    buttonText: "Let's Start",
    isSkip: false,
  },
  {
    image: "/assets/welcomeImage1.svg",
    heading: "We Can Personalize Your Learning Journey.",
    description:
      "Choose what you want to achieve so we can personalize your learning journey.",
    buttonText: "Skip",
    isSkip: true,
  },
  {
    image: "/assets/welcomeImage2.svg",
    heading: "The Topics You’d Like To Focus On",
    description:
      "Choose what you want to achieve so we can personalize your learning journey.",
    buttonText: "Go Home",
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
  useEffect(() => {
    useBottomBar.setActive(false);
useTopBar.setOnBack(onPrevious);
  }, []);
  useEffect(() => {
    useTopBar.setHasBackButton(currentStep > 0);
  }, [currentStep]);

  const onNext = () => {
    if (currentStep === steps.length - 1) { 
      navigate("/");
      return;
    }
    setDirection(1);
    setCurrentStep(currentStep + 1);
    
  };
  

  const onSkip = () => {
    navigate("/");
  };

  const step = steps[currentStep];
  

  return (
    <div>
      <div className="mt-[-50px] pt-[80px] pb-[100px] px-[10px] bg-gradient-to-b from-background from-5% via-secondary to-bg to-95% mb-[-100px]">
        <motion.img
          key={step.image}
          src={step.image}
          alt="welcome"
          className="w-fit h-fit mx-auto z-[20]"
          custom={direction}
          variants={slideVariants}
          initial={currentStep === 0 ? "false" : "initial"}
          animate="animate"
          exit="exit"
        />
      </div>

      <div className="w-full p-[20px] mx-auto">
        <motion.div
          key={currentStep}
          custom={direction}
          variants={slideVariants}
          initial={currentStep === 0 ? "false" : "initial"}
          animate="animate"
          exit="exit"
          className="bg-primary rounded-[30px] p-[20px] text-center relative"
        >
          <div className="mt-[30px] mb-[60px] whitespace-pre-line">
            <h2 className="text-white text-2xl font-bold mb-2">
              {step.heading}
            </h2>
            <p className="text-white/80 text-sm">{step.description}</p>
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
        </motion.div>

        {/* Text or button below the card */}
        <p
          className="mt-14 text-center text-gray-500 font-bold h-16"
          onClick={step.isSkip && onSkip}
        >
          {step.buttonText}
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
