/* eslint-disable no-unused-vars */
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router";

import toast from "react-hot-toast";

/* eslint-disable react/prop-types */
const QuizPopup = ({
  closePopup,
  data,
  onConfirm,
  data2,
  body,
  sn,
  timeup,
}) => {
  const navigate = useNavigate();
  const question = JSON.parse(localStorage.getItem("quizQuestion"));
  const loading = false;
  const error = false
  

  const handleBackPress = useCallback(() => {
    window.history.pushState(null, null, window.location.href);
  }, []);

  useEffect(() => {
    if (timeup === "Over") {
      window.history.pushState(null, null, window.location.href);
      window.removeEventListener("popstate", handleBackPress);
    }

    return () => {
      window.removeEventListener("popstate", handleBackPress);
    };
  }, [data, handleBackPress, timeup]);

  const handleSubmit = async () => {
    console.log("submitted")
  };

  useEffect(() => {
   
  }, [ navigate, sn, question?.quiz?.sn]);

  return (
    <div className="fixed inset-0 z-10 bg-[rgba(31,31,31,0.7)] flex justify-center items-center animate-fadeIn">
      <div
        className="w-[330px] min-h-fit bg-white rounded-[10px] cardShadow animate-slideIn p-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        {data === "Time up!" ? (
          <>
            <h2 className="H-20 font-manrope font-bold pb-[15px]">{data}</h2>
            <div className="grid">
              <h1 className="font-monorope font-normal H-16">{data2}</h1>
              <button
                onClick={handleSubmit}
                className="w-full bg-CTA text-white rounded-[5px] h-fit font-manrope font-bold py-[10px] text-center mt-[15px]"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="H-20 font-bold pb-[30px]">{data}</h2>
            <div className="grid gap-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-CTA text-white rounded-[5px] h-fit font-bold py-[10px] text-center"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Yes"}
              </button>
              <button
                onClick={closePopup}
                className="w-full text-CTA rounded-[5px] border-CTA border-[1px] h-fit py-[10px] font-bold"
              >
                No
              </button>
            </div>
          </>
        )}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default QuizPopup;
