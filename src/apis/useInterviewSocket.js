import { useCallback, useEffect,useRef,useState } from "react";
import {  useNavigate } from "react-router";

function useInterviewSocket(sessionId = null) {
  const socketRef = useRef(null);
  const audioContextRef = useRef(null);
  const workletNodeRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const queueTimeRef = useRef(0);
  const micStreamRef = useRef(null);
  const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;
  const [connected, setConnected] = useState(false);
  const [mediaSource, setMediaSource] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const reconnectAttemptRef = useRef(0);
  const reconnectTimeoutRef = useRef(null);
  const sessionIdRef = useRef(null);
  const manualCloseRef = useRef(false);
  const navigate = useNavigate();
  function getBackoffDelay(attempt) {
  const base = 1000;
  const max = 15000;
  const exp = Math.min(max, base * 2 ** attempt);
  return exp * (0.5 + Math.random() * 0.5); // jitter
}

  const startMic = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { sampleRate: 24000, channelCount: 1, echoCancellation: true },
    });
    micStreamRef.current = stream;

    const ctx = new AudioContext({ sampleRate: 24000 });
    await ctx.audioWorklet.addModule("/audioProcessor.js");

    const source = ctx.createMediaStreamSource(stream);
    const workletNode = new AudioWorkletNode(ctx, "mic-processor");

    workletNode.port.onmessage = (event) => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(event.data); // raw PCM16 binary frame
      }
    };

    source.connect(workletNode);
    workletNodeRef.current = workletNode;
    audioContextRef.current = ctx;
  }, []);

  const playChunk = useCallback((arrayBuffer) => {
    const ctx = audioContextRef.current || new AudioContext();
    audioContextRef.current = ctx;

    ctx.decodeAudioData(
      arrayBuffer.slice(0),
      (audioBuffer) => {
        const src = ctx.createBufferSource();
        src.buffer = audioBuffer;
        src.connect(ctx.destination);

        const startAt = Math.max(queueTimeRef.current, ctx.currentTime);
        src.start(startAt);
        queueTimeRef.current = startAt + audioBuffer.duration;
      },
      (err) => console.error("Decode error:", err),
    );
  }, []);

  const connect = useCallback(
    
    (sessionId) => {
       sessionIdRef.current = sessionId;
       manualCloseRef.current = false;
      if (socketRef.current?.readyState === WebSocket.OPEN) return;
      const ws = new WebSocket(`${SOCKET_URL}/interview`);
      ws.binaryType = "arraybuffer";
      socketRef.current = ws;
      // Connection opened
      ws.onopen = async () => {
        setConnected(true);
        reconnectAttemptRef.current = 0;
        if (sessionId) {
          let conversations = JSON.parse(sessionStorage.getItem("agentConversations")) || []
          ws.send(JSON.stringify({ type: "sessionId", sessionId, conversations }));
          if (!micStreamRef.current) await startMic();
        }
      };

      ws.onmessage = (event) => {
        if (typeof event.data === "string") {
          const msg = JSON.parse(event.data);
          if (msg.type === "transcript") {
            setTranscript((prev) => [...prev, msg.data]);
       if (msg.data?.role === "assistant" && msg.data?.content.split(" ").length > 9) {
         const agentConvo =
           JSON.parse(sessionStorage.getItem("agentConversations")) || [];
         let convoArray = [...agentConvo, msg.data.content];
         sessionStorage.setItem(
           "agentConversations",
           JSON.stringify(convoArray),
         );
       }
          }
          if (msg.type === "closeSocket") {
            setTimeout(
              () => navigate("/pre-interview", { replace: true }),
              1500,
            );

          }
          setMediaSource(msg);
        } else {
          playChunk(event.data);
        }
      };

      ws.onclose = () => {
        setConnected(false);
         if (!manualCloseRef.current) {
           scheduleReconnect();
         }
      };

      ws.onerror = () => {
        setConnected(false);
      };
    },
    [startMic, playChunk],
  );

  const sendMessage = useCallback((message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  }, []);
const scheduleReconnect = () => {
  const delay = getBackoffDelay(reconnectAttemptRef.current);
  reconnectAttemptRef.current += 1;

  if (reconnectAttemptRef.current > 8) {
    console.error("Max reconnect attempts reached, giving up");
    return;
  }

  reconnectTimeoutRef.current = setTimeout(() => {
    console.log(`Reconnect attempt ${reconnectAttemptRef.current}`);
    connect(sessionIdRef.current);
  }, delay);
}
  const endInterview = useCallback(() => {
    manualCloseRef.current = true; 
    clearTimeout(reconnectTimeoutRef.current);
    socketRef.current?.send(JSON.stringify({ type: "END_INTERVIEW" }));
  }, [socketRef.current]);
  useEffect(() => {
    return () => {
      sessionStorage.clear();
      socketRef.current?.close();
      workletNodeRef.current?.disconnect();
      micStreamRef.current?.getTracks().forEach((t) => t.stop());
      audioContextRef.current?.close();
    };
  }, []);

  return {
    connect,
    sendMessage,
    connected,
    mediaSource,
    transcript,
    endInterview,
  };
}

export default useInterviewSocket;