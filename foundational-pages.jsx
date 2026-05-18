// =================================================================
// Foundational gaps — 4 additions filling big missing eras:
//   • Stonehenge (Prehistoric Britain, c. 2500 BC)
//   • Mesopotamian Ziggurat (Sumer, c. 2100 BC)
//   • Genghis Khan (Mongol Empire, c. 1200)
//   • The Santa María (Christopher Columbus, 1492)
// =================================================================

// ----- 47. STONEHENGE — Salisbury Plain, c. 2500 BC -----
function StonehengeSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky — sunrise */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* rising sun positioned to align between center stones */}
      <g style={alive ? { animation: 'sun-pulse 2.8s ease-in-out infinite', transformOrigin: '300px 290px' } : null}>
        <circle cx="300" cy="290" r="50" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* sun rays */}
      {Array.from({length:12}).map((_,i)=>{
        const a = i * Math.PI * 2 / 12;
        return <line key={`sr-${i}`} x1={300 + Math.cos(a)*58} y1={290 + Math.sin(a)*58} x2={300 + Math.cos(a)*80} y2={290 + Math.sin(a)*80} stroke={STROKE} strokeWidth="2" />;
      })}
      {/* clouds */}
      <path d="M 60 130 Q 60 110 82 110 Q 88 96 108 96 Q 128 96 132 110 Q 152 110 152 130 Z" {...reg(fills, onRegion, 'cloud-l')} />
      <path d="M 460 110 Q 460 92 480 92 Q 486 78 504 78 Q 522 78 526 92 Q 544 92 544 110 Z" {...reg(fills, onRegion, 'cloud-r')} />

      {/* distant hill */}
      <path d="M 20 410 Q 200 380 400 410 Q 500 396 580 410 L 580 440 L 20 440 Z" {...reg(fills, onRegion, 'hill')} />

      {/* grass plain */}
      <path d="M 20 410 L 580 410 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'plain')} />
      {/* grass tufts */}
      {[60,140,440,520].map((x,i) => (
        <path key={`gt-${i}`} d={`M ${x} 478 L ${x+4} 466 L ${x+8} 478 L ${x+12} 466 L ${x+16} 478`} fill="none" stroke={STROKE} strokeWidth="1.4" />
      ))}

      {/* back-row stones — 4 smaller trilithons behind the front */}
      <rect x="100" y="324" width="32" height="80" {...reg(fills, onRegion, 'back-up-1')} />
      <rect x="156" y="324" width="32" height="80" {...reg(fills, onRegion, 'back-up-2')} />
      <rect x="92" y="306" width="104" height="18" {...reg(fills, onRegion, 'back-lintel-l')} />
      <rect x="412" y="324" width="32" height="80" {...reg(fills, onRegion, 'back-up-3')} />
      <rect x="468" y="324" width="32" height="80" {...reg(fills, onRegion, 'back-up-4')} />
      <rect x="404" y="306" width="104" height="18" {...reg(fills, onRegion, 'back-lintel-r')} />

      {/* inner bluestones (smaller stones in a circle inside) */}
      <rect x="222" y="370" width="20" height="50" {...reg(fills, onRegion, 'bluestone-l')} />
      <rect x="358" y="370" width="20" height="50" {...reg(fills, onRegion, 'bluestone-r')} />
      <rect x="290" y="376" width="20" height="42" {...reg(fills, onRegion, 'bluestone-c')} />

      {/* ---- main front trilithons (3) ---- */}
      {/* left trilithon */}
      <rect x="106" y="250" width="44" height="180" {...reg(fills, onRegion, 'upright-l-1')} />
      <rect x="172" y="250" width="44" height="180" {...reg(fills, onRegion, 'upright-l-2')} />
      <rect x="94" y="218" width="134" height="32" {...reg(fills, onRegion, 'lintel-l')} />
      {/* surface cracks on stones — non-colorable */}
      <line x1="124" y1="280" x2="120" y2="400" stroke={STROKE} strokeWidth="1.2" />
      <line x1="138" y1="320" x2="142" y2="420" stroke={STROKE} strokeWidth="1.2" />
      <line x1="186" y1="290" x2="184" y2="420" stroke={STROKE} strokeWidth="1.2" />
      <line x1="200" y1="280" x2="206" y2="400" stroke={STROKE} strokeWidth="1.2" />
      <line x1="110" y1="234" x2="220" y2="234" stroke={STROKE} strokeWidth="1.2" />

      {/* center trilithon — tallest */}
      <rect x="246" y="210" width="44" height="220" {...reg(fills, onRegion, 'upright-c-1')} />
      <rect x="312" y="210" width="44" height="220" {...reg(fills, onRegion, 'upright-c-2')} />
      <rect x="234" y="178" width="134" height="32" {...reg(fills, onRegion, 'lintel-c')} />
      <line x1="264" y1="240" x2="260" y2="420" stroke={STROKE} strokeWidth="1.2" />
      <line x1="278" y1="280" x2="282" y2="410" stroke={STROKE} strokeWidth="1.2" />
      <line x1="326" y1="250" x2="324" y2="420" stroke={STROKE} strokeWidth="1.2" />
      <line x1="340" y1="240" x2="346" y2="400" stroke={STROKE} strokeWidth="1.2" />
      <line x1="252" y1="194" x2="358" y2="194" stroke={STROKE} strokeWidth="1.2" />

      {/* right trilithon */}
      <rect x="386" y="250" width="44" height="180" {...reg(fills, onRegion, 'upright-r-1')} />
      <rect x="452" y="250" width="44" height="180" {...reg(fills, onRegion, 'upright-r-2')} />
      <rect x="374" y="218" width="134" height="32" {...reg(fills, onRegion, 'lintel-r')} />
      <line x1="404" y1="280" x2="400" y2="400" stroke={STROKE} strokeWidth="1.2" />
      <line x1="418" y1="320" x2="422" y2="420" stroke={STROKE} strokeWidth="1.2" />
      <line x1="466" y1="290" x2="464" y2="420" stroke={STROKE} strokeWidth="1.2" />
      <line x1="480" y1="280" x2="486" y2="400" stroke={STROKE} strokeWidth="1.2" />
      <line x1="390" y1="234" x2="500" y2="234" stroke={STROKE} strokeWidth="1.2" />

      {/* Heel stone (single tilted standing stone in the foreground left) */}
      <path d="M 60 530 L 76 522 L 80 470 L 64 478 Z" {...reg(fills, onRegion, 'heel-stone')} />

      {/* sheep grazing on plain (foreground right) */}
      <g style={alive ? { animation: 'gentle-bob 2.8s ease-in-out infinite' } : null}>
        <ellipse cx="510" cy="500" rx="24" ry="14" {...reg(fills, onRegion, 'sheep-body')} />
        <circle cx="488" cy="498" r="9" {...reg(fills, onRegion, 'sheep-head')} />
        <path d="M 484 492 L 480 484 L 484 488 Z" {...reg(fills, onRegion, 'sheep-ear-l')} />
        <path d="M 492 492 L 488 484 L 492 488 Z" {...reg(fills, onRegion, 'sheep-ear-r')} />
        <circle cx="485" cy="498" r="1.2" fill={STROKE} stroke="none" />
        <rect x="494" y="510" width="4" height="10" fill={STROKE} stroke="none" />
        <rect x="510" y="510" width="4" height="10" fill={STROKE} stroke="none" />
        <rect x="522" y="510" width="4" height="10" fill={STROKE} stroke="none" />
      </g>

      {/* small bird flying */}
      <g style={alive ? { animation: 'gentle-bob 2.4s ease-in-out infinite' } : null}>
        <path d="M 380 80 Q 388 72 396 80 Q 404 72 412 80" fill="none" stroke={STROKE} strokeWidth="2" />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>STONEHENGE · c. 2500 BC</text>
    </svg>
  );
}

// ----- 48. MESOPOTAMIAN ZIGGURAT — Ur, c. 2100 BC -----
function ZigguratSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun (Shamash) */}
      <g style={alive ? { animation: 'sun-pulse 2.6s ease-in-out infinite', transformOrigin: '480px 110px' } : null}>
        <circle cx="480" cy="110" r="34" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* sun rays */}
      {Array.from({length:8}).map((_,i)=>{
        const a = i * Math.PI / 4;
        return <line key={`sr-${i}`} x1={480 + Math.cos(a)*40} y1={110 + Math.sin(a)*40} x2={480 + Math.cos(a)*58} y2={110 + Math.sin(a)*58} stroke={STROKE} strokeWidth="2" />;
      })}
      {/* clouds */}
      <path d="M 60 100 Q 60 80 82 80 Q 88 66 108 66 Q 128 66 132 80 Q 152 80 152 100 Z" {...reg(fills, onRegion, 'cloud')} />

      {/* distant palm trees on horizon */}
      <path d="M 56 380 Q 60 340 52 304 Q 64 340 68 380 Z" {...reg(fills, onRegion, 'palm-trunk-l')} />
      <path d="M 60 302 Q 38 290 24 296 Q 44 304 60 312 Z" {...reg(fills, onRegion, 'palm-leaf-l1')} />
      <path d="M 60 302 Q 82 290 96 296 Q 76 304 60 312 Z" {...reg(fills, onRegion, 'palm-leaf-l2')} />
      <path d="M 58 300 Q 52 280 50 264 Q 60 280 64 298 Z" {...reg(fills, onRegion, 'palm-leaf-l3')} />

      <path d="M 540 380 Q 544 340 536 308 Q 548 340 552 380 Z" {...reg(fills, onRegion, 'palm-trunk-r')} />
      <path d="M 544 306 Q 522 294 508 300 Q 528 308 544 316 Z" {...reg(fills, onRegion, 'palm-leaf-r1')} />
      <path d="M 544 306 Q 566 294 580 300 Q 560 308 544 316 Z" {...reg(fills, onRegion, 'palm-leaf-r2')} />

      {/* Tigris/Euphrates river */}
      <path d="M 20 380 Q 200 372 380 380 Q 480 374 580 380 L 580 420 L 20 420 Z" {...reg(fills, onRegion, 'river')} />
      <path d="M 60 398 Q 90 392 120 398" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 360 400 Q 390 394 420 400" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 460 398 Q 490 392 520 398" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* sandy desert */}
      <path d="M 20 420 L 580 420 L 580 510 L 20 510 Z" {...reg(fills, onRegion, 'sand')} />

      {/* ---- The Ziggurat — 4-tiered stepped temple ---- */}
      {/* tier 1 (bottom largest) */}
      <path d="M 120 420 L 480 420 L 460 350 L 140 350 Z" {...reg(fills, onRegion, 'tier-1')} />
      {/* tier 2 */}
      <path d="M 160 350 L 440 350 L 420 290 L 180 290 Z" {...reg(fills, onRegion, 'tier-2')} />
      {/* tier 3 */}
      <path d="M 196 290 L 404 290 L 386 240 L 214 240 Z" {...reg(fills, onRegion, 'tier-3')} />
      {/* tier 4 (top platform) */}
      <path d="M 234 240 L 366 240 L 350 196 L 250 196 Z" {...reg(fills, onRegion, 'tier-4')} />

      {/* central staircase up the front */}
      <rect x="278" y="196" width="44" height="224" {...reg(fills, onRegion, 'staircase')} />
      {/* staircase step lines */}
      {[212,232,252,272,292,312,332,352,372,392,412].map((y,i) => (
        <line key={`ss-${i}`} x1="278" y1={y} x2="322" y2={y} stroke={STROKE} strokeWidth="1.2" />
      ))}

      {/* side staircases (perspective lines) */}
      <line x1="120" y1="420" x2="140" y2="350" stroke={STROKE} strokeWidth="1.4" />
      <line x1="160" y1="350" x2="180" y2="290" stroke={STROKE} strokeWidth="1.4" />
      <line x1="196" y1="290" x2="214" y2="240" stroke={STROKE} strokeWidth="1.4" />
      <line x1="234" y1="240" x2="250" y2="196" stroke={STROKE} strokeWidth="1.4" />
      <line x1="480" y1="420" x2="460" y2="350" stroke={STROKE} strokeWidth="1.4" />
      <line x1="440" y1="350" x2="420" y2="290" stroke={STROKE} strokeWidth="1.4" />
      <line x1="404" y1="290" x2="386" y2="240" stroke={STROKE} strokeWidth="1.4" />
      <line x1="366" y1="240" x2="350" y2="196" stroke={STROKE} strokeWidth="1.4" />

      {/* mud-brick texture — small dashes on tiers */}
      {[140,180,220,260,340,380,420,460].map((x,i) => (
        <line key={`bk-${i}`} x1={x} y1="380" x2={x+10} y2="380" stroke={STROKE} strokeWidth="1" />
      ))}
      {[180,220,260,340,380,420].map((x,i) => (
        <line key={`bk2-${i}`} x1={x} y1="320" x2={x+10} y2="320" stroke={STROKE} strokeWidth="1" />
      ))}
      {[220,260,340,380].map((x,i) => (
        <line key={`bk3-${i}`} x1={x} y1="266" x2={x+10} y2="266" stroke={STROKE} strokeWidth="1" />
      ))}

      {/* temple at the top */}
      <rect x="250" y="148" width="100" height="48" {...reg(fills, onRegion, 'temple')} />
      <path d="M 246 148 L 354 148 L 344 128 L 256 128 Z" {...reg(fills, onRegion, 'temple-roof')} />
      {/* temple doorway */}
      <path d="M 290 196 L 310 196 L 310 168 Q 300 158 290 168 Z" {...reg(fills, onRegion, 'temple-door')} />
      {/* small statue/symbol over doorway */}
      <circle cx="300" cy="142" r="6" {...reg(fills, onRegion, 'temple-disc')} />

      {/* foreground — clay cuneiform tablet */}
      <g style={alive ? { animation: 'glow-pulse 2.6s ease-in-out infinite' } : null}>
        <rect x="60" y="510" width="120" height="64" rx="6" {...reg(fills, onRegion, 'tablet')} />
        {/* cuneiform wedges — non-colorable */}
        <g fill={STROKE} stroke="none">
          {[74,94,114,134,154].map((x,i) => (
            <g key={`cu-${i}`}>
              <path d={`M ${x} 524 L ${x+4} 528 L ${x} 532 Z`} />
              <path d={`M ${x+6} 524 L ${x+10} 528 L ${x+6} 532 Z`} />
            </g>
          ))}
          {[74,94,114,134,154].map((x,i) => (
            <g key={`cu2-${i}`}>
              <path d={`M ${x} 540 L ${x+4} 544 L ${x} 548 Z`} />
              <path d={`M ${x+6} 540 L ${x+10} 544 L ${x+6} 548 Z`} />
            </g>
          ))}
          {[74,94,114,134].map((x,i) => (
            <g key={`cu3-${i}`}>
              <path d={`M ${x} 556 L ${x+4} 560 L ${x} 564 Z`} />
              <path d={`M ${x+6} 556 L ${x+10} 560 L ${x+6} 564 Z`} />
            </g>
          ))}
        </g>
      </g>

      {/* banner on right */}
      <rect x="220" y="540" width="320" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="380" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>GREAT ZIGGURAT OF UR · c. 2100 BC</text>
    </svg>
  );
}

// ----- 49. GENGHIS KHAN — Mongol Empire, c. 1200 -----
function GenghisKhanSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.6s ease-in-out infinite', transformOrigin: '120px 100px' } : null}>
        <circle cx="120" cy="100" r="32" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* cloud */}
      <path d="M 380 90 Q 380 70 402 70 Q 408 56 428 56 Q 448 56 452 70 Q 472 70 472 90 Z" {...reg(fills, onRegion, 'cloud')} />

      {/* distant Mongolian mountains */}
      <path d="M 20 320 Q 100 240 200 300 Q 300 250 400 310 Q 480 260 580 320 L 580 360 L 20 360 Z" {...reg(fills, onRegion, 'mountains')} />
      {/* snow caps */}
      <path d="M 188 268 L 212 268 L 218 282 L 184 282 Z" {...reg(fills, onRegion, 'snow-cap-l')} />
      <path d="M 380 282 L 400 282 L 406 296 L 374 296 Z" {...reg(fills, onRegion, 'snow-cap-r')} />

      {/* steppe (grassland) */}
      <path d="M 20 360 Q 200 350 400 360 Q 500 354 580 360 L 580 480 L 20 480 Z" {...reg(fills, onRegion, 'steppe')} />
      {/* grass tufts */}
      {[60,120,440,520].map((x,i) => (
        <path key={`gt-${i}`} d={`M ${x} 432 L ${x+4} 420 L ${x+8} 432 L ${x+12} 420 L ${x+16} 432`} fill="none" stroke={STROKE} strokeWidth="1.4" />
      ))}

      {/* yurt (ger) in distance left */}
      <g style={alive ? { animation: 'gentle-bob 4s ease-in-out infinite' } : null}>
        <path d="M 76 380 Q 76 348 116 348 Q 156 348 156 380 Z" {...reg(fills, onRegion, 'yurt-roof')} />
        <rect x="76" y="380" width="80" height="38" {...reg(fills, onRegion, 'yurt-wall')} />
        {/* smoke hole / pipe */}
        <rect x="112" y="332" width="8" height="20" {...reg(fills, onRegion, 'yurt-pipe')} />
        <path d="M 110 332 Q 106 320 116 312 Q 124 320 122 332 Z" fill="none" stroke={STROKE} strokeWidth="1.6" />
        {/* door */}
        <rect x="106" y="394" width="20" height="24" {...reg(fills, onRegion, 'yurt-door')} />
        {/* roof ribs — non-colorable */}
        {[80,100,116,132,152].map((x,i) => (
          <line key={`yr-${i}`} x1={x} y1="380" x2="116" y2="348" stroke={STROKE} strokeWidth="1.2" />
        ))}
      </g>

      {/* ground line below */}
      <path d="M 20 480 L 580 480 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'ground')} />

      {/* ---- HORSE (galloping right) ---- */}
      {/* legs in motion */}
      <rect x="248" y="380" width="14" height="76" {...reg(fills, onRegion, 'horse-leg-fl')} />
      <rect x="280" y="380" width="14" height="86" {...reg(fills, onRegion, 'horse-leg-fr')} />
      <rect x="378" y="380" width="14" height="80" {...reg(fills, onRegion, 'horse-leg-bl')} />
      <rect x="410" y="380" width="14" height="86" {...reg(fills, onRegion, 'horse-leg-br')} />
      {/* hooves */}
      <rect x="244" y="450" width="22" height="8" {...reg(fills, onRegion, 'hoof-fl')} />
      <rect x="276" y="460" width="22" height="8" {...reg(fills, onRegion, 'hoof-fr')} />
      <rect x="374" y="454" width="22" height="8" {...reg(fills, onRegion, 'hoof-bl')} />
      <rect x="406" y="460" width="22" height="8" {...reg(fills, onRegion, 'hoof-br')} />

      {/* horse body */}
      <path d="M 220 320 Q 220 280 280 280 L 420 280 Q 460 280 460 320 L 460 380 Q 440 396 380 392 L 260 392 Q 220 396 220 380 Z" {...reg(fills, onRegion, 'horse-body')} />
      {/* belly line */}
      <path d="M 240 380 Q 320 396 440 380" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* horse head */}
      <path d="M 460 330 Q 500 322 530 296 Q 540 290 546 296 Q 538 320 522 340 L 502 360 Q 480 362 460 358 Z" {...reg(fills, onRegion, 'horse-head')} />
      {/* horse mane */}
      <path d="M 432 280 Q 440 262 460 256 Q 458 272 452 286 Z" {...reg(fills, onRegion, 'horse-mane-1')} />
      <path d="M 444 296 Q 462 286 482 280 Q 472 296 458 308 Z" {...reg(fills, onRegion, 'horse-mane-2')} />
      {/* ear */}
      <path d="M 484 296 L 488 280 L 496 296 Z" {...reg(fills, onRegion, 'horse-ear')} />
      {/* eye & nostril */}
      <circle cx="514" cy="318" r="2.4" fill={STROKE} stroke="none" />
      <circle cx="534" cy="332" r="2" fill={STROKE} stroke="none" />
      <path d="M 524 344 Q 530 348 538 344" fill="none" stroke={STROKE} strokeWidth="1.4" />
      {/* bridle */}
      <line x1="494" y1="338" x2="540" y2="332" stroke={STROKE} strokeWidth="1.6" />
      <line x1="500" y1="356" x2="538" y2="350" stroke={STROKE} strokeWidth="1.6" />

      {/* horse tail */}
      <path d="M 220 320 Q 184 320 168 348 Q 158 372 174 380 Q 184 360 198 348 Q 214 340 224 336 Z" {...reg(fills, onRegion, 'horse-tail')} />

      {/* saddle blanket */}
      <path d="M 254 286 L 396 286 L 412 322 L 248 322 Z" {...reg(fills, onRegion, 'saddle-blanket')} />
      {/* blanket pattern */}
      <line x1="254" y1="304" x2="406" y2="304" stroke={STROKE} strokeWidth="1.4" />
      {[280,320,360,400].map((x,i) => (
        <circle key={`bp-${i}`} cx={x} cy="312" r="2.4" fill={STROKE} stroke="none" />
      ))}
      {/* tassels along bottom */}
      {[260,290,320,350,380,408].map((x,i) => (
        <path key={`bt-${i}`} d={`M ${x} 320 L ${x-3} 332 L ${x} 328 L ${x+3} 332 Z`} fill={STROKE} stroke="none" />
      ))}

      {/* saddle */}
      <path d="M 300 264 L 360 264 L 364 290 L 296 290 Z" {...reg(fills, onRegion, 'saddle')} />
      <rect x="298" y="262" width="64" height="6" {...reg(fills, onRegion, 'saddle-rim')} />

      {/* ---- GENGHIS KHAN ---- */}
      {/* legs / pants in saddle */}
      <path d="M 296 250 L 364 250 L 372 296 L 288 296 Z" {...reg(fills, onRegion, 'pants')} />
      {/* boot peeking */}
      <ellipse cx="300" cy="304" rx="16" ry="6" {...reg(fills, onRegion, 'boot')} />

      {/* deel (Mongol coat) */}
      <path d="M 286 162 L 374 162 L 384 256 L 276 256 Z" {...reg(fills, onRegion, 'deel')} />
      {/* coat cross-fold */}
      <path d="M 286 168 L 330 200 L 286 232 Z" {...reg(fills, onRegion, 'deel-fold')} />
      {/* belt sash */}
      <rect x="276" y="218" width="108" height="14" {...reg(fills, onRegion, 'belt')} />
      {/* belt buckle */}
      <rect x="320" y="218" width="20" height="14" {...reg(fills, onRegion, 'buckle')} />

      {/* right arm — extended, holding sword */}
      <path d="M 372 174 Q 420 172 460 158 L 466 174 Q 422 188 384 196 Z" {...reg(fills, onRegion, 'arm-r')} />
      {/* sword */}
      <line x1="466" y1="166" x2="540" y2="124" stroke={STROKE} strokeWidth="3.2" />
      <path d="M 540 124 L 552 116 L 548 124 Z" fill={STROKE} stroke="none" />
      <rect x="460" y="158" width="14" height="22" {...reg(fills, onRegion, 'sword-hilt')} />
      <ellipse cx="466" cy="184" rx="10" ry="3" {...reg(fills, onRegion, 'sword-pommel')} />

      {/* left arm — holds rein */}
      <path d="M 288 174 Q 264 200 256 246 L 274 248 Q 280 220 292 196 Z" {...reg(fills, onRegion, 'arm-l')} />
      <ellipse cx="262" cy="256" rx="10" ry="8" {...reg(fills, onRegion, 'hand-l')} />
      {/* rein */}
      <line x1="262" y1="256" x2="496" y2="350" stroke={STROKE} strokeWidth="2" />

      {/* quiver on back with arrows */}
      <rect x="248" y="180" width="22" height="44" {...reg(fills, onRegion, 'quiver')} />
      <line x1="252" y1="190" x2="252" y2="166" stroke={STROKE} strokeWidth="1.8" />
      <line x1="258" y1="190" x2="258" y2="160" stroke={STROKE} strokeWidth="1.8" />
      <line x1="264" y1="190" x2="264" y2="166" stroke={STROKE} strokeWidth="1.8" />
      {/* feathered tops */}
      <path d="M 250 162 L 254 156 L 252 168 Z" fill={STROKE} stroke="none" />
      <path d="M 256 156 L 260 150 L 258 162 Z" fill={STROKE} stroke="none" />
      <path d="M 262 162 L 266 156 L 264 168 Z" fill={STROKE} stroke="none" />

      {/* neck */}
      <path d="M 320 140 L 344 140 L 346 164 L 318 164 Z" {...reg(fills, onRegion, 'neck')} />

      {/* face */}
      <ellipse cx="332" cy="116" rx="22" ry="26" {...reg(fills, onRegion, 'face')} />
      {/* eyes — narrow */}
      <path d="M 320 112 Q 326 108 332 112" fill="none" stroke={STROKE} strokeWidth="2" />
      <path d="M 334 112 Q 340 108 346 112" fill="none" stroke={STROKE} strokeWidth="2" />
      <circle cx="326" cy="114" r="1.4" fill={STROKE} stroke="none" />
      <circle cx="340" cy="114" r="1.4" fill={STROKE} stroke="none" />
      {/* eyebrows — angled */}
      <path d="M 318 104 L 330 102" stroke={STROKE} strokeWidth="2" fill="none" />
      <path d="M 334 102 L 346 104" stroke={STROKE} strokeWidth="2" fill="none" />
      {/* nose */}
      <path d="M 332 118 L 328 130 Q 332 134 336 130 Z" fill="none" stroke={STROKE} strokeWidth="1.4" />
      {/* mustache — long Mongol-style drooping */}
      <path d="M 320 138 Q 320 154 312 158 Q 320 148 322 138 Z" {...reg(fills, onRegion, 'mustache-l')} />
      <path d="M 344 138 Q 344 154 352 158 Q 344 148 342 138 Z" {...reg(fills, onRegion, 'mustache-r')} />
      <path d="M 322 138 Q 332 142 342 138" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* beard — small goatee */}
      <path d="M 328 138 Q 332 152 336 138" fill="none" stroke={STROKE} strokeWidth="1.6" />

      {/* ---- Mongol fur hat (with tall point and ear flaps) ---- */}
      <g style={alive ? { animation: 'wave-flag 4s ease-in-out infinite', transformOrigin: '332px 90px' } : null}>
        <path d="M 308 90 L 356 90 L 350 60 L 314 60 Z" {...reg(fills, onRegion, 'hat-body')} />
        <path d="M 314 60 L 350 60 L 340 36 L 324 36 Z" {...reg(fills, onRegion, 'hat-peak')} />
        {/* fur trim */}
        <path d="M 304 88 Q 332 100 360 88 L 360 96 Q 332 108 304 96 Z" {...reg(fills, onRegion, 'hat-fur')} />
        {/* fluff dots on fur trim */}
        {[316,328,340,352].map((x,i) => (
          <circle key={`hf-${i}`} cx={x} cy="92" r="1.8" fill={STROKE} stroke="none" />
        ))}
        {/* peak ornament */}
        <circle cx="332" cy="34" r="3" fill={STROKE} stroke="none" />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>GENGHIS KHAN · c. 1200</text>
    </svg>
  );
}

// ----- 50. THE SANTA MARÍA — Columbus, 1492 -----
function SantaMariaSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.6s ease-in-out infinite', transformOrigin: '500px 110px' } : null}>
        <circle cx="500" cy="110" r="34" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds */}
      <path d="M 60 130 Q 60 110 82 110 Q 88 96 108 96 Q 128 96 132 110 Q 152 110 152 130 Z" {...reg(fills, onRegion, 'cloud-l')} />
      <path d="M 380 80 Q 380 64 398 64 Q 404 52 422 52 Q 440 52 444 64 Q 462 64 462 80 Z" {...reg(fills, onRegion, 'cloud-r')} />

      {/* distant Caribbean island (right) */}
      <ellipse cx="540" cy="450" rx="50" ry="14" {...reg(fills, onRegion, 'island')} />
      {/* palm tree on island */}
      <path d="M 542 444 Q 544 414 538 388 Q 548 414 550 444 Z" {...reg(fills, onRegion, 'island-palm-trunk')} />
      <path d="M 544 390 Q 526 380 514 384 Q 528 392 544 396 Z" {...reg(fills, onRegion, 'island-palm-leaf-l')} />
      <path d="M 546 390 Q 564 380 576 384 Q 562 392 546 396 Z" {...reg(fills, onRegion, 'island-palm-leaf-r')} />
      <path d="M 545 386 Q 542 368 540 354 Q 548 368 550 386 Z" {...reg(fills, onRegion, 'island-palm-leaf-u')} />

      {/* sea */}
      <path d="M 20 460 L 580 460 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'sea')} />
      {/* wave lines */}
      <path d="M 40 484 Q 80 476 120 484 Q 160 492 200 484" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 280 488 Q 320 480 360 488 Q 400 496 440 488" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 60 520 Q 100 512 140 520 Q 180 528 220 520" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 320 524 Q 360 516 400 524 Q 440 532 480 524" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 100 552 Q 140 544 180 552 Q 220 560 260 552" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* ---- The Santa María — carrack with 3 masts ---- */}
      <g style={alive ? { animation: 'gentle-bob 3.4s ease-in-out infinite' } : null}>
        {/* hull main body */}
        <path d="M 130 480 Q 130 504 160 514 L 440 514 Q 470 504 470 480 Q 440 466 300 466 Q 160 466 130 480 Z" {...reg(fills, onRegion, 'hull')} />
        {/* hull plank lines */}
        <line x1="140" y1="488" x2="460" y2="488" stroke={STROKE} strokeWidth="1.4" />
        <line x1="148" y1="502" x2="452" y2="502" stroke={STROKE} strokeWidth="1.4" />
        {/* gunport row */}
        {[160, 200, 240, 280, 320, 360, 400, 440].map((x,i) => (
          <rect key={`gp-${i}`} x={x} y={494} width="14" height="10" fill="none" stroke={STROKE} strokeWidth="1.4" />
        ))}

        {/* sterncastle (raised structure at back) */}
        <rect x="380" y="410" width="100" height="60" {...reg(fills, onRegion, 'sterncastle')} />
        {/* curved decorative edge of sterncastle */}
        <path d="M 480 420 L 488 414 L 488 466 L 480 466 Z" {...reg(fills, onRegion, 'sterncastle-trim')} />
        {/* sterncastle windows */}
        <rect x="394" y="424" width="16" height="20" fill="none" stroke={STROKE} strokeWidth="1.6" />
        <rect x="420" y="424" width="16" height="20" fill="none" stroke={STROKE} strokeWidth="1.6" />
        <rect x="446" y="424" width="16" height="20" fill="none" stroke={STROKE} strokeWidth="1.6" />
        {/* sterncastle roof */}
        <path d="M 378 410 L 484 410 L 478 396 L 384 396 Z" {...reg(fills, onRegion, 'sterncastle-roof')} />

        {/* forecastle (raised at front-left) */}
        <rect x="118" y="436" width="56" height="32" {...reg(fills, onRegion, 'forecastle')} />
        <path d="M 116 436 L 176 436 L 168 422 L 122 422 Z" {...reg(fills, onRegion, 'forecastle-roof')} />
        <rect x="126" y="446" width="14" height="18" fill="none" stroke={STROKE} strokeWidth="1.6" />
        <rect x="150" y="446" width="14" height="18" fill="none" stroke={STROKE} strokeWidth="1.6" />

        {/* bowsprit — extending forward and angled up */}
        <line x1="130" y1="466" x2="80" y2="430" stroke={STROKE} strokeWidth="3.2" />
        {/* spritsail */}
        <path d="M 96 444 L 132 444 L 132 462 L 96 462 Z" {...reg(fills, onRegion, 'spritsail')} />
        <line x1="96" y1="453" x2="132" y2="453" stroke={STROKE} strokeWidth="1.2" />

        {/* deck rail between forecastle & sterncastle */}
        <rect x="174" y="460" width="206" height="6" {...reg(fills, onRegion, 'deck-rail')} />

        {/* ---- masts (3) ---- */}
        {/* foremast (left, shorter) */}
        <line x1="200" y1="424" x2="200" y2="148" stroke={STROKE} strokeWidth="3" />
        {/* mainmast (center, tallest) */}
        <line x1="300" y1="466" x2="300" y2="80" stroke={STROKE} strokeWidth="3.2" />
        {/* mizzenmast (right, with lateen sail) */}
        <line x1="400" y1="410" x2="400" y2="180" stroke={STROKE} strokeWidth="3" />

        {/* main sail — the largest square sail with red cross of Christianity (Santa María style) */}
        <path d="M 234 200 L 366 200 L 380 396 L 220 396 Z" {...reg(fills, onRegion, 'main-sail')} />
        {/* red cross emblem */}
        <rect x="290" y="244" width="20" height="100" {...reg(fills, onRegion, 'main-cross-v')} />
        <rect x="260" y="280" width="80" height="20" {...reg(fills, onRegion, 'main-cross-h')} />
        {/* sail batten lines */}
        <line x1="222" y1="248" x2="378" y2="248" stroke={STROKE} strokeWidth="1.2" />
        <line x1="224" y1="356" x2="376" y2="356" stroke={STROKE} strokeWidth="1.2" />
        {/* main yard (horizontal beam holding sail) */}
        <rect x="222" y="198" width="156" height="6" {...reg(fills, onRegion, 'main-yard')} />

        {/* main topsail (small square above mainsail) */}
        <path d="M 268 140 L 332 140 L 336 192 L 264 192 Z" {...reg(fills, onRegion, 'main-topsail')} />
        <rect x="266" y="138" width="68" height="4" {...reg(fills, onRegion, 'main-topsail-yard')} />

        {/* fore sail */}
        <path d="M 154 218 L 246 218 L 254 386 L 146 386 Z" {...reg(fills, onRegion, 'fore-sail')} />
        <rect x="144" y="216" width="112" height="4" {...reg(fills, onRegion, 'fore-yard')} />
        <line x1="148" y1="306" x2="252" y2="306" stroke={STROKE} strokeWidth="1.2" />

        {/* mizzen — lateen triangular sail (Santa María had a lateen mizzen) */}
        <path d="M 400 226 L 458 380 L 400 396 Z" {...reg(fills, onRegion, 'mizzen-sail')} />
        <line x1="400" y1="226" x2="458" y2="380" stroke={STROKE} strokeWidth="1.6" />

        {/* crow's nest on mainmast */}
        <g>
          <path d="M 288 124 L 312 124 L 314 116 L 286 116 Z" {...reg(fills, onRegion, 'crows-nest')} />
          {/* sailor in crow's nest */}
          <ellipse cx="300" cy="108" rx="5" ry="7" fill={STROKE} stroke="none" />
          <circle cx="300" cy="100" r="3" fill={STROKE} stroke="none" />
        </g>

        {/* flags atop each mast */}
        <g style={alive ? { animation: 'wave-flag 2.6s ease-in-out infinite', transformOrigin: '300px 88px' } : null}>
          <path d="M 300 60 L 354 68 L 342 78 L 354 90 L 300 92 Z" {...reg(fills, onRegion, 'flag-main')} />
          {/* cross on flag */}
          <line x1="316" y1="68" x2="316" y2="86" stroke={STROKE} strokeWidth="2" />
          <line x1="306" y1="78" x2="332" y2="78" stroke={STROKE} strokeWidth="2" />
        </g>
        <g style={alive ? { animation: 'wave-flag 2.4s ease-in-out infinite', transformOrigin: '200px 156px', animationDelay: '0.3s' } : null}>
          <path d="M 200 138 L 240 144 L 230 152 L 240 162 L 200 168 Z" {...reg(fills, onRegion, 'flag-fore')} />
        </g>
        <g style={alive ? { animation: 'wave-flag 2.8s ease-in-out infinite', transformOrigin: '400px 188px', animationDelay: '0.5s' } : null}>
          <path d="M 400 168 L 440 174 L 430 182 L 440 192 L 400 198 Z" {...reg(fills, onRegion, 'flag-mizzen')} />
        </g>

        {/* mast top finials */}
        <circle cx="300" cy="76" r="3" fill={STROKE} stroke="none" />
        <circle cx="200" cy="146" r="3" fill={STROKE} stroke="none" />
        <circle cx="400" cy="176" r="3" fill={STROKE} stroke="none" />

        {/* tiny sailor on deck */}
        <g>
          <ellipse cx="240" cy="450" rx="5" ry="8" fill={STROKE} stroke="none" />
          <circle cx="240" cy="438" r="3" fill={STROKE} stroke="none" />
          <ellipse cx="360" cy="450" rx="5" ry="8" fill={STROKE} stroke="none" />
          <circle cx="360" cy="438" r="3" fill={STROKE} stroke="none" />
        </g>
      </g>

      {/* seagulls */}
      <g style={alive ? { animation: 'gentle-bob 2.4s ease-in-out infinite' } : null}>
        <path d="M 76 200 Q 86 192 96 200 Q 106 192 116 200" fill="none" stroke={STROKE} strokeWidth="2" />
      </g>
      <g style={alive ? { animation: 'gentle-bob 2.6s ease-in-out infinite', animationDelay: '0.4s' } : null}>
        <path d="M 460 240 Q 468 234 476 240 Q 484 234 492 240" fill="none" stroke={STROKE} strokeWidth="2" />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>SANTA MARÍA · 1492</text>
    </svg>
  );
}

// ============================================================
// Page entries
// ============================================================
const FOUNDATIONAL_PAGES = [
  {
    id: 'stonehenge',
    title: 'Stonehenge',
    subtitle: 'Salisbury Plain, c. 2500 BC',
    collection: 'world',
    eraLabel: 'Prehistoric Britain',
    eraColor: '#8B7355',
    bgPreview: '#E1D6BE',
    fact: "Stonehenge was built about 5,000 years ago — long before iron tools, wheels, or writing reached Britain. The biggest stones weigh 25 tons and were dragged from quarries 150 miles away.",
    Component: StonehengeSVG,
    readingLevel: { lexile: 800, gradeBand: '4–5', guidedReading: 'O', wordCount: 32, complexity: 'Challenging' },
    keyVocab: ['megalith', 'trilithon', 'sarsen', 'prehistoric'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','cloud-l','cloud-r','hill','plain','back-up-1','back-up-2','back-lintel-l','back-up-3','back-up-4','back-lintel-r','bluestone-l','bluestone-r','bluestone-c','upright-l-1','upright-l-2','lintel-l','upright-c-1','upright-c-2','lintel-c','upright-r-1','upright-r-2','lintel-r','heel-stone','sheep-body','sheep-head','sheep-ear-l','sheep-ear-r','banner'],
    quest: {
      heading: 'The Stones at Sunrise',
      author: 'Prehistoric Britain · c. 2500 BC',
      lines: [
        'I am a circle of giant {0}.',
        'I was built thousands of years before {1}.',
        'On midsummer the sun rises right between my two tallest {2}.',
      ],
      blanks: [
        { answer: 'stones',  choices: ['stones',  'spoons',   'snowballs', 'shells']    },
        { answer: 'writing', choices: ['writing', 'wagons',   'whistles',  'windows']   },
        { answer: 'pillars', choices: ['pillars', 'pillows',  'pumpkins',  'paintings'] },
      ],
      voice: {
        // Calm, mysterious, ancient
        hints: [/daniel/i, /alex/i, /tom/i, /samantha/i, /microsoft (mark|guy|aria)/i],
        rate: 0.74, pitch: 0.86,
      },
    },
  },
  {
    id: 'ziggurat',
    title: 'The Great Ziggurat of Ur',
    subtitle: 'Mesopotamia, c. 2100 BC',
    collection: 'world',
    eraLabel: 'Ancient Sumer',
    eraColor: '#B07A38',
    bgPreview: '#F0DCA8',
    fact: "Mesopotamia means \u201Cthe land between the rivers.\u201D The Sumerians invented the wheel, the plow, and the very first writing — pressing wedge-shaped marks into wet clay tablets called cuneiform.",
    Component: ZigguratSVG,
    readingLevel: { lexile: 880, gradeBand: '4–5', guidedReading: 'P', wordCount: 36, complexity: 'Challenging' },
    keyVocab: ['Sumer', 'ziggurat', 'cuneiform', 'tablet', 'civilization'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','cloud','palm-trunk-l','palm-leaf-l1','palm-leaf-l2','palm-leaf-l3','palm-trunk-r','palm-leaf-r1','palm-leaf-r2','river','sand','tier-1','tier-2','tier-3','tier-4','staircase','temple','temple-roof','temple-door','temple-disc','tablet','banner'],
    quest: {
      heading: 'Land Between the Rivers',
      author: 'Sumer · c. 2100 BC',
      lines: [
        'I am a stepped temple of {0} bricks.',
        'I stand by the river in ancient {1}.',
        'My people invented the very first kind of {2}.',
      ],
      blanks: [
        { answer: 'mud',       choices: ['mud',       'milk',     'metal',     'macaroni']   },
        { answer: 'Sumer',     choices: ['Sumer',     'Soccer',   'Sneaker',   'Sandwich']   },
        { answer: 'writing',   choices: ['writing',   'whistling','wrestling', 'whispering'] },
      ],
      voice: {
        // Slow, awestruck narrator
        hints: [/daniel/i, /alex/i, /tom/i, /bruce/i, /microsoft (mark|guy)/i],
        rate: 0.72, pitch: 0.82,
      },
    },
  },
  {
    id: 'genghis-khan',
    title: 'Genghis Khan',
    subtitle: 'Mongolia, c. 1200',
    collection: 'world',
    eraLabel: 'Mongol Empire',
    eraColor: '#4A2E1C',
    bgPreview: '#D6CFB2',
    fact: "Genghis Khan united the Mongol tribes and built the largest connected empire in history — stretching from Korea all the way to Hungary. His armies could ride 60 miles a day on horseback.",
    Component: GenghisKhanSVG,
    readingLevel: { lexile: 860, gradeBand: '4–5', guidedReading: 'P', wordCount: 34, complexity: 'Challenging' },
    keyVocab: ['khan', 'empire', 'steppe', 'archer', 'nomad'],
    standards: ['RI.4.4', 'RI.4.7', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','cloud','mountains','snow-cap-l','snow-cap-r','steppe','yurt-roof','yurt-wall','yurt-pipe','yurt-door','ground','horse-leg-fl','horse-leg-fr','horse-leg-bl','horse-leg-br','hoof-fl','hoof-fr','hoof-bl','hoof-br','horse-body','horse-head','horse-mane-1','horse-mane-2','horse-ear','horse-tail','saddle-blanket','saddle','saddle-rim','pants','boot','deel','deel-fold','belt','buckle','arm-r','sword-hilt','sword-pommel','arm-l','hand-l','quiver','neck','face','mustache-l','mustache-r','hat-body','hat-peak','hat-fur','banner'],
    quest: {
      heading: 'Lord of the Steppe',
      author: 'Mongol Empire · c. 1200',
      lines: [
        'I rode across the wide grassy {0}.',
        'I united the Mongol {1} into one mighty empire.',
        'My swift army fought from atop fast {2}.',
      ],
      blanks: [
        { answer: 'steppe', choices: ['steppe', 'street',  'staple',  'stew']     },
        { answer: 'tribes', choices: ['tribes', 'tricks',  'tractors','tomatoes'] },
        { answer: 'horses', choices: ['horses', 'hippos',  'helmets', 'hotdogs']  },
      ],
      voice: {
        // Strong, commanding narrator
        hints: [/daniel/i, /tom/i, /alex/i, /bruce/i, /reed/i, /microsoft (mark|guy|davis)/i],
        rate: 0.78, pitch: 0.80,
      },
    },
  },
  {
    id: 'santa-maria',
    title: 'The Santa María',
    subtitle: "Columbus's Voyage, 1492",
    collection: 'world',
    eraLabel: 'Age of Exploration',
    eraColor: '#2C5F8B',
    bgPreview: '#D6E0EA',
    fact: "On October 12, 1492, after 33 days at sea, Christopher Columbus and the crew of the Santa María sighted an island in the Bahamas. He thought he had reached the East Indies and called the people he met \u201CIndians.\u201D",
    Component: SantaMariaSVG,
    readingLevel: { lexile: 840, gradeBand: '4–5', guidedReading: 'P', wordCount: 36, complexity: 'Challenging' },
    keyVocab: ['voyage', 'crew', 'caravel', 'navigation', 'horizon'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','cloud-l','cloud-r','island','island-palm-trunk','island-palm-leaf-l','island-palm-leaf-r','island-palm-leaf-u','sea','hull','sterncastle','sterncastle-trim','sterncastle-roof','forecastle','forecastle-roof','spritsail','deck-rail','main-sail','main-cross-v','main-cross-h','main-yard','main-topsail','main-topsail-yard','fore-sail','fore-yard','mizzen-sail','crows-nest','flag-main','flag-fore','flag-mizzen','banner'],
    quest: {
      heading: 'Across the Ocean Sea',
      author: 'Christopher Columbus · 1492',
      lines: [
        'I am the great ship called the {0}.',
        'I crossed the wide Atlantic {1}.',
        'My captain was looking for a short path to {2}.',
      ],
      blanks: [
        { answer: 'Santa María', choices: ['Santa María', 'Sandwich Bar', 'Sailing Cat', 'Soggy Marbles'] },
        { answer: 'Ocean',       choices: ['Ocean',       'Onion',         'Orange',      'Octagon']      },
        { answer: 'Asia',        choices: ['Asia',        'Antarctica',    'Alaska',      'Africa']       },
      ],
      voice: {
        // Adventurous sea-captain narrator
        hints: [/daniel/i, /alex/i, /tom/i, /reed/i, /microsoft (mark|guy)/i],
        rate: 0.80, pitch: 0.88,
      },
    },
  },
];

if (window.PAGES_DATA && Array.isArray(window.PAGES_DATA)) {
  FOUNDATIONAL_PAGES.forEach(p => window.PAGES_DATA.push(p));
}

Object.assign(window, { StonehengeSVG, ZigguratSVG, GenghisKhanSVG, SantaMariaSVG });
