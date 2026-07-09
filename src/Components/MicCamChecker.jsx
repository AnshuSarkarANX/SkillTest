import { useState, useRef, useEffect, useCallback } from "react";
import {
  LuMic as Mic,
  LuMicOff as MicOff,
  LuVideo as Video,
  LuCircleCheckBig as CheckCircle2,
  LuCircleAlert as AlertCircle,
  LuRefreshCw as RefreshCw,
  LuChevronDown as ChevronDown,
} from "react-icons/lu";

// Mic & Camera pre-check screen.
// No required props — onReady fires when the candidate confirms devices are working.
export default function MicCameraChecker({ onReady = () => {} }) {
  const [phase, setPhase] = useState("idle"); // idle | requesting | granted | denied | error
  const [cams, setCams] = useState([]);
  const [mics, setMics] = useState([]);
  const [camId, setCamId] = useState("");
  const [micId, setMicId] = useState("");
  const [level, setLevel] = useState(0);
  const [quietFor, setQuietFor] = useState(0);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const rafRef = useRef(null);
  const quietTimerRef = useRef(null);

  const stopStream = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (quietTimerRef.current) clearInterval(quietTimerRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close().catch(() => {});
    streamRef.current = null;
    audioCtxRef.current = null;
  }, []);

  const measureLevel = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    setLevel(Math.min(100, Math.round((avg / 128) * 100)));
    rafRef.current = requestAnimationFrame(measureLevel);
  }, []);

  const startStream = useCallback(
    async (nextCamId, nextMicId) => {
      stopStream();
      setPhase("requesting");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: nextCamId ? { deviceId: { exact: nextCamId } } : true,
          audio: nextMicId ? { deviceId: { exact: nextMicId } } : true,
        });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;

        const devices = await navigator.mediaDevices.enumerateDevices();
        setCams(devices.filter((d) => d.kind === "videoinput"));
        setMics(devices.filter((d) => d.kind === "audioinput"));

        const track = stream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks()[0];
        if (track) setCamId(track.getSettings().deviceId || "");
        if (audioTrack) setMicId(audioTrack.getSettings().deviceId || "");

        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioCtx();
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        audioCtxRef.current = audioCtx;
        analyserRef.current = analyser;

        setPhase("granted");
        setQuietFor(0);
        rafRef.current = requestAnimationFrame(measureLevel);
        quietTimerRef.current = setInterval(() => {
          setLevel((l) => {
            setQuietFor((q) => (l < 4 ? q + 1 : 0));
            return l;
          });
        }, 1000);
      } catch (err) {
        setPhase(err?.name === "NotAllowedError" ? "denied" : "error");
      }
    },
    [stopStream, measureLevel],
  );

  useEffect(() => stopStream, [stopStream]);

  const handleDeviceChange = (kind, id) => {
    if (kind === "cam") {
      setCamId(id);
      startStream(id, micId);
    } else {
      setMicId(id);
      startStream(camId, id);
    }
  };

  const isReady = phase === "granted";
  const isQuiet = isReady && quietFor >= 4;

  return (
    <div className="w-full  my-[20px] rounded-2xl border border-secondary bg-white p-6 text-text shadow-[0_2px_24px_rgba(45,36,30,0.08)]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-text">
            Camera & mic check
          </h2>
          <p className="font-body text-sm text-text2 mt-0.5">
            A quick check before your interview starts.
          </p>
        </div>
        <StatusPill phase={phase} isQuiet={isQuiet} />
      </div>

      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-secondary/25 border border-secondary mb-4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`h-full w-full object-cover -scale-x-100 transition-opacity duration-300 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        />
        {!isReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-text2">
            {phase === "requesting" ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                <span className="font-body text-sm">Requesting access…</span>
              </>
            ) : phase === "denied" ? (
              <>
                <AlertCircle className="w-6 h-6 text-primary" />
                <span className="font-body text-sm text-center px-6">
                  Camera or mic access was blocked. Allow it in your browser's
                  address-bar settings, then retry.
                </span>
              </>
            ) : phase === "error" ? (
              <>
                <AlertCircle className="w-6 h-6 text-primary" />
                <span className="font-body text-sm text-center px-6">
                  Couldn't reach a camera or mic on this device.
                </span>
              </>
            ) : (
              <>
                <Video className="w-6 h-6" />
                <span className="font-body text-sm">
                  Your preview will show up here
                </span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1.5">
          {level > 3 ? (
            <Mic className="w-4 h-4 text-text2" />
          ) : (
            <MicOff className="w-4 h-4 text-text2/40" />
          )}
          <span className="font-body text-xs font-medium text-text2">
            Mic level
          </span>
        </div>
        <div className="flex gap-1 h-6 items-end">
          {Array.from({ length: 24 }).map((_, i) => {
            const threshold = (i + 1) * (100 / 24);
            const active = isReady && level >= threshold;
            return (
              <div
                key={i}
                className={`flex-1 rounded-sm transition-colors duration-75 ${
                  active
                    ? i > 16
                      ? "bg-primary"
                      : "bg-text2"
                    : "bg-secondary/50"
                }`}
                style={{ height: `${40 + i * 2.5}%` }}
              />
            );
          })}
        </div>
        {isQuiet && (
          <p className="font-body text-xs text-primary mt-1.5">
            We're not picking up much sound — try speaking, or check the right
            mic is selected below.
          </p>
        )}
      </div>

      {isReady && (cams.length > 0 || mics.length > 0) && (
        <div className="grid grid-cols-1 gap-2 mb-5">
          {cams.length > 1 && (
            <DeviceSelect
              icon={<Video className="w-3.5 h-3.5" />}
              value={camId}
              options={cams}
              onChange={(id) => handleDeviceChange("cam", id)}
            />
          )}
          {mics.length > 1 && (
            <DeviceSelect
              icon={<Mic className="w-3.5 h-3.5" />}
              value={micId}
              options={mics}
              onChange={(id) => handleDeviceChange("mic", id)}
            />
          )}
        </div>
      )}

      {phase === "idle" && (
        <button
          onClick={() => startStream()}
          className="font-body w-full rounded-xl bg-CTA hover:opacity-90 text-white font-medium text-sm py-2.5 transition-opacity"
        >
          Check my camera & mic
        </button>
      )}

      {(phase === "denied" || phase === "error") && (
        <button
          onClick={() => startStream(camId, micId)}
          className="font-body w-full rounded-xl bg-secondary hover:opacity-80 text-text font-medium text-sm py-2.5 transition-opacity flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      )}

      {phase === "requesting" && (
        <button
          disabled
          className="font-body w-full rounded-xl bg-secondary/60 text-text2 font-medium text-sm py-2.5 cursor-not-allowed"
        >
          Requesting access…
        </button>
      )}

      {isReady && (
        <button
          onClick={onReady}
          className="font-body w-full rounded-xl bg-CTA hover:opacity-90 text-white font-medium text-sm py-2.5 transition-opacity flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          I'm ready
        </button>
      )}
    </div>
  );
}

function StatusPill({ phase, isQuiet }) {
  const map = {
    idle: { text: "Not checked", cls: "bg-secondary text-text2" },
    requesting: { text: "Checking…", cls: "bg-secondary text-text2" },
    granted: isQuiet
      ? { text: "Low audio", cls: "bg-primary/15 text-primary" }
      : { text: "All set", cls: "bg-text2/15 text-text2" },
    denied: { text: "Blocked", cls: "bg-primary/15 text-primary" },
    error: { text: "No device found", cls: "bg-primary/15 text-primary" },
  };
  const { text, cls } = map[phase] || map.idle;
  return (
    <span
      className={`font-body text-xs font-medium px-2.5 py-1 rounded-full ${cls}`}
    >
      {text}
    </span>
  );
}

function DeviceSelect({ icon, value, options, onChange }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text2">
        {icon}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-body w-full appearance-none rounded-lg bg-white border border-secondary text-sm text-text pl-8 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-CTA focus:border-CTA"
      >
        {options.map((d, i) => (
          <option key={d.deviceId} value={d.deviceId}>
            {d.label || `Device ${i + 1}`}
          </option>
        ))}
      </select>
      <ChevronDown className="w-3.5 h-3.5 text-text2 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}
