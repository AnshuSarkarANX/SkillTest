import { useEffect, useState } from "react";
import QuestionCard from "../../Components/QuestionCard";
import Button from "../../Components/Button";
import { FaRegClock } from "react-icons/fa";

const AllQuestionsPage = () => {
    const test = JSON.parse(sessionStorage.getItem("generatedTest"));
     const question = test.questions;

     const [responses, setResponses] = useState([]);
     
         // Initialize testResponses with all questions on mount
         useEffect(() => {
           const storedResponses = sessionStorage.getItem("testResponses");
     
           if (!storedResponses) {
             // Initialize with all questions, no answers
             const initialResponses = question.map((q) => ({
               question_sn: q.question_details.question_sn,
               type: q.question_details.type,
             }));
     
             sessionStorage.setItem(
               "testResponses",
               JSON.stringify(initialResponses)
             );
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
              answer: JSON.stringify(optionId),
              type: type,
            };
          }
          return res;
        });

        // Store in sessionStorage
        sessionStorage.setItem(
          "testResponses",
          JSON.stringify(updatedResponses)
        );
        console.log("this is called! (handleOptionSelect)");
        return updatedResponses;
      });
    };
    
  return (
    <div className="space-y-[20px] mb-[30px]">
      <div className="w-full flex justify-between items-center">
      <h1 className="font-bold text-primary">All Questions</h1>
        <div className="flex items-center gap-[5px] bg-[#EEDBFF]/60 py-[5px] px-[7px] rounded-full">
          <FaRegClock className="text-primary text-[17px]" />
          <h1 className="font-semibold H-12 text-Used text-primary">22:23</h1>
        </div>
      </div>

      {question.map((q) => (
        <QuestionCard
          allPage={true}
          key={q.question_details.question_sn}
          index={q.question_details.question_sn}
          propData={q.question_details}
          onSelectOption={handleOptionSelect}
        />
      ))}
      <Button text={"Submit Now"} />
    </div>
  );
}

export default AllQuestionsPage