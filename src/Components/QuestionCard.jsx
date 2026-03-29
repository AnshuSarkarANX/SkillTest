import { useEffect, useState } from "react";

const QuestionCard = ({
  allPage = false,
  propData,
  onSelectOption,
  resultMode = false, // NEW
  mcqResult = null, // NEW - { user_answer, correct_answer, points_earned }
  textResult = null, // NEW - { total_score, max_score, overall_feedback, criterion_scores, word_count }
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const responsesData = JSON.parse(
      sessionStorage.getItem("testResponses") || "[]",
    );
    const responseObj = responsesData.find(
      (r) => r.question_sn == propData.question_sn,
    );

    if (responseObj && responseObj.answer) {
      setSelectedOption(responseObj.answer);
    } else {
      setSelectedOption(null);
    }
  }, []);

  const handleOptionClick = (optionId) => {
    if (resultMode) return; // lock in result mode
    setSelectedOption(optionId);
    onSelectOption(propData.question_sn, optionId, propData.type);
  };

  // Determine option style in result mode
  const getResultOptionStyle = (optionId) => {
    if (!resultMode || !mcqResult) return "text-text2 bg-white border-text2/40";

    const isCorrect = optionId === mcqResult.correct_answer;
    const isUserAnswer = optionId === mcqResult.user_answer;

    if (isCorrect) return "border-green-500 text-green-600 bg-green-50"; // always highlight correct
    if (isUserAnswer && !isCorrect)
      return "border-red-400 text-red-500 bg-red-50"; // user was wrong
    return "text-text2 bg-white border-text2/40";
  };

  return (
    <div className="pb-[15px] font-manrope">
      <div className="pb-[15px] p-[20px] cardShadow rounded-[10px] min-h-[414px] bg-white smallShadow h-fit">
        {/* Question header */}
        <div className="flex justify-between items-center pb-[20px]">
          <h1 className="font-semibold font-manrope H-18 text-Used">
            {allPage && `${propData?.question_sn}. `} {propData?.question}
          </h1>
          {/* Score badge in result mode */}
          {resultMode && mcqResult && (
            <span
              className={`text-sm font-bold px-2 py-1 rounded-full ml-2 shrink-0 ${
                mcqResult.points_earned > 0
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {mcqResult.points_earned}/{propData.points}
            </span>
          )}
          {resultMode && textResult && (
            <span className="text-sm font-bold px-2 py-1 rounded-full ml-2 shrink-0 bg-primary/10 text-primary">
              {textResult.total_score}/{textResult.max_score}
            </span>
          )}
        </div>

        <div className="h-full pt-[10px] se:pt-[0px]">
          {/* TEXT QUESTION */}
          {propData?.type === "text" && !resultMode && (
            <textarea
              className="w-full min-h-[250px] h-full border border-text2/40 rounded-[15px] p-[20px]"
              placeholder="Write your answer here..."
              value={selectedOption || ""}
              onChange={(e) => handleOptionClick(e.target.value)}
            />
          )}

          {/* TEXT RESULT MODE */}
          {propData?.type === "text" && resultMode && (
            <div className="flex flex-col gap-[12px]">
              <div className="border border-text2/40 rounded-[15px] p-[20px]">
                <p className="text-sm text-text2 font-semibold mb-1">
                  Your Answer:
                </p>
                <p className="H-14 text-Used">
                  {selectedOption || "No answer provided"}
                </p>
              </div>
              {textResult && (
                <div className="border border-primary/30 rounded-[15px] p-[20px] bg-secondary/10">
                  <p className="text-sm text-primary font-semibold mb-1">
                    Feedback:
                  </p>
                  <p className="H-14 text-Used mb-3">
                    {textResult.overall_feedback}
                  </p>
                  {textResult.strengths?.length > 0 && (
                    <div className="mb-2">
                      <p className="text-sm font-semibold text-green-600 mb-1">
                        Strengths:
                      </p>
                      {textResult.strengths.map((s, i) => (
                        <p key={i} className="H-14 text-Used">
                          • {s}
                        </p>
                      ))}
                    </div>
                  )}
                  {textResult.improvements?.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-red-500 mb-1">
                        Improvements:
                      </p>
                      {textResult.improvements.map((imp, i) => (
                        <p key={i} className="H-14 text-Used">
                          • {imp}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* MCQ OPTIONS */}
          <div className="grid grid-cols-1 font-bold">
            {propData?.options?.map((option) => (
              <p
                key={option?.option_id}
                aria-label={`Option ${option?.option_id}`}
                className={`border rounded-[15px] min-h-[52px] cardShadow mb-4 ${
                  resultMode ? "cursor-default" : "cursor-pointer"
                } ${
                  resultMode
                    ? getResultOptionStyle(option?.option_id)
                    : selectedOption == option?.option_id
                      ? "border-primary text-primary bg-secondary/20"
                      : "text-text2 bg-white border-text2/40"
                }`}
                onClick={() => handleOptionClick(option?.option_id)}
              >
                <div className="flex items-center min-h-[52px] p-[20px]">
                  <h1>{option?.option}</h1>
                </div>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
