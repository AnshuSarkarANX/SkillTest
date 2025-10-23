import Button from "../../Components/Button";

const TestInstructions = () => {
    const instructions = [
      "Ensure a stable internet connection during the exam.",
      "Do not refresh or close the exam window once started.",
      "Follow the time limit strictly—no extra time will be given.",
      "Maintain academic honesty (no external help allowed).",
    ];
  return (
    <div className="space-y-[20px]">
      <h1 className="font-bold H-18">Rules & Instructions</h1>
      <ol className="list-decimal list-inside list">
        {instructions.map((instruction, index) => (
          <li key={index} className="H-16 font-bold text-text2">
            <span className="font-normal H-16 ">{instruction}</span>
          </li>
        ))}
      </ol>

     <div className="flex gap-[20px] w-full mx-auto">
        <div className="flex flex-col items-center gap-[10px] bg-white rounded-[10px] p-[20px] smallShadow  ">
          <img
            src="./assets/clockImage.svg"
            className="p-[10px] px-[20px] object-center bg-no-repeat"
            style={{ backgroundImage: `url('./assets/vectorImage.svg')` }}
          />
          <p className="font-bold H-18 text-primary"> {"60 Minutes"}</p>
          <p>Time Alloted</p>
        </div>
        <div className="flex items-center gap-[20px] flex-col bg-white rounded-[10px] p-[20px] smallShadow">
          <img
            src="./assets/bulbImage.svg"
            className="p-[10px] object-center bg-no-repeat px-[20px]"
            style={{ backgroundImage: `url('./assets/vectorImage.svg')` }}
          />
          <div>
            <p className="font-bold H-18 text-primary">{"40 Questions"}</p>
            <p>Total Questions</p>
          </div>
        </div>
     </div>
       <Button text="Start Test"/>
    </div>
  );
}

export default TestInstructions