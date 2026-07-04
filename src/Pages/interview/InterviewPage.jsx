import React, { useEffect, useState } from 'react'
import useInterviewSocket  from "../../apis/useInterviewSocket";
import toast from "react-hot-toast"
import Button from '../../Components/Button';

const InterviewPage = () => {
  const [message, setMessage] = useState("");
  
    const { connect,sendMessage,connected,mediaSource } = useInterviewSocket();
    useEffect(() => {
      if(connected) toast.success("Connected to interview socket"); 
      
    }, [connected])

    const handleSendMessage = () => {
      if(message.trim() === "") {
        toast.error("Message cannot be empty");
        return;
      }
      sendMessage(message);
      setMessage("");      
    };

  return (
    <div>
      InterviewPage
      <div>From Server: {mediaSource}</div>
      <div className="border border-gray-300 rounded flex items-center gap-2 p-2">
        <input
          type="text"
          placeholder="Enter your message"
          className="w-full p-2 focus:outline-none "
          value={message}
          onChange={(e)=> setMessage(e.target.value)}
        />
        
        <Button text="Send" onClick={handleSendMessage} />
      </div>

      {connected ? null :   <Button text="Connect" onClick={() => connect()} />}
       
    </div>
  );
}

export default InterviewPage