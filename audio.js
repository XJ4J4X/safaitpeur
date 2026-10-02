// Advanced Web Audio API procedural sound engine for retro CRT terminal
class TerminalAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.ambientActive = false;
    this.ambientNode = null;
    this.ambientGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled && this.ambientNode) {
      this.stopAmbientHum();
    } else if (this.enabled && this.ambientActive) {
      this.startAmbientHum();
    }
    return this.enabled;
  }

  // 1. Heavy mechanical CRT Power Switch click
  playPowerSwitch() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Heavy mechanical relay clack (short burst + low resonance)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.08);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);

    // High snap
    const snap = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snap.type = "triangle";
    snap.frequency.setValueAtTime(1600, t);
    snap.frequency.exponentialRampToValueAtTime(200, t + 0.03);

    snapGain.gain.setValueAtTime(0.18, t);
    snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    snap.connect(snapGain);
    snapGain.connect(this.ctx.destination);
    snap.start(t);
    snap.stop(t + 0.03);
  }

  // 2. High-voltage CRT flyback transformer squeal & capacitor charge
  playCrtPowerUp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // High voltage CRT 15.6 kHz flyback squeal dropping into steady hum
    const flyback = this.ctx.createOscillator();
    const flybackGain = this.ctx.createGain();
    flyback.type = "sine";
    flyback.frequency.setValueAtTime(15600, t);
    flyback.frequency.exponentialRampToValueAtTime(12000, t + 0.7);

    flybackGain.gain.setValueAtTime(0.001, t);
    flybackGain.gain.exponentialRampToValueAtTime(0.06, t + 0.15);
    flybackGain.gain.exponentialRampToValueAtTime(0.002, t + 0.8);

    flyback.connect(flybackGain);
    flybackGain.connect(this.ctx.destination);
    flyback.start(t);
    flyback.stop(t + 0.85);

    // Low voltage surge hum
    const hum = this.ctx.createOscillator();
    const humGain = this.ctx.createGain();
    hum.type = "sawtooth";
    hum.frequency.setValueAtTime(50, t);
    hum.frequency.linearRampToValueAtTime(80, t + 0.4);
    hum.frequency.exponentialRampToValueAtTime(50, t + 0.9);

    humGain.gain.setValueAtTime(0.001, t);
    humGain.gain.linearRampToValueAtTime(0.08, t + 0.3);
    humGain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

    hum.connect(humGain);
    humGain.connect(this.ctx.destination);
    hum.start(t);
    hum.stop(t + 0.95);
  }

  // 3. Subtle ambient 50Hz CRT electrical hum
  startAmbientHum() {
    if (!this.enabled || this.ambientNode) return;
    this.init();
    if (!this.ctx) return;

    this.ambientActive = true;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(55, t); // European mains hum

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(160, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.015, t + 2); // Very quiet in the background

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    this.ambientNode = osc;
    this.ambientGain = gain;
  }

  stopAmbientHum() {
    if (this.ambientGain && this.ctx) {
      try {
        const t = this.ctx.currentTime;
        this.ambientGain.gain.linearRampToValueAtTime(0.001, t + 0.5);
        setTimeout(() => {
          if (this.ambientNode) {
            this.ambientNode.stop();
            this.ambientNode.disconnect();
            this.ambientNode = null;
            this.ambientGain = null;
          }
        }, 500);
      } catch (e) {}
    }
  }

  // 4. Mechanical Keyboard Keystroke (multi-layered click + spring thud)
  playKeyClick(isSpace = false) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Layer 1: High click snap
    const click = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    click.type = "triangle";
    
    const baseFreq = isSpace ? 320 : 650 + (Math.random() * 300 - 150);
    click.frequency.setValueAtTime(baseFreq, t);
    click.frequency.exponentialRampToValueAtTime(120, t + 0.025);

    clickGain.gain.setValueAtTime(isSpace ? 0.09 : 0.06, t);
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

    click.connect(clickGain);
    clickGain.connect(this.ctx.destination);
    click.start(t);
    click.stop(t + 0.025);

    // Layer 2: Mechanical spring / casing thud
    const thud = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    thud.type = "sine";
    thud.frequency.setValueAtTime(isSpace ? 110 : 210 + Math.random() * 40, t);
    thud.frequency.exponentialRampToValueAtTime(40, t + 0.04);

    thudGain.gain.setValueAtTime(0.04, t);
    thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    thud.connect(thudGain);
    thudGain.connect(this.ctx.destination);
    thud.start(t);
    thud.stop(t + 0.04);
  }

  // 5. High-tech teletype data stream chirp (for text decryption)
  playDataChirp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    const freqs = [1800, 2100, 2400, 2700, 1500];
    const freq = freqs[Math.floor(Math.random() * freqs.length)];
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.02, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.02);
  }

  // 6. Enter command affirmation beep
  playEnter() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.exponentialRampToValueAtTime(440, t + 0.08);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  // 7. Dramatic Error Glitch: Low Sub Bass drop + Buzzer + Static Noise Burst
  playErrorGlitch() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Sub-bass drop (impact)
    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.type = "sawtooth";
    sub.frequency.setValueAtTime(120, t);
    sub.frequency.exponentialRampToValueAtTime(35, t + 0.35);

    subGain.gain.setValueAtTime(0.2, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    sub.connect(subGain);
    subGain.connect(this.ctx.destination);
    sub.start(t);
    sub.stop(t + 0.35);

    // Harsh electronic buzzer
    const buzz = this.ctx.createOscillator();
    const buzzGain = this.ctx.createGain();
    buzz.type = "sawtooth";
    buzz.frequency.setValueAtTime(95, t);
    buzz.frequency.setValueAtTime(80, t + 0.12);

    buzzGain.gain.setValueAtTime(0.15, t);
    buzzGain.gain.exponentialRampToValueAtTime(0.01, t + 0.28);

    buzz.connect(buzzGain);
    buzzGain.connect(this.ctx.destination);
    buzz.start(t);
    buzz.stop(t + 0.3);

    // Static noise burst
    try {
      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1000, t);
      filter.Q.setValueAtTime(2, t);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.09, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      whiteNoise.start(t);
      whiteNoise.stop(t + 0.18);
    } catch (e) {}
  }

  // 8. Glorious Victory / Unlock Chime (Eerie futuristic chord arpeggio)
  playSuccessArp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Harmonic series with Gotham mystery tone: D4 -> F#4 -> A4 -> D5 -> E5
    const notes = [293.66, 369.99, 440.00, 587.33, 659.25, 880.00];

    notes.forEach((freq, idx) => {
      const noteTime = t + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.linearRampToValueAtTime(0.12, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.5);
    });

    // Sub-bass resonance swell
    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.type = "sine";
    sub.frequency.setValueAtTime(73.42, t); // D2
    sub.frequency.linearRampToValueAtTime(146.83, t + 0.5);

    subGain.gain.setValueAtTime(0.001, t);
    subGain.gain.linearRampToValueAtTime(0.1, t + 0.15);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    sub.connect(subGain);
    subGain.connect(this.ctx.destination);
    sub.start(t);
    sub.stop(t + 0.7);
  }

  // 9. Evil Digital Laugh for Splash Screen
  playLaugh() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Rapid descending sawtooth bursts (Ha Ha Ha)
    for (let i = 0; i < 7; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180 - (i * 12), t + i * 0.15); 
      osc.frequency.exponentialRampToValueAtTime(60, t + i * 0.15 + 0.1);
      
      gain.gain.setValueAtTime(0.3, t + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, t + i * 0.15 + 0.1);
      
      osc.connect(gain); 
      gain.connect(this.ctx.destination);
      osc.start(t + i * 0.15); 
      osc.stop(t + i * 0.15 + 0.1);
    }
  }
}

window.terminalAudio = new TerminalAudio();
