class MicProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0][0]; // the raw decimal audio numbers
     if (!input) return true;
    // convert decimals to whole numbers (PCM16)
    const pcm16 = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]));
      pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    this.port.postMessage(pcm16.buffer); // hand off the converted audio
    return true;
  }
}
registerProcessor("mic-processor", MicProcessor);
