// =================================================================
// Brush layer — real free-form drawing on top of region fills.
// Coordinates are in the page SVG's 0..600 viewBox space.
// =================================================================
const { useRef: useRefBR, useState: useStateBR, useId: useIdBR } = React;

// Turn a list of {x,y} points into a smooth quadratic-Bezier path.
function pointsToPath(pts) {
  if (!pts || pts.length === 0) return '';
  if (pts.length === 1) {
    // tiny dot — emit a closed circle-ish stub so a single tap leaves a mark
    const { x, y } = pts[0];
    return `M ${x} ${y} l 0.1 0`;
  }
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const xc = (pts[i].x + pts[i + 1].x) / 2;
    const yc = (pts[i].y + pts[i + 1].y) / 2;
    d += ` Q ${pts[i].x} ${pts[i].y} ${xc} ${yc}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

// Render committed strokes — purely visual, no pointer events.
// Erase strokes don't paint: each one becomes a mask over the paint strokes
// drawn before it, so it removes brush paint without touching the page art
// underneath. Paint strokes drawn after an erase stay visible.
function StrokesLayer({ strokes }) {
  // Unique per instance — the library renders many thumbnails at once.
  const uid = useIdBR().replace(/[^a-zA-Z0-9_-]/g, '');
  if (!strokes || !strokes.length) return null;
  const masks = [];
  let content = [];
  strokes.forEach(s => {
    if (s.mode === 'erase') {
      if (!content.length) return; // nothing underneath to erase
      const maskId = `erase-${uid}-${s.id}`;
      masks.push(
        <mask key={maskId} id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
          <rect x="0" y="0" width="600" height="600" fill="white" />
          <path d={s.d} stroke="black" strokeWidth={s.width}
            fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </mask>
      );
      content = [<g key={maskId} mask={`url(#${maskId})`}>{content}</g>];
    } else {
      content.push(
        <path key={s.id} d={s.d}
          stroke={s.color} strokeWidth={s.width}
          fill="none" strokeLinecap="round" strokeLinejoin="round"
          opacity={0.88}
          style={{ mixBlendMode: 'multiply' }}
        />
      );
    }
  });
  if (!content.length) return null;
  return (
    <svg
      viewBox="0 0 600 600" width="100%" height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'multiply' }}
    >
      {masks.length > 0 && <defs>{masks}</defs>}
      {content}
    </svg>
  );
}

// Capture pointer input and emit committed strokes. Sits ABOVE the page art
// when `active` is true so region fills don't fire during brush drawing.
function BrushCanvas({ active, color, width, mode, paperColor, onCommit }) {
  const svgRef = useRefBR(null);
  const drawingRef = useRefBR(null);
  const [liveD, setLiveD] = useStateBR(null);

  // Erase strokes are masks (see StrokesLayer); while drawing, show a faint
  // trail so the child can see where they're erasing.
  const strokeColor = mode === 'erase' ? 'rgba(26,26,34,0.18)' : color;

  const toSvg = (clientX, clientY) => {
    const svg = svgRef.current; if (!svg) return null;
    const pt = svg.createSVGPoint(); pt.x = clientX; pt.y = clientY;
    const ctm = svg.getScreenCTM(); if (!ctm) return null;
    const p = pt.matrixTransform(ctm.inverse());
    // Round to 0.1 viewBox units — invisible on screen, but full-precision
    // floats roughly triple the size of every stroke saved to localStorage.
    return { x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10 };
  };

  const start = (e) => {
    if (!active) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    const p = toSvg(e.clientX, e.clientY); if (!p) return;
    drawingRef.current = { points: [p] };
    setLiveD(`M ${p.x} ${p.y} l 0.1 0`);
    if (window.sfx) window.sfx.scribble();
  };
  const move = (e) => {
    if (!active || !drawingRef.current) return;
    const p = toSvg(e.clientX, e.clientY); if (!p) return;
    const pts = drawingRef.current.points;
    const last = pts[pts.length - 1];
    const dx = p.x - last.x, dy = p.y - last.y;
    if (dx * dx + dy * dy < 4) return; // skip noisy micro-movements (< 2 viewBox units)
    pts.push(p);
    setLiveD(pointsToPath(pts));
  };
  const stop = () => {
    if (!drawingRef.current) return;
    const pts = drawingRef.current.points;
    if (pts.length > 0) {
      const stroke = {
        id: 'stk-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        color: strokeColor,
        width,
        d: pointsToPath(pts),
        mode: mode === 'erase' ? 'erase' : 'paint',
      };
      onCommit(stroke);
    }
    drawingRef.current = null;
    setLiveD(null);
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 600" width="100%" height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{
        position: 'absolute', inset: 0,
        touchAction: 'none', userSelect: 'none',
        pointerEvents: active ? 'auto' : 'none',
        cursor: active ? (mode === 'erase' ? 'cell' : 'crosshair') : 'default',
      }}
      onPointerDown={start}
      onPointerMove={move}
      onPointerUp={stop}
      onPointerCancel={stop}
      onPointerLeave={stop}
    >
      {/* invisible hit target so empty canvas areas still receive pointer events */}
      {active && (
        <rect x="0" y="0" width="600" height="600" fill="white" opacity="0" pointerEvents="all" />
      )}
      {liveD && (
        <path d={liveD}
          stroke={strokeColor} strokeWidth={width}
          fill="none" strokeLinecap="round" strokeLinejoin="round"
          opacity={mode === 'erase' ? 1 : 0.88}
          style={{ mixBlendMode: 'multiply' }}
        />
      )}
    </svg>
  );
}

Object.assign(window, { StrokesLayer, BrushCanvas, pointsToPath });
