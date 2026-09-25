// =================================================================
// audio.jsx — sound effects (WebAudio) + read-aloud (SpeechSynthesis)
// Lazy-inits AudioContext on first user gesture. Respects window.__muted.
// =================================================================
(function () {
  let ctx = null;
  let muted = false;

  function getCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') { try { ctx.resume(); } catch (_) {} }
    return ctx;
  }

  function setMuted(b) {
    muted = !!b;
    if (b && window.speechSynthesis) window.speechSynthesis.cancel();
  }

  function isMuted() { return muted; }

  // Global overrides set by the Tweaks panel
  window.__voiceOverrides = window.__voiceOverrides || { name: null, rateMul: 1.0, pitchMul: 1.0 };

  // ── Tone helper ─────────────────────────────────────────────
  function tone({ freq = 440, type = 'sine', start = 0, dur = 0.15, attack = 0.005, peak = 0.18, end = 0.0001, glide }) {
    const c = getCtx();
    if (!c) return;
    const t0 = c.currentTime + start;
    const o = c.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t0);
    if (glide) o.frequency.exponentialRampToValueAtTime(glide, t0 + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + attack);
    g.gain.exponentialRampToValueAtTime(end, t0 + dur);
    o.connect(g).connect(c.destination);
    o.start(t0);
    o.stop(t0 + dur + 0.02);
  }

  // ── Sound effects ───────────────────────────────────────────
  const sfx = {
    // soft scribble on a region fill
    scribble() {
      if (muted) return;
      const c = getCtx(); if (!c) return;
      const dur = 0.16 + Math.random() * 0.08;
      const buf = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        // noise with decay envelope
        const env = Math.exp(-i / data.length * 4);
        data[i] = (Math.random() * 2 - 1) * env * 0.4;
      }
      const src = c.createBufferSource(); src.buffer = buf;
      const bp = c.createBiquadFilter(); bp.type = 'bandpass';
      bp.frequency.value = 900 + Math.random() * 900;
      bp.Q.value = 1.4;
      const g = c.createGain(); g.gain.value = 0.16;
      src.connect(bp); bp.connect(g); g.connect(c.destination);
      src.start();
    },
    // crayon pickup
    pop() {
      if (muted) return;
      tone({ freq: 540, glide: 880, type: 'triangle', dur: 0.12, peak: 0.18 });
    },
    // soft tap (nav)
    tap() {
      if (muted) return;
      tone({ freq: 720, type: 'sine', dur: 0.07, peak: 0.1 });
    },
    // correct answer — major triad arpeggio
    correct() {
      if (muted) return;
      tone({ freq: 523.25, type: 'triangle', start: 0,    dur: 0.18, peak: 0.22 });
      tone({ freq: 659.25, type: 'triangle', start: 0.08, dur: 0.18, peak: 0.22 });
      tone({ freq: 783.99, type: 'triangle', start: 0.16, dur: 0.26, peak: 0.24 });
    },
    // wrong answer — descending buzzer
    wrong() {
      if (muted) return;
      tone({ freq: 260, glide: 130, type: 'sawtooth', dur: 0.28, peak: 0.18 });
    },
    // celebration cheer — rising sparkle
    cheer() {
      if (muted) return;
      const notes = [523, 659, 784, 1046, 1318];
      notes.forEach((f, i) => {
        tone({ freq: f, type: 'triangle', start: i * 0.09, dur: 0.36, peak: 0.18 });
      });
      // top sparkle
      [1568, 2093, 2637].forEach((f, i) => {
        tone({ freq: f, type: 'sine', start: 0.55 + i * 0.08, dur: 0.28, peak: 0.12 });
      });
    },
    // small "+1 region" tick when an SVG region is colored
    fill() {
      if (muted) return;
      tone({ freq: 380, glide: 540, type: 'sine', dur: 0.09, peak: 0.09 });
    },
  };

  // ── Speech synthesis ────────────────────────────────────────
  // Voice selection works in two layers:
  //  1) `voiceHints` regex list (e.g. ["daniel","alex","bruce","guy"]) preferred
  //  2) ALWAYS prefer voices whose name contains "Enhanced" or "Premium" if present
  let allVoices = [];
  function refreshVoices() {
    if (!window.speechSynthesis) return;
    allVoices = window.speechSynthesis.getVoices() || [];
  }
  function pickVoice(hints) {
    refreshVoices();
    if (!allVoices.length) return null;
    // Explicit user override by exact voice name
    const override = window.__voiceOverrides && window.__voiceOverrides.name;
    if (override && override !== 'auto') {
      const exact = allVoices.find(v => v.name === override);
      if (exact) return exact;
    }
    const en = allVoices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
    const pool = en.length ? en : allVoices;
    // Helper: best match within a candidate set
    const bestOf = (cands) => {
      // Prefer enhanced/premium/neural voices
      const enhanced = cands.find(v => /enhanced|premium|natural|neural|wavenet/i.test(v.name));
      if (enhanced) return enhanced;
      return cands[0];
    };
    // Try hints in order
    if (hints && hints.length) {
      for (const re of hints) {
        const cands = pool.filter(v => re.test(v.name));
        if (cands.length) return bestOf(cands);
      }
    }
    // Fallbacks: known-good defaults
    const defaultHints = [
      /samantha/i, /ava/i, /allison/i,
      /daniel/i, /alex/i, /tom/i, /aaron/i,
      /microsoft (aria|jenny|guy|mark|davis)/i,
      /google us english/i,
    ];
    for (const re of defaultHints) {
      const cands = pool.filter(v => re.test(v.name));
      if (cands.length) return bestOf(cands);
    }
    return bestOf(pool);
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = refreshVoices;
    refreshVoices();
  }

  // Add gentle pauses to feel more deliberate — single comma after every
  // emphasized comma or before "and"/"but"/"that" in some cases.
  function softenText(text) {
    return text.replace(/\s+/g, ' ').trim();
  }

  // Bumped by every speak/speakLines/stop. cancel() fires onend/onerror on the
  // interrupted utterance, so callbacks from a superseded run must bail out
  // instead of chaining into the next line or the caller's onEnd.
  let gen = 0;

  const speech = {
    speaking: false,
    speak(text, opts = {}) {
      if (muted) return;
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const myGen = ++gen;
      const ov = window.__voiceOverrides || { rateMul: 1, pitchMul: 1 };
      const u = new SpeechSynthesisUtterance(softenText(text));
      const baseRate  = opts.rate   != null ? opts.rate   : 0.88;
      const basePitch = opts.pitch  != null ? opts.pitch  : 1.02;
      u.rate   = Math.max(0.4, Math.min(1.6, baseRate  * (ov.rateMul  || 1)));
      u.pitch  = Math.max(0.5, Math.min(1.6, basePitch * (ov.pitchMul || 1)));
      u.volume = opts.volume != null ? opts.volume : 1.0;
      const v = pickVoice(opts.voiceHints);
      if (v) u.voice = v;
      u.onstart = () => { speech.speaking = true; opts.onStart && opts.onStart(); };
      u.onend   = () => { if (myGen !== gen) return; speech.speaking = false; opts.onEnd && opts.onEnd(); };
      u.onerror = () => { if (myGen !== gen) return; speech.speaking = false; opts.onEnd && opts.onEnd(); };
      u.onboundary = opts.onBoundary;
      window.speechSynthesis.speak(u);
    },
    // Speak a sequence of lines (one utterance each so we get per-line callbacks).
    speakLines(lines, opts = {}) {
      if (muted || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const myGen = ++gen;
      const v = pickVoice(opts.voiceHints);
      const ov = window.__voiceOverrides || { rateMul: 1, pitchMul: 1 };
      let i = 0;
      const speakNext = () => {
        if (myGen !== gen) return;
        if (i >= lines.length) { speech.speaking = false; opts.onEnd && opts.onEnd(); return; }
        const u = new SpeechSynthesisUtterance(softenText(lines[i]));
        const baseRate  = opts.rate  != null ? opts.rate  : 0.86;
        const basePitch = opts.pitch != null ? opts.pitch : 1.0;
        u.rate  = Math.max(0.4, Math.min(1.6, baseRate  * (ov.rateMul  || 1)));
        u.pitch = Math.max(0.5, Math.min(1.6, basePitch * (ov.pitchMul || 1)));
        if (v) u.voice = v;
        u.onstart = () => { if (myGen !== gen) return; speech.speaking = true; opts.onLine && opts.onLine(i); };
        u.onend   = () => { if (myGen !== gen) return; i++; if (!muted) speakNext(); else { speech.speaking = false; opts.onEnd && opts.onEnd(); } };
        u.onerror = () => { if (myGen !== gen) return; i++; speakNext(); };
        window.speechSynthesis.speak(u);
      };
      speakNext();
    },
    stop() {
      gen++;
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      speech.speaking = false;
    },
    listVoices() { refreshVoices(); return allVoices.map(v => ({ name: v.name, lang: v.lang })); },
  };

  Object.assign(window, { sfx, speech, setMuted, isMuted });
})();
