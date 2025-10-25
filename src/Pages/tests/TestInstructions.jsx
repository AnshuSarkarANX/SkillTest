import { useNavigate } from "react-router";
import Button from "../../Components/Button";

const TestInstructions = () => {
    const instructions = [
      "Ensure a stable internet connection during the exam.",
      "Do not refresh or close the exam window once started.",
      "Follow the time limit strictly—no extra time will be given.",
      "Maintain academic honesty (no external help allowed).",
    ];
    const navigate = useNavigate();
    const handleStartTest = () => {
      navigate("/test");
    };
  return (
    <div className="space-y-[20px] w-full">
      <h1 className="font-bold H-18">Rules & Instructions</h1>
      <ol className="list-decimal list-inside list">
        {instructions.map((instruction, index) => (
          <li key={index} className="H-16 font-bold text-text2">
            <span className="font-normal H-16 ">{instruction}</span>
          </li>
        ))}
      </ol>

     <div className="flex gap-[20px] w-full justify-around ">
        <div className="flex flex-col items-center gap-[10px] bg-white rounded-[10px] p-[20px] smallShadow flex-1 max-w-[250px] ">
          <img
            src="./assets/clockImage.svg"
            className="p-[10px] px-[20px] object-center bg-no-repeat"
            style={{ backgroundImage: `url('./assets/vectorImage.svg')` }}
          />
          <p className="font-bold H-18 text-primary"> {"60 Minutes"}</p>
          <p>Time Alloted</p>
        </div>
        <div className="flex items-center gap-[10px] flex-col bg-white rounded-[10px] p-[20px] smallShadow flex-1 max-w-[250px] ">
          <img
            src="./assets/bulbImage.svg"
            className="p-[10px] object-center bg-no-repeat px-[20px]"
            style={{ backgroundImage: `url('./assets/vectorImage.svg')` }}
          />
          
            <p className="font-bold H-18 text-primary">{"40 Questions"}</p>
            <p>Total Questions</p>
          
        </div>
     </div>
       <Button text="Start Test" onClick={handleStartTest}/>
    </div>
  );
}

export default TestInstructions