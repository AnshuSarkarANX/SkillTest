import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import QuestionCard from "../../Components/QuestionCard";
import QuizPopup from "../../Components/QuizPopup";
import Button from "../../Components/Button";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router";

const TestPage = () => {
  const time = 50;
  const [timeLeft, setTimeLeft] = useState(time * 60);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmitPop, setIsSubmitPop] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [responses, setResponses] = useState([]);
  const loading = false;
  const error = false;

  const question = [
    {
      question_details: {
        question_sn: 151,
        question: "Test q2",
        type: "mcq",
        options: [
          { option: "A2", option_id: 1 },
          { option: "b", option_id: 2 },
          { option: "c", option_id: 3 },
          { option: "d", option_id: 4 },
        ],
        difficulty: null,
        points: 10,
      },
    },
    {
      question_details: {
        question_sn: 152,
        question: "test q3",
        type: "mcq",
        options: [
          { option: "a3", option_id: 1 },
          { option: "b3", option_id: 2 },
          { option: "c3", option_id: 3 },
          { option: "d4", option_id: 4 },
        ],
        difficulty: null,
        points: 10,
      },
    },
    {
      question_details: {
        question_sn: 153,
        question: "Test q4",
        type: "text",
        options: [
          { option: "a4", option_id: 1 },
          { option: "b4", option_id: 2 },
          { option: "c4", option_id: 3 },
          { option: "d4", option_id: 4 },
        ],
        difficulty: null,
        points: 10,
      },
    },
    {
      question_details: {
        question_sn: 150,
        question: "test",
        type: "mcq",
        options: [
          { option: "A", option_id: 1 },
          { option: "B", option_id: 2 },
          { option: "C", option_id: 3 },
          { option: "D", option_id: 4 },
        ],
        difficulty: null,
        points: 10,
      },
    },
  ];

  // Initialize testResponses with all questions on mount
  useEffect(() => {
    const storedResponses = sessionStorage.getItem("testResponses");

    if (!storedResponses) {
      // Initialize with all questions, no answers
      const initialResponses = question.map((q) => ({
        question_sn: q.question_details.question_sn,
        type: q.question_details.type,
      }));

      sessionStorage.setItem("testResponses", JSON.stringify(initialResponses));
      setResponses(initialResponses);
    } else {
      // Load existing responses from sessionStorage
      setResponses(JSON.parse(storedResponses));
    }
  }, []); // Empty dependency array - runs once on mount

  useEffect(() => {
    const startNewQuiz = () => {
      const quizDuration = Number(time) * 60;
      localStorage.setItem("quizStartTime", Date.now());
      setTimeLeft(quizDuration);
    };

    const quizInitTime = localStorage.getItem("quizStartTime");

    if (!quizInitTime) {
      startNewQuiz();
    } else {
      const elapsedTime = Math.floor(
        (Date.now() - Number(quizInitTime)) / 1000
      );
      setTimeLeft(Math.max(Number(time) * 60 - elapsedTime, 0));
    }
  }, [time]);

  useEffect(() => {
    if (timeLeft <= 0) {
      openTimeupPopup();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          openTimeupPopup();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  const openTimeupPopup = () => {
    //setIsTimeUp(true);
  };
  const closeTimeupPopup = () => setIsTimeUp(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const openSubmitPopup = () => setIsSubmitPop(true);
  const closeSubmitPopup = () => setIsSubmitPop(false);

  const handleOptionSelect = (questionSn, optionId, type) => {
    setResponses((prevResponses) => {
      const updatedResponses = prevResponses.map((res) => {
        if (res.question_sn === questionSn) {
          // Update existing question with answer
          return {
            question_sn: questionSn,
            answer: JSON.stringify(optionId),
            type: type,
          };
        }
        return res;
      });

      // Store in sessionStorage
      sessionStorage.setItem("testResponses", JSON.stringify(updatedResponses));
      console.log("this is called! (handleOptionSelect)");
      return updatedResponses;
    });
  };

  const finalResponse = {
    quiz_sn: 1,
    user_id: 1123,
    user_category: 54,
    responses: responses,
  };
  const userId = 56;
  const quizSn = 675;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = question.length;
  const navigate = useNavigate();

  return (
    <div className="px-[2%] sm:px-[4%] lg:px-[5%] bg-Background">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="pt-[30px] flex flex-row justify-between items-center pb-[30px]">
            <div
              className="bg-Reddish h-[44px] w-[44px] rounded-[25px] cardShadow flex justify-center items-center cursor-pointer"
              onClick={openPopup}
            >
              {isPopupOpen && (
                <QuizPopup
                  closePopup={closePopup}
                  data={question?.quiz?.errormessage}
                  Sn={quizSn}
                  body={finalResponse}
                />
              )}
            </div>
          </div>
          <div className="rounded-[5px] h-[30px] flex items-center justify-between mb-4">
            <div className="flex flex-col items-center">
              <span className="H-14 mb-2 text-primary font-bold">
                Questions {currentQuestion + 1} of {totalQuestions}
              </span>
            </div>
            <div className="flex items-center gap-[5px] bg-[#EEDBFF]/60 py-[5px] px-[7px] rounded-full">
              <FaRegClock className="text-primary text-[17px]" />
              <h1 className="font-semibold H-12 text-Used text-primary">
                {formatTime(timeLeft)}
              </h1>
            </div>
          </div>

          {/* Slider for single question */}
          <div>
            <QuestionCard
              key={currentQuestion}
              index={currentQuestion}
              propData={question[currentQuestion]?.question_details}
              onSelectOption={handleOptionSelect}
            />
          </div>

          {/* Navigation Buttons at the bottom */}
          <div className="w-full flex flex-row justify-between items-center mt-4 mb-6 gap-2">
            <button
              className={`flex items-center justify-center bg-white text-CTA border-CTA border border-solid rounded-full h-12 font-bold p-[15px] transition-colors duration-300 ${
                currentQuestion === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-opacity-80"
              }`}
              onClick={() =>
                setCurrentQuestion((prev) => Math.max(prev - 1, 0))
              }
              disabled={currentQuestion === 0}
            >
              <MdArrowBackIosNew className="text-xl" />
            </button>
            <div className="w-[50%]">
              <Button
                text="View Progress"
                color="white"
                onClick={() => {
                  /* Implement view progress logic here */
                  navigate("/view-progress");
                }}
              />
            </div>
            <button
              className={`flex items-center justify-center bg-white text-CTA border-CTA border border-solid rounded-full h-12 font-bold p-[15px] transition-colors duration-300 ${
                currentQuestion === totalQuestions - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-opacity-80"
              }`}
              onClick={() =>
                setCurrentQuestion((prev) =>
                  Math.min(prev + 1, totalQuestions - 1)
                )
              }
              disabled={currentQuestion === totalQuestions - 1}
            >
              <MdArrowBackIosNew className="text-xl rotate-180" />
            </button>
          </div>
          {isSubmitPop && (
            <QuizPopup
              closePopup={closeSubmitPopup}
              data={question?.quiz?.submissionmessage}
              Sn={quizSn}
              body={finalResponse}
            />
          )}
          {isTimeUp && (
            <QuizPopup
              closePopup={closeTimeupPopup}
              data={"Time up!"}
              data2={question?.quiz?.timeupmessage}
              Sn={quizSn}
              body={finalResponse}
              timeup={"Over"}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TestPage;

function setCurrentQuestionId(testId, email, questionId) {
  const key = `${testId}_${email}`;
  const data = JSON.parse(sessionStorage.getItem("currentQuestionIds") || "{}");
  data[key] = questionId;
  sessionStorage.setItem("currentQuestionIds", JSON.stringify(data));
}
