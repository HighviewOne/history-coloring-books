// =================================================================
// Latin & South American history coloring pages — 4 additions:
//   • Machu Picchu (Inca, c. 1450)
//   • The Aztec Sun Stone (1479)
//   • The Mayan Pyramid at Chichén Itzá
//   • Christ the Redeemer, Rio de Janeiro (1931)
// =================================================================

// ----- 27. MACHU PICCHU — Peru, c. 1450 -----
function MachuPicchuSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '110px 100px' } : null}>
        <circle cx="110" cy="100" r="34" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds drifting around peaks */}
      <g style={alive ? { animation: 'gentle-bob 3.6s ease-in-out infinite' } : null}>
        <path d="M 220 110 Q 220 90 244 90 Q 250 76 270 76 Q 290 76 294 90 Q 318 90 318 110 Z" {...reg(fills, onRegion, 'cloud-l')} />
      </g>
      <g style={alive ? { animation: 'gentle-bob 4s ease-in-out infinite', animationDelay: '0.6s' } : null}>
        <path d="M 380 150 Q 380 130 402 130 Q 408 116 428 116 Q 448 116 452 130 Q 472 130 472 150 Z" {...reg(fills, onRegion, 'cloud-r')} />
      </g>

      {/* ---- Huayna Picchu (tall peak behind) ---- */}
      <polygon points="220,440 340,80 460,440" {...reg(fills, onRegion, 'peak-main')} />
      {/* shaded side */}
      <polygon points="340,80 460,440 340,440" {...reg(fills, onRegion, 'peak-main-shade')} />

      {/* secondary peaks */}
      <polygon points="40,440 160,200 280,440" {...reg(fills, onRegion, 'peak-l')} />
      <polygon points="380,440 500,220 580,440" {...reg(fills, onRegion, 'peak-r')} />

      {/* snowy caps — non-colorable */}
      <path d="M 326 130 L 354 130 L 360 156 L 320 156 Z" fill="#FFFDF5" stroke={STROKE} strokeWidth="2" />
      <path d="M 152 222 L 168 222 L 174 240 L 146 240 Z" fill="#FFFDF5" stroke={STROKE} strokeWidth="2" />

      {/* ---- Terraced agricultural slope on left ---- */}
      <path d="M 60 430 Q 100 386 180 410 L 180 430 Z" {...reg(fills, onRegion, 'terrace-1')} />
      <path d="M 60 408 Q 100 366 188 388 L 188 408 L 60 408 Z" {...reg(fills, onRegion, 'terrace-2')} />
      <path d="M 70 386 Q 110 346 196 366 L 196 386 L 70 386 Z" {...reg(fills, onRegion, 'terrace-3')} />
      <path d="M 80 364 Q 116 326 204 344 L 204 364 L 80 364 Z" {...reg(fills, onRegion, 'terrace-4')} />
      {/* terrace stone-line texture — non-colorable */}
      <line x1="64" y1="430" x2="180" y2="430" stroke={STROKE} strokeWidth="1.4" />
      <line x1="64" y1="408" x2="186" y2="408" stroke={STROKE} strokeWidth="1.4" />
      <line x1="72" y1="386" x2="194" y2="386" stroke={STROKE} strokeWidth="1.4" />
      <line x1="82" y1="364" x2="202" y2="364" stroke={STROKE} strokeWidth="1.4" />

      {/* ---- Inca stone city (central plaza on flat ridge) ---- */}
      <rect x="240" y="378" width="200" height="60" {...reg(fills, onRegion, 'plaza-base')} />
      {/* Temple of the Sun — half-round wall */}
      <path d="M 256 378 Q 260 348 290 348 L 290 378 Z" {...reg(fills, onRegion, 'temple-sun')} />
      {/* main building */}
      <rect x="300" y="346" width="48" height="34" {...reg(fills, onRegion, 'building-c')} />
      <rect x="306" y="354" width="8" height="14" fill={STROKE} stroke="none" />
      <rect x="326" y="354" width="8" height="14" fill={STROKE} stroke="none" />
      {/* small house with thatched roof */}
      <rect x="360" y="354" width="40" height="26" {...reg(fills, onRegion, 'building-r')} />
      <rect x="370" y="362" width="8" height="14" fill={STROKE} stroke="none" />
      <polygon points="356,354 404,354 392,332 368,332" {...reg(fills, onRegion, 'roof-thatch')} />
      {/* thatch hatching — non-colorable */}
      <line x1="362" y1="354" x2="372" y2="334" stroke={STROKE} strokeWidth="1" />
      <line x1="376" y1="354" x2="380" y2="332" stroke={STROKE} strokeWidth="1" />
      <line x1="390" y1="354" x2="386" y2="334" stroke={STROKE} strokeWidth="1" />
      {/* stone walls of plaza — non-colorable seams */}
      <line x1="240" y1="396" x2="440" y2="396" stroke={STROKE} strokeWidth="1.2" />
      <line x1="240" y1="416" x2="440" y2="416" stroke={STROKE} strokeWidth="1.2" />
      {[280,320,360,400].map((x,i) => (
        <line key={`vs-${i}`} x1={x} y1="378" x2={x+(i%2?4:-4)} y2="438" stroke={STROKE} strokeWidth="1.2" />
      ))}

      {/* foreground rocky ledge */}
      <path d="M 20 438 Q 200 432 380 438 Q 480 432 580 438 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'ground')} />
      {/* grass tufts — non-colorable */}
      {[60,160,400,500].map((x,i) => (
        <path key={`gt-${i}`} d={`M ${x} 478 L ${x+4} 470 L ${x+8} 478 L ${x+12} 470 L ${x+16} 478`} fill="none" stroke={STROKE} strokeWidth="1.4" />
      ))}

      {/* ---- Llama in foreground ---- */}
      <g style={alive ? { animation: 'gentle-bob 2.6s ease-in-out infinite' } : null} transform="translate(420, 470)">
        {/* body */}
        <ellipse cx="0" cy="0" rx="44" ry="22" {...reg(fills, onRegion, 'llama-body')} />
        {/* legs */}
        <rect x="-26" y="14" width="10" height="38" {...reg(fills, onRegion, 'llama-leg-fl')} />
        <rect x="-10" y="14" width="10" height="38" {...reg(fills, onRegion, 'llama-leg-fr')} />
        <rect x="14" y="14" width="10" height="38" {...reg(fills, onRegion, 'llama-leg-bl')} />
        <rect x="30" y="14" width="10" height="38" {...reg(fills, onRegion, 'llama-leg-br')} />
        {/* neck — long and curved */}
        <path d="M -36 -6 Q -54 -36 -56 -64 L -38 -68 Q -34 -42 -26 -16 Z" {...reg(fills, onRegion, 'llama-neck')} />
        {/* head */}
        <ellipse cx="-50" cy="-72" rx="14" ry="10" {...reg(fills, onRegion, 'llama-head')} />
        {/* ears */}
        <path d="M -56 -82 L -54 -94 L -48 -82 Z" {...reg(fills, onRegion, 'llama-ear-l')} />
        <path d="M -46 -82 L -42 -94 L -38 -82 Z" {...reg(fills, onRegion, 'llama-ear-r')} />
        {/* eye and snout */}
        <circle cx="-54" cy="-72" r="1.6" fill={STROKE} stroke="none" />
        <circle cx="-58" cy="-68" r="1.6" fill={STROKE} stroke="none" />
        {/* tail */}
        <path d="M 42 -4 Q 54 -10 50 4 Q 44 4 42 0 Z" {...reg(fills, onRegion, 'llama-tail')} />
      </g>

      {/* banner */}
      <rect x="170" y="530" width="260" height="38" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="556" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="20" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>MACHU PICCHU · c. 1450</text>
    </svg>
  );
}

// ----- 28. AZTEC SUN STONE — 1479 -----
function AztecSunStoneSVG({ fills, onRegion, alive }) {
  const cx = 300, cy = 296;
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* background — temple wall */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'background')} />
      {/* temple-wall texture lines */}
      <line x1="20" y1="180" x2="580" y2="180" stroke={STROKE} strokeWidth="1.2" />
      <line x1="20" y1="360" x2="580" y2="360" stroke={STROKE} strokeWidth="1.2" />
      <line x1="220" y1="20" x2="220" y2="180" stroke={STROKE} strokeWidth="1.2" />
      <line x1="380" y1="20" x2="380" y2="180" stroke={STROKE} strokeWidth="1.2" />

      {/* ---- The Sun Stone ---- */}
      {/* outer triangular ray ring — 16 rays */}
      <g style={alive ? { animation: 'spin-slow 60s linear infinite', transformOrigin: '300px 296px' } : null}>
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 16 - Math.PI/2;
          const x1 = cx + Math.cos(a) * 222, y1 = cy + Math.sin(a) * 222;
          const x2 = cx + Math.cos(a - 0.06) * 246, y2 = cy + Math.sin(a - 0.06) * 246;
          const x3 = cx + Math.cos(a + 0.06) * 246, y3 = cy + Math.sin(a + 0.06) * 246;
          return <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} {...reg(fills, onRegion, `ray-${i}`)} />;
        })}
      </g>

      {/* outermost ring (serpents) */}
      <circle cx={cx} cy={cy} r="222" {...reg(fills, onRegion, 'ring-serpent')} />
      {/* glyph marks along outer ring — non-colorable */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 24;
        const x1 = cx + Math.cos(a) * 200, y1 = cy + Math.sin(a) * 200;
        const x2 = cx + Math.cos(a) * 220, y2 = cy + Math.sin(a) * 220;
        return <line key={`og-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={STROKE} strokeWidth="1.6" />;
      })}

      {/* day-sign ring */}
      <circle cx={cx} cy={cy} r="198" {...reg(fills, onRegion, 'ring-days')} />
      {/* 20 day glyph boxes — outline-only squares around inner ring */}
      {Array.from({ length: 20 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 20 - Math.PI/2;
        const dx = cx + Math.cos(a) * 174, dy = cy + Math.sin(a) * 174;
        return (
          <g key={`d-${i}`} transform={`translate(${dx} ${dy}) rotate(${(a + Math.PI/2) * 180/Math.PI})`}>
            <rect x="-12" y="-12" width="24" height="24" fill="none" stroke={STROKE} strokeWidth="1.6" />
            {/* tiny glyph mark inside */}
            <circle cx="0" cy="0" r="3" fill={STROKE} stroke="none" />
          </g>
        );
      })}

      {/* inner ring */}
      <circle cx={cx} cy={cy} r="150" {...reg(fills, onRegion, 'ring-inner')} />
      {/* ring decorative chevrons — non-colorable */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 12;
        const x = cx + Math.cos(a) * 136, y = cy + Math.sin(a) * 136;
        return <circle key={`ic-${i}`} cx={x} cy={y} r="3.6" fill={STROKE} stroke="none" />;
      })}

      {/* 4 cardinal point boxes — represent the four previous suns */}
      <rect x={cx - 100} y={cy - 70} width="40" height="40" {...reg(fills, onRegion, 'box-tl')} />
      <rect x={cx + 60} y={cy - 70} width="40" height="40" {...reg(fills, onRegion, 'box-tr')} />
      <rect x={cx - 100} y={cy + 30} width="40" height="40" {...reg(fills, onRegion, 'box-bl')} />
      <rect x={cx + 60} y={cy + 30} width="40" height="40" {...reg(fills, onRegion, 'box-br')} />
      {/* glyph marks inside each box */}
      {[[cx-80,cy-50],[cx+80,cy-50],[cx-80,cy+50],[cx+80,cy+50]].map((p,i)=>(
        <g key={`bg-${i}`} stroke={STROKE} strokeWidth="1.6" fill="none">
          <circle cx={p[0]} cy={p[1]} r="6" />
          <line x1={p[0]-8} y1={p[1]} x2={p[0]+8} y2={p[1]} />
          <line x1={p[0]} y1={p[1]-8} x2={p[0]} y2={p[1]+8} />
        </g>
      ))}

      {/* ---- Tonatiuh (sun god) face at center ---- */}
      {/* central disc */}
      <circle cx={cx} cy={cy} r="74" {...reg(fills, onRegion, 'face-disc')} />
      {/* headdress band over forehead */}
      <path d="M 250 270 Q 300 250 350 270 L 348 286 Q 300 270 252 286 Z" {...reg(fills, onRegion, 'headdress')} />
      {/* face */}
      <ellipse cx={cx} cy="304" rx="44" ry="48" {...reg(fills, onRegion, 'face')} />
      {/* eyes */}
      <circle cx="282" cy="298" r="6" fill="#FFFDF5" stroke={STROKE} strokeWidth="2" />
      <circle cx="318" cy="298" r="6" fill="#FFFDF5" stroke={STROKE} strokeWidth="2" />
      <circle cx="282" cy="298" r="2.6" fill={STROKE} stroke="none" />
      <circle cx="318" cy="298" r="2.6" fill={STROKE} stroke="none" />
      {/* nose */}
      <path d="M 296 304 L 290 322 Q 296 328 304 322 L 304 304" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* tongue sticking out (Tonatiuh is always shown with tongue out — symbolizing hunger) */}
      <path d="M 286 334 Q 300 348 314 334 Q 310 360 300 364 Q 290 360 286 334 Z" {...reg(fills, onRegion, 'tongue')} />
      <line x1="300" y1="338" x2="300" y2="358" stroke={STROKE} strokeWidth="1.4" />
      {/* mouth around tongue */}
      <path d="M 274 334 Q 286 326 314 326 Q 326 334 314 334 Q 300 328 286 334 Z" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* cheek markings */}
      <circle cx="262" cy="312" r="3.6" {...reg(fills, onRegion, 'cheek-l')} />
      <circle cx="338" cy="312" r="3.6" {...reg(fills, onRegion, 'cheek-r')} />
      {/* ear plugs */}
      <circle cx="248" cy="304" r="8" {...reg(fills, onRegion, 'ear-l')} />
      <circle cx="352" cy="304" r="8" {...reg(fills, onRegion, 'ear-r')} />
      <circle cx="248" cy="304" r="3" fill={STROKE} stroke="none" />
      <circle cx="352" cy="304" r="3" fill={STROKE} stroke="none" />
      {/* eyebrows */}
      <path d="M 268 286 Q 282 280 296 286" fill="none" stroke={STROKE} strokeWidth="2" />
      <path d="M 304 286 Q 318 280 332 286" fill="none" stroke={STROKE} strokeWidth="2" />

      {/* banner */}
      <rect x="160" y="540" width="280" height="36" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="564" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="18" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>AZTEC SUN STONE · 1479</text>
    </svg>
  );
}

// ----- 29. MAYAN PYRAMID — Chichén Itzá, c. 1000 -----
function MayanPyramidSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '510px 110px' } : null}>
        <circle cx="510" cy="110" r="36" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* cloud */}
      <path d="M 60 100 Q 60 80 82 80 Q 88 66 108 66 Q 128 66 132 80 Q 152 80 152 100 Z" {...reg(fills, onRegion, 'cloud')} />

      {/* jungle silhouette behind pyramid */}
      <path d="M 20 380 Q 60 320 100 360 Q 140 300 180 360 Q 220 320 260 360 Q 300 310 340 360 Q 380 320 420 360 Q 460 300 500 360 Q 540 320 580 380 L 580 460 L 20 460 Z" {...reg(fills, onRegion, 'jungle')} />

      {/* ---- El Castillo pyramid — 9 stepped levels ---- */}
      {[
        { y: 446, w: 480 }, // bottom
        { y: 422, w: 432 },
        { y: 398, w: 384 },
        { y: 374, w: 336 },
        { y: 350, w: 288 },
        { y: 326, w: 240 },
        { y: 302, w: 192 },
        { y: 278, w: 144 },
        { y: 254, w: 96 },  // top
      ].map((s, i) => (
        <rect key={`p-${i}`} x={300 - s.w/2} y={s.y - 24} width={s.w} height="24" {...reg(fills, onRegion, `step-${i}`)} />
      ))}
      {/* step shadow lines on left side (slope) — non-colorable */}
      <line x1="60" y1="446" x2="300" y2="230" stroke={STROKE} strokeWidth="1.4" />
      <line x1="540" y1="446" x2="300" y2="230" stroke={STROKE} strokeWidth="1.4" />

      {/* central staircase */}
      <rect x="270" y="230" width="60" height="216" {...reg(fills, onRegion, 'stair')} />
      {/* step lines on staircase — non-colorable */}
      {[245,265,285,305,325,345,365,385,405,425].map((y,i) => (
        <line key={`sl-${i}`} x1="270" y1={y} x2="330" y2={y} stroke={STROKE} strokeWidth="1.4" />
      ))}
      {/* staircase rails */}
      <rect x="262" y="230" width="8" height="220" {...reg(fills, onRegion, 'stair-rail-l')} />
      <rect x="330" y="230" width="8" height="220" {...reg(fills, onRegion, 'stair-rail-r')} />

      {/* serpent heads at base of staircase */}
      <g style={alive ? { animation: 'gentle-bob 2.6s ease-in-out infinite' } : null}>
        {/* left serpent head */}
        <path d="M 238 446 Q 238 422 256 422 L 270 422 L 270 446 Z" {...reg(fills, onRegion, 'serpent-l')} />
        <path d="M 238 446 L 220 442 L 224 432 Q 230 426 238 432 Z" {...reg(fills, onRegion, 'serpent-l-mouth')} />
        <circle cx="248" cy="434" r="2.4" fill={STROKE} stroke="none" />
        {/* fangs */}
        <path d="M 224 442 L 226 448 L 228 442 Z" fill={STROKE} stroke="none" />
        <path d="M 234 442 L 236 448 L 238 442 Z" fill={STROKE} stroke="none" />
        {/* right serpent head */}
        <path d="M 362 446 Q 362 422 344 422 L 330 422 L 330 446 Z" {...reg(fills, onRegion, 'serpent-r')} />
        <path d="M 362 446 L 380 442 L 376 432 Q 370 426 362 432 Z" {...reg(fills, onRegion, 'serpent-r-mouth')} />
        <circle cx="352" cy="434" r="2.4" fill={STROKE} stroke="none" />
        <path d="M 372 442 L 374 448 L 376 442 Z" fill={STROKE} stroke="none" />
        <path d="M 362 442 L 364 448 L 366 442 Z" fill={STROKE} stroke="none" />
      </g>

      {/* temple on top */}
      <rect x="244" y="190" width="112" height="64" {...reg(fills, onRegion, 'temple')} />
      {/* temple roof */}
      <polygon points="240,190 360,190 348,168 252,168" {...reg(fills, onRegion, 'temple-roof')} />
      {/* roof comb (decorative cresting) */}
      <rect x="276" y="148" width="48" height="20" {...reg(fills, onRegion, 'roof-comb')} />
      {/* roof comb pierced openings — non-colorable */}
      <rect x="284" y="152" width="8" height="12" fill={STROKE} stroke="none" />
      <rect x="296" y="152" width="8" height="12" fill={STROKE} stroke="none" />
      <rect x="308" y="152" width="8" height="12" fill={STROKE} stroke="none" />
      {/* temple doorway */}
      <rect x="282" y="210" width="36" height="44" {...reg(fills, onRegion, 'temple-door')} />
      {/* doorway columns */}
      <rect x="282" y="210" width="6" height="44" fill={STROKE} stroke="none" opacity="0.5" />
      <rect x="312" y="210" width="6" height="44" fill={STROKE} stroke="none" opacity="0.5" />
      {/* glyph carvings on temple wall */}
      <rect x="252" y="200" width="20" height="14" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <rect x="328" y="200" width="20" height="14" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* ground */}
      <path d="M 20 446 L 580 446 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'ground')} />

      {/* palm tree foreground (left) */}
      <path d="M 76 580 Q 80 510 70 440 Q 86 510 92 580 Z" {...reg(fills, onRegion, 'palm-trunk')} />
      <g style={alive ? { animation: 'wave-flag 3s ease-in-out infinite', transformOrigin: '82px 440px' } : null}>
        <path d="M 80 444 Q 40 422 14 444 Q 46 450 80 458 Z" {...reg(fills, onRegion, 'palm-leaf-l')} />
        <path d="M 84 444 Q 124 422 148 444 Q 116 450 84 458 Z" {...reg(fills, onRegion, 'palm-leaf-r')} />
        <path d="M 82 442 Q 70 410 64 384 Q 80 408 88 442 Z" {...reg(fills, onRegion, 'palm-leaf-u')} />
        <path d="M 82 446 Q 56 470 44 496 Q 70 478 90 456 Z" {...reg(fills, onRegion, 'palm-leaf-d')} />
      </g>

      {/* iguana on a stone in foreground right */}
      <g style={alive ? { animation: 'gentle-bob 3s ease-in-out infinite' } : null}>
        <ellipse cx="500" cy="498" rx="42" ry="10" {...reg(fills, onRegion, 'stone')} />
        <path d="M 470 488 Q 478 480 488 484 L 530 484 Q 540 480 546 488 Q 540 494 530 492 L 488 492 Q 478 494 470 488 Z" {...reg(fills, onRegion, 'iguana-body')} />
        <ellipse cx="466" cy="486" rx="6" ry="4" {...reg(fills, onRegion, 'iguana-head')} />
        <circle cx="464" cy="485" r="1.2" fill={STROKE} stroke="none" />
        <path d="M 546 488 Q 560 486 568 492" fill="none" stroke={STROKE} strokeWidth="1.6" />
        {/* spine bumps */}
        <path d="M 484 482 L 488 478 L 492 482 L 496 478 L 500 482 L 504 478 L 508 482 L 512 478 L 516 482 L 520 478 L 524 482" fill="none" stroke={STROKE} strokeWidth="1.4" />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="18" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>CHICHÉN ITZÁ · MAYA</text>
    </svg>
  );
}

// ----- 30. CHRIST THE REDEEMER — Rio de Janeiro, 1931 -----
function ChristRedeemerSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '500px 90px' } : null}>
        <circle cx="500" cy="90" r="32" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds */}
      <g style={alive ? { animation: 'gentle-bob 4s ease-in-out infinite' } : null}>
        <path d="M 70 130 Q 70 110 92 110 Q 98 96 118 96 Q 138 96 142 110 Q 162 110 162 130 Z" {...reg(fills, onRegion, 'cloud-l')} />
      </g>
      <g style={alive ? { animation: 'gentle-bob 5s ease-in-out infinite', animationDelay: '0.4s' } : null}>
        <path d="M 380 80 Q 380 64 398 64 Q 404 52 422 52 Q 440 52 444 64 Q 462 64 462 80 Z" {...reg(fills, onRegion, 'cloud-r')} />
      </g>

      {/* distant mountain (Sugarloaf) on right horizon */}
      <path d="M 460 460 Q 460 380 510 380 Q 560 380 560 460 Z" {...reg(fills, onRegion, 'sugarloaf')} />
      <line x1="510" y1="380" x2="510" y2="392" stroke={STROKE} strokeWidth="1.2" />

      {/* Guanabara Bay water */}
      <path d="M 20 470 L 580 470 L 580 510 L 20 510 Z" {...reg(fills, onRegion, 'bay')} />
      <path d="M 60 488 Q 90 482 120 488" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 220 492 Q 250 486 280 492" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 340 488 Q 370 482 400 488" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* tiny boat on bay */}
      <g style={alive ? { animation: 'gentle-bob 2.4s ease-in-out infinite' } : null}>
        <path d="M 144 488 L 196 488 L 188 498 L 152 498 Z" {...reg(fills, onRegion, 'boat')} />
        <line x1="170" y1="488" x2="170" y2="468" stroke={STROKE} strokeWidth="1.6" />
        <path d="M 170 468 L 188 484 L 170 484 Z" {...reg(fills, onRegion, 'boat-sail')} />
      </g>

      {/* foreground city/shore */}
      <path d="M 20 510 L 580 510 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'shore')} />
      {/* tiny city buildings on shore */}
      {[60,84,108,132,156,440,464,488,512,536].map((x,i) => (
        <rect key={`c-${i}`} x={x} y={524 - (i%3)*6} width="14" height={24 + (i%3)*6} {...reg(fills, onRegion, `city-${i}`)} />
      ))}

      {/* Corcovado mountain peak (the statue's base) */}
      <polygon points="180,470 300,180 420,470" {...reg(fills, onRegion, 'mountain')} />
      {/* mountain shadow side */}
      <polygon points="300,180 420,470 300,470" {...reg(fills, onRegion, 'mountain-shade')} />
      {/* mountain rocky lines */}
      <path d="M 240 320 L 260 340 L 244 360" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 340 320 L 360 340 L 344 360" fill="none" stroke={STROKE} strokeWidth="1.4" />
      {/* jungle dots on slope */}
      {[[220,390],[260,420],[340,420],[380,390]].map((p,i) => (
        <ellipse key={`j-${i}`} cx={p[0]} cy={p[1]} rx="14" ry="8" fill={STROKE} stroke="none" opacity="0.35" />
      ))}

      {/* ---- pedestal/plinth ---- */}
      <rect x="276" y="270" width="48" height="40" {...reg(fills, onRegion, 'pedestal')} />
      {/* pedestal lines */}
      <line x1="276" y1="284" x2="324" y2="284" stroke={STROKE} strokeWidth="1.4" />
      <line x1="276" y1="298" x2="324" y2="298" stroke={STROKE} strokeWidth="1.4" />

      {/* ---- Christ the Redeemer Statue ---- */}
      {/* outstretched arms — horizontal cross-bar form */}
      <g style={alive ? { animation: 'glow-pulse 2.8s ease-in-out infinite' } : null}>
        {/* full arm-span horizontal beam */}
        <rect x="174" y="172" width="252" height="22" {...reg(fills, onRegion, 'arms')} />
        {/* sleeves taper — left */}
        <path d="M 174 172 L 174 194 L 156 200 L 156 178 Z" {...reg(fills, onRegion, 'sleeve-l')} />
        {/* hand-l */}
        <ellipse cx="148" cy="190" rx="10" ry="6" {...reg(fills, onRegion, 'hand-l')} />
        {/* sleeves taper — right */}
        <path d="M 426 172 L 426 194 L 444 200 L 444 178 Z" {...reg(fills, onRegion, 'sleeve-r')} />
        <ellipse cx="452" cy="190" rx="10" ry="6" {...reg(fills, onRegion, 'hand-r')} />
      </g>

      {/* robe / body — long vertical drape */}
      <path d="M 264 194 L 336 194 L 348 270 L 252 270 Z" {...reg(fills, onRegion, 'robe')} />
      {/* robe fold lines */}
      <line x1="280" y1="200" x2="276" y2="266" stroke={STROKE} strokeWidth="1.6" />
      <line x1="300" y1="200" x2="300" y2="266" stroke={STROKE} strokeWidth="1.6" />
      <line x1="320" y1="200" x2="324" y2="266" stroke={STROKE} strokeWidth="1.6" />

      {/* neck (collar of robe) */}
      <path d="M 288 170 L 312 170 L 314 188 L 286 188 Z" {...reg(fills, onRegion, 'neck')} />

      {/* head */}
      <ellipse cx="300" cy="150" rx="22" ry="26" {...reg(fills, onRegion, 'face')} />
      {/* hair flowing back */}
      <path d="M 280 144 Q 274 116 300 110 Q 326 116 320 144 Q 312 130 300 130 Q 288 130 280 144 Z" {...reg(fills, onRegion, 'hair')} />
      {/* beard */}
      <path d="M 286 162 Q 290 180 300 184 Q 310 180 314 162 Q 308 174 300 174 Q 292 174 286 162 Z" {...reg(fills, onRegion, 'beard')} />
      {/* face features */}
      <circle cx="292" cy="148" r="1.6" fill={STROKE} stroke="none" />
      <circle cx="308" cy="148" r="1.6" fill={STROKE} stroke="none" />
      <path d="M 296 162 Q 300 164 304 162" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* small bird flying near statue */}
      <g style={alive ? { animation: 'gentle-bob 1.8s ease-in-out infinite' } : null}>
        <path d="M 88 230 Q 96 224 104 230 Q 112 224 120 230" fill="none" stroke={STROKE} strokeWidth="2" />
      </g>
      <g style={alive ? { animation: 'gentle-bob 2.2s ease-in-out infinite', animationDelay: '0.3s' } : null}>
        <path d="M 480 250 Q 488 244 496 250 Q 504 244 512 250" fill="none" stroke={STROKE} strokeWidth="2" />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>RIO DE JANEIRO · 1931</text>
    </svg>
  );
}

// ============================================================
// Page entries
// ============================================================
const LATIN_AMERICAN_PAGES = [
  {
    id: 'machu-picchu',
    title: 'Machu Picchu',
    subtitle: 'High in the Andes, c. 1450',
    collection: 'world',
    eraLabel: 'Inca Empire',
    eraColor: '#6B7F4F',
    bgPreview: '#D7E0CC',
    fact: "The Inca built Machu Picchu without using wheels, iron tools, or mortar — fitting giant stones together so tightly that even today you cannot slide a knife between them.",
    Component: MachuPicchuSVG,
    readingLevel: { lexile: 760, gradeBand: '3–4', guidedReading: 'N', wordCount: 26, complexity: 'Moderate' },
    keyVocab: ['Inca', 'Andes', 'terrace', 'llama', 'citadel'],
    standards: ['RI.3.7', 'RI.3.4', 'RI.4.1', 'SL.3.2'],
    regions: ['sky','sun','cloud-l','cloud-r','peak-main','peak-main-shade','peak-l','peak-r','terrace-1','terrace-2','terrace-3','terrace-4','plaza-base','temple-sun','building-c','building-r','roof-thatch','ground','llama-body','llama-leg-fl','llama-leg-fr','llama-leg-bl','llama-leg-br','llama-neck','llama-head','llama-ear-l','llama-ear-r','llama-tail','banner'],
    quest: {
      heading: 'City in the Clouds',
      author: 'Inca Empire · c. 1450',
      lines: [
        'I am a stone city high in the mountains of {0}.',
        'The mighty {1} people built me without wheels.',
        'My friendly woolly neighbor is the {2}.',
      ],
      blanks: [
        { answer: 'Peru',  choices: ['Peru',  'Pear',    'Penguin', 'Pumpkin'] },
        { answer: 'Inca',  choices: ['Inca',  'Iguana',  'Igloo',   'Ink']     },
        { answer: 'llama', choices: ['llama', 'lemon',   'lizard',  'lobster'] },
      ],
      voice: {
        // Calm, awe-struck narrator
        hints: [/daniel/i, /alex/i, /tom/i, /samantha/i, /microsoft (mark|guy|aria)/i],
        rate: 0.78, pitch: 0.92,
      },
    },
  },
  {
    id: 'aztec-sun-stone',
    title: 'The Aztec Sun Stone',
    subtitle: 'Tenochtitlan, 1479',
    collection: 'world',
    eraLabel: 'Aztec Empire',
    eraColor: '#A23B23',
    bgPreview: '#E8C292',
    fact: "The Aztec Sun Stone is carved from a single block of basalt almost twelve feet wide and weighs 24 tons. At its center is the face of the sun god Tonatiuh.",
    Component: AztecSunStoneSVG,
    readingLevel: { lexile: 820, gradeBand: '4–5', guidedReading: 'P', wordCount: 26, complexity: 'Challenging' },
    keyVocab: ['Aztec', 'calendar', 'glyph', 'basalt', 'cosmos'],
    standards: ['RI.4.4', 'RI.4.7', 'L.4.4', 'SL.4.2'],
    regions: ['background','ring-serpent','ring-days','ring-inner','box-tl','box-tr','box-bl','box-br','face-disc','headdress','face','tongue','cheek-l','cheek-r','ear-l','ear-r','ray-0','ray-1','ray-2','ray-3','ray-4','ray-5','ray-6','ray-7','ray-8','ray-9','ray-10','ray-11','ray-12','ray-13','ray-14','ray-15','banner'],
    quest: {
      heading: 'The Calendar Stone',
      author: 'Aztec Empire · 1479',
      lines: [
        'I am a great stone calendar made by the {0}.',
        'At my center is the face of the {1}.',
        'My twenty signs mark each day of the {2}.',
      ],
      blanks: [
        { answer: 'Aztecs', choices: ['Aztecs', 'Apples', 'Ants',    'Anchors'] },
        { answer: 'sun',    choices: ['sun',    'sock',   'snail',   'sponge']  },
        { answer: 'month',  choices: ['month',  'muffin', 'monkey',  'mailbox'] },
      ],
      voice: {
        // Mysterious, ancient narrator
        hints: [/daniel/i, /alex/i, /bruce/i, /tom/i, /reed/i, /microsoft mark/i],
        rate: 0.74, pitch: 0.82,
      },
    },
  },
  {
    id: 'mayan-pyramid',
    title: 'The Mayan Pyramid',
    subtitle: 'Chichén Itzá, Mexico',
    collection: 'world',
    eraLabel: 'Maya Civilization',
    eraColor: '#2E7D5F',
    bgPreview: '#CDDEC5',
    fact: "The Maya pyramid called El Castillo has exactly 365 steps — one for every day of the year. Twice a year, sunlight on the staircase casts the shadow of a slithering serpent.",
    Component: MayanPyramidSVG,
    readingLevel: { lexile: 800, gradeBand: '4–5', guidedReading: 'O', wordCount: 30, complexity: 'Challenging' },
    keyVocab: ['Maya', 'pyramid', 'temple', 'serpent', 'astronomer'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','cloud','jungle','step-0','step-1','step-2','step-3','step-4','step-5','step-6','step-7','step-8','stair','stair-rail-l','stair-rail-r','serpent-l','serpent-l-mouth','serpent-r','serpent-r-mouth','temple','temple-roof','roof-comb','temple-door','ground','palm-trunk','palm-leaf-l','palm-leaf-r','palm-leaf-u','palm-leaf-d','stone','iguana-body','iguana-head','banner'],
    quest: {
      heading: 'Temple of the Serpent',
      author: 'Maya · c. 1000 AD',
      lines: [
        'I am a step pyramid hidden in the {0}.',
        'My great staircase has 365 {1}, one for each day.',
        'The Maya watched the stars from my high {2}.',
      ],
      blanks: [
        { answer: 'jungle', choices: ['jungle', 'jelly',   'jumprope', 'jeep']    },
        { answer: 'steps',  choices: ['steps',  'spoons',  'sneakers', 'songs']   },
        { answer: 'temple', choices: ['temple', 'toaster', 'turtle',   'tunnel']  },
      ],
      voice: {
        // Mysterious storyteller
        hints: [/daniel/i, /alex/i, /tom/i, /bruce/i, /samantha/i, /microsoft (mark|aria)/i],
        rate: 0.78, pitch: 0.86,
      },
    },
  },
  {
    id: 'christ-redeemer',
    title: 'Christ the Redeemer',
    subtitle: 'Rio de Janeiro, 1931',
    collection: 'world',
    eraLabel: 'Modern Brazil',
    eraColor: '#3B7EA1',
    bgPreview: '#CFE3F2',
    fact: "Christ the Redeemer stands 98 feet tall on the peak of Corcovado mountain. It took nine years to build, and its outstretched arms span 92 feet — wider than a basketball court.",
    Component: ChristRedeemerSVG,
    readingLevel: { lexile: 780, gradeBand: '3–4', guidedReading: 'N', wordCount: 28, complexity: 'Moderate' },
    keyVocab: ['Redeemer', 'mountain', 'statue', 'harbor', 'monument'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.3.7', 'SL.4.2'],
    regions: ['sky','sun','cloud-l','cloud-r','sugarloaf','bay','boat','boat-sail','shore','city-0','city-1','city-2','city-3','city-4','city-5','city-6','city-7','city-8','city-9','mountain','mountain-shade','pedestal','arms','sleeve-l','hand-l','sleeve-r','hand-r','robe','neck','face','hair','beard','banner'],
    quest: {
      heading: 'Watching Over Rio',
      author: 'Brazil · 1931',
      lines: [
        'I stand on a mountain above the city of {0}.',
        'My open {1} welcome the whole world.',
        'I look out over the country of {2}.',
      ],
      blanks: [
        { answer: 'Rio',    choices: ['Rio',    'Robot',  'Raisin', 'Rocket'] },
        { answer: 'arms',   choices: ['arms',   'apples', 'ants',   'aprons'] },
        { answer: 'Brazil', choices: ['Brazil', 'Bread',  'Bridge', 'Bunny']  },
      ],
      voice: {
        // Warm, welcoming narrator
        hints: [/samantha/i, /allison/i, /thomas/i, /daniel/i, /microsoft (aria|guy|jenny)/i],
        rate: 0.82, pitch: 0.96,
      },
    },
  },
];

if (window.PAGES_DATA && Array.isArray(window.PAGES_DATA)) {
  LATIN_AMERICAN_PAGES.forEach(p => window.PAGES_DATA.push(p));
}

Object.assign(window, { MachuPicchuSVG, AztecSunStoneSVG, MayanPyramidSVG, ChristRedeemerSVG });
