import { RiHome6Line } from "react-icons/ri";
import { NavLink } from "react-router";

const BottomBar = () => {
  return (
    <div className="bg-white sticky bottom-0 flex justify-around  items-center py-[10px] font-bold H-10 rounded-t-[20px]">
      <NavLink
        to="/"
        className={({ isActive }) => {
          `flex flex-col justify-center items-center ${
            isActive ? "bg-secondary text-primary" : ""
          }`;
        }}
      >
        <RiHome6Line />
        <p>Home</p>
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => {
          `flex flex-col justify-center items-center ${
            isActive ? "bg-secondary text-primary" : ""
          }`;
        }}
      >
        <RiHome6Line />
        <p>Home</p>
      </NavLink>
      <div className="flex flex-col justify-center items-center">
        <RiHome6Line />
        <p>Home</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <RiHome6Line />
        <p>Home</p>
      </div>
    </div>
  );
}

export default BottomBar