import { RiHome6Line } from "react-icons/ri";
import { GoFileDirectory } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router";
import { PiMedal } from "react-icons/pi";

const BottomBar = () => {
  return (
    <div className="bg-white sticky bottom-0 grid grid-cols-4 items-center py-[10px] px-[20px] font-bold H-10 rounded-t-[20px] place-items-center gap-[10px]">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col justify-center items-center p-[10px] rounded-[10px] w-full transition-all duration-300 ${
            isActive ? "bg-secondary text-primary" : ""
          }`
        }
      >
        <RiHome6Line className="text-[20px]" />
        <p className="H-10">Home</p>
      </NavLink>
      <NavLink
        to="/resources"
        className={({ isActive }) =>
          `flex flex-col justify-center items-center rounded-[10px] p-[10px] w-full transition-all duration-300 ${
            isActive ? "bg-secondary text-primary" : ""
          }`
        }
      >
        <GoFileDirectory className="text-[20px]" />
        <p className="H-10">Resources</p>
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col justify-center items-center rounded-[10px] p-[10px] w-full transition-all duration-300 ${
            isActive ? "bg-secondary text-primary" : ""
          }`
        }
      >
        <CgProfile className="text-[20px]" />

        <p className="H-10">Profile</p>
      </NavLink>
      <NavLink
        to="/certificates"
        className={({ isActive }) =>
          `flex flex-col justify-center items-center rounded-[10px] p-[10px] w-full transition-all duration-300 ${
            isActive ? "bg-secondary text-primary" : ""
          }`
        }
      >
        <PiMedal className="text-[20px]" />
        <p className="H-10">Certificates</p>
      </NavLink>
    </div>
  );
}

export default BottomBar