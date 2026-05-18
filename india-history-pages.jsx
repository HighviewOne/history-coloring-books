// =================================================================
// Indian history coloring pages — 4 additions:
//   • The Taj Mahal (Mughal Empire, 1653)
//   • Mahatma Gandhi (Indian Independence)
//   • Maharaja on Elephant (Royal India)
//   • Lord Ganesh (Hindu Mythology)
// =================================================================

// ----- 39. THE TAJ MAHAL — Agra, 1653 -----
function TajMahalSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.6s ease-in-out infinite', transformOrigin: '120px 100px' } : null}>
        <circle cx="120" cy="100" r="34" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds */}
      <path d="M 380 90 Q 380 70 402 70 Q 408 56 428 56 Q 448 56 452 70 Q 472 70 472 90 Z" {...reg(fills, onRegion, 'cloud-l')} />
      <path d="M 60 200 Q 60 184 80 184 Q 86 170 102 170 Q 118 170 122 184 Q 142 184 142 200 Z" {...reg(fills, onRegion, 'cloud-r')} />

      {/* horizon line of distant gardens */}
      <path d="M 20 380 L 580 380 L 580 410 L 20 410 Z" {...reg(fills, onRegion, 'horizon')} />

      {/* ---- minarets (4) ---- */}
      {[100, 200, 400, 500].map((x, i) => (
        <g key={`min-${i}`}>
          <rect x={x-12} y="200" width="24" height="184" {...reg(fills, onRegion, `minaret-${i}`)} />
          {/* mid-band rings */}
          <rect x={x-14} y="240" width="28" height="6" {...reg(fills, onRegion, `min-band-${i}-a`)} />
          <rect x={x-14} y="294" width="28" height="6" {...reg(fills, onRegion, `min-band-${i}-b`)} />
          <rect x={x-14} y="348" width="28" height="6" {...reg(fills, onRegion, `min-band-${i}-c`)} />
          {/* small balcony cupolas */}
          <path d="M -14 0 Q -14 -12 0 -14 Q 14 -12 14 0 L 14 4 L -14 4 Z" transform={`translate(${x} 200)`} {...reg(fills, onRegion, `min-cap-${i}`)} />
          {/* finial */}
          <line x1={x} y1="186" x2={x} y2="166" stroke={STROKE} strokeWidth="2.4" />
          <circle cx={x} cy="164" r="3" fill={STROKE} stroke="none" />
        </g>
      ))}

      {/* ---- main mausoleum base ---- */}
      <rect x="180" y="280" width="240" height="100" {...reg(fills, onRegion, 'base')} />
      {/* base side wings */}
      <rect x="140" y="320" width="40" height="60" {...reg(fills, onRegion, 'wing-l')} />
      <rect x="420" y="320" width="40" height="60" {...reg(fills, onRegion, 'wing-r')} />
      {/* base panel decoration */}
      <rect x="200" y="304" width="200" height="50" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* central iwan (large entrance arch) */}
      <path d="M 270 380 L 330 380 L 330 310 Q 300 280 270 310 Z" {...reg(fills, onRegion, 'main-arch')} />
      {/* side arches */}
      <path d="M 208 376 L 246 376 L 246 332 Q 227 320 208 332 Z" {...reg(fills, onRegion, 'side-arch-l')} />
      <path d="M 354 376 L 392 376 L 392 332 Q 373 320 354 332 Z" {...reg(fills, onRegion, 'side-arch-r')} />
      <path d="M 144 376 L 176 376 L 176 348 Q 160 340 144 348 Z" {...reg(fills, onRegion, 'side-arch-ll')} />
      <path d="M 424 376 L 456 376 L 456 348 Q 440 340 424 348 Z" {...reg(fills, onRegion, 'side-arch-rr')} />

      {/* ---- big central dome (onion-shaped) ---- */}
      <path d="M 230 280 Q 220 230 240 200 Q 244 180 260 168 Q 280 140 300 138 Q 320 140 340 168 Q 356 180 360 200 Q 380 230 370 280 Z" {...reg(fills, onRegion, 'dome-main')} />
      {/* dome neck */}
      <rect x="280" y="270" width="40" height="14" {...reg(fills, onRegion, 'dome-neck')} />
      {/* finial */}
      <line x1="300" y1="138" x2="300" y2="106" stroke={STROKE} strokeWidth="2.4" />
      <circle cx="300" cy="118" r="5" {...reg(fills, onRegion, 'finial-orb')} />
      <path d="M 296 106 L 304 106 L 300 96 Z" fill={STROKE} stroke="none" />

      {/* small chhatris (corner cupolas) */}
      <g>
        <rect x="200" y="260" width="20" height="18" {...reg(fills, onRegion, 'chhatri-l-base')} />
        <path d="M 196 260 Q 196 244 210 244 Q 224 244 224 260 Z" {...reg(fills, onRegion, 'chhatri-l-dome')} />
        <line x1="210" y1="244" x2="210" y2="234" stroke={STROKE} strokeWidth="2" />
        <circle cx="210" cy="232" r="2" fill={STROKE} stroke="none" />
      </g>
      <g>
        <rect x="380" y="260" width="20" height="18" {...reg(fills, onRegion, 'chhatri-r-base')} />
        <path d="M 376 260 Q 376 244 390 244 Q 404 244 404 260 Z" {...reg(fills, onRegion, 'chhatri-r-dome')} />
        <line x1="390" y1="244" x2="390" y2="234" stroke={STROKE} strokeWidth="2" />
        <circle cx="390" cy="232" r="2" fill={STROKE} stroke="none" />
      </g>

      {/* ---- platform (white marble plinth) ---- */}
      <rect x="60" y="380" width="480" height="30" {...reg(fills, onRegion, 'platform')} />
      {/* platform line */}
      <line x1="60" y1="400" x2="540" y2="400" stroke={STROKE} strokeWidth="1.2" />

      {/* ---- reflecting pool ---- */}
      <rect x="180" y="430" width="240" height="50" {...reg(fills, onRegion, 'pool')} />
      <line x1="200" y1="448" x2="400" y2="448" stroke={STROKE} strokeWidth="1.4" />
      <line x1="200" y1="462" x2="400" y2="462" stroke={STROKE} strokeWidth="1.4" />
      {/* pool reflection ripples */}
      <path d="M 220 472 Q 240 468 260 472" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <path d="M 340 472 Q 360 468 380 472" fill="none" stroke={STROKE} strokeWidth="1.2" />

      {/* garden lawn */}
      <path d="M 20 410 L 180 410 L 180 480 L 60 480 L 60 530 L 20 530 Z" {...reg(fills, onRegion, 'lawn-l')} />
      <path d="M 580 410 L 420 410 L 420 480 L 540 480 L 540 530 L 580 530 Z" {...reg(fills, onRegion, 'lawn-r')} />
      <path d="M 20 530 L 580 530 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'walkway')} />

      {/* cypress trees flanking */}
      <path d="M 86 478 Q 90 432 86 384 Q 82 432 78 478 Z" {...reg(fills, onRegion, 'cypress-l')} />
      <path d="M 514 478 Q 518 432 514 384 Q 510 432 506 478 Z" {...reg(fills, onRegion, 'cypress-r')} />
      <rect x="80" y="478" width="12" height="14" {...reg(fills, onRegion, 'cypress-trunk-l')} />
      <rect x="508" y="478" width="12" height="14" {...reg(fills, onRegion, 'cypress-trunk-r')} />

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>THE TAJ MAHAL · 1653</text>
    </svg>
  );
}

// ----- 40. MAHATMA GANDHI -----
function GandhiSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* background — soft wash */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'background')} />

      {/* sun behind, like a halo */}
      <g style={alive ? { animation: 'sun-pulse 3s ease-in-out infinite', transformOrigin: '300px 200px' } : null}>
        <circle cx="300" cy="200" r="120" {...reg(fills, onRegion, 'halo')} />
      </g>
      {/* radiating rays from halo */}
      {Array.from({length:16}).map((_,i)=>{
        const a = i * Math.PI * 2 / 16;
        const x1 = 300 + Math.cos(a)*130, y1 = 200 + Math.sin(a)*130;
        const x2 = 300 + Math.cos(a)*160, y2 = 200 + Math.sin(a)*160;
        return <line key={`r-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={STROKE} strokeWidth="2" />;
      })}

      {/* floor (woven mat) */}
      <path d="M 20 480 L 580 480 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'floor')} />
      {/* mat under Gandhi */}
      <ellipse cx="300" cy="500" rx="220" ry="20" {...reg(fills, onRegion, 'mat')} />
      {[160,220,280,340,400,440].map((x,i) => (
        <line key={`m-${i}`} x1={x} y1="494" x2={x} y2="508" stroke={STROKE} strokeWidth="1.2" />
      ))}

      {/* ---- GANDHI — sitting cross-legged, front view ---- */}
      {/* legs crossed (one folded shape) */}
      <path d="M 200 460 Q 180 488 200 504 L 400 504 Q 420 488 400 460 Q 380 446 340 446 L 260 446 Q 220 446 200 460 Z" {...reg(fills, onRegion, 'legs')} />
      {/* visible feet under legs */}
      <ellipse cx="244" cy="490" rx="14" ry="6" {...reg(fills, onRegion, 'foot-l')} />
      <ellipse cx="356" cy="490" rx="14" ry="6" {...reg(fills, onRegion, 'foot-r')} />

      {/* dhoti (loincloth wrapped at waist) */}
      <path d="M 244 360 L 356 360 L 376 458 L 224 458 Z" {...reg(fills, onRegion, 'dhoti')} />
      {/* dhoti folds */}
      <line x1="276" y1="368" x2="270" y2="452" stroke={STROKE} strokeWidth="1.6" />
      <line x1="300" y1="368" x2="300" y2="454" stroke={STROKE} strokeWidth="1.6" />
      <line x1="324" y1="368" x2="330" y2="452" stroke={STROKE} strokeWidth="1.6" />

      {/* torso */}
      <path d="M 254 290 L 346 290 L 350 366 L 250 366 Z" {...reg(fills, onRegion, 'torso')} />

      {/* shawl draped over shoulder (diagonal) */}
      <path d="M 240 290 Q 220 320 222 380 L 244 386 Q 248 332 268 312 Z" {...reg(fills, onRegion, 'shawl')} />

      {/* arms */}
      <path d="M 254 296 Q 224 322 220 380 L 240 384 Q 248 332 264 312 Z" {...reg(fills, onRegion, 'arm-l')} />
      <path d="M 346 296 Q 376 322 380 380 L 360 384 Q 352 332 336 312 Z" {...reg(fills, onRegion, 'arm-r')} />
      {/* hands resting on knees */}
      <ellipse cx="228" cy="392" rx="10" ry="8" {...reg(fills, onRegion, 'hand-l')} />
      <ellipse cx="372" cy="392" rx="10" ry="8" {...reg(fills, onRegion, 'hand-r')} />

      {/* neck (chest exposed since Gandhi traditionally went bare-chested with dhoti) */}
      <path d="M 288 260 L 312 260 L 314 290 L 286 290 Z" {...reg(fills, onRegion, 'neck')} />
      {/* collarbone line */}
      <path d="M 270 304 Q 300 314 330 304" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* ---- head ---- */}
      <ellipse cx="300" cy="232" rx="36" ry="38" {...reg(fills, onRegion, 'head')} />
      {/* large ears */}
      <ellipse cx="266" cy="232" rx="8" ry="14" {...reg(fills, onRegion, 'ear-l')} />
      <ellipse cx="334" cy="232" rx="8" ry="14" {...reg(fills, onRegion, 'ear-r')} />
      {/* inner ear lines */}
      <path d="M 264 230 Q 268 234 268 240" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 336 230 Q 332 234 332 240" fill="none" stroke={STROKE} strokeWidth="1.4" />
      {/* round glasses — non-colorable */}
      <g style={alive ? { animation: 'glow-pulse 3s ease-in-out infinite' } : null}>
        <circle cx="284" cy="226" r="10" fill="none" stroke={STROKE} strokeWidth="2.4" />
        <circle cx="316" cy="226" r="10" fill="none" stroke={STROKE} strokeWidth="2.4" />
        <line x1="294" y1="226" x2="306" y2="226" stroke={STROKE} strokeWidth="2.4" />
        <line x1="274" y1="226" x2="266" y2="222" stroke={STROKE} strokeWidth="2" />
        <line x1="326" y1="226" x2="334" y2="222" stroke={STROKE} strokeWidth="2" />
      </g>
      {/* eyes inside glasses */}
      <circle cx="284" cy="226" r="1.8" fill={STROKE} stroke="none" />
      <circle cx="316" cy="226" r="1.8" fill={STROKE} stroke="none" />
      {/* nose */}
      <path d="M 300 232 L 296 246 Q 300 250 304 246 Z" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* mustache — Gandhi's signature */}
      <path d="M 284 256 Q 292 252 300 254 Q 308 252 316 256 Q 308 260 300 258 Q 292 260 284 256 Z" {...reg(fills, onRegion, 'mustache')} />
      {/* mouth */}
      <path d="M 292 264 Q 300 266 308 264" fill="none" stroke={STROKE} strokeWidth="1.6" />

      {/* ---- charkha (spinning wheel) to the left ---- */}
      <g style={alive ? { animation: 'spin-slow 18s linear infinite', transformOrigin: '100px 440px' } : null}>
        <circle cx="100" cy="440" r="46" {...reg(fills, onRegion, 'wheel')} />
        <circle cx="100" cy="440" r="6" fill={STROKE} stroke="none" />
        {[0,1,2,3,4,5,6,7].map(k => {
          const a = (k * Math.PI) / 4;
          return <line key={`wk-${k}`} x1={100 + Math.cos(a)*6} y1={440 + Math.sin(a)*6} x2={100 + Math.cos(a)*42} y2={440 + Math.sin(a)*42} stroke={STROKE} strokeWidth="2" />;
        })}
      </g>
      {/* wheel stand */}
      <rect x="56" y="478" width="88" height="10" {...reg(fills, onRegion, 'wheel-stand')} />
      <rect x="60" y="488" width="14" height="14" {...reg(fills, onRegion, 'wheel-leg-l')} />
      <rect x="126" y="488" width="14" height="14" {...reg(fills, onRegion, 'wheel-leg-r')} />
      {/* drive belt */}
      <line x1="100" y1="394" x2="100" y2="386" stroke={STROKE} strokeWidth="2" />
      <line x1="146" y1="440" x2="170" y2="440" stroke={STROKE} strokeWidth="2" />
      {/* small spindle on right */}
      <circle cx="178" cy="440" r="4" {...reg(fills, onRegion, 'spindle')} />

      {/* small white peace dove flying */}
      <g style={alive ? { animation: 'gentle-bob 2.4s ease-in-out infinite' } : null}>
        <ellipse cx="490" cy="160" rx="14" ry="6" {...reg(fills, onRegion, 'dove')} />
        <circle cx="500" cy="156" r="4" {...reg(fills, onRegion, 'dove-head')} />
        <path d="M 480 156 Q 488 150 496 156" fill="none" stroke={STROKE} strokeWidth="1.6" />
        <path d="M 482 162 L 470 168" stroke={STROKE} strokeWidth="1.4" fill="none" />
      </g>

      {/* banner */}
      <rect x="160" y="540" width="280" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>MAHATMA GANDHI · 1869–1948</text>
    </svg>
  );
}

// ----- 41. MAHARAJA ON ELEPHANT -----
function MaharajaSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '120px 100px' } : null}>
        <circle cx="120" cy="100" r="32" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds */}
      <path d="M 380 80 Q 380 60 402 60 Q 408 46 428 46 Q 448 46 452 60 Q 472 60 472 80 Z" {...reg(fills, onRegion, 'cloud')} />

      {/* distant Rajasthani palace */}
      <rect x="380" y="220" width="180" height="180" {...reg(fills, onRegion, 'palace')} />
      <path d="M 380 220 L 560 220 L 540 200 L 400 200 Z" {...reg(fills, onRegion, 'palace-roof')} />
      {/* palace cupolas */}
      <path d="M 400 200 Q 400 184 412 184 Q 424 184 424 200 Z" {...reg(fills, onRegion, 'palace-cupola-l')} />
      <path d="M 516 200 Q 516 184 528 184 Q 540 184 540 200 Z" {...reg(fills, onRegion, 'palace-cupola-r')} />
      <path d="M 458 200 Q 458 178 470 174 Q 482 178 482 200 Z" {...reg(fills, onRegion, 'palace-cupola-c')} />
      {/* palace windows */}
      {[394,420,446,472,498,524].map((x,i) => (
        <rect key={`pw-${i}`} x={x} y={250 + (i%2)*30} width="18" height="22" fill="none" stroke={STROKE} strokeWidth="1.6" />
      ))}
      {/* palace arches */}
      {[392,440,488,536].map((x,i) => (
        <path key={`pa-${i}`} d={`M ${x} 400 L ${x} 360 Q ${x+16} 344 ${x+32} 360 L ${x+32} 400 Z`} fill="none" stroke={STROKE} strokeWidth="2" />
      ))}

      {/* ground */}
      <path d="M 20 400 L 580 400 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'ground')} />
      <line x1="20" y1="440" x2="580" y2="440" stroke={STROKE} strokeWidth="1.4" />

      {/* small palm tree foreground left */}
      <path d="M 70 540 Q 74 480 64 420 Q 80 480 88 540 Z" {...reg(fills, onRegion, 'palm-trunk')} />
      <g style={alive ? { animation: 'wave-flag 3.4s ease-in-out infinite', transformOrigin: '76px 420px' } : null}>
        <path d="M 78 422 Q 40 408 18 422 Q 48 428 78 436 Z" {...reg(fills, onRegion, 'palm-leaf-l')} />
        <path d="M 82 422 Q 118 408 142 422 Q 110 428 82 436 Z" {...reg(fills, onRegion, 'palm-leaf-r')} />
        <path d="M 80 418 Q 70 388 64 366 Q 78 388 86 418 Z" {...reg(fills, onRegion, 'palm-leaf-u')} />
      </g>

      {/* ---- ELEPHANT — facing right ---- */}
      {/* legs */}
      <rect x="170" y="370" width="34" height="92" {...reg(fills, onRegion, 'leg-fl')} />
      <rect x="210" y="370" width="34" height="92" {...reg(fills, onRegion, 'leg-fr')} />
      <rect x="290" y="370" width="34" height="92" {...reg(fills, onRegion, 'leg-bl')} />
      <rect x="330" y="370" width="34" height="92" {...reg(fills, onRegion, 'leg-br')} />
      {/* toenails — non-colorable */}
      {[174,182,190,198,214,222,230,238,294,302,310,318,334,342,350,358].map((x,i) => (
        <rect key={`tn-${i}`} x={x} y={456} width="4" height="6" fill={STROKE} stroke="none" />
      ))}
      {/* anklets */}
      <rect x="166" y="450" width="42" height="6" {...reg(fills, onRegion, 'anklet-fl')} />
      <rect x="206" y="450" width="42" height="6" {...reg(fills, onRegion, 'anklet-fr')} />
      <rect x="286" y="450" width="42" height="6" {...reg(fills, onRegion, 'anklet-bl')} />
      <rect x="326" y="450" width="42" height="6" {...reg(fills, onRegion, 'anklet-br')} />

      {/* body */}
      <path d="M 154 380 Q 154 280 250 270 L 320 270 Q 380 280 384 380 Z" {...reg(fills, onRegion, 'body')} />
      {/* tail */}
      <path d="M 154 320 Q 130 320 124 350 Q 136 360 144 350 Q 140 332 154 332 Z" {...reg(fills, onRegion, 'tail')} />
      <path d="M 124 350 L 116 364 L 122 366 L 130 358 Z" fill={STROKE} stroke="none" />

      {/* head */}
      <ellipse cx="412" cy="332" rx="60" ry="58" {...reg(fills, onRegion, 'head')} />
      {/* ear (big floppy) */}
      <path d="M 384 290 Q 360 280 350 320 Q 354 358 384 360 Z" {...reg(fills, onRegion, 'ear')} />
      {/* eye */}
      <circle cx="430" cy="318" r="3" fill={STROKE} stroke="none" />
      {/* tusks */}
      <path d="M 442 372 Q 446 388 462 392 L 462 384 Q 452 376 442 372 Z" {...reg(fills, onRegion, 'tusk-l')} />
      <path d="M 458 372 Q 466 388 482 392 L 482 384 Q 472 376 458 372 Z" {...reg(fills, onRegion, 'tusk-r')} />
      {/* trunk — curving down then up */}
      <g style={alive ? { animation: 'wave-flag 4s ease-in-out infinite', transformOrigin: '470px 360px' } : null}>
        <path d="M 462 360 Q 510 370 530 410 Q 540 432 522 446 Q 514 432 522 420 Q 508 390 482 384 Q 470 380 462 372 Z" {...reg(fills, onRegion, 'trunk')} />
        {/* trunk ridges */}
        <path d="M 482 384 Q 500 396 514 416" fill="none" stroke={STROKE} strokeWidth="1.2" />
        <path d="M 490 380 Q 506 392 520 412" fill="none" stroke={STROKE} strokeWidth="1.2" />
      </g>

      {/* decorative forehead band on elephant */}
      <path d="M 388 290 Q 412 280 442 296 L 444 308 Q 414 296 388 304 Z" {...reg(fills, onRegion, 'forehead-band')} />
      <circle cx="416" cy="298" r="5" {...reg(fills, onRegion, 'forehead-gem')} />

      {/* decorated saddle blanket (jhool) under howdah */}
      <path d="M 154 280 Q 200 268 270 268 Q 320 268 380 282 L 360 320 Q 280 308 200 312 Q 174 314 154 320 Z" {...reg(fills, onRegion, 'jhool')} />
      {/* tassels along bottom of jhool */}
      {[170,200,230,260,290,320,350].map((x,i) => (
        <path key={`ts-${i}`} d={`M ${x} 314 L ${x-4} 326 L ${x} 322 L ${x+4} 326 Z`} fill={STROKE} stroke="none" />
      ))}
      {/* jhool pattern lines */}
      <line x1="170" y1="290" x2="370" y2="294" stroke={STROKE} strokeWidth="1.4" />
      {[200,230,260,290,320].map((x,i) => (
        <circle key={`jp-${i}`} cx={x} cy="282" r="3" fill={STROKE} stroke="none" />
      ))}

      {/* ---- HOWDAH (royal seat with canopy) ---- */}
      {/* howdah base */}
      <path d="M 184 260 L 326 260 L 320 220 L 190 220 Z" {...reg(fills, onRegion, 'howdah-base')} />
      <line x1="190" y1="240" x2="320" y2="240" stroke={STROKE} strokeWidth="1.4" />
      {/* howdah corner posts */}
      <rect x="188" y="180" width="6" height="42" {...reg(fills, onRegion, 'howdah-post-l')} />
      <rect x="316" y="180" width="6" height="42" {...reg(fills, onRegion, 'howdah-post-r')} />
      {/* canopy (umbrella) */}
      <path d="M 170 180 L 340 180 L 320 154 L 190 154 Z" {...reg(fills, onRegion, 'canopy')} />
      <path d="M 190 154 L 320 154 L 290 134 L 220 134 Z" {...reg(fills, onRegion, 'canopy-top')} />
      {/* canopy fringe */}
      {[180,200,220,240,260,280,300,320].map((x,i) => (
        <path key={`cf-${i}`} d={`M ${x} 180 L ${x-3} 192 L ${x} 188 L ${x+3} 192 Z`} fill={STROKE} stroke="none" />
      ))}
      {/* finial on top */}
      <line x1="255" y1="134" x2="255" y2="108" stroke={STROKE} strokeWidth="2.4" />
      <circle cx="255" cy="106" r="4" {...reg(fills, onRegion, 'finial')} />

      {/* ---- MAHARAJA in howdah ---- */}
      {/* body / royal coat */}
      <path d="M 230 254 L 282 254 L 286 220 L 226 220 Z" {...reg(fills, onRegion, 'coat')} />
      {/* sash */}
      <path d="M 232 220 L 284 254 L 282 264 L 226 230 Z" {...reg(fills, onRegion, 'sash')} />
      {/* face */}
      <ellipse cx="256" cy="206" rx="18" ry="20" {...reg(fills, onRegion, 'face')} />
      {/* turban */}
      <path d="M 232 200 Q 234 178 256 174 Q 280 178 280 198 Q 268 188 256 192 Q 244 188 232 200 Z" {...reg(fills, onRegion, 'turban')} />
      {/* turban jewel */}
      <circle cx="256" cy="186" r="4" {...reg(fills, onRegion, 'jewel')} />
      {/* face features */}
      <circle cx="250" cy="206" r="1.4" fill={STROKE} stroke="none" />
      <circle cx="262" cy="206" r="1.4" fill={STROKE} stroke="none" />
      {/* mustache */}
      <path d="M 248 218 Q 256 222 264 218" fill="none" stroke={STROKE} strokeWidth="1.8" />
      {/* beard */}
      <path d="M 252 224 Q 256 230 260 224" fill="none" stroke={STROKE} strokeWidth="1.4" />
      {/* arm holding curved sword */}
      <path d="M 226 230 Q 200 240 196 260 L 210 264 Q 218 254 232 244 Z" {...reg(fills, onRegion, 'arm')} />
      {/* sword (talwar) */}
      <path d="M 196 258 Q 180 250 168 224 Q 186 232 200 252 Z" {...reg(fills, onRegion, 'sword')} />
      <rect x="196" y="258" width="6" height="14" {...reg(fills, onRegion, 'sword-hilt')} />

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>MAHARAJA OF RAJASTHAN</text>
    </svg>
  );
}

// ----- 42. LORD GANESH -----
function GaneshSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* background */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'background')} />
      {/* sun-rays halo behind */}
      <g style={alive ? { animation: 'spin-slow 30s linear infinite', transformOrigin: '300px 260px' } : null}>
        {Array.from({length:24}).map((_,i)=>{
          const a = i * Math.PI * 2 / 24;
          const x1 = 300 + Math.cos(a)*180, y1 = 260 + Math.sin(a)*180;
          const x2 = 300 + Math.cos(a)*220, y2 = 260 + Math.sin(a)*220;
          return <line key={`gr-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={STROKE} strokeWidth="2" />;
        })}
      </g>
      <circle cx="300" cy="260" r="180" {...reg(fills, onRegion, 'halo')} />

      {/* ---- Lotus throne ---- */}
      <ellipse cx="300" cy="468" rx="180" ry="22" {...reg(fills, onRegion, 'lotus-base')} />
      {/* lotus petals (curving up) */}
      <path d="M 130 468 Q 144 420 180 414 Q 196 432 188 468 Z" {...reg(fills, onRegion, 'petal-1')} />
      <path d="M 190 468 Q 204 412 240 406 Q 256 426 248 468 Z" {...reg(fills, onRegion, 'petal-2')} />
      <path d="M 250 468 Q 264 404 300 400 Q 336 404 350 468 Z" {...reg(fills, onRegion, 'petal-3')} />
      <path d="M 352 468 Q 344 412 380 406 Q 416 412 410 468 Z" {...reg(fills, onRegion, 'petal-4')} />
      <path d="M 412 468 Q 404 414 440 414 Q 476 420 470 468 Z" {...reg(fills, onRegion, 'petal-5')} />

      {/* ---- GANESH ---- */}
      {/* legs crossed (lotus posture) */}
      <path d="M 220 390 Q 200 414 220 430 L 380 430 Q 400 414 380 390 Q 360 376 320 376 L 280 376 Q 240 376 220 390 Z" {...reg(fills, onRegion, 'legs')} />
      {/* visible feet */}
      <ellipse cx="252" cy="416" rx="12" ry="6" {...reg(fills, onRegion, 'foot-l')} />
      <ellipse cx="348" cy="416" rx="12" ry="6" {...reg(fills, onRegion, 'foot-r')} />

      {/* dhoti */}
      <path d="M 232 380 L 368 380 L 376 416 L 224 416 Z" {...reg(fills, onRegion, 'dhoti')} />
      {/* belt */}
      <rect x="226" y="372" width="148" height="12" {...reg(fills, onRegion, 'belt')} />

      {/* big round belly */}
      <ellipse cx="300" cy="320" rx="78" ry="64" {...reg(fills, onRegion, 'belly')} />
      {/* belly button */}
      <circle cx="300" cy="330" r="3" fill={STROKE} stroke="none" />

      {/* arm 1 — lower-left, holding modak (sweet) */}
      <path d="M 232 290 Q 200 320 196 376 L 218 380 Q 222 332 240 312 Z" {...reg(fills, onRegion, 'arm-1')} />
      <ellipse cx="200" cy="388" rx="10" ry="8" {...reg(fills, onRegion, 'hand-1')} />
      {/* modak (round sweet with peak) */}
      <path d="M 188 372 Q 188 360 200 358 Q 212 360 212 372 Z" {...reg(fills, onRegion, 'modak')} />
      <line x1="194" y1="358" x2="198" y2="350" stroke={STROKE} strokeWidth="1.4" />
      <line x1="200" y1="356" x2="200" y2="348" stroke={STROKE} strokeWidth="1.4" />
      <line x1="206" y1="358" x2="208" y2="350" stroke={STROKE} strokeWidth="1.4" />

      {/* arm 2 — upper-left, holding lotus */}
      <path d="M 240 270 Q 210 250 188 218 L 168 230 Q 196 268 224 290 Z" {...reg(fills, onRegion, 'arm-2')} />
      <ellipse cx="174" cy="222" rx="10" ry="8" {...reg(fills, onRegion, 'hand-2')} />
      {/* lotus flower in hand */}
      <g>
        <path d="M 170 198 Q 158 188 162 174 Q 170 180 170 198 Z" {...reg(fills, onRegion, 'lotus-l')} />
        <path d="M 170 198 Q 182 188 178 174 Q 170 180 170 198 Z" {...reg(fills, onRegion, 'lotus-r')} />
        <path d="M 170 198 Q 168 184 174 174 Q 172 184 174 196 Z" {...reg(fills, onRegion, 'lotus-c')} />
        <line x1="170" y1="200" x2="172" y2="220" stroke={STROKE} strokeWidth="2" />
      </g>

      {/* arm 3 — upper-right, holding axe (parashu) */}
      <path d="M 360 270 Q 390 250 412 218 L 432 230 Q 404 268 376 290 Z" {...reg(fills, onRegion, 'arm-3')} />
      <ellipse cx="426" cy="222" rx="10" ry="8" {...reg(fills, onRegion, 'hand-3')} />
      {/* axe head */}
      <path d="M 422 196 Q 410 188 412 174 L 442 174 Q 446 188 432 196 Z" {...reg(fills, onRegion, 'axe-head')} />
      <line x1="426" y1="200" x2="430" y2="222" stroke={STROKE} strokeWidth="2.4" />
      {/* axe handle */}
      <line x1="422" y1="174" x2="426" y2="158" stroke={STROKE} strokeWidth="2.4" />

      {/* arm 4 — lower-right, raised in blessing (abhaya mudra) */}
      <path d="M 368 290 Q 400 320 404 376 L 382 380 Q 378 332 360 312 Z" {...reg(fills, onRegion, 'arm-4')} />
      {/* hand raised palm out */}
      <path d="M 396 388 Q 396 370 408 370 Q 420 370 420 388 L 420 400 Q 408 404 396 400 Z" {...reg(fills, onRegion, 'hand-4')} />
      {/* finger lines */}
      <line x1="402" y1="372" x2="402" y2="386" stroke={STROKE} strokeWidth="1.4" />
      <line x1="408" y1="372" x2="408" y2="386" stroke={STROKE} strokeWidth="1.4" />
      <line x1="414" y1="372" x2="414" y2="386" stroke={STROKE} strokeWidth="1.4" />

      {/* sacred thread (janeu) across body */}
      <path d="M 246 246 Q 300 264 354 246 Q 354 264 300 286 Q 250 264 246 246 Z" fill="none" stroke={STROKE} strokeWidth="2" />

      {/* ---- ELEPHANT HEAD ---- */}
      {/* head */}
      <ellipse cx="300" cy="200" rx="74" ry="64" {...reg(fills, onRegion, 'head')} />
      {/* ears (large fan ears) */}
      <path d="M 232 198 Q 196 192 188 232 Q 196 268 234 264 Z" {...reg(fills, onRegion, 'ear-l')} />
      <path d="M 368 198 Q 404 192 412 232 Q 404 268 366 264 Z" {...reg(fills, onRegion, 'ear-r')} />
      {/* inner ear */}
      <path d="M 226 208 Q 210 216 212 244 Q 226 252 232 232 Z" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 374 208 Q 390 216 388 244 Q 374 252 368 232 Z" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* trunk — curved to one side (left) holding modak/curl */}
      <g style={alive ? { animation: 'wave-flag 3.6s ease-in-out infinite', transformOrigin: '300px 240px' } : null}>
        <path d="M 280 244 Q 252 286 244 264 Q 254 252 270 240 Q 282 230 300 230 Q 320 230 320 244 Q 310 252 296 254 Q 286 250 280 244 Z" {...reg(fills, onRegion, 'trunk')} />
        {/* trunk ridges */}
        <path d="M 270 250 Q 280 256 290 254" fill="none" stroke={STROKE} strokeWidth="1.4" />
        <path d="M 260 258 Q 268 264 276 264" fill="none" stroke={STROKE} strokeWidth="1.4" />
      </g>

      {/* tusks — left full, right broken (Ganesh tradition) */}
      <path d="M 274 240 L 264 256 L 262 268 L 268 268 L 276 252 Z" {...reg(fills, onRegion, 'tusk-l')} />
      {/* right (broken) — shorter stub */}
      <path d="M 326 240 L 336 248 L 332 252 L 324 246 Z" {...reg(fills, onRegion, 'tusk-r-broken')} />

      {/* eyes */}
      <circle cx="278" cy="186" r="6" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.8" />
      <circle cx="322" cy="186" r="6" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.8" />
      <circle cx="278" cy="186" r="2.4" fill={STROKE} stroke="none" />
      <circle cx="322" cy="186" r="2.4" fill={STROKE} stroke="none" />

      {/* third eye / forehead tilak */}
      <path d="M 296 158 L 304 158 L 300 174 Z" {...reg(fills, onRegion, 'tilak')} />

      {/* crown (mukut) */}
      <g style={alive ? { animation: 'glow-pulse 2.4s ease-in-out infinite' } : null}>
        <path d="M 248 144 L 352 144 L 348 130 L 252 130 Z" {...reg(fills, onRegion, 'crown-band')} />
        {/* spikes */}
        <path d="M 258 130 L 268 110 L 278 130 Z" {...reg(fills, onRegion, 'crown-1')} />
        <path d="M 280 130 L 290 104 L 300 130 Z" {...reg(fills, onRegion, 'crown-2')} />
        <path d="M 302 130 L 312 100 L 322 130 Z" {...reg(fills, onRegion, 'crown-3')} />
        <path d="M 324 130 L 334 104 L 344 130 Z" {...reg(fills, onRegion, 'crown-4')} />
        {/* crown gem */}
        <circle cx="312" cy="106" r="4" {...reg(fills, onRegion, 'crown-gem')} />
      </g>

      {/* ---- Mushika (mouse vahana) at base ---- */}
      <g style={alive ? { animation: 'gentle-bob 2.4s ease-in-out infinite' } : null}>
        <ellipse cx="480" cy="476" rx="22" ry="12" {...reg(fills, onRegion, 'mouse-body')} />
        <circle cx="500" cy="470" r="9" {...reg(fills, onRegion, 'mouse-head')} />
        <path d="M 506 462 L 510 454 L 512 464 Z" {...reg(fills, onRegion, 'mouse-ear')} />
        <circle cx="504" cy="470" r="1.4" fill={STROKE} stroke="none" />
        <path d="M 508 472 L 514 472" stroke={STROKE} strokeWidth="1.6" fill="none" />
        {/* tail */}
        <path d="M 458 478 Q 446 484 448 494" fill="none" stroke={STROKE} strokeWidth="2" />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>श्री गणेश · LORD GANESH</text>
    </svg>
  );
}

// ============================================================
// Page entries
// ============================================================
const INDIA_PAGES = [
  {
    id: 'taj-mahal',
    title: 'The Taj Mahal',
    subtitle: 'Agra, 1653',
    collection: 'world',
    eraLabel: 'Mughal Empire',
    eraColor: '#C58D2A',
    bgPreview: '#F0E2C8',
    fact: "Emperor Shah Jahan built the Taj Mahal in memory of his wife Mumtaz. It took 20,000 workers and 1,000 elephants more than 20 years to finish, and its white marble glows pink at sunrise.",
    Component: TajMahalSVG,
    readingLevel: { lexile: 820, gradeBand: '4–5', guidedReading: 'P', wordCount: 30, complexity: 'Challenging' },
    keyVocab: ['emperor', 'mausoleum', 'marble', 'minaret', 'monument'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','cloud-l','cloud-r','horizon','minaret-0','minaret-1','minaret-2','minaret-3','min-cap-0','min-cap-1','min-cap-2','min-cap-3','min-band-0-a','min-band-0-b','min-band-0-c','min-band-1-a','min-band-1-b','min-band-1-c','min-band-2-a','min-band-2-b','min-band-2-c','min-band-3-a','min-band-3-b','min-band-3-c','base','wing-l','wing-r','main-arch','side-arch-l','side-arch-r','side-arch-ll','side-arch-rr','dome-main','dome-neck','finial-orb','chhatri-l-base','chhatri-l-dome','chhatri-r-base','chhatri-r-dome','platform','pool','lawn-l','lawn-r','walkway','cypress-l','cypress-r','cypress-trunk-l','cypress-trunk-r','banner'],
    quest: {
      heading: 'A Monument of Love',
      author: 'Mughal Empire · 1653',
      lines: [
        'I am a great white palace of {0}.',
        'I was built by an emperor in honor of his {1}.',
        'I stand by a river in the country of {2}.',
      ],
      blanks: [
        { answer: 'marble', choices: ['marble', 'marshmallow', 'mustard', 'magnet'] },
        { answer: 'wife',   choices: ['wife',   'walrus',       'wagon',   'watch']  },
        { answer: 'India',  choices: ['India',  'Igloo',        'Iceberg', 'Ink']    },
      ],
      voice: {
        // Tender, poetic narrator
        hints: [/samantha/i, /allison/i, /serena/i, /daniel/i, /microsoft (aria|jenny)/i],
        rate: 0.80, pitch: 0.98,
      },
    },
  },
  {
    id: 'gandhi',
    title: 'Mahatma Gandhi',
    subtitle: 'Father of the Nation',
    collection: 'world',
    eraLabel: 'Indian Independence',
    eraColor: '#4A6FA5',
    bgPreview: '#EFE9D5',
    fact: "Mohandas \u201CMahatma\u201D Gandhi led India to independence using peaceful protest \u2014 no weapons, no shouting. He spun his own cloth on a small wheel called a charkha to show that Indians did not need foreign goods.",
    Component: GandhiSVG,
    readingLevel: { lexile: 820, gradeBand: '4–5', guidedReading: 'P', wordCount: 32, complexity: 'Challenging' },
    keyVocab: ['peaceful', 'protest', 'independence', 'mahatma', 'charkha'],
    standards: ['RI.4.4', 'RI.4.1', 'L.4.4', 'SL.4.2'],
    regions: ['background','halo','floor','mat','legs','foot-l','foot-r','dhoti','torso','shawl','arm-l','arm-r','hand-l','hand-r','neck','head','ear-l','ear-r','mustache','wheel','wheel-stand','wheel-leg-l','wheel-leg-r','spindle','dove','dove-head','banner'],
    quest: {
      heading: 'The Salt of the Earth',
      author: 'Mahatma Gandhi · 1869–1948',
      lines: [
        'I led India to be free using only {0} protest.',
        'I spun my own thread on a wheel called a {1}.',
        'I helped my country win {2}.',
      ],
      blanks: [
        { answer: 'peaceful',     choices: ['peaceful',     'pizza',     'pillow',   'puppy']    },
        { answer: 'charkha',      choices: ['charkha',      'cheese',    'cherry',   'chocolate'] },
        { answer: 'independence', choices: ['independence', 'ice-cream', 'igloo',    'invite']   },
      ],
      voice: {
        // Soft, calm, principled
        hints: [/daniel/i, /alex/i, /reed/i, /tom/i, /microsoft (mark|guy)/i],
        rate: 0.72, pitch: 0.84,
      },
    },
  },
  {
    id: 'maharaja',
    title: 'The Maharaja',
    subtitle: 'Riding the Royal Elephant',
    collection: 'world',
    eraLabel: 'Royal India',
    eraColor: '#D43A20',
    bgPreview: '#F4D8A8',
    fact: "Maharajas \u2014 the kings of Indian princely states \u2014 rode painted elephants in great parades. The elephant wore embroidered cloth, anklets that jingled, and a tiny throne on its back called a howdah.",
    Component: MaharajaSVG,
    readingLevel: { lexile: 780, gradeBand: '3–4', guidedReading: 'O', wordCount: 30, complexity: 'Moderate' },
    keyVocab: ['maharaja', 'elephant', 'howdah', 'turban', 'procession'],
    standards: ['RI.3.4', 'RI.4.4', 'L.4.4', 'SL.4.2'],
    regions: ['sky','sun','cloud','palace','palace-roof','palace-cupola-l','palace-cupola-r','palace-cupola-c','ground','palm-trunk','palm-leaf-l','palm-leaf-r','palm-leaf-u','leg-fl','leg-fr','leg-bl','leg-br','anklet-fl','anklet-fr','anklet-bl','anklet-br','body','tail','head','ear','tusk-l','tusk-r','trunk','forehead-band','forehead-gem','jhool','howdah-base','howdah-post-l','howdah-post-r','canopy','canopy-top','finial','coat','sash','face','turban','jewel','arm','sword','sword-hilt','banner'],
    quest: {
      heading: 'A Royal Procession',
      author: 'Royal India',
      lines: [
        'I am a king called a {0}.',
        'I ride atop a painted royal {1}.',
        'My small throne on the elephant\u2019s back is called a {2}.',
      ],
      blanks: [
        { answer: 'Maharaja', choices: ['Maharaja', 'Marshmallow', 'Mailbox',   'Mongoose'] },
        { answer: 'elephant', choices: ['elephant', 'eagle',        'eraser',    'envelope'] },
        { answer: 'howdah',   choices: ['howdah',   'hammer',       'hopscotch', 'helmet']   },
      ],
      voice: {
        // Festive, regal narrator
        hints: [/daniel/i, /samantha/i, /serena/i, /alex/i, /microsoft (aria|guy|jenny)/i],
        rate: 0.82, pitch: 0.96,
      },
    },
  },
  {
    id: 'ganesh',
    title: 'Lord Ganesh',
    subtitle: 'Remover of Obstacles',
    collection: 'world',
    eraLabel: 'Hindu Mythology',
    eraColor: '#E89C20',
    bgPreview: '#F8E5BD',
    fact: "Ganesh is the elephant-headed god of wisdom. Stories say his right tusk broke when he used it as a pen to write the great Indian epic, the Mahabharata. His tiny mouse Mushika carries him everywhere.",
    Component: GaneshSVG,
    readingLevel: { lexile: 760, gradeBand: '3–4', guidedReading: 'N', wordCount: 32, complexity: 'Moderate' },
    keyVocab: ['Ganesh', 'wisdom', 'obstacle', 'lotus', 'mythology'],
    standards: ['RL.4.3', 'RL.4.1', 'L.4.4', 'SL.4.2'],
    regions: ['background','halo','lotus-base','petal-1','petal-2','petal-3','petal-4','petal-5','legs','foot-l','foot-r','dhoti','belt','belly','arm-1','hand-1','modak','arm-2','hand-2','lotus-l','lotus-r','lotus-c','arm-3','hand-3','axe-head','arm-4','hand-4','head','ear-l','ear-r','trunk','tusk-l','tusk-r-broken','tilak','crown-band','crown-1','crown-2','crown-3','crown-4','crown-gem','mouse-body','mouse-head','mouse-ear','banner'],
    quest: {
      heading: 'The Wise God',
      author: 'Hindu Mythology',
      lines: [
        'I am the god with the head of an {0}.',
        'I bring good luck and remove {1}.',
        'My little friend is a tiny {2}.',
      ],
      blanks: [
        { answer: 'elephant',  choices: ['elephant',  'eagle',     'envelope', 'eraser']    },
        { answer: 'obstacles', choices: ['obstacles', 'octopuses', 'olives',   'oranges']   },
        { answer: 'mouse',     choices: ['mouse',     'monkey',    'moose',    'muffin']    },
      ],
      voice: {
        // Warm storyteller
        hints: [/samantha/i, /allison/i, /daniel/i, /serena/i, /microsoft (aria|jenny|zira)/i],
        rate: 0.80, pitch: 0.98,
      },
    },
  },
];

if (window.PAGES_DATA && Array.isArray(window.PAGES_DATA)) {
  INDIA_PAGES.forEach(p => window.PAGES_DATA.push(p));
}

Object.assign(window, { TajMahalSVG, GandhiSVG, MaharajaSVG, GaneshSVG });
