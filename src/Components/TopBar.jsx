import { useEffect } from "react";
import { topBar } from "../state/store";
import { useNavigate } from "react-router";
import { IoIosArrowForward } from "react-icons/io";

const TopBar = () => {
  const useTopBar = topBar((state) => state);
  const { hasBackButton, logo, home } = useTopBar;
  const navigate = useNavigate();
  useEffect(() => {
    console.log("onBack", useTopBar.onBack);
  }, [useTopBar.onBack]);
  return (
    <div className="grid grid-cols-5 justify-between items-center H-12 sticky top-0 bg-gradient-to-b from-secondary from-20%  to-bg to-80% py-[15px] px-[10px] ">
      {hasBackButton && (
        <button
          onClick={
            useTopBar.onBack
              ? () => {
                  useTopBar.onBack();
                }
              : () => {
                  navigate(-1);
                }
          }
          className={`rounded-full w-[35px] h-[35px] flex items-center justify-center  bg-CTA text-white text-xl col-span-1 rotate-180`}
          aria-label="Back button"
        >
          <IoIosArrowForward />
        </button>
      )}
      {logo && (
        <h1 className="flex font-heading text-primary H-20 font-bold col-span-3 col-start-2 justify-center items-center">
          LearnSnap.in
        </h1>
      )}
      {home ? (
        <div className="col-span-1 col-start-4">menu, profile</div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TopBar;
