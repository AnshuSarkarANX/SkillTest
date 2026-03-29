import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { formatTime } from "../hooks/SmallHooks";

const QuizTimer = ({ durationInMinutes, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const totalSeconds = durationInMinutes * 60;
    const storedStart = localStorage.getItem("quizStartTime");

    if (!storedStart) {
      localStorage.setItem("quizStartTime", Date.now());
      setTimeLeft(totalSeconds);
    } else {
      const elapsed = Math.floor((Date.now() - Number(storedStart)) / 1000);
      setTimeLeft(Math.max(totalSeconds - elapsed, 0));
    }
  }, [durationInMinutes]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (timeLeft === null) return null;

  return (
    <div className="flex items-center gap-[5px] bg-[#EEDBFF]/60 py-[5px] px-[7px] rounded-full">
      <FaRegClock className="text-primary text-[17px]" />
      <h1 className="font-semibold H-12 text-Used text-primary">
        {formatTime(timeLeft)}
      </h1>
    </div>
  );
};

export default QuizTimer;
