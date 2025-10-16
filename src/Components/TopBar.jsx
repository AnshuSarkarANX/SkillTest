import { useEffect } from "react";
import { topBar } from "../state/store";
import { Link, useLocation, useNavigate } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";

const TopBar = () => {
  const useTopBar = topBar((state) => state);
  const { hasBackButton, logo, home } = useTopBar;
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    useTopBar.setOnBack(null);
  }, [location]);
  return (
    <div
      className={`grid grid-cols-5 justify-between items-center H-12 sticky top-0  z-[10]  py-[15px] px-[20px] transition-[padding]  ease-in-out duration-500 ${
        home
          ? "bg-secondary "
          : "bg-[linear-gradient(180deg,_rgba(152,74,217,0.3154)_0%,_rgba(152,74,217,0.269104)_16.4%,_rgba(152,74,217,0.184629)_40.24%,_rgba(152,74,217,0.0899885)_75.03%,_rgba(152,74,217,0)_100%)]  to-background pb-[30px]"
      }`}
    >
      {hasBackButton && (
        <button
          onClick={
            useTopBar.onBack
              ? () => {
                  useTopBar.onBack();
                }
              : () => {
                  navigate(-1);
                  console.log("Back button clicked");
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
            home
              ? "justify-start col-span-4 "
              : "justify-center col-start-2 col-span-3"
          } `}
        >
          LearnSnap.in
        </h1>
      )}
      {home ? (
        <div className="col-span-1  flex gap-[10px] items-center justify-end">
          <Link to="/account" className="bg-white rounded-[8px] p-[10px]">
            <FiMenu className="text-[20px] text-primary" />
          </Link>
          <Link to="/profile" className="bg-white rounded-[8px] p-[10px]">
            <CgProfile className="text-[20px] text-primary" />
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TopBar;
