import { useEffect, useState } from "react";
import { bottomBar} from "./state/store";
import { CiSearch } from "react-icons/ci";
import Button from "./Components/Button";
import Specialization from "./Pages/onboarding/Specialization";
import ResourceCard from "./Components/ResourceCard";
import { useNavigate } from "react-router";
import { getProfile } from "./apis/userApis";
import toast from "react-hot-toast";
import { AiOutlineLaptop } from "react-icons/ai";
import { RiSpeakAiLine } from "react-icons/ri";
import { getHistory } from "./apis/resultApis";
import { getScoreColor } from "./hooks/SmallHooks";
function App() {
  const useBottomBar = bottomBar((state) => state);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [pastTests, setPastTests] = useState([]);

  useEffect(() => {
    useBottomBar.setActive(true);
  }, []);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const techSkills = (userDetails?.techSkills || []).map((skill) => ({
    label: skill,
    type: "tech",
  }));
  const softSkills = (userDetails?.softSkills || []).map((skill) => ({
    label: skill,
    type: "soft",
  }));
  const skills = [...techSkills.slice(0, 7), ...softSkills.slice(0, 3)];

  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem("email");
      const storedUserDetails = localStorage.getItem("userDetails");

      if (!email) {
        console.log("No email found");
        return;
      }

      if (storedUserDetails) {
        console.log("User details already cached");
        return;
      }

      try {
        const data = await getProfile(email);
        localStorage.setItem("userDetails", JSON.stringify(data));
      } catch (error) {
        toast.error("Error fetching user details, please log in again");
        console.error(error);
      }
    };
    +fetchProfile();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getHistory(3);
      if (data.history.length > 0) {
        setPastTests(data.history);
      }
    };
    fetchHistory();
  }, []);
  return (
    <div className="space-y-[40px]">
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--text2)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="bg-gradient-to-b from-secondary from-50%  to-background px-[20px] pt-[30px]">
        <div className="H-26 font-bold ">
          Welcome, {userDetails ? userDetails?.fullName : ""}
          <br />
          Get your skills tested by <p className="text-primary">SkillTest</p>
        </div>
      </div>
      {/*Skills*/}
      <div className="px-[20px] space-y-[20px]">
        <div className="H-18 font-bold ">Choose a skill to start the test</div>

        <div className="grid grid-cols-3 gap-[10px]  w-full">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-[5px] px-[10px] py-[15px] rounded-[10px] bg-white border smallShadow cursor-pointer ${
                selectedIndex === index ? "border-primary" : "border-white"
              }`}
              onClick={() => {
                setSelectedIndex(index);
                sessionStorage.setItem("selectedSkill", skill.label);
                setTimeout(() => navigate(`/process`), 200);
              }}
            >
              {skill.type === "soft" ? (
                <RiSpeakAiLine
                  style={{ fill: "url(#iconGradient)", fontSize: "28px" }}
                />
              ) : (
                <AiOutlineLaptop
                  style={{ fill: "url(#iconGradient)", fontSize: "28px" }}
                />
              )}
              <p className="H-14 font-bold text-center">{skill.label}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto w-[130px]">
          <Button text="View More" onClick={() => navigate("/skills")} />
        </div>
        {pastTests.length > 0 && (
          <>
            <div className="H-18 font-bold ">Past Tests</div>
            <div className="flex flex-col gap-[14px] mb-[30px]">
              {pastTests.map((test) => {
                const { text: scoreText, bg: scoreBg } = getScoreColor(
                  test.overallPercentage,
                );
                return (
                  <div
                    key={test._id}
                    onClick={() =>
                      test.hasDetailedResult &&
                      navigate(`/result/${test.testResultId}`)
                    }
                    className={`bg-white smallShadow rounded-[16px] p-[18px] flex items-center gap-[16px] ${
                      test.hasDetailedResult
                        ? "cursor-pointer active:scale-[0.98] transition-transform"
                        : "opacity-70"
                    }`}
                  >
                    {/* Score Circle */}
                    <div
                      className={`w-[40px] h-[40px] rounded-full border-[2px] ${scoreBg}  border-opacity-30 flex items-center justify-center flex-shrink-0`}
                      style={{ borderColor: "currentColor" }}
                    >
                      <span className={`font-bold H-14 text-white`}>
                        {test.overallPercentage}%
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="H-15 font-semibold text-text truncate">
                        {test.skill}
                      </p>
                      <p className="H-12 text-text2 mt-[2px]">{test.level}</p>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-100 rounded-full h-[4px] mt-[8px]">
                        <div
                          className={`${scoreBg} h-[4px] rounded-full transition-all duration-700`}
                          style={{ width: `${test.overallPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Right badge */}
                    <div className="flex-shrink-0 text-right">
                      {test.hasDetailedResult ? (
                        <span className="H-12 text-primary font-semibold">
                          View →
                        </span>
                      ) : (
                        <span className="H-11 text-text2 bg-gray-100 rounded-full px-[10px] py-[4px]">
                          Expired
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
