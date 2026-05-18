// =================================================================
// More European history coloring pages — 4 additions filling gaps:
// Ancient Rome, the Middle Ages, English Renaissance, and 19th-c. France.
// =================================================================

// ----- 15. THE ROMAN COLOSSEUM — c. 80 AD -----
function ColosseumSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '500px 120px' } : null}>
        <circle cx="500" cy="120" r="40" {...reg(fills, onRegion, 'sun')} />
      </g>
      <path d="M 90 100 Q 90 80 112 80 Q 118 66 138 66 Q 158 66 162 80 Q 182 80 182 100 Z" {...reg(fills, onRegion, 'cloud')} />
      {/* ground / arena floor */}
      <path d="M 20 500 Q 200 488 380 500 Q 480 490 580 500 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'ground')} />
      {/* ---- Colosseum facade, 4 tiers ---- */}
      {/* tier 4 attic */}
      <rect x="90" y="240" width="420" height="60" {...reg(fills, onRegion, 'tier-4-attic')} />
      {/* tier 3 */}
      <rect x="90" y="300" width="420" height="60" {...reg(fills, onRegion, 'tier-3')} />
      {/* tier 2 */}
      <rect x="90" y="360" width="420" height="60" {...reg(fills, onRegion, 'tier-2')} />
      {/* tier 1 (bottom) */}
      <rect x="90" y="420" width="420" height="60" {...reg(fills, onRegion, 'tier-1')} />
      {/* partial ruined right edge — diagonal step */}
      <polygon points="510,240 530,280 530,320 510,360 510,240" {...reg(fills, onRegion, 'ruin-step')} />
      {/* tier 1 arches */}
      {[0,1,2,3,4,5].map(i => {
        const x = 110 + i * 70;
        return (
          <path key={`a1-${i}`}
            d={`M ${x} 478 L ${x} 446 Q ${x+25} 426 ${x+50} 446 L ${x+50} 478 Z`}
            {...reg(fills, onRegion, `arch1-${i}`)} />
        );
      })}
      {/* tier 2 arches */}
      {[0,1,2,3,4,5].map(i => {
        const x = 110 + i * 70;
        return (
          <path key={`a2-${i}`}
            d={`M ${x} 418 L ${x} 388 Q ${x+25} 368 ${x+50} 388 L ${x+50} 418 Z`}
            {...reg(fills, onRegion, `arch2-${i}`)} />
        );
      })}
      {/* tier 3 arches */}
      {[0,1,2,3,4,5].map(i => {
        const x = 110 + i * 70;
        return (
          <path key={`a3-${i}`}
            d={`M ${x} 358 L ${x} 328 Q ${x+25} 308 ${x+50} 328 L ${x+50} 358 Z`}
            {...reg(fills, onRegion, `arch3-${i}`)} />
        );
      })}
      {/* attic windows — rectangles */}
      {[0,1,2,3,4,5].map(i => {
        const x = 122 + i * 70;
        return <rect key={`w-${i}`} x={x} y={258} width="22" height="28" {...reg(fills, onRegion, `window-${i}`)} />;
      })}
      {/* column lines between arches — non-colorable */}
      {[0,1,2,3,4,5,6].map(i => {
        const x = 110 + i * 70;
        return <line key={`c-${i}`} x1={x} y1="240" x2={x} y2="478" stroke={STROKE} strokeWidth="1.6" />;
      })}
      {/* Roman standard with banner */}
      <line x1="560" y1="540" x2="560" y2="380" stroke={STROKE} strokeWidth="3" />
      <g style={alive ? { animation: 'wave-flag 3s ease-in-out infinite', transformOrigin: '560px 400px' } : null}>
        <path d="M 560 380 L 596 388 L 588 400 L 596 412 L 588 424 L 596 436 L 560 432 Z" {...reg(fills, onRegion, 'standard-banner')} />
        <text x="578" y="412" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="9" fontWeight="900" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>SPQR</text>
      </g>
      {/* eagle finial on top of pole */}
      <path d="M 560 380 L 556 370 L 564 370 Z" fill={STROKE} stroke="none" />
      {/* banner */}
      <rect x="180" y="528" width="240" height="38" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="554" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="20" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>ROMA · 80 AD</text>
    </svg>
  );
}

// ----- 16. MEDIEVAL CASTLE — c. 1200 -----
function CastleSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '110px 110px' } : null}>
        <circle cx="110" cy="110" r="32" {...reg(fills, onRegion, 'sun')} />
      </g>
      <path d="M 380 90 Q 380 70 402 70 Q 408 56 428 56 Q 448 56 452 70 Q 472 70 472 90 Z" {...reg(fills, onRegion, 'cloud')} />
      {/* distant mountains */}
      <polygon points="20,360 200,220 380,360" {...reg(fills, onRegion, 'mountain-l')} />
      <polygon points="280,360 440,200 600,360" {...reg(fills, onRegion, 'mountain-r')} />
      {/* hill the castle sits on */}
      <path d="M 20 470 Q 200 380 380 470 Q 480 410 580 470 L 580 540 L 20 540 Z" {...reg(fills, onRegion, 'hill')} />
      {/* moat in the foreground */}
      <path d="M 20 520 Q 300 512 580 520 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'moat')} />
      {/* moat ripples */}
      <path d="M 80 552 Q 110 546 140 552" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 360 552 Q 390 546 420 552" fill="none" stroke={STROKE} strokeWidth="1.4" />
      {/* ---- castle ---- */}
      {/* main body */}
      <rect x="180" y="320" width="240" height="160" {...reg(fills, onRegion, 'castle-body')} />
      {/* left tower */}
      <rect x="120" y="280" width="64" height="200" {...reg(fills, onRegion, 'tower-left')} />
      {/* right tower */}
      <rect x="416" y="280" width="64" height="200" {...reg(fills, onRegion, 'tower-right')} />
      {/* central keep */}
      <rect x="270" y="220" width="60" height="100" {...reg(fills, onRegion, 'keep')} />
      {/* crenellations — outline blocks */}
      {[120,138,156,174].map((x,i) => (
        <rect key={`bl-${i}`} x={x} y={270} width="8" height="10" fill={STROKE} stroke="none" />
      ))}
      {[416,434,452,470].map((x,i) => (
        <rect key={`br-${i}`} x={x} y={270} width="8" height="10" fill={STROKE} stroke="none" />
      ))}
      {[184,200,216,232,248,344,360,376,392,408].map((x,i) => (
        <rect key={`bc-${i}`} x={x} y={310} width="8" height="10" fill={STROKE} stroke="none" />
      ))}
      {[270,286,302,318].map((x,i) => (
        <rect key={`bk-${i}`} x={x} y={210} width="8" height="10" fill={STROKE} stroke="none" />
      ))}
      {/* tower roofs */}
      <path d="M 120 280 L 184 280 L 152 220 Z" {...reg(fills, onRegion, 'tower-roof-l')} />
      <path d="M 416 280 L 480 280 L 448 220 Z" {...reg(fills, onRegion, 'tower-roof-r')} />
      <path d="M 270 220 L 330 220 L 300 160 Z" {...reg(fills, onRegion, 'keep-roof')} />
      {/* windows */}
      <rect x="142" y="340" width="20" height="30" {...reg(fills, onRegion, 'window-l')} />
      <rect x="290" y="340" width="20" height="30" {...reg(fills, onRegion, 'window-c')} />
      <rect x="438" y="340" width="20" height="30" {...reg(fills, onRegion, 'window-r')} />
      {/* arrow slits — non-colorable */}
      <rect x="148" y="400" width="6" height="20" fill={STROKE} stroke="none" />
      <rect x="446" y="400" width="6" height="20" fill={STROKE} stroke="none" />
      {/* gate / portcullis */}
      <path d="M 270 480 L 330 480 L 330 400 Q 300 380 270 400 Z" {...reg(fills, onRegion, 'gate')} />
      <line x1="280" y1="404" x2="280" y2="478" stroke={STROKE} strokeWidth="1.4" />
      <line x1="300" y1="396" x2="300" y2="478" stroke={STROKE} strokeWidth="1.4" />
      <line x1="320" y1="404" x2="320" y2="478" stroke={STROKE} strokeWidth="1.4" />
      <line x1="270" y1="430" x2="330" y2="430" stroke={STROKE} strokeWidth="1.4" />
      {/* drawbridge */}
      <rect x="270" y="480" width="60" height="36" {...reg(fills, onRegion, 'drawbridge')} />
      <line x1="270" y1="480" x2="258" y2="432" stroke={STROKE} strokeWidth="2" />
      <line x1="330" y1="480" x2="342" y2="432" stroke={STROKE} strokeWidth="2" />
      {/* flags */}
      <g style={alive ? { animation: 'wave-flag 2.6s ease-in-out infinite', transformOrigin: '152px 200px' } : null}>
        <line x1="152" y1="220" x2="152" y2="190" stroke={STROKE} strokeWidth="2" />
        <path d="M 152 190 L 180 198 L 152 206 Z" {...reg(fills, onRegion, 'flag-l')} />
      </g>
      <g style={alive ? { animation: 'wave-flag 2.4s ease-in-out infinite', transformOrigin: '300px 140px' } : null}>
        <line x1="300" y1="160" x2="300" y2="130" stroke={STROKE} strokeWidth="2" />
        <path d="M 300 130 L 332 138 L 300 146 Z" {...reg(fills, onRegion, 'flag-c')} />
      </g>
      <g style={alive ? { animation: 'wave-flag 2.6s ease-in-out infinite', transformOrigin: '448px 200px' } : null}>
        <line x1="448" y1="220" x2="448" y2="190" stroke={STROKE} strokeWidth="2" />
        <path d="M 448 190 L 476 198 L 448 206 Z" {...reg(fills, onRegion, 'flag-r')} />
      </g>
      {/* knight in front-left */}
      <g transform="translate(110, 500)">
        <ellipse cx="0" cy="-10" rx="11" ry="22" {...reg(fills, onRegion, 'knight-armor')} />
        <ellipse cx="0" cy="-34" rx="9" ry="11" {...reg(fills, onRegion, 'knight-helmet')} />
        <line x1="-5" y1="-34" x2="5" y2="-34" stroke={STROKE} strokeWidth="1.4" />
        <line x1="0" y1="-46" x2="0" y2="-56" stroke={STROKE} strokeWidth="2" />
        <path d="M -5 -52 L 5 -52 L 0 -60 Z" {...reg(fills, onRegion, 'knight-plume')} />
        <path d="M 12 -16 L 26 -16 L 26 0 Q 19 8 19 8 Q 12 0 12 -16 Z" {...reg(fills, onRegion, 'shield')} />
        <line x1="-13" y1="2" x2="-13" y2="-22" stroke={STROKE} strokeWidth="2" />
        <line x1="-18" y1="-22" x2="-8" y2="-22" stroke={STROKE} strokeWidth="2" />
      </g>
      {/* banner */}
      <rect x="190" y="540" width="220" height="32" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="562" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="18" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>MIDDLE AGES · c. 1200</text>
    </svg>
  );
}

// ----- 17. SHAKESPEARE'S GLOBE THEATRE — London, 1599 -----
function ShakespeareSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '500px 100px' } : null}>
        <circle cx="500" cy="100" r="32" {...reg(fills, onRegion, 'sun')} />
      </g>
      <path d="M 80 90 Q 80 70 102 70 Q 108 56 128 56 Q 148 56 152 70 Q 172 70 172 90 Z" {...reg(fills, onRegion, 'cloud')} />
      {/* Thames river behind */}
      <path d="M 20 482 Q 200 472 380 482 Q 480 474 580 482 L 580 512 L 20 512 Z" {...reg(fills, onRegion, 'thames')} />
      {/* grass foreground */}
      <path d="M 20 512 L 580 512 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'grass')} />
      {/* ---- Globe Theatre ---- */}
      {/* lower drum */}
      <path d="M 200 482 L 460 482 L 470 440 L 190 440 Z" {...reg(fills, onRegion, 'globe-base')} />
      {/* mid drum */}
      <path d="M 190 440 L 470 440 L 478 398 L 182 398 Z" {...reg(fills, onRegion, 'globe-mid')} />
      {/* upper drum */}
      <path d="M 182 398 L 478 398 L 484 360 L 176 360 Z" {...reg(fills, onRegion, 'globe-upper')} />
      {/* thatched roof */}
      <path d="M 176 360 L 484 360 L 460 304 L 200 304 Z" {...reg(fills, onRegion, 'thatched-roof')} />
      {/* thatch texture — non-colorable lines */}
      {[200,224,248,272,296,320,344,368,392,416,440].map((x,i) => (
        <line key={`th-${i}`} x1={x} y1="360" x2={x + 10} y2="320" stroke={STROKE} strokeWidth="1" />
      ))}
      {/* flag house */}
      <rect x="320" y="274" width="20" height="30" {...reg(fills, onRegion, 'flag-housing')} />
      <line x1="330" y1="274" x2="330" y2="242" stroke={STROKE} strokeWidth="2.4" />
      <g style={alive ? { animation: 'wave-flag 2.6s ease-in-out infinite', transformOrigin: '330px 254px' } : null}>
        <path d="M 330 242 L 372 250 L 360 262 L 372 274 L 330 272 Z" {...reg(fills, onRegion, 'globe-flag')} />
      </g>
      {/* upper-tier window arches — non-colorable */}
      {[210,250,290,330,370,410,450].map((x,i) => (
        <path key={`u-${i}`}
          d={`M ${x} 398 L ${x} 378 Q ${x+8} 370 ${x+16} 378 L ${x+16} 398`}
          fill="none" stroke={STROKE} strokeWidth="1.6" />
      ))}
      {/* mid-tier rectangle windows */}
      {[210,254,298,342,386,430].map((x,i) => (
        <rect key={`m-${i}`} x={x} y={412} width="16" height="22" fill="none" stroke={STROKE} strokeWidth="1.6" />
      ))}
      {/* lower-tier entrance */}
      <path d="M 314 482 L 314 446 Q 330 432 346 446 L 346 482 Z" {...reg(fills, onRegion, 'globe-door')} />
      {/* "GLOBE" label — non-colorable */}
      <text x="330" y="468" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="10" fontWeight="900" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>GLOBE</text>
      {/* ---- Shakespeare in foreground ---- */}
      <g transform="translate(120, 480)">
        <path d="M -28 60 Q -28 0 0 -10 Q 28 0 28 60 Z" {...reg(fills, onRegion, 'shakes-cloak')} />
        <ellipse cx="0" cy="-14" rx="22" ry="8" {...reg(fills, onRegion, 'shakes-ruff')} />
        <ellipse cx="0" cy="-36" rx="14" ry="18" {...reg(fills, onRegion, 'shakes-face')} />
        <path d="M -14 -38 Q -14 -56 0 -54 Q 14 -56 14 -38 Q 8 -50 0 -50 Q -8 -50 -14 -38 Z" {...reg(fills, onRegion, 'shakes-hair')} />
        <path d="M -3 -22 L 3 -22 L 0 -14 Z" {...reg(fills, onRegion, 'shakes-beard')} />
        <path d="M -6 -28 Q 0 -26 6 -28" fill="none" stroke={STROKE} strokeWidth="1.4" />
        <circle cx="-4" cy="-38" r="1.4" fill={STROKE} stroke="none" />
        <circle cx="4" cy="-38" r="1.4" fill={STROKE} stroke="none" />
        <line x1="22" y1="14" x2="40" y2="-12" stroke={STROKE} strokeWidth="2.4" />
        <path d="M 40 -12 Q 46 -22 56 -22 Q 50 -10 48 0 Q 50 8 42 8 Z" {...reg(fills, onRegion, 'shakes-quill')} />
      </g>
      {/* scroll on the grass */}
      <g transform="translate(450, 540)">
        <rect x="-22" y="0" width="44" height="14" {...reg(fills, onRegion, 'scroll-body')} />
        <ellipse cx="-22" cy="7" rx="4" ry="7" {...reg(fills, onRegion, 'scroll-end-l')} />
        <ellipse cx="22" cy="7" rx="4" ry="7" {...reg(fills, onRegion, 'scroll-end-r')} />
        <line x1="-16" y1="5" x2="16" y2="5" stroke={STROKE} strokeWidth="1" />
        <line x1="-14" y1="10" x2="12" y2="10" stroke={STROKE} strokeWidth="1" />
      </g>
      {/* banner */}
      <rect x="200" y="528" width="200" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="552" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="18" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>LONDON · 1599</text>
    </svg>
  );
}

// ----- 18. EIFFEL TOWER — Paris, 1889 -----
function EiffelSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '100px 120px' } : null}>
        <circle cx="100" cy="120" r="34" {...reg(fills, onRegion, 'sun')} />
      </g>
      <path d="M 380 80 Q 380 60 402 60 Q 408 46 428 46 Q 448 46 452 60 Q 472 60 472 80 Z" {...reg(fills, onRegion, 'cloud')} />
      {/* Hausmann buildings flanking */}
      <rect x="40" y="380" width="100" height="90" {...reg(fills, onRegion, 'building-l-1')} />
      <polygon points="40,380 140,380 130,348 50,348" {...reg(fills, onRegion, 'roof-l-1')} />
      <rect x="140" y="400" width="80" height="70" {...reg(fills, onRegion, 'building-l-2')} />
      <polygon points="140,400 220,400 210,370 150,370" {...reg(fills, onRegion, 'roof-l-2')} />
      <rect x="450" y="390" width="90" height="80" {...reg(fills, onRegion, 'building-r-1')} />
      <polygon points="450,390 540,390 530,358 460,358" {...reg(fills, onRegion, 'roof-r-1')} />
      <rect x="540" y="410" width="40" height="60" {...reg(fills, onRegion, 'building-r-2')} />
      {/* Hausmann windows — non-colorable */}
      {[60,90,158,178,468,498].map((x,i) => (
        <rect key={`hw-${i}`} x={x} y={400} width="14" height="22" fill="none" stroke={STROKE} strokeWidth="1.4" />
      ))}
      {/* French flag on left building */}
      <line x1="90" y1="348" x2="90" y2="312" stroke={STROKE} strokeWidth="2" />
      <g style={alive ? { animation: 'wave-flag 2.6s ease-in-out infinite', transformOrigin: '90px 324px' } : null}>
        <rect x="90" y="312" width="14" height="24" {...reg(fills, onRegion, 'flag-blue')} />
        <rect x="104" y="312" width="14" height="24" {...reg(fills, onRegion, 'flag-white')} />
        <rect x="118" y="312" width="14" height="24" {...reg(fills, onRegion, 'flag-red')} />
      </g>
      {/* Seine river */}
      <path d="M 20 470 Q 200 460 380 470 Q 480 462 580 470 L 580 512 L 20 512 Z" {...reg(fills, onRegion, 'seine')} />
      {/* embankment */}
      <path d="M 20 512 L 580 512 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'embankment')} />
      {/* Seine ripples — non-colorable */}
      <path d="M 80 488 Q 110 482 140 488" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 460 490 Q 490 484 520 490" fill="none" stroke={STROKE} strokeWidth="1.4" />
      {/* ---- Eiffel Tower ---- */}
      {/* base — flared 4-leg silhouette */}
      <path d="M 220 470 L 280 380 L 320 380 L 380 470 L 358 470 L 320 400 L 280 400 L 242 470 Z" {...reg(fills, onRegion, 'tower-base')} />
      {/* level 1 platform */}
      <rect x="240" y="370" width="120" height="20" {...reg(fills, onRegion, 'platform-1')} />
      {/* mid-section */}
      <path d="M 270 370 L 285 270 L 315 270 L 330 370 Z" {...reg(fills, onRegion, 'tower-mid')} />
      {/* level 2 platform */}
      <rect x="278" y="260" width="44" height="14" {...reg(fills, onRegion, 'platform-2')} />
      {/* top section */}
      <path d="M 288 260 L 294 178 L 306 178 L 312 260 Z" {...reg(fills, onRegion, 'tower-top')} />
      {/* peak / antenna */}
      <path d="M 296 178 L 304 178 L 300 128 Z" {...reg(fills, onRegion, 'tower-peak')} />
      <line x1="300" y1="128" x2="300" y2="98" stroke={STROKE} strokeWidth="2" />
      <circle cx="300" cy="98" r="3" fill={STROKE} stroke="none" />
      {/* lattice diagonals — non-colorable */}
      <line x1="240" y1="470" x2="320" y2="380" stroke={STROKE} strokeWidth="1" />
      <line x1="358" y1="470" x2="280" y2="380" stroke={STROKE} strokeWidth="1" />
      <line x1="260" y1="430" x2="340" y2="430" stroke={STROKE} strokeWidth="1" />
      <line x1="270" y1="410" x2="330" y2="410" stroke={STROKE} strokeWidth="1" />
      <line x1="278" y1="340" x2="322" y2="340" stroke={STROKE} strokeWidth="1" />
      <line x1="284" y1="310" x2="316" y2="310" stroke={STROKE} strokeWidth="1" />
      <line x1="289" y1="240" x2="311" y2="240" stroke={STROKE} strokeWidth="1" />
      <line x1="292" y1="210" x2="308" y2="210" stroke={STROKE} strokeWidth="1" />
      {/* banner */}
      <rect x="170" y="528" width="260" height="38" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="554" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="20" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>PARIS · 1889</text>
    </svg>
  );
}

// ----- Page entries -----
const EUROPE_HISTORY_PAGES = [
  {
    id: 'colosseum',
    title: 'The Roman Colosseum',
    subtitle: 'Rome, c. 80 AD',
    collection: 'world',
    eraLabel: 'Ancient Rome',
    eraColor: '#A0522D',
    bgPreview: '#F0DEC5',
    fact: "The Colosseum held 50,000 spectators — almost as many as a modern football stadium. It has stood for nearly 2,000 years.",
    Component: ColosseumSVG,
    regions: ['sky','sun','cloud','ground','tier-4-attic','tier-3','tier-2','tier-1','ruin-step','arch1-0','arch1-1','arch1-2','arch1-3','arch1-4','arch1-5','arch2-0','arch2-1','arch2-2','arch2-3','arch2-4','arch2-5','arch3-0','arch3-1','arch3-2','arch3-3','arch3-4','arch3-5','window-0','window-1','window-2','window-3','window-4','window-5','standard-banner','banner'],
    readingLevel: { lexile: 720, gradeBand: '3–4', guidedReading: 'N', wordCount: 22, complexity: 'Moderate' },
    keyVocab: ['amphitheater', 'arches', 'marble', 'gladiator'],
    standards: ['RI.3.7', 'RI.3.1', 'L.3.4', 'SL.3.2'],
    quest: {
      heading: 'Voice of Rome',
      author: 'Ancient Rome · c. 80 AD',
      lines: [
        'I am built of marble and {0}.',
        'I rise above the mighty city of {1}.',
        'I have stood for two thousand {2}.',
      ],
      blanks: [
        { answer: 'stone', choices: ['stone', 'soap',    'string',  'snowman'] },
        { answer: 'Rome',  choices: ['Rome',  'Raisin',  'Rabbit',  'Ribbon'] },
        { answer: 'years', choices: ['years', 'yawns',   'yarns',   'yo-yos'] },
      ],
      voice: {
        // Deep, weighty, ancient narrator
        hints: [/bruce/i, /daniel/i, /tom/i, /fred/i, /alex/i, /microsoft mark/i],
        rate: 0.72, pitch: 0.80,
      },
    },
  },
  {
    id: 'castle',
    title: 'Medieval Castle',
    subtitle: 'Europe, c. 1200',
    collection: 'world',
    eraLabel: 'Middle Ages',
    eraColor: '#605244',
    bgPreview: '#C9D4DE',
    fact: "Medieval castles took 20 to 30 years to build — and once finished, a small army of knights, servants, and animals lived inside.",
    Component: CastleSVG,
    regions: ['sky','sun','cloud','mountain-l','mountain-r','hill','moat','castle-body','tower-left','tower-right','keep','tower-roof-l','tower-roof-r','keep-roof','window-l','window-c','window-r','gate','drawbridge','flag-l','flag-c','flag-r','knight-armor','knight-helmet','knight-plume','shield','banner'],
    readingLevel: { lexile: 600, gradeBand: '2–3', guidedReading: 'L', wordCount: 22, complexity: 'Easy' },
    keyVocab: ['kingdom', 'knight', 'moat', 'drawbridge'],
    standards: ['RI.2.4', 'RI.2.1', 'SL.2.2'],
    quest: {
      heading: 'A Knight\u2019s Oath',
      author: 'Medieval Europe · c. 1200',
      lines: [
        'I am a strong {0} on a hill,',
        'guarded by a brave {1} with sword and shield.',
        'In the Middle {2} we keep the kingdom safe.',
      ],
      blanks: [
        { answer: 'castle', choices: ['castle', 'cookie',  'carrot',  'camel'] },
        { answer: 'knight', choices: ['knight', 'kitten',  'kazoo',   'kayak'] },
        { answer: 'Ages',   choices: ['Ages',   'Apples',  'Aunts',   'Acorns'] },
      ],
      voice: {
        // Stately, slow, somewhat formal narrator
        hints: [/daniel/i, /reed/i, /tom/i, /alex/i, /bruce/i, /microsoft (mark|guy|davis)/i],
        rate: 0.76, pitch: 0.88,
      },
    },
  },
  {
    id: 'shakespeare',
    title: 'Shakespeare\u2019s Globe',
    subtitle: 'London, 1599',
    collection: 'world',
    eraLabel: 'English Renaissance',
    eraColor: '#4A2E5C',
    bgPreview: '#E5D4B7',
    fact: "Shakespeare wrote 37 plays and 154 sonnets — many performed first at the Globe Theatre, an open-air stage on the south bank of the Thames.",
    Component: ShakespeareSVG,
    regions: ['sky','sun','cloud','thames','grass','globe-base','globe-mid','globe-upper','thatched-roof','flag-housing','globe-flag','globe-door','shakes-cloak','shakes-ruff','shakes-face','shakes-hair','shakes-beard','shakes-quill','scroll-body','scroll-end-l','scroll-end-r','banner'],
    readingLevel: { lexile: 850, gradeBand: '4–5', guidedReading: 'P', wordCount: 18, complexity: 'Challenging' },
    keyVocab: ['stage', 'soliloquy', 'sonnet', 'brevity'],
    standards: ['RL.4.4', 'RL.4.1', 'L.4.4', 'SL.4.2'],
    quest: {
      heading: 'The Bard\u2019s Lines',
      author: 'William Shakespeare · 1599–1603',
      lines: [
        'All the world\u2019s a {0}.',
        'What is in a {1}?',
        'Brevity is the soul of {2}.',
      ],
      blanks: [
        { answer: 'stage', choices: ['stage', 'sock',  'sandwich', 'sneeze'] },
        { answer: 'name',  choices: ['name',  'noodle','nest',     'newt'] },
        { answer: 'wit',   choices: ['wit',   'wig',   'wagon',    'walnut'] },
      ],
      voice: {
        // English theatrical voice if available
        hints: [/daniel/i, /serena/i, /oliver/i, /martha/i, /microsoft (george|hazel)/i, /alex/i],
        rate: 0.80, pitch: 0.94,
      },
    },
  },
  {
    id: 'eiffel',
    title: 'The Eiffel Tower',
    subtitle: 'Paris, 1889',
    collection: 'world',
    eraLabel: 'Belle Époque',
    eraColor: '#C77F90',
    bgPreview: '#F5D5DC',
    fact: "Built for the 1889 World\u2019s Fair, the Eiffel Tower used 18,000 iron pieces and 2.5 million rivets. For 41 years, it was the tallest structure on Earth.",
    Component: EiffelSVG,
    regions: ['sky','sun','cloud','building-l-1','roof-l-1','building-l-2','roof-l-2','building-r-1','roof-r-1','building-r-2','flag-blue','flag-white','flag-red','seine','embankment','tower-base','platform-1','tower-mid','platform-2','tower-top','tower-peak','banner'],
    readingLevel: { lexile: 780, gradeBand: '3–4', guidedReading: 'N', wordCount: 22, complexity: 'Moderate' },
    keyVocab: ['liberty', 'iron', 'engineer', 'tricolor'],
    standards: ['RI.4.4', 'RI.3.7', 'SL.4.2', 'L.4.4'],
    quest: {
      heading: 'A Parisian Welcome',
      author: 'France · 1889',
      lines: [
        'I am a tower of {0}',
        'rising above the silver river {1}.',
        'My country stands for {2}, equality, and brotherhood.',
      ],
      blanks: [
        { answer: 'iron',    choices: ['iron',    'icing',   'ivy',      'igloo'] },
        { answer: 'Seine',   choices: ['Seine',   'Salt',    'Snack',    'Square'] },
        { answer: 'liberty', choices: ['liberty', 'laundry', 'lollipop', 'lemonade'] },
      ],
      voice: {
        // Slightly lilting European narrator
        hints: [/thomas/i, /audrey/i, /amelie/i, /daniel/i, /serena/i, /alex/i, /microsoft (henri|julie|hazel)/i],
        rate: 0.82, pitch: 0.96,
      },
    },
  },
];

if (window.PAGES_DATA && Array.isArray(window.PAGES_DATA)) {
  EUROPE_HISTORY_PAGES.forEach(p => window.PAGES_DATA.push(p));
}

Object.assign(window, { ColosseumSVG, CastleSVG, ShakespeareSVG, EiffelSVG });
