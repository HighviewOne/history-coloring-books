// =================================================================
// Next-set additions — 4 more pages filling major gaps:
//   • Lascaux Cave Paintings (Prehistoric France, c. 17,000 BC)
//   • Persepolis (Persian Empire, c. 500 BC)
//   • Angkor Wat (Khmer Empire, c. 1150)
//   • Moai of Easter Island (Rapa Nui)
// =================================================================

// ----- 51. LASCAUX CAVE PAINTINGS — c. 17,000 BC -----
function LascauxSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* cave wall background — ochre rock */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'wall')} />
      {/* rock-grain texture — non-colorable streaks */}
      <path d="M 40 60 Q 200 80 380 64 Q 480 56 560 76" fill="none" stroke={STROKE} strokeWidth="1" opacity="0.3" />
      <path d="M 40 130 Q 200 150 380 134 Q 480 126 560 146" fill="none" stroke={STROKE} strokeWidth="1" opacity="0.3" />
      <path d="M 40 460 Q 200 480 380 464 Q 480 456 560 476" fill="none" stroke={STROKE} strokeWidth="1" opacity="0.3" />
      {/* random cracks */}
      <path d="M 80 80 L 110 130 L 96 180" fill="none" stroke={STROKE} strokeWidth="1.2" opacity="0.45" />
      <path d="M 520 100 L 540 160 L 510 220" fill="none" stroke={STROKE} strokeWidth="1.2" opacity="0.45" />
      <path d="M 480 380 L 530 420" fill="none" stroke={STROKE} strokeWidth="1.2" opacity="0.45" />

      {/* dark cave opening at edges */}
      <path d="M 20 20 L 20 580 L 80 580 Q 50 300 80 20 Z" {...reg(fills, onRegion, 'cave-dark-l')} />
      <path d="M 580 20 L 580 580 L 520 580 Q 550 300 520 20 Z" {...reg(fills, onRegion, 'cave-dark-r')} />

      {/* ---- AUROCH BULL — large central figure ---- */}
      {/* body */}
      <path d="M 160 250 Q 160 200 240 196 L 380 196 Q 440 200 440 250 L 440 320 Q 420 340 360 336 L 240 336 Q 180 340 160 320 Z" {...reg(fills, onRegion, 'bull-body')} />
      {/* belly/leg seam */}
      <path d="M 180 332 Q 300 348 420 332" fill="none" stroke={STROKE} strokeWidth="1.4" />
      {/* legs */}
      <rect x="200" y="332" width="14" height="68" {...reg(fills, onRegion, 'bull-leg-fl')} />
      <rect x="226" y="332" width="14" height="68" {...reg(fills, onRegion, 'bull-leg-fr')} />
      <rect x="360" y="332" width="14" height="68" {...reg(fills, onRegion, 'bull-leg-bl')} />
      <rect x="386" y="332" width="14" height="68" {...reg(fills, onRegion, 'bull-leg-br')} />
      {/* head — large, lowered */}
      <path d="M 440 280 Q 470 270 500 244 Q 514 240 524 248 Q 514 280 494 296 L 468 320 Q 444 326 440 320 Z" {...reg(fills, onRegion, 'bull-head')} />
      {/* horns — long curving */}
      <path d="M 504 244 Q 528 220 542 192 Q 550 186 552 196 Q 548 220 532 246 Z" {...reg(fills, onRegion, 'bull-horn-l')} />
      <path d="M 488 248 Q 480 220 472 188 Q 478 184 484 192 Q 490 220 498 246 Z" {...reg(fills, onRegion, 'bull-horn-r')} />
      {/* eye, nostril */}
      <circle cx="500" cy="280" r="2.4" fill={STROKE} stroke="none" />
      <circle cx="518" cy="294" r="2" fill={STROKE} stroke="none" />
      {/* tail */}
      <path d="M 160 280 Q 132 280 124 304 Q 122 322 134 322 Q 144 308 154 300 Q 162 296 168 296 Z" {...reg(fills, onRegion, 'bull-tail')} />
      {/* spotted markings on body — non-colorable dots */}
      {[[220,240],[260,232],[310,236],[280,260],[330,270],[360,250],[400,260],[260,300],[320,300],[380,290]].map((p,i)=>(
        <circle key={`bs-${i}`} cx={p[0]} cy={p[1]} r="2.4" fill={STROKE} stroke="none" opacity="0.55" />
      ))}

      {/* ---- HORSE (small, behind) ---- */}
      <g transform="translate(80, 380)">
        <path d="M 0 0 Q 0 -20 30 -22 L 100 -22 Q 130 -20 130 0 L 130 30 Q 120 40 100 38 L 30 38 Q 10 40 0 30 Z" {...reg(fills, onRegion, 'horse-body')} />
        <rect x="20" y="30" width="8" height="34" {...reg(fills, onRegion, 'horse-leg-fl')} />
        <rect x="34" y="30" width="8" height="34" {...reg(fills, onRegion, 'horse-leg-fr')} />
        <rect x="92" y="30" width="8" height="34" {...reg(fills, onRegion, 'horse-leg-bl')} />
        <rect x="106" y="30" width="8" height="34" {...reg(fills, onRegion, 'horse-leg-br')} />
        {/* head & neck */}
        <path d="M 0 -10 Q -22 -14 -38 -36 Q -30 -38 -16 -28 Q -2 -22 4 -16 Z" {...reg(fills, onRegion, 'horse-head')} />
        {/* mane */}
        <path d="M 4 -20 Q 8 -36 22 -36 Q 18 -22 10 -14 Z" {...reg(fills, onRegion, 'horse-mane')} />
        <circle cx="-26" cy="-26" r="1.6" fill={STROKE} stroke="none" />
        {/* tail */}
        <path d="M 130 -4 Q 148 -8 152 14 Q 144 24 138 12 Z" {...reg(fills, onRegion, 'horse-tail')} />
      </g>

      {/* ---- DEER (with antlers, upper-right) ---- */}
      <g transform="translate(420, 100)">
        <path d="M 0 0 Q 0 -16 24 -18 L 80 -18 Q 100 -16 100 0 L 100 24 Q 90 30 76 30 L 24 30 Q 8 30 0 24 Z" {...reg(fills, onRegion, 'deer-body')} />
        <rect x="14" y="24" width="6" height="28" {...reg(fills, onRegion, 'deer-leg-fl')} />
        <rect x="26" y="24" width="6" height="28" {...reg(fills, onRegion, 'deer-leg-fr')} />
        <rect x="76" y="24" width="6" height="28" {...reg(fills, onRegion, 'deer-leg-bl')} />
        <rect x="88" y="24" width="6" height="28" {...reg(fills, onRegion, 'deer-leg-br')} />
        {/* neck up to head */}
        <path d="M 0 -4 Q -20 -20 -22 -42 L -10 -42 Q -4 -22 6 -10 Z" {...reg(fills, onRegion, 'deer-neck')} />
        <ellipse cx="-22" cy="-46" rx="10" ry="6" {...reg(fills, onRegion, 'deer-head')} />
        {/* antlers — branching */}
        <path d="M -24 -52 L -28 -64 L -32 -70 M -28 -64 L -22 -68 M -28 -64 L -34 -62" stroke={STROKE} strokeWidth="2" fill="none" />
        <path d="M -18 -52 L -14 -66 L -10 -72 M -14 -66 L -20 -70 M -14 -66 L -8 -64" stroke={STROKE} strokeWidth="2" fill="none" />
        <circle cx="-26" cy="-46" r="1.4" fill={STROKE} stroke="none" />
      </g>

      {/* ---- STICK FIGURE HUNTER (lower-right) ---- */}
      <g transform="translate(380, 420)">
        <circle cx="0" cy="0" r="9" fill="none" stroke={STROKE} strokeWidth="3" />
        <line x1="0" y1="9" x2="0" y2="50" stroke={STROKE} strokeWidth="3" />
        <line x1="0" y1="22" x2="-16" y2="36" stroke={STROKE} strokeWidth="3" />
        <line x1="0" y1="22" x2="22" y2="14" stroke={STROKE} strokeWidth="3" />
        <line x1="0" y1="50" x2="-12" y2="80" stroke={STROKE} strokeWidth="3" />
        <line x1="0" y1="50" x2="14" y2="82" stroke={STROKE} strokeWidth="3" />
        {/* spear in hand */}
        <line x1="22" y1="14" x2="56" y2="-12" stroke={STROKE} strokeWidth="3" />
        <path d="M 56 -12 L 64 -22 L 60 -8 Z" fill={STROKE} stroke="none" />
      </g>

      {/* hand stencils (negative-space outlines, top-left) */}
      <g fill="none" stroke={STROKE} strokeWidth="3">
        <path d="M 120 90 Q 116 100 122 110 L 122 130 Q 124 138 132 138 Q 138 138 138 130 L 138 116 Q 140 124 148 124 Q 152 124 154 116 L 154 100 Q 156 108 162 108 Q 168 108 168 100 L 168 88 Q 168 76 158 76 L 150 76 Q 144 70 140 76 L 132 78 Q 124 80 120 90 Z" />
        <path d="M 168 156 Q 164 166 170 176 L 170 196 Q 172 204 180 204 Q 186 204 186 196 L 186 182 Q 188 190 196 190 Q 200 190 202 182 L 202 166 Q 204 174 210 174 Q 216 174 216 166 L 216 154 Q 216 142 206 142 L 198 142 Q 192 136 188 142 L 180 144 Q 172 146 168 156 Z" />
      </g>

      {/* torch flame in foreground corner */}
      <line x1="60" y1="540" x2="80" y2="500" stroke={STROKE} strokeWidth="4" />
      <g style={alive ? { animation: 'flame-flicker 0.6s ease-in-out infinite', transformOrigin: '80px 490px' } : null}>
        <path d="M 70 500 Q 60 480 78 460 Q 84 470 84 478 Q 90 466 94 478 Q 96 488 88 500 Z" {...reg(fills, onRegion, 'flame')} />
      </g>

      {/* dots / arrows on bull (cave-painting symbol) */}
      <g fill="none" stroke={STROKE} strokeWidth="2">
        <path d="M 240 180 L 232 168 L 244 168 Z" />
        <path d="M 280 184 L 272 170 L 286 170 Z" />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>LASCAUX · c. 17,000 BC</text>
    </svg>
  );
}

// ----- 52. PERSEPOLIS — Persian Empire, c. 500 BC -----
function PersepolisSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun (Faravahar disc) */}
      <g style={alive ? { animation: 'sun-pulse 2.6s ease-in-out infinite', transformOrigin: '300px 100px' } : null}>
        <circle cx="300" cy="100" r="36" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* sun wings (stylized Faravahar) */}
      <path d="M 264 100 Q 240 96 220 110 Q 240 108 264 116 Z" {...reg(fills, onRegion, 'sun-wing-l')} />
      <path d="M 336 100 Q 360 96 380 110 Q 360 108 336 116 Z" {...reg(fills, onRegion, 'sun-wing-r')} />

      {/* distant mountains (Mount Rahmat behind) */}
      <path d="M 20 320 Q 100 240 200 300 Q 300 250 400 300 Q 500 260 580 320 L 580 360 L 20 360 Z" {...reg(fills, onRegion, 'mountains')} />

      {/* cypress trees flanking */}
      <path d="M 64 480 Q 70 380 60 296 Q 78 380 86 480 Z" {...reg(fills, onRegion, 'cypress-l')} />
      <path d="M 524 480 Q 530 380 520 296 Q 538 380 546 480 Z" {...reg(fills, onRegion, 'cypress-r')} />

      {/* ---- terrace platform ---- */}
      <rect x="60" y="450" width="480" height="30" {...reg(fills, onRegion, 'terrace')} />
      <line x1="60" y1="470" x2="540" y2="470" stroke={STROKE} strokeWidth="1.2" />
      {/* staircase rising from front (with bas-relief panel) */}
      <path d="M 240 450 L 360 450 L 380 500 L 220 500 Z" {...reg(fills, onRegion, 'stairs')} />
      {/* step lines */}
      {[460,470,480,490].map((y,i) => (
        <line key={`ss-${i}`} x1={228 - (y-450)*0.4} y1={y} x2={372 + (y-450)*0.4} y2={y} stroke={STROKE} strokeWidth="1.2" />
      ))}
      {/* bas-relief tribute procession on stair side (tiny standing figures) */}
      <rect x="80" y="468" width="140" height="22" {...reg(fills, onRegion, 'relief-l')} />
      <rect x="380" y="468" width="140" height="22" {...reg(fills, onRegion, 'relief-r')} />
      {/* procession figures — non-colorable silhouettes */}
      {[88,104,120,136,152,168,184,200].map((x,i) => (
        <g key={`fL-${i}`} fill={STROKE} stroke="none">
          <circle cx={x} cy="475" r="1.8" />
          <rect x={x-2} y="476" width="4" height="10" />
          <line x1={x} y1="486" x2={x-2} y2="490" stroke={STROKE} strokeWidth="1" />
          <line x1={x} y1="486" x2={x+2} y2="490" stroke={STROKE} strokeWidth="1" />
        </g>
      ))}
      {[388,404,420,436,452,468,484,500].map((x,i) => (
        <g key={`fR-${i}`} fill={STROKE} stroke="none">
          <circle cx={x} cy="475" r="1.8" />
          <rect x={x-2} y="476" width="4" height="10" />
          <line x1={x} y1="486" x2={x-2} y2="490" stroke={STROKE} strokeWidth="1" />
          <line x1={x} y1="486" x2={x+2} y2="490" stroke={STROKE} strokeWidth="1" />
        </g>
      ))}

      {/* ---- Tall fluted columns (Apadana style) — 5 visible ---- */}
      {[100, 200, 300, 400, 500].map((x, i) => (
        <g key={`col-${i}`}>
          {/* base */}
          <rect x={x - 18} y="430" width="36" height="20" {...reg(fills, onRegion, `col-base-${i}`)} />
          {/* shaft */}
          <rect x={x - 12} y="200" width="24" height="230" {...reg(fills, onRegion, `col-shaft-${i}`)} />
          {/* fluting lines */}
          <line x1={x - 8} y1="208" x2={x - 8} y2="426" stroke={STROKE} strokeWidth="1" />
          <line x1={x - 4} y1="208" x2={x - 4} y2="426" stroke={STROKE} strokeWidth="1" />
          <line x1={x} y1="208" x2={x} y2="426" stroke={STROKE} strokeWidth="1" />
          <line x1={x + 4} y1="208" x2={x + 4} y2="426" stroke={STROKE} strokeWidth="1" />
          <line x1={x + 8} y1="208" x2={x + 8} y2="426" stroke={STROKE} strokeWidth="1" />
          {/* double-bull capital */}
          <rect x={x - 20} y="180" width="40" height="22" {...reg(fills, onRegion, `col-capital-${i}`)} />
          {/* twin bulls back-to-back on top */}
          <g>
            {/* left bull torso */}
            <path d={`M ${x - 22} 168 L ${x - 4} 168 L ${x - 4} 184 L ${x - 22} 184 Z`} {...reg(fills, onRegion, `bull-l-${i}`)} />
            <path d={`M ${x - 22} 168 L ${x - 28} 162 L ${x - 28} 174 L ${x - 22} 178 Z`} {...reg(fills, onRegion, `bull-l-head-${i}`)} />
            {/* horn */}
            <path d={`M ${x - 26} 162 L ${x - 24} 154 L ${x - 22} 162 Z`} fill={STROKE} stroke="none" />
            {/* right bull */}
            <path d={`M ${x + 4} 168 L ${x + 22} 168 L ${x + 22} 184 L ${x + 4} 184 Z`} {...reg(fills, onRegion, `bull-r-${i}`)} />
            <path d={`M ${x + 22} 168 L ${x + 28} 162 L ${x + 28} 174 L ${x + 22} 178 Z`} {...reg(fills, onRegion, `bull-r-head-${i}`)} />
            <path d={`M ${x + 26} 162 L ${x + 24} 154 L ${x + 22} 162 Z`} fill={STROKE} stroke="none" />
            {/* eye dots */}
            <circle cx={x - 26} cy="168" r="1" fill={STROKE} stroke="none" />
            <circle cx={x + 26} cy="168" r="1" fill={STROKE} stroke="none" />
          </g>
        </g>
      ))}

      {/* ---- Lamassu (winged-bull guardian) on the right side ---- */}
      <g style={alive ? { animation: 'glow-pulse 3s ease-in-out infinite' } : null}>
        {/* body */}
        <path d="M 432 450 L 432 360 Q 440 348 460 348 L 484 348 Q 496 358 496 372 L 496 450 Z" {...reg(fills, onRegion, 'lamassu-body')} />
        {/* head — human face on bull */}
        <ellipse cx="446" cy="338" rx="14" ry="14" {...reg(fills, onRegion, 'lamassu-head')} />
        {/* beard (square Persian style) */}
        <rect x="438" y="340" width="16" height="20" {...reg(fills, onRegion, 'lamassu-beard')} />
        {[342,346,350,354].map((y,i) => (
          <line key={`lb-${i}`} x1="438" y1={y} x2="454" y2={y} stroke={STROKE} strokeWidth="0.8" />
        ))}
        {/* hair / headdress */}
        <path d="M 432 332 Q 432 320 446 318 Q 460 320 462 332 Z" {...reg(fills, onRegion, 'lamassu-crown')} />
        {/* eye */}
        <circle cx="442" cy="336" r="1.4" fill={STROKE} stroke="none" />
        <circle cx="450" cy="336" r="1.4" fill={STROKE} stroke="none" />
        {/* wing folded along back */}
        <path d="M 496 360 Q 530 350 540 380 Q 530 400 504 390 Z" {...reg(fills, onRegion, 'lamassu-wing')} />
        {/* wing feather lines */}
        <path d="M 502 372 L 524 366 M 504 380 L 528 376 M 506 386 L 526 386" stroke={STROKE} strokeWidth="1" fill="none" />
      </g>

      {/* ---- bas-relief tribute figure climbing stairs (single colorable figure) ---- */}
      <g transform="translate(300, 460)">
        <ellipse cx="0" cy="-10" rx="6" ry="9" {...reg(fills, onRegion, 'figure-body')} />
        <circle cx="0" cy="-22" r="5" {...reg(fills, onRegion, 'figure-head')} />
        <rect x="-6" y="-2" width="12" height="22" {...reg(fills, onRegion, 'figure-robe')} />
        {/* tribute bowl */}
        <ellipse cx="-12" cy="-12" rx="5" ry="2" {...reg(fills, onRegion, 'figure-bowl')} />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>PERSEPOLIS · c. 500 BC</text>
    </svg>
  );
}

// ----- 53. ANGKOR WAT — Khmer Empire, c. 1150 -----
function AngkorWatSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.6s ease-in-out infinite', transformOrigin: '110px 100px' } : null}>
        <circle cx="110" cy="100" r="34" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds */}
      <path d="M 380 90 Q 380 70 402 70 Q 408 56 428 56 Q 448 56 452 70 Q 472 70 472 90 Z" {...reg(fills, onRegion, 'cloud')} />

      {/* dense jungle behind */}
      <path d="M 20 320 Q 60 260 100 320 Q 140 250 180 320 Q 220 260 260 320 Q 300 250 340 320 Q 380 260 420 320 Q 460 250 500 320 Q 540 260 580 320 L 580 380 L 20 380 Z" {...reg(fills, onRegion, 'jungle')} />

      {/* ---- ANGKOR WAT — 5 lotus-bud towers ---- */}
      {/* outer galleries / base */}
      <rect x="60" y="380" width="480" height="60" {...reg(fills, onRegion, 'gallery')} />
      {/* gallery doorways */}
      {[100,180,260,340,420,500].map((x,i) => (
        <path key={`gd-${i}`} d={`M ${x-12} 440 L ${x+12} 440 L ${x+12} 408 Q ${x} 396 ${x-12} 408 Z`} {...reg(fills, onRegion, `gallery-door-${i}`)} />
      ))}
      {/* gallery roof lines */}
      <rect x="50" y="372" width="500" height="14" {...reg(fills, onRegion, 'gallery-roof')} />

      {/* corner towers (4) — smaller */}
      {[
        { x: 110, top: 240 },
        { x: 230, top: 252 },
        { x: 370, top: 252 },
        { x: 490, top: 240 },
      ].map((t, i) => (
        <g key={`tower-${i}`}>
          {/* tower base square */}
          <rect x={t.x - 26} y={t.top + 80} width="52" height="92" {...reg(fills, onRegion, `tower-base-${i}`)} />
          {/* tower stepped tiers */}
          <rect x={t.x - 30} y={t.top + 60} width="60" height="20" {...reg(fills, onRegion, `tower-tier-${i}-a`)} />
          <rect x={t.x - 26} y={t.top + 40} width="52" height="20" {...reg(fills, onRegion, `tower-tier-${i}-b`)} />
          <rect x={t.x - 22} y={t.top + 20} width="44" height="20" {...reg(fills, onRegion, `tower-tier-${i}-c`)} />
          {/* lotus-bud spire */}
          <path d={`M ${t.x - 22} ${t.top + 20} Q ${t.x - 20} ${t.top - 16} ${t.x} ${t.top - 24} Q ${t.x + 20} ${t.top - 16} ${t.x + 22} ${t.top + 20} Z`} {...reg(fills, onRegion, `tower-spire-${i}`)} />
          <line x1={t.x} y1={t.top - 24} x2={t.x} y2={t.top - 36} stroke={STROKE} strokeWidth="2" />
          <circle cx={t.x} cy={t.top - 36} r="2.4" fill={STROKE} stroke="none" />
          {/* spire grooves */}
          <line x1={t.x - 18} y1={t.top} x2={t.x - 12} y2={t.top - 16} stroke={STROKE} strokeWidth="1" />
          <line x1={t.x + 18} y1={t.top} x2={t.x + 12} y2={t.top - 16} stroke={STROKE} strokeWidth="1" />
        </g>
      ))}

      {/* CENTER MAIN TOWER (tallest) */}
      <g>
        <rect x="270" y="310" width="60" height="80" {...reg(fills, onRegion, 'main-tower-base')} />
        <rect x="266" y="290" width="68" height="20" {...reg(fills, onRegion, 'main-tier-a')} />
        <rect x="270" y="270" width="60" height="20" {...reg(fills, onRegion, 'main-tier-b')} />
        <rect x="276" y="246" width="48" height="24" {...reg(fills, onRegion, 'main-tier-c')} />
        {/* main spire — tall lotus-bud */}
        <path d="M 276 246 Q 280 180 300 168 Q 320 180 324 246 Z" {...reg(fills, onRegion, 'main-spire')} />
        <line x1="300" y1="168" x2="300" y2="148" stroke={STROKE} strokeWidth="3" />
        <circle cx="300" cy="148" r="4" fill={STROKE} stroke="none" />
        {/* groove lines on main spire */}
        <line x1="284" y1="220" x2="290" y2="196" stroke={STROKE} strokeWidth="1.2" />
        <line x1="316" y1="220" x2="310" y2="196" stroke={STROKE} strokeWidth="1.2" />
        {/* doorway in main tower */}
        <path d="M 286 390 L 314 390 L 314 350 Q 300 340 286 350 Z" {...reg(fills, onRegion, 'main-door')} />
      </g>

      {/* causeway (bridge across the moat, foreground) */}
      <rect x="260" y="440" width="80" height="24" {...reg(fills, onRegion, 'causeway')} />
      <line x1="260" y1="452" x2="340" y2="452" stroke={STROKE} strokeWidth="1.4" />

      {/* moat (water) */}
      <path d="M 20 464 L 240 464 L 240 480 L 20 480 Z" {...reg(fills, onRegion, 'moat-l')} />
      <path d="M 360 464 L 580 464 L 580 480 L 360 480 Z" {...reg(fills, onRegion, 'moat-r')} />
      {/* moat ripples */}
      <path d="M 60 472 Q 90 468 120 472" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 460 472 Q 490 468 520 472" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* naga (serpent) balustrade — heads at end of causeway */}
      <g style={alive ? { animation: 'gentle-bob 2.6s ease-in-out infinite' } : null}>
        <path d="M 240 460 Q 230 450 226 438 Q 234 432 244 442 Z" {...reg(fills, onRegion, 'naga-l-head')} />
        <path d="M 360 460 Q 370 450 374 438 Q 366 432 356 442 Z" {...reg(fills, onRegion, 'naga-r-head')} />
        {/* multiple naga hoods — fan of 5 small triangles */}
        <path d="M 226 438 L 220 426 L 230 428 L 224 416 L 234 422 L 230 408" fill="none" stroke={STROKE} strokeWidth="1.6" />
        <path d="M 374 438 L 380 426 L 370 428 L 376 416 L 366 422 L 370 408" fill="none" stroke={STROKE} strokeWidth="1.6" />
      </g>

      {/* near grass bank */}
      <path d="M 20 480 L 580 480 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'grass')} />

      {/* lotus flowers on moat */}
      <g>
        <ellipse cx="100" cy="472" rx="8" ry="3" {...reg(fills, onRegion, 'lily-pad-1')} />
        <path d="M 96 472 Q 96 462 100 460 Q 104 462 104 472 Z" {...reg(fills, onRegion, 'lotus-1')} />
        <ellipse cx="500" cy="472" rx="8" ry="3" {...reg(fills, onRegion, 'lily-pad-2')} />
        <path d="M 496 472 Q 496 462 500 460 Q 504 462 504 472 Z" {...reg(fills, onRegion, 'lotus-2')} />
      </g>

      {/* small monk silhouette on causeway */}
      <g>
        <ellipse cx="300" cy="438" rx="4" ry="6" fill={STROKE} stroke="none" />
        <circle cx="300" cy="430" r="2.4" fill={STROKE} stroke="none" />
      </g>

      {/* apsara carving on main-tower facade */}
      <g fill="none" stroke={STROKE} strokeWidth="1.6">
        <ellipse cx="280" cy="346" rx="3" ry="6" />
        <circle cx="280" cy="338" r="2" />
        <ellipse cx="320" cy="346" rx="3" ry="6" />
        <circle cx="320" cy="338" r="2" />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>ANGKOR WAT · c. 1150</text>
    </svg>
  );
}

// ----- 54. MOAI OF EASTER ISLAND — Rapa Nui -----
function MoaiSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* setting sun */}
      <g style={alive ? { animation: 'sun-pulse 3s ease-in-out infinite', transformOrigin: '460px 220px' } : null}>
        <circle cx="460" cy="220" r="40" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds */}
      <path d="M 60 130 Q 60 110 82 110 Q 88 96 108 96 Q 128 96 132 110 Q 152 110 152 130 Z" {...reg(fills, onRegion, 'cloud-l')} />
      <path d="M 240 80 Q 240 64 258 64 Q 262 52 280 52 Q 298 52 302 64 Q 320 64 320 80 Z" {...reg(fills, onRegion, 'cloud-r')} />

      {/* distant Pacific Ocean horizon */}
      <path d="M 20 340 L 580 340 L 580 420 L 20 420 Z" {...reg(fills, onRegion, 'ocean')} />
      {/* ocean ripples */}
      <path d="M 40 370 Q 80 364 120 370 Q 160 376 200 370" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 220 380 Q 260 374 300 380 Q 340 386 380 380" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 400 372 Q 440 366 480 372 Q 520 378 560 372" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 60 400 Q 100 394 140 400 Q 180 406 220 400" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* grass plain */}
      <path d="M 20 420 Q 200 408 380 420 Q 480 414 580 420 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'grass')} />
      {/* grass tufts */}
      {[60,160,520].map((x,i) => (
        <path key={`gt-${i}`} d={`M ${x} 478 L ${x+4} 466 L ${x+8} 478 L ${x+12} 466 L ${x+16} 478`} fill="none" stroke={STROKE} strokeWidth="1.4" />
      ))}

      {/* ahu (stone platform that moai stand on) */}
      <rect x="80" y="478" width="440" height="22" {...reg(fills, onRegion, 'ahu')} />
      <line x1="80" y1="488" x2="520" y2="488" stroke={STROKE} strokeWidth="1.4" />
      {/* ahu stone seams */}
      {[120,180,240,300,360,420,480].map((x,i) => (
        <line key={`as-${i}`} x1={x} y1="478" x2={x+4} y2="500" stroke={STROKE} strokeWidth="1.2" />
      ))}

      {/* ---- MOAI 1 (left, smaller) ---- */}
      <g>
        {/* torso */}
        <path d="M 130 478 L 175 478 L 168 380 L 137 380 Z" {...reg(fills, onRegion, 'moai-1-torso')} />
        {/* head (large, elongated) */}
        <path d="M 135 380 L 170 380 L 176 320 Q 176 280 152 274 Q 128 280 128 320 Z" {...reg(fills, onRegion, 'moai-1-head')} />
        {/* brow */}
        <path d="M 132 312 Q 152 304 174 312 L 174 322 L 132 322 Z" {...reg(fills, onRegion, 'moai-1-brow')} />
        {/* deep-set eye sockets — non-colorable */}
        <ellipse cx="142" cy="334" rx="4" ry="3" fill={STROKE} stroke="none" />
        <ellipse cx="164" cy="334" rx="4" ry="3" fill={STROKE} stroke="none" />
        {/* nose */}
        <path d="M 153 336 L 148 360 L 158 360 Z" fill="none" stroke={STROKE} strokeWidth="1.6" />
        {/* mouth */}
        <path d="M 144 370 L 162 370" stroke={STROKE} strokeWidth="2" fill="none" />
        {/* pukao (red topknot stone) */}
        <ellipse cx="152" cy="266" rx="22" ry="12" {...reg(fills, onRegion, 'moai-1-pukao')} />
      </g>

      {/* ---- MOAI 2 (center, largest) ---- */}
      <g>
        <path d="M 250 478 L 312 478 L 304 360 L 258 360 Z" {...reg(fills, onRegion, 'moai-2-torso')} />
        <path d="M 256 360 L 306 360 L 314 280 Q 314 234 281 226 Q 248 234 248 280 Z" {...reg(fills, onRegion, 'moai-2-head')} />
        <path d="M 252 270 Q 281 260 312 270 L 312 282 L 252 282 Z" {...reg(fills, onRegion, 'moai-2-brow')} />
        <ellipse cx="266" cy="296" rx="5" ry="4" fill={STROKE} stroke="none" />
        <ellipse cx="296" cy="296" rx="5" ry="4" fill={STROKE} stroke="none" />
        <path d="M 282 298 L 274 330 L 290 330 Z" fill="none" stroke={STROKE} strokeWidth="1.6" />
        <path d="M 270 342 L 294 342" stroke={STROKE} strokeWidth="2.4" fill="none" />
        {/* small horizontal line for chin */}
        <line x1="262" y1="356" x2="302" y2="356" stroke={STROKE} strokeWidth="1.2" />
        {/* pukao */}
        <ellipse cx="281" cy="216" rx="30" ry="14" {...reg(fills, onRegion, 'moai-2-pukao')} />
      </g>

      {/* ---- MOAI 3 (right, mid-sized) ---- */}
      <g>
        <path d="M 380 478 L 430 478 L 422 366 L 386 366 Z" {...reg(fills, onRegion, 'moai-3-torso')} />
        <path d="M 384 366 L 424 366 L 430 296 Q 430 252 404 246 Q 378 252 378 296 Z" {...reg(fills, onRegion, 'moai-3-head')} />
        <path d="M 380 288 Q 404 280 428 288 L 428 298 L 380 298 Z" {...reg(fills, onRegion, 'moai-3-brow')} />
        <ellipse cx="392" cy="310" rx="4" ry="3" fill={STROKE} stroke="none" />
        <ellipse cx="416" cy="310" rx="4" ry="3" fill={STROKE} stroke="none" />
        <path d="M 404 312 L 398 340 L 410 340 Z" fill="none" stroke={STROKE} strokeWidth="1.6" />
        <path d="M 394 350 L 414 350" stroke={STROKE} strokeWidth="2" fill="none" />
        {/* no pukao on this one (some don't have it) */}
      </g>

      {/* additional moai silhouettes in distance */}
      <path d="M 470 478 L 494 478 L 490 422 Q 482 410 472 422 Z" {...reg(fills, onRegion, 'moai-far-1')} />
      <path d="M 60 478 L 90 478 L 86 414 Q 76 400 64 414 Z" {...reg(fills, onRegion, 'moai-far-2')} />

      {/* small surfboard / outrigger canoe in ocean — Polynesian touch */}
      <g style={alive ? { animation: 'gentle-bob 2.8s ease-in-out infinite' } : null}>
        <path d="M 80 376 L 130 376 L 124 386 L 86 386 Z" {...reg(fills, onRegion, 'canoe')} />
        {/* outrigger boom */}
        <line x1="98" y1="386" x2="98" y2="396" stroke={STROKE} strokeWidth="1.4" />
        <line x1="112" y1="386" x2="112" y2="396" stroke={STROKE} strokeWidth="1.4" />
        <rect x="92" y="394" width="28" height="4" {...reg(fills, onRegion, 'canoe-outrigger')} />
        {/* sailor */}
        <ellipse cx="106" cy="370" rx="3" ry="5" fill={STROKE} stroke="none" />
        <circle cx="106" cy="364" r="2.4" fill={STROKE} stroke="none" />
      </g>

      {/* gull flying */}
      <g style={alive ? { animation: 'gentle-bob 2.4s ease-in-out infinite' } : null}>
        <path d="M 540 130 Q 548 122 556 130 Q 564 122 572 130" fill="none" stroke={STROKE} strokeWidth="2" />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>RAPA NUI · EASTER ISLAND</text>
    </svg>
  );
}

// ============================================================
// Page entries
// ============================================================
const NEXT_SET_PAGES = [
  {
    id: 'lascaux',
    title: 'Lascaux Cave Paintings',
    subtitle: 'Dordogne, c. 17,000 BC',
    collection: 'world',
    eraLabel: 'Stone Age Art',
    eraColor: '#8B5A3C',
    bgPreview: '#E8C794',
    fact: "Deep inside a cave in France, prehistoric artists drew more than 600 animals on the walls using charcoal and red ochre — more than 17,000 years ago, long before any written language existed.",
    Component: LascauxSVG,
    readingLevel: { lexile: 740, gradeBand: '3–4', guidedReading: 'N', wordCount: 32, complexity: 'Moderate' },
    keyVocab: ['cave', 'ochre', 'prehistoric', 'ancestor'],
    standards: ['RI.3.7', 'RI.4.4', 'RI.4.1', 'SL.3.2'],
    regions: ['wall','cave-dark-l','cave-dark-r','bull-body','bull-leg-fl','bull-leg-fr','bull-leg-bl','bull-leg-br','bull-head','bull-horn-l','bull-horn-r','bull-tail','horse-body','horse-leg-fl','horse-leg-fr','horse-leg-bl','horse-leg-br','horse-head','horse-mane','horse-tail','deer-body','deer-leg-fl','deer-leg-fr','deer-leg-bl','deer-leg-br','deer-neck','deer-head','flame','banner'],
    quest: {
      heading: 'Paintings in the Dark',
      author: 'Prehistoric Europe · c. 17,000 BC',
      lines: [
        'I am a {0} hidden in the rock under France.',
        'On my walls, ancient people painted huge {1}.',
        'They worked by the light of a tiny {2}.',
      ],
      blanks: [
        { answer: 'cave',    choices: ['cave',    'cake',    'cabin',    'castle']    },
        { answer: 'animals', choices: ['animals', 'aprons',  'anchors',  'acorns']    },
        { answer: 'torch',   choices: ['torch',   'toaster', 'turnip',   'tractor']   },
      ],
      voice: {
        // Hushed, mysterious narrator
        hints: [/daniel/i, /alex/i, /tom/i, /samantha/i, /microsoft (mark|aria)/i],
        rate: 0.74, pitch: 0.82,
      },
    },
  },
  {
    id: 'persepolis',
    title: 'Persepolis',
    subtitle: 'Persian Empire, c. 500 BC',
    collection: 'world',
    eraLabel: 'Persian Empire',
    eraColor: '#A6815F',
    bgPreview: '#EDD7AC',
    fact: "Persepolis was the dazzling capital of the Persian Empire, the largest the world had ever seen. Each spring, ambassadors from 28 nations climbed its grand staircase bringing tribute to the King of Kings.",
    Component: PersepolisSVG,
    readingLevel: { lexile: 880, gradeBand: '4–5', guidedReading: 'P', wordCount: 32, complexity: 'Challenging' },
    keyVocab: ['empire', 'tribute', 'Apadana', 'lamassu', 'satrap'],
    standards: ['RI.4.4', 'RI.4.7', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','sun-wing-l','sun-wing-r','mountains','cypress-l','cypress-r','terrace','stairs','relief-l','relief-r','col-base-0','col-shaft-0','col-capital-0','bull-l-0','bull-l-head-0','bull-r-0','bull-r-head-0','col-base-1','col-shaft-1','col-capital-1','bull-l-1','bull-l-head-1','bull-r-1','bull-r-head-1','col-base-2','col-shaft-2','col-capital-2','bull-l-2','bull-l-head-2','bull-r-2','bull-r-head-2','col-base-3','col-shaft-3','col-capital-3','bull-l-3','bull-l-head-3','bull-r-3','bull-r-head-3','col-base-4','col-shaft-4','col-capital-4','bull-l-4','bull-l-head-4','bull-r-4','bull-r-head-4','lamassu-body','lamassu-head','lamassu-beard','lamassu-crown','lamassu-wing','figure-body','figure-head','figure-robe','figure-bowl','banner'],
    quest: {
      heading: 'The King of Kings',
      author: 'Persian Empire · c. 500 BC',
      lines: [
        'I am the great palace of {0}.',
        'My tall columns are topped by carved {1}.',
        'I was built by the King of {2}.',
      ],
      blanks: [
        { answer: 'Persia', choices: ['Persia', 'Peach',   'Pillow',  'Pumpkin'] },
        { answer: 'bulls',  choices: ['bulls',  'bunnies', 'balloons','beavers'] },
        { answer: 'Kings',  choices: ['Kings',  'Kittens', 'Kazoos',  'Knees']   },
      ],
      voice: {
        // Stately, ceremonial narrator
        hints: [/daniel/i, /alex/i, /tom/i, /serena/i, /microsoft (mark|guy)/i],
        rate: 0.76, pitch: 0.84,
      },
    },
  },
  {
    id: 'angkor-wat',
    title: 'Angkor Wat',
    subtitle: 'Khmer Empire, c. 1150',
    collection: 'world',
    eraLabel: 'Khmer Empire',
    eraColor: '#3C6B4A',
    bgPreview: '#D8E2C9',
    fact: "Angkor Wat is the largest religious building on Earth. Its five lotus-bud towers rise from inside a moat as wide as four football fields, and its walls hold more than a mile of carved stone stories.",
    Component: AngkorWatSVG,
    readingLevel: { lexile: 860, gradeBand: '4–5', guidedReading: 'P', wordCount: 34, complexity: 'Challenging' },
    keyVocab: ['Khmer', 'temple', 'moat', 'naga', 'causeway'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','cloud','jungle','gallery','gallery-roof','gallery-door-0','gallery-door-1','gallery-door-2','gallery-door-3','gallery-door-4','gallery-door-5','tower-base-0','tower-tier-0-a','tower-tier-0-b','tower-tier-0-c','tower-spire-0','tower-base-1','tower-tier-1-a','tower-tier-1-b','tower-tier-1-c','tower-spire-1','tower-base-2','tower-tier-2-a','tower-tier-2-b','tower-tier-2-c','tower-spire-2','tower-base-3','tower-tier-3-a','tower-tier-3-b','tower-tier-3-c','tower-spire-3','main-tower-base','main-tier-a','main-tier-b','main-tier-c','main-spire','main-door','causeway','moat-l','moat-r','naga-l-head','naga-r-head','grass','lily-pad-1','lotus-1','lily-pad-2','lotus-2','banner'],
    quest: {
      heading: 'Temple of Towers',
      author: 'Khmer Empire · c. 1150',
      lines: [
        'I am the largest religious building in the {0}.',
        'My five towers look like the buds of a {1}.',
        'A bridge crosses my wide {2} to reach me.',
      ],
      blanks: [
        { answer: 'world', choices: ['world', 'wagon', 'walnut',   'window']  },
        { answer: 'lotus', choices: ['lotus', 'lemon', 'log',      'lobster'] },
        { answer: 'moat',  choices: ['moat',  'mug',   'mailbox',  'magnet']  },
      ],
      voice: {
        // Reverent, calm narrator
        hints: [/daniel/i, /alex/i, /samantha/i, /tom/i, /microsoft (mark|aria)/i],
        rate: 0.78, pitch: 0.86,
      },
    },
  },
  {
    id: 'moai',
    title: 'The Moai of Rapa Nui',
    subtitle: 'Easter Island',
    collection: 'world',
    eraLabel: 'Polynesian Pacific',
    eraColor: '#5C5C5C',
    bgPreview: '#E5E5DC',
    fact: "Polynesian sailors settled the tiny island of Rapa Nui — Easter Island — over 1,000 years ago. They carved nearly 900 giant stone heads called moai, some weighing 80 tons, and somehow moved them miles across the island.",
    Component: MoaiSVG,
    readingLevel: { lexile: 820, gradeBand: '4–5', guidedReading: 'O', wordCount: 36, complexity: 'Challenging' },
    keyVocab: ['moai', 'Polynesia', 'pukao', 'volcanic', 'ahu'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','cloud-l','cloud-r','ocean','grass','ahu','moai-1-torso','moai-1-head','moai-1-brow','moai-1-pukao','moai-2-torso','moai-2-head','moai-2-brow','moai-2-pukao','moai-3-torso','moai-3-head','moai-3-brow','moai-far-1','moai-far-2','canoe','canoe-outrigger','banner'],
    quest: {
      heading: 'Stone Guardians of the Sea',
      author: 'Rapa Nui · c. 1200',
      lines: [
        'I am a giant carved {0} of stone.',
        'I stand on a tiny island in the wide {1} Ocean.',
        'My people sailed across the sea in long {2}.',
      ],
      blanks: [
        { answer: 'head',    choices: ['head',    'hat',     'hammer',   'hippo']  },
        { answer: 'Pacific', choices: ['Pacific', 'Pickle',  'Popcorn',  'Pretzel'] },
        { answer: 'canoes',  choices: ['canoes',  'candles', 'cookies',  'cushions'] },
      ],
      voice: {
        // Quiet, wind-blown narrator
        hints: [/daniel/i, /alex/i, /tom/i, /samantha/i, /microsoft (mark|aria)/i],
        rate: 0.74, pitch: 0.82,
      },
    },
  },
];

if (window.PAGES_DATA && Array.isArray(window.PAGES_DATA)) {
  NEXT_SET_PAGES.forEach(p => window.PAGES_DATA.push(p));
}

Object.assign(window, { LascauxSVG, PersepolisSVG, AngkorWatSVG, MoaiSVG });
