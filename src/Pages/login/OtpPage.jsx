import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Button from '../../Components/Button';
import {useNavigate} from 'react-router';
import { verifyOTP } from "../../apis/authApis";
// Separate Timer Component - only this component re-renders
const TimerComponent = ({ onResendOtp, isLoading }) => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const resetTimer = useCallback(() => {
    setTimer(60);
  }, []);

  const handleResend = useCallback(async () => {
    resetTimer();
    await onResendOtp();
  }, [onResendOtp, resetTimer]);

  return (
    <div className="text-center">
      {timer > 0 ? (
        <p className="text-sm text-gray-600">
          Resend OTP in <span className="font-bold text-black">{timer}</span>{" "}
          seconds
        </p>
      ) : (
        <p>
          Don't get the OTP?{" "}
          <button
            onClick={handleResend}
            disabled={isLoading}
            className="text-CTA font-semibold hover:underline disabled:opacity-50"
            aria-busy={isLoading}
          >
            Resend
          </button>
        </p>
      )}
    </div>
  );
};
const OtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const otpCode = useMemo(() => otp.join(""), [otp]);
  const isOtpComplete = useMemo(() => otpCode.length === 6, [otpCode]);
  const handleKeyDown = useCallback(
    (e, index) => {
      if (e.key === "Backspace") {
        if (otp[index] === "") {
          if (index > 0) {
            inputs.current[index - 1].focus();
            setOtp((prevOtp) => {
              const updatedOtp = [...prevOtp];
              updatedOtp[index - 1] = "";
              return updatedOtp;
            });
          }
        } else {
          setOtp((prevOtp) => {
            const updatedOtp = [...prevOtp];
            updatedOtp[index] = "";
            return updatedOtp;
          });
        }
      }
    },
    [otp]
  );

  const handleOtpChange = useCallback(
    (e, index) => {
      const value = e.target.value.replace(/\D/g, "");
      if (!value) return;

      const newOtp = [...otp];
      newOtp[index] = value[0];
      setOtp(newOtp);

      if (index < 5) {
        inputs.current[index + 1].focus();
      }
    },
    [otp]
  );

  const handlePaste = useCallback((e) => {
    const pasted = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      const newOtp = pasted.split("");
      setOtp(newOtp);
      inputs.current[5].focus();
    }
  }, []);
  const handleVerifyOTP = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      try {
        const response = await verifyOTP(
          localStorage.getItem("email"),
          otpCode
        );
        console.log("User logged in:", response.user);

        // Store user data in localStorage or state management
        localStorage.setItem("userDetails", JSON.stringify(response.user));

        // Redirect to dashboard or next step
        if(response.user.FTL){
          navigate("/welcome");
        }
        else{
          navigate("/");
        }
        toast.success("OTP verified successfully");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [otpCode]
  );
  return (
    <div>
      <img
        src="/assets/otpImage.svg"
        alt="OtpImage"
        className="w-fit h-fit  mx-auto"
      />
      <div className="flex flex-col  p-[20px] mt-[20px] rounded-[10px]  gap-[10px]">
        <label htmlFor="otp" className="text-text2 H-14 font-bold">
          Enter OTP
        </label>
        <div className="Password grid grid-cols-6 gap-[7px] md:gap-[10px] mb-[10px]">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              placeholder="-"
              aria-label={`OTP Digit ${index + 1}`}
              aria-required="true"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full col-span-1 text-center border h-[55px] sm:h-[56px] lg:h-[65px] border-white smallShadow bg-white rounded-[10px] focus:ring-1 focus:outline-none focus:ring-CTA focus:border-CTA"
              value={otp[index]}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              ref={(el) => (inputs.current[index] = el)}
            />
          ))}
        </div>

        <Button
          text="Verify"
          onClick={isOtpComplete ? handleVerifyOTP : null}
          disabled={loading || !isOtpComplete}
          loading={loading}
        />

        {/* Timer component is isolated - only it re-renders */}
        <TimerComponent onResendOtp={() => {}} isLoading={loading} />
      </div>
    </div>
  );
};

export default OtpPage