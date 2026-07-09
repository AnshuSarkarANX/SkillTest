import { useState, useRef, useEffect, useCallback } from "react";
import {
  LuMic as Mic,
  LuMicOff as MicOff,
  LuVideo as Video,
  LuCircleCheckBig as CheckCircle2,
  LuCircleAlert as AlertCircle,
  LuRefreshCw as RefreshCw,
  LuChevronDown as ChevronDown,
} from "react-icons/lu";
import MicCameraChecker from "../../Components/MicCamChecker";
import Button from "../../Components/Button";
import { useLocation, useNavigate } from "react-router";
const InteviewInstructions = () => {
  const location = useLocation();
  const { sessionId } = location.state || {};
  const navigate = useNavigate();
  const instructions = [
    "Find a quiet spot — background noise makes it harder for the AI to hear you clearly.",
    "Check your mic before you start; you'll be speaking your answers, not typing them.",
    "Keep your internet stable — a mid-answer disconnect is nobody's idea of fun.",
    "Once the interview starts, don't refresh or close the tab — you can't resume from where you left off.",
    "Speak naturally and think out loud if you need a moment — silence for too long moves things along without you.",
    "This is a solo round — no notes, no Googling, no whispering off-screen.",
    "The interview runs up to 60 minutes, questions included — pace yourself, but don't overthink every answer.",
    "Wrap up when the agent wraps up — there's a quick close-out at the end, so don't hang up early.",
  ];
  return (
    <div>
      <h1 className="font-bold H-18">Rules & Instructions</h1>

      <ol className="list-decimal list-inside list">
        {instructions.map((instruction, index) => (
          <li key={index} className="H-16 font-bold text-text2">
            <span className="font-normal H-16">{instruction}</span>
          </li>
        ))}
      </ol>

      <MicCameraChecker onReady={()=>sessionId ? navigate(`/interview/${sessionId}`) : null} />
    
    </div>
  );
};

export default InteviewInstructions;
