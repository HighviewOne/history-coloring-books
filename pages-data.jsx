// =================================================================
// History Coloring Books — page data + SVG line art for each scene.
// Each page exports a React component that renders the coloring SVG.
// Regions carry data-region and fire onRegion(id) on click.
// =================================================================

const STROKE = '#1A1A22';
const STROKE_W = 3.2;

// Pass onRegion={null} for display-only renders (thumbnails, celebration):
// the regions then take no clicks and no keyboard focus.
const reg = (fills, onRegion, id) => {
  const fill = fills[id] || '#FFFFFF';
  if (!onRegion) return { 'data-region': id, fill, style: { transition: 'fill 220ms ease-out' } };
  return {
    'data-region': id,
    fill,
    onClick: (e) => { e.stopPropagation(); onRegion(id); },
    // Keyboard coloring: Tab to a region, Enter or Space fills it.
    tabIndex: 0,
    role: 'button',
    'aria-label': id.replace(/[-_]+/g, ' ') + (fill !== '#FFFFFF' ? ', colored' : ''),
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); onRegion(id); }
    },
    style: { cursor: 'pointer', transition: 'fill 220ms ease-out' },
  };
};

function StarShape({ cx, cy, size = 22, id, fills, onRegion, points = 5 }) {
  const pts = [];
  for (let i = 0; i < points * 2; i++) {
    const ang = -Math.PI / 2 + (i * Math.PI) / points;
    const rr = i % 2 ? size * 0.42 : size;
    pts.push(`${cx + rr * Math.cos(ang)},${cy + rr * Math.sin(ang)}`);
  }
  return <polygon points={pts.join(' ')} {...reg(fills, onRegion, id)} />;
}

// ============================================================
// 1. LIBERTY BELL — 1776
// ============================================================
function LibertyBellSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky background */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* corner stars */}
      <g style={alive ? { animation: 'twinkle 1.6s ease-in-out infinite' } : null}>
        <StarShape cx={90} cy={90} size={22} id="star-tl" fills={fills} onRegion={onRegion} />
      </g>
      <g style={alive ? { animation: 'twinkle 1.6s ease-in-out infinite', animationDelay: '0.4s' } : null}>
        <StarShape cx={510} cy={90} size={22} id="star-tr" fills={fills} onRegion={onRegion} />
      </g>
      {/* ground platform */}
      <path d="M 60 510 Q 300 480 540 510 L 540 560 L 60 560 Z" {...reg(fills, onRegion, 'ground')} />
      {/* yoke (wood beam) */}
      <rect x="180" y="120" width="240" height="34" rx="6" {...reg(fills, onRegion, 'yoke')} />
      <rect x="195" y="154" width="14" height="22" {...reg(fills, onRegion, 'post-l')} />
      <rect x="391" y="154" width="14" height="22" {...reg(fills, onRegion, 'post-r')} />
      {/* bell group — alive animation rocks it */}
      <g style={alive ? { animation: 'wave-flag 1.8s ease-in-out infinite', transformOrigin: '300px 130px' } : null}>
        {/* crown loop */}
        <path d="M 280 120 Q 280 88 300 88 Q 320 88 320 120 Z" {...reg(fills, onRegion, 'crown')} />
        {/* bell body */}
        <path d="M 215 176 L 385 176 L 415 390 L 185 390 Z" {...reg(fills, onRegion, 'body')} />
        {/* decoration band line */}
        <line x1="220" y1="226" x2="380" y2="226" stroke={STROKE} strokeWidth="2.4" />
        <line x1="218" y1="240" x2="382" y2="240" stroke={STROKE} strokeWidth="1.6" />
        {/* rim (wider lip) */}
        <path d="M 170 390 L 430 390 L 425 432 L 175 432 Z" {...reg(fills, onRegion, 'rim')} />
        {/* foot */}
        <rect x="195" y="432" width="210" height="18" rx="3" {...reg(fills, onRegion, 'foot')} />
        {/* clapper */}
        <ellipse cx="300" cy="380" rx="22" ry="28" {...reg(fills, onRegion, 'clapper')} />
        {/* crack — outline only (non-colorable) */}
        <path d="M 348 188 Q 340 230 358 270 Q 346 312 362 358" fill="none" stroke={STROKE} strokeWidth="3" />
      </g>
      {/* banner with date */}
      <path d="M 90 470 L 510 470 L 490 514 L 110 514 Z" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="503" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="30" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>JULY 4 · 1776</text>
      {/* corner small stars */}
      <StarShape cx={70} cy={280} size={14} id="star-l" fills={fills} onRegion={onRegion} />
      <StarShape cx={530} cy={280} size={14} id="star-r" fills={fills} onRegion={onRegion} />
    </svg>
  );
}

// ============================================================
// 2. PRESIDENT LINCOLN — Gettysburg Address
// ============================================================
function LincolnSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky panel */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* twinkling stars */}
      <g style={alive ? { animation: 'twinkle 1.4s ease-in-out infinite' } : null}>
        <StarShape cx={90} cy={130} size={14} id="star-1" fills={fills} onRegion={onRegion} />
        <StarShape cx={520} cy={120} size={14} id="star-2" fills={fills} onRegion={onRegion} />
        <StarShape cx={140} cy={70} size={10} id="star-3" fills={fills} onRegion={onRegion} />
        <StarShape cx={470} cy={70} size={10} id="star-4" fills={fills} onRegion={onRegion} />
      </g>
      {/* podium plaque */}
      <rect x="120" y="500" width="360" height="64" rx="8" {...reg(fills, onRegion, 'plaque')} />
      <text x="300" y="540" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="26" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>16TH PRESIDENT</text>
      {/* shoulders / coat */}
      <path d="M 100 500 Q 100 420 200 400 L 400 400 Q 500 420 500 500 Z" {...reg(fills, onRegion, 'coat')} />
      {/* lapel-l */}
      <path d="M 240 400 L 300 472 L 300 500 L 230 500 Z" {...reg(fills, onRegion, 'lapel-l')} />
      {/* lapel-r */}
      <path d="M 360 400 L 300 472 L 300 500 L 370 500 Z" {...reg(fills, onRegion, 'lapel-r')} />
      {/* shirt collar */}
      <path d="M 280 400 L 320 400 L 312 444 L 288 444 Z" {...reg(fills, onRegion, 'shirt')} />
      {/* bow tie */}
      <path d="M 300 444 L 268 432 L 268 462 L 300 450 L 332 462 L 332 432 Z" {...reg(fills, onRegion, 'bowtie')} />
      {/* neck */}
      <path d="M 280 360 L 320 360 L 322 400 L 278 400 Z" {...reg(fills, onRegion, 'neck')} />
      {/* face */}
      <path d="M 222 240 Q 222 340 300 372 Q 378 340 378 240 Q 378 180 300 180 Q 222 180 222 240 Z" {...reg(fills, onRegion, 'face')} />
      {/* hair sides */}
      <path d="M 222 240 Q 210 220 218 198 Q 234 178 252 178 L 252 220 Q 232 232 222 240 Z" {...reg(fills, onRegion, 'hair-l')} />
      <path d="M 378 240 Q 390 220 382 198 Q 366 178 348 178 L 348 220 Q 368 232 378 240 Z" {...reg(fills, onRegion, 'hair-r')} />
      {/* beard along jaw */}
      <path d="M 246 320 Q 232 360 256 384 Q 300 408 344 384 Q 368 360 354 320 Q 300 348 246 320 Z" {...reg(fills, onRegion, 'beard')} />
      {/* eyes — non-colorable */}
      <circle cx="268" cy="252" r="4.5" fill={STROKE} stroke="none" />
      <circle cx="332" cy="252" r="4.5" fill={STROKE} stroke="none" />
      <path d="M 254 240 Q 268 232 282 240" fill="none" stroke={STROKE} strokeWidth="2.6" />
      <path d="M 318 240 Q 332 232 346 240" fill="none" stroke={STROKE} strokeWidth="2.6" />
      {/* nose & mouth */}
      <path d="M 300 258 L 290 296 Q 296 304 304 304 Q 312 304 308 296 Z" fill="none" stroke={STROKE} strokeWidth="2.4" />
      <path d="M 280 318 Q 300 326 320 318" fill="none" stroke={STROKE} strokeWidth="2.6" />
      {/* HAT — stovepipe — rocks slightly when alive */}
      <g style={alive ? { animation: 'gentle-bob 2.4s ease-in-out infinite', transformOrigin: '300px 180px' } : null}>
        <rect x="218" y="174" width="164" height="14" rx="3" {...reg(fills, onRegion, 'hat-brim')} />
        <rect x="232" y="58" width="136" height="120" rx="4" {...reg(fills, onRegion, 'hat-top')} />
        <rect x="232" y="148" width="136" height="20" {...reg(fills, onRegion, 'hat-band')} />
      </g>
    </svg>
  );
}

// ============================================================
// 3. DR. KING — I Have a Dream (at the podium)
// ============================================================
function MLKSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun + rays */}
      <g style={alive ? { animation: 'spin-slow 22s linear infinite', transformOrigin: '300px 130px' } : null}>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 12;
          const x1 = 300 + Math.cos(a) * 78, y1 = 130 + Math.sin(a) * 78;
          const x2 = 300 + Math.cos(a) * 108, y2 = 130 + Math.sin(a) * 108;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={STROKE} strokeWidth="3" />;
        })}
      </g>
      <circle cx="300" cy="130" r="58" {...reg(fills, onRegion, 'sun')} />
      {/* clouds */}
      <path d="M 70 200 Q 70 174 96 174 Q 100 156 122 156 Q 144 156 148 174 Q 174 174 174 200 Z" {...reg(fills, onRegion, 'cloud-l')} />
      <path d="M 426 220 Q 426 196 450 196 Q 454 180 474 180 Q 494 180 498 196 Q 522 196 522 220 Z" {...reg(fills, onRegion, 'cloud-r')} />
      {/* crowd silhouette base */}
      <path d="M 20 488 Q 80 466 140 488 Q 200 466 260 488 Q 320 466 380 488 Q 440 466 500 488 Q 560 470 580 488 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'crowd')} />
      {/* podium */}
      <path d="M 220 380 L 380 380 L 400 480 L 200 480 Z" {...reg(fills, onRegion, 'podium')} />
      <rect x="240" y="402" width="120" height="42" rx="4" {...reg(fills, onRegion, 'podium-seal')} />
      <text x="300" y="430" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="20" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>1963</text>
      {/* microphone */}
      <line x1="300" y1="380" x2="300" y2="328" stroke={STROKE} strokeWidth="3" />
      <ellipse cx="300" cy="316" rx="14" ry="20" {...reg(fills, onRegion, 'mic-head')} />
      {/* suit */}
      <path d="M 220 380 Q 220 320 300 308 Q 380 320 380 380 Z" {...reg(fills, onRegion, 'suit')} />
      {/* lapels */}
      <path d="M 256 320 L 300 360 L 300 380 L 240 380 Z" {...reg(fills, onRegion, 'lapel-l')} />
      <path d="M 344 320 L 300 360 L 300 380 L 360 380 Z" {...reg(fills, onRegion, 'lapel-r')} />
      {/* shirt collar */}
      <path d="M 286 308 L 314 308 L 308 348 L 292 348 Z" {...reg(fills, onRegion, 'shirt')} />
      {/* tie */}
      <path d="M 296 348 L 304 348 L 312 380 L 288 380 Z" {...reg(fills, onRegion, 'tie')} />
      {/* neck */}
      <path d="M 285 280 L 315 280 L 314 308 L 286 308 Z" {...reg(fills, onRegion, 'neck')} />
      {/* head */}
      <ellipse cx="300" cy="248" rx="46" ry="52" {...reg(fills, onRegion, 'face')} />
      {/* hair cap */}
      <path d="M 254 240 Q 252 196 300 192 Q 348 196 346 240 Q 326 218 300 218 Q 274 218 254 240 Z" {...reg(fills, onRegion, 'hair')} />
      {/* face features */}
      <circle cx="284" cy="246" r="3" fill={STROKE} stroke="none" />
      <circle cx="316" cy="246" r="3" fill={STROKE} stroke="none" />
      <path d="M 296 260 L 298 274 L 304 274 L 302 260" fill="none" stroke={STROKE} strokeWidth="2" />
      <path d="M 286 282 Q 300 290 314 282" fill="none" stroke={STROKE} strokeWidth="2.4" />
      <path d="M 286 290 Q 300 296 314 290" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* small mustache */}
      <path d="M 288 270 Q 300 274 312 270" fill="none" stroke={STROKE} strokeWidth="2.4" />
    </svg>
  );
}

// ============================================================
// 4. GREAT PYRAMID & SPHINX — Ancient Egypt
// ============================================================
function PyramidSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.2s ease-in-out infinite', transformOrigin: '460px 130px' } : null}>
        <circle cx="460" cy="130" r="44" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds */}
      <path d="M 80 110 Q 80 90 102 90 Q 108 76 128 76 Q 148 76 152 90 Q 172 90 172 110 Z" {...reg(fills, onRegion, 'cloud')} />
      {/* small background pyramids */}
      <polygon points="120,420 230,210 340,420" {...reg(fills, onRegion, 'pyramid-small-l')} />
      <polygon points="380,420 460,260 540,420" {...reg(fills, onRegion, 'pyramid-small-r')} />
      {/* main great pyramid — two visible faces */}
      <polygon points="260,460 300,150 540,460" {...reg(fills, onRegion, 'pyramid-shade')} />
      <polygon points="60,460 300,150 300,460" {...reg(fills, onRegion, 'pyramid-light')} />
      {/* sand */}
      <path d="M 20 460 Q 200 442 300 460 Q 420 444 580 460 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'sand')} />
      {/* sphinx body */}
      <path d="M 70 510 Q 100 470 170 470 L 250 470 Q 270 470 270 490 L 270 560 L 70 560 Z" {...reg(fills, onRegion, 'sphinx-body')} />
      {/* sphinx headdress */}
      <path d="M 100 478 L 110 430 Q 130 410 170 410 Q 210 410 220 432 L 224 478 Z" {...reg(fills, onRegion, 'sphinx-head')} />
      {/* sphinx face */}
      <ellipse cx="162" cy="464" rx="32" ry="22" {...reg(fills, onRegion, 'sphinx-face')} />
      <circle cx="152" cy="462" r="2.5" fill={STROKE} stroke="none" />
      <circle cx="172" cy="462" r="2.5" fill={STROKE} stroke="none" />
      <path d="M 154 475 Q 162 480 170 475" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* palm tree */}
      <path d="M 506 560 Q 510 460 522 380 Q 526 460 530 560 Z" {...reg(fills, onRegion, 'palm-trunk')} />
      <path d="M 520 380 Q 480 360 446 380 Q 478 388 520 396 Z" {...reg(fills, onRegion, 'palm-leaf-l')} />
      <path d="M 522 380 Q 564 358 596 380 Q 562 388 522 396 Z" {...reg(fills, onRegion, 'palm-leaf-r')} />
      <path d="M 522 376 Q 510 340 504 308 Q 520 332 528 376 Z" {...reg(fills, onRegion, 'palm-leaf-u')} />
      <path d="M 522 392 Q 496 416 484 440 Q 510 422 530 400 Z" {...reg(fills, onRegion, 'palm-leaf-d')} />
      {/* cartouche */}
      <rect x="300" y="510" width="120" height="48" rx="22" {...reg(fills, onRegion, 'cartouche')} />
      <text x="360" y="542" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="22" fontWeight="700" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>KHUFU</text>
    </svg>
  );
}

// ============================================================
// 5. STATUE OF LIBERTY
// ============================================================
function LibertySVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* small stars */}
      <StarShape cx={500} cy={80} size={14} id="star-1" fills={fills} onRegion={onRegion} />
      <StarShape cx={90} cy={110} size={12} id="star-2" fills={fills} onRegion={onRegion} />
      {/* cloud */}
      <path d="M 380 80 Q 380 60 400 60 Q 406 46 426 46 Q 446 46 450 60 Q 470 60 470 80 Z" {...reg(fills, onRegion, 'cloud')} />
      {/* water */}
      <path d="M 20 480 Q 80 470 140 480 Q 200 470 260 480 Q 320 470 380 480 Q 440 470 500 480 Q 560 470 580 480 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'water')} />
      {/* boat */}
      <path d="M 70 470 L 130 470 L 122 484 L 76 484 Z" {...reg(fills, onRegion, 'boat')} />
      <line x1="98" y1="470" x2="98" y2="446" stroke={STROKE} strokeWidth="2" />
      <path d="M 98 446 L 116 462 L 98 462 Z" fill={STROKE} stroke="none" />
      {/* pedestal */}
      <path d="M 230 480 L 370 480 L 360 380 L 240 380 Z" {...reg(fills, onRegion, 'pedestal')} />
      <rect x="252" y="406" width="96" height="50" rx="3" {...reg(fills, onRegion, 'pedestal-plaque')} />
      <text x="300" y="437" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="18" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>MDCCLXXVI</text>
      {/* robe */}
      <path d="M 220 380 Q 200 326 252 280 L 348 280 Q 400 326 380 380 Z" {...reg(fills, onRegion, 'robe-skirt')} />
      <path d="M 252 280 Q 240 240 268 220 L 332 220 Q 360 240 348 280 Z" {...reg(fills, onRegion, 'robe-top')} />
      {/* tablet (left arm holds it) */}
      <g style={alive ? { animation: 'gentle-bob 3s ease-in-out infinite' } : null}>
        <path d="M 188 296 L 252 268 L 252 332 L 188 360 Z" {...reg(fills, onRegion, 'tablet')} />
        <line x1="200" y1="304" x2="244" y2="288" stroke={STROKE} strokeWidth="1.4" />
        <line x1="200" y1="318" x2="244" y2="302" stroke={STROKE} strokeWidth="1.4" />
        <line x1="200" y1="332" x2="244" y2="316" stroke={STROKE} strokeWidth="1.4" />
      </g>
      {/* arm holding tablet */}
      <path d="M 248 240 Q 232 252 226 286 L 246 296 Q 256 268 264 252 Z" {...reg(fills, onRegion, 'arm-l')} />
      {/* torch arm (raised) */}
      <g style={alive ? { animation: 'gentle-bob 2.6s ease-in-out infinite' } : null}>
        <path d="M 332 220 L 358 156 L 384 132 L 396 142 L 372 168 L 354 232 Z" {...reg(fills, onRegion, 'arm-r')} />
        {/* torch handle */}
        <path d="M 372 132 L 408 92 L 422 102 L 386 142 Z" {...reg(fills, onRegion, 'torch-handle')} />
        {/* flame */}
        <g style={alive ? { animation: 'flame-flicker 0.6s ease-in-out infinite', transformOrigin: '414px 76px' } : null}>
          <path d="M 414 96 Q 392 76 408 50 Q 416 64 420 64 Q 424 50 422 38 Q 438 62 432 86 Q 426 96 414 96 Z" {...reg(fills, onRegion, 'flame')} />
        </g>
      </g>
      {/* face */}
      <ellipse cx="300" cy="194" rx="32" ry="38" {...reg(fills, onRegion, 'face')} />
      {/* hair */}
      <path d="M 268 192 Q 268 160 300 156 Q 332 160 332 192 Q 318 178 300 178 Q 282 178 268 192 Z" {...reg(fills, onRegion, 'hair')} />
      {/* face features */}
      <circle cx="290" cy="196" r="2.4" fill={STROKE} stroke="none" />
      <circle cx="310" cy="196" r="2.4" fill={STROKE} stroke="none" />
      <path d="M 294 218 Q 300 222 306 218" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* crown — 7 points */}
      <g>
        {[0,1,2,3,4,5,6].map(i => {
          const a = -Math.PI/2 + (i - 3) * 0.35;
          const cx = 300 + Math.sin((i-3)*0.5) * 38;
          const cy = 154 + Math.cos((i-3)*0.5) * -6;
          const tx = cx + Math.cos(a) * 36;
          const ty = cy + Math.sin(a) * 36;
          const lx = cx + Math.cos(a + Math.PI/2) * 9;
          const ly = cy + Math.sin(a + Math.PI/2) * 9;
          const rx = cx - Math.cos(a + Math.PI/2) * 9;
          const ry = cy - Math.sin(a + Math.PI/2) * 9;
          return <polygon key={i} points={`${lx},${ly} ${tx},${ty} ${rx},${ry}`} {...reg(fills, onRegion, `crown-${i}`)} />;
        })}
      </g>
    </svg>
  );
}

// ============================================================
// 6. PARTHENON — Ancient Greece
// ============================================================
function ParthenonSVG({ fills, onRegion, alive }) {
  const cols = [120, 196, 272, 348, 424, 500];
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '510px 100px' } : null}>
        <circle cx="510" cy="100" r="40" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds */}
      <path d="M 60 80 Q 60 60 82 60 Q 88 46 108 46 Q 128 46 132 60 Q 152 60 152 80 Z" {...reg(fills, onRegion, 'cloud-l')} />
      <path d="M 240 130 Q 240 114 258 114 Q 262 102 280 102 Q 298 102 302 114 Q 320 114 320 130 Z" {...reg(fills, onRegion, 'cloud-r')} />
      {/* hills */}
      <path d="M 20 460 Q 200 410 380 440 Q 480 422 580 460 L 580 500 L 20 500 Z" {...reg(fills, onRegion, 'hill-far')} />
      <path d="M 20 480 Q 160 450 320 490 Q 440 470 580 490 L 580 540 L 20 540 Z" {...reg(fills, onRegion, 'hill-near')} />
      {/* pediment (triangle roof) */}
      <polygon points="90,220 510,220 300,140" {...reg(fills, onRegion, 'pediment')} />
      {/* triangle inset (sculpture band) */}
      <polygon points="140,212 460,212 300,160" {...reg(fills, onRegion, 'pediment-relief')} />
      {/* entablature (band below) */}
      <rect x="80" y="220" width="440" height="36" {...reg(fills, onRegion, 'frieze')} />
      <rect x="80" y="256" width="440" height="22" {...reg(fills, onRegion, 'architrave')} />
      {/* triglyphs (small black blocks) — outline only */}
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x={108 + i * 60} y={226} width="14" height="24" fill={STROKE} stroke="none" />
      ))}
      {/* steps */}
      <rect x="60" y="468" width="480" height="20" {...reg(fills, onRegion, 'step-1')} />
      <rect x="46" y="488" width="508" height="22" {...reg(fills, onRegion, 'step-2')} />
      {/* columns */}
      {cols.map((x, i) => (
        <g key={i}>
          <rect x={x - 4} y="282" width="50" height="6" {...reg(fills, onRegion, `cap-${i}`)} />
          <rect x={x} y="288" width="42" height="180" {...reg(fills, onRegion, `col-${i}`)} />
          {/* flutes — non-colorable */}
          {Array.from({length:5}).map((_,k) => (
            <line key={k} x1={x + 5 + k*8} y1={290} x2={x + 5 + k*8} y2={466} stroke={STROKE} strokeWidth="1.2" />
          ))}
        </g>
      ))}
      {/* olive tree */}
      <path d="M 530 540 Q 532 480 522 420 Q 528 480 540 540 Z" {...reg(fills, onRegion, 'olive-trunk')} />
      <g style={alive ? { animation: 'wave-flag 3s ease-in-out infinite', transformOrigin: '530px 420px' } : null}>
        <ellipse cx="510" cy="408" rx="34" ry="22" {...reg(fills, onRegion, 'olive-leaf-l')} />
        <ellipse cx="556" cy="404" rx="32" ry="22" {...reg(fills, onRegion, 'olive-leaf-r')} />
        <ellipse cx="530" cy="378" rx="28" ry="22" {...reg(fills, onRegion, 'olive-leaf-t')} />
      </g>
      {/* sign */}
      <rect x="200" y="520" width="200" height="42" rx="6" {...reg(fills, onRegion, 'sign')} />
      <text x="300" y="548" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="22" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>ATHENS · 447 BC</text>
    </svg>
  );
}

// ============================================================
// PAGE METADATA + SPEECH/QUEST DATA
// ============================================================

// Helper to count colorable regions from a component by rendering once into a fake DOM.
// Instead we manually count — cheaper at runtime.

const PAGES_DATA = [
  {
    id: 'liberty-bell',
    title: 'The Liberty Bell',
    subtitle: 'Independence Hall, 1776',
    collection: 'us',
    eraLabel: 'American Revolution',
    eraColor: '#C8102E',
    bgPreview: '#FBE9D0',
    fact: "The Liberty Bell weighs over a ton and rang to announce big moments of freedom in America's earliest days.",
    Component: LibertyBellSVG,
    readingLevel: { lexile: 850, gradeBand: '4–5', guidedReading: 'P', wordCount: 32, complexity: 'Challenging' },
    keyVocab: ['liberty', 'equal', 'endowed', 'unalienable', 'self-evident'],
    standards: ['RI.4.4', 'RI.4.1', 'SL.4.2', 'L.4.4'],
    regions: ['sky','star-tl','star-tr','star-l','star-r','ground','yoke','post-l','post-r','crown','body','rim','foot','clapper','banner'],
    quest: {
      heading: 'Declaration of Independence',
      author: 'Thomas Jefferson · 1776',
      lines: [
        'We hold these truths to be {0},',
        'that all men are created {1},',
        'that they are endowed by their Creator',
        'with certain unalienable {2}.',
      ],
      blanks: [
        { answer: 'self-evident', choices: ['self-evident', 'silly', 'ancient', 'sleepy'] },
        { answer: 'equal',        choices: ['equal', 'royal', 'sneaky', 'famous'] },
        { answer: 'Rights',       choices: ['Rights', 'Snacks', 'Dragons', 'Recipes'] },
      ],
      voice: {
        hints: [/daniel/i, /alex/i, /tom/i, /aaron/i, /microsoft (guy|mark|davis)/i, /fred/i],
        rate: 0.82, pitch: 0.92,
      },
    },
  },
  {
    id: 'lincoln',
    title: 'President Lincoln',
    subtitle: 'Gettysburg, 1863',
    collection: 'us',
    eraLabel: 'Civil War',
    eraColor: '#1B4965',
    bgPreview: '#E5DCC9',
    fact: "Abraham Lincoln gave the Gettysburg Address in just over two minutes — but its 272 words changed how we think about the country.",
    Component: LincolnSVG,
    readingLevel: { lexile: 760, gradeBand: '3–4', guidedReading: 'N', wordCount: 35, complexity: 'Moderate' },
    keyVocab: ['score', 'continent', 'conceived', 'proposition', 'dedicated'],
    standards: ['RI.3.4', 'RI.4.1', 'SL.3.2', 'L.3.4'],
    regions: ['sky','star-1','star-2','star-3','star-4','plaque','coat','lapel-l','lapel-r','shirt','bowtie','neck','face','hair-l','hair-r','beard','hat-brim','hat-top','hat-band'],
    quest: {
      heading: 'The Gettysburg Address',
      author: 'Abraham Lincoln · 1863',
      lines: [
        'Four score and seven {0} ago',
        'our fathers brought forth on this continent,',
        'a new {1}, conceived in Liberty,',
        'and dedicated to the proposition that all',
        'men are created {2}.',
      ],
      blanks: [
        { answer: 'years',  choices: ['years', 'pizzas', 'hours', 'songs'] },
        { answer: 'nation', choices: ['nation', 'puppy', 'bakery', 'forest'] },
        { answer: 'equal',  choices: ['equal', 'tired', 'silly', 'orange'] },
      ],
      voice: {
        // Slow, deeper, deliberate — closer to a thoughtful older orator
        hints: [/daniel/i, /bruce/i, /tom/i, /aaron/i, /alex/i, /fred/i, /reed/i, /microsoft (mark|guy|davis)/i],
        rate: 0.72, pitch: 0.78,
      },
    },
  },
  {
    id: 'mlk',
    title: 'Dr. Martin Luther King Jr.',
    subtitle: 'Lincoln Memorial, 1963',
    collection: 'us',
    eraLabel: 'Civil Rights',
    eraColor: '#7A1A78',
    bgPreview: '#FFE9B8',
    fact: "Dr. King spoke to about 250,000 people on the steps of the Lincoln Memorial during the March on Washington.",
    Component: MLKSVG,
    readingLevel: { lexile: 700, gradeBand: '3–4', guidedReading: 'M', wordCount: 30, complexity: 'Moderate' },
    keyVocab: ['dream', 'creed', 'meaning', 'rise'],
    standards: ['RI.3.4', 'RI.3.1', 'SL.3.2'],
    regions: ['sky','sun','cloud-l','cloud-r','crowd','podium','podium-seal','mic-head','suit','lapel-l','lapel-r','shirt','tie','neck','face','hair'],
    quest: {
      heading: '"I Have a Dream"',
      author: 'Dr. Martin Luther King Jr. · 1963',
      lines: [
        'I have a {0} that one day',
        'this {1} will rise up',
        'and live out the true meaning of its creed:',
        '"all men are created {2}."',
      ],
      blanks: [
        { answer: 'dream',  choices: ['dream', 'sandwich', 'puppy', 'wagon'] },
        { answer: 'nation', choices: ['nation', 'kitchen', 'planet', 'school'] },
        { answer: 'equal',  choices: ['equal', 'ticklish', 'shiny', 'tall'] },
      ],
      voice: {
        // Resonant, hopeful — measured pace with warmth
        hints: [/aaron/i, /daniel/i, /reed/i, /tom/i, /alex/i, /microsoft (guy|mark|davis)/i],
        rate: 0.78, pitch: 0.86,
      },
    },
  },
  {
    id: 'pyramid',
    title: 'The Great Pyramid',
    subtitle: 'Giza, Ancient Egypt',
    collection: 'world',
    eraLabel: 'Ancient Egypt',
    eraColor: '#C58D2A',
    bgPreview: '#F6DEB0',
    fact: "The Great Pyramid was built about 4,500 years ago and stayed the tallest building on Earth for nearly 4,000 years.",
    Component: PyramidSVG,
    readingLevel: { lexile: 580, gradeBand: '2–3', guidedReading: 'K', wordCount: 24, complexity: 'Easy' },
    keyVocab: ['pyramid', 'pharaoh', 'desert', 'peak'],
    standards: ['RI.2.4', 'RI.2.1', 'RI.3.7'],
    regions: ['sky','sun','cloud','pyramid-small-l','pyramid-small-r','pyramid-shade','pyramid-light','sand','sphinx-body','sphinx-head','sphinx-face','palm-trunk','palm-leaf-l','palm-leaf-r','palm-leaf-u','palm-leaf-d','cartouche'],
    quest: {
      heading: 'A Pharaoh\u2019s Riddle',
      author: 'Ancient Egypt · c. 2560 BC',
      lines: [
        'I am the Great Pyramid, built for Pharaoh {0}.',
        'My stones were dragged across the desert {1}.',
        'I point my peak toward the shining {2}.',
      ],
      blanks: [
        { answer: 'Khufu', choices: ['Khufu', 'Caesar', 'Lincoln', 'Napoleon'] },
        { answer: 'sand',  choices: ['sand', 'snow', 'rain', 'jelly'] },
        { answer: 'sun',   choices: ['sun', 'moon', 'cloud', 'fish'] },
      ],
      voice: {
        // Deep, slow, mysterious — the pyramid speaking
        hints: [/bruce/i, /daniel/i, /tom/i, /fred/i, /albert/i, /microsoft mark/i],
        rate: 0.72, pitch: 0.72,
      },
    },
  },
  {
    id: 'liberty',
    title: 'Statue of Liberty',
    subtitle: 'New York Harbor, 1886',
    collection: 'us',
    eraLabel: 'Gilded Age',
    eraColor: '#2A9D8F',
    bgPreview: '#CFEAE3',
    fact: "Lady Liberty was a gift from France. Her tablet says JULY IV MDCCLXXVI — that's July 4, 1776 in Roman numerals!",
    Component: LibertySVG,
    readingLevel: { lexile: 740, gradeBand: '3–4', guidedReading: 'N', wordCount: 16, complexity: 'Moderate' },
    keyVocab: ['huddled', 'masses', 'yearning', 'colossus'],
    standards: ['RL.3.4', 'RL.4.1', 'SL.3.2', 'L.4.4'],
    regions: ['sky','star-1','star-2','cloud','water','boat','pedestal','pedestal-plaque','robe-skirt','robe-top','tablet','arm-l','arm-r','torch-handle','flame','face','hair','crown-0','crown-1','crown-2','crown-3','crown-4','crown-5','crown-6'],
    quest: {
      heading: '"The New Colossus"',
      author: 'Emma Lazarus · 1883',
      lines: [
        'Give me your {0}, your poor,',
        'your huddled {1}',
        'yearning to breathe {2}.',
      ],
      blanks: [
        { answer: 'tired',  choices: ['tired', 'fluffy', 'tiny', 'noisy'] },
        { answer: 'masses', choices: ['masses', 'muffins', 'turtles', 'pillows'] },
        { answer: 'free',   choices: ['free', 'fast', 'fancy', 'frosty'] },
      ],
      voice: {
        // Warm female voice — Emma Lazarus's poem
        hints: [/samantha/i, /ava/i, /allison/i, /karen/i, /microsoft (aria|jenny|zira)/i, /susan/i],
        rate: 0.84, pitch: 1.06,
      },
    },
  },
  {
    id: 'parthenon',
    title: 'The Parthenon',
    subtitle: 'Acropolis of Athens',
    collection: 'world',
    eraLabel: 'Ancient Greece',
    eraColor: '#3D5A80',
    bgPreview: '#E2E4D6',
    fact: "The Parthenon was built atop a rocky hill called the Acropolis to honor Athena, the goddess Athens is named for.",
    Component: ParthenonSVG,
    readingLevel: { lexile: 620, gradeBand: '2–3', guidedReading: 'K', wordCount: 22, complexity: 'Easy' },
    keyVocab: ['Acropolis', 'goddess', 'protector'],
    standards: ['RI.2.4', 'RI.3.1', 'RI.3.7'],
    regions: ['sky','sun','cloud-l','cloud-r','hill-far','hill-near','pediment','pediment-relief','frieze','architrave','step-1','step-2','olive-trunk','olive-leaf-l','olive-leaf-r','olive-leaf-t','sign','cap-0','cap-1','cap-2','cap-3','cap-4','cap-5','col-0','col-1','col-2','col-3','col-4','col-5'],
    quest: {
      heading: 'A Greek Riddle',
      author: 'Ancient Athens · 447 BC',
      lines: [
        'I stand atop the rocky {0}.',
        'I was built for the goddess {1},',
        'the protector of the city of {2}.',
      ],
      blanks: [
        { answer: 'Acropolis', choices: ['Acropolis', 'Bakery', 'Beach', 'Lighthouse'] },
        { answer: 'Athena',    choices: ['Athena', 'Mercury', 'Cleo', 'Medusa'] },
        { answer: 'Athens',    choices: ['Athens', 'Rome', 'Paris', 'Sparta'] },
      ],
      voice: {
        // Stately, slightly oracular female — temple speaking
        hints: [/karen/i, /samantha/i, /ava/i, /allison/i, /microsoft (aria|jenny|zira)/i, /susan/i],
        rate: 0.82, pitch: 0.98,
      },
    },
  },
];

// ============================================================
// Crayon palette
// ============================================================
const CRAYONS = [
  { name: 'Cherry',   hex: '#E63946' },
  { name: 'Orange',   hex: '#F77F00' },
  { name: 'Sunshine', hex: '#FFC857' },
  { name: 'Spring',   hex: '#90BE6D' },
  { name: 'Forest',   hex: '#2D6A4F' },
  { name: 'Sea',      hex: '#48BFE3' },
  { name: 'Sky',      hex: '#4361EE' },
  { name: 'Royal',    hex: '#3A0CA3' },
  { name: 'Plum',     hex: '#7209B7' },
  { name: 'Bubblegum',hex: '#F4A6BC' },
  { name: 'Sand',     hex: '#E0C9A6' },
  { name: 'Caramel',  hex: '#C9824C' },
  { name: 'Cocoa',    hex: '#7B4B25' },
  { name: 'Slate',    hex: '#4A5568' },
  { name: 'Ink',      hex: '#1B1B1B' },
  { name: 'Cloud',    hex: '#FFFFFF' }, // eraser
];

// Theme presets — used to flip CSS vars on the root container
const THEMES = {
  'warm-classroom': {
    label: 'Warm Classroom',
    vars: {
      '--paper': '#F6EFE0', '--paper-2': '#ECE2CC', '--ink': '#1F2933',
      '--ink-soft': '#4A5568', '--rule': '#D6C9AC',
      '--accent': '#C8102E', '--accent-2': '#1B4965', '--accent-3': '#E8A33D',
      '--bg-app': '#2C2418',
    }
  },
  'bright-playful': {
    label: 'Bright & Playful',
    vars: {
      '--paper': '#FFFDF5', '--paper-2': '#FFF3DD', '--ink': '#222244',
      '--ink-soft': '#5A5A88', '--rule': '#FFD9A8',
      '--accent': '#FF5A5F', '--accent-2': '#4361EE', '--accent-3': '#FFD23F',
      '--bg-app': '#FFC2C9',
    }
  },
  'parchment-museum': {
    label: 'Parchment Museum',
    vars: {
      '--paper': '#EFE3C8', '--paper-2': '#E1D2AE', '--ink': '#3A2A14',
      '--ink-soft': '#6A553B', '--rule': '#C1A875',
      '--accent': '#7A2018', '--accent-2': '#3D5A80', '--accent-3': '#B07B2A',
      '--bg-app': '#1E1610',
    }
  },
};

Object.assign(window, { PAGES_DATA, CRAYONS, THEMES, STROKE, StarShape, reg });
