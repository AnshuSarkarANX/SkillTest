import { useEffect } from "react";
import QuestionCard from "../../Components/QuestionCard";
import { bottomBar, topBar } from "../../state/store";
import Button from "../../Components/Button";
import { useNavigate } from "react-router";

const Result = () => {
    const testResult = JSON.parse(sessionStorage.getItem("testResult"));
    const useTopBar = topBar((state) => state);
const navigate = useNavigate()
    const useBottomBar = bottomBar()
    useEffect(() => {
      useTopBar.setHasBackButton(false);
      useBottomBar.setActive(false);
    }, []);
    useEffect(() => {
  window.history.pushState(null, "", window.location.href);
  const handlePopState = () => {
    window.history.pushState(null, "", window.location.href);
  };

  window.addEventListener("popstate", handlePopState);

  return () => window.removeEventListener("popstate", handlePopState);
}, []);



  return (
    <div className="space-[30px] mb-[30px]">
      {testResult.questions.map((q) => (
        <QuestionCard
          allPage={true}
          key={q.question_details.question_sn}
          propData={q.question_details}
          resultMode={true}
          mcqResult={
            q.question_details.type === "mcq"
              ? testResult.mcq_results.results[q.question_details.question_sn]
              : null
          }
          textResult={
            q.question_details.type === "text"
              ? testResult.text_results?.evaluations?.find(
                  (e) => e.question_sn === q.question_details.question_sn,
                )
              : null
          }
          onSelectOption={() => {}} // no-op in result mode
        />
      ))}
      <Button text={"Go to Home"} color={"white"}
      onClick={()=>{sessionStorage.clear();
        navigate("/")
      }}  />
    </div>
  );
}

export default Result