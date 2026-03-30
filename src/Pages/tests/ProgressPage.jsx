import { useLocation, useNavigate } from "react-router";
import Button from "../../Components/Button";
import { getMcqPoints, textEvaluationPayload } from "../../hooks/Points";
import { useEffect, useState } from "react";
import QuizTimer from "../../Components/QuizTimer";
import QuestionCard from "../../Components/QuestionCard";
import { evaluateAnswers } from "../../apis/aiApis";
import toast from "react-hot-toast";

const ProgressPage = () => {
  const storedResponses = JSON.parse(
    sessionStorage.getItem("testResponses") || "[]",
  );

  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname.slice(1));
  const testId = sessionStorage.getItem("testId");
  const userId = JSON.parse(localStorage.getItem("userDetails"))._id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const questions = JSON.parse(sessionStorage.getItem("generatedTest") || "{}");
  const time = (questions?.statistics?.total_questions - 5) * 2;
  console.log("time",time)

  // handleSubmit
  const handleSubmit = async () => {
    const mcqPoints = getMcqPoints(responses, questions.questions);
    const textPayload = textEvaluationPayload(
      responses,
      questions.questions,
      userId,
      testId,
    );

    console.log("mcq:", mcqPoints);
    console.log("payload", textPayload);

    // Start building the result object
    const testResult = {
      ...questions, // spread the full generated test
      mcq_results: mcqPoints, // add mcq results
      text_results: null, // placeholder
      total_score: mcqPoints.total_earned,
      total_possible: mcqPoints.total_possible,
    };

  console.log(textPayload);    
    if (textPayload.text_responses.length > 0) {
      setLoading(true);
      try {
        const response = await evaluateAnswers(textPayload);
        console.log("response from text eval:", response);

        const textScore = parseInt(
          response.evaluation_summary.total_text_score,
        );
        testResult.text_results = response;
        testResult.total_score += textScore;
        testResult.total_possible +=
          response.evaluation_summary.total_max_score;

        console.log("total score", testResult.total_score);
        toast.success("Result generated!");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    // Calculate overall percentage
    testResult.overall_percentage =
      testResult.total_possible > 0
        ? Math.round((testResult.total_score / testResult.total_possible) * 100)
        : 0;

    // Save to sessionStorage
    sessionStorage.setItem("testResult", JSON.stringify(testResult));
    console.log("testResult saved:", testResult);

    navigate("/result");
  };

  // Initialize testResponses with all questions on mount
  useEffect(() => {
    const storedResponses = sessionStorage.getItem("testResponses");

    if (!storedResponses) {
      // Initialize with all questions, no answers
      const initialResponses = questions.questions.map((q) => ({
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
  const handleOptionSelect = (questionSn, optionId, type) => {
    setResponses((prevResponses) => {
      const updatedResponses = prevResponses.map((res) => {
        if (res.question_sn === questionSn) {
          // Update existing question with answer
          return {
            question_sn: questionSn,
            answer: optionId,
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
  return (
    <div className="space-y-[30px] mb-[30px]">
      {location.pathname.slice(1) === "view-progress" ? (
        <>
          <div>
            <p className="H-14 mb-2 text-primary font-bold">
              Checking for Preview
            </p>
          </div>

          <div className="smallShadow bg-white rounded-[20px] p-[20px]">
            <h1 className="font-bold H-20 mb-[15px] ">Preview</h1>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-[15px] ">
              {storedResponses.map((item, index) => (
                <div
                  key={index}
                  className={`smallShadow border   font-bold ${
                    item.answer
                      ? "bg-secondary/80 text-primary border-primary"
                      : "text-text2/30 border-text2/30"
                  } rounded-[10px]  w-full h-[28px] H-10 flex items-center justify-center`}
                  onClick={() => {
                    sessionStorage.setItem(
                      "currentQuestion",
                      item.question_sn - 1,
                    );
                    navigate(-1);
                  }}
                >
                  <span className="">
                    {item.question_sn}
                    <span className="">
                      .{" "}
                      {item.type === "mcq"
                        ? item.type.toUpperCase()
                        : item.type[0].toUpperCase() + item.type.slice(1)}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-[10px]">
            <Button
              color={"white"}
              text={"View All Questions"}
              onClick={() => navigate("/all-questions")}
            />
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex justify-between items-center">
            <h1 className="font-bold text-primary">All Questions</h1>
            <QuizTimer durationInMinutes={time} submit={handleSubmit} />
          </div>

          {questions.questions.map((q) => (
            <QuestionCard
              allPage={true}
              key={q.question_details.question_sn}
              index={q.question_details.question_sn}
              propData={q.question_details}
              onSelectOption={handleOptionSelect}
            />
          ))}
        </>
      )}
      <div className="mt-[-10px]">
        <Button
          text={"Submit"}
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
        />
      </div>
    </div>
  );
};;

export default ProgressPage;
