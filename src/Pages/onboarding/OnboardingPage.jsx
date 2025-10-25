import { useEffect } from "react";
import { bottomBar, topBar } from "../../state/store";
import { Outlet, useLocation } from "react-router";

const steps = [
  { path: "details", label: "Details" },
  { path: "gender", label: "Gender" },
  { path: "name", label: "Name" },
  { path: "birthdate", label: "Birthdate" },
  { path: "qualification", label: "Qualification" },
  { path: "specialization", label: "Specialization" },
  { path: "soft-skills", label: "Soft Skills" },
  { path: "tech-skills", label: "Tech Skills" },
];

export const Steps = () => {
  const location = useLocation();
  // Current step path (without leading slash)
  const activeStep = location.pathname.split("/").pop();

  // Find active index (if step not found, fallback to 0)
  const currentIndex =
    steps.findIndex((step) => step.path === activeStep) !== -1
      ? steps.findIndex((step) => step.path === activeStep)
      : 0;

  return (
    <>
      {activeStep === "upload-cv" ? (
        <></>
      ) : (
        <div className="flex items-center justify-between py-6 select-none">
          {steps.map((step, idx) => (
            <div key={step.path} className="flex justify-center">
              <div
                className={`h-[10px] w-[30px] md:w-[45px] rounded-[6px] mx-[auto] transition-all
              ${idx <= currentIndex ? "bg-primary" : "bg-gray-200"}
            `}
              ></div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
const OnboardingPage = () => {
    const useBottomBar = bottomBar((state) => state);
    const useTopBar = topBar((state) => state);
    useEffect(() => {
        useBottomBar.setActive(false);
        useTopBar.setHasBackButton(true);
      }, []);

      
  return <div>  <Steps/> <Outlet/></div>;
};

export default OnboardingPage;