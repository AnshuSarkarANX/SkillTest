import { useCallback, useEffect, useState } from "react";

const QuestionCard = ({ propData, onSelectOption }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Check sessionStorage for response using questionSn

    const testId = propData.testId || "";
    const email = localStorage.getItem("email") || "";
    //const key = `${testId}_${email}`;

    const responsesData = JSON.parse(
      sessionStorage.getItem("testResponses") || "[]"
    );
    // const responses = responsesData[key] || [];
    console.log("responses", responsesData);
    const responseObj = responsesData.find(
      (r) => r.question_sn === propData.question_sn
    );

    if (responseObj && responseObj.answer) {
      console.log("res obj", responseObj);
      setSelectedOption(responseObj.answer);
      // onSelectOption(responseObj.question_sn, JSON.parse(responseObj.answer));
    } else {
      setSelectedOption(selectedOption || null);
    }
  }, []);

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
    onSelectOption(propData.question_sn, optionId, propData.type); // Pass question_sn and option_id
  };

  return (
    <div className="pb-[15px] font-manrope">
      <div className="pb-[15px] p-[20px] cardShadow rounded-[10px] min-h-[414px] bg-white smallShadow">
        <div className="flex justify-between items-center h-[34px] pb-[20px] pt-[20px]">
          <h1 className="font-semibold font-manrope H-18 text-Used">
            {propData?.question}
          </h1>
        </div>
        <div className="h-auto pt-[10px] se:pt-[0px]">
          {/* Text List (1 Column) */}
          <div className="grid grid-cols-1 font-bold">
            {propData?.options?.map((option) => (
              <p
                key={option?.option_id}
                aria-label={`Option ${option?.option_id}`}
                className={`border  rounded-[15px] min-h-[52px] cardShadow mb-4 cursor-pointer ${
                  selectedOption == option?.option_id
                    ? "border-primary text-primary bg-secondary/20"
                    : "text-text2 bg-white border-text2/40"
                }`}
                onClick={() => handleOptionClick(option?.option_id)}
              >
                <div className="flex items-center min-h-[52px] p-[20px]">
                  {/*<h1 className="mr-3 text-red-600">{option?.option_id}</h1>*/}
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
