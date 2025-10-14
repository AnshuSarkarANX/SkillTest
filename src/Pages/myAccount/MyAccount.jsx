import Avatar from "boring-avatars";
import {
  FaUser,
  FaStar,
  FaCertificate,
  FaBook,
  FaInfoCircle,
  FaFileAlt,
} from "react-icons/fa";
import { Link } from "react-router";
import { IoIosArrowForward } from "react-icons/io";

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
    label: "Certificates",
    desc: "View and manage certificates",
    icon: <FaCertificate className="text-primary text-[25px]" />,
    link: "/certificates",
  },
  {
    label: "Add Resources",
    desc: "Add your resources",
    icon: <FaBook className="text-primary text-[25px]" />,
    link: "/add-resource",
  },
  {
    label: "About",
    desc: "About your profile",
    icon: <FaInfoCircle className="text-primary text-[25px]" />,
    link: "#",
  },
  {
    label: "Terms",
    desc: "Read terms and policies",
    icon: <FaFileAlt className="text-primary text-[25px]" />,
    link: "#",
  },
];

export default function Dashboard() {
    const { fullName } = JSON.parse(localStorage.getItem("userDetails")) || "";
    return (
      <>
        {/* Top Card */}
        <div className="rounded-[20px] bg-[linear-gradient(360deg,_rgba(152,74,217,0.81)_0%,_rgba(152,74,217,0.624046)_17.73%,_rgba(152,74,217,0.479094)_39.49%,_rgba(152,74,217,0.304639)_66.28%,_rgba(152,74,217,0.09)_100%)] p-6 flex flex-col items-center">
          <ProfileAvatar name={fullName} />
          <p className="font-bold mt-[15px] text-white H-26">{fullName}</p>
          <div className="flex justify-around mt-[20px] gap-[20px] text-white">
            <div className="text-center">
              <p className="H-20">20</p>
              <p className="H-14">My Certificates</p>
            </div>
            <div className=" w-[2px] bg-gradient-to-b from-white/20 via-white via-50% to-white/20 to-90%"></div>
            <div className="text-center">
              <p className=" H-20">45.5</p>
              <p className="H-14">Average Score</p>
            </div>
          </div>
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
      </>
    );
}
