import { useEffect } from "react";
import { bottomBar, topBar } from "../../state/store";
import { Outlet, useLocation } from "react-router";

const steps = [
  { path: "details", label: "Details" },
  { path: "name", label: "Name" },
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
        <div className="grid grid-cols-6 gap-1 py-6 select-none">
          {steps.map((step, idx) => (
            <div
              key={step.path}
              className={`h-[10px] rounded-[6px] transition-all
        ${idx <= currentIndex ? "bg-primary" : "bg-gray-200"}
      `}
            />
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