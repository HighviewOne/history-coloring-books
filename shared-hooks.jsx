// =================================================================
// shared-hooks.jsx — state + behavior shared by the desktop and mobile
// apps. Each screen keeps its own layout; the logic lives here so a fix
// lands in both versions at once.
// =================================================================

const PROGRESS_KEY = 'hcb-progress-v1';
const ERASER_HEX = '#FFFFFF';

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Progress store ───────────────────────────────────────────
// progressMap: id -> { fills, strokes, completed, celebrated, midShown,
//                      questSolved, quest, opens, lastOpenedAt, timeMs }
function useProgressStore() {
  const [progressMap, setProgressMap] = React.useState(() => {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  });

  const [saveFailed, setSaveFailed] = React.useState(false);
  React.useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressMap));
      setSaveFailed(false);
    } catch (e) { setSaveFailed(true); }
  }, [progressMap]);

  const patch = (id, fields) => setProgressMap(m => ({ ...m, [id]: { ...(m[id] || {}), ...fields } }));

  const actions = {
    markOpened(id) {
      setProgressMap(m => {
        const cur = m[id] || {};
        return { ...m, [id]: { ...cur, opens: (cur.opens || 0) + 1, lastOpenedAt: Date.now() } };
      });
    },
    // Replace a page's progress wholesale (the coloring screen builds the full object).
    update(id, prog) { setProgressMap(m => ({ ...m, [id]: prog })); },
    patch,
    markComplete(id) { patch(id, { completed: true, celebrated: true }); },
    addTime(id, ms) {
      setProgressMap(m => {
        const cur = m[id] || {};
        return { ...m, [id]: { ...cur, timeMs: (cur.timeMs || 0) + ms } };
      });
    },
    // Called by the Word Quest on every blank answered (correct or wrong) and on solve.
    recordQuestEvent(id, type) {
      setProgressMap(m => {
        const cur = m[id] || {};
        const q = cur.quest || { correct: 0, wrong: 0, solved: false };
        const next = { ...q };
        if (type === 'correct') next.correct = q.correct + 1;
        else if (type === 'wrong') next.wrong = q.wrong + 1;
        else if (type === 'solved') next.solved = true;
        const extra = type === 'solved' ? { questSolved: true } : {};
        return { ...m, [id]: { ...cur, ...extra, quest: next, lastOpenedAt: Date.now() } };
      });
    },
    resetPage(id) {
      setProgressMap(m => {
        const n = { ...m };
        delete n[id];
        return n;
      });
    },
    resetAll() {
      setProgressMap({});
      try { localStorage.removeItem(PROGRESS_KEY); } catch (e) {}
    },
  };

  return [progressMap, actions, saveFailed];
}

// Push the sound + voice Tweaks into the audio module.
function useAudioTweaks(tweaks) {
  React.useEffect(() => {
    if (window.setMuted) window.setMuted(!tweaks.sound_on);
  }, [tweaks.sound_on]);
  React.useEffect(() => {
    window.__voiceOverrides = {
      name: tweaks.voice_override || 'auto',
      rateMul: (tweaks.voice_rate || 100) / 100,
      pitchMul: (tweaks.voice_pitch || 100) / 100,
    };
  }, [tweaks.voice_override, tweaks.voice_rate, tweaks.voice_pitch]);
}

function applyTheme(themeKey) {
  const t = THEMES[themeKey] || THEMES['warm-classroom'];
  Object.entries(t.vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
}

// Track time-on-task while a page is open in the coloring screen. Committed
// every 30s and when leaving, not on every tick: each commit re-saves the
// whole progress map (brush strokes included) to localStorage.
// Time while the tab is hidden (another tab, laptop closed) is not counted,
// and hiding the tab commits right away, so closing it rarely loses time.
function useTimeOnTask(active, pageId, addTime) {
  React.useEffect(() => {
    if (!active || !pageId) return;
    let last = document.hidden ? null : Date.now();
    const commit = () => {
      if (last === null) return;
      const now = Date.now();
      const delta = now - last;
      last = now;
      if (delta > 0) addTime(pageId, delta);
    };
    const onVisibility = () => {
      if (document.hidden) { commit(); last = null; }
      else last = Date.now();
    };
    document.addEventListener('visibilitychange', onVisibility);
    const handle = setInterval(commit, 30000);
    return () => {
      clearInterval(handle);
      document.removeEventListener('visibilitychange', onVisibility);
      commit();
    };
  }, [active, pageId]);
}

// ── Coloring ─────────────────────────────────────────────────
function useColoring({ page, progress, onProgress, onComplete, defaultBrushWidth = 12, clearPrompt }) {
  const [color, setColor] = React.useState(CRAYONS[0].hex);
  const [crayonName, setCrayonName] = React.useState(CRAYONS[0].name);
  const [history, setHistory] = React.useState([]); // [{type:'fill'|'stroke', ...}]
  const [showHint, setShowHint] = React.useState(false);
  const [floatBurst, setFloatBurst] = React.useState(null); // {key,color}
  const [mode, setMode] = React.useState('fill'); // 'fill' | 'brush'
  const [brushMode, setBrushMode] = React.useState('paint'); // 'paint' | 'erase'
  const [brushWidth, setBrushWidth] = React.useState(defaultBrushWidth);
  const fills = progress?.fills || {};
  const strokes = progress?.strokes || [];
  const total = page.regions.length;
  const colored = React.useMemo(() => page.regions.filter(r => fills[r] && fills[r] !== ERASER_HEX).length, [fills, page]);
  const pct = total ? Math.round((colored / total) * 100) : 0;

  // Tip the user when they pass halfway
  React.useEffect(() => {
    if (pct >= 50 && pct < 100 && !progress?.midShown) {
      setShowHint(true);
      onProgress(page.id, { ...progress, midShown: true, fills });
    }
  }, [pct]);

  // Auto-prompt for celebration when 100%
  React.useEffect(() => {
    if (colored >= total && total > 0 && !progress?.celebrated) {
      // small delay to let last fill render
      const t = setTimeout(() => onComplete(page.id), 480);
      return () => clearTimeout(t);
    }
  }, [colored, total]);

  const pickCrayon = (c) => {
    if (window.sfx) window.sfx.pop();
    setColor(c.hex); setCrayonName(c.name);
    // In brush mode the eraser crayon erases; any other crayon paints.
    setBrushMode(c.hex === ERASER_HEX ? 'erase' : 'paint');
  };

  const selectMode = (m) => {
    setMode(m);
    setBrushMode(color === ERASER_HEX ? 'erase' : 'paint');
    if (window.sfx) window.sfx.pop();
  };

  const toggleErase = () => {
    if (mode !== 'brush') { setColor(ERASER_HEX); setCrayonName('Eraser'); return; }
    if (brushMode === 'erase') {
      setBrushMode('paint');
      // Leaving erase with the eraser crayon picked: switch to a real crayon
      // so the crayon box matches what the brush paints.
      if (color === ERASER_HEX) { setColor(CRAYONS[0].hex); setCrayonName(CRAYONS[0].name); }
    } else {
      setBrushMode('erase');
    }
  };

  const handleRegion = (id) => {
    if (mode !== 'fill') return; // brush mode owns the canvas
    const prev = fills[id] || ERASER_HEX;
    if (prev === color) return; // no-op
    const next = { ...fills, [id]: color };
    setHistory(h => [...h.slice(-30), { type: 'fill', region: id, prevColor: prev }]);
    onProgress(page.id, { ...progress, fills: next });
    // crayon scribble sound + small fill tick
    if (window.sfx) {
      window.sfx.scribble();
      setTimeout(() => window.sfx.fill(), 110);
    }
    // floaty crayon dot
    setFloatBurst({ key: Math.random(), color });
    setTimeout(() => setFloatBurst(null), 800);
  };

  const handleStroke = (stroke) => {
    setHistory(h => [...h.slice(-60), { type: 'stroke', strokeId: stroke.id }]);
    onProgress(page.id, { ...progress, fills, strokes: [...strokes, stroke] });
  };

  const handleUndo = () => {
    if (!history.length) return;
    const last = history[history.length - 1];
    if (last.type === 'stroke') {
      onProgress(page.id, { ...progress, fills, strokes: strokes.filter(s => s.id !== last.strokeId) });
    } else if (last.type === 'random') {
      onProgress(page.id, { ...progress, fills: last.prevFills, strokes });
    } else {
      const next = { ...fills, [last.region]: last.prevColor };
      if (last.prevColor === ERASER_HEX) delete next[last.region];
      onProgress(page.id, { ...progress, fills: next, strokes });
    }
    setHistory(h => h.slice(0, -1));
  };

  // Fill every empty region with a random crayon (one undo step).
  const handleRandom = () => {
    const palette = CRAYONS.filter(c => c.hex !== ERASER_HEX);
    const next = { ...fills };
    page.regions.forEach(r => {
      if (!next[r] || next[r] === ERASER_HEX) {
        next[r] = palette[Math.floor(Math.random() * palette.length)].hex;
      }
    });
    setHistory(h => [...h.slice(-30), { type: 'random', prevFills: fills }]);
    onProgress(page.id, { ...progress, fills: next, strokes });
  };

  const handleClear = () => {
    if (!confirm(clearPrompt || 'Erase all colors and brush strokes?')) return;
    setHistory([]);
    onProgress(page.id, { ...progress, fills: {}, strokes: [], midShown: false, celebrated: false });
  };

  const closeHint = () => { if (window.speech) window.speech.stop(); setShowHint(false); };

  return {
    color, crayonName, mode, brushMode, brushWidth, setBrushWidth,
    fills, strokes, pct, floatBurst, showHint, closeHint,
    canUndo: history.length > 0,
    canClear: Object.keys(fills).length > 0 || strokes.length > 0,
    // The eraser crayon never paints: in brush mode it erases (see pickCrayon).
    brushColor: color === ERASER_HEX ? CRAYONS[0].hex : color,
    pickCrayon, selectMode, toggleErase,
    handleRegion, handleStroke, handleUndo, handleRandom, handleClear,
  };
}

// ── Dialog focus ─────────────────────────────────────────────
// For overlays (celebration, Word Quest): moves keyboard focus into the
// dialog, keeps Tab inside it, closes on Escape, and puts focus back where
// it was (e.g. the region just colored) when the dialog closes.
// Spread the returned props on the dialog panel.
function useDialog(onClose) {
  const ref = React.useRef(null);
  const closeRef = React.useRef(onClose);
  closeRef.current = onClose;
  React.useEffect(() => {
    const prev = document.activeElement;
    const el = ref.current;
    if (el) el.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); closeRef.current && closeRef.current(); return; }
      if (e.key !== 'Tab' || !el) return;
      const items = [...el.querySelectorAll('button, [tabindex="0"]')].filter(n => !n.disabled && n.offsetParent !== null);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === el)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (document.activeElement === last || !el.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (prev && prev.isConnected && prev.focus) prev.focus({ preventScroll: true });
    };
  }, []);
  return { ref, role: 'dialog', 'aria-modal': true, tabIndex: -1 };
}

// ── Read-aloud helpers ───────────────────────────────────────
function questFullLines(quest) {
  return quest.lines.map(l => l.replace(/\{(\d+)\}/g, (_m, n) => {
    const b = quest.blanks[parseInt(n, 10)];
    return (b && b.answer) || '';
  }));
}

// "Hear the famous words": heading + author, then the full text.
function speakFamousWords(page) {
  if (!window.speech) return;
  const quest = page.quest;
  const voice = quest.voice || {};
  window.speech.speak(`${quest.heading}. ${quest.author}.`, {
    rate: (voice.rate || 0.86) + 0.04,
    pitch: voice.pitch || 1.0,
    voiceHints: voice.hints,
    onEnd: () => window.speech.speakLines(questFullLines(quest), {
      rate: voice.rate || 0.82,
      pitch: voice.pitch || 0.96,
      voiceHints: voice.hints,
    }),
  });
}

// ── Word Quest ───────────────────────────────────────────────
function useWordQuest({ page, tweaks, onSolved, onQuestEvent }) {
  const quest = page.quest;
  const [picks, setPicks] = React.useState({}); // bi -> word
  const [focusIdx, setFocusIdx] = React.useState(0);
  const [wrongIdx, setWrongIdx] = React.useState(null);
  const [solved, setSolved] = React.useState(false);
  const [wrongCount, setWrongCount] = React.useState(0);
  const [showHint, setShowHint] = React.useState(false);
  const [playingLine, setPlayingLine] = React.useState(null);
  const [isReading, setIsReading] = React.useState(false);

  // Speakable version of each line — fill blanks with the picked word or
  // "blank" if unfilled, so the rhythm makes sense.
  const speakableLines = React.useMemo(() => quest.lines.map(line => line.replace(/\{(\d+)\}/g, (_, n) => picks[parseInt(n, 10)] || 'blank')), [quest, picks]);

  const playSpeech = () => {
    if (!window.speech) return;
    setIsReading(true);
    const voice = quest.voice || {};
    // small announcement first
    window.speech.speak(quest.heading, {
      rate: voice.rate || 0.9,
      pitch: voice.pitch || 1.0,
      voiceHints: voice.hints,
      onEnd: () => {
        window.speech.speakLines(speakableLines, {
          rate: voice.rate || 0.82,
          pitch: voice.pitch || 0.96,
          voiceHints: voice.hints,
          onLine: (idx) => setPlayingLine(idx),
          onEnd: () => { setPlayingLine(null); setIsReading(false); },
        });
      },
    });
  };

  const stopSpeech = () => {
    if (window.speech) window.speech.stop();
    setPlayingLine(null);
    setIsReading(false);
  };

  // Auto-narrate on first open if tweak enabled
  React.useEffect(() => {
    if (tweaks.auto_narrate) {
      const t = setTimeout(playSpeech, 380);
      return () => { clearTimeout(t); stopSpeech(); };
    }
    return () => stopSpeech();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A solved blank can't be refocused: its answer chip is already crossed
  // out, so every tap there would count as a wrong try.
  const focusBlank = (bi) => { if (!picks[bi]) setFocusIdx(bi); };

  // Answer blank `bi` (defaults to the focused one) with `word`.
  const pickWord = (word, bi = focusIdx) => {
    if (!word || picks[bi]) return;
    setFocusIdx(bi);
    if (word === quest.blanks[bi].answer) {
      if (window.sfx) window.sfx.correct();
      if (onQuestEvent) onQuestEvent(page.id, 'correct');
      const next = { ...picks, [bi]: word };
      setPicks(next);
      setShowHint(false);
      // advance to next unfilled blank
      const nextEmpty = quest.blanks.findIndex((_, i) => !next[i]);
      if (nextEmpty === -1) {
        setSolved(true);
        if (window.sfx) window.sfx.cheer();
        setTimeout(() => onSolved && onSolved(page.id), 1100);
      } else {
        setFocusIdx(nextEmpty);
      }
    } else {
      if (window.sfx) window.sfx.wrong();
      if (onQuestEvent) onQuestEvent(page.id, 'wrong');
      setWrongIdx(bi);
      setWrongCount(n => n + 1);
      setTimeout(() => setWrongIdx(null), 360);
    }
  };

  const currentBlank = quest.blanks[focusIdx];
  return {
    quest, picks, focusIdx, focusBlank, wrongIdx, solved, wrongCount,
    showHint, setShowHint, playingLine, isReading, playSpeech, stopSpeech,
    pickWord, currentBlank,
    usedWords: new Set(Object.values(picks)),
    hintLetters: currentBlank.answer.replace(/[^\p{L}]/gu, '').length,
  };
}

Object.assign(window, {
  shuffle, useProgressStore, useAudioTweaks, applyTheme, useTimeOnTask,
  useColoring, useWordQuest, speakFamousWords, questFullLines, useDialog,
});
