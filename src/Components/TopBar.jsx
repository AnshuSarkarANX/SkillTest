import { useEffect } from "react";
import { topBar } from "../state/store";
import { useNavigate } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";

const TopBar = () => {
  const useTopBar = topBar((state) => state);
  const { hasBackButton, logo, home } = useTopBar;
  const navigate = useNavigate();
  useEffect(() => {
    console.log("onBack", useTopBar.onBack);
  }, [useTopBar.onBack]);
  return (
    <div className={`grid grid-cols-5 justify-between items-center H-12 sticky top-0   py-[15px] px-[20px] ${home ? "bg-secondary" : "bg-gradient-to-b from-secondary from-20%  to-background"}`}>
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
        <h1
          className={`flex font-heading text-primary H-20 font-bold   ${
            home ? "justify-start col-span-4 " : "justify-center col-start-2 col-span-3"
          } `}
        >
          LearnSnap.in
        </h1>
      )}
      {home ? (
        <div className="col-span-1  flex gap-[10px] items-center justify-end">
          <div className="bg-white rounded-[8px] p-[10px]">
            <FiMenu className="text-[20px] text-primary" />
          </div>
          <div className="bg-white rounded-[8px] p-[10px]">
            <CgProfile className="text-[20px] text-primary" />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TopBar;
