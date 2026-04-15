import { useEffect, useRef, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { formatTime } from "../hooks/SmallHooks";
import QuizPopup from "./QuizPopup";
import { useLocation, useNavigate } from "react-router";

const QuizTimer = ({ durationInMinutes, submit }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [openTimeupPopup, setOpenTimeupPopup] = useState(false);
  const intervalRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Guard: don't start if duration is invalid
    if (!durationInMinutes || isNaN(durationInMinutes)) return;

    const totalSeconds = durationInMinutes * 60;
    const storedStart = sessionStorage.getItem("quizStartTime");
    let startTime;

    if (!storedStart) {
      startTime = Date.now();
      sessionStorage.setItem("quizStartTime", startTime);
    } else {
      startTime = Number(storedStart);
    }

    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const remaining = Math.max(totalSeconds - elapsed, 0);
    setTimeLeft(remaining);

    // Clear any existing interval before starting a new one
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(totalSeconds - elapsed, 0);

      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(intervalRef.current);
       
        if (location.pathname.slice(1) == "test") {
          navigate("/all-questions");
        }
         else {setOpenTimeupPopup(true);}
        setTimeout(() => {
          submit?.();
        }, 3000);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [durationInMinutes]); // only re-run if duration changes

  if (timeLeft === null) return null;

  return (
    <div className="flex items-center gap-[5px] bg-[#EEDBFF]/60 py-[5px] px-[7px] rounded-full">
      {openTimeupPopup && (
        <QuizPopup
          data={"Time up!"}
          data2={"Time over, the will be submitted automatically"}
        />
      )}
      <FaRegClock className="text-primary text-[17px]" />
      <h1 className="font-semibold H-12 text-Used text-primary">
        {formatTime(timeLeft)}
      </h1>
    </div>
  );
};

export default QuizTimer;
