// =================================================================
// Dashboard helpers — small building blocks used by DashboardScreen.
// Kept in a separate file so the main dashboard.jsx stays readable.
// =================================================================
const { useState: useStateDB, useEffect: useEffectDB, useMemo: useMemoDB } = React;

// -----------------------------------------------------------------
// Parent gate: kids shouldn't wander in. Simple multiplication.
// -----------------------------------------------------------------
function ParentGate({ onUnlock, onCancel }) {
  // Pick a random product on mount; remember the right answer + 3 distractors.
  const [{ a, b, choices, answer }] = useStateDB(() => {
    const a = 4 + Math.floor(Math.random() * 7);   // 4..10
    const b = 4 + Math.floor(Math.random() * 7);
    const answer = a * b;
    const decoys = new Set([answer]);
    while (decoys.size < 4) {
      const delta = (Math.random() < 0.5 ? -1 : 1) * (2 + Math.floor(Math.random() * 9));
      const v = answer + delta;
      if (v > 0) decoys.add(v);
    }
    const choices = [...decoys].sort(() => Math.random() - 0.5);
    return { a, b, choices, answer };
  });
  const [wrong, setWrong] = useStateDB(false);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 90,
      background: 'rgba(20, 14, 8, 0.78)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        width: 'min(440px, 100%)',
        background: 'var(--paper)',
        border: '3px solid var(--ink)',
        borderRadius: 22,
        boxShadow: '8px 8px 0 var(--accent-2)',
        padding: '28px 28px 22px',
        animation: wrong ? 'shake 320ms ease-out' : 'pop 240ms ease-out',
      }} className="paper-grain">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'var(--accent-2)', color: '#fff',
            border: '2.5px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}>🔒</div>
          <div>
            <div style={{ fontFamily: 'var(--font-hand)', fontSize: 20, color: 'var(--ink-soft)', lineHeight: 1 }}>just for grown-ups</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900, lineHeight: 1.1 }}>Quick check</div>
          </div>
        </div>
        <p style={{ margin: '8px 0 14px', color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.5 }}>
          Solve this to open the parent &amp; teacher dashboard. Kids — go pick a coloring page!
        </p>
        <div style={{
          background: 'var(--paper-2)',
          border: '2.5px dashed var(--rule)',
          borderRadius: 14,
          padding: '18px 22px',
          textAlign: 'center',
          marginBottom: 14,
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 42, letterSpacing: '0.04em' }}>
            {a} × {b} = ?
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {choices.map(c => (
            <button key={c} onClick={() => {
              if (c === answer) onUnlock();
              else { setWrong(true); setTimeout(() => setWrong(false), 360); }
            }} style={{
              padding: '14px 0',
              background: 'var(--paper)',
              border: '2.5px solid var(--ink)', borderRadius: 12,
              boxShadow: '4px 4px 0 var(--ink)',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22,
            }}>{c}</button>
          ))}
        </div>
        <button onClick={onCancel} style={{
          marginTop: 14, width: '100%',
          padding: '10px 14px',
          background: 'transparent', color: 'var(--ink-soft)',
          border: '2px dashed var(--rule)', borderRadius: 12,
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
        }}>← Back to coloring</button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// KPI stat card
// -----------------------------------------------------------------
function KpiCard({ value, label, sub, accent, icon }) {
  return (
    <div style={{
      flex: '1 1 180px',
      minWidth: 0,
      padding: '18px 20px',
      background: 'var(--paper)',
      border: '2.5px solid var(--ink)',
      borderRadius: 18,
      boxShadow: '5px 5px 0 var(--ink)',
      display: 'flex', flexDirection: 'column', gap: 4,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: -6, top: -8,
        width: 64, height: 64, borderRadius: 16,
        background: accent || 'var(--accent-3)',
        opacity: 0.18,
        transform: 'rotate(8deg)',
      }} />
      <div style={{ fontSize: 22, lineHeight: 1, marginBottom: 2 }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 36, lineHeight: 1, letterSpacing: '-0.02em' }}>{value}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 1 }}>{sub}</div>}
    </div>
  );
}

// -----------------------------------------------------------------
// Reading-level map — axis 400–1100 Lexile, pages plotted as chips.
// -----------------------------------------------------------------
function ReadingLevelMap({ pages, progressMap }) {
  // Axis span
  const MIN = 400, MAX = 1100;
  const pct = (l) => Math.max(0, Math.min(1, (l - MIN) / (MAX - MIN))) * 100;
  const bands = [
    { from: 400, to: 550, label: 'K–1',   tint: 'rgba(144, 190, 109, 0.30)' },
    { from: 550, to: 700, label: '2–3',   tint: 'rgba(72, 191, 227, 0.28)' },
    { from: 700, to: 850, label: '3–4',   tint: 'rgba(255, 200, 87, 0.32)' },
    { from: 850, to: 1000, label: '4–5',  tint: 'rgba(247, 127, 0, 0.28)' },
    { from: 1000, to: 1100, label: '6+',  tint: 'rgba(200, 16, 46, 0.26)' },
  ];

  return (
    <div style={{
      background: 'var(--paper)',
      border: '2.5px solid var(--ink)',
      borderRadius: 20,
      boxShadow: '5px 5px 0 var(--ink)',
      padding: '22px 26px 18px',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-hand)', fontSize: 20, color: 'var(--ink-soft)', lineHeight: 1 }}>where each page fits</div>
          <h3 style={{ margin: '2px 0 0', fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900 }}>Reading Level Map</h3>
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
          Approx. Lexile for the simplified speech text on each page.
        </div>
      </div>

      {/* Bands */}
      <div style={{ position: 'relative', height: 220, marginTop: 8 }}>
        {/* band backgrounds */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 28, height: 120, border: '2px solid var(--ink)', borderRadius: 10, overflow: 'hidden', background: 'var(--paper-2)' }}>
          {bands.map((b, i) => (
            <div key={i} style={{
              position: 'absolute', top: 0, bottom: 0,
              left: pct(b.from) + '%',
              width: (pct(b.to) - pct(b.from)) + '%',
              background: b.tint,
              borderRight: i < bands.length - 1 ? '1.5px dashed rgba(0,0,0,0.18)' : 'none',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              padding: '4px 0 6px',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12, color: 'var(--ink)',
              letterSpacing: '0.06em',
            }}>Grade {b.label}</div>
          ))}
        </div>
        {/* axis labels */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 8, fontSize: 11, color: 'var(--ink-soft)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.08em' }}>
          <span>400L</span><span>550L</span><span>700L</span><span>850L</span><span>1000L</span><span>1100L</span>
        </div>
        {/* page dots */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 152, height: 0 }}>
          {pages.map((p, i) => {
            const l = p.readingLevel?.lexile || 600;
            const x = pct(l);
            const done = progressMap?.[p.id]?.completed;
            // stagger labels vertically to avoid overlap
            const lane = i % 3;
            return (
              <div key={p.id} style={{
                position: 'absolute',
                left: `calc(${x}% - 16px)`,
                top: -100 + lane * 0,
              }}>
                {/* drop line from top band into label */}
                <div style={{ position: 'absolute', left: 14, top: -42, width: 0, height: 42, borderLeft: '2px dashed ' + p.eraColor, opacity: 0.7 }} />
                {/* dot */}
                <div style={{
                  position: 'absolute', left: 6, top: -50,
                  width: 22, height: 22, borderRadius: 999,
                  background: p.eraColor,
                  border: '2.5px solid var(--ink)',
                  boxShadow: '2px 2px 0 var(--ink)',
                }}>
                  {done && (
                    <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 900 }}>✓</span>
                  )}
                </div>
                {/* label */}
                <div style={{
                  position: 'absolute', top: 8 + lane * 18,
                  left: -54, width: 140, textAlign: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11,
                  color: 'var(--ink)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  <span style={{ background: 'var(--paper)', padding: '1px 6px', borderRadius: 4, border: '1.5px solid var(--ink)' }}>{p.title.replace(/^The /, '')} · {l}L</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// Per-page row
// -----------------------------------------------------------------
function PageRow({ page, progress, onOpen, onReset }) {
  const total = page.regions.length;
  const fills = progress?.fills || {};
  const colored = page.regions.filter(r => fills[r] && fills[r] !== '#FFFFFF').length;
  const pct = total ? Math.round((colored / total) * 100) : 0;
  const status = progress?.completed ? 'Complete' : (colored > 0 ? 'In progress' : 'Not started');
  const statusColor = status === 'Complete' ? '#2D6A4F' : (status === 'In progress' ? '#C8102E' : '#7A8593');
  const quest = progress?.quest || { correct: 0, wrong: 0, solved: false };
  const accuracy = (quest.correct + quest.wrong) > 0
    ? Math.round((quest.correct / (quest.correct + quest.wrong)) * 100)
    : null;
  const minutes = Math.round(((progress?.timeMs) || 0) / 60000);
  const seconds = Math.round((((progress?.timeMs) || 0) % 60000) / 1000);
  const timeLabel = progress?.timeMs ? (minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`) : '—';
  const lastOpenedLabel = (() => {
    const t = progress?.lastOpenedAt;
    if (!t) return '—';
    const dt = Date.now() - t;
    if (dt < 60000) return 'just now';
    if (dt < 3600000) return Math.round(dt / 60000) + 'm ago';
    if (dt < 86400000) return Math.round(dt / 3600000) + 'h ago';
    return Math.round(dt / 86400000) + 'd ago';
  })();

  const rl = page.readingLevel || {};
  return (
    <tr style={{ borderBottom: '1.5px dashed var(--rule)' }}>
      <td style={{ padding: '12px 8px', width: 64 }}>
        <div style={{ width: 56, height: 56, borderRadius: 10, background: page.bgPreview, border: '2px solid var(--ink)', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', padding: 4, position: 'relative' }}>
            <page.Component fills={fills} onRegion={null} alive={false} />
            <StrokesLayer strokes={progress?.strokes || []} />
          </div>
        </div>
      </td>
      <td style={{ padding: '12px 8px', minWidth: 200 }}>
        <div style={{
          display: 'inline-block', background: page.eraColor, color: '#fff',
          borderRadius: 999, padding: '1px 8px',
          fontSize: 10, fontWeight: 800, letterSpacing: '0.08em',
          textTransform: 'uppercase', marginBottom: 4,
        }}>{page.eraLabel}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, lineHeight: 1.1 }}>{page.title}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{page.subtitle}</div>
      </td>
      <td style={{ padding: '12px 8px', whiteSpace: 'nowrap' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>{rl.lexile || '—'}L</div>
        <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>Gr {rl.gradeBand || '—'} · F&amp;P {rl.guidedReading || '—'}</div>
      </td>
      <td style={{ padding: '12px 8px', minWidth: 130 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 8, background: 'var(--paper-2)', border: '1.5px solid var(--ink)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: pct + '%', height: '100%', background: 'var(--accent-3)' }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 800, width: 30, textAlign: 'right' }}>{pct}%</span>
        </div>
        <div style={{ fontSize: 11, color: statusColor, fontWeight: 800, marginTop: 4, letterSpacing: '0.04em' }}>{status}</div>
      </td>
      <td style={{ padding: '12px 8px', whiteSpace: 'nowrap' }}>
        {accuracy !== null ? (
          <>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>
              {accuracy}% <span style={{ fontSize: 11, color: 'var(--ink-soft)' }}>({quest.correct}/{quest.correct + quest.wrong})</span>
            </div>
            <div style={{ fontSize: 11, color: quest.solved ? '#2D6A4F' : 'var(--ink-soft)', fontWeight: 700 }}>
              {quest.solved ? '★ Sticker earned' : 'Attempted'}
            </div>
          </>
        ) : (
          <span style={{ color: 'var(--ink-soft)', fontSize: 12 }}>Not yet</span>
        )}
      </td>
      <td style={{ padding: '12px 8px', whiteSpace: 'nowrap', fontSize: 12, color: 'var(--ink-soft)' }}>
        <div>{timeLabel}</div>
        <div style={{ fontSize: 11 }}>{lastOpenedLabel}</div>
      </td>
      <td style={{ padding: '12px 8px', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => onOpen(page.id)} style={{
            padding: '6px 10px',
            background: 'var(--ink)', color: 'var(--paper)',
            border: '2px solid var(--ink)', borderRadius: 8,
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
          }}>Open</button>
          <button onClick={() => onReset(page.id)} style={{
            padding: '6px 10px',
            background: 'var(--paper)', color: 'var(--ink-soft)',
            border: '2px dashed var(--rule)', borderRadius: 8,
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
          }}>Reset</button>
        </div>
      </td>
    </tr>
  );
}

window.ParentGate = ParentGate;
window.KpiCard = KpiCard;
window.ReadingLevelMap = ReadingLevelMap;
window.PageRow = PageRow;
