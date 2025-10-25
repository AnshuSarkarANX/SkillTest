import Avatar from "boring-avatars";
import { FaEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { formatDate } from "../../hooks/SmallHooks";
import { Link } from "react-router";
import Button from "../../Components/Button";

export const ProfileAvatar = ({ name }) => (
  <Avatar
    size={90}
    name={name}
    variant="beam"
    colors={["#a469f7", "#b39ddb", "#9575cd", "#7e57c2"]}
  />
);
const Profile = () => {
  const {
    fullName,
    email,
    gender,
    dob,
    qualification,
    specialization,
    softSkills,
    techSkills,
  } = JSON.parse(localStorage.getItem("userDetails")) || {};
  return (
    <>
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
      {/*Personal Details*/}
      <div className="mt-4 bg-background rounded-[20px] smallShadow p-[20px] space-y-[20px]">
        <div className="flex items-center justify-between">
          <p className="H-18 font-bold">Personal Details</p>
          <div className=" bg-white p-[7px] pr-[5px] shadow-sm rounded-full">
            <Link to="/edit-profile">
              {" "}
              <FaEdit className="text-CTA" />
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-[20px] bg-white rounded-[20px] shadow-md p-[15px] ">
          <div className=" bg-light-purple shadow-sm rounded-[10px] h-[40px] w-[40px] flex items-center justify-center">
            <CgProfile className="text-primary text-[20px]" />
          </div>
          <p className="H-16 font-bold ">{fullName}</p>
        </div>
        <div className="flex items-center gap-[20px] bg-white rounded-[20px] shadow-md p-[15px] ">
          <div className=" bg-light-purple shadow-sm rounded-[10px] h-[40px] w-[40px] flex items-center justify-center">
            <CgProfile className="text-primary text-[20px]" />
          </div>
          <p className="H-16 font-bold ">{gender}</p>
        </div>
        <div className="flex items-center gap-[20px] bg-white rounded-[20px] shadow-md p-[15px] ">
          <div className=" bg-light-purple shadow-sm rounded-[10px] h-[40px] w-[40px] flex items-center justify-center">
            <CgProfile className="text-primary text-[20px]" />
          </div>
          <p className="H-16 font-bold ">
            {dob ? formatDate(dob, "d", "/") : "N/A"}
          </p>
        </div>
        <div className="flex items-center gap-[20px] bg-white rounded-[20px] shadow-md p-[15px] ">
          <div className=" bg-light-purple shadow-sm rounded-[10px] h-[40px] w-[40px] flex items-center justify-center">
            <CgProfile className="text-primary text-[20px]" />
          </div>
          <p className="H-16 font-bold ">{qualification}</p>
        </div>
        <div className="flex items-center gap-[20px] bg-white rounded-[20px] shadow-md p-[15px] ">
          <div className=" bg-light-purple shadow-sm rounded-[10px] h-[40px] w-[40px] flex items-center justify-center">
            <CgProfile className="text-primary text-[20px]" />
          </div>
          <p className="H-16 font-bold ">{specialization}</p>
        </div>
      </div>
      {/*Soft Skills*/}
      <div className="mt-4 bg-background rounded-[20px] smallShadow p-[20px] space-y-[20px]">
        <div className="flex items-center justify-between">
          <p className="H-18 font-bold">Soft Skills</p>
          <div className=" bg-white p-[7px] pr-[5px] shadow-sm rounded-full">
            <Link to="/edit/soft-skills">
              <FaEdit className="text-CTA" />
            </Link>
          </div>
        </div>
        <div className="max-h-[500px] overflow-y-auto no-scrollbar space-y-[20px]">
          {softSkills?.map((skill, index) => (
            <div
              className="flex items-center gap-[20px] bg-white rounded-[20px] shadow-md p-[15px] "
              key={index}
            >
              <div className=" bg-light-purple shadow-sm rounded-[10px] h-[40px] w-[40px] flex items-center justify-center">
                <CgProfile className="text-primary text-[20px]" />
              </div>
              <p className="H-16 font-bold ">{skill}</p>
            </div>
          ))}
        </div>
      </div>
      {/*Tech Skills*/}
      <div className="mt-4 bg-background rounded-[20px] smallShadow p-[20px] space-y-[20px] mb-[30px]">
        <div className="flex items-center justify-between">
          <p className="H-18 font-bold">Tech Skills</p>
          <div className=" bg-white p-[7px] pr-[5px] shadow-sm rounded-full">
            <Link to="/edit/tech-skills">
              <FaEdit className="text-CTA" />
            </Link>
          </div>
        </div>
        <div className="max-h-[500px] overflow-y-auto no-scrollbar space-y-[20px]">
          {techSkills?.map((skill, index) => (
            <div
              className="flex items-center gap-[20px] bg-white rounded-[20px] shadow-md p-[15px] "
              key={index}
            >
              <div className=" bg-light-purple shadow-sm rounded-[10px] h-[40px] w-[40px] flex items-center justify-center">
                <CgProfile className="text-primary text-[20px]" />
              </div>
              <p className="H-16 font-bold ">{skill}</p>
            </div>
          ))}
        </div>
      </div>
      <Button
        text="Log Out"
        onClick={() => {
          localStorage.clear();
          setTimeout(() => {
            window.location.reload();
          }, 200);
        }}
      />
    </>
  );
};

export default Profile;