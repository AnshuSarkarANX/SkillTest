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
  const navigate = useNavigate();

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
      if (socketRef.current?.readyState === WebSocket.OPEN) return;
      const ws = new WebSocket(`${SOCKET_URL}/interview`);
      ws.binaryType = "arraybuffer";
      socketRef.current = ws;
      // Connection opened
      ws.onopen = async () => {
        setConnected(true);
        if (sessionId) {
          ws.send(JSON.stringify({ type: "sessionId", sessionId }));
          await startMic();
        }
      };

      ws.onmessage = (event) => {
        if (typeof event.data === "string") {
          const msg = JSON.parse(event.data);
          if (msg.type === "transcript") {
            setTranscript((prev) => [...prev, msg.data]);
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

  const endInterview = useCallback(() => {
    socketRef.current?.send(JSON.stringify({ type: "END_INTERVIEW" }));
  }, [socketRef.current]);
  useEffect(() => {
    return () => {
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