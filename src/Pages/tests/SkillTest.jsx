import { useNavigate } from "react-router";
import Button from "../../Components/Button";
import { FaCircleCheck } from "react-icons/fa6";
const SkillTest = () => {
    const tests = [{
        title: "TEst for beginners",
        usp:["Stand out from the crowd","Earn a certificate that validates your skills","Add to linkedin profile, CV  and portfolio"],
}]
const navigate = useNavigate()
  return (
    <div className="space-y-[30px]">
      <h1 className="font-bold H-18 ">
        Beginners Certificates which makes you different from others
      </h1>
      {tests.map((test, index) => (
        <div
          key={index}
          className="space-y-[20px] bg-white p-[15px] rounded-[20px] smallShadow"
        >
          <div className="flex  items-center gap-[10px]">
            <img src="./assets/figmaImage.svg" />
            <h2 className="H-18 font-bold  mb-[10px]">{test.title}</h2>
          </div>
          <div className="space-y-[10px]  ml-[5px]">
            {test.usp.map((item, index) => (
              <div key={index} className="flex items-center gap-[10px]">
                <FaCircleCheck className="text-primary" />
                <p className="text-[16px] text-text2">{item}</p>
              </div>
            ))}
          </div>
          <Button text="Take Test" onClick={() => navigate("/test-instructions")} />
        </div>
      ))}
    </div>
  );
}

export default SkillTest