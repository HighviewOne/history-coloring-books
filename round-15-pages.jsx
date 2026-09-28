// =================================================================
// Round 15 additions — 4 more pages filling major gaps:
//   • Hagia Sophia (Byzantine/Ottoman, 537 AD)
//   • Marco Polo on the Silk Road (1271)
//   • Joan of Arc (Orléans, 1429)
//   • Harriet Tubman & the Underground Railroad
// =================================================================

// ----- 59. HAGIA SOPHIA — Constantinople/Istanbul, 537 AD -----
function HagiaSophiaSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky — twilight pink/purple */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun/moon */}
      <g style={alive ? { animation: 'sun-pulse 2.8s ease-in-out infinite', transformOrigin: '500px 100px' } : null}>
        <circle cx="500" cy="100" r="30" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* small stars */}
      <g style={alive ? { animation: 'twinkle 2s ease-in-out infinite' } : null}>
        <circle cx="120" cy="80" r="2" fill={STROKE} stroke="none" />
        <circle cx="180" cy="60" r="1.6" fill={STROKE} stroke="none" />
        <circle cx="250" cy="100" r="1.6" fill={STROKE} stroke="none" />
        <circle cx="380" cy="70" r="2" fill={STROKE} stroke="none" />
      </g>

      {/* Bosphorus water in distance */}
      <path d="M 20 460 L 580 460 L 580 510 L 20 510 Z" {...reg(fills, onRegion, 'bosphorus')} />
      <path d="M 60 482 Q 100 476 140 482" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 220 488 Q 260 482 300 488" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 440 482 Q 480 476 520 482" fill="none" stroke={STROKE} strokeWidth="1.4" />
      {/* tiny ferry */}
      <g style={alive ? { animation: 'gentle-bob 2.8s ease-in-out infinite' } : null}>
        <path d="M 76 478 L 132 478 L 124 490 L 84 490 Z" {...reg(fills, onRegion, 'ferry')} />
        <rect x="92" y="466" width="32" height="12" {...reg(fills, onRegion, 'ferry-cabin')} />
        <line x1="108" y1="466" x2="108" y2="452" stroke={STROKE} strokeWidth="1.4" />
      </g>

      {/* foreground ground/plaza */}
      <path d="M 20 510 L 580 510 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'plaza')} />

      {/* ---- HAGIA SOPHIA ---- */}
      {/* base — square building */}
      <rect x="160" y="350" width="280" height="110" {...reg(fills, onRegion, 'base')} />
      {/* base arched windows */}
      {[180, 220, 260, 340, 380, 420].map((x,i) => (
        <path key={`bw-${i}`} d={`M ${x-12} 440 L ${x+12} 440 L ${x+12} 400 Q ${x} 388 ${x-12} 400 Z`} fill="none" stroke={STROKE} strokeWidth="1.6" />
      ))}
      {/* central main door */}
      <path d="M 286 460 L 314 460 L 314 408 Q 300 394 286 408 Z" {...reg(fills, onRegion, 'main-door')} />

      {/* side half-domes (Byzantine architecture) */}
      <path d="M 160 350 Q 160 296 220 290 Q 240 296 240 350 Z" {...reg(fills, onRegion, 'half-dome-l')} />
      <path d="M 440 350 Q 440 296 380 290 Q 360 296 360 350 Z" {...reg(fills, onRegion, 'half-dome-r')} />
      {/* half-dome windows */}
      <path d="M 180 326 L 192 326 L 192 312 Q 186 306 180 312 Z" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 208 326 L 220 326 L 220 312 Q 214 306 208 312 Z" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 380 326 L 392 326 L 392 312 Q 386 306 380 312 Z" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 408 326 L 420 326 L 420 312 Q 414 306 408 312 Z" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* central drum supporting main dome */}
      <rect x="240" y="290" width="120" height="40" {...reg(fills, onRegion, 'drum')} />
      {/* arched windows around drum */}
      {[260, 290, 320, 350].map((x,i) => (
        <path key={`dw-${i}`} d={`M ${x-7} 322 L ${x+7} 322 L ${x+7} 302 Q ${x} 296 ${x-7} 302 Z`} fill="none" stroke={STROKE} strokeWidth="1.4" />
      ))}

      {/* MAIN GREAT DOME */}
      <path d="M 232 290 Q 220 232 300 218 Q 380 232 368 290 Z" {...reg(fills, onRegion, 'main-dome')} />
      {/* dome ribs — non-colorable */}
      <line x1="244" y1="270" x2="252" y2="248" stroke={STROKE} strokeWidth="1.4" />
      <line x1="270" y1="248" x2="270" y2="226" stroke={STROKE} strokeWidth="1.4" />
      <line x1="300" y1="240" x2="300" y2="220" stroke={STROKE} strokeWidth="1.4" />
      <line x1="330" y1="248" x2="330" y2="226" stroke={STROKE} strokeWidth="1.4" />
      <line x1="356" y1="270" x2="348" y2="248" stroke={STROKE} strokeWidth="1.4" />
      {/* crescent moon finial on top (Ottoman addition) */}
      <line x1="300" y1="218" x2="300" y2="196" stroke={STROKE} strokeWidth="2.4" />
      <path d="M 294 192 Q 290 184 296 178 Q 304 184 300 196 Q 300 200 296 200 Z" {...reg(fills, onRegion, 'crescent')} />

      {/* ---- 4 MINARETS (Ottoman additions, one at each corner) ---- */}
      {[
        { x: 120, h: 260 },
        { x: 200, h: 240 },
        { x: 400, h: 240 },
        { x: 480, h: 260 },
      ].map((m, i) => (
        <g key={`min-${i}`}>
          <rect x={m.x - 8} y={m.h} width="16" height={460 - m.h} {...reg(fills, onRegion, `minaret-shaft-${i}`)} />
          {/* mid-balcony ring */}
          <rect x={m.x - 12} y={m.h + 30} width="24" height="6" {...reg(fills, onRegion, `minaret-band-${i}`)} />
          {/* top cap */}
          <rect x={m.x - 10} y={m.h - 12} width="20" height="12" {...reg(fills, onRegion, `minaret-cap-${i}`)} />
          {/* pointed pencil top */}
          <path d={`M ${m.x - 10} ${m.h - 12} L ${m.x + 10} ${m.h - 12} L ${m.x} ${m.h - 44} Z`} {...reg(fills, onRegion, `minaret-spire-${i}`)} />
          {/* tiny crescent on top */}
          <line x1={m.x} y1={m.h - 44} x2={m.x} y2={m.h - 56} stroke={STROKE} strokeWidth="1.6" />
          <circle cx={m.x} cy={m.h - 58} r="2" fill={STROKE} stroke="none" />
        </g>
      ))}

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>HAGIA SOPHIA · 537 AD</text>
    </svg>
  );
}

// ----- 60. MARCO POLO ON THE SILK ROAD — 1271 -----
function SilkRoadSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.6s ease-in-out infinite', transformOrigin: '110px 100px' } : null}>
        <circle cx="110" cy="100" r="32" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds */}
      <path d="M 380 80 Q 380 60 402 60 Q 408 46 428 46 Q 448 46 452 60 Q 472 60 472 80 Z" {...reg(fills, onRegion, 'cloud')} />

      {/* distant pagoda silhouette (far East destination) */}
      <g>
        <rect x="500" y="290" width="20" height="40" {...reg(fills, onRegion, 'pagoda-base')} />
        <path d="M 495 290 L 525 290 L 520 280 L 500 280 Z" {...reg(fills, onRegion, 'pagoda-roof-1')} />
        <rect x="503" y="270" width="14" height="14" {...reg(fills, onRegion, 'pagoda-tier')} />
        <path d="M 498 270 L 522 270 L 518 260 L 502 260 Z" {...reg(fills, onRegion, 'pagoda-roof-2')} />
      </g>

      {/* distant mountains */}
      <path d="M 20 360 Q 100 280 200 340 Q 300 280 400 340 Q 500 290 580 360 L 580 400 L 20 400 Z" {...reg(fills, onRegion, 'mountains')} />
      {/* snow caps */}
      <path d="M 188 296 L 212 296 L 218 312 L 184 312 Z" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 388 296 L 412 296 L 418 312 L 384 312 Z" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.4" />

      {/* sand dunes / desert */}
      <path d="M 20 400 Q 200 380 380 400 Q 480 388 580 400 L 580 500 L 20 500 Z" {...reg(fills, onRegion, 'desert-back')} />
      <path d="M 20 460 Q 200 446 380 460 Q 480 452 580 460 L 580 500 L 20 500 Z" {...reg(fills, onRegion, 'dune')} />

      {/* near ground */}
      <path d="M 20 500 L 580 500 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'ground')} />

      {/* caravanserai (rest stop) in distance */}
      <rect x="430" y="430" width="80" height="40" {...reg(fills, onRegion, 'caravanserai')} />
      <path d="M 430 430 L 510 430 L 500 416 L 440 416 Z" {...reg(fills, onRegion, 'caravanserai-roof')} />
      <path d="M 460 470 L 480 470 L 480 446 Q 470 438 460 446 Z" {...reg(fills, onRegion, 'caravanserai-door')} />

      {/* ---- CAMEL CARAVAN — 3 camels ---- */}
      {/* Camel 1 (lead, with Marco Polo on top) */}
      <g style={alive ? { animation: 'gentle-bob 3s ease-in-out infinite' } : null} transform="translate(150, 460)">
        {/* legs */}
        <rect x="-22" y="0" width="8" height="44" {...reg(fills, onRegion, 'camel1-leg-fl')} />
        <rect x="-8" y="0" width="8" height="44" {...reg(fills, onRegion, 'camel1-leg-fr')} />
        <rect x="22" y="0" width="8" height="44" {...reg(fills, onRegion, 'camel1-leg-bl')} />
        <rect x="36" y="0" width="8" height="44" {...reg(fills, onRegion, 'camel1-leg-br')} />
        {/* body */}
        <path d="M -28 0 Q -28 -30 -8 -36 L 46 -36 Q 60 -30 60 0 Q 50 6 30 4 L 0 4 Q -20 6 -28 0 Z" {...reg(fills, onRegion, 'camel1-body')} />
        {/* humps */}
        <path d="M -8 -36 Q 0 -56 12 -36 Z" {...reg(fills, onRegion, 'camel1-hump-1')} />
        <path d="M 14 -36 Q 26 -58 38 -36 Z" {...reg(fills, onRegion, 'camel1-hump-2')} />
        {/* neck (curving up) */}
        <path d="M -28 -10 Q -54 -34 -54 -68 L -42 -70 Q -40 -42 -28 -22 Z" {...reg(fills, onRegion, 'camel1-neck')} />
        {/* head */}
        <ellipse cx="-50" cy="-72" rx="12" ry="9" {...reg(fills, onRegion, 'camel1-head')} />
        <circle cx="-54" cy="-72" r="1.4" fill={STROKE} stroke="none" />
        {/* ear */}
        <path d="M -48 -82 L -46 -90 L -42 -82 Z" {...reg(fills, onRegion, 'camel1-ear')} />
        {/* tail */}
        <path d="M 60 -8 Q 70 -10 70 6 Q 64 6 60 0 Z" {...reg(fills, onRegion, 'camel1-tail')} />

        {/* MARCO POLO sitting between humps */}
        <ellipse cx="12" cy="-50" rx="7" ry="14" {...reg(fills, onRegion, 'marco-body')} />
        <circle cx="12" cy="-66" r="6" {...reg(fills, onRegion, 'marco-face')} />
        {/* hat */}
        <path d="M 4 -68 L 20 -68 L 18 -76 L 6 -76 Z" {...reg(fills, onRegion, 'marco-hat')} />
        <rect x="2" y="-70" width="20" height="4" {...reg(fills, onRegion, 'marco-hat-brim')} />
        {/* face features */}
        <circle cx="10" cy="-67" r="0.8" fill={STROKE} stroke="none" />
        <circle cx="14" cy="-67" r="0.8" fill={STROKE} stroke="none" />
        <path d="M 9 -62 Q 12 -60 15 -62" fill="none" stroke={STROKE} strokeWidth="0.8" />
      </g>

      {/* Camel 2 (middle, with cargo) */}
      <g style={alive ? { animation: 'gentle-bob 3.2s ease-in-out infinite', animationDelay: '0.3s' } : null} transform="translate(290, 470)">
        <rect x="-22" y="0" width="8" height="38" {...reg(fills, onRegion, 'camel2-leg-fl')} />
        <rect x="-8" y="0" width="8" height="38" {...reg(fills, onRegion, 'camel2-leg-fr')} />
        <rect x="22" y="0" width="8" height="38" {...reg(fills, onRegion, 'camel2-leg-bl')} />
        <rect x="36" y="0" width="8" height="38" {...reg(fills, onRegion, 'camel2-leg-br')} />
        <path d="M -28 0 Q -28 -28 -8 -34 L 46 -34 Q 60 -28 60 0 Q 50 6 30 4 L 0 4 Q -20 6 -28 0 Z" {...reg(fills, onRegion, 'camel2-body')} />
        <path d="M -8 -34 Q 0 -52 12 -34 Z" {...reg(fills, onRegion, 'camel2-hump-1')} />
        <path d="M 14 -34 Q 26 -54 38 -34 Z" {...reg(fills, onRegion, 'camel2-hump-2')} />
        <path d="M -28 -10 Q -50 -30 -50 -60 L -40 -62 Q -38 -38 -28 -22 Z" {...reg(fills, onRegion, 'camel2-neck')} />
        <ellipse cx="-48" cy="-64" rx="10" ry="7" {...reg(fills, onRegion, 'camel2-head')} />
        <circle cx="-52" cy="-64" r="1.2" fill={STROKE} stroke="none" />
        {/* cargo packs */}
        <rect x="0" y="-46" width="44" height="14" {...reg(fills, onRegion, 'cargo-bundle')} />
        <line x1="10" y1="-46" x2="10" y2="-32" stroke={STROKE} strokeWidth="1.2" />
        <line x1="22" y1="-46" x2="22" y2="-32" stroke={STROKE} strokeWidth="1.2" />
        <line x1="34" y1="-46" x2="34" y2="-32" stroke={STROKE} strokeWidth="1.2" />
        {/* silk roll on top */}
        <ellipse cx="22" cy="-50" rx="20" ry="5" {...reg(fills, onRegion, 'silk-roll')} />
        <line x1="6" y1="-50" x2="38" y2="-50" stroke={STROKE} strokeWidth="1" />
      </g>

      {/* Camel 3 (trailing) */}
      <g style={alive ? { animation: 'gentle-bob 3.4s ease-in-out infinite', animationDelay: '0.6s' } : null} transform="translate(410, 478)">
        <rect x="-22" y="0" width="8" height="32" {...reg(fills, onRegion, 'camel3-leg-fl')} />
        <rect x="-8" y="0" width="8" height="32" {...reg(fills, onRegion, 'camel3-leg-fr')} />
        <rect x="22" y="0" width="8" height="32" {...reg(fills, onRegion, 'camel3-leg-bl')} />
        <rect x="36" y="0" width="8" height="32" {...reg(fills, onRegion, 'camel3-leg-br')} />
        <path d="M -28 0 Q -28 -28 -8 -34 L 46 -34 Q 60 -28 60 0 Q 50 6 30 4 L 0 4 Q -20 6 -28 0 Z" {...reg(fills, onRegion, 'camel3-body')} />
        <path d="M -8 -34 Q 0 -50 12 -34 Z" {...reg(fills, onRegion, 'camel3-hump-1')} />
        <path d="M 14 -34 Q 26 -52 38 -34 Z" {...reg(fills, onRegion, 'camel3-hump-2')} />
        <path d="M -28 -10 Q -48 -28 -48 -56 L -38 -58 Q -36 -36 -28 -22 Z" {...reg(fills, onRegion, 'camel3-neck')} />
        <ellipse cx="-46" cy="-60" rx="10" ry="7" {...reg(fills, onRegion, 'camel3-head')} />
        <circle cx="-50" cy="-60" r="1.2" fill={STROKE} stroke="none" />
      </g>

      {/* connecting rope between camels — non-colorable */}
      <path d="M 90 432 Q 220 444 240 460" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 350 466 Q 380 470 364 478" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* trade-route footprints in sand */}
      <g fill={STROKE} stroke="none">
        {[80, 100, 120, 140, 160, 200, 240, 260].map((x,i) => (
          <ellipse key={`fp-${i}`} cx={x} cy="540" rx="3" ry="2" opacity="0.55" />
        ))}
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>MARCO POLO · SILK ROAD · 1271</text>
    </svg>
  );
}

// ----- 61. JOAN OF ARC — Orléans, 1429 -----
function JoanOfArcSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky — bright, with sunbeams */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* radiating light behind Joan (divine) */}
      <g style={alive ? { animation: 'spin-slow 30s linear infinite', transformOrigin: '300px 200px' } : null}>
        {Array.from({length:16}).map((_,i)=>{
          const a = i * Math.PI * 2 / 16;
          return <line key={`jr-${i}`} x1={300 + Math.cos(a)*100} y1={200 + Math.sin(a)*100} x2={300 + Math.cos(a)*150} y2={200 + Math.sin(a)*150} stroke={STROKE} strokeWidth="2" />;
        })}
      </g>
      <circle cx="300" cy="200" r="100" {...reg(fills, onRegion, 'halo')} />

      {/* distant Orléans castle */}
      <rect x="40" y="370" width="100" height="60" {...reg(fills, onRegion, 'castle-l')} />
      {/* crenellations */}
      {[44,60,76,92,108,124].map((x,i) => (
        <rect key={`cl-${i}`} x={x} y="362" width="10" height="10" fill={STROKE} stroke="none" />
      ))}
      <rect x="58" y="350" width="20" height="20" {...reg(fills, onRegion, 'castle-tower-l')} />
      <rect x="102" y="350" width="20" height="20" {...reg(fills, onRegion, 'castle-tower-r')} />
      {/* flag on castle */}
      <line x1="68" y1="350" x2="68" y2="330" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 68 330 L 86 334 L 80 338 L 86 342 L 68 344 Z" {...reg(fills, onRegion, 'castle-flag')} />

      {/* battlefield ground */}
      <path d="M 20 460 Q 200 450 380 460 Q 480 454 580 460 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'ground')} />
      {/* grass tufts */}
      {[60,160,440,520].map((x,i) => (
        <path key={`gt-${i}`} d={`M ${x} 488 L ${x+4} 476 L ${x+8} 488 L ${x+12} 476 L ${x+16} 488`} fill="none" stroke={STROKE} strokeWidth="1.4" />
      ))}

      {/* ---- WHITE WAR HORSE ---- */}
      <g>
        {/* legs */}
        <rect x="200" y="380" width="14" height="80" {...reg(fills, onRegion, 'horse-leg-fl')} />
        <rect x="220" y="380" width="14" height="80" {...reg(fills, onRegion, 'horse-leg-fr')} />
        <rect x="356" y="380" width="14" height="80" {...reg(fills, onRegion, 'horse-leg-bl')} />
        <rect x="376" y="380" width="14" height="80" {...reg(fills, onRegion, 'horse-leg-br')} />
        {/* hooves */}
        <rect x="196" y="454" width="22" height="8" {...reg(fills, onRegion, 'hoof-fl')} />
        <rect x="216" y="454" width="22" height="8" {...reg(fills, onRegion, 'hoof-fr')} />
        <rect x="352" y="454" width="22" height="8" {...reg(fills, onRegion, 'hoof-bl')} />
        <rect x="372" y="454" width="22" height="8" {...reg(fills, onRegion, 'hoof-br')} />
        {/* body */}
        <path d="M 180 320 Q 180 282 240 280 L 380 280 Q 420 282 420 320 L 420 384 Q 400 396 360 392 L 220 392 Q 180 396 180 384 Z" {...reg(fills, onRegion, 'horse-body')} />
        {/* head */}
        <path d="M 420 320 Q 456 312 480 286 Q 488 282 494 290 Q 488 312 472 332 L 452 350 Q 432 354 420 350 Z" {...reg(fills, onRegion, 'horse-head')} />
        {/* mane */}
        <path d="M 392 280 Q 404 264 424 260 Q 420 278 412 290 Z" {...reg(fills, onRegion, 'horse-mane-1')} />
        <path d="M 404 296 Q 420 288 440 284 Q 432 298 420 308 Z" {...reg(fills, onRegion, 'horse-mane-2')} />
        {/* ear */}
        <path d="M 446 286 L 450 270 L 458 286 Z" {...reg(fills, onRegion, 'horse-ear')} />
        {/* eye */}
        <circle cx="468" cy="312" r="2" fill={STROKE} stroke="none" />
        {/* nostril */}
        <circle cx="486" cy="324" r="1.4" fill={STROKE} stroke="none" />
        {/* bridle */}
        <line x1="456" y1="334" x2="490" y2="326" stroke={STROKE} strokeWidth="1.4" />
        {/* tail */}
        <path d="M 180 320 Q 148 314 138 340 Q 132 358 148 360 Q 158 344 172 336 Z" {...reg(fills, onRegion, 'horse-tail')} />
        {/* saddle blanket — fleur-de-lis pattern */}
        <path d="M 220 286 L 380 286 L 392 318 L 212 318 Z" {...reg(fills, onRegion, 'saddle-blanket')} />
        <path d="M 296 296 L 300 304 L 304 296 L 304 304 L 300 308 L 296 304 Z" fill={STROKE} stroke="none" />
        <path d="M 256 296 L 260 304 L 264 296 L 264 304 L 260 308 L 256 304 Z" fill={STROKE} stroke="none" />
        <path d="M 336 296 L 340 304 L 344 296 L 344 304 L 340 308 L 336 304 Z" fill={STROKE} stroke="none" />
      </g>

      {/* ---- JOAN of ARC — in armor, on horseback ---- */}
      {/* legs in armor */}
      <path d="M 268 256 L 332 256 L 340 312 L 260 312 Z" {...reg(fills, onRegion, 'leg-armor')} />
      {/* armor plate seams */}
      <line x1="300" y1="262" x2="300" y2="308" stroke={STROKE} strokeWidth="1.4" />
      <line x1="268" y1="280" x2="332" y2="280" stroke={STROKE} strokeWidth="1.4" />

      {/* torso — breastplate */}
      <path d="M 252 154 Q 252 130 300 124 Q 348 130 348 154 L 354 256 L 246 256 Z" {...reg(fills, onRegion, 'breastplate')} />
      {/* breastplate detail lines */}
      <path d="M 252 188 Q 300 200 348 188" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 252 220 Q 300 232 348 220" fill="none" stroke={STROKE} strokeWidth="1.4" />
      {/* fleur-de-lis on chest */}
      <g style={alive ? { animation: 'glow-pulse 2.4s ease-in-out infinite', transformOrigin: '300px 180px' } : null}>
        <path d="M 290 180 L 296 196 L 300 188 L 304 196 L 310 180 L 304 178 L 300 184 L 296 178 Z" {...reg(fills, onRegion, 'fleur-de-lis')} />
        <rect x="294" y="194" width="12" height="3" fill={STROKE} stroke="none" />
      </g>

      {/* shoulder pauldrons */}
      <path d="M 248 152 Q 232 134 250 124 Q 266 132 268 152 Z" {...reg(fills, onRegion, 'pauldron-l')} />
      <path d="M 352 152 Q 368 134 350 124 Q 334 132 332 152 Z" {...reg(fills, onRegion, 'pauldron-r')} />

      {/* left arm — holding banner (vertical pole) */}
      <path d="M 252 158 Q 232 184 232 240 L 246 240 Q 248 198 264 174 Z" {...reg(fills, onRegion, 'arm-l')} />
      <ellipse cx="238" cy="248" rx="9" ry="7" {...reg(fills, onRegion, 'hand-l')} />
      {/* banner pole */}
      <line x1="232" y1="80" x2="232" y2="320" stroke={STROKE} strokeWidth="3" />
      <circle cx="232" cy="78" r="3.6" fill={STROKE} stroke="none" />
      {/* banner with fleur-de-lis */}
      <g style={alive ? { animation: 'wave-flag 2.6s ease-in-out infinite', transformOrigin: '232px 130px' } : null}>
        <path d="M 232 90 L 320 96 L 308 116 L 320 136 L 308 156 L 320 176 L 232 184 Z" {...reg(fills, onRegion, 'banner-cloth')} />
        {/* fleurs on banner */}
        {[[270,114],[296,134],[270,154]].map((p,i)=>(
          <g key={`fl-${i}`}>
            <path d={`M ${p[0]-6} ${p[1]} L ${p[0]-2} ${p[1]+10} L ${p[0]} ${p[1]+4} L ${p[0]+2} ${p[1]+10} L ${p[0]+6} ${p[1]} L ${p[0]+2} ${p[1]-2} L ${p[0]} ${p[1]+2} L ${p[0]-2} ${p[1]-2} Z`} fill={STROKE} stroke="none" />
          </g>
        ))}
      </g>

      {/* right arm — raised, holding sword */}
      <path d="M 348 158 Q 376 130 410 102 L 422 116 Q 392 144 360 174 Z" {...reg(fills, onRegion, 'arm-r')} />
      <ellipse cx="416" cy="108" rx="9" ry="7" {...reg(fills, onRegion, 'hand-r')} />
      {/* sword — raised to the sky */}
      <line x1="416" y1="104" x2="464" y2="40" stroke={STROKE} strokeWidth="3.2" />
      <path d="M 460 36 L 472 32 L 468 44 Z" fill={STROKE} stroke="none" />
      <rect x="410" y="100" width="14" height="14" {...reg(fills, onRegion, 'sword-hilt')} />
      <line x1="402" y1="102" x2="424" y2="102" stroke={STROKE} strokeWidth="3" />

      {/* neck */}
      <path d="M 290 102 L 310 102 L 312 124 L 288 124 Z" {...reg(fills, onRegion, 'neck')} />

      {/* face */}
      <ellipse cx="300" cy="84" rx="22" ry="26" {...reg(fills, onRegion, 'face')} />
      {/* short medieval haircut — boyish bowl cut */}
      <path d="M 278 76 Q 280 50 300 46 Q 320 50 322 76 Q 314 64 300 64 Q 286 64 278 76 Z" {...reg(fills, onRegion, 'hair')} />
      {/* face features */}
      <circle cx="292" cy="84" r="1.6" fill={STROKE} stroke="none" />
      <circle cx="308" cy="84" r="1.6" fill={STROKE} stroke="none" />
      {/* eyebrows — determined */}
      <path d="M 286 76 Q 294 72 298 76" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 302 76 Q 306 72 314 76" fill="none" stroke={STROKE} strokeWidth="1.4" />
      {/* nose */}
      <path d="M 300 86 L 296 96 Q 300 100 304 96 Z" fill="none" stroke={STROKE} strokeWidth="1.2" />
      {/* mouth */}
      <path d="M 292 104 Q 300 108 308 104" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>JOAN OF ARC · 1429</text>
    </svg>
  );
}

// ----- 62. HARRIET TUBMAN & THE UNDERGROUND RAILROAD -----
function HarrietTubmanSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* night sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />

      {/* THE NORTH STAR — the guiding star (Polaris) */}
      <g style={alive ? { animation: 'glow-pulse 1.8s ease-in-out infinite', transformOrigin: '480px 90px' } : null}>
        <circle cx="480" cy="90" r="6" fill="#FFFDF5" stroke={STROKE} strokeWidth="2" />
        {/* star points */}
        <path d="M 480 76 L 482 88 L 480 90 L 478 88 Z" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.4" />
        <path d="M 480 104 L 482 92 L 480 90 L 478 92 Z" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.4" />
        <path d="M 466 90 L 478 92 L 480 90 L 478 88 Z" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.4" />
        <path d="M 494 90 L 482 92 L 480 90 L 482 88 Z" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.4" />
        {/* sparkle rays */}
        {Array.from({length:8}).map((_,i)=>{
          const a = i * Math.PI / 4 + Math.PI/8;
          return <line key={`ns-${i}`} x1={480 + Math.cos(a)*10} y1={90 + Math.sin(a)*10} x2={480 + Math.cos(a)*18} y2={90 + Math.sin(a)*18} stroke={STROKE} strokeWidth="1.4" />;
        })}
      </g>
      <text x="480" y="124" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="11" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>NORTH</text>

      {/* DRINKING GOURD (Big Dipper) constellation — pointer to North Star */}
      <g stroke={STROKE} strokeWidth="1.6" fill="#FFFDF5">
        <circle cx="380" cy="160" r="2.4" />
        <circle cx="406" cy="150" r="2.4" />
        <circle cx="430" cy="140" r="2.4" />
        <circle cx="450" cy="130" r="2.4" />
        <circle cx="446" cy="158" r="2.4" />
        <circle cx="428" cy="172" r="2.4" />
        <circle cx="404" cy="178" r="2.4" />
        {/* connecting lines */}
        <line x1="380" y1="160" x2="406" y2="150" />
        <line x1="406" y1="150" x2="430" y2="140" />
        <line x1="430" y1="140" x2="450" y2="130" />
        <line x1="450" y1="130" x2="446" y2="158" />
        <line x1="446" y1="158" x2="428" y2="172" />
        <line x1="428" y1="172" x2="404" y2="178" />
        <line x1="404" y1="178" x2="380" y2="160" />
        {/* arrow line up to North Star */}
        <line x1="450" y1="130" x2="478" y2="98" strokeDasharray="3 3" />
      </g>

      {/* scattered stars */}
      <g style={alive ? { animation: 'twinkle 2.4s ease-in-out infinite' } : null}>
        <circle cx="80" cy="60" r="2" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.4" />
        <circle cx="150" cy="100" r="1.6" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.2" />
        <circle cx="220" cy="50" r="2" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.4" />
        <circle cx="540" cy="50" r="1.6" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.2" />
        <circle cx="100" cy="180" r="1.6" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.2" />
        <circle cx="200" cy="200" r="1.6" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.2" />
        <circle cx="540" cy="200" r="1.6" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.2" />
        <circle cx="320" cy="80" r="1.4" fill="#FFFDF5" stroke={STROKE} strokeWidth="1" />
      </g>

      {/* CRESCENT MOON */}
      <g style={alive ? { animation: 'glow-pulse 3s ease-in-out infinite', transformOrigin: '90px 110px' } : null}>
        <path d="M 80 96 Q 60 110 80 130 Q 96 122 90 110 Q 90 102 80 96 Z" {...reg(fills, onRegion, 'moon')} />
      </g>

      {/* dense forest silhouettes (background trees) */}
      <g>
        {[60, 130, 210, 290, 370, 450, 530].map((x,i) => (
          <g key={`tree-${i}`}>
            <rect x={x-4} y="320" width="8" height="80" {...reg(fills, onRegion, `tree-trunk-${i}`)} />
            <polygon points={`${x-30},340 ${x+30},340 ${x},290`} {...reg(fills, onRegion, `tree-bot-${i}`)} />
            <polygon points={`${x-26},310 ${x+26},310 ${x},268`} {...reg(fills, onRegion, `tree-mid-${i}`)} />
            <polygon points={`${x-22},282 ${x+22},282 ${x},244`} {...reg(fills, onRegion, `tree-top-${i}`)} />
          </g>
        ))}
      </g>

      {/* path through woods */}
      <path d="M 240 580 Q 280 540 300 480 Q 320 440 340 400 L 360 400 L 340 440 Q 320 480 300 540 Q 280 580 260 580 Z" {...reg(fills, onRegion, 'path')} />

      {/* ground */}
      <path d="M 20 400 L 580 400 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'ground')} />

      {/* ---- HARRIET TUBMAN — leading, with lantern raised ---- */}
      <g style={alive ? { animation: 'gentle-bob 3.6s ease-in-out infinite' } : null} transform="translate(290, 530)">
        {/* legs / long skirt */}
        <path d="M -22 50 L 22 50 L 28 0 L -28 0 Z" {...reg(fills, onRegion, 'tubman-skirt')} />
        {/* skirt vertical pleats */}
        <line x1="-10" y1="6" x2="-12" y2="46" stroke={STROKE} strokeWidth="1.2" />
        <line x1="0" y1="6" x2="0" y2="46" stroke={STROKE} strokeWidth="1.2" />
        <line x1="10" y1="6" x2="12" y2="46" stroke={STROKE} strokeWidth="1.2" />
        {/* boots */}
        <rect x="-20" y="46" width="14" height="14" {...reg(fills, onRegion, 'tubman-boot-l')} />
        <rect x="6" y="46" width="14" height="14" {...reg(fills, onRegion, 'tubman-boot-r')} />
        {/* shawl / coat over shoulders */}
        <path d="M -30 -60 Q -32 -20 -28 0 L 28 0 Q 32 -20 30 -60 Q 0 -56 -30 -60 Z" {...reg(fills, onRegion, 'tubman-coat')} />
        {/* apron */}
        <path d="M -16 0 L 16 0 L 18 -50 L -18 -50 Z" {...reg(fills, onRegion, 'tubman-apron')} />
        {/* right arm — raised, holding lantern */}
        <path d="M 30 -54 Q 56 -76 60 -100 L 46 -104 Q 38 -82 24 -64 Z" {...reg(fills, onRegion, 'tubman-arm-r')} />
        {/* lantern */}
        <g style={alive ? { animation: 'glow-pulse 2s ease-in-out infinite', transformOrigin: '60px -118px' } : null}>
          <rect x="50" y="-130" width="20" height="22" {...reg(fills, onRegion, 'lantern')} />
          <rect x="48" y="-132" width="24" height="4" {...reg(fills, onRegion, 'lantern-top')} />
          <rect x="48" y="-110" width="24" height="4" {...reg(fills, onRegion, 'lantern-bot')} />
          {/* handle */}
          <path d="M 56 -136 Q 60 -144 64 -136" fill="none" stroke={STROKE} strokeWidth="1.8" />
          {/* flame inside */}
          <path d="M 56 -114 Q 56 -124 60 -126 Q 64 -124 64 -114 Z" {...reg(fills, onRegion, 'lantern-flame')} />
          {/* light rays */}
          {Array.from({length:6}).map((_,i)=>{
            const a = i * Math.PI / 3 + Math.PI/6;
            return <line key={`lr-${i}`} x1={60 + Math.cos(a)*16} y1={-120 + Math.sin(a)*16} x2={60 + Math.cos(a)*24} y2={-120 + Math.sin(a)*24} stroke={STROKE} strokeWidth="1.4" />;
          })}
        </g>
        {/* left arm — extended, beckoning */}
        <path d="M -30 -54 Q -46 -40 -50 -16 L -38 -10 Q -34 -32 -22 -42 Z" {...reg(fills, onRegion, 'tubman-arm-l')} />
        {/* face */}
        <ellipse cx="0" cy="-76" rx="14" ry="16" {...reg(fills, onRegion, 'tubman-face')} />
        {/* headscarf / kerchief tied at top */}
        <path d="M -16 -78 Q -16 -98 0 -100 Q 16 -98 16 -78 Q 12 -90 0 -90 Q -12 -90 -16 -78 Z" {...reg(fills, onRegion, 'tubman-headscarf')} />
        {/* knot of headscarf */}
        <path d="M -4 -98 L 4 -98 L 0 -106 Z" {...reg(fills, onRegion, 'tubman-knot')} />
        {/* face features */}
        <circle cx="-4" cy="-76" r="1.4" fill={STROKE} stroke="none" />
        <circle cx="4" cy="-76" r="1.4" fill={STROKE} stroke="none" />
        <path d="M -2 -70 Q 0 -68 2 -70" fill="none" stroke={STROKE} strokeWidth="1.2" />
        <path d="M -4 -64 Q 0 -62 4 -64" fill="none" stroke={STROKE} strokeWidth="1.4" />
      </g>

      {/* ---- TWO FREEDOM SEEKERS following ---- */}
      {/* figure 1 (woman + child) */}
      <g transform="translate(200, 540)">
        <path d="M -16 36 L 16 36 L 20 0 L -20 0 Z" {...reg(fills, onRegion, 'fig1-skirt')} />
        <path d="M -22 -50 Q -22 -10 -20 0 L 20 0 Q 22 -10 22 -50 Q 0 -46 -22 -50 Z" {...reg(fills, onRegion, 'fig1-coat')} />
        <ellipse cx="0" cy="-62" rx="10" ry="11" {...reg(fills, onRegion, 'fig1-face')} />
        <path d="M -12 -64 Q -12 -78 0 -80 Q 12 -78 12 -64 Q 8 -72 0 -72 Q -8 -72 -12 -64 Z" {...reg(fills, onRegion, 'fig1-scarf')} />
        <circle cx="-3" cy="-62" r="1" fill={STROKE} stroke="none" />
        <circle cx="3" cy="-62" r="1" fill={STROKE} stroke="none" />
        {/* small child clinging to her */}
        <ellipse cx="-18" cy="-10" rx="6" ry="9" {...reg(fills, onRegion, 'child-body')} />
        <circle cx="-18" cy="-22" r="5" {...reg(fills, onRegion, 'child-face')} />
      </g>

      {/* figure 2 (man with bundle) */}
      <g transform="translate(120, 545)">
        <path d="M -14 32 L 14 32 L 14 -8 L -14 -8 Z" {...reg(fills, onRegion, 'fig2-pants')} />
        <path d="M -18 -46 Q -18 -16 -14 -8 L 14 -8 Q 18 -16 18 -46 Q 0 -42 -18 -46 Z" {...reg(fills, onRegion, 'fig2-coat')} />
        {/* hat */}
        <path d="M -12 -58 L 12 -58 L 10 -64 L -10 -64 Z" {...reg(fills, onRegion, 'fig2-hat')} />
        <rect x="-14" y="-58" width="28" height="3" {...reg(fills, onRegion, 'fig2-hat-brim')} />
        <ellipse cx="0" cy="-50" rx="9" ry="10" {...reg(fills, onRegion, 'fig2-face')} />
        <circle cx="-3" cy="-50" r="1" fill={STROKE} stroke="none" />
        <circle cx="3" cy="-50" r="1" fill={STROKE} stroke="none" />
        {/* bindle/bundle on stick */}
        <line x1="14" y1="-32" x2="32" y2="-50" stroke={STROKE} strokeWidth="2" />
        <path d="M 28 -54 Q 24 -64 36 -68 Q 44 -64 40 -54 Q 38 -48 32 -50 Z" {...reg(fills, onRegion, 'bindle')} />
        <line x1="30" y1="-54" x2="38" y2="-54" stroke={STROKE} strokeWidth="0.8" />
      </g>

      {/* banner */}
      <rect x="160" y="20" width="280" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="43" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>HARRIET TUBMAN · FOLLOW THE STAR</text>
    </svg>
  );
}

// ============================================================
// Page entries
// ============================================================
const ROUND_15_PAGES = [
  {
    id: 'hagia-sophia',
    title: 'Hagia Sophia',
    subtitle: 'Constantinople, 537 AD',
    collection: 'world',
    eraLabel: 'Byzantine & Ottoman',
    eraColor: '#A67B5B',
    bgPreview: '#EFD9C4',
    fact: "Hagia Sophia stood for nearly 1,000 years as the largest church in the world. When the Ottomans took Constantinople in 1453, they added four soaring minarets and turned it into a mosque.",
    Component: HagiaSophiaSVG,
    readingLevel: { lexile: 880, gradeBand: '4–5', guidedReading: 'P', wordCount: 32, complexity: 'Challenging' },
    keyVocab: ['cathedral', 'mosque', 'Byzantine', 'minaret', 'dome'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','bosphorus','ferry','ferry-cabin','plaza','base','main-door','half-dome-l','half-dome-r','drum','main-dome','crescent','minaret-shaft-0','minaret-band-0','minaret-cap-0','minaret-spire-0','minaret-shaft-1','minaret-band-1','minaret-cap-1','minaret-spire-1','minaret-shaft-2','minaret-band-2','minaret-cap-2','minaret-spire-2','minaret-shaft-3','minaret-band-3','minaret-cap-3','minaret-spire-3','banner'],
    quest: {
      heading: 'Cathedral of Two Worlds',
      author: 'Constantinople · 537 AD',
      lines: [
        'I am a giant {0} crowned with a great round roof.',
        'My city is now called {1}.',
        'Around me stand four tall, pointed {2}.',
      ],
      blanks: [
        { answer: 'building',  choices: ['building',  'banana',   'bicycle',  'beanbag']   },
        { answer: 'Istanbul', choices: ['Istanbul',  'Igloo',    'Idaho',    'Iceberg']   },
        { answer: 'minarets', choices: ['minarets',  'meatballs','mittens',  'magnets']   },
      ],
      voice: {
        hints: [/daniel/i, /alex/i, /tom/i, /samantha/i, /microsoft (mark|aria)/i],
        rate: 0.76, pitch: 0.86,
      },
    },
  },
  {
    id: 'silk-road',
    title: 'Marco Polo on the Silk Road',
    subtitle: 'Caravan to Cathay, 1271',
    collection: 'world',
    eraLabel: 'Silk Road',
    eraColor: '#B07A38',
    bgPreview: '#F0DCA8',
    fact: "Marco Polo was 17 when he left Venice with his father and uncle to travel to China. Their journey across mountains, deserts, and rivers took three years — and Marco didn't see Italy again for 24 more.",
    Component: SilkRoadSVG,
    readingLevel: { lexile: 820, gradeBand: '4–5', guidedReading: 'P', wordCount: 36, complexity: 'Challenging' },
    keyVocab: ['caravan', 'merchant', 'trade', 'silk', 'oasis'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','cloud','pagoda-base','pagoda-roof-1','pagoda-tier','pagoda-roof-2','mountains','desert-back','dune','ground','caravanserai','caravanserai-roof','caravanserai-door','camel1-leg-fl','camel1-leg-fr','camel1-leg-bl','camel1-leg-br','camel1-body','camel1-hump-1','camel1-hump-2','camel1-neck','camel1-head','camel1-ear','camel1-tail','marco-body','marco-face','marco-hat','marco-hat-brim','camel2-leg-fl','camel2-leg-fr','camel2-leg-bl','camel2-leg-br','camel2-body','camel2-hump-1','camel2-hump-2','camel2-neck','camel2-head','cargo-bundle','silk-roll','camel3-leg-fl','camel3-leg-fr','camel3-leg-bl','camel3-leg-br','camel3-body','camel3-hump-1','camel3-hump-2','camel3-neck','camel3-head','banner'],
    quest: {
      heading: 'The Road to Cathay',
      author: 'Venice & China · 1271',
      lines: [
        'I am a young merchant from {0}.',
        'My caravan rides slow, gentle {1}.',
        'I am going far away to trade in the land called {2}.',
      ],
      blanks: [
        { answer: 'Venice', choices: ['Venice', 'Vinegar', 'Velvet',  'Volcano'] },
        { answer: 'camels', choices: ['camels', 'cookies', 'crayons', 'cucumbers'] },
        { answer: 'China',  choices: ['China',  'Cheese',  'Chair',   'Cherry']    },
      ],
      voice: {
        hints: [/daniel/i, /alex/i, /tom/i, /reed/i, /microsoft (mark|guy)/i],
        rate: 0.78, pitch: 0.90,
      },
    },
  },
  {
    id: 'joan-of-arc',
    title: 'Joan of Arc',
    subtitle: 'Orléans, 1429',
    collection: 'world',
    eraLabel: 'Medieval France',
    eraColor: '#8B95B5',
    bgPreview: '#EDE2D0',
    fact: "Joan was a 17-year-old farm girl who said she heard voices telling her to save France. She convinced the king to give her an army, freed the city of Orléans, and became one of history's most famous warriors.",
    Component: JoanOfArcSVG,
    readingLevel: { lexile: 860, gradeBand: '4–5', guidedReading: 'P', wordCount: 36, complexity: 'Challenging' },
    keyVocab: ['armor', 'fleur-de-lis', 'siege', 'Maid of Orléans'],
    standards: ['RI.4.4', 'RI.4.1', 'L.4.4', 'SL.4.2'],
    regions: ['sky','halo','castle-l','castle-tower-l','castle-tower-r','castle-flag','ground','horse-leg-fl','horse-leg-fr','horse-leg-bl','horse-leg-br','hoof-fl','hoof-fr','hoof-bl','hoof-br','horse-body','horse-head','horse-mane-1','horse-mane-2','horse-ear','horse-tail','saddle-blanket','leg-armor','breastplate','fleur-de-lis','pauldron-l','pauldron-r','arm-l','hand-l','banner-cloth','arm-r','hand-r','sword-hilt','neck','face','hair','banner'],
    quest: {
      heading: 'The Maid of Orléans',
      author: 'France · 1429',
      lines: [
        'I am a young farm {0} who became a warrior.',
        'I wore shining {1} into battle.',
        'I rode to save the city of {2}.',
      ],
      blanks: [
        { answer: 'girl',    choices: ['girl',    'goat',    'grape',   'guitar']   },
        { answer: 'armor',   choices: ['armor',   'apron',   'avocado', 'antlers']  },
        { answer: 'Orléans', choices: ['Orléans', 'Oatmeal', 'Olive',   'Octopus']  },
      ],
      voice: {
        hints: [/samantha/i, /allison/i, /serena/i, /microsoft (aria|jenny|zira)/i],
        rate: 0.82, pitch: 1.04,
      },
    },
  },
  {
    id: 'harriet-tubman',
    title: 'Harriet Tubman',
    subtitle: 'Follow the Drinking Gourd',
    collection: 'us',
    eraLabel: 'Underground Railroad',
    eraColor: '#1F4D3C',
    bgPreview: '#1F2933',
    fact: "Harriet Tubman escaped slavery and then returned to the South 13 more times to lead about 70 family members and friends to freedom — guided through the woods at night by the North Star above the Big Dipper.",
    Component: HarrietTubmanSVG,
    readingLevel: { lexile: 880, gradeBand: '4–5', guidedReading: 'P', wordCount: 38, complexity: 'Challenging' },
    keyVocab: ['conductor', 'freedom', 'fugitive', 'abolition', 'Polaris'],
    standards: ['RI.4.4', 'RI.4.1', 'L.4.4', 'SL.4.2'],
    regions: ['sky','moon','tree-trunk-0','tree-bot-0','tree-mid-0','tree-top-0','tree-trunk-1','tree-bot-1','tree-mid-1','tree-top-1','tree-trunk-2','tree-bot-2','tree-mid-2','tree-top-2','tree-trunk-3','tree-bot-3','tree-mid-3','tree-top-3','tree-trunk-4','tree-bot-4','tree-mid-4','tree-top-4','tree-trunk-5','tree-bot-5','tree-mid-5','tree-top-5','tree-trunk-6','tree-bot-6','tree-mid-6','tree-top-6','path','ground','tubman-skirt','tubman-boot-l','tubman-boot-r','tubman-coat','tubman-apron','tubman-arm-r','lantern','lantern-top','lantern-bot','lantern-flame','tubman-arm-l','tubman-face','tubman-headscarf','tubman-knot','fig1-skirt','fig1-coat','fig1-face','fig1-scarf','child-body','child-face','fig2-pants','fig2-coat','fig2-hat','fig2-hat-brim','fig2-face','bindle','banner'],
    quest: {
      heading: 'Follow the Star',
      author: 'Maryland → Pennsylvania · 1850s',
      lines: [
        'I led many people to {0} along secret paths.',
        'I followed the brightest star, the {1} Star.',
        'I am called the {2} on the Underground Railroad.',
      ],
      blanks: [
        { answer: 'freedom',  choices: ['freedom',  'flour',     'feather',   'forest']    },
        { answer: 'North',    choices: ['North',    'Noisy',     'Naughty',   'Nutty']     },
        { answer: 'conductor',choices: ['conductor','cucumber',  'corncob',   'cookie']    },
      ],
      voice: {
        hints: [/samantha/i, /allison/i, /serena/i, /karen/i, /microsoft (aria|jenny|zira)/i],
        rate: 0.78, pitch: 0.92,
      },
    },
  },
];

if (window.PAGES_DATA && Array.isArray(window.PAGES_DATA)) {
  ROUND_15_PAGES.forEach(p => window.PAGES_DATA.push(p));
}

Object.assign(window, { HagiaSophiaSVG, SilkRoadSVG, JoanOfArcSVG, HarrietTubmanSVG });
