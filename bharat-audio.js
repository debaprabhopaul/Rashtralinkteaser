// RashtraLink (Ralync) - Sovereign Indian Acoustic Chime Engine
// 100% Client-Side Web Audio API synthesizer for authentic sitar/tanpura harmonic resonance

class BharatAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    // Raga Bilawal / Bhupali Pentatonic frequencies (Sa, Re, Ga, Pa, Dha, High Sa)
    this.notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Plucks an authentic Indian harmonic string chord (Sitar / Ektara string resonance)
  playSitarChime(noteIndex = 0) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const baseFreq = this.notes[noteIndex % this.notes.length];
      const harmonyFreq = this.notes[(noteIndex + 3) % this.notes.length];

      // Note 1: Fundamental pluck
      this.createPluck(baseFreq, now, 0.45, 0.8);
      // Note 2: Harmonic sympathetic string resonance (slight delay)
      this.createPluck(harmonyFreq, now + 0.08, 0.35, 1.2);
      // Note 3: High overtone shimmer
      this.createPluck(baseFreq * 2, now + 0.16, 0.2, 1.5);
    } catch (e) {
      console.warn('Audio note play suppressed:', e);
    }
  }

  createPluck(frequency, startTime, gainLevel, decayTime) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Sitar / Ektara harmonic character (Triangle + low-pass resonant sweep)
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, startTime);

    // Resonant pluck attack
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(frequency * 4.5, startTime);
    filter.frequency.exponentialRampToValueAtTime(frequency * 1.2, startTime + decayTime);
    filter.Q.setValueAtTime(3.5, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(gainLevel * 0.25, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + decayTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + decayTime + 0.1);
  }

  // Interactive micro-sparkle chime for mascot tapping
  playMascotSparkle() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        gain.gain.setValueAtTime(0.001, now + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.12, now + i * 0.05 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.35);
      });
    } catch (e) {}
  }
}

export const bharatAudio = new BharatAudioEngine();
window.bharatAudio = bharatAudio;
