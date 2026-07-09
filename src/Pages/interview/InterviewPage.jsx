import React, { useEffect, useState, useRef } from "react";
import useInterviewSocket from "../../apis/useInterviewSocket";
import toast from "react-hot-toast";
import Button from "../../Components/Button";
import { useParams } from "react-router";

const InterviewPage = () => {
  const [message, setMessage] = useState("");
  const { connect, sendMessage, endInterview, connected, transcript } =
    useInterviewSocket();
  const { sessionId } = useParams();
  const hasConnected = useRef(false);

  useEffect(() => {
    if (sessionId && !hasConnected.current) {
      hasConnected.current = true;
      connect(sessionId);
    }
  }, [sessionId]);

  useEffect(() => {
    if (connected) toast.success("Connected to interview socket");
  }, [connected]);

  const handleSendMessage = () => {
    if (message.trim() === "") {
      toast.error("Message cannot be empty");
      return;
    }
    sendMessage(message);
    setMessage("");
  };
  console.log(transcript)

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 border-b flex justify-between items-center">
        <h1 className="text-lg font-medium">Interview Session</h1>
        <span className={connected ? "text-green-600" : "text-red-600"}>
          {connected ? "Connected" : "Connecting..."}
        </span>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-2">
        {transcript.map((entry, i) => (
          <div key={i} className="text-sm text-gray-700">
            {entry.role}: {entry.content}
          </div>
        ))}
      </main>

      <footer className="p-4 border-t flex flex-col gap-2">
        <div className="border border-gray-300 rounded flex items-center gap-2 p-2">
          <input
            type="text"
            placeholder="Enter your message"
            className="w-full p-2 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button text="Send" onClick={handleSendMessage} />
        </div>
        <Button text="End Interview" onClick={endInterview} />
      </footer>
    </div>
  );
};

export default InterviewPage;
