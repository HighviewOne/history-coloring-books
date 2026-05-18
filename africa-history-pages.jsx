// =================================================================
// African history coloring pages — 4 additions:
//   • Mansa Musa, Emperor of Mali (14th century)
//   • A Maasai Warrior (East Africa)
//   • Great Zimbabwe (Southern Africa, c. 11–15th c.)
//   • Nelson Mandela (Modern South Africa)
// =================================================================

// ----- 43. MANSA MUSA — Mali Empire, c. 1324 -----
function MansaMusaSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun behind */}
      <g style={alive ? { animation: 'sun-pulse 2.6s ease-in-out infinite', transformOrigin: '300px 130px' } : null}>
        <circle cx="300" cy="130" r="52" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* sun rays */}
      {Array.from({length:14}).map((_,i)=>{
        const a = i * Math.PI * 2 / 14 - Math.PI/2;
        return <line key={`sr-${i}`} x1={300 + Math.cos(a)*60} y1={130 + Math.sin(a)*60} x2={300 + Math.cos(a)*82} y2={130 + Math.sin(a)*82} stroke={STROKE} strokeWidth="2" />;
      })}

      {/* desert horizon */}
      <path d="M 20 360 Q 200 350 380 360 Q 480 354 580 360 L 580 420 L 20 420 Z" {...reg(fills, onRegion, 'desert')} />
      {/* dunes */}
      <path d="M 20 400 Q 100 384 200 400 Q 300 384 400 400 Q 500 384 580 400" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* far mud-brick walls (Djenné silhouette) */}
      <rect x="60" y="280" width="80" height="80" {...reg(fills, onRegion, 'mud-tower-l')} />
      <rect x="76" y="248" width="48" height="32" {...reg(fills, onRegion, 'mud-tower-l-top')} />
      <path d="M 76 248 L 84 248 L 86 234 L 78 234 Z" fill={STROKE} stroke="none" />
      <path d="M 110 248 L 118 248 L 120 234 L 112 234 Z" fill={STROKE} stroke="none" />
      <rect x="460" y="280" width="80" height="80" {...reg(fills, onRegion, 'mud-tower-r')} />
      <rect x="476" y="248" width="48" height="32" {...reg(fills, onRegion, 'mud-tower-r-top')} />
      <path d="M 476 248 L 484 248 L 486 234 L 478 234 Z" fill={STROKE} stroke="none" />
      <path d="M 510 248 L 518 248 L 520 234 L 512 234 Z" fill={STROKE} stroke="none" />
      {/* protruding wooden beams (toron) — non-colorable */}
      {[68,84,100,116,476,492,508,524].map((x,i) => (
        <line key={`tb-${i}`} x1={x} y1="304" x2={x-6} y2="306" stroke={STROKE} strokeWidth="2" />
      ))}
      {[68,84,100,116,476,492,508,524].map((x,i) => (
        <line key={`tb2-${i}`} x1={x} y1="336" x2={x-6} y2="338" stroke={STROKE} strokeWidth="2" />
      ))}

      {/* ---- Throne ---- */}
      <rect x="200" y="380" width="200" height="100" {...reg(fills, onRegion, 'throne-base')} />
      <rect x="180" y="250" width="240" height="140" {...reg(fills, onRegion, 'throne-back')} />
      {/* throne back decorative pattern */}
      <rect x="210" y="266" width="180" height="106" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* throne back finials */}
      <path d="M 180 250 L 220 250 L 200 224 Z" {...reg(fills, onRegion, 'finial-l')} />
      <path d="M 380 250 L 420 250 L 400 224 Z" {...reg(fills, onRegion, 'finial-r')} />
      {/* throne steps */}
      <rect x="160" y="480" width="280" height="14" {...reg(fills, onRegion, 'throne-step-1')} />
      <rect x="140" y="494" width="320" height="16" {...reg(fills, onRegion, 'throne-step-2')} />

      {/* gold coins scattered on steps */}
      {[170,210,250,330,370,410,450].map((x,i) => (
        <g key={`gc-${i}`}>
          <circle cx={x} cy={500} r="6" {...reg(fills, onRegion, `coin-${i}`)} />
          <text x={x} y={503} textAnchor="middle" fontSize="6" fontWeight="900" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>$</text>
        </g>
      ))}

      {/* ---- Mansa Musa figure (seated) ---- */}
      {/* legs / lower robe drape */}
      <path d="M 232 380 L 368 380 L 384 470 L 216 470 Z" {...reg(fills, onRegion, 'robe-lap')} />
      {/* robe drape folds */}
      <line x1="266" y1="384" x2="262" y2="464" stroke={STROKE} strokeWidth="1.6" />
      <line x1="300" y1="384" x2="300" y2="466" stroke={STROKE} strokeWidth="1.6" />
      <line x1="334" y1="384" x2="338" y2="464" stroke={STROKE} strokeWidth="1.6" />
      {/* feet — sandals peeking out */}
      <ellipse cx="260" cy="470" rx="18" ry="6" {...reg(fills, onRegion, 'foot-l')} />
      <ellipse cx="340" cy="470" rx="18" ry="6" {...reg(fills, onRegion, 'foot-r')} />

      {/* torso — boubou robe */}
      <path d="M 232 290 Q 232 240 300 232 Q 368 240 368 290 L 376 384 L 224 384 Z" {...reg(fills, onRegion, 'boubou')} />
      {/* boubou embroidery — vertical patterned band down center */}
      <rect x="284" y="244" width="32" height="138" {...reg(fills, onRegion, 'embroidery')} />
      {/* pattern dots on embroidery */}
      {[260,290,320,350].map((y,i) => (
        <circle key={`ed-${i}`} cx="300" cy={y} r="3" fill={STROKE} stroke="none" />
      ))}
      <line x1="290" y1="280" x2="310" y2="280" stroke={STROKE} strokeWidth="1.2" />
      <line x1="290" y1="310" x2="310" y2="310" stroke={STROKE} strokeWidth="1.2" />
      <line x1="290" y1="340" x2="310" y2="340" stroke={STROKE} strokeWidth="1.2" />

      {/* gold chain necklace */}
      <path d="M 268 240 Q 300 260 332 240" fill="none" stroke={STROKE} strokeWidth="2" />
      <circle cx="300" cy="258" r="6" {...reg(fills, onRegion, 'pendant')} />
      <line x1="300" y1="262" x2="300" y2="270" stroke={STROKE} strokeWidth="1.4" />

      {/* right arm — raised, holding gold nugget */}
      <path d="M 368 248 Q 408 230 432 192 Q 442 184 450 192 Q 422 240 388 268 Z" {...reg(fills, onRegion, 'arm-r')} />
      {/* hand */}
      <ellipse cx="445" cy="194" rx="10" ry="9" {...reg(fills, onRegion, 'hand-r')} />
      {/* gold nugget — bright with shine animation */}
      <g style={alive ? { animation: 'glow-pulse 1.6s ease-in-out infinite', transformOrigin: '454px 174px' } : null}>
        <path d="M 442 168 L 466 168 L 470 184 L 460 192 L 444 188 L 438 178 Z" {...reg(fills, onRegion, 'gold-nugget')} />
        {/* sparkle */}
        <path d="M 454 154 L 458 162 L 466 158 L 458 164 L 462 152" stroke={STROKE} strokeWidth="1.4" fill="none" />
      </g>

      {/* left arm — at side, holding scepter */}
      <path d="M 232 248 Q 200 260 188 320 L 208 326 Q 220 274 244 264 Z" {...reg(fills, onRegion, 'arm-l')} />
      <ellipse cx="200" cy="334" rx="10" ry="8" {...reg(fills, onRegion, 'hand-l')} />
      {/* scepter staff */}
      <line x1="200" y1="334" x2="180" y2="248" stroke={STROKE} strokeWidth="3" />
      <circle cx="178" cy="244" r="7" {...reg(fills, onRegion, 'scepter-orb')} />

      {/* neck */}
      <path d="M 290 208 L 310 208 L 312 234 L 288 234 Z" {...reg(fills, onRegion, 'neck')} />

      {/* face */}
      <ellipse cx="300" cy="186" rx="30" ry="34" {...reg(fills, onRegion, 'face')} />
      {/* eyes */}
      <circle cx="290" cy="184" r="2.4" fill={STROKE} stroke="none" />
      <circle cx="310" cy="184" r="2.4" fill={STROKE} stroke="none" />
      {/* eyebrows */}
      <path d="M 282 174 Q 290 170 298 174" fill="none" stroke={STROKE} strokeWidth="2" />
      <path d="M 302 174 Q 310 170 318 174" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* nose */}
      <path d="M 300 188 L 296 200 Q 300 204 304 200 Z" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* mustache */}
      <path d="M 286 208 Q 296 214 300 210 Q 304 214 314 208" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* beard */}
      <path d="M 280 212 Q 282 232 300 240 Q 318 232 320 212 Q 308 224 300 222 Q 292 224 280 212 Z" {...reg(fills, onRegion, 'beard')} />

      {/* crown — tall conical golden cap */}
      <g style={alive ? { animation: 'glow-pulse 2.4s ease-in-out infinite', transformOrigin: '300px 130px' } : null}>
        <path d="M 270 158 L 330 158 L 340 168 L 260 168 Z" {...reg(fills, onRegion, 'crown-band')} />
        <path d="M 272 158 L 328 158 L 314 100 L 286 100 Z" {...reg(fills, onRegion, 'crown-cap')} />
        {/* crown gem at peak */}
        <circle cx="300" cy="96" r="6" {...reg(fills, onRegion, 'crown-gem')} />
        {/* crown details */}
        <line x1="276" y1="140" x2="324" y2="140" stroke={STROKE} strokeWidth="1.4" />
        <circle cx="290" cy="130" r="2" fill={STROKE} stroke="none" />
        <circle cx="310" cy="130" r="2" fill={STROKE} stroke="none" />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>MANSA MUSA · MALI · 1324</text>
    </svg>
  );
}

// ----- 44. THE MAASAI WARRIOR — East Africa -----
function MaasaiSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sunset sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* setting sun */}
      <g style={alive ? { animation: 'sun-pulse 3s ease-in-out infinite', transformOrigin: '460px 300px' } : null}>
        <circle cx="460" cy="300" r="62" {...reg(fills, onRegion, 'sun')} />
      </g>

      {/* Kilimanjaro silhouette far back */}
      <path d="M 20 340 L 200 240 L 280 280 L 580 340 L 580 380 L 20 380 Z" {...reg(fills, onRegion, 'kilimanjaro')} />
      {/* snow cap */}
      <path d="M 184 252 L 216 252 L 222 268 L 178 268 Z" {...reg(fills, onRegion, 'snow-cap')} />

      {/* savanna ground (rolling) */}
      <path d="M 20 380 Q 200 360 380 380 Q 480 370 580 380 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'savanna')} />
      {/* grass tufts — non-colorable */}
      {[60,150,230,330,410,500].map((x,i) => (
        <path key={`gt-${i}`} d={`M ${x} 478 L ${x+4} 466 L ${x+8} 478 L ${x+12} 466 L ${x+16} 478`} fill="none" stroke={STROKE} strokeWidth="1.6" />
      ))}

      {/* acacia tree — umbrella canopy, far right */}
      <path d="M 530 540 Q 534 470 524 400 Q 538 470 546 540 Z" {...reg(fills, onRegion, 'acacia-trunk')} />
      <path d="M 480 400 Q 480 376 504 372 Q 540 360 580 376 Q 580 400 540 400 Q 504 400 480 400 Z" {...reg(fills, onRegion, 'acacia-canopy')} />
      {/* branch detail lines */}
      <line x1="540" y1="404" x2="500" y2="384" stroke={STROKE} strokeWidth="1.4" />
      <line x1="540" y1="404" x2="552" y2="382" stroke={STROKE} strokeWidth="1.4" />
      <line x1="540" y1="404" x2="570" y2="386" stroke={STROKE} strokeWidth="1.4" />

      {/* secondary acacia far away (left horizon) */}
      <path d="M 90 380 Q 92 360 88 340 Q 94 360 96 380 Z" {...reg(fills, onRegion, 'acacia-trunk-far')} />
      <path d="M 70 340 Q 70 326 84 324 Q 100 320 114 326 Q 114 340 100 340 Q 84 340 70 340 Z" {...reg(fills, onRegion, 'acacia-canopy-far')} />

      {/* ---- MAASAI WARRIOR — tall slim figure, frontal ---- */}
      {/* legs — bare */}
      <rect x="248" y="372" width="20" height="98" {...reg(fills, onRegion, 'leg-l')} />
      <rect x="282" y="372" width="20" height="98" {...reg(fills, onRegion, 'leg-r')} />
      {/* knee lines */}
      <line x1="248" y1="416" x2="268" y2="416" stroke={STROKE} strokeWidth="1.4" />
      <line x1="282" y1="416" x2="302" y2="416" stroke={STROKE} strokeWidth="1.4" />
      {/* feet/sandals */}
      <ellipse cx="258" cy="478" rx="14" ry="6" {...reg(fills, onRegion, 'sandal-l')} />
      <ellipse cx="292" cy="478" rx="14" ry="6" {...reg(fills, onRegion, 'sandal-r')} />
      <line x1="252" y1="472" x2="266" y2="476" stroke={STROKE} strokeWidth="1.4" />
      <line x1="286" y1="472" x2="300" y2="476" stroke={STROKE} strokeWidth="1.4" />
      {/* anklet beads */}
      <rect x="246" y="466" width="24" height="4" {...reg(fills, onRegion, 'anklet-l')} />
      <rect x="280" y="466" width="24" height="4" {...reg(fills, onRegion, 'anklet-r')} />

      {/* red shuka (cloth wrap from shoulder to thigh) */}
      <path d="M 226 230 L 326 230 L 348 376 L 204 376 Z" {...reg(fills, onRegion, 'shuka')} />
      {/* shuka plaid pattern lines (signature checkered red) — non-colorable */}
      <line x1="220" y1="266" x2="346" y2="266" stroke={STROKE} strokeWidth="1.6" />
      <line x1="218" y1="304" x2="350" y2="304" stroke={STROKE} strokeWidth="1.6" />
      <line x1="216" y1="340" x2="352" y2="340" stroke={STROKE} strokeWidth="1.6" />
      <line x1="248" y1="230" x2="244" y2="376" stroke={STROKE} strokeWidth="1.4" />
      <line x1="280" y1="230" x2="280" y2="376" stroke={STROKE} strokeWidth="1.4" />
      <line x1="312" y1="230" x2="316" y2="376" stroke={STROKE} strokeWidth="1.4" />

      {/* one shoulder bare — drape over right shoulder only */}
      <path d="M 314 224 L 332 224 L 330 250 L 308 246 Z" {...reg(fills, onRegion, 'shuka-shoulder')} />

      {/* right arm — at side */}
      <path d="M 326 240 Q 350 270 348 340 L 332 340 Q 326 290 320 268 Z" {...reg(fills, onRegion, 'arm-r')} />
      <ellipse cx="340" cy="346" rx="9" ry="8" {...reg(fills, onRegion, 'hand-r')} />

      {/* left arm — extended, holding spear */}
      <path d="M 226 240 Q 200 250 198 296 L 214 296 Q 220 268 234 256 Z" {...reg(fills, onRegion, 'arm-l')} />
      <ellipse cx="206" cy="304" rx="9" ry="8" {...reg(fills, onRegion, 'hand-l')} />

      {/* spear — vertical, held in left hand */}
      <line x1="208" y1="60" x2="208" y2="540" stroke={STROKE} strokeWidth="3" />
      <path d="M 200 60 L 208 30 L 216 60 Z" {...reg(fills, onRegion, 'spear-tip')} />
      <rect x="204" y="540" width="8" height="20" {...reg(fills, onRegion, 'spear-butt')} />

      {/* oval shield — large traditional Maasai shield, held in right arm */}
      <g style={alive ? { animation: 'gentle-bob 3.4s ease-in-out infinite' } : null}>
        <ellipse cx="404" cy="350" rx="44" ry="62" {...reg(fills, onRegion, 'shield')} />
        {/* shield central stripe */}
        <rect x="396" y="290" width="16" height="120" {...reg(fills, onRegion, 'shield-stripe')} />
        {/* shield outer band */}
        <ellipse cx="404" cy="350" rx="44" ry="62" fill="none" stroke={STROKE} strokeWidth="2.4" />
        <ellipse cx="404" cy="350" rx="34" ry="50" fill="none" stroke={STROKE} strokeWidth="1.6" />
        {/* shield triangle accents */}
        <path d="M 388 314 L 376 304 L 388 304 Z" fill={STROKE} stroke="none" />
        <path d="M 420 314 L 432 304 L 420 304 Z" fill={STROKE} stroke="none" />
        <path d="M 388 386 L 376 396 L 388 396 Z" fill={STROKE} stroke="none" />
        <path d="M 420 386 L 432 396 L 420 396 Z" fill={STROKE} stroke="none" />
      </g>

      {/* broad beaded collar — Maasai signature */}
      <g style={alive ? { animation: 'glow-pulse 2.6s ease-in-out infinite' } : null}>
        <path d="M 244 218 Q 276 240 308 238 Q 332 228 332 222 Q 332 240 308 250 Q 276 256 244 244 Z" {...reg(fills, onRegion, 'collar')} />
        {/* collar band rows */}
        <path d="M 250 230 Q 280 246 310 240" fill="none" stroke={STROKE} strokeWidth="1.4" />
        <path d="M 254 244 Q 282 252 308 246" fill="none" stroke={STROKE} strokeWidth="1.4" />
        {/* radial bead dots */}
        {[256,272,288,304].map((x,i) => (
          <circle key={`bd-${i}`} cx={x} cy={232 + Math.abs(x-280)*0.1} r="2" fill={STROKE} stroke="none" />
        ))}
      </g>

      {/* neck */}
      <path d="M 268 196 L 296 196 L 298 222 L 266 222 Z" {...reg(fills, onRegion, 'neck')} />

      {/* head */}
      <ellipse cx="282" cy="172" rx="28" ry="32" {...reg(fills, onRegion, 'head')} />
      {/* hair — red-ochre dyed, close-cropped */}
      <path d="M 256 156 Q 256 140 282 138 Q 308 140 308 156 Q 296 148 282 148 Q 268 148 256 156 Z" {...reg(fills, onRegion, 'hair')} />
      {/* face features */}
      <circle cx="272" cy="172" r="2" fill={STROKE} stroke="none" />
      <circle cx="292" cy="172" r="2" fill={STROKE} stroke="none" />
      <path d="M 268 162 Q 274 158 280 162" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 284 162 Q 290 158 296 162" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 282 178 L 280 188 Q 282 192 286 190 L 286 180" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 272 196 Q 282 200 292 196" fill="none" stroke={STROKE} strokeWidth="1.6" />

      {/* large stretched earrings (Maasai tradition) */}
      <ellipse cx="254" cy="186" rx="6" ry="10" {...reg(fills, onRegion, 'earring-l')} />
      <ellipse cx="310" cy="186" rx="6" ry="10" {...reg(fills, onRegion, 'earring-r')} />
      {/* earring beads */}
      <circle cx="254" cy="194" r="2" fill={STROKE} stroke="none" />
      <circle cx="310" cy="194" r="2" fill={STROKE} stroke="none" />

      {/* small bird flying */}
      <g style={alive ? { animation: 'gentle-bob 2.6s ease-in-out infinite' } : null}>
        <path d="M 120 180 Q 130 172 140 180 Q 150 172 160 180" fill="none" stroke={STROKE} strokeWidth="2" />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>MAASAI WARRIOR · EAST AFRICA</text>
    </svg>
  );
}

// ----- 45. GREAT ZIMBABWE — c. 11–15th century -----
function GreatZimbabweSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '110px 100px' } : null}>
        <circle cx="110" cy="100" r="34" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds */}
      <path d="M 380 80 Q 380 60 402 60 Q 408 46 428 46 Q 448 46 452 60 Q 472 60 472 80 Z" {...reg(fills, onRegion, 'cloud')} />

      {/* distant kopjes (granite hills) */}
      <path d="M 20 320 Q 80 260 140 300 Q 220 250 300 290 Q 380 250 460 290 Q 520 270 580 320 L 580 360 L 20 360 Z" {...reg(fills, onRegion, 'hills')} />
      {/* boulders on top of one kopje */}
      <ellipse cx="260" cy="280" rx="12" ry="9" {...reg(fills, onRegion, 'boulder-1')} />
      <ellipse cx="270" cy="272" rx="9" ry="7" {...reg(fills, onRegion, 'boulder-2')} />

      {/* mid-ground grass */}
      <path d="M 20 360 L 580 360 L 580 460 L 20 460 Z" {...reg(fills, onRegion, 'grass-mid')} />
      {/* grass tufts */}
      {[60,160,240,360,460,540].map((x,i) => (
        <path key={`gt-${i}`} d={`M ${x} 412 L ${x+4} 400 L ${x+8} 412 L ${x+12} 400 L ${x+16} 412`} fill="none" stroke={STROKE} strokeWidth="1.4" />
      ))}

      {/* baobab tree (left) */}
      <path d="M 80 460 Q 88 380 76 320 Q 96 380 108 460 Z" {...reg(fills, onRegion, 'baobab-trunk')} />
      {/* gnarled branches */}
      <g fill="none" stroke={STROKE} strokeWidth="2.4">
        <path d="M 86 322 Q 70 296 56 290 M 86 322 Q 100 296 116 296 M 92 318 Q 92 290 84 274 M 92 318 Q 110 286 124 280" />
      </g>
      {/* sparse leaves */}
      <ellipse cx="58" cy="290" rx="10" ry="6" {...reg(fills, onRegion, 'baobab-leaf-l')} />
      <ellipse cx="118" cy="294" rx="10" ry="6" {...reg(fills, onRegion, 'baobab-leaf-r')} />
      <ellipse cx="84" cy="270" rx="9" ry="6" {...reg(fills, onRegion, 'baobab-leaf-t')} />

      {/* ---- The Great Enclosure — large curving stone wall ---- */}
      {/* outer wall sweeping curve (front face) */}
      <path d="M 100 460 Q 100 360 240 332 L 420 332 Q 540 360 540 460 L 540 480 L 100 480 Z" {...reg(fills, onRegion, 'wall-main')} />
      {/* wall top edge highlight */}
      <line x1="100" y1="460" x2="100" y2="380" stroke={STROKE} strokeWidth="1.2" />
      <line x1="540" y1="460" x2="540" y2="380" stroke={STROKE} strokeWidth="1.2" />
      {/* stone block lines on wall */}
      {[346,360,374,388,402,416,430,444,458].map((y,i) => (
        <line key={`sb-${i}`} x1="106" y1={y} x2="534" y2={y} stroke={STROKE} strokeWidth="1" />
      ))}
      {/* staggered vertical seams */}
      {[140,200,260,320,380,440,500].map((x,i) => (
        <g key={`vs-${i}`}>
          <line x1={x} y1="346" x2={x} y2="360" stroke={STROKE} strokeWidth="1" />
          <line x1={x+14} y1="360" x2={x+14} y2="374" stroke={STROKE} strokeWidth="1" />
          <line x1={x} y1="374" x2={x} y2="388" stroke={STROKE} strokeWidth="1" />
          <line x1={x+14} y1="388" x2={x+14} y2="402" stroke={STROKE} strokeWidth="1" />
          <line x1={x} y1="402" x2={x} y2="416" stroke={STROKE} strokeWidth="1" />
          <line x1={x+14} y1="416" x2={x+14} y2="430" stroke={STROKE} strokeWidth="1" />
          <line x1={x} y1="430" x2={x} y2="444" stroke={STROKE} strokeWidth="1" />
        </g>
      ))}

      {/* chevron decorative band at top of wall (signature Great Zimbabwe pattern) */}
      <rect x="100" y="332" width="440" height="14" {...reg(fills, onRegion, 'chevron-band')} />
      {/* chevron triangles */}
      {Array.from({length: 22}).map((_, i) => (
        <path key={`cv-${i}`} d={`M ${104 + i*20} 346 L ${114 + i*20} 332 L ${124 + i*20} 346 Z`} fill={STROKE} stroke="none" />
      ))}

      {/* entrance / narrow doorway in wall */}
      <path d="M 286 480 L 314 480 L 314 410 Q 300 396 286 410 Z" {...reg(fills, onRegion, 'doorway')} />

      {/* ---- Conical Tower — iconic feature inside enclosure ---- */}
      <path d="M 358 340 L 392 340 L 408 268 L 342 268 Z" {...reg(fills, onRegion, 'tower')} />
      {/* tower top cap */}
      <ellipse cx="375" cy="268" rx="33" ry="6" {...reg(fills, onRegion, 'tower-cap')} />
      {/* tower stone-block lines */}
      {[286,300,314,328].map((y,i) => (
        <line key={`tb-${i}`} x1="344" y1={y} x2="406" y2={y} stroke={STROKE} strokeWidth="1" />
      ))}
      <line x1="375" y1="268" x2="375" y2="338" stroke={STROKE} strokeWidth="1" />

      {/* foreground ground */}
      <path d="M 20 480 L 580 480 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'ground')} />

      {/* Zimbabwe Bird sculpture on a pillar — right foreground */}
      <rect x="500" y="500" width="14" height="60" {...reg(fills, onRegion, 'bird-pillar')} />
      <g style={alive ? { animation: 'gentle-bob 2.6s ease-in-out infinite' } : null}>
        {/* bird body */}
        <ellipse cx="507" cy="492" rx="14" ry="10" {...reg(fills, onRegion, 'bird-body')} />
        {/* head */}
        <circle cx="518" cy="484" r="6" {...reg(fills, onRegion, 'bird-head')} />
        <path d="M 522 482 L 530 484 L 522 488 Z" fill={STROKE} stroke="none" />
        <circle cx="520" cy="482" r="1.2" fill={STROKE} stroke="none" />
        {/* wing */}
        <path d="M 498 488 Q 488 480 494 502 Q 504 502 510 494 Z" {...reg(fills, onRegion, 'bird-wing')} />
        {/* tail */}
        <path d="M 494 494 L 480 500 L 494 502 Z" {...reg(fills, onRegion, 'bird-tail')} />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>GREAT ZIMBABWE · c. 1200</text>
    </svg>
  );
}

// ----- 46. NELSON MANDELA — Modern South Africa -----
function MandelaSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* background */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'background')} />

      {/* radiating sun halo behind portrait */}
      <g style={alive ? { animation: 'spin-slow 28s linear infinite', transformOrigin: '300px 230px' } : null}>
        {Array.from({length:20}).map((_,i)=>{
          const a = i * Math.PI * 2 / 20;
          const x1 = 300 + Math.cos(a)*140, y1 = 230 + Math.sin(a)*140;
          const x2 = 300 + Math.cos(a)*180, y2 = 230 + Math.sin(a)*180;
          return <line key={`mr-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={STROKE} strokeWidth="2" />;
        })}
      </g>
      <circle cx="300" cy="230" r="140" {...reg(fills, onRegion, 'halo')} />

      {/* South African flag colors as vertical stripe behind */}
      <rect x="40" y="440" width="520" height="14" {...reg(fills, onRegion, 'flag-band-1')} />
      <rect x="40" y="454" width="520" height="14" {...reg(fills, onRegion, 'flag-band-2')} />
      <rect x="40" y="468" width="520" height="14" {...reg(fills, onRegion, 'flag-band-3')} />
      <rect x="40" y="482" width="520" height="14" {...reg(fills, onRegion, 'flag-band-4')} />
      {/* "Y" shape of SA flag — non-colorable separator */}
      <path d="M 40 440 L 200 460 L 200 482 L 40 502 M 560 440 L 400 460 L 400 482 L 560 502 M 200 460 L 560 460 M 200 482 L 560 482" fill="none" stroke={STROKE} strokeWidth="2" />

      {/* ---- Mandela — head & shoulders portrait ---- */}
      {/* shoulders / madiba shirt body */}
      <path d="M 154 510 Q 154 396 280 380 L 320 380 Q 446 396 446 510 L 154 510 Z" {...reg(fills, onRegion, 'shirt-base')} />
      {/* shirt pattern — repeated diamond motif */}
      <g fill="none" stroke={STROKE} strokeWidth="1.6">
        {[200,260,320,380].map((x,i) => (
          <g key={`pat-${i}`}>
            <path d={`M ${x} 420 L ${x+12} 432 L ${x} 444 L ${x-12} 432 Z`} />
            <circle cx={x} cy="432" r="3" fill={STROKE} stroke="none" />
          </g>
        ))}
        {[170,230,290,350,410].map((x,i) => (
          <g key={`pat2-${i}`}>
            <path d={`M ${x} 470 L ${x+10} 480 L ${x} 490 L ${x-10} 480 Z`} />
          </g>
        ))}
      </g>
      {/* shirt collar (open) */}
      <path d="M 256 386 L 300 416 L 344 386 L 320 386 L 300 402 L 280 386 Z" {...reg(fills, onRegion, 'collar')} />

      {/* neck */}
      <path d="M 274 348 L 326 348 L 328 388 L 272 388 Z" {...reg(fills, onRegion, 'neck')} />

      {/* face — slightly rounded */}
      <ellipse cx="300" cy="280" rx="74" ry="80" {...reg(fills, onRegion, 'face')} />

      {/* hair — short, gray, swept back */}
      <path d="M 230 246 Q 230 198 300 192 Q 370 198 370 246 Q 354 218 326 220 Q 300 218 274 220 Q 246 218 230 246 Z" {...reg(fills, onRegion, 'hair')} />
      {/* hair sides — peppered gray streaks */}
      <line x1="240" y1="246" x2="246" y2="280" stroke={STROKE} strokeWidth="1.4" />
      <line x1="254" y1="234" x2="258" y2="262" stroke={STROKE} strokeWidth="1.4" />
      <line x1="346" y1="234" x2="342" y2="262" stroke={STROKE} strokeWidth="1.4" />
      <line x1="360" y1="246" x2="354" y2="280" stroke={STROKE} strokeWidth="1.4" />

      {/* ears */}
      <ellipse cx="232" cy="280" rx="6" ry="12" {...reg(fills, onRegion, 'ear-l')} />
      <ellipse cx="368" cy="280" rx="6" ry="12" {...reg(fills, onRegion, 'ear-r')} />
      <path d="M 231 278 Q 234 282 234 290" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 369 278 Q 366 282 366 290" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* eyebrows — gray, slightly raised in friendly expression */}
      <path d="M 256 252 Q 274 244 290 252" fill="none" stroke={STROKE} strokeWidth="2.4" />
      <path d="M 310 252 Q 326 244 344 252" fill="none" stroke={STROKE} strokeWidth="2.4" />
      {/* eyes — warm, smiling */}
      <path d="M 258 274 Q 274 268 290 274 Q 274 282 258 274 Z" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.8" />
      <path d="M 310 274 Q 326 268 342 274 Q 326 282 310 274 Z" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.8" />
      <circle cx="274" cy="276" r="2.6" fill={STROKE} stroke="none" />
      <circle cx="326" cy="276" r="2.6" fill={STROKE} stroke="none" />
      {/* crow's feet (laugh lines) */}
      <path d="M 250 278 L 244 274" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <path d="M 252 282 L 246 282" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <path d="M 350 278 L 356 274" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <path d="M 348 282 L 354 282" fill="none" stroke={STROKE} strokeWidth="1.2" />

      {/* nose */}
      <path d="M 300 286 L 292 318 Q 300 326 308 318 Z" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <circle cx="294" cy="320" r="1.4" fill={STROKE} stroke="none" />
      <circle cx="306" cy="320" r="1.4" fill={STROKE} stroke="none" />

      {/* mouth — broad smile */}
      <path d="M 264 340 Q 300 360 336 340" fill="none" stroke={STROKE} strokeWidth="2.4" />
      <path d="M 270 342 Q 300 354 330 342 L 320 350 Q 300 354 280 350 Z" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.6" />
      {/* tooth line */}
      <line x1="280" y1="346" x2="320" y2="346" stroke={STROKE} strokeWidth="1.4" />
      <line x1="290" y1="343" x2="290" y2="350" stroke={STROKE} strokeWidth="1" />
      <line x1="300" y1="343" x2="300" y2="350" stroke={STROKE} strokeWidth="1" />
      <line x1="310" y1="343" x2="310" y2="350" stroke={STROKE} strokeWidth="1" />

      {/* chin laugh line */}
      <path d="M 294 360 Q 300 366 306 360" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* small dove of peace floating off to the side */}
      <g style={alive ? { animation: 'gentle-bob 2.6s ease-in-out infinite' } : null}>
        <ellipse cx="120" cy="160" rx="16" ry="7" {...reg(fills, onRegion, 'dove')} />
        <circle cx="132" cy="156" r="5" {...reg(fills, onRegion, 'dove-head')} />
        <path d="M 134 154 L 142 156 L 134 160 Z" fill={STROKE} stroke="none" />
        <path d="M 108 158 Q 116 152 124 158" fill="none" stroke={STROKE} strokeWidth="1.6" />
      </g>
      {/* dove olive branch */}
      <line x1="120" y1="164" x2="108" y2="174" stroke={STROKE} strokeWidth="1.4" />
      <ellipse cx="106" cy="174" rx="3" ry="1.6" fill={STROKE} stroke="none" />

      {/* banner */}
      <rect x="150" y="540" width="300" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>NELSON MANDELA · MADIBA</text>
    </svg>
  );
}

// ============================================================
// Page entries
// ============================================================
const AFRICA_PAGES = [
  {
    id: 'mansa-musa',
    title: 'Mansa Musa',
    subtitle: 'Emperor of Mali, c. 1324',
    collection: 'world',
    eraLabel: 'Mali Empire',
    eraColor: '#D4A02A',
    bgPreview: '#F4DCA0',
    fact: "Mansa Musa was so wealthy that on his pilgrimage to Mecca he gave away so much gold that prices crashed across Egypt for over a decade. Historians believe he may have been the richest person who ever lived.",
    Component: MansaMusaSVG,
    readingLevel: { lexile: 860, gradeBand: '4–5', guidedReading: 'P', wordCount: 36, complexity: 'Challenging' },
    keyVocab: ['emperor', 'pilgrimage', 'caravan', 'wealth', 'trade'],
    standards: ['RI.4.4', 'RI.4.7', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','desert','mud-tower-l','mud-tower-l-top','mud-tower-r','mud-tower-r-top','throne-base','throne-back','finial-l','finial-r','throne-step-1','throne-step-2','coin-0','coin-1','coin-2','coin-3','coin-4','coin-5','coin-6','robe-lap','foot-l','foot-r','boubou','embroidery','pendant','arm-r','hand-r','gold-nugget','arm-l','hand-l','scepter-orb','neck','face','beard','crown-band','crown-cap','crown-gem','banner'],
    quest: {
      heading: 'King of Gold',
      author: 'Mali Empire · 1324',
      lines: [
        'I am Mansa Musa, ruler of the great empire of {0}.',
        'My kingdom was the richest in the world for its {1}.',
        'I made a long journey across the desert to the holy city of {2}.',
      ],
      blanks: [
        { answer: 'Mali',  choices: ['Mali',  'Mango',  'Mailbox', 'Maple']   },
        { answer: 'gold',  choices: ['gold',  'goats',  'gumdrops','gloves']  },
        { answer: 'Mecca', choices: ['Mecca', 'Melon',  'Mushroom','Marshmallow'] },
      ],
      voice: {
        // Stately, generous narrator
        hints: [/daniel/i, /alex/i, /tom/i, /bruce/i, /microsoft (mark|guy)/i],
        rate: 0.76, pitch: 0.84,
      },
    },
  },
  {
    id: 'maasai',
    title: 'The Maasai Warrior',
    subtitle: 'Plains of East Africa',
    collection: 'world',
    eraLabel: 'East Africa',
    eraColor: '#C8102E',
    bgPreview: '#F4C9A4',
    fact: "Maasai warriors are famous for their bright red robes called shuka, their towering height, and their adumu \u2014 a jumping dance where they leap as high as they can without bending their knees.",
    Component: MaasaiSVG,
    readingLevel: { lexile: 780, gradeBand: '3–4', guidedReading: 'O', wordCount: 30, complexity: 'Moderate' },
    keyVocab: ['warrior', 'shuka', 'plains', 'cattle', 'acacia'],
    standards: ['RI.3.7', 'RI.4.4', 'L.4.4', 'SL.3.2'],
    regions: ['sky','sun','kilimanjaro','snow-cap','savanna','acacia-trunk','acacia-canopy','acacia-trunk-far','acacia-canopy-far','leg-l','leg-r','sandal-l','sandal-r','anklet-l','anklet-r','shuka','shuka-shoulder','arm-r','hand-r','arm-l','hand-l','spear-tip','spear-butt','shield','shield-stripe','collar','neck','head','hair','earring-l','earring-r','banner'],
    quest: {
      heading: 'Warrior of the Plains',
      author: 'Maasai Tradition',
      lines: [
        'I am a Maasai warrior from the wide East African {0}.',
        'I wear a bright red cloth called a {1}.',
        'I look out for my family\u2019s gentle {2}.',
      ],
      blanks: [
        { answer: 'plains', choices: ['plains', 'planets','plums',  'pillows'] },
        { answer: 'shuka',  choices: ['shuka',  'shoe',   'shovel', 'shrimp']  },
        { answer: 'cattle', choices: ['cattle', 'candy',  'cactus', 'cannon']  },
      ],
      voice: {
        // Strong, proud narrator
        hints: [/daniel/i, /alex/i, /tom/i, /reed/i, /microsoft (mark|guy)/i],
        rate: 0.78, pitch: 0.86,
      },
    },
  },
  {
    id: 'great-zimbabwe',
    title: 'Great Zimbabwe',
    subtitle: 'Stone city of Southern Africa',
    collection: 'world',
    eraLabel: 'Great Zimbabwe',
    eraColor: '#7C5A3A',
    bgPreview: '#DCC8A4',
    fact: "Great Zimbabwe was a thriving stone city built between the 11th and 15th centuries. Its huge curving walls were stacked without any mortar, and its tall conical tower has stood for nearly a thousand years.",
    Component: GreatZimbabweSVG,
    readingLevel: { lexile: 800, gradeBand: '4–5', guidedReading: 'O', wordCount: 32, complexity: 'Challenging' },
    keyVocab: ['enclosure', 'mortar', 'masonry', 'kingdom', 'kopje'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','cloud','hills','boulder-1','boulder-2','grass-mid','baobab-trunk','baobab-leaf-l','baobab-leaf-r','baobab-leaf-t','wall-main','chevron-band','doorway','tower','tower-cap','ground','bird-pillar','bird-body','bird-head','bird-wing','bird-tail','banner'],
    quest: {
      heading: 'City of Stone',
      author: 'Shona Kingdom · c. 1200',
      lines: [
        'I am a great stone city in {0} Africa.',
        'My walls were built without any {1}.',
        'My iconic feature is a tall {2} tower.',
      ],
      blanks: [
        { answer: 'Southern', choices: ['Southern', 'Sugary',  'Sleepy',  'Speedy']    },
        { answer: 'mortar',   choices: ['mortar',   'mustard', 'mittens', 'mailbox']   },
        { answer: 'conical',  choices: ['conical',  'crunchy', 'cuddly',  'cardboard'] },
      ],
      voice: {
        // Calm, contemplative narrator
        hints: [/daniel/i, /alex/i, /tom/i, /samantha/i, /microsoft (mark|guy|aria)/i],
        rate: 0.78, pitch: 0.86,
      },
    },
  },
  {
    id: 'mandela',
    title: 'Nelson Mandela',
    subtitle: 'Madiba — Father of the Nation',
    collection: 'world',
    eraLabel: 'South African Freedom',
    eraColor: '#2E7D5F',
    bgPreview: '#E0EDDD',
    fact: "Nelson Mandela spent 27 years in prison for fighting against apartheid. When he was finally freed, he forgave his captors and was elected the first Black president of South Africa.",
    Component: MandelaSVG,
    readingLevel: { lexile: 880, gradeBand: '4–5', guidedReading: 'P', wordCount: 30, complexity: 'Challenging' },
    keyVocab: ['apartheid', 'freedom', 'forgive', 'president', 'reconciliation'],
    standards: ['RI.4.4', 'RI.4.1', 'L.4.4', 'SL.4.2'],
    regions: ['background','halo','flag-band-1','flag-band-2','flag-band-3','flag-band-4','shirt-base','collar','neck','face','hair','ear-l','ear-r','dove','dove-head','banner'],
    quest: {
      heading: 'Madiba',
      author: 'Nelson Mandela · 1918–2013',
      lines: [
        'I spent 27 years in {0} for fighting unfair laws.',
        'When I was freed, I chose to {1} my enemies.',
        'I became the first Black president of {2} Africa.',
      ],
      blanks: [
        { answer: 'prison',   choices: ['prison',   'pillow',   'puddle',   'pancake']    },
        { answer: 'forgive',  choices: ['forgive',  'fluff',    'follow',   'forget']     },
        { answer: 'South',    choices: ['South',    'Salty',    'Sour',     'Sunny']      },
      ],
      voice: {
        // Warm, deep, kind
        hints: [/daniel/i, /alex/i, /tom/i, /reed/i, /microsoft (mark|guy|davis)/i],
        rate: 0.76, pitch: 0.84,
      },
    },
  },
];

if (window.PAGES_DATA && Array.isArray(window.PAGES_DATA)) {
  AFRICA_PAGES.forEach(p => window.PAGES_DATA.push(p));
}

Object.assign(window, { MansaMusaSVG, MaasaiSVG, GreatZimbabweSVG, MandelaSVG });
