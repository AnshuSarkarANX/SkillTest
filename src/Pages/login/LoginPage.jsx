import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router";
import CustomCountrySelect from "../../Components/CustomCountrySelect";
import Button from "../../Components/Button";
import { requestOTP } from "../../apis/authApis";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [contactType, setContactType] = useState("email"); // "mobile" or "email"
  const [countryCode, setCountryCode] = useState("91"); // Default country code
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const numberInput = useRef();
  

  const handleNumberChange = (e) => {
    setContact(e.target.value);
    setError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleRequestOTP = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      
      

      try {
        const response = await requestOTP(email);
        setMessage(response.message);
        navigate("/otp",{state:{email:email,phone:contact}});
        toast.success("Otp sent successfully");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [email, contact]
  );

  return (
    <div className="">
      <h1 className="mb-[30px] font-medium p-[20px] mt-[20px] text-center font-montserrat">
        <span className="tracking-[7px]  text-[20px]/[40px]">
          Validate Your Skills
        </span>
        <br />
        <span className="font-vibe H-40 italic font-black text-text2">
          In
          <br />
          Minutes
        </span>
      </h1>
      <img
        src="/assets/loginImage.webp"
        alt="loginImage"
        className="w-fit h-fit  mx-auto scale-120"
      />

      <div className=" p-[20px] mt-[20px] rounded-[10px]  ">
        <div className="flex flex-col gap-[20px]">
          {/* Contact Type Toggle 
            <div className=" flex smallShadow rounded-[10px] H-16 p-[10px]  font-bold gap-[10px] bg-white opacity-30">
            <div
              onClick={() => {
                // handleContactTypeChange("email")
              }}
              className={`flex-1 text-center py-[14px] cursor-pointer transition-all duration-300 ${
                contactType === "email"
                  ? "bg-CTA text-white"
                  : "bg-white text-Used"
              } rounded-[10px]`}
            >
              Email
            </div>
            <div
              onClick={() => {
                //handleContactTypeChange("mobile")
              }}
              className={`flex-1 text-center transition-all duration-300 py-[14px] cursor-pointer sa ${
                contactType === "mobile"
                  ? "bg-CTA text-white"
                  : "bg-white text-Used"
              } rounded-[10px]`}
            >
              Mobile
            </div>
          </div>*/}

          {/* Input Field */}
          <div className="">
            <div>
              <div>
                <h1 className="mb-[8px] text-text2 font-bold ">
                  Enter your email ID
                </h1>
              </div>
              <input
                type="email"
                className="w-full bg-white smallShadow rounded-lg p-[18px] focus:outline-none focus:ring-2 focus:ring-CTA"
                value={email}
                onChange={handleEmailChange}
                placeholder="abc@email.com"
              />

              {error && <p className="text-red-500 H-14 mt-2">{error}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            text="Send OTP"
            loading={loading}
            disabled={loading || (!contact && !email)}
            onClick={handleRequestOTP}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
