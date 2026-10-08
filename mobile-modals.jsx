// =================================================================
// Mobile Celebration + Mobile Speech Game — bottom-sheet modals
// =================================================================
const { useEffect: useEffectMMod, useMemo: useMemoMMod, useState: useStateMMod, useRef: useRefMMod } = React;

// ---------- Confetti (compact) ----------
function MConfetti({ count = 50 }) {
  const colors = ['#E63946', '#F77F00', '#FFC857', '#90BE6D', '#48BFE3', '#4361EE', '#7209B7', '#F4A6BC'];
  const pieces = useMemoMMod(() => Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 1.2,
    dur: 2.0 + Math.random() * 2.2,
    color: colors[i % colors.length],
    rotate: Math.random() * 360,
    cx: (Math.random() - 0.5) * 180 + 'px',
    cy: '900px',
    cr: (360 + Math.random() * 720) + 'deg',
    shape: i % 3,
  })), [count]);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {pieces.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', top: -20, left: p.left + '%',
          width: p.shape === 2 ? 0 : 10,
          height: p.shape === 2 ? 0 : (p.shape === 0 ? 13 : 10),
          background: p.shape === 2 ? 'transparent' : p.color,
          borderRadius: p.shape === 1 ? '50%' : 2,
          transform: `rotate(${p.rotate}deg)`,
          ['--cx']: p.cx,
          ['--cy']: p.cy,
          ['--cr']: p.cr,
          animation: `confetti-fall ${p.dur}s linear ${p.delay}s forwards`,
          borderTop: p.shape === 2 ? `11px solid ${p.color}` : 'none',
          borderLeft: p.shape === 2 ? '5px solid transparent' : 'none',
          borderRight: p.shape === 2 ? '5px solid transparent' : 'none',
        }} />
      ))}
    </div>
  );
}

function MSparkles({ count = 12 }) {
  const items = useMemoMMod(() => Array.from({ length: count }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100,
    delay: Math.random() * 1.4, size: 10 + Math.random() * 16,
  })), [count]);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {items.map((it, i) => (
        <div key={i} style={{
          position: 'absolute', left: it.x + '%', top: it.y + '%',
          fontSize: it.size, color: '#FFC857',
          animation: `twinkle 1.6s ease-in-out infinite ${it.delay}s`,
          filter: 'drop-shadow(0 0 6px rgba(255,200,80,0.6))',
        }}>✦</div>
      ))}
    </div>
  );
}

function MobileCelebration({ page, fills, strokes, tweaks, onClose, onLibrary, onSpeechQuest, alreadyDone }) {
  const Comp = page.Component;
  const [stage, setStage] = useStateMMod(0);
  const [sheetIn, setSheetIn] = useStateMMod(false);
  const anim = tweaks.animation_style || 'alive';

  useEffectMMod(() => {
    const t1 = setTimeout(() => setSheetIn(true), 30);
    const t2 = setTimeout(() => setStage(1), 1500);
    if (window.sfx) window.sfx.cheer();
    return () => {
      clearTimeout(t1); clearTimeout(t2);
      if (window.speech) window.speech.stop();
    };
  }, []);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: 'rgba(20,14,8,0.65)',
      backdropFilter: 'blur(2px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }} onClick={onClose}>
      {anim !== 'mini-scene' && <MConfetti count={anim === 'confetti' ? 90 : 50} />}

      <div onClick={e => e.stopPropagation()} style={{
        position: 'relative',
        background: 'var(--paper)',
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        border: '2.5px solid var(--ink)',
        borderBottom: 'none',
        boxShadow: '0 -8px 30px rgba(0,0,0,0.3)',
        padding: '12px 16px 20px',
        maxHeight: '92%',
        overflow: 'auto',
        transform: sheetIn ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 360ms cubic-bezier(.2,.9,.3,1)',
      }} className="paper-grain">
        {/* drag handle */}
        <div style={{
          width: 44, height: 4, borderRadius: 999,
          background: 'rgba(31,41,51,0.25)',
          margin: '2px auto 12px',
        }} />

        {/* close button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 14, right: 14,
          width: 32, height: 32, borderRadius: 999,
          background: 'var(--paper)', border: '2px solid var(--ink)',
          boxShadow: '2px 2px 0 var(--ink)',
          fontSize: 14, fontWeight: 800, cursor: 'pointer',
        }}>✕</button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--font-hand)', fontSize: 26, color: 'var(--accent)', lineHeight: 1 }}>woohoo!</div>
          <h2 style={{
            margin: '4px 0 0', fontFamily: 'var(--font-display)',
            fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1,
          }}>
            {alreadyDone ? 'Your finished page!' : 'You finished the page!'}
          </h2>
        </div>

        {/* Colored preview */}
        <div style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          background: page.bgPreview,
          border: '2px solid var(--ink)',
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 14,
          transform: stage === 1 ? 'scale(0.97) rotate(-1.5deg)' : 'scale(1)',
          transition: 'transform 600ms ease-out',
        }} className="paper-fiber">
          <div style={{ position: 'absolute', inset: 0, padding: 10 }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Comp fills={fills} onRegion={() => {}} alive={true} />
              <StrokesLayer strokes={strokes || []} />
            </div>
          </div>
          {anim !== 'confetti' && <MSparkles count={anim === 'mini-scene' ? 18 : 12} />}
        </div>

        {/* Sticker reveal */}
        <div style={{
          padding: 12,
          background: 'var(--paper-2)',
          border: '2px solid var(--ink)',
          borderRadius: 14,
          boxShadow: '3px 3px 0 var(--ink)',
          marginBottom: 12,
          display: 'flex', alignItems: 'center', gap: 12,
          opacity: stage === 1 ? 1 : 0,
          transition: 'opacity 320ms',
          animation: stage === 1 ? 'pop 480ms ease-out' : 'none',
        }}>
          <div style={{
            width: 64, height: 64, flexShrink: 0,
            background: page.eraColor,
            border: '2px dashed #fff', outline: '2px solid var(--ink)',
            borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: 'rotate(-6deg)',
            boxShadow: '3px 3px 0 rgba(0,0,0,0.25)',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 900, color: '#fff',
              fontSize: 10, textAlign: 'center', lineHeight: 1.05, padding: '0 4px',
            }}>{page.eraLabel.toUpperCase()}</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-hand)', fontSize: 16, color: 'var(--accent)', lineHeight: 1 }}>new sticker!</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, lineHeight: 1.15, marginTop: 2 }}>{page.title}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 3, lineHeight: 1.35 }}>{page.fact}</div>
          </div>
        </div>

        {/* Actions */}
        <button onClick={onSpeechQuest} style={{
          width: '100%',
          padding: '14px 16px',
          background: 'var(--accent)', color: '#fff',
          border: '2.5px solid var(--ink)', borderRadius: 14,
          boxShadow: '4px 4px 0 var(--ink)',
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          marginBottom: 10, cursor: 'pointer',
        }}>📜 Try the Word Quest →</button>

        <button onClick={() => {
          if (!window.speech) return;
          const voice = page.quest.voice || {};
          const fullLines = page.quest.lines.map(l => l.replace(/\{(\d+)\}/g, (_m, n) => {
            const bi = parseInt(n, 10);
            return (page.quest.blanks[bi] && page.quest.blanks[bi].answer) || '';
          }));
          window.speech.speak(`${page.quest.heading}. ${page.quest.author}.`, {
            rate: (voice.rate || 0.86) + 0.04, pitch: voice.pitch || 1.0, voiceHints: voice.hints,
            onEnd: () => window.speech.speakLines(fullLines, {
              rate: voice.rate || 0.82, pitch: voice.pitch || 0.96, voiceHints: voice.hints,
            })
          });
        }} style={{
          width: '100%',
          padding: '11px 14px',
          background: 'var(--paper-2)', color: 'var(--ink)',
          border: '2px solid var(--ink)', borderRadius: 12,
          boxShadow: '3px 3px 0 var(--ink)',
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
          marginBottom: 10, cursor: 'pointer',
        }}>🔊 Hear the famous words</button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <button onClick={onClose} style={{
            padding: '10px 12px',
            background: 'var(--paper)', color: 'var(--ink)',
            border: '2px solid var(--ink)', borderRadius: 12,
            boxShadow: '2px 2px 0 var(--ink)',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
          }}>Keep coloring</button>
          <button onClick={onLibrary || onClose} style={{
            padding: '10px 12px',
            background: 'var(--accent-2)', color: '#fff',
            border: '2px solid var(--ink)', borderRadius: 12,
            boxShadow: '2px 2px 0 var(--ink)',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
          }}>Back to Library</button>
        </div>
      </div>
    </div>
  );
}

// =================================================================
// Mobile Speech Game — full-height sheet
// =================================================================
function shuffleM(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function MSpeechBody({ quest, picks, focusIdx, onFocusBlank, wrongIdx, playingLine }) {
  return (
    <div style={{
      fontFamily: 'var(--font-display)',
      fontSize: 17,
      fontWeight: 500,
      lineHeight: 1.55,
      color: 'var(--ink)',
      letterSpacing: '-0.005em',
    }}>
      {quest.lines.map((line, li) => {
        const parts = line.split(/(\{\d+\})/g);
        const isPlaying = playingLine === li;
        return (
          <div key={li} style={{
            marginBottom: 4,
            padding: isPlaying ? '3px 6px' : '0',
            margin: isPlaying ? '0 -6px 4px' : '0 0 4px',
            background: isPlaying ? 'rgba(232,163,61,0.45)' : 'transparent',
            borderRadius: 6,
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
                <button key={si} onClick={() => onFocusBlank(bi)} style={{
                  display: 'inline-block',
                  minWidth: 70,
                  margin: '0 3px',
                  padding: '1px 8px 3px',
                  borderRadius: 6,
                  border: 0,
                  borderBottom: '2.5px solid ' + (correct ? '#2D6A4F' : (focusIdx === bi ? 'var(--accent)' : 'var(--ink)')),
                  background: filled ? (correct ? 'rgba(45,106,79,0.18)' : 'rgba(232,163,61,0.35)') : (focusIdx === bi ? 'rgba(200,16,46,0.12)' : 'transparent'),
                  fontFamily: 'inherit', fontSize: 'inherit',
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

function MChoiceChip({ word, used, onPick }) {
  return (
    <button onClick={used ? undefined : onPick} style={{
      padding: '10px 14px',
      background: used ? 'var(--paper-2)' : 'var(--paper)',
      color: used ? 'var(--ink-soft)' : 'var(--ink)',
      textDecoration: used ? 'line-through' : 'none',
      border: '2px solid var(--ink)',
      borderRadius: 12,
      boxShadow: used ? 'none' : '3px 3px 0 var(--ink)',
      fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15,
      cursor: used ? 'default' : 'pointer',
      opacity: used ? 0.5 : 1,
      transform: used ? 'translate(3px, 3px)' : 'none',
      transition: 'transform 120ms, box-shadow 120ms',
      WebkitTapHighlightColor: 'transparent',
    }}>{word}</button>
  );
}

function MobileSpeechGame({ page, tweaks, onClose, onSolved, onQuestEvent }) {
  const quest = page.quest;
  const [picks, setPicks] = useStateMMod({});
  const [focusIdx, setFocusIdx] = useStateMMod(0);
  const [wrongIdx, setWrongIdx] = useStateMMod(null);
  const [solved, setSolved] = useStateMMod(false);
  const [score, setScore] = useStateMMod({ correct: 0, wrong: 0 });
  const [showHint, setShowHint] = useStateMMod(false);
  const [playingLine, setPlayingLine] = useStateMMod(null);
  const [isReading, setIsReading] = useStateMMod(false);
  const [sheetIn, setSheetIn] = useStateMMod(false);

  useEffectMMod(() => { const t = setTimeout(() => setSheetIn(true), 30); return () => clearTimeout(t); }, []);

  const speakableLines = useMemoMMod(() =>
    quest.lines.map(line => line.replace(/\{(\d+)\}/g, (_, n) => picks[parseInt(n,10)] || 'blank')),
    [quest, picks]);

  const playSpeech = () => {
    if (!window.speech) return;
    setIsReading(true);
    const voice = quest.voice || {};
    window.speech.speak(quest.heading, {
      rate: voice.rate || 0.9, pitch: voice.pitch || 1.0, voiceHints: voice.hints,
      onEnd: () => {
        window.speech.speakLines(speakableLines, {
          rate: voice.rate || 0.82, pitch: voice.pitch || 0.96, voiceHints: voice.hints,
          onLine: (idx) => setPlayingLine(idx),
          onEnd: () => { setPlayingLine(null); setIsReading(false); },
        });
      }
    });
  };
  const stopSpeech = () => { if (window.speech) window.speech.stop(); setPlayingLine(null); setIsReading(false); };

  useEffectMMod(() => {
    if (tweaks.auto_narrate) {
      const t = setTimeout(playSpeech, 380);
      return () => { clearTimeout(t); stopSpeech(); };
    }
    return () => stopSpeech();
  }, []);

  const handlePick = (word) => {
    const correct = word === quest.blanks[focusIdx].answer;
    if (correct) {
      if (window.sfx) window.sfx.correct();
      if (onQuestEvent) onQuestEvent(page.id, 'correct');
      const next = { ...picks, [focusIdx]: word };
      setPicks(next);
      setShowHint(false);
      setScore(s => ({ ...s, correct: s.correct + 1 }));
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

  const currentBlank = quest.blanks[focusIdx];
  const usedWords = new Set(Object.values(picks));

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 60,
      background: 'rgba(20,14,8,0.65)',
      backdropFilter: 'blur(2px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }} onClick={() => { stopSpeech(); onClose(); }}>
      <div onClick={e => e.stopPropagation()} style={{
        position: 'relative',
        background: 'var(--paper)',
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        border: '2.5px solid var(--ink)',
        borderBottom: 'none',
        boxShadow: '0 -8px 30px rgba(0,0,0,0.3), 0 -3px 0 var(--accent-2)',
        padding: '12px 14px 16px',
        height: '94%',
        display: 'flex', flexDirection: 'column',
        transform: sheetIn ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 360ms cubic-bezier(.2,.9,.3,1)',
      }} className="paper-grain">

        {/* drag handle */}
        <div style={{
          width: 44, height: 4, borderRadius: 999,
          background: 'rgba(31,41,51,0.25)',
          margin: '2px auto 10px',
          flexShrink: 0,
        }} />

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, marginBottom: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              display: 'inline-block',
              background: 'var(--accent-2)', color: '#fff',
              padding: '2px 9px', borderRadius: 999,
              fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
              border: '1.5px solid var(--ink)', marginBottom: 4,
            }}>📜 Word Quest</div>
            <h2 style={{
              margin: 0, fontFamily: 'var(--font-display)',
              fontSize: 19, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.015em',
            }}>{quest.heading}</h2>
            <div style={{ color: 'var(--ink-soft)', fontSize: 11, fontStyle: 'italic' }}>{quest.author}</div>
          </div>
          <button onClick={isReading ? stopSpeech : playSpeech} style={{
            padding: '8px 12px 8px 8px', flexShrink: 0,
            background: isReading ? 'var(--ink)' : 'var(--accent)',
            color: '#fff',
            border: '2px solid var(--ink)', borderRadius: 12,
            boxShadow: '2px 2px 0 var(--ink)',
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{
              width: 22, height: 22, borderRadius: 999,
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
            }}>{isReading ? '⏸' : '▶'}</span>
            {isReading ? 'Stop' : 'Play'}
          </button>
          <button onClick={() => { stopSpeech(); onClose(); }} style={{
            width: 32, height: 32, borderRadius: 999,
            background: 'var(--paper)', border: '2px solid var(--ink)',
            boxShadow: '2px 2px 0 var(--ink)',
            fontSize: 14, fontWeight: 800, cursor: 'pointer', flexShrink: 0,
          }}>✕</button>
        </div>

        {/* Speech body — scroll area */}
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', minHeight: 0 }}>
          <div style={{
            background: 'var(--paper-2)',
            border: '2px solid var(--ink)',
            borderRadius: 14,
            padding: '14px 16px',
            position: 'relative',
            marginBottom: 12,
          }}>
            <div style={{
              position: 'absolute', top: -2, left: 8,
              fontFamily: 'var(--font-display)', fontSize: 52, color: 'var(--accent)',
              lineHeight: 1, fontWeight: 900, opacity: 0.35, pointerEvents: 'none',
            }}>"</div>
            <MSpeechBody quest={quest} picks={picks} focusIdx={focusIdx}
              onFocusBlank={(bi) => { if (!picks[bi]) setFocusIdx(bi); }}
              wrongIdx={wrongIdx} playingLine={playingLine} />
          </div>
        </div>

        {/* Score dots + hint */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, padding: '4px 0 8px' }}>
          <span style={{ display: 'flex', gap: 4 }}>
            {quest.blanks.map((_, i) => (
              <span key={i} style={{
                width: 18, height: 18, borderRadius: 999,
                border: '2px solid var(--ink)',
                background: picks[i] ? '#2D6A4F' : 'var(--paper-2)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 900,
              }}>{picks[i] ? '✓' : i + 1}</span>
            ))}
          </span>
          <div style={{ flex: 1 }} />
          {!solved && (
            <button onClick={() => setShowHint(true)} style={{
              padding: '4px 10px',
              background: 'var(--paper-2)',
              border: '2px solid var(--ink)', borderRadius: 999,
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11,
            }}>💡 Hint</button>
          )}
        </div>

        {/* Hint banner */}
        {showHint && !solved && (
          <div style={{
            padding: '8px 12px',
            background: 'var(--ink)', color: 'var(--paper)',
            borderRadius: 10,
            fontSize: 12, lineHeight: 1.3,
            display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center',
            flexShrink: 0, marginBottom: 8,
          }}>
            <span>Starts with <b>"{currentBlank.answer[0]}"</b> · <b>{currentBlank.answer.replace(/[^\p{L}]/gu, '').length}</b> letters</span>
            <button onClick={() => setShowHint(false)} style={{ background: 'transparent', color: 'var(--paper)', border: 'none', fontSize: 16 }}>×</button>
          </div>
        )}

        {/* Choices */}
        {!solved ? (
          <div style={{ flexShrink: 0 }}>
            <div style={{
              fontFamily: 'var(--font-hand)', fontSize: 16, color: 'var(--ink-soft)',
              marginBottom: 6, textAlign: 'center',
            }}>tap the right word for blank #{focusIdx + 1}</div>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center',
              padding: 10, background: 'rgba(232,163,61,0.18)',
              border: '2px dashed var(--rule)', borderRadius: 14,
            }}>
              {currentBlank.choices.map((w, i) => (
                <MChoiceChip key={w + i} word={w} used={usedWords.has(w)} onPick={() => handlePick(w)} />
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            flexShrink: 0, padding: '12px 16px',
            background: '#2D6A4F', color: '#fff',
            border: '2.5px solid var(--ink)', borderRadius: 14,
            boxShadow: '3px 3px 0 var(--ink)',
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15,
            textAlign: 'center',
            animation: 'pop 480ms ease-out',
          }}>🎉 Junior Historian unlocked!</div>
        )}
      </div>
    </div>
  );
}

window.MobileCelebration = MobileCelebration;
window.MobileSpeechGame = MobileSpeechGame;
