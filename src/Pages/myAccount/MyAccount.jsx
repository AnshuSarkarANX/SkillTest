import Avatar from "boring-avatars";
import {
  FaUser,
  FaStar,
  FaCertificate,
  FaBook,
  FaInfoCircle,
  FaFileAlt,
} from "react-icons/fa";
import { GoPasskeyFill } from "react-icons/go";
import { Link } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import Button from "../../Components/Button";

// Avatar based on name
const ProfileAvatar = ({ name }) => (
  <Avatar
    size={90}
    name={name}
    variant="beam"
    colors={["#a469f7", "#b39ddb", "#9575cd", "#7e57c2"]}
  />
);

// Data array for cards
const cards = [
  {
    label: "Profile",
    desc: "Update your info, profile picture, and personal details",
    icon: <FaUser className="text-primary text-[25px]" />,
    link: "/profile",
  },
  {
    label: "Skills",
    desc: "Update your skills and expertise",
    icon: <FaStar className="text-primary text-[25px]" />,
    link: "/skills",
  },

  {
    label: "Past Tests",
    desc: "Test you have attended in past",
    icon: <FaInfoCircle className="text-primary text-[25px]" />,
    link: "/past-tests",
  },
  {
    label: "Your API Key",
    desc: "Add or edit your api key",
    icon: <GoPasskeyFill className="text-primary text-[25px]" />,
    link: "#",
  },
  {
    label: "About",
    desc: "About your profile",
    icon: <FaInfoCircle className="text-primary text-[25px]" />,
    link: "#",
  },
];
const handleLogout = () => {
  localStorage.clear();
  window.location.reload();
};

export default function Dashboard() {
  const { fullName } = JSON.parse(localStorage.getItem("userDetails")) || "";
  return (
    <>
      {/* Top Card */}
      <div className="rounded-[20px] bg-[linear-gradient(360deg,_rgba(255,109,31,0.81)_0%,_rgba(255,109,31,0.624046)_17.73%,_rgba(255,109,31,0.479094)_39.49%,_rgba(255,109,31,0.304639)_66.28%,_rgba(255,109,31,0.09)_100%)] p-6 flex flex-col items-center">
        <ProfileAvatar name={fullName} />
        <p className="font-bold mt-[15px] text-white H-26">{fullName}</p>
      </div>
      {/* Bottom List */}
      <div className="mt-4">
        {cards.map((card) => (
          <Link to={card.link} key={card.label}>
            <div className="flex justify-between rounded-[15px] bg-white p-4 mb-4 smallShadow hover:bg-background items-center">
              <div className="flex items-center ">
                {card.icon}
                <div className="ml-3">
                  <div className="font-bold">{card.label}</div>
                  <div className="text-text2 H-10">{card.desc}</div>
                </div>
              </div>
              <div>
                <IoIosArrowForward />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Button text="Logout" onClick={() => handleLogout()} />
    </>
  );
}
