// =================================================================
// Mobile Library Screen — vertical list / sticky header / sheet tabs
// =================================================================
const { useState: useStateMLib, useMemo: useMemoMLib, useRef: useRefMLib } = React;

function MStickerStat({ count, total }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '4px 12px 4px 4px',
      background: 'var(--paper-2)',
      border: '2px solid var(--ink)',
      borderRadius: 999,
      boxShadow: '2px 2px 0 var(--ink)',
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 999, background: 'var(--accent-3)',
        border: '2px solid var(--ink)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, flexShrink: 0,
      }}>🏅</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, lineHeight: 1 }}>
        {count}<span style={{ color: 'var(--ink-soft)', fontWeight: 600, fontSize: 11 }}> / {total}</span>
      </div>
    </div>
  );
}

function MCollectionTab({ tab, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      flexShrink: 0,
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '8px 14px',
      background: active ? 'var(--ink)' : 'var(--paper)',
      color: active ? 'var(--paper)' : 'var(--ink)',
      border: '2px solid var(--ink)',
      borderRadius: 999,
      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
      boxShadow: active ? 'none' : '2px 2px 0 var(--ink)',
      transform: active ? 'translate(2px, 2px)' : 'none',
      whiteSpace: 'nowrap',
      transition: 'transform 120ms, box-shadow 120ms',
    }}>
      <span style={{ fontSize: 14 }}>{tab.emoji}</span>
      <span>{tab.label}</span>
      <span style={{
        padding: '1px 7px', borderRadius: 999,
        background: active ? 'var(--paper)' : 'var(--ink)',
        color: active ? 'var(--ink)' : 'var(--paper)',
        fontSize: 10, fontWeight: 800,
      }}>{tab.count}</span>
    </button>
  );
}

function MPageCard({ page, progress, onOpen }) {
  const Comp = page.Component;
  const total = page.regions.length;
  const colored = progress?.fills
    ? Object.keys(progress.fills).filter(k => page.regions.includes(k) && progress.fills[k] !== '#FFFFFF').length
    : 0;
  const pct = total ? Math.round((colored / total) * 100) : 0;
  const started = colored > 0 || progress?.completed;
  const fills = progress?.fills || {};

  return (
    <button onClick={() => onOpen(page.id)} style={{
      textAlign: 'left',
      padding: 10,
      background: 'var(--paper)',
      border: '2px solid var(--ink)',
      borderRadius: 18,
      boxShadow: '4px 4px 0 var(--ink)',
      display: 'flex', flexDirection: 'column', gap: 8,
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
    }}>
      <div style={{
        position: 'relative',
        aspectRatio: '1 / 1',
        borderRadius: 12,
        background: page.bgPreview,
        border: '2px solid var(--ink)',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, padding: 6 }}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Comp fills={fills} onRegion={null} alive={false} />
            <StrokesLayer strokes={progress?.strokes || []} />
          </div>
        </div>
        {progress?.completed && (
          <div style={{
            position: 'absolute', top: 6, right: 6,
            background: 'var(--ink)', color: 'var(--paper)',
            borderRadius: 999, padding: '2px 7px',
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 9,
            letterSpacing: '0.08em',
          }}>{pct === 100 ? '✓ DONE' : '🏅 STICKER'}</div>
        )}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          display: 'inline-block',
          background: page.eraColor, color: '#fff',
          borderRadius: 999, padding: '1px 8px',
          fontSize: 8, fontWeight: 800, letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 4,
          border: '1px solid var(--ink)',
        }}>{page.eraLabel}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.01em', textWrap: 'balance' }}>
          {page.title}
        </div>
      </div>
      {started ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ flex: 1, height: 6, background: 'var(--paper-2)', border: '1.5px solid var(--ink)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: pct + '%', height: '100%', background: pct === 100 ? '#5A8F4A' : 'var(--accent-3)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 800, color: 'var(--ink-soft)', minWidth: 26, textAlign: 'right' }}>{pct}%</div>
        </div>
      ) : (
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 800,
          color: 'var(--ink-soft)', letterSpacing: '0.1em', textTransform: 'uppercase',
          textAlign: 'center', paddingTop: 2,
        }}>✏️ Tap to begin</div>
      )}
    </button>
  );
}

function MobileLibraryScreen({ progressMap, onOpen, onGrownUps, onSettings }) {
  const [coll, setColl] = useStateMLib('all');
  const filtered = useMemoMLib(() => coll === 'all' ? PAGES_DATA : PAGES_DATA.filter(p => p.collection === coll), [coll]);
  const counts = useMemoMLib(() => ({
    all: PAGES_DATA.length,
    us: PAGES_DATA.filter(p => p.collection === 'us').length,
    world: PAGES_DATA.filter(p => p.collection === 'world').length,
  }), []);
  const completedCount = PAGES_DATA.filter(p => progressMap[p.id]?.completed).length;
  const returning = PAGES_DATA.some(p => progressMap[p.id]);

  const tabs = [
    { id: 'all', label: 'All', emoji: '🗺️', count: counts.all },
    { id: 'us', label: 'United States', emoji: '🇺🇸', count: counts.us },
    { id: 'world', label: 'World', emoji: '🌍', count: counts.world },
  ];

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--paper)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }} className="paper-grain" data-screen-label="01 Library">
      {/* Sticky header */}
      <div style={{
        flexShrink: 0,
        padding: '12px 14px 10px',
        background: 'var(--paper)',
        borderBottom: '2px solid var(--ink)',
        boxShadow: '0 3px 0 rgba(31,41,51,0.06)',
        position: 'relative', zIndex: 5,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--accent)', border: '2px solid var(--ink)',
            boxShadow: '2px 2px 0 var(--ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: 'rotate(-3deg)', flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
              <rect x="6" y="10" width="36" height="32" rx="3" fill="#FFFDF5" stroke="#1A1A22" strokeWidth="3"/>
              <path d="M6 14 L42 14" stroke="#1A1A22" strokeWidth="3"/>
              <circle cx="14" cy="24" r="3" fill="#E63946"/>
              <circle cx="24" cy="24" r="3" fill="#FFC857"/>
              <circle cx="34" cy="24" r="3" fill="#4361EE"/>
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 800,
              color: 'var(--accent)', letterSpacing: '0.16em', textTransform: 'uppercase',
              lineHeight: 1,
            }}>{returning ? 'Welcome back, explorer' : 'Welcome, explorer'}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', marginTop: 2 }}>
              History Coloring Books
            </div>
          </div>
          <button onClick={onSettings} title="Settings" aria-label="Settings" style={{
            width: 36, height: 36, flexShrink: 0,
            background: 'var(--paper-2)',
            border: '2px solid var(--ink)', borderRadius: 999,
            boxShadow: '2px 2px 0 var(--ink)',
            fontSize: 16, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>⚙️</button>
          <button onClick={onGrownUps} title="Change theme" aria-label="Change theme" style={{
            width: 36, height: 36, flexShrink: 0,
            background: 'var(--paper-2)',
            border: '2px solid var(--ink)', borderRadius: 999,
            boxShadow: '2px 2px 0 var(--ink)',
            fontSize: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>🎨</button>
        </div>
      </div>

      {/* Scrolling body */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '14px 14px 80px' }}>

          {/* Sticker progress strip */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px',
            background: 'var(--paper-2)',
            border: '2px solid var(--ink)',
            borderRadius: 14,
            boxShadow: '3px 3px 0 var(--ink)',
            marginBottom: 14,
          }}>
            <MStickerStat count={completedCount} total={PAGES_DATA.length} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 800, color: 'var(--ink-soft)', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1 }}>
                Your collection
              </div>
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: 16, color: 'var(--ink)', lineHeight: 1.1, marginTop: 2 }}>
                {completedCount === 0 ? 'start your first page!' : completedCount === PAGES_DATA.length ? 'all stickers earned! ✨' : 'keep it going!'}
              </div>
            </div>
          </div>

          {/* Featured banner */}
          <div style={{
            border: '2px solid var(--ink)',
            borderRadius: 18,
            overflow: 'hidden',
            boxShadow: '4px 4px 0 var(--ink)',
            marginBottom: 18,
            background: 'var(--paper-2)',
          }}>
            <div style={{ position: 'relative', height: 156, background: '#FFE9B8', borderBottom: '2px solid var(--ink)' }}>
              <div style={{ position: 'absolute', inset: 0, padding: 12 }}>
                <MLKSVG fills={{ sun: '#FFC857', sky: '#CFEAF8', 'cloud-l': '#FFFFFF', 'cloud-r': '#FFFFFF', face: '#C9824C', hair: '#3A1F0F', suit: '#1B1B1B', tie: '#7A1A78', shirt: '#FFFDF5', podium: '#7B4B25', 'podium-seal': '#F4A6BC', 'mic-head': '#4A5568', 'lapel-l': '#0E0E10', 'lapel-r': '#0E0E10', crowd: '#3A0CA3', neck: '#C9824C' }} onRegion={null} alive={true} />
              </div>
              <div style={{
                position: 'absolute', top: 10, left: 10,
                background: 'var(--accent-2)', color: '#fff',
                borderRadius: 999, padding: '3px 10px',
                fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
                border: '1.5px solid var(--ink)',
              }}>This week</div>
            </div>
            <div style={{ padding: '14px 16px 16px' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                Color the speech.{' '}
                <span style={{ color: 'var(--accent)' }}>Hear the story.</span>
              </h2>
              <p style={{ margin: '6px 0 12px', fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.4 }}>
                Tap any picture to color it in. Finish to earn a sticker and hear a famous speech.
              </p>
              <button onClick={() => onOpen('mlk')} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 16px 10px 10px',
                background: 'var(--accent)', color: '#fff',
                border: '2px solid var(--ink)', borderRadius: 12,
                boxShadow: '3px 3px 0 var(--ink)',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14,
                cursor: 'pointer',
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: 999, background: '#fff',
                  color: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10,
                }}>▶</span>
                Start "I Have a Dream"
              </button>
            </div>
          </div>

          {/* Section heading + tabs */}
          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            marginBottom: 10,
          }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, letterSpacing: '-0.01em' }}>Coloring Pages</h3>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 800, color: 'var(--ink-soft)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {filtered.length} {filtered.length === 1 ? 'page' : 'pages'}
            </div>
          </div>
          <div style={{
            display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6,
            margin: '0 -14px', padding: '2px 14px 10px',
            scrollbarWidth: 'none',
          }}>
            {tabs.map(t => (
              <MCollectionTab key={t.id} tab={t} active={coll === t.id} onClick={() => setColl(t.id)} />
            ))}
          </div>

          {/* Cards grid — 2 cols */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 4 }}>
            {filtered.map(p => (
              <MPageCard key={p.id} page={p} progress={progressMap[p.id]} onOpen={onOpen} />
            ))}
          </div>

          {/* Footer card */}
          <div style={{
            marginTop: 22, padding: '14px 16px',
            background: 'var(--paper-2)',
            border: '2px dashed var(--rule)',
            borderRadius: 14,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 22 }}>🔭</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13 }}>More adventures soon</div>
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.1, marginTop: 1 }}>
                Renaissance · Greek heroes…
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.MobileLibraryScreen = MobileLibraryScreen;
