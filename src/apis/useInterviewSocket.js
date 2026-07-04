import { useEffect,useRef,useState } from "react";

function useInterviewSocket(sessionId = null) {
const socketRef = useRef(null);
const mediaSourceRef = useRef(null);
const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;
const [connected,setConnected] = useState(false);
const [mediaSource,setMediaSource] = useState(null);

 
const connect = () => {
  if(socketRef.current?.readyState === WebSocket.OPEN) return;
 const ws = new WebSocket(`${SOCKET_URL}/interview`);
 socketRef.current = ws;
  // Connection opened
  ws.onopen = () => {
    setConnected(true);
  };
  ws.onmessage = (event) => {
    if (event.data instanceof Blob) {
      const url = URL.createObjectURL(event.data);
      new Audio(url).play();
    }
    setMediaSource(event.data);
    console.log(event.data);

    ws.onclose = () => {
      setConnected(false);
    };

    ws.onerror = () => {
      setConnected(false);
    };
  };
}

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  };
  useEffect(() => {
    return () => {
      socketRef.current?.close();
    };
  }, []);

  return { connect, sendMessage, connected, mediaSource };



}

export default useInterviewSocket;