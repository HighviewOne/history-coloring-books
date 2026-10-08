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
  const c = useColoring({ page, progress, onProgress, onComplete, defaultBrushWidth: 10, clearPrompt: 'Erase all colors?' });
  const { color, mode, brushMode, brushWidth, fills, strokes, pct } = c;

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
            <Comp fills={fills} onRegion={c.handleRegion} alive={false} />
            <StrokesLayer strokes={strokes} />
            <BrushCanvas
              active={mode === 'brush'}
              color={c.brushColor}
              width={brushWidth}
              mode={brushMode}
              paperColor="#FFFDF5"
              onCommit={c.handleStroke}
            />
          </div>
          {c.floatBurst && (
            <div key={c.floatBurst.key} style={{
              position: 'absolute', top: 12, right: 12,
              fontSize: 22, animation: 'float-up 0.8s ease-out forwards', pointerEvents: 'none',
              color: c.floatBurst.color, fontWeight: 900,
            }}>✦</div>
          )}
        </div>

        {/* Mid-progress hint pop */}
        {c.showHint && (
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
            <button onClick={c.closeHint} style={{ background: 'transparent', color: 'var(--paper)', border: 'none', fontSize: 20, lineHeight: 1, padding: 0, flexShrink: 0 }}>×</button>
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
            }}>{c.crayonName}</div>
          </div>
          <div style={{
            display: 'flex', gap: 4, overflowX: 'auto', padding: '4px 10px 6px',
            scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
          }}>
            {CRAYONS.map(cr => (
              <MCrayonSwatch key={cr.hex} crayon={cr}
                active={color === cr.hex}
                onClick={() => c.pickCrayon(cr)} />
            ))}
          </div>
        </div>

        {/* Tool strip */}
        <div style={{
          display: 'flex', gap: 6, padding: '8px 10px 10px',
          overflowX: 'auto', alignItems: 'center',
          scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
        }}>
          <MToolButton icon="🪣" label="Fill" active={mode === 'fill'} onClick={() => c.selectMode('fill')} />
          <MToolButton icon="✏️" label="Brush" active={mode === 'brush'} onClick={() => c.selectMode('brush')} />
          {mode === 'brush' && (
            <div style={{
              display: 'flex', gap: 4, padding: '4px 6px',
              background: 'var(--paper)', border: '2px dashed var(--rule)',
              borderRadius: 10, alignItems: 'center', flexShrink: 0,
            }}>
              {[{w:5,px:8},{w:10,px:12},{w:20,px:18}].map(s => (
                <button key={s.w} onClick={() => c.setBrushWidth(s.w)} style={{
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
          <MToolButton icon="↶" label="Undo" onClick={c.handleUndo} disabled={!c.canUndo} />
          <MToolButton icon="🧽" label="Erase" onClick={c.toggleErase} active={brushMode === 'erase' || color === '#FFFFFF'} />
          <MToolButton icon="🎲" label="Random" onClick={c.handleRandom} />
          <MToolButton icon="🗑" label="Clear" onClick={c.handleClear} disabled={!c.canClear} />
        </div>
      </div>
    </div>
  );
}

window.MobileColoringScreen = MobileColoringScreen;
