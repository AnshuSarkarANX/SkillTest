import { useEffect, useState } from "react";

import { FaRegClock } from "react-icons/fa";
import QuestionCard from "../../Components/QuestionCard";
import QuizPopup from "../../Components/QuizPopup";
import Button from "../../Components/Button";
import { MdArrowBackIosNew } from "react-icons/md";
const TestPage = () => {
      
    const time = 50;
    const [timeLeft, setTimeLeft] = useState(time * 60);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSubmitPop, setIsSubmitPop] = useState(false);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [responses, setResponses] = useState([]);
    const loading = false;
    const error = false;
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

    const openTimeupPopup = () => {//setIsTimeUp(true);
        }
    const closeTimeupPopup = () => setIsTimeUp(false);
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    const openSubmitPopup = () => setIsSubmitPop(true);
    const closeSubmitPopup = () => setIsSubmitPop(false);

    const handleOptionSelect = (questionSn, optionId) => {
      setResponses((prevResponses) => {
        const existingResponseIndex = prevResponses.findIndex(
          (res) => res.question_sn === questionSn
        );

        if (existingResponseIndex >= 0) {
          const updatedResponses = [...prevResponses];
          updatedResponses[existingResponseIndex] = {
            question_sn: questionSn,
            answer: JSON.stringify(optionId),
          };
          return updatedResponses;
        }
        return [
          ...prevResponses,
          { question_sn: questionSn, answer: JSON.stringify(optionId) },
        ];
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

      const question = [
        {
          question_details: {
            question_sn: 151,
            question: "Test q2",
            type: "mcq",
            options: [
              {
                option: "A2",
                option_id: 1,
              },
              {
                option: "b",
                option_id: 2,
              },
              {
                option: "c",
                option_id: 3,
              },
              {
                option: "d",
                option_id: 4,
              },
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
              {
                option: "a3",
                option_id: 1,
              },
              {
                option: "b3",
                option_id: 2,
              },
              {
                option: "c3",
                option_id: 3,
              },
              {
                option: "d4",
                option_id: 4,
              },
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
              {
                option: "a4",
                option_id: 1,
              },
              {
                option: "b4",
                option_id: 2,
              },
              {
                option: "c4",
                option_id: 3,
              },
              {
                option: "d4",
                option_id: 4,
              },
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
              {
                option: "A",
                option_id: 1,
              },
              {
                option: "B",
                option_id: 2,
              },
              {
                option: "C",
                option_id: 3,
              },
              {
                option: "D",
                option_id: 4,
              },
            ],
            difficulty: null,
            points: 10,
          },
        },
      ];
      
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = question.length;
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
            <div className="border-Used border-[1px] rounded-[5px] h-[30px] min-w-[90px] bg-white flex items-center justify-center">
              <div className="pr-[5px] pl-[10px]">
                <FaRegClock className="text-CTA text-[17px]" />
              </div>

              <h1 className="py-[5px] H-12 text-Used font-medium text-center pr-[5px]">
                {formatTime(timeLeft)}
              </h1>
            </div>
          </div>

          {/* Questions Progress */}
          <div className="flex flex-col items-center mb-4">
            <span className="font-bold text-lg mb-2">
              Questions {currentQuestion + 1} of {totalQuestions}
            </span>
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
              className={`flex items-center justify-center bg-white text-CTA border-CTA border border-solid rounded-[10px] h-12 font-bold p-[20px] transition-colors duration-300 ${
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
            <Button
              text="View Progress"
              color="white"
              onClick={() => {
                /* Implement view progress logic here */
              }}
              style={{ width: "32%" }}
            />
            <button
              className={`flex items-center justify-center bg-white text-CTA border-CTA border border-solid rounded-full h-12  font-bold p-[15px] transition-colors duration-300 ${
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
          {/*<Button text={"Submit "} onClick={openSubmitPopup}/>*/}
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