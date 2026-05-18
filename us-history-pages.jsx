// =================================================================
// Major points in United States history — 4 more coloring pages.
// Filling the gaps: Colonial (Mayflower), Westward Expansion
// (Lewis & Clark), early Industrial / aviation (Wright Brothers),
// and WWII home front (Rosie the Riveter).
// =================================================================

// ----- 11. THE MAYFLOWER — 1620 -----
function MayflowerSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '110px 110px' } : null}>
        <circle cx="110" cy="110" r="32" {...reg(fills, onRegion, 'sun')} />
      </g>
      <path d="M 370 90 Q 370 70 392 70 Q 398 56 418 56 Q 438 56 442 70 Q 462 70 462 90 Z" {...reg(fills, onRegion, 'cloud-l')} />
      <path d="M 200 140 Q 200 124 218 124 Q 222 112 240 112 Q 258 112 262 124 Q 280 124 280 140 Z" {...reg(fills, onRegion, 'cloud-r')} />
      {/* sea */}
      <path d="M 20 388 Q 200 380 380 388 Q 480 380 580 388 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'sea')} />
      <path d="M 80 426 Q 110 418 140 426" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M 480 442 Q 510 434 540 442" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* ---- ship — slight bob ---- */}
      <g style={alive ? { animation: 'gentle-bob 3s ease-in-out infinite' } : null}>
        {/* masts — non-colorable */}
        <line x1="200" y1="180" x2="200" y2="376" stroke={STROKE} strokeWidth="3" />
        <line x1="300" y1="146" x2="300" y2="376" stroke={STROKE} strokeWidth="3" />
        <line x1="400" y1="180" x2="400" y2="376" stroke={STROKE} strokeWidth="3" />
        {/* sails */}
        <path d="M 156 184 L 244 184 L 244 226 L 156 226 Z" {...reg(fills, onRegion, 'fore-top')} />
        <path d="M 148 236 L 252 236 L 252 318 L 148 318 Z" {...reg(fills, onRegion, 'fore-main')} />
        <path d="M 256 150 L 344 150 L 344 200 L 256 200 Z" {...reg(fills, onRegion, 'main-top')} />
        <path d="M 232 222 L 368 222 L 368 320 L 232 320 Z" {...reg(fills, onRegion, 'main-main')} />
        <path d="M 360 200 L 444 200 L 444 320 L 360 320 Z" {...reg(fills, onRegion, 'mizzen-sail')} />
        {/* yard lines (non-colorable) */}
        <line x1="148" y1="232" x2="252" y2="232" stroke={STROKE} strokeWidth="2" />
        <line x1="156" y1="184" x2="244" y2="184" stroke={STROKE} strokeWidth="2" />
        <line x1="232" y1="220" x2="368" y2="220" stroke={STROKE} strokeWidth="2" />
        <line x1="256" y1="150" x2="344" y2="150" stroke={STROKE} strokeWidth="2" />
        <line x1="360" y1="200" x2="444" y2="200" stroke={STROKE} strokeWidth="2" />
        {/* flags on masts */}
        <path d="M 200 180 L 222 168 L 200 156 Z" {...reg(fills, onRegion, 'flag-fore')} />
        <path d="M 300 146 L 322 134 L 300 122 Z" {...reg(fills, onRegion, 'flag-main')} />
        <path d="M 400 180 L 422 168 L 400 156 Z" {...reg(fills, onRegion, 'flag-mizzen')} />
        {/* hull */}
        <path d="M 128 340 L 472 340 L 460 388 Q 300 410 140 388 Z" {...reg(fills, onRegion, 'hull')} />
        {/* aft cabin (raised stern) */}
        <rect x="376" y="304" width="84" height="40" {...reg(fills, onRegion, 'stern-cabin')} />
        <rect x="386" y="314" width="14" height="14" {...reg(fills, onRegion, 'stern-window')} />
        {/* prow */}
        <path d="M 128 340 L 100 340 L 110 360 L 134 366 Z" {...reg(fills, onRegion, 'prow')} />
        {/* hull stripe */}
        <rect x="140" y="350" width="320" height="6" {...reg(fills, onRegion, 'hull-stripe')} />
        {/* portholes — non-colorable */}
        {[170, 210, 250, 290, 330].map(cx => (
          <circle key={cx} cx={cx} cy="370" r="3" fill={STROKE} stroke="none" />
        ))}
      </g>
      {/* ---- Plymouth Rock + Pilgrim ---- */}
      <g transform="translate(516, 480)">
        <path d="M -52 56 Q -54 28 -22 24 Q 8 20 30 28 Q 50 36 50 56 Z" {...reg(fills, onRegion, 'plymouth-rock')} />
        {/* coat */}
        <path d="M -16 26 Q -18 -10 0 -16 Q 18 -10 16 26 Z" {...reg(fills, onRegion, 'pilgrim-coat')} />
        <path d="M -10 -10 L 10 -10 L 10 0 L -10 0 Z" {...reg(fills, onRegion, 'pilgrim-collar')} />
        <ellipse cx="0" cy="-28" rx="10" ry="12" {...reg(fills, onRegion, 'pilgrim-face')} />
        {/* eyes */}
        <circle cx="-3" cy="-30" r="1.4" fill={STROKE} stroke="none" />
        <circle cx="3" cy="-30" r="1.4" fill={STROKE} stroke="none" />
        {/* hat */}
        <rect x="-14" y="-46" width="28" height="6" {...reg(fills, onRegion, 'pilgrim-hat-brim')} />
        <rect x="-9" y="-68" width="18" height="22" {...reg(fills, onRegion, 'pilgrim-hat-top')} />
        <rect x="-5" y="-58" width="10" height="5" fill="#E8A33D" stroke={STROKE} strokeWidth="1.4" />
      </g>
      {/* banner */}
      <rect x="170" y="528" width="260" height="38" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="554" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="20" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>PLYMOUTH · 1620</text>
    </svg>
  );
}

// ----- 12. LEWIS & CLARK / Corps of Discovery — 1804 -----
function LewisClarkSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '500px 100px' } : null}>
        <circle cx="500" cy="100" r="36" {...reg(fills, onRegion, 'sun')} />
      </g>
      <path d="M 70 110 Q 70 90 92 90 Q 98 76 118 76 Q 138 76 142 90 Q 162 90 162 110 Z" {...reg(fills, onRegion, 'cloud')} />
      {/* far mountains */}
      <polygon points="40,340 180,180 320,340" {...reg(fills, onRegion, 'mountain-l')} />
      <polygon points="240,340 380,160 520,340" {...reg(fills, onRegion, 'mountain-c')} />
      <polygon points="420,340 540,210 600,340" {...reg(fills, onRegion, 'mountain-r')} />
      {/* snow caps */}
      <polygon points="180,180 200,210 160,210" {...reg(fills, onRegion, 'snow-l')} />
      <polygon points="380,160 408,200 352,200" {...reg(fills, onRegion, 'snow-c')} />
      {/* river */}
      <path d="M 20 540 Q 200 480 240 460 Q 300 440 380 420 Q 460 380 580 320 L 580 540 Z" {...reg(fills, onRegion, 'river')} />
      {/* bank — the strip of grass behind the river */}
      <path d="M 20 340 L 580 340 L 580 320 Q 460 380 380 420 Q 300 440 240 460 Q 200 480 20 540 Z" {...reg(fills, onRegion, 'bank')} />
      {/* trees */}
      <g transform="translate(70, 470)">
        <rect x="-4" y="0" width="8" height="36" {...reg(fills, onRegion, 'tree-trunk-1')} />
        <polygon points="-24,0 24,0 0,-54" {...reg(fills, onRegion, 'tree-leaves-1')} />
      </g>
      <g transform="translate(540, 390)">
        <rect x="-4" y="0" width="8" height="36" {...reg(fills, onRegion, 'tree-trunk-2')} />
        <polygon points="-24,0 24,0 0,-54" {...reg(fills, onRegion, 'tree-leaves-2')} />
      </g>
      {/* eagle in sky */}
      <g style={alive ? { animation: 'gentle-bob 3s ease-in-out infinite' } : null}>
        <path d="M 340 130 Q 322 118 304 130 L 326 138 Q 340 142 354 138 L 376 130 Q 358 118 340 130 Z" {...reg(fills, onRegion, 'eagle-wings')} />
        <ellipse cx="340" cy="126" rx="6" ry="8" {...reg(fills, onRegion, 'eagle-head')} />
      </g>
      {/* ---- canoe with 3 figures ---- */}
      <g transform="translate(290, 458)">
        <path d="M -106 -2 Q -60 10 0 12 Q 60 10 106 -2 Q 84 28 0 30 Q -84 28 -106 -2 Z" {...reg(fills, onRegion, 'canoe')} />
        {/* paddles */}
        <line x1="-78" y1="-30" x2="-112" y2="22" stroke={STROKE} strokeWidth="3" />
        <line x1="78" y1="-30" x2="112" y2="22" stroke={STROKE} strokeWidth="3" />
        <ellipse cx="-116" cy="24" rx="9" ry="3" transform="rotate(-15 -116 24)" {...reg(fills, onRegion, 'paddle-l')} />
        <ellipse cx="116" cy="24" rx="9" ry="3" transform="rotate(15 116 24)" {...reg(fills, onRegion, 'paddle-r')} />
        {/* Lewis (back) */}
        <ellipse cx="-58" cy="-14" rx="14" ry="20" {...reg(fills, onRegion, 'lewis-coat')} />
        <circle cx="-58" cy="-38" r="11" {...reg(fills, onRegion, 'lewis-face')} />
        <path d="M -74 -45 L -42 -45 L -50 -54 L -66 -54 Z" {...reg(fills, onRegion, 'lewis-hat')} />
        <circle cx="-61" cy="-39" r="1.4" fill={STROKE} stroke="none" />
        <circle cx="-55" cy="-39" r="1.4" fill={STROKE} stroke="none" />
        {/* Sacagawea (middle) */}
        <ellipse cx="0" cy="-14" rx="14" ry="20" {...reg(fills, onRegion, 'sac-dress')} />
        <circle cx="0" cy="-38" r="11" {...reg(fills, onRegion, 'sac-face')} />
        <path d="M -10 -38 Q 0 -50 10 -38 L 10 -22 L -10 -22 Z" {...reg(fills, onRegion, 'sac-hair')} />
        <circle cx="-3" cy="-39" r="1.4" fill={STROKE} stroke="none" />
        <circle cx="3" cy="-39" r="1.4" fill={STROKE} stroke="none" />
        {/* pointing arm — non-colorable */}
        <line x1="10" y1="-26" x2="40" y2="-46" stroke={STROKE} strokeWidth="2.6" />
        {/* Clark (front) */}
        <ellipse cx="58" cy="-14" rx="14" ry="20" {...reg(fills, onRegion, 'clark-coat')} />
        <circle cx="58" cy="-38" r="11" {...reg(fills, onRegion, 'clark-face')} />
        <path d="M 42 -45 L 74 -45 L 66 -54 L 50 -54 Z" {...reg(fills, onRegion, 'clark-hat')} />
        <circle cx="55" cy="-39" r="1.4" fill={STROKE} stroke="none" />
        <circle cx="61" cy="-39" r="1.4" fill={STROKE} stroke="none" />
      </g>
      {/* banner */}
      <rect x="160" y="528" width="280" height="38" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="554" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="18" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>CORPS OF DISCOVERY · 1804</text>
    </svg>
  );
}

// ----- 13. WRIGHT BROTHERS' FIRST FLIGHT — 1903 -----
function WrightSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '510px 100px' } : null}>
        <circle cx="510" cy="100" r="38" {...reg(fills, onRegion, 'sun')} />
      </g>
      <path d="M 80 140 Q 80 120 102 120 Q 108 106 128 106 Q 148 106 152 120 Q 172 120 172 140 Z" {...reg(fills, onRegion, 'cloud-l')} />
      <path d="M 360 80 Q 360 64 378 64 Q 382 52 400 52 Q 418 52 422 64 Q 440 64 440 80 Z" {...reg(fills, onRegion, 'cloud-r')} />
      {/* birds */}
      <path d="M 100 200 Q 110 195 120 200 Q 130 195 140 200" fill="none" stroke={STROKE} strokeWidth="2" />
      <path d="M 180 230 Q 190 225 200 230 Q 210 225 220 230" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* dunes */}
      <path d="M 20 460 Q 200 422 380 460 Q 480 440 580 460 L 580 500 L 20 500 Z" {...reg(fills, onRegion, 'dune-far')} />
      <path d="M 20 500 Q 160 470 320 500 Q 440 480 580 500 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'sand')} />
      {/* launch rail (non-colorable) */}
      <line x1="60" y1="480" x2="540" y2="480" stroke={STROKE} strokeWidth="2.4" strokeDasharray="8 5" />
      {/* ---- Flyer in the air ---- */}
      <g transform="translate(310, 290)" style={alive ? { animation: 'gentle-bob 2.4s ease-in-out infinite' } : null}>
        {/* top wing */}
        <rect x="-130" y="-22" width="260" height="14" {...reg(fills, onRegion, 'top-wing')} />
        {/* bottom wing */}
        <rect x="-130" y="48" width="260" height="14" {...reg(fills, onRegion, 'bottom-wing')} />
        {/* struts — non-colorable */}
        {[-110, -70, -30, 30, 70, 110].map((x) => (
          <line key={x} x1={x} y1="-8" x2={x} y2="48" stroke={STROKE} strokeWidth="2" />
        ))}
        {/* diagonal wires */}
        <line x1="-110" y1="-8" x2="-70" y2="48" stroke={STROKE} strokeWidth="1" />
        <line x1="-70"  y1="-8" x2="-30" y2="48" stroke={STROKE} strokeWidth="1" />
        <line x1="30"   y1="-8" x2="70"  y2="48" stroke={STROKE} strokeWidth="1" />
        <line x1="70"   y1="-8" x2="110" y2="48" stroke={STROKE} strokeWidth="1" />
        {/* engine */}
        <rect x="-14" y="10" width="28" height="24" {...reg(fills, onRegion, 'engine')} />
        {/* pilot lying prone on bottom wing */}
        <ellipse cx="-4" cy="42" rx="24" ry="9" {...reg(fills, onRegion, 'pilot-body')} />
        <circle cx="-28" cy="42" r="8" {...reg(fills, onRegion, 'pilot-head')} />
        <rect x="-36" y="36" width="18" height="6" {...reg(fills, onRegion, 'pilot-cap')} />
        {/* propellers */}
        <ellipse cx="-90" cy="62" rx="6" ry="32" {...reg(fills, onRegion, 'propeller-l')} />
        <ellipse cx="90" cy="62" rx="6" ry="32" {...reg(fills, onRegion, 'propeller-r')} />
        {/* front horizontal rudder (canard) */}
        <rect x="-202" y="14" width="50" height="14" {...reg(fills, onRegion, 'rudder-front')} />
        <line x1="-152" y1="20" x2="-130" y2="20" stroke={STROKE} strokeWidth="2" />
        <line x1="-152" y1="22" x2="-130" y2="22" stroke={STROKE} strokeWidth="2" />
        {/* rear vertical rudder */}
        <rect x="152" y="2" width="34" height="44" {...reg(fills, onRegion, 'rudder-back')} />
        <line x1="130" y1="20" x2="152" y2="20" stroke={STROKE} strokeWidth="2" />
        <line x1="130" y1="22" x2="152" y2="22" stroke={STROKE} strokeWidth="2" />
      </g>
      {/* Wilbur running with arms up on the sand */}
      <g transform="translate(180, 466)">
        <ellipse cx="0" cy="0" rx="10" ry="22" {...reg(fills, onRegion, 'wilbur-coat')} />
        <circle cx="0" cy="-28" r="9" {...reg(fills, onRegion, 'wilbur-face')} />
        <rect x="-10" y="-38" width="20" height="6" {...reg(fills, onRegion, 'wilbur-cap')} />
        <line x1="-8" y1="-12" x2="-22" y2="-32" stroke={STROKE} strokeWidth="3" />
        <line x1="8"  y1="-12" x2="22"  y2="-32" stroke={STROKE} strokeWidth="3" />
        <line x1="-4" y1="20" x2="-10" y2="40" stroke={STROKE} strokeWidth="3" />
        <line x1="4"  y1="20" x2="10"  y2="40" stroke={STROKE} strokeWidth="3" />
      </g>
      {/* banner */}
      <rect x="180" y="540" width="240" height="36" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="564" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="20" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>KITTY HAWK · 1903</text>
    </svg>
  );
}

// ----- 14. ROSIE THE RIVETER — 1942 -----
function RosieSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* poster yellow background */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'bg')} />
      {/* speech bubble */}
      <path d="M 60 60 L 540 60 Q 560 60 560 80 L 560 162 Q 560 182 540 182 L 400 182 L 380 212 L 380 182 L 60 182 Q 40 182 40 162 L 40 80 Q 40 60 60 60 Z" {...reg(fills, onRegion, 'speech')} />
      <text x="300" y="140" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="900" fontSize="44" fill={STROKE} stroke="none" letterSpacing="-0.02em" style={{ pointerEvents: 'none' }}>WE CAN DO IT!</text>
      {/* denim shirt body */}
      <path d="M 180 460 L 420 460 L 420 580 L 180 580 Z" {...reg(fills, onRegion, 'shirt-body')} />
      {/* V-neck */}
      <path d="M 248 460 L 300 522 L 352 460 Z" {...reg(fills, onRegion, 'shirt-vee')} />
      <path d="M 224 460 L 248 460 L 300 510 L 268 470 Z" {...reg(fills, onRegion, 'collar-l')} />
      <path d="M 376 460 L 352 460 L 300 510 L 332 470 Z" {...reg(fills, onRegion, 'collar-r')} />
      {/* buttons (non-colorable) */}
      <circle cx="300" cy="540" r="3" fill={STROKE} stroke="none" />
      <circle cx="300" cy="562" r="3" fill={STROKE} stroke="none" />
      {/* ---- flexed arm — gently bobs ---- */}
      <g style={alive ? { animation: 'gentle-bob 2.8s ease-in-out infinite', transformOrigin: '420px 360px' } : null}>
        {/* bicep — outer curve up */}
        <path d="M 376 460 Q 484 444 504 348 Q 514 280 466 244 L 420 280 Q 462 304 462 350 Q 462 410 396 444 Z" {...reg(fills, onRegion, 'bicep')} />
        {/* sleeve roll at shoulder/bicep base */}
        <path d="M 360 432 Q 414 412 472 408 L 478 460 Q 432 472 360 466 Z" {...reg(fills, onRegion, 'sleeve-roll')} />
        {/* forearm — back to the fist */}
        <path d="M 466 244 Q 484 204 444 192 Q 406 184 388 232 Q 400 248 422 250 Q 444 248 466 244 Z" {...reg(fills, onRegion, 'forearm')} />
        {/* fist */}
        <circle cx="412" cy="196" r="22" {...reg(fills, onRegion, 'fist')} />
        <line x1="402" y1="190" x2="416" y2="190" stroke={STROKE} strokeWidth="1.5" />
        <line x1="402" y1="200" x2="416" y2="200" stroke={STROKE} strokeWidth="1.5" />
        <line x1="402" y1="210" x2="416" y2="210" stroke={STROKE} strokeWidth="1.5" />
      </g>
      {/* face */}
      <ellipse cx="266" cy="368" rx="52" ry="64" {...reg(fills, onRegion, 'face')} />
      {/* hair under bandana */}
      <path d="M 214 336 Q 214 302 236 302 L 266 302 L 266 340 Q 244 342 214 336 Z" {...reg(fills, onRegion, 'hair-l')} />
      <path d="M 318 336 Q 318 302 296 302 L 266 302 L 266 340 Q 288 342 318 336 Z" {...reg(fills, onRegion, 'hair-r')} />
      {/* bandana */}
      <path d="M 210 294 Q 206 250 236 244 L 304 244 Q 332 250 326 294 L 320 336 L 216 336 Z" {...reg(fills, onRegion, 'bandana')} />
      {/* knot at top */}
      <path d="M 264 244 Q 268 222 286 220 Q 302 224 296 244 Q 286 236 264 244 Z" {...reg(fills, onRegion, 'bandana-knot')} />
      {/* polka dots — non-colorable */}
      {[[228,266],[252,290],[278,266],[302,290],[262,312],[294,312]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.4" fill="#FFFDF5" stroke={STROKE} strokeWidth="1" />
      ))}
      {/* face features */}
      <path d="M 240 354 Q 250 348 260 354" fill="none" stroke={STROKE} strokeWidth="2" />
      <circle cx="252" cy="356" r="2.5" fill={STROKE} stroke="none" />
      <path d="M 276 354 Q 286 348 296 354" fill="none" stroke={STROKE} strokeWidth="2" />
      <circle cx="288" cy="356" r="2.5" fill={STROKE} stroke="none" />
      {/* eyebrows */}
      <path d="M 240 342 Q 252 338 262 344" fill="none" stroke={STROKE} strokeWidth="2.4" />
      <path d="M 276 344 Q 286 338 300 342" fill="none" stroke={STROKE} strokeWidth="2.4" />
      {/* nose */}
      <path d="M 264 370 L 260 392 Q 266 396 272 392 L 268 370" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* lips */}
      <path d="M 248 416 Q 266 422 284 416 Q 278 428 266 428 Q 254 428 248 416 Z" {...reg(fills, onRegion, 'lips')} />
      {/* banner */}
      <rect x="190" y="546" width="220" height="30" rx="5" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="567" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>HOMEFRONT · 1942</text>
    </svg>
  );
}

// ----- Page entries -----
const US_HISTORY_PAGES = [
  {
    id: 'mayflower',
    title: 'The Mayflower',
    subtitle: 'Plymouth Harbor, 1620',
    collection: 'us',
    eraLabel: 'Colonial America',
    eraColor: '#6B4423',
    bgPreview: '#D9CBA5',
    fact: "The Mayflower carried 102 passengers across the Atlantic Ocean in 1620 — a journey of 66 stormy days and nights.",
    Component: MayflowerSVG,
    regions: ['sky','sun','cloud-l','cloud-r','sea','fore-top','fore-main','main-top','main-main','mizzen-sail','flag-fore','flag-main','flag-mizzen','hull','stern-cabin','stern-window','prow','hull-stripe','plymouth-rock','pilgrim-coat','pilgrim-collar','pilgrim-face','pilgrim-hat-brim','pilgrim-hat-top','banner'],
    readingLevel: { lexile: 720, gradeBand: '3–4', guidedReading: 'N', wordCount: 26, complexity: 'Moderate' },
    keyVocab: ['pilgrim', 'compact', 'covenant', 'Plymouth'],
    standards: ['RI.4.4', 'RI.4.1', 'SL.4.2', 'L.4.4'],
    quest: {
      heading: 'The Mayflower Compact',
      author: 'Pilgrims of Plymouth · 1620',
      lines: [
        'We sailed across the wide {0}',
        'to make a new {1} at Plymouth Rock.',
        'We promise to live by fair and just {2}.',
      ],
      blanks: [
        { answer: 'ocean', choices: ['ocean', 'orchard', 'oven',   'organ'] },
        { answer: 'home',  choices: ['home',  'hat',     'hill',   'horse'] },
        { answer: 'laws',  choices: ['laws',  'leaves',  'lakes',  'lambs'] },
      ],
      voice: {
        // Deep, somber, English-Puritan feel
        hints: [/daniel/i, /bruce/i, /tom/i, /reed/i, /alex/i, /microsoft (mark|davis|guy)/i],
        rate: 0.74, pitch: 0.84,
      },
    },
  },
  {
    id: 'lewis-clark',
    title: 'Lewis & Clark Expedition',
    subtitle: 'The Northwest, 1804',
    collection: 'us',
    eraLabel: 'Westward Expansion',
    eraColor: '#5A7D4A',
    bgPreview: '#D4E2C5',
    fact: "Lewis and Clark traveled over 8,000 miles with their guide Sacagawea — the first Americans to cross the continent and reach the Pacific.",
    Component: LewisClarkSVG,
    regions: ['sky','sun','cloud','mountain-l','mountain-c','mountain-r','snow-l','snow-c','river','bank','tree-trunk-1','tree-leaves-1','tree-trunk-2','tree-leaves-2','eagle-wings','eagle-head','canoe','paddle-l','paddle-r','lewis-coat','lewis-face','lewis-hat','sac-dress','sac-face','sac-hair','clark-coat','clark-face','clark-hat','banner'],
    readingLevel: { lexile: 740, gradeBand: '3–4', guidedReading: 'N', wordCount: 20, complexity: 'Moderate' },
    keyVocab: ['expedition', 'frontier', 'Pacific', 'discovery'],
    standards: ['RI.3.7', 'RI.3.1', 'L.3.4', 'SL.3.2'],
    quest: {
      heading: 'Corps of Discovery',
      author: 'William Clark\u2019s Journal · 1805',
      lines: [
        'We follow the great {0} west',
        'across the wild {1}',
        'to reach the great Pacific {2}.',
      ],
      blanks: [
        { answer: 'river',     choices: ['river',     'recipe',  'rocket',   'raisin'] },
        { answer: 'mountains', choices: ['mountains', 'mailboxes','meadows', 'muffins'] },
        { answer: 'Ocean',     choices: ['Ocean',     'Onion',   'Oven',     'Octopus'] },
      ],
      voice: {
        // Confident American explorer voice
        hints: [/tom/i, /alex/i, /aaron/i, /daniel/i, /reed/i, /microsoft (guy|davis|mark)/i],
        rate: 0.82, pitch: 0.92,
      },
    },
  },
  {
    id: 'wright-brothers',
    title: 'The Wright Brothers',
    subtitle: 'Kitty Hawk, 1903',
    collection: 'us',
    eraLabel: 'Age of Invention',
    eraColor: '#D67A2C',
    bgPreview: '#F5DDB3',
    fact: "On December 17, 1903, Orville Wright's first flight lasted only 12 seconds — but it changed the world. By 1969, his fellow Americans would walk on the Moon.",
    Component: WrightSVG,
    regions: ['sky','sun','cloud-l','cloud-r','dune-far','sand','top-wing','bottom-wing','engine','pilot-body','pilot-head','pilot-cap','propeller-l','propeller-r','rudder-front','rudder-back','wilbur-coat','wilbur-face','wilbur-cap','banner'],
    readingLevel: { lexile: 660, gradeBand: '2–3', guidedReading: 'L', wordCount: 22, complexity: 'Easy' },
    keyVocab: ['flight', 'invention', 'wings', 'machine'],
    standards: ['RI.3.4', 'RI.3.1', 'SL.3.2'],
    quest: {
      heading: 'Telegram from Kitty Hawk',
      author: 'Orville Wright · December 17, 1903',
      lines: [
        'Today we flew our flying {0}!',
        'We sailed above the windy {1}.',
        'Mankind has finally found its {2}!',
      ],
      blanks: [
        { answer: 'machine', choices: ['machine', 'monkey',  'muffin',  'mailbox'] },
        { answer: 'dunes',   choices: ['dunes',   'doors',   'donuts',  'drums'] },
        { answer: 'wings',   choices: ['wings',   'wagons',  'whistles','wallets'] },
      ],
      voice: {
        // Bright, hopeful, slightly Midwestern inventor
        hints: [/tom/i, /alex/i, /aaron/i, /reed/i, /microsoft (guy|davis)/i],
        rate: 0.88, pitch: 1.00,
      },
    },
  },
  {
    id: 'rosie',
    title: 'Rosie the Riveter',
    subtitle: 'American Home Front, 1942',
    collection: 'us',
    eraLabel: 'World War II',
    eraColor: '#1F4D7A',
    bgPreview: '#FFD23F',
    fact: "During World War II, more than 6 million women went to work building planes, ships, and tanks. 'Rosie the Riveter' came to stand for all of them.",
    Component: RosieSVG,
    regions: ['bg','speech','shirt-body','shirt-vee','collar-l','collar-r','bicep','sleeve-roll','forearm','fist','face','hair-l','hair-r','bandana','bandana-knot','lips','banner'],
    readingLevel: { lexile: 600, gradeBand: '2–3', guidedReading: 'K', wordCount: 18, complexity: 'Easy' },
    keyVocab: ['homefront', 'factory', 'rivet', 'together'],
    standards: ['RI.2.4', 'RI.2.1', 'SL.2.2'],
    quest: {
      heading: '"We Can Do It!"',
      author: 'American Home Front · 1942',
      lines: [
        'I roll up my {0},',
        'and I lift my mighty {1}.',
        'Together we shout: We can do {2}!',
      ],
      blanks: [
        { answer: 'sleeves', choices: ['sleeves', 'sneakers', 'sandwiches', 'snowballs'] },
        { answer: 'arm',     choices: ['arm',     'apple',    'ant',         'acorn'] },
        { answer: 'it',      choices: ['it',      'in',       'if',          'ice'] },
      ],
      voice: {
        // Strong, warm, American woman's voice
        hints: [/samantha/i, /ava/i, /karen/i, /allison/i, /microsoft (aria|jenny|zira)/i, /susan/i],
        rate: 0.88, pitch: 1.04,
      },
    },
  },
];

if (window.PAGES_DATA && Array.isArray(window.PAGES_DATA)) {
  US_HISTORY_PAGES.forEach(p => window.PAGES_DATA.push(p));
}

Object.assign(window, { MayflowerSVG, LewisClarkSVG, WrightSVG, RosieSVG });
