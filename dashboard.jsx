// =================================================================
// DashboardScreen — Parent & Teacher view of all pages and progress.
// =================================================================
const { useState: useStateDS, useMemo: useMemoDS, useEffect: useEffectDS } = React;

function SectionCard({ title, kicker, right, children, pad = 22 }) {
  return (
    <section style={{
      background: 'var(--paper)',
      border: '2.5px solid var(--ink)',
      borderRadius: 20,
      boxShadow: '5px 5px 0 var(--ink)',
      padding: pad,
      marginTop: 22,
    }}>
      {(title || right) && (
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
          <div>
            {kicker && <div style={{ fontFamily: 'var(--font-hand)', fontSize: 20, color: 'var(--ink-soft)', lineHeight: 1 }}>{kicker}</div>}
            <h3 style={{ margin: '2px 0 0', fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900 }}>{title}</h3>
          </div>
          {right}
        </div>
      )}
      {children}
    </section>
  );
}

// Era coverage donut + list
function EraCoverage({ pages, progressMap }) {
  const byEra = useMemoDS(() => {
    const m = {};
    pages.forEach(p => {
      if (!m[p.eraLabel]) m[p.eraLabel] = { color: p.eraColor, total: 0, completed: 0, started: 0, pages: [] };
      m[p.eraLabel].total += 1;
      m[p.eraLabel].pages.push(p);
      const pr = progressMap[p.id];
      if (pr?.completed) m[p.eraLabel].completed += 1;
      else if (pr?.fills && Object.keys(pr.fills).length > 0) m[p.eraLabel].started += 1;
    });
    return m;
  }, [pages, progressMap]);

  const eras = Object.entries(byEra);
  const totalCompleted = eras.reduce((s, [, v]) => s + v.completed, 0);
  const totalAll = eras.reduce((s, [, v]) => s + v.total, 0);

  // Build donut segments
  const C = 2 * Math.PI * 54;
  let offset = 0;
  const segs = eras.map(([label, v]) => {
    const portion = v.total / totalAll;
    const len = portion * C;
    const seg = { label, color: v.color, len, gap: C - len, offset };
    offset += len;
    return seg;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24, alignItems: 'center' }}>
      <div style={{ position: 'relative', width: 160, height: 160 }}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="54" fill="none" stroke="var(--paper-2)" strokeWidth="20" />
          {segs.map((s, i) => (
            <circle key={i} cx="80" cy="80" r="54" fill="none"
              stroke={s.color}
              strokeWidth="20"
              strokeDasharray={`${s.len - 4} ${s.gap + 4}`}
              strokeDashoffset={-s.offset}
              transform="rotate(-90 80 80)"
              strokeLinecap="butt"
            />
          ))}
          <text x="80" y="76" textAnchor="middle" fontFamily="Fraunces" fontWeight="900" fontSize="32" fill="var(--ink)">{totalCompleted}</text>
          <text x="80" y="96" textAnchor="middle" fontFamily="Nunito" fontWeight="700" fontSize="11" fill="var(--ink-soft)" letterSpacing="0.08em">/ {totalAll} DONE</text>
        </svg>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
        {eras.map(([label, v]) => (
          <div key={label} style={{
            padding: '10px 12px',
            background: 'var(--paper-2)',
            border: '2px solid var(--ink)',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 14, height: 14, borderRadius: 4, background: v.color, border: '1.5px solid var(--ink)' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 1 }}>
                {v.completed} done · {v.started} in progress · {v.total - v.completed - v.started} new
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Suggested next pages — easiest unfinished, hardest unfinished, best for quest practice
function Recommendations({ pages, progressMap, onOpen }) {
  const recs = useMemoDS(() => {
    const out = [];
    const unfinished = pages.filter(p => !progressMap[p.id]?.completed);

    // Easiest next
    const easy = [...unfinished].sort((a, b) => (a.readingLevel?.lexile || 999) - (b.readingLevel?.lexile || 999))[0];
    if (easy) out.push({
      tag: 'Try first',
      reason: 'Lowest reading level among unfinished pages — a friendly place to start.',
      page: easy,
    });

    // Stretch goal
    const hard = [...unfinished].sort((a, b) => (b.readingLevel?.lexile || 0) - (a.readingLevel?.lexile || 0))[0];
    if (hard && hard !== easy) out.push({
      tag: 'Stretch goal',
      reason: `Highest reading level (${hard.readingLevel?.lexile}L) — pair with read-aloud.`,
      page: hard,
    });

    // Quest practice — solved coloring but quest <100%
    const questPractice = pages.find(p => {
      const pr = progressMap[p.id];
      if (!pr) return false;
      const q = pr.quest;
      return pr.completed && q && (q.wrong || 0) > 0 && !q.solved;
    });
    if (questPractice) out.push({
      tag: 'Word Quest practice',
      reason: 'Got close last time — one more round will earn the sticker.',
      page: questPractice,
    });

    // Fallback: pick the next un-opened US/world page to balance collections
    if (out.length < 3) {
      const unopened = pages.find(p => !progressMap[p.id] && !out.find(r => r.page === p));
      if (unopened) out.push({
        tag: 'New adventure',
        reason: 'Haven\u2019t opened this one yet.',
        page: unopened,
      });
    }
    return out.slice(0, 3);
  }, [pages, progressMap]);

  if (!recs.length) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
      {recs.map(r => (
        <button key={r.tag} onClick={() => onOpen(r.page.id)} style={{
          textAlign: 'left',
          padding: 14,
          background: 'var(--paper-2)',
          border: '2.5px solid var(--ink)',
          borderRadius: 16,
          boxShadow: '4px 4px 0 var(--ink)',
          display: 'flex', flexDirection: 'column', gap: 10,
          cursor: 'pointer',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            alignSelf: 'flex-start',
            background: r.page.eraColor, color: '#fff',
            padding: '2px 10px', borderRadius: 999,
            fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>{r.tag}</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 60, height: 60, borderRadius: 10, background: r.page.bgPreview, border: '2px solid var(--ink)', overflow: 'hidden', flex: '0 0 60px' }}>
              <div style={{ width: '100%', height: '100%', padding: 4 }}>
                <r.page.Component fills={{}} onRegion={() => {}} alive={false} />
              </div>
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, lineHeight: 1.15 }}>{r.page.title}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>{r.page.readingLevel?.lexile}L · Gr {r.page.readingLevel?.gradeBand}</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.4 }}>{r.reason}</div>
        </button>
      ))}
    </div>
  );
}

// Settings — surfaces selected tweaks in a teacher-friendly UI
function SettingsBlock({ tweaks, setTweak, voiceList }) {
  const Field = ({ label, hint, children }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, alignItems: 'center', padding: '12px 0', borderBottom: '1.5px dashed var(--rule)' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14 }}>{label}</div>
        {hint && <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2 }}>{hint}</div>}
      </div>
      <div>{children}</div>
    </div>
  );

  const Pill = ({ active, onClick, children }) => (
    <button onClick={onClick} style={{
      padding: '8px 14px',
      background: active ? 'var(--ink)' : 'var(--paper)',
      color: active ? 'var(--paper)' : 'var(--ink)',
      border: '2px solid var(--ink)', borderRadius: 999,
      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
      marginRight: 6, marginBottom: 6,
    }}>{children}</button>
  );

  return (
    <div>
      <Field label="Age & density" hint="Tunes button size and how much text is shown.">
        <Pill active={tweaks.age_density === 'big'} onClick={() => setTweak('age_density', 'big')}>K–2 (big)</Pill>
        <Pill active={tweaks.age_density === 'mid'} onClick={() => setTweak('age_density', 'mid')}>Grade 3–5</Pill>
      </Field>
      <Field label="Visual theme" hint="Background palette for the whole app.">
        {[
          { v: 'warm-classroom', l: 'Warm Classroom' },
          { v: 'bright-playful', l: 'Bright & Playful' },
          { v: 'parchment-museum', l: 'Parchment Museum' },
        ].map(o => (
          <Pill key={o.v} active={tweaks.theme === o.v} onClick={() => setTweak('theme', o.v)}>{o.l}</Pill>
        ))}
      </Field>
      <Field label="Sound effects" hint="Crayon scribble, cheers, button pops.">
        <Pill active={tweaks.sound_on} onClick={() => setTweak('sound_on', true)}>On</Pill>
        <Pill active={!tweaks.sound_on} onClick={() => setTweak('sound_on', false)}>Mute</Pill>
      </Field>
      <Field label="Read famous speech aloud" hint="Auto-narrates the Word Quest text when it opens.">
        <Pill active={tweaks.auto_narrate} onClick={() => setTweak('auto_narrate', true)}>On</Pill>
        <Pill active={!tweaks.auto_narrate} onClick={() => setTweak('auto_narrate', false)}>Off</Pill>
      </Field>
      <Field label="Narrator voice" hint="Choose a system voice. Each page has its own preferred pitch.">
        <select
          value={tweaks.voice_override || 'auto'}
          onChange={(e) => setTweak('voice_override', e.target.value)}
          style={{
            width: '100%', maxWidth: 360,
            padding: '8px 12px',
            background: 'var(--paper)',
            border: '2px solid var(--ink)',
            borderRadius: 10,
            fontFamily: 'var(--font-body)', fontSize: 13,
          }}>
          <option value="auto">Auto — pick best per page</option>
          {voiceList.map(v => <option key={v.name} value={v.name}>{v.name}{v.lang ? ' · ' + v.lang : ''}</option>)}
        </select>
      </Field>
      <Field label="Reading speed" hint={`Currently ${tweaks.voice_rate}% of normal.`}>
        <input type="range" min="60" max="140" step="5" value={tweaks.voice_rate} onChange={(e) => setTweak('voice_rate', parseInt(e.target.value, 10))} style={{ width: '100%', maxWidth: 360 }} />
      </Field>
    </div>
  );
}

// =================================================================
// Main DashboardScreen
// =================================================================
function DashboardScreen({ progressMap, pages, tweaks, setTweak, voiceList, onBack, onOpen, onResetPage, onResetAll }) {
  const [unlocked, setUnlocked] = useStateDS(() => {
    try { return sessionStorage.getItem('hcb-parent-unlocked') === '1'; } catch (e) { return false; }
  });
  const [sortBy, setSortBy] = useStateDS('default'); // default | lexile | status

  useEffectDS(() => {
    if (unlocked) { try { sessionStorage.setItem('hcb-parent-unlocked', '1'); } catch (e) {} }
  }, [unlocked]);

  // ----- KPIs -----
  const stats = useMemoDS(() => {
    const n = pages.length;
    let started = 0, completed = 0, questsSolved = 0;
    let questCorrect = 0, questWrong = 0, timeMs = 0;
    pages.forEach(p => {
      const pr = progressMap[p.id];
      if (!pr) return;
      const c = pr.fills ? Object.keys(pr.fills).filter(k => pr.fills[k] !== '#FFFFFF').length : 0;
      if (c > 0) started += 1;
      if (pr.completed) completed += 1;
      if (pr.questSolved) questsSolved += 1;
      questCorrect += pr.quest?.correct || 0;
      questWrong += pr.quest?.wrong || 0;
      timeMs += pr.timeMs || 0;
    });
    const accuracy = (questCorrect + questWrong) > 0
      ? Math.round((questCorrect / (questCorrect + questWrong)) * 100)
      : null;
    return { n, started, completed, questsSolved, accuracy, questCorrect, questWrong, timeMs };
  }, [pages, progressMap]);

  // ----- Sorted pages for table -----
  const sortedPages = useMemoDS(() => {
    const arr = pages.slice();
    if (sortBy === 'lexile') arr.sort((a, b) => (a.readingLevel?.lexile || 0) - (b.readingLevel?.lexile || 0));
    else if (sortBy === 'status') arr.sort((a, b) => {
      const sa = progressMap[a.id]?.completed ? 0 : (progressMap[a.id]?.fills ? 1 : 2);
      const sb = progressMap[b.id]?.completed ? 0 : (progressMap[b.id]?.fills ? 1 : 2);
      return sa - sb;
    });
    return arr;
  }, [pages, progressMap, sortBy]);

  // ----- Time pretty -----
  const totalTime = (() => {
    const s = Math.round(stats.timeMs / 1000);
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const r = s - m * 60;
    if (m < 60) return `${m}m ${r}s`;
    return `${Math.floor(m / 60)}h ${m % 60}m`;
  })();

  if (!unlocked) {
    return (
      <div style={{ width: '100%', height: '100%', background: 'var(--paper)', position: 'relative' }} className="paper-grain">
        <ParentGate onUnlock={() => setUnlocked(true)} onCancel={onBack} />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', background: 'var(--paper)' }} className="paper-grain">
      {/* Print styles (scoped to this view) */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 40px 80px' }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
          flexWrap: 'wrap', marginBottom: 4,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Clipboard icon */}
            <div style={{
              width: 64, height: 80, borderRadius: 10,
              background: 'var(--paper-2)',
              border: '3px solid var(--ink)',
              boxShadow: '4px 4px 0 var(--ink)',
              position: 'relative', transform: 'rotate(-3deg)',
            }}>
              <div style={{
                position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                width: 32, height: 14, background: 'var(--ink)', borderRadius: 4,
              }} />
              <div style={{ position: 'absolute', top: 22, left: 8, right: 8, height: 2, background: 'var(--rule)' }} />
              <div style={{ position: 'absolute', top: 32, left: 8, right: 14, height: 2, background: 'var(--rule)' }} />
              <div style={{ position: 'absolute', top: 42, left: 8, right: 20, height: 2, background: 'var(--rule)' }} />
              <div style={{ position: 'absolute', top: 56, left: 8, fontSize: 18 }}>✓</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: 24, color: 'var(--accent-2)', lineHeight: 1, marginBottom: 2 }}>parents &amp; teachers</div>
              <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em' }}>Grown-Ups Dashboard</h1>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>
                Progress, reading levels, and standards alignment for History Coloring Books.
              </div>
            </div>
          </div>
          <div className="no-print" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => window.print()} style={{
              padding: '12px 18px',
              background: 'var(--paper)',
              border: '2.5px solid var(--ink)', borderRadius: 14,
              boxShadow: '4px 4px 0 var(--ink)',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15,
            }}>🖨 Print report</button>
            <button onClick={onBack} style={{
              padding: '12px 18px',
              background: 'var(--ink)', color: 'var(--paper)',
              border: '2.5px solid var(--ink)', borderRadius: 14,
              boxShadow: '4px 4px 0 var(--accent)',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15,
            }}>← Back to Library</button>
          </div>
        </div>

        {/* Learner card — single profile for now, with stub for adding another */}
        <div style={{
          marginTop: 22,
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '14px 18px',
          background: 'var(--paper-2)',
          border: '2.5px solid var(--ink)',
          borderRadius: 18,
          boxShadow: '4px 4px 0 var(--ink)',
          flexWrap: 'wrap',
        }}>
          <div style={{
            width: 50, height: 50, borderRadius: 999,
            background: 'var(--accent-3)', border: '2.5px solid var(--ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22,
            color: 'var(--ink)',
          }}>E</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, lineHeight: 1.1 }}>Explorer · this device</div>
            <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Single learner profile · all data stays on this device.</div>
          </div>
          <button className="no-print" onClick={() => alert('Multi-learner profiles are coming soon!')} style={{
            padding: '8px 14px',
            background: 'var(--paper)',
            border: '2px dashed var(--rule)', borderRadius: 10,
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
            color: 'var(--ink-soft)',
          }}>+ Add a learner</button>
        </div>

        {/* KPIs */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 22 }}>
          <KpiCard icon="📖" value={`${stats.completed}/${stats.n}`} label="Pages completed" sub={`${stats.started} started`} accent="#5A8F4A" />
          <KpiCard icon="📜" value={stats.questsSolved} label="Word Quests solved" sub={stats.questsSolved === stats.completed ? 'on every finished page' : 'stickers earned'} accent="var(--accent-2)" />
          <KpiCard icon="🎯" value={stats.accuracy !== null ? stats.accuracy + '%' : '—'} label="Quest accuracy" sub={stats.accuracy !== null ? `${stats.questCorrect} correct / ${stats.questWrong} retries` : 'No attempts yet'} accent="var(--accent)" />
          <KpiCard icon="⏱" value={totalTime} label="Time on task" sub="All pages combined" accent="var(--accent-3)" />
        </div>

        {/* Reading level map */}
        <div style={{ marginTop: 22 }}>
          <ReadingLevelMap pages={pages} progressMap={progressMap} />
        </div>

        {/* Per-page table */}
        <SectionCard
          kicker="every adventure, at a glance"
          title="Page-by-page progress"
          right={
            <div className="no-print" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--ink-soft)', marginRight: 4 }}>Sort:</span>
              {['default','lexile','status'].map(s => (
                <button key={s} onClick={() => setSortBy(s)} style={{
                  padding: '6px 12px',
                  background: sortBy === s ? 'var(--ink)' : 'var(--paper-2)',
                  color: sortBy === s ? 'var(--paper)' : 'var(--ink)',
                  border: '2px solid var(--ink)', borderRadius: 999,
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
                  textTransform: 'capitalize',
                }}>{s === 'lexile' ? 'Reading level' : s}</button>
              ))}
            </div>
          }
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--ink)' }}>
                  {['Page','','Reading level','Coloring','Word Quest','Time / last','Actions'].map((h,i) => (
                    <th key={i} style={{
                      textAlign: 'left', padding: '8px',
                      fontFamily: 'var(--font-display)', fontSize: 11,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: 'var(--ink-soft)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedPages.map(p => (
                  <PageRow key={p.id} page={p} progress={progressMap[p.id]} onOpen={onOpen} onReset={onResetPage} />
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Two-column: Era coverage + Recommendations */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 22, marginTop: 22 }}>
          <SectionCard kicker="balance across history" title="Era coverage" pad={22}>
            <EraCoverage pages={pages} progressMap={progressMap} />
          </SectionCard>
          <SectionCard kicker="suggested next" title="What to try this week">
            <Recommendations pages={pages} progressMap={progressMap} onOpen={onOpen} />
          </SectionCard>
        </div>

        {/* Standards alignment */}
        <SectionCard kicker="what kids practice" title="Standards & skills">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {pages.map(p => (
              <div key={p.id} style={{
                padding: 12,
                background: 'var(--paper-2)',
                border: '2px solid var(--ink)',
                borderRadius: 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ width: 12, height: 12, borderRadius: 3, background: p.eraColor, border: '1.5px solid var(--ink)' }} />
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, lineHeight: 1.1 }}>{p.title}</div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                  {(p.standards || []).map(s => (
                    <span key={s} style={{
                      padding: '1px 7px',
                      background: 'var(--paper)',
                      border: '1.5px solid var(--ink)',
                      borderRadius: 6,
                      fontFamily: 'monospace', fontSize: 11, fontWeight: 700,
                    }}>{s}</span>
                  ))}
                </div>
                {p.keyVocab && p.keyVocab.length > 0 && (
                  <>
                    <div style={{ fontSize: 10, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 800, marginBottom: 3 }}>Key vocab</div>
                    <div style={{ fontSize: 12, color: 'var(--ink)', fontStyle: 'italic', lineHeight: 1.4 }}>
                      {p.keyVocab.join(', ')}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Settings */}
        <SectionCard kicker="how it feels" title="Settings">
          <SettingsBlock tweaks={tweaks} setTweak={setTweak} voiceList={voiceList} />
        </SectionCard>

        {/* Danger zone */}
        <SectionCard kicker="hard reset" title="Clear all progress">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', maxWidth: 600, lineHeight: 1.5 }}>
              Erases every coloring fill, sticker, time-on-task and Word Quest score on this device.
              Use this between learners or to give a child a fresh start.
            </div>
            <button className="no-print" onClick={() => {
              if (!confirm('Erase ALL coloring progress, stickers, and Word Quest scores?')) return;
              onResetAll();
            }} style={{
              padding: '12px 18px',
              background: 'var(--accent)', color: '#fff',
              border: '2.5px solid var(--ink)', borderRadius: 12,
              boxShadow: '4px 4px 0 var(--ink)',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14,
            }}>Reset everything</button>
          </div>
        </SectionCard>

        {/* Footer note */}
        <div style={{ marginTop: 28, padding: '14px 18px', background: 'var(--paper-2)', border: '2px dashed var(--rule)', borderRadius: 12, fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
          <b>About reading levels:</b> Lexile and grade band estimates reflect the simplified speech text used inside each Word Quest, not the original historical document.
          Pair higher-level pages with the built-in read-aloud (above) for emerging readers.
        </div>
      </div>
    </div>
  );
}

window.DashboardScreen = DashboardScreen;
