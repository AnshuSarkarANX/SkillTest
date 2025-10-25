/* eslint-disable react/prop-types */
import { useState } from "react";

const QuestionCard = ({ propData, index, onSelectOption }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
    onSelectOption(propData.question_sn, optionId); // Pass question_sn and option_id
  };

  const getOptionClass = (optionId) => {
    if (selectedOption === optionId) {
      return "border-[#C01F10] text-[#CF0000] bg-[#FCF4F3]";
    }
    return "text-Used bg-white";
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
          <ol className="font-bold">
            {/* Image Grid (2 Columns) */}
            <div className="grid grid-cols-2 gap-4">
              {propData?.options?.map((option) => {
                const isImage = option?.option?.startsWith("http");
                return isImage ? (
                  <li
                    key={option?.option_id}
                    className={`border rounded-[10px] overflow-hidden cardShadow cursor-pointer flex items-center justify-center ${getOptionClass(
                      option?.option_id
                    )}`}
                    onClick={() => handleOptionClick(option?.option_id)}
                  >
                    <h1 className="mr-[3px] text-red-600">
                      {option?.option_id}
                    </h1>
                    <img
                      src={option.option}
                      alt={`Option ${option?.option_id}`}
                      className="w-auto h-[140px] py-[20px] rounded-[10px]"
                    />
                  </li>
                ) : null;
              })}
            </div>

            {/* Text List (1 Column) */}
            <div className="grid grid-cols-1">
              {propData?.options?.map((option) => {
                const isImage = option?.option?.startsWith("http");
                return !isImage ? (
                  <li
                    key={option?.option_id}
                    aria-label={`Option ${option?.option_id}`}
                    className={`border rounded-[10px] min-h-[52px] cardShadow mb-4 cursor-pointer ${getOptionClass(
                      option?.option_id
                    )}`}
                    onClick={() => handleOptionClick(option?.option_id)}
                  >
                    <div className="flex items-center min-h-[52px] p-[20px]">
                      <h1 className="mr-3 text-red-600">{option?.option_id}</h1>
                      <h1>{option?.option}</h1>
                    </div>
                  </li>
                ) : null;
              })}
            </div>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;