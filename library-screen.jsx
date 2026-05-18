// =================================================================
// Library Screen — home / browse all coloring pages
// =================================================================
const { useState: useStateLib, useMemo: useMemoLib } = React;

function StickerStat({ count, total }) {
  const pct = total ? count / total : 0;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '8px 16px 8px 10px',
      background: 'var(--paper-2)',
      border: '2.5px solid var(--ink)',
      borderRadius: 999,
      boxShadow: '4px 4px 0 var(--ink)',
    }}>
      <div style={{
        position: 'relative', width: 44, height: 44, flexShrink: 0,
        borderRadius: 999, background: 'var(--accent-3)',
        border: '2.5px solid var(--ink)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 22, lineHeight: 1, filter: 'drop-shadow(0 1px 0 rgba(0,0,0,0.15))' }}>🏅</span>
      </div>
      <div style={{ lineHeight: 1 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 800,
          color: 'var(--ink-soft)', letterSpacing: '0.12em', textTransform: 'uppercase',
          marginBottom: 4,
        }}>Stickers</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, lineHeight: 1 }}>
          {count}<span style={{ color: 'var(--ink-soft)', fontWeight: 600, fontSize: 15 }}> / {total}</span>
        </div>
      </div>
    </div>
  );
}

function CollectionTabs({ value, onChange, counts }) {
  const tabs = [
    { id: 'all', label: 'All Adventures', emoji: '🗺️' },
    { id: 'us', label: 'United States', emoji: '🇺🇸' },
    { id: 'world', label: 'World History', emoji: '🌍' },
  ];
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {tabs.map(t => {
        const active = value === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '14px 22px',
            background: active ? 'var(--ink)' : 'var(--paper)',
            color: active ? 'var(--paper)' : 'var(--ink)',
            border: '2.5px solid var(--ink)',
            borderRadius: 18,
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19,
            boxShadow: active ? '2px 2px 0 var(--ink)' : '4px 4px 0 var(--ink)',
            transform: active ? 'translate(2px, 2px)' : 'none',
            transition: 'all 120ms',
          }}>
            <span style={{ fontSize: 20 }}>{t.emoji}</span>
            <span>{t.label}</span>
            <span style={{
              padding: '2px 10px', borderRadius: 999,
              background: active ? 'var(--paper)' : 'var(--ink)',
              color: active ? 'var(--ink)' : 'var(--paper)',
              fontSize: 14, fontWeight: 700,
            }}>{counts[t.id] || 0}</span>
          </button>
        );
      })}
    </div>
  );
}

// Thumbnail = greyscale outline preview with some fills shown for completed pages.
function PageThumb({ page, progress }) {
  const Comp = page.Component;
  const total = page.regions.length;
  const colored = progress?.fills ? Object.keys(progress.fills).filter(k => page.regions.includes(k) && progress.fills[k] !== '#FFFFFF').length : 0;
  // Use real fills for completed/in-progress to show colorful preview; empty otherwise.
  const fills = progress?.fills || {};
  return (
    <div style={{
      position: 'relative',
      aspectRatio: '1 / 1',
      borderRadius: 16,
      background: page.bgPreview,
      border: '2.5px solid var(--ink)',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, padding: 8 }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Comp fills={fills} onRegion={() => {}} alive={false} />
          <StrokesLayer strokes={progress?.strokes || []} />
        </div>
      </div>
      {progress?.completed && (
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: 'var(--ink)', color: 'var(--paper)',
          borderRadius: 999, padding: '5px 12px',
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13,
          letterSpacing: '0.06em',
        }}>✓ COMPLETE</div>
      )}
    </div>
  );
}

function PageCard({ page, progress, onOpen }) {
  const total = page.regions.length;
  const colored = progress?.fills ? Object.keys(progress.fills).filter(k => page.regions.includes(k) && progress.fills[k] !== '#FFFFFF').length : 0;
  const pct = total ? Math.round((colored / total) * 100) : 0;
  const started = colored > 0 || progress?.completed;
  return (
    <button onClick={() => onOpen(page.id)} style={{
      textAlign: 'left',
      padding: 14,
      background: 'var(--paper)',
      border: '2.5px solid var(--ink)',
      borderRadius: 22,
      boxShadow: '6px 6px 0 var(--ink)',
      transition: 'transform 140ms, box-shadow 140ms',
      cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: 12,
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '8px 8px 0 var(--ink)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '6px 6px 0 var(--ink)'; }}
    >
      <PageThumb page={page} progress={progress} />
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: 'inline-block',
            background: page.eraColor,
            color: '#fff',
            borderRadius: 999,
            padding: '3px 11px',
            fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 6,
            border: '1.5px solid var(--ink)',
          }}>{page.eraLabel}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 800, lineHeight: 1.1, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{page.title}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 3, lineHeight: 1.3 }}>{page.subtitle}</div>
        </div>
      </div>
      {/* progress bar / start hint */}
      {started ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 8, background: 'var(--paper-2)', border: '2px solid var(--ink)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: pct + '%', height: '100%', background: progress?.completed ? '#5A8F4A' : 'var(--accent-3)', transition: 'width 300ms' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 800, color: 'var(--ink-soft)', minWidth: 36, textAlign: 'right' }}>{pct}%</div>
        </div>
      ) : (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 800,
          color: 'var(--ink-soft)', letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '6px 0',
        }}>
          <span>✏️</span><span>Tap to begin</span>
        </div>
      )}
    </button>
  );
}

function LibraryScreen({ progressMap, onOpen, onGrownUps }) {
  const [coll, setColl] = useStateLib('all');
  const filtered = useMemoLib(() => coll === 'all' ? PAGES_DATA : PAGES_DATA.filter(p => p.collection === coll), [coll]);
  const counts = useMemoLib(() => ({
    all: PAGES_DATA.length,
    us: PAGES_DATA.filter(p => p.collection === 'us').length,
    world: PAGES_DATA.filter(p => p.collection === 'world').length,
  }), []);
  const completedCount = Object.values(progressMap || {}).filter(p => p.completed).length;

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', background: 'var(--paper)' }} className="paper-grain">
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 40px 80px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{
              width: 68, height: 68, borderRadius: 18,
              background: 'var(--accent)',
              border: '3px solid var(--ink)', boxShadow: '4px 4px 0 var(--ink)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: 'rotate(-3deg)',
              position: 'relative',
            }}>
              <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
                <rect x="6" y="10" width="36" height="32" rx="3" fill="#FFFDF5" stroke="#1A1A22" strokeWidth="2.5"/>
                <path d="M6 14 L42 14" stroke="#1A1A22" strokeWidth="2.5"/>
                <circle cx="14" cy="24" r="3" fill="#E63946"/>
                <circle cx="24" cy="24" r="3" fill="#FFC857"/>
                <circle cx="34" cy="24" r="3" fill="#4361EE"/>
                <path d="M12 32 L36 32 M12 36 L28 36" stroke="#1A1A22" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 800,
                color: 'var(--accent)', letterSpacing: '0.16em', textTransform: 'uppercase',
                marginBottom: 6,
              }}>Welcome back, explorer</div>
              <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.025em' }}>History Coloring Books</h1>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <StickerStat count={completedCount} total={PAGES_DATA.length} />
            <button onClick={onGrownUps} title="Parents & teachers" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px 10px 12px',
              background: 'var(--paper-2)',
              border: '2.5px solid var(--ink)', borderRadius: 999,
              boxShadow: '4px 4px 0 var(--ink)',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
              cursor: 'pointer',
              height: 60,
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 999, background: 'var(--ink)',
                color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16,
              }}>🔒</span>
              <span>Grown-Ups</span>
            </button>
          </div>
        </div>

        {/* Featured banner */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 0,
          border: '2.5px solid var(--ink)',
          borderRadius: 24, overflow: 'hidden',
          boxShadow: '6px 6px 0 var(--ink)',
          marginBottom: 30,
          background: 'var(--paper-2)',
        }}>
          <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                background: 'var(--accent-2)', color: '#fff',
                borderRadius: 999, padding: '4px 12px',
                fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>This Week's Adventure</div>
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: 20, color: 'var(--ink-soft)', lineHeight: 1 }}>
                hand-picked ✨
              </div>
            </div>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.02em' }}>
              Color the speech.<br/>
              <span style={{ color: 'var(--accent)' }}>Hear the story.</span>
            </h2>
            <p style={{ margin: '14px 0 20px', fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.5, maxWidth: 460 }}>
              Tap any picture to color it in. When you finish, the page comes alive—and you can earn a sticker by guessing the missing words from a famous speech.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={() => onOpen('mlk')} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '13px 22px 13px 16px',
                background: 'var(--accent)', color: '#fff',
                border: '2.5px solid var(--ink)', borderRadius: 14,
                boxShadow: '4px 4px 0 var(--ink)',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17,
                cursor: 'pointer',
              }}>
                <span style={{
                  width: 26, height: 26, borderRadius: 999, background: '#fff',
                  color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12,
                }}>▶</span>
                Start “I Have a Dream”
              </button>
              <button onClick={() => onOpen('liberty-bell')} style={{
                padding: '13px 20px',
                background: 'transparent', color: 'var(--ink)',
                border: '2.5px solid var(--ink)', borderRadius: 14,
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17,
                cursor: 'pointer',
              }}>Liberty Bell, 1776</button>
            </div>
          </div>
          <div style={{ position: 'relative', background: '#FFE9B8', borderLeft: '2.5px solid var(--ink)' }}>
            <div style={{ position: 'absolute', inset: 0, padding: 14 }}>
              <MLKSVG fills={{ sun: '#FFC857', sky: '#CFEAF8', 'cloud-l': '#FFFFFF', 'cloud-r': '#FFFFFF', face: '#C9824C', hair: '#3A1F0F', suit: '#1B1B1B', tie: '#7A1A78', shirt: '#FFFDF5', podium: '#7B4B25', 'podium-seal': '#F4A6BC', 'mic-head': '#4A5568', 'lapel-l': '#0E0E10', 'lapel-r': '#0E0E10', crowd: '#3A0CA3', neck: '#C9824C' }} onRegion={() => {}} alive={true} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 22, flexWrap: 'wrap' }}>
          <CollectionTabs value={coll} onChange={setColl} counts={counts} />
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 8,
            fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700,
            color: 'var(--ink-soft)', letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            <span>Showing</span>
            <span style={{ color: 'var(--ink)', fontSize: 16 }}>{filtered.length}</span>
            <span>page{filtered.length === 1 ? '' : 's'}</span>
          </div>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 22 }}>
          {filtered.map(p => (
            <PageCard key={p.id} page={p} progress={progressMap[p.id]} onOpen={onOpen} />
          ))}
        </div>

        {/* Footer card */}
        <div style={{
          marginTop: 44,
          padding: '20px 24px',
          background: 'var(--paper-2)',
          border: '2.5px dashed var(--rule)',
          borderRadius: 18,
          display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          justifyContent: 'center', textAlign: 'center',
        }}>
          <span style={{ fontSize: 28 }}>🔭</span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: 'var(--ink)' }}>More adventures on the way</div>
            <div style={{ fontFamily: 'var(--font-hand)', fontSize: 19, color: 'var(--ink-soft)', lineHeight: 1.1, marginTop: 2 }}>
              Renaissance &middot; Greek heroes &middot; brilliant inventors…
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.LibraryScreen = LibraryScreen;
