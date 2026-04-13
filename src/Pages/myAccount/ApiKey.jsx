import { useEffect, useState } from "react";
import Button from "../../Components/Button";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { getUserApiKey, setUserApiKey } from "../../apis/UserApiKeys";
import toast from "react-hot-toast";

const ApiKey = () => {
  const [akey, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const init = async () => {
      // 1. Try sessionStorage
      const cached = sessionStorage.getItem("encryptedApiKey");
      if (cached) {
        setKey(cached); // your FE decrypt fn
        return;
      }

      // 2. Fallback to API
      setIsLoading(true);
      try {
        const { key } = await getUserApiKey();
        sessionStorage.setItem("userApiKey", key);
        setKey(key);
      } catch (e) {
        // 404 "No API key found" etc → just ignore / show empty state
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

    const handleSave = async () => {
      if (!akey) return;
      setIsLoading(true);
      try {
        await setUserApiKey(akey);
        sessionStorage.setItem("userApiKey", akey); 
        toast.success("API key saved successfully")// update cache
      } catch (e) {
        console.error("Failed to save API key", e);
        toast.error("Failed to save API key")
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div>
      <div className="bg-background rounded-[20px] smallShadow p-[20px] space-y-[20px]">
        <p className="font-semibold ml-[5px] text-text2 mb-[5px]">
          User API Key
        </p>

        <div className="relative w-full">
          <input
            style={{ boxShadow: "0px 4px 12px 0px #0000001A" }}
            value={akey}
            onChange={(e) => setKey(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter your API Key"
            className="w-full h-[40px] rounded-[15px] px-[25px] py-[25px] pr-[50px] focus:outline-none focus:ring-primary focus:ring-2"
          />
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-[14px] top-1/2 -translate-y-1/2 text-text2 hover:text-text transition-colors"
          >
            {show ? <IoEyeOff size={18} /> : <IoEye size={18} />}
          </button>
        </div>

        <Button
          text="Save"
          onClick={handleSave}
          loading={isLoading}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default ApiKey;
