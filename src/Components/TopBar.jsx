import { useEffect, useState } from "react";
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
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;

        // Add hysteresis: different thresholds for scrolling down vs up
        if (scrollY > 100) {
          setIsScrolled(true);
        } else if (scrollY < 60) {
          setIsScrolled(false);
        }
        // Between 60-100px: maintain current state (no change)
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
    useEffect(() => {
      useTopBar.setOnBack(null);
    }, [location]);
    return (
      <div
        className={`grid grid-cols-5 justify-between items-center H-12 sticky top-0  z-[10]  py-[15px] px-[20px] ease-in-out  bg-white  duration-300 ${
          home ? "transition-none" : "mb-[30px] transition-[margin]"
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
            {["profile", "account", "skills"].includes(
              location.pathname.slice(1),
            )
              ? location.pathname[1].toUpperCase() + location.pathname.slice(2)
              : "skill.test"}
          </h1>
        )}
        {home ? (
          <div className="col-span-1  flex gap-[10px] items-center justify-end">
            <Link
              to="/account"
              className="bg-white rounded-[8px] p-[10px]"
              title="Account"
            >
              <FiMenu className="text-[20px] text-primary" />
            </Link>
            <Link
              to="/profile"
              className="bg-white rounded-[8px] p-[10px]"
              title="Profile"
            >
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
