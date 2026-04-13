import { useState } from "react";

const ApiKey = () => {
    const [akey, setKey] = useState("");
  return (
    <div>
      <div>
        <p className="font-semibold ml-[5px] text-text2 mb-[5px]">Name</p>
        <input
          style={{
            boxShadow: "0px 4px 12px 0px #0000001A",
          }}
          value={akey}
          onChange={(e) => setKey(e.target.value)}
          type="text"
          placeholder="Enter your api"
          className="w-full h-[40px] rounded-[15px] px-[25px] py-[25px] focus:outline-none focus:ring-primary focus:ring-2"
        />
      </div>
    </div>
  );
}

export default ApiKey