import Button from "../../Components/Button";

const ProgressPage = () => {
    const responses = JSON.parse(
      sessionStorage.getItem("testResponses") || "[]"
    );
    console.log("responses", responses);
  return (
    <div className="space-y-[30px]">
      <div>
        <p className="H-14 mb-2 text-primary font-bold">Checking for Preview</p>
      
      </div>

      <div className="smallShadow bg-white rounded-[20px] p-[20px]">
        <h1 className="font-bold H-20 mb-[15px] ">Preview</h1>

        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 gap-[10px] ">
          {responses.map((item, index) => (
            <div
              key={index}
              className={`smallShadow border   font-bold ${
                item.answer
                  ? "bg-secondary/80 text-primary border-primary"
                  : "text-text2/30 border-text2/30"
              } rounded-[10px]  w-[85px] h-[28px] H-10 flex items-center justify-center`}
            >
              <span className="">
                {item.question_sn}
                <span className="">. {item.type === "mcq" ? item.type.toUpperCase() : item.type[0].toUpperCase() + item.type.slice(1)}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-[10px]">
        <Button color={"white"} text={"View All Questions"} />
        <Button text={"Submit"} />
      </div>
    </div>
  );
}

export default ProgressPage