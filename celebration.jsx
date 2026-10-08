// =================================================================
// Celebration — overlay shown when a page is fully colored.
// Three animation styles (Tweak): 'alive' / 'confetti' / 'mini-scene'
// =================================================================
const { useEffect: useEffectCel, useMemo: useMemoCel, useState: useStateCel } = React;

function Confetti({ count = 60 }) {
  const colors = ['#E63946', '#F77F00', '#FFC857', '#90BE6D', '#48BFE3', '#4361EE', '#7209B7', '#F4A6BC'];
  const pieces = useMemoCel(() => Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 1.4,
    dur: 2.2 + Math.random() * 2.4,
    color: colors[i % colors.length],
    rotate: Math.random() * 360,
    cx: (Math.random() - 0.5) * 240 + 'px',
    cy: (window.innerHeight || 800) + 200 + 'px',
    cr: (360 + Math.random() * 720) + 'deg',
    shape: i % 3, // 0 rect, 1 circle, 2 triangle
  })), [count]);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {pieces.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', top: -20, left: p.left + '%',
          width: 14, height: p.shape === 0 ? 18 : 14,
          background: p.shape === 2 ? 'transparent' : p.color,
          borderRadius: p.shape === 1 ? '50%' : 2,
          transform: `rotate(${p.rotate}deg)`,
          ['--cx']: p.cx,
          ['--cy']: p.cy,
          ['--cr']: p.cr,
          animation: `confetti-fall ${p.dur}s linear ${p.delay}s forwards`,
          borderTop: p.shape === 2 ? `14px solid ${p.color}` : 'none',
          borderLeft: p.shape === 2 ? '7px solid transparent' : 'none',
          borderRight: p.shape === 2 ? '7px solid transparent' : 'none',
          width: p.shape === 2 ? 0 : 14,
          height: p.shape === 2 ? 0 : (p.shape === 0 ? 18 : 14),
          background: p.shape === 2 ? 'transparent' : p.color,
        }} />
      ))}
    </div>
  );
}

function Sparkles({ count = 16 }) {
  const items = useMemoCel(() => Array.from({ length: count }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 1.5,
    size: 12 + Math.random() * 22,
  })), [count]);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {items.map((it, i) => (
        <div key={i} style={{
          position: 'absolute', left: it.x + '%', top: it.y + '%',
          fontSize: it.size, color: '#FFC857',
          animation: `twinkle 1.6s ease-in-out infinite ${it.delay}s, gentle-bob 2.4s ease-in-out infinite ${it.delay}s`,
          filter: 'drop-shadow(0 0 6px rgba(255,200,80,0.6))',
        }}>✦</div>
      ))}
    </div>
  );
}

function Celebration({ page, fills, strokes, tweaks, onClose, onLibrary, onSpeechQuest, alreadyDone }) {
  const Comp = page.Component;
  const [stage, setStage] = useStateCel(0); // 0: bring alive, 1: sticker reveal
  const anim = tweaks.animation_style || 'alive';

  useEffectCel(() => {
    const t = setTimeout(() => setStage(1), 1700);
    // celebratory cheer
    if (window.sfx) window.sfx.cheer();
    return () => {
      clearTimeout(t);
      if (window.speech) window.speech.stop();
    };
  }, []);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: 'rgba(20, 14, 8, 0.78)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(2px)',
    }}>
      {anim !== 'mini-scene' && <Confetti count={anim === 'confetti' ? 110 : 60} />}

      <div style={{
        position: 'relative',
        width: 'min(94vw, 980px)',
        maxHeight: '92vh',
        background: 'var(--paper)',
        border: '3px solid var(--ink)',
        borderRadius: 26,
        boxShadow: '8px 8px 0 var(--accent), 0 24px 60px rgba(0,0,0,0.35)',
        padding: 24,
        display: 'flex', flexDirection: 'column', gap: 16,
        overflow: 'hidden',
      }} className="paper-grain">
        {/* close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 14, right: 14, zIndex: 4,
          width: 36, height: 36, borderRadius: 999,
          background: 'var(--paper)', border: '2.5px solid var(--ink)',
          boxShadow: '2px 2px 0 var(--ink)',
          fontSize: 16, fontWeight: 800, cursor: 'pointer',
        }}>✕</button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-hand)', fontSize: 32, color: 'var(--accent)', lineHeight: 1 }}>woohoo!</div>
          <h2 style={{ margin: '4px 0 0', fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, letterSpacing: '-0.02em' }}>
            {alreadyDone ? 'Look at your finished page!' : 'You finished the page!'}
          </h2>
          <div style={{ fontSize: 16, color: 'var(--ink-soft)', marginTop: 4 }}>Watch what happens next ✨</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 22, alignItems: 'center' }}>
          {/* Animated coloring */}
          <div style={{
            position: 'relative',
            aspectRatio: '1 / 1',
            background: page.bgPreview,
            border: '2.5px solid var(--ink)',
            borderRadius: 18,
            overflow: 'hidden',
            transform: stage === 1 ? 'scale(0.96) rotate(-2deg)' : 'scale(1)',
            transition: 'transform 600ms ease-out',
          }} className="paper-fiber">
            <div style={{ position: 'absolute', inset: 0, padding: 14 }}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Comp fills={fills} onRegion={() => {}} alive={true} />
                <StrokesLayer strokes={strokes || []} />
              </div>
            </div>
            {anim !== 'confetti' && <Sparkles count={anim === 'mini-scene' ? 22 : 14} />}
          </div>

          {/* Sticker + actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              padding: 16,
              background: 'var(--paper-2)',
              border: '2.5px solid var(--ink)',
              borderRadius: 18,
              boxShadow: '4px 4px 0 var(--ink)',
              animation: stage === 1 ? 'pop 500ms ease-out' : 'none',
              opacity: stage === 1 ? 1 : 0,
              transition: 'opacity 320ms',
            }}>
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: 22, color: 'var(--accent)', lineHeight: 1 }}>new sticker!</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
                <div style={{
                  width: 96, height: 96, flexShrink: 0,
                  background: page.eraColor,
                  border: '3px dashed #fff', outline: '3px solid var(--ink)',
                  borderRadius: 18,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: 'rotate(-6deg)',
                  position: 'relative',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.25)',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, color: '#fff', fontSize: 14, textAlign: 'center', lineHeight: 1.05, padding: '0 6px' }}>
                    {page.eraLabel.toUpperCase()}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, lineHeight: 1.1 }}>{page.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4, lineHeight: 1.4 }}>{page.fact}</div>
                  <button onClick={() => window.speech && window.speech.speak(page.fact)} style={{
                    marginTop: 8,
                    padding: '4px 10px',
                    background: 'transparent', color: 'var(--accent-2)',
                    border: '2px solid var(--accent-2)', borderRadius: 999,
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}>🔊 Read the fact</button>
                </div>
              </div>
            </div>

            <button onClick={onSpeechQuest} style={{
              padding: '16px 18px',
              background: 'var(--accent)', color: '#fff',
              border: '2.5px solid var(--ink)', borderRadius: 16,
              boxShadow: '5px 5px 0 var(--ink)',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              cursor: 'pointer',
            }}>📜 Try the Word Quest →</button>

            <button onClick={() => speakFamousWords(page)} style={{
              padding: '12px 16px',
              background: 'var(--paper-2)', color: 'var(--ink)',
              border: '2.5px solid var(--ink)', borderRadius: 14,
              boxShadow: '3px 3px 0 var(--ink)',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>🔊 Hear the famous words</button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button onClick={onClose} style={{
                padding: '12px 14px',
                background: 'var(--paper)', color: 'var(--ink)',
                border: '2.5px solid var(--ink)', borderRadius: 14,
                boxShadow: '3px 3px 0 var(--ink)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
              }}>Keep coloring</button>
              <button onClick={onLibrary || onClose} style={{
                padding: '12px 14px',
                background: 'var(--accent-2)', color: '#fff',
                border: '2.5px solid var(--ink)', borderRadius: 14,
                boxShadow: '3px 3px 0 var(--ink)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
              }}>Back to Library</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Celebration = Celebration;
