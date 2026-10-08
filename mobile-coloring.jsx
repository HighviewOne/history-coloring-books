// =================================================================
// Mobile Coloring Screen — bottom tool dock + crayon strip.
// =================================================================
const { useState: useStateMCol, useEffect: useEffectMCol, useMemo: useMemoMCol, useRef: useRefMCol } = React;

function MCrayonSwatch({ crayon, active, onClick }) {
  const isEraser = crayon.hex === '#FFFFFF';
  return (
    <button onClick={onClick} title={crayon.name} style={{
      position: 'relative',
      width: 40, height: 52, flexShrink: 0,
      background: 'transparent', border: 'none', padding: 0,
      cursor: 'pointer',
      transform: active ? 'translateY(-8px) rotate(-3deg)' : 'translateY(0)',
      transition: 'transform 160ms ease-out',
      WebkitTapHighlightColor: 'transparent',
    }}>
      <svg viewBox="0 0 56 90" width="40" height="52" style={{ display: 'block' }}>
        <polygon points="14,4 42,4 36,22 20,22" fill={isEraser ? '#F4A6BC' : crayon.hex} stroke="#1A1A22" strokeWidth="3" strokeLinejoin="round" />
        <rect x="10" y="22" width="36" height="58" rx="4" fill={isEraser ? '#FFFDF5' : crayon.hex} stroke="#1A1A22" strokeWidth="3" />
        <rect x="10" y="44" width="36" height="14" fill="#FFFDF5" stroke="#1A1A22" strokeWidth="2" />
        {isEraser && <text x="28" y="38" textAnchor="middle" fontSize="14" fontWeight="900" fill="#1A1A22">✕</text>}
      </svg>
      {active && (
        <div style={{
          position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
          width: 6, height: 6, borderRadius: '50%', background: 'var(--ink)',
        }} />
      )}
    </button>
  );
}

function MToolButton({ icon, label, onClick, disabled, active }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
      padding: '6px 8px',
      minWidth: 52,
      background: active ? 'var(--ink)' : 'var(--paper)',
      color: active ? 'var(--paper)' : (disabled ? 'var(--ink-soft)' : 'var(--ink)'),
      border: '2px solid var(--ink)',
      borderRadius: 10,
      boxShadow: active ? 'none' : (disabled ? 'none' : '2px 2px 0 var(--ink)'),
      opacity: disabled ? 0.4 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 9, letterSpacing: '0.04em',
      textTransform: 'uppercase',
      flexShrink: 0,
      WebkitTapHighlightColor: 'transparent',
      transform: active ? 'translate(2px, 2px)' : 'none',
      transition: 'transform 120ms, box-shadow 120ms',
    }}>
      <span style={{ fontSize: 16, lineHeight: 1 }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function MobileColoringScreen({ page, progress, onProgress, onBack, onComplete, onShowQuest, tweaks }) {
  const [color, setColor] = useStateMCol(CRAYONS[0].hex);
  const [crayonName, setCrayonName] = useStateMCol(CRAYONS[0].name);
  const [history, setHistory] = useStateMCol([]);
  const [showHint, setShowHint] = useStateMCol(false);
  const [floatBurst, setFloatBurst] = useStateMCol(null);
  const [mode, setMode] = useStateMCol('fill');
  const [brushMode, setBrushMode] = useStateMCol('paint');
  const [brushWidth, setBrushWidth] = useStateMCol(10);

  const fills = progress?.fills || {};
  const strokes = progress?.strokes || [];
  const total = page.regions.length;
  const colored = useMemoMCol(() => page.regions.filter(r => fills[r] && fills[r] !== '#FFFFFF').length, [fills, page]);
  const pct = total ? Math.round((colored / total) * 100) : 0;

  useEffectMCol(() => {
    if (pct >= 50 && pct < 100 && !progress?.midShown) {
      setShowHint(true);
      onProgress(page.id, { ...progress, midShown: true, fills });
    }
  }, [pct]);

  useEffectMCol(() => {
    if (colored >= total && total > 0 && !progress?.celebrated) {
      const t = setTimeout(() => onComplete(page.id), 480);
      return () => clearTimeout(t);
    }
  }, [colored, total]);

  const handleRegion = (id) => {
    if (mode !== 'fill') return;
    const prev = fills[id] || '#FFFFFF';
    if (prev === color) return;
    const next = { ...fills, [id]: color };
    setHistory(h => [...h.slice(-30), { type: 'fill', region: id, prevColor: prev }]);
    onProgress(page.id, { ...progress, fills: next });
    if (window.sfx) { window.sfx.scribble(); setTimeout(() => window.sfx.fill(), 110); }
    setFloatBurst({ key: Math.random(), color });
    setTimeout(() => setFloatBurst(null), 800);
  };

  const handleStroke = (stroke) => {
    const nextStrokes = [...strokes, stroke];
    setHistory(h => [...h.slice(-60), { type: 'stroke', strokeId: stroke.id }]);
    onProgress(page.id, { ...progress, fills, strokes: nextStrokes });
  };

  const handleUndo = () => {
    if (!history.length) return;
    const last = history[history.length - 1];
    if (last.type === 'stroke') {
      const nextStrokes = strokes.filter(s => s.id !== last.strokeId);
      onProgress(page.id, { ...progress, fills, strokes: nextStrokes });
    } else {
      const next = { ...fills, [last.region]: last.prevColor };
      if (last.prevColor === '#FFFFFF') delete next[last.region];
      onProgress(page.id, { ...progress, fills: next, strokes });
    }
    setHistory(h => h.slice(0, -1));
  };

  const handleClear = () => {
    if (!confirm('Erase all colors?')) return;
    setHistory([]);
    onProgress(page.id, { ...progress, fills: {}, strokes: [], midShown: false, celebrated: false });
  };

  const Comp = page.Component;

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--paper)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }} className="paper-grain" data-screen-label="02 Coloring">

      {/* Top bar */}
      <div style={{
        flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 12px',
        background: 'var(--paper-2)',
        borderBottom: '2px solid var(--ink)',
      }}>
        <button onClick={onBack} style={{
          width: 36, height: 36, flexShrink: 0,
          background: 'var(--paper)',
          border: '2px solid var(--ink)', borderRadius: 999,
          boxShadow: '2px 2px 0 var(--ink)',
          fontSize: 16, fontWeight: 800, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          WebkitTapHighlightColor: 'transparent',
        }}>←</button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              background: page.eraColor, color: '#fff',
              padding: '1px 7px', borderRadius: 999,
              fontSize: 8, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
              border: '1px solid var(--ink)',
            }}>{page.eraLabel}</div>
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800,
            lineHeight: 1.1, marginTop: 2, letterSpacing: '-0.01em',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{page.title}</div>
        </div>
        {/* Progress ring */}
        <div style={{ position: 'relative', width: 42, height: 42, flexShrink: 0 }}>
          <svg width="42" height="42" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
            <circle cx="32" cy="32" r="26" fill="none" stroke="var(--accent-3)" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${(pct/100) * 163.36} 163.36`}
              transform="rotate(-90 32 32)"
              style={{ transition: 'stroke-dasharray 360ms' }} />
          </svg>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 11,
            color: 'var(--ink)',
          }}>{pct}%</div>
        </div>
        <button onClick={() => onShowQuest(page.id)} title="Word Quest" style={{
          width: 42, height: 42, flexShrink: 0,
          background: 'var(--accent-2)', color: '#fff',
          border: '2px solid var(--ink)', borderRadius: 12,
          boxShadow: '2px 2px 0 var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}>📜</button>
      </div>

      {/* Canvas area */}
      <div style={{
        flex: 1, position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 10, overflow: 'hidden',
      }}>
        {/* tape corners */}
        <div style={{ position: 'absolute', top: 6, left: 10, width: 50, height: 16, background: 'rgba(232,163,61,0.62)', transform: 'rotate(-9deg)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
        <div style={{ position: 'absolute', top: 6, right: 10, width: 50, height: 16, background: 'rgba(232,163,61,0.62)', transform: 'rotate(9deg)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />

        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: 'min(100%, calc(100vh - 320px))',
          aspectRatio: '1 / 1',
          background: '#FFFDF5',
          border: '2.5px solid var(--ink)',
          borderRadius: 14,
          boxShadow: '5px 6px 0 rgba(0,0,0,0.18)',
          padding: 10,
        }} className="paper-fiber">
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Comp fills={fills} onRegion={handleRegion} alive={false} />
            <StrokesLayer strokes={strokes} />
            <BrushCanvas
              active={mode === 'brush'}
              color={color === '#FFFFFF' ? CRAYONS[0].hex : color}
              width={brushWidth}
              mode={brushMode}
              paperColor="#FFFDF5"
              onCommit={handleStroke}
            />
          </div>
          {floatBurst && (
            <div key={floatBurst.key} style={{
              position: 'absolute', top: 12, right: 12,
              fontSize: 22, animation: 'float-up 0.8s ease-out forwards', pointerEvents: 'none',
              color: floatBurst.color, fontWeight: 900,
            }}>✦</div>
          )}
        </div>

        {/* Mid-progress hint pop */}
        {showHint && (
          <div style={{
            position: 'absolute', bottom: 12, left: 12, right: 12,
            background: 'var(--ink)', color: 'var(--paper)',
            padding: '10px 12px', borderRadius: 14,
            boxShadow: '3px 3px 0 var(--accent)',
            animation: 'pop 360ms ease-out',
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: 16, color: 'var(--accent-3)', lineHeight: 1 }}>halfway there!</div>
              <div style={{ fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>{page.fact}</div>
            </div>
            <button onClick={() => { window.speech && window.speech.stop(); setShowHint(false); }} style={{ background: 'transparent', color: 'var(--paper)', border: 'none', fontSize: 20, lineHeight: 1, padding: 0, flexShrink: 0 }}>×</button>
          </div>
        )}
      </div>

      {/* Bottom dock */}
      <div style={{
        flexShrink: 0,
        background: 'var(--paper-2)',
        borderTop: '2px solid var(--ink)',
      }}>
        {/* Crayon strip */}
        <div style={{
          background: 'var(--accent)',
          borderBottom: '2px solid var(--ink)',
          padding: '8px 0 4px',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 14px 4px',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 800,
              color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase',
              textShadow: '1px 1px 0 rgba(0,0,0,0.25)',
            }}>Crayon Box</div>
            <div style={{
              fontFamily: 'var(--font-hand)', fontSize: 15, color: '#fff',
              textShadow: '1px 1px 0 rgba(0,0,0,0.25)',
            }}>{crayonName}</div>
          </div>
          <div style={{
            display: 'flex', gap: 4, overflowX: 'auto', padding: '4px 10px 6px',
            scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
          }}>
            {CRAYONS.map(c => (
              <MCrayonSwatch key={c.hex} crayon={c}
                active={color === c.hex}
                onClick={() => {
                  window.sfx && window.sfx.pop(); setColor(c.hex); setCrayonName(c.name);
                  // In brush mode the eraser crayon erases; any other crayon paints.
                  setBrushMode(c.hex === '#FFFFFF' ? 'erase' : 'paint');
                }} />
            ))}
          </div>
        </div>

        {/* Tool strip */}
        <div style={{
          display: 'flex', gap: 6, padding: '8px 10px 10px',
          overflowX: 'auto', alignItems: 'center',
          scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
        }}>
          <MToolButton icon="🪣" label="Fill" active={mode === 'fill'} onClick={() => { setMode('fill'); setBrushMode('paint'); window.sfx && window.sfx.pop(); }} />
          <MToolButton icon="✏️" label="Brush" active={mode === 'brush'} onClick={() => { setMode('brush'); setBrushMode(color === '#FFFFFF' ? 'erase' : 'paint'); window.sfx && window.sfx.pop(); }} />
          {mode === 'brush' && (
            <div style={{
              display: 'flex', gap: 4, padding: '4px 6px',
              background: 'var(--paper)', border: '2px dashed var(--rule)',
              borderRadius: 10, alignItems: 'center', flexShrink: 0,
            }}>
              {[{w:5,px:8},{w:10,px:12},{w:20,px:18}].map(s => (
                <button key={s.w} onClick={() => setBrushWidth(s.w)} style={{
                  width: 28, height: 28, padding: 0,
                  background: brushWidth === s.w ? 'var(--ink)' : 'var(--paper-2)',
                  border: '2px solid var(--ink)', borderRadius: 999,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ width: s.px, height: s.px, borderRadius: '50%', background: brushWidth === s.w ? color : 'var(--ink-soft)' }} />
                </button>
              ))}
            </div>
          )}
          <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--rule)', flexShrink: 0, margin: '0 2px' }} />
          <MToolButton icon="↶" label="Undo" onClick={handleUndo} disabled={!history.length} />
          <MToolButton icon="🧽" label="Erase" onClick={() => {
            if (mode === 'brush') {
              if (brushMode === 'erase') {
                setBrushMode('paint');
                // Leaving erase with the eraser crayon picked: switch to a real crayon
                // so the crayon strip matches what the brush paints.
                if (color === '#FFFFFF') { setColor(CRAYONS[0].hex); setCrayonName(CRAYONS[0].name); }
              } else {
                setBrushMode('erase');
              }
            }
            else { setColor('#FFFFFF'); setCrayonName('Eraser'); }
          }} active={brushMode === 'erase' || color === '#FFFFFF'} />
          <MToolButton icon="🎲" label="Random" onClick={() => {
            const palette = CRAYONS.filter(c => c.hex !== '#FFFFFF');
            const next = { ...fills };
            page.regions.forEach(r => {
              if (!next[r] || next[r] === '#FFFFFF') {
                next[r] = palette[Math.floor(Math.random() * palette.length)].hex;
              }
            });
            onProgress(page.id, { ...progress, fills: next, strokes });
            setHistory([]);
          }} />
          <MToolButton icon="🗑" label="Clear" onClick={handleClear} disabled={!Object.keys(fills).length && !strokes.length} />
        </div>
      </div>
    </div>
  );
}

window.MobileColoringScreen = MobileColoringScreen;
