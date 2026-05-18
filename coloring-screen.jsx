// =================================================================
// Coloring Screen — the heart of the app.
// Tap a region with the selected crayon to fill it. Eraser to reset.
// Undo, palette, brush info, completion detection.
// =================================================================
const { useState: useStateCol, useEffect: useEffectCol, useRef: useRefCol, useMemo: useMemoCol } = React;

function CrayonSwatch({ crayon, active, onClick }) {
  const isEraser = crayon.hex === '#FFFFFF';
  return (
    <button
      onClick={onClick}
      title={crayon.name}
      style={{
        position: 'relative',
        width: 56, height: 64,
        background: 'transparent', border: 'none', padding: 0,
        cursor: 'pointer',
        transform: active ? 'translateY(-8px) rotate(-3deg)' : 'translateY(0)',
        transition: 'transform 160ms ease-out',
      }}
    >
      {/* crayon body */}
      <svg viewBox="0 0 56 90" width="56" height="64" style={{ display: 'block' }}>
        {/* tip */}
        <polygon points="14,4 42,4 36,22 20,22" fill={isEraser ? '#F4A6BC' : crayon.hex} stroke="#1A1A22" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="22" y1="14" x2="34" y2="14" stroke="#1A1A22" strokeWidth="1.5" />
        {/* body */}
        <rect x="10" y="22" width="36" height="58" rx="4" fill={isEraser ? '#FFFDF5' : crayon.hex} stroke="#1A1A22" strokeWidth="2.5" />
        {/* label band */}
        <rect x="10" y="44" width="36" height="14" fill="#FFFDF5" stroke="#1A1A22" strokeWidth="1.5" />
        <text x="28" y="54" textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize="8" fontWeight="800" fill="#1A1A22">{crayon.name.toUpperCase().slice(0, 6)}</text>
        {/* tip highlight */}
        <polygon points="20,22 36,22 32,30 24,30" fill="rgba(0,0,0,0.18)" />
        {isEraser && (
          <text x="28" y="38" textAnchor="middle" fontSize="14" fontWeight="900" fill="#1A1A22" stroke="none">✕</text>
        )}
      </svg>
      {active && (
        <div style={{
          position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)',
          width: 8, height: 8, borderRadius: '50%', background: 'var(--ink)',
        }} />
      )}
    </button>
  );
}

function ToolButton({ icon, label, onClick, disabled, color }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      padding: '10px 12px',
      background: 'var(--paper)',
      color: disabled ? 'var(--ink-soft)' : 'var(--ink)',
      border: '2.5px solid var(--ink)',
      borderRadius: 14,
      boxShadow: disabled ? 'none' : '3px 3px 0 var(--ink)',
      opacity: disabled ? 0.45 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
      minWidth: 64,
    }}>
      <span style={{ fontSize: 22, color: color || 'inherit' }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function ColoringScreen({ page, progress, onProgress, onBack, onComplete, onShowQuest, tweaks }) {
  const [color, setColor] = useStateCol(CRAYONS[0].hex);
  const [crayonName, setCrayonName] = useStateCol(CRAYONS[0].name);
  const [history, setHistory] = useStateCol([]); // [{type:'fill'|'stroke', ...}]
  const [showHint, setShowHint] = useStateCol(false);
  const [floatBurst, setFloatBurst] = useStateCol(null); // {x,y,color}
  const [mode, setMode] = useStateCol('fill'); // 'fill' | 'brush'
  const [brushMode, setBrushMode] = useStateCol('paint'); // 'paint' | 'erase'
  const [brushWidth, setBrushWidth] = useStateCol(12);
  const fills = progress?.fills || {};
  const strokes = progress?.strokes || [];
  const total = page.regions.length;
  const colored = useMemoCol(() => page.regions.filter(r => fills[r] && fills[r] !== '#FFFFFF').length, [fills, page]);
  const pct = total ? Math.round((colored / total) * 100) : 0;

  // Tip the user when they hit certain milestones
  useEffectCol(() => {
    if (pct === 50 && !progress?.midShown) {
      setShowHint(true);
      onProgress(page.id, { ...progress, midShown: true, fills });
    }
  }, [pct]);

  // Auto-prompt for celebration when 100%
  useEffectCol(() => {
    if (colored >= total && total > 0 && !progress?.celebrated) {
      // small delay to let last fill render
      const t = setTimeout(() => onComplete(page.id), 480);
      return () => clearTimeout(t);
    }
  }, [colored, total]);

  const handleRegion = (id) => {
    if (mode !== 'fill') return; // brush mode owns the canvas
    const prev = fills[id] || '#FFFFFF';
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
    if (!confirm('Erase all colors and brush strokes?')) return;
    setHistory([]);
    onProgress(page.id, { ...progress, fills: {}, strokes: [], midShown: false });
  };

  const Comp = page.Component;
  const dense = tweaks.age_density === 'dense'; // teen
  const big = tweaks.age_density === 'big';     // K-2

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--paper)' }} className="paper-grain">

      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '12px 22px',
        background: 'var(--paper-2)',
        borderBottom: '2.5px solid var(--ink)',
      }}>
        <button onClick={onBack} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 14px 8px 12px',
          background: 'var(--paper)',
          border: '2.5px solid var(--ink)',
          borderRadius: 12,
          boxShadow: '3px 3px 0 var(--ink)',
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14,
          cursor: 'pointer',
        }}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>←</span>
          <span>Library</span>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
            <div style={{
              background: page.eraColor, color: '#fff',
              padding: '2px 10px', borderRadius: 999,
              fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
              border: '1.5px solid var(--ink)',
            }}>{page.eraLabel}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-soft)', fontWeight: 600 }}>{page.subtitle}</div>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.01em' }}>{page.title}</div>
        </div>

        {/* Progress badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative', width: 60, height: 60 }}>
            <svg width="60" height="60" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
              <circle cx="32" cy="32" r="26" fill="none" stroke="var(--accent-3)" strokeWidth="7" strokeLinecap="round"
                strokeDasharray={`${(pct/100) * 163.36} 163.36`}
                transform="rotate(-90 32 32)"
                style={{ transition: 'stroke-dasharray 360ms' }} />
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 16,
              color: 'var(--ink)', letterSpacing: '-0.02em',
            }}>{pct}%</div>
          </div>
          <button onClick={() => onShowQuest(page.id)} style={{
            padding: '10px 16px 10px 12px',
            background: 'var(--accent-2)', color: '#fff',
            border: '2.5px solid var(--ink)', borderRadius: 14,
            boxShadow: '3px 3px 0 var(--ink)',
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
          }}>
            <span style={{
              width: 28, height: 28, borderRadius: 999, background: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
            }}>📜</span>
            <span>Word Quest</span>
          </button>
        </div>
      </div>

      {/* Main work area */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* Left rail — tools */}
        <div style={{
          width: 96, padding: '16px 8px',
          borderRight: '2.5px solid var(--ink)',
          background: 'var(--paper-2)',
          display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center',
        }}>
          {/* Mode toggle */}
          <div style={{
            display: 'flex', flexDirection: 'column', width: '100%', gap: 4,
            padding: 4, background: 'var(--paper)',
            border: '2.5px solid var(--ink)', borderRadius: 12,
            boxShadow: '3px 3px 0 var(--ink)',
          }}>
            {[
              { id: 'fill',  label: 'Fill',  icon: '🪣' },
              { id: 'brush', label: 'Brush', icon: '✏️' },
            ].map(t => {
              const active = mode === t.id;
              return (
                <button key={t.id} onClick={() => { setMode(t.id); setBrushMode('paint'); if (window.sfx) window.sfx.pop(); }} style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '6px 4px',
                  background: active ? 'var(--ink)' : 'transparent',
                  color: active ? 'var(--paper)' : 'var(--ink)',
                  border: 'none', borderRadius: 8,
                  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12,
                  justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 14 }}>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Brush-size picker — only when brush mode is active */}
          {mode === 'brush' && (
            <div style={{
              width: '100%',
              padding: '8px 4px',
              background: 'var(--paper)',
              border: '2.5px dashed var(--rule)', borderRadius: 12,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 800, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Size</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                {[{ w: 5, px: 8 }, { w: 12, px: 14 }, { w: 24, px: 22 }].map(s => {
                  const active = brushWidth === s.w;
                  return (
                    <button key={s.w} onClick={() => setBrushWidth(s.w)} style={{
                      width: 34, height: 34, padding: 0,
                      background: active ? 'var(--ink)' : 'var(--paper-2)',
                      border: '2px solid var(--ink)', borderRadius: 999,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ width: s.px, height: s.px, borderRadius: '50%', background: active ? color : 'var(--ink-soft)' }} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <ToolButton icon="↶" label="Undo" onClick={handleUndo} disabled={!history.length} />
          <ToolButton icon="🧽" label={mode === 'brush' ? (brushMode === 'erase' ? 'Erasing' : 'Erase') : 'Erase'} onClick={() => {
            if (mode === 'brush') {
              setBrushMode(m => m === 'erase' ? 'paint' : 'erase');
            } else {
              setColor('#FFFFFF'); setCrayonName('Eraser');
            }
          }} />
          <ToolButton icon="🎲" label="Random" onClick={() => {
            // fill all empty regions with random crayons
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
          <ToolButton icon="🗑" label="Clear" onClick={handleClear} disabled={!Object.keys(fills).length && !strokes.length} />
          <div style={{ flex: 1 }} />
          <div style={{
            padding: '8px 6px', textAlign: 'center',
            background: 'var(--paper)', border: '2px dashed var(--rule)',
            borderRadius: 10, fontFamily: 'var(--font-hand)', fontSize: 16, color: 'var(--ink-soft)',
            lineHeight: 1.15,
          }}>{mode === 'brush' ? <>scribble<br/>anywhere!</> : <>Tip:<br/>tap to color</>}</div>
        </div>

        {/* Center — coloring page */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, overflow: 'hidden' }}>
          {/* Decorative tape corners */}
          <div style={{ position: 'absolute', top: 22, left: 22, width: 80, height: 24, background: 'rgba(232,163,61,0.62)', transform: 'rotate(-9deg)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
          <div style={{ position: 'absolute', top: 22, right: 22, width: 80, height: 24, background: 'rgba(232,163,61,0.62)', transform: 'rotate(9deg)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />

          <div style={{
            position: 'relative',
            width: 'min(82vh, 720px)',
            aspectRatio: '1 / 1',
            background: '#FFFDF5',
            border: '3px solid var(--ink)',
            borderRadius: 18,
            boxShadow: '10px 12px 0 rgba(0,0,0,0.18)',
            padding: 18,
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
            {/* floating crayon dot when you fill */}
            {floatBurst && (
              <div key={floatBurst.key} style={{
                position: 'absolute', top: 20, right: 20,
                fontSize: 28, animation: 'float-up 0.8s ease-out forwards', pointerEvents: 'none',
                color: floatBurst.color, fontWeight: 900,
              }}>✦</div>
            )}
          </div>

          {/* Mid-progress hint pop-up */}
          {showHint && (
            <div style={{
              position: 'absolute', bottom: 24, right: 24,
              maxWidth: 340,
              background: 'var(--ink)', color: 'var(--paper)',
              padding: '16px 18px', borderRadius: 16,
              boxShadow: '4px 4px 0 var(--accent)',
              animation: 'pop 360ms ease-out',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-hand)', fontSize: 20, color: 'var(--accent-3)', lineHeight: 1 }}>halfway there!</div>
                  <div style={{ fontSize: 14, marginTop: 6, lineHeight: 1.45 }}>{page.fact}</div>
                  <button onClick={() => window.speech && window.speech.speak(page.fact, { rate: 0.92 })} style={{
                    marginTop: 10,
                    padding: '6px 12px',
                    background: 'var(--accent-3)', color: 'var(--ink)',
                    border: '2px solid var(--paper)', borderRadius: 999,
                    fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13,
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}>🔊 Read it to me</button>
                </div>
                <button onClick={() => { window.speech && window.speech.stop(); setShowHint(false); }} style={{ background: 'transparent', color: 'var(--paper)', border: 'none', fontSize: 22, lineHeight: 1, padding: 0 }}>×</button>
              </div>
            </div>
          )}
        </div>

        {/* Right rail — palette */}
        <div style={{
          width: 168, padding: '20px 12px',
          borderLeft: '2.5px solid var(--ink)',
          background: 'var(--paper-2)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          overflowY: 'auto',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: 'var(--ink-soft)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Crayon Box</div>
          <div style={{ fontFamily: 'var(--font-hand)', fontSize: 18, color: 'var(--ink)', marginBottom: 6 }}>{crayonName}</div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4,
            padding: '12px 8px',
            background: 'var(--accent)', borderRadius: 14,
            border: '2.5px solid var(--ink)', boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.25)',
            justifyItems: 'center',
          }}>
            {CRAYONS.map(c => (
              <CrayonSwatch key={c.hex} crayon={c} active={color === c.hex} onClick={() => { window.sfx && window.sfx.pop(); setColor(c.hex); setCrayonName(c.name); }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.ColoringScreen = ColoringScreen;
