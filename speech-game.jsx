// =================================================================
// Speech / Word Quest — fill the missing words in a famous quote.
// Two styles (Tweak): 'tap-choice' (single-tap from 4 choices)
//                     'drag-drop'  (drag word tiles into blanks)
// =================================================================
const { useState: useStateSp, useMemo: useMemoSp, useEffect: useEffectSp, useRef: useRefSp } = React;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Render the speech lines, weaving filled-or-blank tokens for {N}
function SpeechBody({ quest, picks, focusIdx, onFocusBlank, wrongIdx, onDropBlank, playingLine }) {
  return (
    <div style={{
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      fontWeight: 500,
      lineHeight: 1.55,
      color: 'var(--ink)',
      letterSpacing: '-0.005em',
    }}>
      {quest.lines.map((line, li) => {
        // split on {N}
        const parts = line.split(/(\{\d+\})/g);
        const isPlaying = playingLine === li;
        return (
          <div key={li} style={{
            marginBottom: 6,
            padding: isPlaying ? '4px 8px' : '0',
            margin: isPlaying ? '0 -8px 6px' : '0 0 6px',
            background: isPlaying ? 'rgba(232,163,61,0.45)' : 'transparent',
            borderRadius: 8,
            transition: 'background 220ms',
          }}>
            {parts.map((seg, si) => {
              const m = seg.match(/^\{(\d+)\}$/);
              if (!m) return <span key={si}>{seg}</span>;
              const bi = parseInt(m[1], 10);
              const filled = picks[bi];
              const correct = filled && filled === quest.blanks[bi].answer;
              const wrongHere = wrongIdx === bi;
              return (
                <button key={si} onClick={() => onFocusBlank(bi)}
                  onDragOver={onDropBlank ? (e) => e.preventDefault() : undefined}
                  onDrop={onDropBlank ? onDropBlank(bi) : undefined}
                  style={{
                  display: 'inline-block',
                  minWidth: 110,
                  margin: '0 4px',
                  padding: '2px 12px 4px',
                  borderRadius: 8,
                  border: '0',
                  borderBottom: '3px solid ' + (correct ? '#2D6A4F' : (focusIdx === bi ? 'var(--accent)' : 'var(--ink)')),
                  background: filled ? (correct ? 'rgba(45,106,79,0.18)' : 'rgba(232,163,61,0.35)') : (focusIdx === bi ? 'rgba(200,16,46,0.12)' : 'transparent'),
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  fontWeight: 800,
                  fontStyle: filled ? 'normal' : 'italic',
                  color: filled ? 'var(--ink)' : 'var(--ink-soft)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  animation: wrongHere ? 'shake 320ms ease-out' : 'none',
                }}>
                  {filled || '_____'}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function ChoiceChip({ word, used, onPick, big, draggable, onDragStart }) {
  return (
    <div
      onClick={used ? undefined : onPick}
      draggable={draggable && !used}
      onDragStart={onDragStart}
      style={{
        padding: big ? '14px 22px' : '12px 18px',
        background: used ? 'var(--paper-2)' : 'var(--paper)',
        color: used ? 'var(--ink-soft)' : 'var(--ink)',
        textDecoration: used ? 'line-through' : 'none',
        border: '2.5px solid var(--ink)',
        borderRadius: 14,
        boxShadow: used ? 'none' : '4px 4px 0 var(--ink)',
        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: big ? 22 : 18,
        cursor: used ? 'default' : (draggable ? 'grab' : 'pointer'),
        transition: 'transform 120ms, box-shadow 120ms',
        userSelect: 'none',
        opacity: used ? 0.45 : 1,
        transform: used ? 'translate(4px, 4px)' : 'none',
      }}
    >{word}</div>
  );
}

function SpeechGame({ page, tweaks, onClose, onSolved, onQuestEvent }) {
  const quest = page.quest;
  const style = tweaks.speech_game_style || 'tap-choice';
  const [picks, setPicks] = useStateSp({}); // bi -> word
  const [focusIdx, setFocusIdx] = useStateSp(0);
  const [wrongIdx, setWrongIdx] = useStateSp(null);
  const [solved, setSolved] = useStateSp(false);
  const [score, setScore] = useStateSp({ correct: 0, wrong: 0 });
  const [showHint, setShowHint] = useStateSp(false);
  const [playingLine, setPlayingLine] = useStateSp(null);
  const [isReading, setIsReading] = useStateSp(false);

  // Build a "speakable" version of each line — fill blanks with picked word
  // or "blank" if unfilled, so the rhythm makes sense.
  const speakableLines = useMemoSp(() => {
    return quest.lines.map(line => line.replace(/\{(\d+)\}/g, (_, n) => {
      const bi = parseInt(n, 10);
      return picks[bi] || 'blank';
    }));
  }, [quest, picks]);

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
      }
    });
  };

  const stopSpeech = () => {
    if (window.speech) window.speech.stop();
    setPlayingLine(null);
    setIsReading(false);
  };

  // Auto-narrate on first open if tweak enabled
  useEffectSp(() => {
    if (tweaks.auto_narrate) {
      const t = setTimeout(playSpeech, 380);
      return () => { clearTimeout(t); stopSpeech(); };
    }
    return () => stopSpeech();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // For drag-drop: maintain a shared pool of word tiles
  const allChoices = useMemoSp(() => {
    if (style !== 'drag-drop') return null;
    const pool = [];
    quest.blanks.forEach((b, i) => {
      b.choices.forEach(c => pool.push({ word: c, blankHint: i }));
    });
    // dedupe by word, prefer first occurrence
    const seen = new Set();
    return shuffle(pool.filter(p => { if (seen.has(p.word)) return false; seen.add(p.word); return true; }));
  }, [page.id, style]);

  const handlePick = (word) => {
    const correct = word === quest.blanks[focusIdx].answer;
    if (correct) {
      if (window.sfx) window.sfx.correct();
      if (onQuestEvent) onQuestEvent(page.id, 'correct');
      const next = { ...picks, [focusIdx]: word };
      setPicks(next);
      setScore(s => ({ ...s, correct: s.correct + 1 }));
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
      setWrongIdx(focusIdx);
      setScore(s => ({ ...s, wrong: s.wrong + 1 }));
      setTimeout(() => setWrongIdx(null), 360);
    }
  };

  // drag handlers
  const draggingRef = useRefSp(null);
  const handleDragStart = (word) => (e) => {
    draggingRef.current = word;
    try { e.dataTransfer.setData('text/plain', word); e.dataTransfer.effectAllowed = 'move'; } catch (_) {}
  };
  const handleBlankDrop = (bi) => (e) => {
    e.preventDefault();
    const word = draggingRef.current || (e.dataTransfer && e.dataTransfer.getData('text/plain'));
    if (!word) return;
    setFocusIdx(bi);
    const correct = word === quest.blanks[bi].answer;
    if (correct) {
      if (window.sfx) window.sfx.correct();
      if (onQuestEvent) onQuestEvent(page.id, 'correct');
      const next = { ...picks, [bi]: word };
      setPicks(next);
      setScore(s => ({ ...s, correct: s.correct + 1 }));
      const nextEmpty = quest.blanks.findIndex((_, i) => !next[i]);
      if (nextEmpty === -1) {
        setSolved(true);
        if (window.sfx) window.sfx.cheer();
        setTimeout(() => onSolved && onSolved(page.id), 1100);
      } else { setFocusIdx(nextEmpty); }
    } else {
      if (window.sfx) window.sfx.wrong();
      if (onQuestEvent) onQuestEvent(page.id, 'wrong');
      setWrongIdx(bi);
      setScore(s => ({ ...s, wrong: s.wrong + 1 }));
      setTimeout(() => setWrongIdx(null), 360);
    }
    draggingRef.current = null;
  };

  const currentBlank = quest.blanks[focusIdx];
  const usedWords = new Set(Object.values(picks));

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 60,
      background: 'rgba(20, 14, 8, 0.78)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(2px)',
    }}>
      <div style={{
        position: 'relative',
        width: 'min(94vw, 920px)',
        maxHeight: '92vh',
        background: 'var(--paper)',
        border: '3px solid var(--ink)',
        borderRadius: 26,
        boxShadow: '8px 8px 0 var(--accent-2), 0 24px 60px rgba(0,0,0,0.35)',
        padding: 28,
        display: 'flex', flexDirection: 'column', gap: 18,
        overflow: 'auto',
      }} className="paper-grain">
        {/* close */}
        <button onClick={() => { stopSpeech(); onClose(); }} style={{
          position: 'absolute', top: 14, right: 14, zIndex: 4,
          width: 36, height: 36, borderRadius: 999,
          background: 'var(--paper)', border: '2.5px solid var(--ink)',
          boxShadow: '2px 2px 0 var(--ink)',
          fontSize: 16, fontWeight: 800, cursor: 'pointer',
        }}>✕</button>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'inline-block', background: 'var(--accent-2)', color: '#fff', padding: '3px 11px', borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', border: '1.5px solid var(--ink)' }}>📜 Word Quest</div>
            <h2 style={{ margin: '8px 0 2px', fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.015em' }}>{quest.heading}</h2>
            <div style={{ color: 'var(--ink-soft)', fontSize: 14, fontStyle: 'italic' }}>{quest.author}</div>
          </div>
          <button onClick={isReading ? stopSpeech : playSpeech} style={{
            flexShrink: 0,
            padding: '11px 16px 11px 12px',
            background: isReading ? 'var(--ink)' : 'var(--accent)',
            color: '#fff',
            border: '2.5px solid var(--ink)', borderRadius: 14,
            boxShadow: '4px 4px 0 var(--ink)',
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15,
            display: 'flex', alignItems: 'center', gap: 8,
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            <span style={{
              width: 28, height: 28, borderRadius: 999, background: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
            }}>{isReading ? '⏸' : '▶'}</span>
            <span>{isReading ? 'Stop' : 'Play speech'}</span>
          </button>
        </div>

        {/* Speech body */}
        <div style={{
          background: 'var(--paper-2)',
          border: '2.5px solid var(--ink)',
          borderRadius: 18,
          padding: '22px 26px',
          position: 'relative',
        }}>
          {/* quote marks decoration */}
          <div style={{ position: 'absolute', top: -2, left: 10, fontFamily: 'var(--font-display)', fontSize: 80, color: 'var(--accent)', lineHeight: 1, fontWeight: 900, opacity: 0.4, pointerEvents: 'none' }}>"</div>
          <div style={{ position: 'absolute', bottom: -36, right: 14, fontFamily: 'var(--font-display)', fontSize: 80, color: 'var(--accent)', lineHeight: 1, fontWeight: 900, opacity: 0.4, pointerEvents: 'none' }}>"</div>

          {style === 'drag-drop' ? (
            <SpeechBody quest={quest} picks={picks} focusIdx={focusIdx} onFocusBlank={(bi) => setFocusIdx(bi)} wrongIdx={wrongIdx} onDropBlank={handleBlankDrop} playingLine={playingLine} />
          ) : (
            <SpeechBody quest={quest} picks={picks} focusIdx={focusIdx} onFocusBlank={(bi) => setFocusIdx(bi)} wrongIdx={wrongIdx} playingLine={playingLine} />
          )}
        </div>

        {/* Choices area */}
        {!solved && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: 22, color: 'var(--ink-soft)' }}>
                {style === 'drag-drop' ? 'Drag a word into a blank ↓' : `Tap the right word for blank #${focusIdx + 1}`}
              </div>
              <button onClick={() => setShowHint(true)} style={{
                padding: '6px 12px',
                background: 'var(--paper-2)',
                border: '2px solid var(--ink)',
                borderRadius: 999,
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
              }}>💡 Hint</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, padding: 14, background: 'rgba(232,163,61,0.18)', border: '2.5px dashed var(--rule)', borderRadius: 16 }}
              onDragOver={(e) => e.preventDefault()}
            >
              {(style === 'drag-drop' ? allChoices.map(c => c.word) : currentBlank.choices).map((w, i) => (
                <ChoiceChip key={w + i} word={w} used={usedWords.has(w)}
                  onPick={() => handlePick(w)}
                  draggable={style === 'drag-drop'}
                  onDragStart={style === 'drag-drop' ? handleDragStart(w) : undefined}
                  big={tweaks.age_density === 'big'}
                />
              ))}
            </div>
          </div>
        )}

        {/* Hint pop */}
        {showHint && !solved && (
          <div style={{
            padding: '10px 14px', background: 'var(--ink)', color: 'var(--paper)',
            borderRadius: 12, fontSize: 14, display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'center',
          }}>
            <span><b>Hint:</b> the word starts with <b>“{currentBlank.answer[0]}”</b> and has <b>{currentBlank.answer.replace(/[^a-zA-Z]/g, '').length}</b> letters.</span>
            <button onClick={() => setShowHint(false)} style={{ background: 'transparent', color: 'var(--paper)', border: 'none', fontSize: 18 }}>×</button>
          </div>
        )}

        {/* Score / footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', borderTop: '2px dashed var(--rule)', paddingTop: 14 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-hand)', fontSize: 20, color: 'var(--ink-soft)' }}>score:</span>
            <span style={{ display: 'flex', gap: 6 }}>
              {quest.blanks.map((_, i) => (
                <span key={i} style={{
                  width: 22, height: 22, borderRadius: 999,
                  border: '2px solid var(--ink)',
                  background: picks[i] ? '#2D6A4F' : 'var(--paper-2)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 900,
                }}>{picks[i] ? '✓' : i + 1}</span>
              ))}
            </span>
          </div>
          <div style={{ flex: 1 }} />
          {solved ? (
            <div style={{
              padding: '12px 18px',
              background: '#2D6A4F', color: '#fff',
              border: '2.5px solid var(--ink)', borderRadius: 14,
              boxShadow: '3px 3px 0 var(--ink)',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18,
              animation: 'pop 480ms ease-out',
            }}>🎉 You solved it! Junior Historian unlocked.</div>
          ) : (
            <div style={{ fontFamily: 'var(--font-hand)', fontSize: 20, color: 'var(--ink-soft)' }}>
              try-agains: <b style={{ color: 'var(--accent)' }}>{score.wrong}</b>
            </div>
          )}
          {solved && (
            <button onClick={() => { stopSpeech(); onClose(); }} style={{
              padding: '12px 18px',
              background: 'var(--accent)', color: '#fff',
              border: '2.5px solid var(--ink)', borderRadius: 14,
              boxShadow: '3px 3px 0 var(--ink)',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16,
            }}>Done →</button>
          )}
        </div>
      </div>
    </div>
  );
}

window.SpeechGame = SpeechGame;
