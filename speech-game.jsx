// =================================================================
// Speech / Word Quest — fill the missing words in a famous quote.
// Two styles (Tweak): 'tap-choice' (single-tap from 4 choices)
//                     'drag-drop'  (drag word tiles into blanks)
// =================================================================
const { useState: useStateSp, useMemo: useMemoSp, useEffect: useEffectSp, useRef: useRefSp } = React;

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
  const style = tweaks.speech_game_style || 'tap-choice';
  const w = useWordQuest({ page, tweaks, onSolved, onQuestEvent });
  const { quest, picks, focusIdx, wrongIdx, solved, isReading, currentBlank, usedWords } = w;

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

  // drag handlers
  const draggingRef = useRefSp(null);
  const handleDragStart = (word) => (e) => {
    draggingRef.current = word;
    try { e.dataTransfer.setData('text/plain', word); e.dataTransfer.effectAllowed = 'move'; } catch (_) {}
  };
  const handleBlankDrop = (bi) => (e) => {
    e.preventDefault();
    const word = draggingRef.current || (e.dataTransfer && e.dataTransfer.getData('text/plain'));
    draggingRef.current = null;
    w.pickWord(word, bi);
  };

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
        <button onClick={() => { w.stopSpeech(); onClose(); }} style={{
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
          <button onClick={isReading ? w.stopSpeech : w.playSpeech} style={{
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
            <SpeechBody quest={quest} picks={picks} focusIdx={focusIdx} onFocusBlank={w.focusBlank} wrongIdx={wrongIdx} onDropBlank={handleBlankDrop} playingLine={w.playingLine} />
          ) : (
            <SpeechBody quest={quest} picks={picks} focusIdx={focusIdx} onFocusBlank={w.focusBlank} wrongIdx={wrongIdx} playingLine={w.playingLine} />
          )}
        </div>

        {/* Choices area */}
        {!solved && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: 22, color: 'var(--ink-soft)' }}>
                {style === 'drag-drop' ? 'Drag a word into a blank ↓' : `Tap the right word for blank #${focusIdx + 1}`}
              </div>
              <button onClick={() => w.setShowHint(true)} style={{
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
              {(style === 'drag-drop' ? allChoices.map(c => c.word) : currentBlank.choices).map((word, i) => (
                <ChoiceChip key={word + i} word={word} used={usedWords.has(word)}
                  onPick={() => w.pickWord(word)}
                  draggable={style === 'drag-drop'}
                  onDragStart={style === 'drag-drop' ? handleDragStart(word) : undefined}
                  big={tweaks.age_density === 'big'}
                />
              ))}
            </div>
          </div>
        )}

        {/* Hint pop */}
        {w.showHint && !solved && (
          <div style={{
            padding: '10px 14px', background: 'var(--ink)', color: 'var(--paper)',
            borderRadius: 12, fontSize: 14, display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'center',
          }}>
            <span><b>Hint:</b> the word starts with <b>“{currentBlank.answer[0]}”</b> and has <b>{w.hintLetters}</b> letters.</span>
            <button onClick={() => w.setShowHint(false)} style={{ background: 'transparent', color: 'var(--paper)', border: 'none', fontSize: 18 }}>×</button>
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
              try-agains: <b style={{ color: 'var(--accent)' }}>{w.wrongCount}</b>
            </div>
          )}
          {solved && (
            <button onClick={() => { w.stopSpeech(); onClose(); }} style={{
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
