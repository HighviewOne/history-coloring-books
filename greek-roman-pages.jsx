// =================================================================
// Greek & Roman history coloring pages — 4 additions:
//   • the Trojan Horse (c. 1200 BC)
//   • Zeus on Mount Olympus (Greek mythology)
//   • a Roman Legionary (Roman Empire)
//   • the She-Wolf with Romulus & Remus (founding of Rome, 753 BC)
// =================================================================

// ----- 19. THE TROJAN HORSE — c. 1200 BC -----
function TrojanHorseSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '110px 110px' } : null}>
        <circle cx="110" cy="110" r="36" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* cloud */}
      <path d="M 380 80 Q 380 60 402 60 Q 408 46 428 46 Q 448 46 452 60 Q 472 60 472 80 Z" {...reg(fills, onRegion, 'cloud')} />
      {/* distant hills */}
      <path d="M 20 380 Q 180 340 360 376 Q 480 350 580 386 L 580 420 L 20 420 Z" {...reg(fills, onRegion, 'hill')} />

      {/* ---- Walls of Troy (background, right side) ---- */}
      <rect x="380" y="280" width="180" height="180" {...reg(fills, onRegion, 'wall')} />
      {/* left tower */}
      <rect x="368" y="240" width="44" height="220" {...reg(fills, onRegion, 'tower-l')} />
      {/* right tower */}
      <rect x="520" y="240" width="44" height="220" {...reg(fills, onRegion, 'tower-r')} />
      {/* crenellations along wall */}
      {[416,438,460,482,504].map((x,i) => (
        <rect key={`cw-${i}`} x={x} y={262} width="12" height="18" fill={STROKE} stroke="none" />
      ))}
      {/* crenellations on towers */}
      {[372,386,400].map((x,i) => (
        <rect key={`tl-${i}`} x={x} y={224} width="9" height="16" fill={STROKE} stroke="none" />
      ))}
      {[524,538,552].map((x,i) => (
        <rect key={`tr-${i}`} x={x} y={224} width="9" height="16" fill={STROKE} stroke="none" />
      ))}
      {/* stone block lines on wall — non-colorable */}
      {[300,320,340,360,380,400,420,440].map((y,i) => (
        <line key={`ws-${i}`} x1="380" y1={y} x2="560" y2={y} stroke={STROKE} strokeWidth="1" />
      ))}
      {/* gate */}
      <path d="M 446 460 L 506 460 L 506 396 Q 476 376 446 396 Z" {...reg(fills, onRegion, 'gate')} />
      <line x1="476" y1="380" x2="476" y2="458" stroke={STROKE} strokeWidth="1.4" />

      {/* ground */}
      <path d="M 20 460 Q 200 452 380 460 Q 480 454 580 460 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'ground')} />

      {/* ---- The Wooden Horse ---- */}
      {/* cart platform */}
      <rect x="60" y="430" width="320" height="16" rx="2" {...reg(fills, onRegion, 'cart')} />
      {/* plank lines on cart */}
      <line x1="60" y1="438" x2="380" y2="438" stroke={STROKE} strokeWidth="1.2" />

      {/* wheels */}
      {[100, 220, 340].map((cx, i) => (
        <g key={`wh-${i}`}>
          <circle cx={cx} cy="460" r="22" {...reg(fills, onRegion, `wheel-${i}`)} />
          <circle cx={cx} cy="460" r="6" fill={STROKE} stroke="none" />
          {[0,1,2,3].map(k => {
            const a = (k * Math.PI) / 4 + 0.2;
            return <line key={k} x1={cx + Math.cos(a)*6} y1={460 + Math.sin(a)*6} x2={cx + Math.cos(a)*20} y2={460 + Math.sin(a)*20} stroke={STROKE} strokeWidth="1.8" />;
          })}
        </g>
      ))}

      {/* legs */}
      <rect x="110" y="370" width="22" height="62" {...reg(fills, onRegion, 'leg-fl')} />
      <rect x="146" y="370" width="22" height="62" {...reg(fills, onRegion, 'leg-fr')} />
      <rect x="290" y="370" width="22" height="62" {...reg(fills, onRegion, 'leg-bl')} />
      <rect x="326" y="370" width="22" height="62" {...reg(fills, onRegion, 'leg-br')} />
      {/* hooves */}
      <rect x="106" y="424" width="30" height="8" {...reg(fills, onRegion, 'hoof-l')} />
      <rect x="286" y="424" width="30" height="8" {...reg(fills, onRegion, 'hoof-r')} />

      {/* body — boxy wooden barrel, left-facing */}
      <path d="M 90 268 L 340 268 Q 380 268 380 296 L 380 360 Q 380 378 360 378 L 110 378 Q 70 378 70 350 L 70 290 Q 70 268 90 268 Z" {...reg(fills, onRegion, 'body')} />
      {/* plank lines */}
      <line x1="70" y1="296" x2="380" y2="296" stroke={STROKE} strokeWidth="1.4" />
      <line x1="70" y1="324" x2="380" y2="324" stroke={STROKE} strokeWidth="1.4" />
      <line x1="70" y1="352" x2="380" y2="352" stroke={STROKE} strokeWidth="1.4" />
      {/* nail dots */}
      {[110,160,210,260,310,350].map((x,i) => <circle key={`n-${i}`} cx={x} cy="278" r="2" fill={STROKE} stroke="none" />)}
      {[110,160,210,260,310,350].map((x,i) => <circle key={`nb-${i}`} cx={x} cy="370" r="2" fill={STROKE} stroke="none" />)}

      {/* trapdoor with soldier peeking */}
      <rect x="186" y="306" width="68" height="56" {...reg(fills, onRegion, 'trapdoor')} />
      {/* trapdoor hinge marks */}
      <circle cx="194" cy="312" r="2" fill={STROKE} stroke="none" />
      <circle cx="246" cy="312" r="2" fill={STROKE} stroke="none" />
      <g style={alive ? { animation: 'gentle-bob 1.8s ease-in-out infinite' } : null}>
        {/* soldier face */}
        <ellipse cx="220" cy="338" rx="14" ry="11" {...reg(fills, onRegion, 'soldier-face')} />
        {/* corinthian-style helmet over head */}
        <path d="M 204 336 Q 204 316 220 316 Q 236 316 236 336 L 236 344 L 204 344 Z" {...reg(fills, onRegion, 'soldier-helmet')} />
        {/* helmet plume crest */}
        <path d="M 220 316 Q 220 300 234 296 Q 232 308 228 318 Z" {...reg(fills, onRegion, 'soldier-plume')} />
        {/* eyeholes (T-slot) */}
        <rect x="212" y="330" width="6" height="3" fill={STROKE} stroke="none" />
        <rect x="222" y="330" width="6" height="3" fill={STROKE} stroke="none" />
        <rect x="218" y="333" width="4" height="6" fill={STROKE} stroke="none" />
      </g>

      {/* neck */}
      <path d="M 70 280 Q 40 232 56 184 Q 70 168 96 178 Q 102 218 102 264 Q 92 280 80 282 Z" {...reg(fills, onRegion, 'neck')} />

      {/* head */}
      <path d="M 18 134 Q 8 106 36 96 Q 80 84 110 106 Q 124 134 108 164 Q 84 178 56 178 Q 30 168 18 134 Z" {...reg(fills, onRegion, 'head')} />
      {/* muzzle line */}
      <path d="M 26 142 Q 38 154 56 154" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* nostril */}
      <circle cx="32" cy="138" r="2.5" fill={STROKE} stroke="none" />
      {/* eye — carved knot */}
      <circle cx="76" cy="126" r="4" fill={STROKE} stroke="none" />
      {/* ear */}
      <path d="M 86 92 L 96 70 L 108 96 Z" {...reg(fills, onRegion, 'ear')} />
      {/* mane plank */}
      <path d="M 92 110 Q 84 130 92 168 Q 78 158 76 138 Q 80 118 92 110 Z" {...reg(fills, onRegion, 'mane')} />

      {/* tail — wooden brush at back */}
      <path d="M 380 312 Q 410 304 422 332 Q 416 360 396 360 L 380 348 Z" {...reg(fills, onRegion, 'tail')} />

      {/* discarded Greek shield in foreground (left) */}
      <ellipse cx="42" cy="496" rx="32" ry="14" {...reg(fills, onRegion, 'shield-ground')} />
      <ellipse cx="42" cy="496" rx="22" ry="9" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <circle cx="42" cy="496" r="5" fill={STROKE} stroke="none" />

      {/* banner */}
      <rect x="170" y="528" width="260" height="38" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="554" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="20" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>TROY · c. 1200 BC</text>
    </svg>
  );
}

// ----- 20. ZEUS ON MOUNT OLYMPUS -----
function ZeusSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* golden sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* radiating rays behind throne */}
      <g style={alive ? { animation: 'spin-slow 26s linear infinite', transformOrigin: '300px 300px' } : null}>
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 14;
          const x1 = 300 + Math.cos(a) * 140, y1 = 300 + Math.sin(a) * 140;
          const x2 = 300 + Math.cos(a) * 220, y2 = 300 + Math.sin(a) * 220;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={STROKE} strokeWidth="2" opacity="0.7" />;
        })}
      </g>
      {/* mountain peaks far back */}
      <polygon points="40,400 180,220 260,360 360,260 460,380 580,300 580,460 40,460" {...reg(fills, onRegion, 'mountain')} />
      <polygon points="220,380 320,260 420,380" {...reg(fills, onRegion, 'mountain-peak')} />
      {/* snow caps — non-colorable streaks */}
      <path d="M 300 282 L 308 282 L 320 296 L 290 296 Z" fill={STROKE} stroke="none" opacity="0.35" />

      {/* clouds at base */}
      <path d="M 40 460 Q 80 440 130 446 Q 150 426 190 432 Q 220 414 260 432 Q 310 416 360 434 Q 410 418 460 434 Q 510 422 560 446 L 560 488 L 40 488 Z" {...reg(fills, onRegion, 'cloud-base')} />
      <path d="M 100 500 Q 160 484 220 500 Q 260 488 320 500 Q 380 484 440 500 Q 480 490 540 500 L 540 528 L 100 528 Z" {...reg(fills, onRegion, 'cloud-base-2')} />

      {/* ---- Throne ---- */}
      {/* throne back */}
      <path d="M 196 296 L 404 296 L 404 200 Q 404 178 384 178 L 216 178 Q 196 178 196 200 Z" {...reg(fills, onRegion, 'throne-back')} />
      {/* finial spirals on top corners */}
      <path d="M 196 178 Q 184 168 198 158 Q 210 168 204 178" fill="none" stroke={STROKE} strokeWidth="2.4" />
      <path d="M 404 178 Q 416 168 402 158 Q 390 168 396 178" fill="none" stroke={STROKE} strokeWidth="2.4" />
      {/* throne seat */}
      <rect x="180" y="296" width="240" height="30" rx="3" {...reg(fills, onRegion, 'throne-seat')} />
      {/* throne base */}
      <rect x="200" y="326" width="200" height="106" {...reg(fills, onRegion, 'throne-base')} />
      {/* throne plinth steps */}
      <rect x="170" y="432" width="260" height="20" {...reg(fills, onRegion, 'throne-step-1')} />
      <rect x="150" y="452" width="300" height="18" {...reg(fills, onRegion, 'throne-step-2')} />
      {/* base panel decoration */}
      <rect x="232" y="346" width="136" height="62" rx="3" {...reg(fills, onRegion, 'throne-panel')} />
      <line x1="300" y1="346" x2="300" y2="408" stroke={STROKE} strokeWidth="1.4" />

      {/* ---- Zeus figure ---- */}
      {/* legs / lap robe — broad drape across seat */}
      <path d="M 218 290 Q 218 358 240 410 L 360 410 Q 382 358 382 290 Z" {...reg(fills, onRegion, 'robe-lap')} />
      {/* drape folds */}
      <path d="M 268 300 Q 268 360 274 408" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M 300 300 Q 300 360 300 408" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M 332 300 Q 332 360 326 408" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* sandaled feet */}
      <ellipse cx="252" cy="416" rx="20" ry="10" {...reg(fills, onRegion, 'foot-l')} />
      <ellipse cx="348" cy="416" rx="20" ry="10" {...reg(fills, onRegion, 'foot-r')} />
      <line x1="252" y1="412" x2="252" y2="422" stroke={STROKE} strokeWidth="1.4" />
      <line x1="348" y1="412" x2="348" y2="422" stroke={STROKE} strokeWidth="1.4" />

      {/* torso / chiton */}
      <path d="M 232 290 Q 232 234 300 222 Q 368 234 368 290 Z" {...reg(fills, onRegion, 'chiton')} />
      {/* chest fold */}
      <path d="M 256 248 Q 300 264 344 248" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* shoulder fold drape diagonally */}
      <path d="M 268 234 L 332 234 L 348 258 L 252 258 Z" {...reg(fills, onRegion, 'shoulder-drape')} />

      {/* right arm — extended outward holding lightning */}
      <path d="M 368 244 Q 412 232 446 198 Q 456 192 460 200 Q 432 240 384 268 Q 372 270 368 264 Z" {...reg(fills, onRegion, 'arm-r')} />
      {/* lightning bolt — bright zigzag */}
      <g style={alive ? { animation: 'glow-pulse 1.4s ease-in-out infinite', transformOrigin: '460px 158px' } : null}>
        <path d="M 470 186 L 452 158 L 466 156 L 446 122 L 478 142 L 466 144 L 488 168 Z" {...reg(fills, onRegion, 'bolt')} />
      </g>
      {/* left arm — across lap, holding small scepter */}
      <path d="M 232 244 Q 198 254 178 286 Q 174 296 182 300 Q 218 290 244 282 Q 246 268 240 256 Z" {...reg(fills, onRegion, 'arm-l')} />
      {/* scepter shaft */}
      <line x1="178" y1="290" x2="148" y2="172" stroke={STROKE} strokeWidth="3" />
      {/* scepter top — small orb */}
      <circle cx="148" cy="170" r="9" {...reg(fills, onRegion, 'scepter-orb')} />

      {/* neck */}
      <path d="M 286 196 L 314 196 L 316 222 L 284 222 Z" {...reg(fills, onRegion, 'neck')} />
      {/* face */}
      <ellipse cx="300" cy="170" rx="38" ry="44" {...reg(fills, onRegion, 'face')} />
      {/* hair — flowing */}
      <path d="M 262 168 Q 256 122 300 116 Q 344 122 338 168 Q 334 154 326 150 Q 312 168 300 158 Q 286 168 274 150 Q 266 154 262 168 Z" {...reg(fills, onRegion, 'hair')} />
      {/* side hair locks */}
      <path d="M 262 180 Q 250 218 272 234 Q 264 212 268 184 Z" {...reg(fills, onRegion, 'hair-l')} />
      <path d="M 338 180 Q 350 218 328 234 Q 336 212 332 184 Z" {...reg(fills, onRegion, 'hair-r')} />
      {/* beard — long, curly */}
      <path d="M 268 200 Q 264 248 288 264 Q 300 270 312 264 Q 336 248 332 200 Q 322 226 300 224 Q 278 226 268 200 Z" {...reg(fills, onRegion, 'beard')} />
      {/* laurel wreath */}
      <g style={alive ? { animation: 'glow-pulse 2s ease-in-out infinite' } : null}>
        <path d="M 260 132 Q 260 116 280 116 Q 296 116 300 124 Q 304 116 320 116 Q 340 116 340 132 Q 336 124 320 124 Q 308 124 300 132 Q 292 124 280 124 Q 264 124 260 132 Z" {...reg(fills, onRegion, 'laurel')} />
        {/* leaf detail lines */}
        <line x1="266" y1="124" x2="276" y2="120" stroke={STROKE} strokeWidth="1.4" />
        <line x1="282" y1="120" x2="290" y2="124" stroke={STROKE} strokeWidth="1.4" />
        <line x1="310" y1="124" x2="318" y2="120" stroke={STROKE} strokeWidth="1.4" />
        <line x1="324" y1="120" x2="334" y2="124" stroke={STROKE} strokeWidth="1.4" />
      </g>
      {/* face features */}
      <circle cx="286" cy="166" r="2.6" fill={STROKE} stroke="none" />
      <circle cx="314" cy="166" r="2.6" fill={STROKE} stroke="none" />
      <path d="M 278 158 Q 286 152 294 158" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M 306 158 Q 314 152 322 158" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M 300 176 L 296 192 Q 300 198 304 192 Z" fill="none" stroke={STROKE} strokeWidth="1.6" />

      {/* eagle perched on throne arm-right */}
      <g style={alive ? { animation: 'gentle-bob 2.4s ease-in-out infinite' } : null}>
        <ellipse cx="408" cy="312" rx="22" ry="14" {...reg(fills, onRegion, 'eagle-body')} />
        <circle cx="430" cy="302" r="9" {...reg(fills, onRegion, 'eagle-head')} />
        <path d="M 438 300 L 446 302 L 438 306 Z" fill={STROKE} stroke="none" />
        <circle cx="432" cy="300" r="1.6" fill={STROKE} stroke="none" />
        {/* wing */}
        <path d="M 396 304 Q 380 286 388 320 Q 400 322 408 312 Z" {...reg(fills, onRegion, 'eagle-wing')} />
        {/* legs */}
        <line x1="402" y1="324" x2="402" y2="330" stroke={STROKE} strokeWidth="2" />
        <line x1="414" y1="324" x2="414" y2="330" stroke={STROKE} strokeWidth="2" />
      </g>

      {/* banner */}
      <rect x="170" y="528" width="260" height="38" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="554" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="20" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>MOUNT OLYMPUS</text>
    </svg>
  );
}

// ----- 21. ROMAN LEGIONARY -----
function LegionarySVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '470px 110px' } : null}>
        <circle cx="470" cy="110" r="34" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* cloud */}
      <path d="M 80 90 Q 80 70 102 70 Q 108 56 128 56 Q 148 56 152 70 Q 172 70 172 90 Z" {...reg(fills, onRegion, 'cloud')} />
      {/* distant aqueduct silhouette */}
      <rect x="40" y="380" width="520" height="14" {...reg(fills, onRegion, 'aqueduct-top')} />
      {[0,1,2,3,4,5,6,7].map(i => (
        <path key={`aq-${i}`}
          d={`M ${60 + i*64} 394 L ${60 + i*64} 426 Q ${82 + i*64} 444 ${104 + i*64} 426 L ${104 + i*64} 394 Z`}
          {...reg(fills, onRegion, `arch-${i}`)} />
      ))}
      <rect x="40" y="394" width="520" height="14" fill="none" stroke={STROKE} strokeWidth="2" />

      {/* ground (paved stones) */}
      <path d="M 20 470 Q 200 462 380 470 Q 480 464 580 470 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'ground')} />
      {/* stone tile lines */}
      <line x1="80" y1="500" x2="540" y2="500" stroke={STROKE} strokeWidth="1.2" />
      <line x1="40" y1="530" x2="580" y2="530" stroke={STROKE} strokeWidth="1.2" />
      <line x1="160" y1="490" x2="160" y2="540" stroke={STROKE} strokeWidth="1.2" />
      <line x1="280" y1="490" x2="280" y2="540" stroke={STROKE} strokeWidth="1.2" />
      <line x1="380" y1="490" x2="380" y2="540" stroke={STROKE} strokeWidth="1.2" />
      <line x1="480" y1="490" x2="480" y2="540" stroke={STROKE} strokeWidth="1.2" />

      {/* standard pole with SPQR banner (behind legionary, left) */}
      <line x1="170" y1="480" x2="170" y2="160" stroke={STROKE} strokeWidth="3" />
      {/* eagle finial */}
      <g>
        <ellipse cx="170" cy="148" rx="14" ry="8" {...reg(fills, onRegion, 'standard-eagle')} />
        <circle cx="158" cy="144" r="6" {...reg(fills, onRegion, 'standard-eagle-head')} />
        <path d="M 152 144 L 144 146 L 152 150 Z" fill={STROKE} stroke="none" />
        <path d="M 170 140 Q 174 128 184 132 Q 178 138 174 144 Z" {...reg(fills, onRegion, 'standard-wing')} />
      </g>
      <g style={alive ? { animation: 'wave-flag 3s ease-in-out infinite', transformOrigin: '170px 200px' } : null}>
        <path d="M 170 168 L 220 174 L 212 186 L 220 198 L 212 210 L 220 222 L 170 220 Z" {...reg(fills, onRegion, 'standard-banner')} />
        <text x="194" y="200" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="11" fontWeight="900" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>SPQR</text>
      </g>
      {/* round medallion on pole */}
      <circle cx="170" cy="246" r="8" {...reg(fills, onRegion, 'standard-medal')} />

      {/* ---- Legionary (front view, center) ---- */}
      {/* red cloak behind shoulders */}
      <path d="M 246 252 Q 220 280 220 380 L 240 390 L 240 290 Z" {...reg(fills, onRegion, 'cape-l')} />
      <path d="M 354 252 Q 380 280 380 380 L 360 390 L 360 290 Z" {...reg(fills, onRegion, 'cape-r')} />

      {/* legs (lower) — tunic visible */}
      <rect x="276" y="396" width="22" height="50" {...reg(fills, onRegion, 'leg-l')} />
      <rect x="302" y="396" width="22" height="50" {...reg(fills, onRegion, 'leg-r')} />
      {/* sandals (caligae) */}
      <ellipse cx="287" cy="454" rx="16" ry="8" {...reg(fills, onRegion, 'sandal-l')} />
      <ellipse cx="313" cy="454" rx="16" ry="8" {...reg(fills, onRegion, 'sandal-r')} />
      {/* sandal straps */}
      <line x1="278" y1="446" x2="296" y2="450" stroke={STROKE} strokeWidth="1.4" />
      <line x1="280" y1="450" x2="294" y2="454" stroke={STROKE} strokeWidth="1.4" />
      <line x1="304" y1="446" x2="322" y2="450" stroke={STROKE} strokeWidth="1.4" />
      <line x1="306" y1="450" x2="320" y2="454" stroke={STROKE} strokeWidth="1.4" />

      {/* pteruges (leather strips over groin) */}
      {[260,278,296,314,332].map((x,i) => (
        <path key={`pt-${i}`} d={`M ${x} 370 L ${x+12} 370 L ${x+10} 396 L ${x+2} 396 Z`} {...reg(fills, onRegion, `pteruge-${i}`)} />
      ))}

      {/* tunic under armor */}
      <path d="M 252 280 L 348 280 L 348 372 L 252 372 Z" {...reg(fills, onRegion, 'tunic')} />

      {/* lorica segmentata — 4 horizontal bands of armor */}
      <path d="M 246 274 L 354 274 L 354 298 L 246 298 Z" {...reg(fills, onRegion, 'lorica-1')} />
      <path d="M 246 298 L 354 298 L 354 320 L 246 320 Z" {...reg(fills, onRegion, 'lorica-2')} />
      <path d="M 246 320 L 354 320 L 354 342 L 246 342 Z" {...reg(fills, onRegion, 'lorica-3')} />
      <path d="M 246 342 L 354 342 L 354 364 L 246 364 Z" {...reg(fills, onRegion, 'lorica-4')} />
      {/* studs */}
      {[256,300,344].map((x,i) => <circle key={`s1-${i}`} cx={x} cy="286" r="2" fill={STROKE} stroke="none" />)}
      {[256,300,344].map((x,i) => <circle key={`s2-${i}`} cx={x} cy="310" r="2" fill={STROKE} stroke="none" />)}
      {[256,300,344].map((x,i) => <circle key={`s3-${i}`} cx={x} cy="332" r="2" fill={STROKE} stroke="none" />)}
      {[256,300,344].map((x,i) => <circle key={`s4-${i}`} cx={x} cy="354" r="2" fill={STROKE} stroke="none" />)}

      {/* shoulder pauldrons */}
      <path d="M 246 274 Q 232 256 252 252 Q 270 256 268 274 Z" {...reg(fills, onRegion, 'pauldron-l')} />
      <path d="M 354 274 Q 368 256 348 252 Q 330 256 332 274 Z" {...reg(fills, onRegion, 'pauldron-r')} />

      {/* arms — gladius arm holds sword pointing down */}
      <path d="M 354 290 Q 380 320 388 380 L 372 384 Q 362 340 348 314 Z" {...reg(fills, onRegion, 'arm-r')} />
      {/* gladius sword */}
      <rect x="378" y="384" width="6" height="80" {...reg(fills, onRegion, 'gladius-blade')} />
      <path d="M 376 462 L 386 462 L 381 472 Z" fill={STROKE} stroke="none" />
      <rect x="370" y="378" width="22" height="8" {...reg(fills, onRegion, 'gladius-guard')} />
      <rect x="375" y="368" width="12" height="12" {...reg(fills, onRegion, 'gladius-hilt')} />

      {/* shield arm — holds scutum at left side */}
      <path d="M 246 290 Q 220 314 216 358 L 232 362 Q 240 332 252 312 Z" {...reg(fills, onRegion, 'arm-l')} />
      {/* scutum (large rectangular curved Roman shield) */}
      <path d="M 154 286 Q 142 360 154 432 Q 178 442 230 432 Q 218 360 230 286 Q 192 276 154 286 Z" {...reg(fills, onRegion, 'shield')} />
      {/* shield wing emblem */}
      <path d="M 168 350 Q 192 320 192 360 Q 192 320 216 350" fill="none" stroke={STROKE} strokeWidth="2.4" />
      {/* shield lightning bolt */}
      <path d="M 192 332 L 184 354 L 192 354 L 184 376 L 200 348 L 192 348 L 200 332 Z" {...reg(fills, onRegion, 'shield-bolt')} />
      {/* shield boss (center metal stud) */}
      <circle cx="192" cy="360" r="9" {...reg(fills, onRegion, 'shield-boss')} />

      {/* neck */}
      <path d="M 288 240 L 312 240 L 314 274 L 286 274 Z" {...reg(fills, onRegion, 'neck')} />

      {/* face */}
      <ellipse cx="300" cy="222" rx="28" ry="32" {...reg(fills, onRegion, 'face')} />

      {/* helmet (galea) — dome with cheek guards */}
      <path d="M 270 220 Q 268 174 300 168 Q 332 174 330 220 L 326 220 Q 326 188 300 184 Q 274 188 274 220 Z" {...reg(fills, onRegion, 'helmet-dome')} />
      {/* helmet brim */}
      <rect x="266" y="218" width="68" height="10" rx="2" {...reg(fills, onRegion, 'helmet-brim')} />
      {/* neck guard (back flare) */}
      <path d="M 270 226 Q 264 246 274 254 L 272 226 Z" {...reg(fills, onRegion, 'helmet-neck-l')} />
      <path d="M 330 226 Q 336 246 326 254 L 328 226 Z" {...reg(fills, onRegion, 'helmet-neck-r')} />
      {/* cheek guards */}
      <path d="M 274 226 L 282 226 L 282 248 Q 278 252 274 248 Z" {...reg(fills, onRegion, 'cheek-l')} />
      <path d="M 326 226 L 318 226 L 318 248 Q 322 252 326 248 Z" {...reg(fills, onRegion, 'cheek-r')} />
      {/* red crest plume — bristle along top, side-aligned */}
      <g style={alive ? { animation: 'wave-flag 2.6s ease-in-out infinite', transformOrigin: '300px 178px' } : null}>
        <path d="M 282 174 Q 286 144 300 142 Q 314 144 318 174 Q 312 156 300 156 Q 288 156 282 174 Z" {...reg(fills, onRegion, 'plume')} />
        {/* bristle lines */}
        <line x1="288" y1="172" x2="290" y2="156" stroke={STROKE} strokeWidth="1.4" />
        <line x1="296" y1="172" x2="296" y2="150" stroke={STROKE} strokeWidth="1.4" />
        <line x1="304" y1="172" x2="304" y2="150" stroke={STROKE} strokeWidth="1.4" />
        <line x1="312" y1="172" x2="310" y2="156" stroke={STROKE} strokeWidth="1.4" />
      </g>
      {/* face features */}
      <circle cx="290" cy="222" r="2.4" fill={STROKE} stroke="none" />
      <circle cx="310" cy="222" r="2.4" fill={STROKE} stroke="none" />
      <path d="M 296 238 Q 300 242 304 238" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M 298 246 Q 300 250 302 246" fill="none" stroke={STROKE} strokeWidth="1.6" />

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="18" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>ROMAN LEGION · SPQR</text>
    </svg>
  );
}

// ----- 22. ROMULUS & REMUS WITH THE SHE-WOLF — 753 BC -----
function SheWolfSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '120px 110px' } : null}>
        <circle cx="120" cy="110" r="32" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* cloud */}
      <path d="M 400 80 Q 400 60 422 60 Q 428 46 448 46 Q 468 46 472 60 Q 492 60 492 80 Z" {...reg(fills, onRegion, 'cloud')} />

      {/* seven hills of Rome — rolling silhouette */}
      <path d="M 20 320 Q 70 260 130 300 Q 180 240 240 280 Q 300 240 360 286 Q 420 240 480 286 Q 530 250 580 300 L 580 380 L 20 380 Z" {...reg(fills, onRegion, 'hills-far')} />
      <path d="M 20 360 Q 80 320 160 350 Q 240 310 320 350 Q 400 320 480 354 Q 540 330 580 360 L 580 400 L 20 400 Z" {...reg(fills, onRegion, 'hills-near')} />

      {/* Tiber river */}
      <path d="M 20 410 Q 200 400 380 410 Q 480 404 580 410 L 580 446 L 20 446 Z" {...reg(fills, onRegion, 'tiber')} />
      {/* river ripples */}
      <path d="M 60 426 Q 90 420 120 426" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 460 428 Q 490 422 520 428" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 260 432 Q 290 426 320 432" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* near grass bank */}
      <path d="M 20 446 L 580 446 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'grass')} />
      {/* grass tufts — non-colorable */}
      {[60,150,420,520].map((x,i) => (
        <path key={`g-${i}`} d={`M ${x} 478 L ${x+4} 470 L ${x+8} 478 L ${x+12} 470 L ${x+16} 478`} fill="none" stroke={STROKE} strokeWidth="1.4" />
      ))}

      {/* Fig tree (Ficus Ruminalis) on left */}
      <path d="M 70 470 Q 74 410 64 360 Q 78 410 84 470 Z" {...reg(fills, onRegion, 'fig-trunk')} />
      <g style={alive ? { animation: 'wave-flag 3.2s ease-in-out infinite', transformOrigin: '74px 360px' } : null}>
        <ellipse cx="50" cy="346" rx="34" ry="26" {...reg(fills, onRegion, 'fig-leaf-l')} />
        <ellipse cx="98" cy="340" rx="34" ry="26" {...reg(fills, onRegion, 'fig-leaf-r')} />
        <ellipse cx="74" cy="312" rx="32" ry="24" {...reg(fills, onRegion, 'fig-leaf-t')} />
        {/* figs */}
        <circle cx="58" cy="360" r="5" {...reg(fills, onRegion, 'fig-1')} />
        <circle cx="88" cy="362" r="5" {...reg(fills, onRegion, 'fig-2')} />
      </g>

      {/* cave entrance behind wolf */}
      <path d="M 380 478 Q 380 396 460 392 Q 540 396 540 478 Z" {...reg(fills, onRegion, 'cave')} />
      {/* cave inner shadow */}
      <path d="M 408 474 Q 408 416 460 414 Q 512 416 512 474 Z" fill={STROKE} stroke="none" opacity="0.55" />

      {/* ---- She-Wolf (Lupa) — side profile facing left ---- */}
      {/* tail */}
      <path d="M 410 354 Q 466 326 480 348 Q 472 360 444 358 Z" {...reg(fills, onRegion, 'wolf-tail')} />
      {/* body */}
      <path d="M 180 370 Q 180 326 220 320 L 400 320 Q 432 326 426 370 Q 424 410 380 410 L 230 410 Q 188 410 180 370 Z" {...reg(fills, onRegion, 'wolf-body')} />
      {/* belly fur seam */}
      <path d="M 220 408 Q 300 416 380 408" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* legs — 4, standing */}
      <rect x="206" y="408" width="20" height="58" {...reg(fills, onRegion, 'wolf-leg-fl')} />
      <rect x="234" y="408" width="20" height="58" {...reg(fills, onRegion, 'wolf-leg-fr')} />
      <rect x="352" y="408" width="20" height="58" {...reg(fills, onRegion, 'wolf-leg-bl')} />
      <rect x="380" y="408" width="20" height="58" {...reg(fills, onRegion, 'wolf-leg-br')} />
      {/* paws */}
      <ellipse cx="216" cy="468" rx="12" ry="6" {...reg(fills, onRegion, 'paw-fl')} />
      <ellipse cx="244" cy="468" rx="12" ry="6" {...reg(fills, onRegion, 'paw-fr')} />
      <ellipse cx="362" cy="468" rx="12" ry="6" {...reg(fills, onRegion, 'paw-bl')} />
      <ellipse cx="390" cy="468" rx="12" ry="6" {...reg(fills, onRegion, 'paw-br')} />

      {/* ruff (chest fur) */}
      <path d="M 196 332 Q 184 360 196 386 Q 178 370 174 354 Q 178 338 196 332 Z" {...reg(fills, onRegion, 'wolf-ruff')} />

      {/* head — pointed snout to left */}
      <path d="M 196 322 Q 158 326 132 308 Q 122 296 132 286 Q 148 282 168 290 Q 184 268 208 274 Q 222 286 220 314 Q 216 326 196 326 Z" {...reg(fills, onRegion, 'wolf-head')} />
      {/* ears */}
      <path d="M 200 274 L 210 254 L 224 280 Z" {...reg(fills, onRegion, 'wolf-ear-l')} />
      <path d="M 218 280 L 234 258 L 238 286 Z" {...reg(fills, onRegion, 'wolf-ear-r')} />
      {/* eye */}
      <ellipse cx="178" cy="298" rx="3" ry="2.2" fill={STROKE} stroke="none" />
      {/* nose */}
      <ellipse cx="128" cy="296" rx="4" ry="3" fill={STROKE} stroke="none" />
      {/* mouth */}
      <path d="M 132 308 Q 146 314 162 308" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M 154 308 L 150 314 L 148 308" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* ---- Babies Romulus & Remus, sitting under wolf ---- */}
      {/* baby 1 — Romulus, reaching up */}
      <g style={alive ? { animation: 'gentle-bob 2.2s ease-in-out infinite' } : null}>
        <ellipse cx="270" cy="436" rx="22" ry="20" {...reg(fills, onRegion, 'baby1-body')} />
        <circle cx="270" cy="404" r="14" {...reg(fills, onRegion, 'baby1-head')} />
        {/* tuft of hair */}
        <path d="M 264 392 Q 270 384 276 392 Z" {...reg(fills, onRegion, 'baby1-hair')} />
        {/* face */}
        <circle cx="266" cy="404" r="1.4" fill={STROKE} stroke="none" />
        <circle cx="274" cy="404" r="1.4" fill={STROKE} stroke="none" />
        <path d="M 266 410 Q 270 412 274 410" fill="none" stroke={STROKE} strokeWidth="1.2" />
        {/* arm reaching up */}
        <path d="M 282 422 L 296 408 L 302 414 L 290 430 Z" {...reg(fills, onRegion, 'baby1-arm')} />
      </g>
      {/* baby 2 — Remus, sitting */}
      <g style={alive ? { animation: 'gentle-bob 2.4s ease-in-out infinite', animationDelay: '0.3s' } : null}>
        <ellipse cx="334" cy="438" rx="22" ry="20" {...reg(fills, onRegion, 'baby2-body')} />
        <circle cx="334" cy="406" r="14" {...reg(fills, onRegion, 'baby2-head')} />
        {/* tuft of hair */}
        <path d="M 328 394 Q 334 386 340 394 Z" {...reg(fills, onRegion, 'baby2-hair')} />
        {/* face */}
        <circle cx="330" cy="406" r="1.4" fill={STROKE} stroke="none" />
        <circle cx="338" cy="406" r="1.4" fill={STROKE} stroke="none" />
        <path d="M 330 412 Q 334 414 338 412" fill="none" stroke={STROKE} strokeWidth="1.2" />
        {/* arm reaching up to wolf */}
        <path d="M 322 422 L 308 410 L 304 416 L 316 430 Z" {...reg(fills, onRegion, 'baby2-arm')} />
      </g>

      {/* banner */}
      <rect x="170" y="528" width="260" height="38" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="554" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="20" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>ROMA · 753 BC</text>
    </svg>
  );
}

// ============================================================
// Page entries
// ============================================================
const GREEK_ROMAN_PAGES = [
  {
    id: 'trojan-horse',
    title: 'The Trojan Horse',
    subtitle: 'The Walls of Troy, c. 1200 BC',
    collection: 'world',
    eraLabel: 'Ancient Greece',
    eraColor: '#3D5A80',
    bgPreview: '#E8DEC4',
    fact: "After ten long years of war, the Greeks built a giant wooden horse, hid soldiers inside, and tricked the city of Troy into rolling it through the gates.",
    Component: TrojanHorseSVG,
    readingLevel: { lexile: 720, gradeBand: '3–4', guidedReading: 'N', wordCount: 22, complexity: 'Moderate' },
    keyVocab: ['Trojan', 'wooden', 'trick', 'soldiers', 'siege'],
    standards: ['RL.3.2', 'RL.4.1', 'SL.3.2', 'L.4.4'],
    regions: ['sky','sun','cloud','hill','wall','tower-l','tower-r','gate','ground','cart','wheel-0','wheel-1','wheel-2','leg-fl','leg-fr','leg-bl','leg-br','hoof-l','hoof-r','body','trapdoor','soldier-face','soldier-helmet','soldier-plume','neck','head','ear','mane','tail','shield-ground','banner'],
    quest: {
      heading: 'The Tale of Troy',
      author: 'Homer · The Iliad',
      lines: [
        'For ten long years the Greeks could not break the walls of {0}.',
        'So they built a hollow {1} of wood.',
        'Inside hid their bravest {2}.',
      ],
      blanks: [
        { answer: 'Troy',     choices: ['Troy',     'Toast',   'Train',   'Tuba']    },
        { answer: 'horse',    choices: ['horse',    'house',   'hammer',  'helmet']  },
        { answer: 'soldiers', choices: ['soldiers', 'snails',  'singers', 'sailors'] },
      ],
      voice: {
        // Stately, ancient narrator
        hints: [/daniel/i, /alex/i, /tom/i, /bruce/i, /reed/i, /microsoft (mark|guy)/i],
        rate: 0.74, pitch: 0.86,
      },
    },
  },
  {
    id: 'zeus',
    title: 'Zeus, King of the Gods',
    subtitle: 'Mount Olympus',
    collection: 'world',
    eraLabel: 'Greek Mythology',
    eraColor: '#4A6FA5',
    bgPreview: '#F6E1A8',
    fact: "The Greeks believed Zeus ruled the sky from Mount Olympus and threw thunderbolts when he was angry. His symbols were the eagle and the oak tree.",
    Component: ZeusSVG,
    readingLevel: { lexile: 760, gradeBand: '3–4', guidedReading: 'N', wordCount: 24, complexity: 'Moderate' },
    keyVocab: ['Olympus', 'thunder', 'mortal', 'mighty'],
    standards: ['RL.4.3', 'RL.3.2', 'L.4.4', 'SL.3.2'],
    regions: ['sky','mountain','mountain-peak','cloud-base','cloud-base-2','throne-back','throne-seat','throne-base','throne-step-1','throne-step-2','throne-panel','robe-lap','foot-l','foot-r','chiton','shoulder-drape','arm-r','bolt','arm-l','scepter-orb','neck','face','hair','hair-l','hair-r','beard','laurel','eagle-body','eagle-head','eagle-wing','banner'],
    quest: {
      heading: 'The King of the Gods',
      author: 'Greek Myth · Hesiod\u2019s Theogony',
      lines: [
        'I am Zeus, and I rule from Mount {0}.',
        'In my mighty hand I hold a {1} of fire.',
        'My royal bird is the soaring {2}.',
      ],
      blanks: [
        { answer: 'Olympus', choices: ['Olympus', 'Oatmeal', 'Onion',   'Octopus'] },
        { answer: 'bolt',    choices: ['bolt',    'broom',   'biscuit', 'balloon'] },
        { answer: 'eagle',   choices: ['eagle',   'emu',     'eel',     'egg']     },
      ],
      voice: {
        // Deep, booming god voice
        hints: [/bruce/i, /daniel/i, /fred/i, /tom/i, /alex/i, /microsoft mark/i],
        rate: 0.70, pitch: 0.70,
      },
    },
  },
  {
    id: 'legionary',
    title: 'The Roman Legionary',
    subtitle: 'The Eternal City',
    collection: 'world',
    eraLabel: 'Roman Empire',
    eraColor: '#A0522D',
    bgPreview: '#E9D7BC',
    fact: "A Roman legionary carried 60 pounds of gear and could march 20 miles in a single day. His shield, the scutum, locked together with his comrades' to form a wall called a testudo — \"tortoise.\"",
    Component: LegionarySVG,
    readingLevel: { lexile: 800, gradeBand: '4–5', guidedReading: 'O', wordCount: 22, complexity: 'Challenging' },
    keyVocab: ['legion', 'shield', 'gladius', 'senate', 'tortoise'],
    standards: ['RI.4.4', 'RI.4.1', 'L.4.4', 'SL.4.2'],
    regions: ['sky','sun','cloud','aqueduct-top','arch-0','arch-1','arch-2','arch-3','arch-4','arch-5','arch-6','arch-7','ground','standard-eagle','standard-eagle-head','standard-wing','standard-banner','standard-medal','cape-l','cape-r','leg-l','leg-r','sandal-l','sandal-r','pteruge-0','pteruge-1','pteruge-2','pteruge-3','pteruge-4','tunic','lorica-1','lorica-2','lorica-3','lorica-4','pauldron-l','pauldron-r','arm-r','gladius-blade','gladius-guard','gladius-hilt','arm-l','shield','shield-bolt','shield-boss','neck','face','helmet-dome','helmet-brim','helmet-neck-l','helmet-neck-r','cheek-l','cheek-r','plume','banner'],
    quest: {
      heading: 'Voice of the Legion',
      author: 'Imperial Rome · SPQR',
      lines: [
        'I march for the city of {0}.',
        'I carry a shield and a sharp {1}.',
        'I serve the Senate and the {2}.',
      ],
      blanks: [
        { answer: 'Rome',   choices: ['Rome',   'Raisin',  'Rope',    'Robot']  },
        { answer: 'sword',  choices: ['sword',  'spoon',   'sponge',  'sneeze'] },
        { answer: 'People', choices: ['People', 'Pickles', 'Puppies', 'Pumpkins'] },
      ],
      voice: {
        // Firm commander voice
        hints: [/daniel/i, /tom/i, /alex/i, /bruce/i, /reed/i, /microsoft (mark|guy|davis)/i],
        rate: 0.78, pitch: 0.82,
      },
    },
  },
  {
    id: 'she-wolf',
    title: 'The She-Wolf of Rome',
    subtitle: 'By the River Tiber, 753 BC',
    collection: 'world',
    eraLabel: 'Founding of Rome',
    eraColor: '#8B3A3A',
    bgPreview: '#E7CFB3',
    fact: "Roman legend says twin baby boys, Romulus and Remus, were found in a basket on the river Tiber and raised by a kind she-wolf. Romulus grew up to found the city of Rome.",
    Component: SheWolfSVG,
    readingLevel: { lexile: 680, gradeBand: '3–4', guidedReading: 'M', wordCount: 28, complexity: 'Moderate' },
    keyVocab: ['legend', 'twins', 'Tiber', 'founded'],
    standards: ['RL.3.2', 'RL.3.1', 'SL.3.2'],
    regions: ['sky','sun','cloud','hills-far','hills-near','tiber','grass','fig-trunk','fig-leaf-l','fig-leaf-r','fig-leaf-t','fig-1','fig-2','cave','wolf-tail','wolf-body','wolf-leg-fl','wolf-leg-fr','wolf-leg-bl','wolf-leg-br','paw-fl','paw-fr','paw-bl','paw-br','wolf-ruff','wolf-head','wolf-ear-l','wolf-ear-r','baby1-body','baby1-head','baby1-hair','baby1-arm','baby2-body','baby2-head','baby2-hair','baby2-arm','banner'],
    quest: {
      heading: 'A Roman Legend',
      author: 'Roman Myth · c. 753 BC',
      lines: [
        'A kind she-wolf found two baby {0}.',
        'She raised them by the river {1}.',
        'One brother, Romulus, grew up to found the city of {2}.',
      ],
      blanks: [
        { answer: 'twins', choices: ['twins', 'turnips', 'tubas',  'towels'] },
        { answer: 'Tiber', choices: ['Tiber', 'Tiger',   'Toaster','Tulip'] },
        { answer: 'Rome',  choices: ['Rome',  'Rabbit',  'Recipe', 'River'] },
      ],
      voice: {
        // Warm storyteller voice
        hints: [/samantha/i, /allison/i, /ava/i, /karen/i, /microsoft (aria|jenny|zira)/i, /susan/i],
        rate: 0.82, pitch: 1.02,
      },
    },
  },
];

if (window.PAGES_DATA && Array.isArray(window.PAGES_DATA)) {
  GREEK_ROMAN_PAGES.forEach(p => window.PAGES_DATA.push(p));
}

Object.assign(window, { TrojanHorseSVG, ZeusSVG, LegionarySVG, SheWolfSVG });
