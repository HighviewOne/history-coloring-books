// =================================================================
// Round 14 additions — 4 more pages filling major gaps:
//   • Buddha under the Bodhi Tree (Ancient India)
//   • St. Basil's Cathedral (Moscow, 1561)
//   • The Steam Locomotive (Industrial Revolution, 1830)
//   • Uluru (Aboriginal Australia)
// =================================================================

// ----- 55. BUDDHA UNDER THE BODHI TREE — c. 500 BC -----
function BuddhaSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* background — warm sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />

      {/* Halo / mandorla behind Buddha */}
      <g style={alive ? { animation: 'spin-slow 30s linear infinite', transformOrigin: '300px 240px' } : null}>
        {Array.from({length:18}).map((_,i)=>{
          const a = i * Math.PI * 2 / 18;
          return <line key={`br-${i}`} x1={300 + Math.cos(a)*140} y1={240 + Math.sin(a)*140} x2={300 + Math.cos(a)*176} y2={240 + Math.sin(a)*176} stroke={STROKE} strokeWidth="2" />;
        })}
      </g>
      <circle cx="300" cy="240" r="138" {...reg(fills, onRegion, 'halo')} />

      {/* Distant stupa */}
      <path d="M 90 380 Q 90 350 110 350 Q 130 350 130 380 Z" {...reg(fills, onRegion, 'stupa-dome')} />
      <rect x="100" y="380" width="20" height="20" {...reg(fills, onRegion, 'stupa-base')} />
      <line x1="110" y1="350" x2="110" y2="338" stroke={STROKE} strokeWidth="2" />
      <path d="M 106 338 L 114 338 L 110 326 Z" fill={STROKE} stroke="none" />

      {/* ground / floor */}
      <path d="M 20 460 L 580 460 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'ground')} />
      <line x1="20" y1="490" x2="580" y2="490" stroke={STROKE} strokeWidth="1.2" />

      {/* ---- BODHI TREE — wide, with heart-shaped leaves ---- */}
      {/* trunk */}
      <path d="M 290 460 Q 286 360 274 280 Q 300 360 306 460 Z" {...reg(fills, onRegion, 'bodhi-trunk')} />
      {/* branches — non-colorable */}
      <g fill="none" stroke={STROKE} strokeWidth="2.4">
        <path d="M 280 280 Q 240 240 200 220" />
        <path d="M 280 280 Q 320 240 360 220" />
        <path d="M 286 240 Q 240 200 200 184" />
        <path d="M 286 240 Q 340 200 380 184" />
      </g>

      {/* canopy of leaves — heart-shape leaves */}
      <g style={alive ? { animation: 'wave-flag 5s ease-in-out infinite', transformOrigin: '300px 200px' } : null}>
        {/* left cluster */}
        <path d="M 140 200 Q 130 168 160 150 Q 190 168 180 200 Z" {...reg(fills, onRegion, 'leaf-cluster-l')} />
        {/* center cluster */}
        <path d="M 220 130 Q 220 90 300 80 Q 380 90 380 130 Q 360 100 300 100 Q 240 100 220 130 Z" {...reg(fills, onRegion, 'leaf-cluster-c')} />
        {/* right cluster */}
        <path d="M 420 200 Q 410 168 440 150 Q 470 168 460 200 Z" {...reg(fills, onRegion, 'leaf-cluster-r')} />
        {/* lower left cluster */}
        <path d="M 180 220 Q 170 196 200 184 Q 230 196 220 220 Z" {...reg(fills, onRegion, 'leaf-cluster-ll')} />
        <path d="M 380 220 Q 370 196 400 184 Q 430 196 420 220 Z" {...reg(fills, onRegion, 'leaf-cluster-rr')} />
        {/* individual heart-leaves drawn over clusters */}
        {[[170,170],[210,150],[270,116],[330,116],[390,150],[430,170],[160,200],[440,200]].map((p,i)=>(
          <path key={`hl-${i}`} d={`M ${p[0]} ${p[1]} Q ${p[0]-8} ${p[1]-10} ${p[0]-4} ${p[1]-16} Q ${p[0]} ${p[1]-12} ${p[0]+4} ${p[1]-16} Q ${p[0]+8} ${p[1]-10} ${p[0]} ${p[1]} Z`} fill="none" stroke={STROKE} strokeWidth="1.4" />
        ))}
      </g>

      {/* ---- LOTUS THRONE / cushion ---- */}
      <ellipse cx="300" cy="470" rx="140" ry="16" {...reg(fills, onRegion, 'lotus-base')} />
      {/* lotus petals (back, sticking up) */}
      <path d="M 200 462 Q 210 432 232 432 Q 246 442 240 470 Z" {...reg(fills, onRegion, 'lotus-petal-l1')} />
      <path d="M 244 460 Q 252 426 280 426 Q 296 436 290 466 Z" {...reg(fills, onRegion, 'lotus-petal-l2')} />
      <path d="M 290 460 Q 296 424 326 424 Q 350 426 350 460 Z" {...reg(fills, onRegion, 'lotus-petal-c')} />
      <path d="M 348 460 Q 356 426 384 426 Q 400 436 392 470 Z" {...reg(fills, onRegion, 'lotus-petal-r2')} />
      <path d="M 392 462 Q 400 432 422 432 Q 436 442 432 470 Z" {...reg(fills, onRegion, 'lotus-petal-r1')} />

      {/* ---- BUDDHA — meditating in lotus pose ---- */}
      {/* crossed legs */}
      <path d="M 224 410 Q 200 446 220 458 L 380 458 Q 400 446 376 410 Q 356 396 320 396 L 280 396 Q 244 396 224 410 Z" {...reg(fills, onRegion, 'legs')} />
      {/* visible feet (soles up in lotus pose) */}
      <ellipse cx="250" cy="416" rx="14" ry="6" {...reg(fills, onRegion, 'foot-l')} />
      <ellipse cx="350" cy="416" rx="14" ry="6" {...reg(fills, onRegion, 'foot-r')} />
      {/* tiny dharma wheel on each sole — non-colorable */}
      <circle cx="250" cy="416" r="3" fill="none" stroke={STROKE} strokeWidth="1" />
      <circle cx="350" cy="416" r="3" fill="none" stroke={STROKE} strokeWidth="1" />

      {/* lap robe drape */}
      <path d="M 232 400 Q 232 380 268 372 L 332 372 Q 368 380 368 400 L 376 410 L 224 410 Z" {...reg(fills, onRegion, 'lap-robe')} />

      {/* torso — saffron robe */}
      <path d="M 240 290 Q 240 240 300 232 Q 360 240 360 290 L 368 376 L 232 376 Z" {...reg(fills, onRegion, 'robe')} />
      {/* robe drape over left shoulder (one shoulder bare, classic Buddha pose) */}
      <path d="M 240 248 Q 254 260 270 256 L 268 296 L 244 296 Z" {...reg(fills, onRegion, 'robe-drape')} />

      {/* arms */}
      <path d="M 248 286 Q 224 320 232 380 L 256 384 Q 256 332 268 308 Z" {...reg(fills, onRegion, 'arm-l')} />
      <path d="M 352 286 Q 376 320 368 380 L 344 384 Q 344 332 332 308 Z" {...reg(fills, onRegion, 'arm-r')} />

      {/* hands resting in lap — dhyana mudra (one over other) */}
      <ellipse cx="300" cy="384" rx="28" ry="10" {...reg(fills, onRegion, 'hands')} />
      <line x1="278" y1="384" x2="322" y2="384" stroke={STROKE} strokeWidth="1.4" />

      {/* neck */}
      <path d="M 288 208 L 312 208 L 314 234 L 286 234 Z" {...reg(fills, onRegion, 'neck')} />
      {/* neck lines (three wisdom lines — laksana) */}
      <path d="M 290 218 Q 300 222 310 218" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <path d="M 290 224 Q 300 228 310 224" fill="none" stroke={STROKE} strokeWidth="1.2" />

      {/* head */}
      <ellipse cx="300" cy="180" rx="36" ry="40" {...reg(fills, onRegion, 'head')} />

      {/* ushnisha (topknot/cranial bump — sign of wisdom) */}
      <path d="M 282 152 Q 282 124 300 122 Q 318 124 318 152 Z" {...reg(fills, onRegion, 'ushnisha')} />
      <circle cx="300" cy="118" r="4" {...reg(fills, onRegion, 'flame-jewel')} />

      {/* hair — small curls (snail-shell curls) */}
      <g fill="none" stroke={STROKE} strokeWidth="1.4">
        <circle cx="276" cy="158" r="3" />
        <circle cx="288" cy="150" r="3" />
        <circle cx="300" cy="146" r="3" />
        <circle cx="312" cy="150" r="3" />
        <circle cx="324" cy="158" r="3" />
        <circle cx="268" cy="172" r="3" />
        <circle cx="332" cy="172" r="3" />
      </g>

      {/* long earlobes (sign of wisdom — Buddha left wealth behind) */}
      <path d="M 264 178 Q 256 196 262 214 Q 268 210 266 196 Z" {...reg(fills, onRegion, 'ear-l')} />
      <path d="M 336 178 Q 344 196 338 214 Q 332 210 334 196 Z" {...reg(fills, onRegion, 'ear-r')} />

      {/* face features — eyes downcast, peaceful */}
      <path d="M 282 184 Q 290 188 298 184" fill="none" stroke={STROKE} strokeWidth="1.8" />
      <path d="M 302 184 Q 310 188 318 184" fill="none" stroke={STROKE} strokeWidth="1.8" />
      {/* small dot under each eye */}
      <circle cx="290" cy="186" r="1.4" fill={STROKE} stroke="none" />
      <circle cx="310" cy="186" r="1.4" fill={STROKE} stroke="none" />
      {/* eyebrows — gentle arch */}
      <path d="M 280 172 Q 290 168 298 172" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 302 172 Q 310 168 320 172" fill="none" stroke={STROKE} strokeWidth="1.4" />
      {/* urna — third-eye dot on forehead */}
      <circle cx="300" cy="166" r="3" {...reg(fills, onRegion, 'urna')} />
      {/* nose */}
      <path d="M 300 188 L 296 200 Q 300 204 304 200 Z" fill="none" stroke={STROKE} strokeWidth="1.4" />
      {/* mouth — subtle smile */}
      <path d="M 290 210 Q 300 214 310 210" fill="none" stroke={STROKE} strokeWidth="1.6" />

      {/* lotus floating on each side */}
      <g>
        <path d="M 90 530 Q 84 522 88 514 Q 94 520 94 530 Z" {...reg(fills, onRegion, 'floating-lotus-l')} />
        <path d="M 90 530 Q 96 522 92 514 Q 86 520 86 530 Z" {...reg(fills, onRegion, 'floating-lotus-l2')} />
        <line x1="90" y1="530" x2="90" y2="544" stroke={STROKE} strokeWidth="1.4" />
      </g>
      <g>
        <path d="M 510 530 Q 504 522 508 514 Q 514 520 514 530 Z" {...reg(fills, onRegion, 'floating-lotus-r')} />
        <path d="M 510 530 Q 516 522 512 514 Q 506 520 506 530 Z" {...reg(fills, onRegion, 'floating-lotus-r2')} />
        <line x1="510" y1="530" x2="510" y2="544" stroke={STROKE} strokeWidth="1.4" />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>THE BUDDHA · c. 500 BC</text>
    </svg>
  );
}

// ----- 56. ST. BASIL'S CATHEDRAL — Moscow, 1561 -----
function StBasilsSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.6s ease-in-out infinite', transformOrigin: '110px 100px' } : null}>
        <circle cx="110" cy="100" r="32" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds */}
      <path d="M 380 80 Q 380 60 402 60 Q 408 46 428 56 Q 448 46 452 60 Q 472 60 472 80 Z" {...reg(fills, onRegion, 'cloud')} />

      {/* distant Kremlin wall silhouette */}
      <rect x="20" y="380" width="560" height="50" {...reg(fills, onRegion, 'kremlin-wall')} />
      {/* swallowtail merlons */}
      {Array.from({length:14}).map((_,i)=>{
        const x = 30 + i*40;
        return <path key={`mw-${i}`} d={`M ${x} 380 L ${x+10} 370 L ${x+20} 380 Z`} fill={STROKE} stroke="none" />;
      })}

      {/* Red Square (paved ground) */}
      <path d="M 20 460 L 580 460 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'square')} />
      {/* paving line pattern */}
      <line x1="20" y1="500" x2="580" y2="500" stroke={STROKE} strokeWidth="1.2" />
      <line x1="20" y1="540" x2="580" y2="540" stroke={STROKE} strokeWidth="1.2" />
      {[100,200,300,400,500].map((x,i) => (
        <line key={`pv-${i}`} x1={x} y1="460" x2={x} y2="580" stroke={STROKE} strokeWidth="1" />
      ))}

      {/* ---- ST. BASIL'S CATHEDRAL ---- */}
      {/* main building base */}
      <rect x="180" y="380" width="240" height="80" {...reg(fills, onRegion, 'base-main')} />
      {/* main archway */}
      <path d="M 286 460 L 314 460 L 314 410 Q 300 396 286 410 Z" {...reg(fills, onRegion, 'main-arch')} />

      {/* corner tower bases (4) */}
      <rect x="120" y="384" width="56" height="76" {...reg(fills, onRegion, 'tower-base-ll')} />
      <rect x="424" y="384" width="56" height="76" {...reg(fills, onRegion, 'tower-base-rr')} />
      <rect x="200" y="380" width="48" height="80" {...reg(fills, onRegion, 'tower-base-l')} />
      <rect x="352" y="380" width="48" height="80" {...reg(fills, onRegion, 'tower-base-r')} />

      {/* tower spires (octagonal columns going up) */}
      <rect x="128" y="290" width="40" height="94" {...reg(fills, onRegion, 'spire-ll-shaft')} />
      <rect x="432" y="290" width="40" height="94" {...reg(fills, onRegion, 'spire-rr-shaft')} />
      <rect x="206" y="260" width="36" height="120" {...reg(fills, onRegion, 'spire-l-shaft')} />
      <rect x="358" y="260" width="36" height="120" {...reg(fills, onRegion, 'spire-r-shaft')} />

      {/* CENTER tall tent-roof spire */}
      <rect x="276" y="230" width="48" height="150" {...reg(fills, onRegion, 'spire-c-shaft')} />
      <path d="M 270 230 L 330 230 L 300 130 Z" {...reg(fills, onRegion, 'spire-c-tent')} />

      {/* arched windows on each tower */}
      {[148, 224, 376, 452].map((x,i) => (
        <path key={`tw-${i}`} d={`M ${x-7} 360 L ${x+7} 360 L ${x+7} 332 Q ${x} 324 ${x-7} 332 Z`} fill="none" stroke={STROKE} strokeWidth="1.6" />
      ))}
      <path d="M 290 360 L 310 360 L 310 320 Q 300 310 290 320 Z" fill="none" stroke={STROKE} strokeWidth="1.6" />

      {/* spire decorative bands */}
      {[148, 224, 376, 452].map((x,i) => (
        <g key={`sd-${i}`}>
          <line x1={x-20} y1="320" x2={x+20} y2="320" stroke={STROKE} strokeWidth="1.4" />
          <line x1={x-22} y1="304" x2={x+22} y2="304" stroke={STROKE} strokeWidth="1.4" />
          <line x1={x-20} y1="290" x2={x+20} y2="290" stroke={STROKE} strokeWidth="1.4" />
        </g>
      ))}

      {/* ---- ONION DOMES (5) ---- */}
      {/* far-left dome */}
      <path d="M 128 290 Q 116 244 148 222 Q 180 244 168 290 Z" {...reg(fills, onRegion, 'dome-ll')} />
      <line x1="132" y1="278" x2="164" y2="278" stroke={STROKE} strokeWidth="1.4" />
      <line x1="148" y1="240" x2="148" y2="290" stroke={STROKE} strokeWidth="1.4" />
      {/* far-right dome */}
      <path d="M 432 290 Q 420 244 452 222 Q 484 244 472 290 Z" {...reg(fills, onRegion, 'dome-rr')} />
      <line x1="436" y1="278" x2="468" y2="278" stroke={STROKE} strokeWidth="1.4" />
      <line x1="452" y1="240" x2="452" y2="290" stroke={STROKE} strokeWidth="1.4" />
      {/* near-left dome */}
      <path d="M 206 260 Q 194 206 224 184 Q 254 206 242 260 Z" {...reg(fills, onRegion, 'dome-l')} />
      {/* spiral pattern */}
      <path d="M 210 244 Q 220 232 230 244 Q 220 256 210 244 Z" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 214 224 Q 224 214 234 224" fill="none" stroke={STROKE} strokeWidth="1.4" />
      {/* near-right dome */}
      <path d="M 358 260 Q 346 206 376 184 Q 406 206 394 260 Z" {...reg(fills, onRegion, 'dome-r')} />
      {/* checkered pattern */}
      <path d="M 366 240 L 376 230 L 386 240 L 376 250 Z" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <line x1="366" y1="220" x2="386" y2="220" stroke={STROKE} strokeWidth="1.4" />
      {/* CENTER dome on top of tent-roof */}
      <path d="M 286 130 Q 274 90 300 76 Q 326 90 314 130 Z" {...reg(fills, onRegion, 'dome-c')} />
      {/* radiating pattern */}
      {[[294,108],[306,108],[300,86]].map((p,i) => (
        <circle key={`dot-${i}`} cx={p[0]} cy={p[1]} r="1.6" fill={STROKE} stroke="none" />
      ))}

      {/* crosses on top of each dome */}
      {[148, 224, 300, 376, 452].map((x,i) => {
        const y = i === 2 ? 76 : (i === 1 || i === 3 ? 184 : 222);
        return (
          <g key={`cr-${i}`} fill="none" stroke={STROKE} strokeWidth="2.4">
            <line x1={x} y1={y} x2={x} y2={y - 20} />
            <line x1={x - 7} y1={y - 12} x2={x + 7} y2={y - 12} />
            {/* Russian Orthodox crossbar slanted */}
            <line x1={x - 5} y1={y - 4} x2={x + 5} y2={y - 8} />
          </g>
        );
      })}

      {/* archway bands on main entrance */}
      <path d="M 282 410 L 318 410" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* lantern at entrance — non-colorable */}
      <ellipse cx="300" cy="396" r="2.4" fill={STROKE} stroke="none" />

      {/* snow on ground */}
      <g fill="#FFFDF5" stroke={STROKE} strokeWidth="1.2">
        <ellipse cx="70" cy="470" rx="40" ry="4" />
        <ellipse cx="530" cy="470" rx="40" ry="4" />
      </g>

      {/* tiny figures in front of cathedral */}
      <g fill={STROKE} stroke="none">
        <ellipse cx="240" cy="510" rx="3" ry="6" />
        <circle cx="240" cy="502" r="2.4" />
        <ellipse cx="360" cy="510" rx="3" ry="6" />
        <circle cx="360" cy="502" r="2.4" />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>ST. BASIL'S · MOSCOW · 1561</text>
    </svg>
  );
}

// ----- 57. THE STEAM LOCOMOTIVE — Industrial Revolution, 1830 -----
function SteamLocomotiveSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.6s ease-in-out infinite', transformOrigin: '500px 110px' } : null}>
        <circle cx="500" cy="110" r="32" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds */}
      <path d="M 60 130 Q 60 110 82 110 Q 88 96 108 96 Q 128 96 132 110 Q 152 110 152 130 Z" {...reg(fills, onRegion, 'cloud')} />

      {/* distant countryside */}
      <path d="M 20 380 Q 100 340 200 370 Q 300 340 400 370 Q 500 340 580 380 L 580 420 L 20 420 Z" {...reg(fills, onRegion, 'hills')} />
      {/* small factory chimneys on hills */}
      <rect x="120" y="350" width="8" height="30" {...reg(fills, onRegion, 'chimney-1')} />
      <rect x="380" y="354" width="8" height="26" {...reg(fills, onRegion, 'chimney-2')} />
      <path d="M 124 350 Q 130 340 122 332" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 384 354 Q 390 344 382 336" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* ground / ballast bed */}
      <path d="M 20 420 L 580 420 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'ground')} />

      {/* train tracks */}
      <rect x="20" y="500" width="560" height="8" {...reg(fills, onRegion, 'rail-1')} />
      <rect x="20" y="530" width="560" height="8" {...reg(fills, onRegion, 'rail-2')} />
      {/* railroad ties */}
      {[40,90,140,190,240,290,340,390,440,490,540].map((x,i) => (
        <rect key={`tie-${i}`} x={x} y="506" width="40" height="26" {...reg(fills, onRegion, `tie-${i}`)} />
      ))}

      {/* ---- BIG STEAM PUFF behind smokestack ---- */}
      <g style={alive ? { animation: 'gentle-bob 3s ease-in-out infinite' } : null}>
        <ellipse cx="170" cy="170" rx="50" ry="32" {...reg(fills, onRegion, 'steam-1')} />
        <ellipse cx="220" cy="140" rx="40" ry="26" {...reg(fills, onRegion, 'steam-2')} />
        <ellipse cx="270" cy="120" rx="34" ry="22" {...reg(fills, onRegion, 'steam-3')} />
        <ellipse cx="310" cy="100" rx="28" ry="18" {...reg(fills, onRegion, 'steam-4')} />
      </g>

      {/* ---- LOCOMOTIVE BODY ---- */}
      {/* cab (back of locomotive, right) */}
      <rect x="360" y="290" width="120" height="170" {...reg(fills, onRegion, 'cab')} />
      {/* cab roof */}
      <path d="M 354 290 L 486 290 L 478 270 L 362 270 Z" {...reg(fills, onRegion, 'cab-roof')} />
      {/* cab window */}
      <rect x="384" y="306" width="40" height="42" {...reg(fills, onRegion, 'cab-window')} />
      <line x1="404" y1="306" x2="404" y2="348" stroke={STROKE} strokeWidth="1.4" />
      <line x1="384" y1="327" x2="424" y2="327" stroke={STROKE} strokeWidth="1.4" />
      {/* cab door (engineer figure visible) */}
      <rect x="434" y="324" width="32" height="60" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* engineer */}
      <ellipse cx="450" cy="356" rx="6" ry="10" fill={STROKE} stroke="none" />
      <circle cx="450" cy="344" r="5" fill={STROKE} stroke="none" />
      {/* engineer's striped cap */}
      <path d="M 444 339 L 456 339 L 458 336 L 442 336 Z" fill={STROKE} stroke="none" />

      {/* boiler — large horizontal cylinder */}
      <path d="M 150 320 L 360 320 L 360 446 L 150 446 Z" {...reg(fills, onRegion, 'boiler')} />
      {/* boiler bands */}
      <line x1="150" y1="340" x2="360" y2="340" stroke={STROKE} strokeWidth="1.4" />
      <line x1="150" y1="426" x2="360" y2="426" stroke={STROKE} strokeWidth="1.4" />
      {/* rivets */}
      {[160,180,200,220,240,260,280,300,320,340,355].map((x,i) => (
        <circle key={`rv-${i}`} cx={x} cy="332" r="1.4" fill={STROKE} stroke="none" />
      ))}
      {[160,180,200,220,240,260,280,300,320,340,355].map((x,i) => (
        <circle key={`rv2-${i}`} cx={x} cy="436" r="1.4" fill={STROKE} stroke="none" />
      ))}

      {/* boiler front (round headplate) */}
      <ellipse cx="150" cy="383" rx="20" ry="63" {...reg(fills, onRegion, 'boiler-front')} />
      {/* headlight */}
      <circle cx="138" cy="350" r="14" {...reg(fills, onRegion, 'headlight')} />
      <circle cx="138" cy="350" r="6" fill={STROKE} stroke="none" />
      {/* number plate */}
      <rect x="128" y="376" width="32" height="20" {...reg(fills, onRegion, 'number-plate')} />
      <text x="144" y="392" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="14" fontWeight="900" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>1830</text>

      {/* smokestack — funnel-shaped */}
      <path d="M 234 320 L 234 230 L 222 230 L 218 200 L 268 200 L 264 230 L 252 230 L 252 320 Z" {...reg(fills, onRegion, 'smokestack')} />
      {/* smokestack rim */}
      <ellipse cx="243" cy="200" rx="25" ry="4" {...reg(fills, onRegion, 'smokestack-rim')} />

      {/* steam dome on top */}
      <path d="M 290 320 Q 290 286 318 286 Q 346 286 346 320 Z" {...reg(fills, onRegion, 'steam-dome')} />

      {/* bell */}
      <path d="M 268 320 Q 268 300 286 300 Q 286 320 286 320 Z" {...reg(fills, onRegion, 'bell')} />
      <line x1="277" y1="298" x2="277" y2="290" stroke={STROKE} strokeWidth="2" />

      {/* whistle */}
      <line x1="332" y1="286" x2="332" y2="266" stroke={STROKE} strokeWidth="2" />
      <rect x="328" y="266" width="8" height="6" fill={STROKE} stroke="none" />

      {/* cow-catcher (front grille) */}
      <path d="M 130 446 L 80 470 L 80 500 L 130 500 Z" {...reg(fills, onRegion, 'cow-catcher')} />
      {/* slat lines */}
      <line x1="86" y1="476" x2="120" y2="476" stroke={STROKE} strokeWidth="1.4" />
      <line x1="86" y1="486" x2="124" y2="486" stroke={STROKE} strokeWidth="1.4" />
      <line x1="86" y1="496" x2="128" y2="496" stroke={STROKE} strokeWidth="1.4" />

      {/* ---- WHEELS ---- */}
      {/* big driving wheels */}
      <circle cx="220" cy="490" r="44" {...reg(fills, onRegion, 'wheel-big-l')} />
      <circle cx="320" cy="490" r="44" {...reg(fills, onRegion, 'wheel-big-r')} />
      <circle cx="220" cy="490" r="10" fill={STROKE} stroke="none" />
      <circle cx="320" cy="490" r="10" fill={STROKE} stroke="none" />
      {/* spokes */}
      {[0,1,2,3,4,5].map(k => {
        const a = k * Math.PI / 3;
        return <g key={`sp-${k}`}>
          <line x1={220 + Math.cos(a)*10} y1={490 + Math.sin(a)*10} x2={220 + Math.cos(a)*40} y2={490 + Math.sin(a)*40} stroke={STROKE} strokeWidth="2" />
          <line x1={320 + Math.cos(a)*10} y1={490 + Math.sin(a)*10} x2={320 + Math.cos(a)*40} y2={490 + Math.sin(a)*40} stroke={STROKE} strokeWidth="2" />
        </g>;
      })}
      {/* connecting rod between big wheels */}
      <rect x="218" y="484" width="104" height="6" {...reg(fills, onRegion, 'piston-rod')} />
      <circle cx="222" cy="487" r="3" fill={STROKE} stroke="none" />
      <circle cx="318" cy="487" r="3" fill={STROKE} stroke="none" />

      {/* small wheel under cab (back) */}
      <circle cx="430" cy="500" r="28" {...reg(fills, onRegion, 'wheel-small-r')} />
      <circle cx="430" cy="500" r="6" fill={STROKE} stroke="none" />
      {[0,1,2,3].map(k => {
        const a = k * Math.PI / 4;
        return <line key={`sm-${k}`} x1={430 + Math.cos(a)*6} y1={500 + Math.sin(a)*6} x2={430 + Math.cos(a)*24} y2={500 + Math.sin(a)*24} stroke={STROKE} strokeWidth="1.6" />;
      })}

      {/* small wheel under boiler front */}
      <circle cx="135" cy="500" r="22" {...reg(fills, onRegion, 'wheel-small-l')} />
      <circle cx="135" cy="500" r="5" fill={STROKE} stroke="none" />
      {[0,1,2,3].map(k => {
        const a = k * Math.PI / 4;
        return <line key={`sl-${k}`} x1={135 + Math.cos(a)*5} y1={500 + Math.sin(a)*5} x2={135 + Math.cos(a)*18} y2={500 + Math.sin(a)*18} stroke={STROKE} strokeWidth="1.4" />;
      })}

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>THE IRON HORSE · 1830</text>
    </svg>
  );
}

// ----- 58. ULURU — Aboriginal Australia -----
function UluruSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sunset sky — large color block */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />

      {/* sun setting */}
      <g style={alive ? { animation: 'sun-pulse 2.8s ease-in-out infinite', transformOrigin: '460px 220px' } : null}>
        <circle cx="460" cy="220" r="44" {...reg(fills, onRegion, 'sun')} />
      </g>

      {/* stars / Southern Cross */}
      <g style={alive ? { animation: 'twinkle 2.2s ease-in-out infinite' } : null}>
        <circle cx="120" cy="80" r="2.4" fill={STROKE} stroke="none" />
        <circle cx="150" cy="120" r="2" fill={STROKE} stroke="none" />
        <circle cx="100" cy="140" r="2.4" fill={STROKE} stroke="none" />
        <circle cx="140" cy="170" r="2" fill={STROKE} stroke="none" />
        <circle cx="120" cy="110" r="1.6" fill={STROKE} stroke="none" />
      </g>

      {/* distant flat ground */}
      <path d="M 20 360 L 580 360 L 580 460 L 20 460 Z" {...reg(fills, onRegion, 'desert-back')} />
      {/* horizon line */}
      <line x1="20" y1="360" x2="580" y2="360" stroke={STROKE} strokeWidth="1.4" />

      {/* ---- ULURU — the iconic monolith ---- */}
      <path d="M 80 360 Q 100 280 220 260 L 480 260 Q 540 280 540 360 Z" {...reg(fills, onRegion, 'uluru')} />
      {/* vertical groove/scar lines on Uluru — non-colorable */}
      <path d="M 140 360 Q 144 320 156 280" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 200 360 Q 204 320 220 286" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 280 360 Q 282 310 292 274" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 360 360 Q 362 310 372 274" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 440 360 Q 444 320 460 286" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 500 360 Q 504 320 514 290" fill="none" stroke={STROKE} strokeWidth="1.4" />
      {/* highlight ridge along top */}
      <path d="M 96 320 Q 200 280 300 268 Q 400 280 524 320" fill="none" stroke={STROKE} strokeWidth="1.6" />

      {/* near red desert */}
      <path d="M 20 460 Q 200 450 380 460 Q 480 454 580 460 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'desert-front')} />

      {/* spinifex grass tufts — non-colorable */}
      {[60,160,260,360,460,540].map((x,i) => (
        <path key={`gt-${i}`} d={`M ${x} 488 L ${x+4} 476 L ${x+8} 488 L ${x+12} 476 L ${x+16} 488 L ${x+20} 476 L ${x+24} 488`} fill="none" stroke={STROKE} strokeWidth="1.4" />
      ))}

      {/* ---- Aboriginal-style dot painting circle (concentric, foreground left) ---- */}
      <g style={alive ? { animation: 'glow-pulse 2.6s ease-in-out infinite', transformOrigin: '110px 530px' } : null}>
        <circle cx="110" cy="530" r="38" {...reg(fills, onRegion, 'dot-ring-outer')} />
        <circle cx="110" cy="530" r="26" {...reg(fills, onRegion, 'dot-ring-mid')} />
        <circle cx="110" cy="530" r="14" {...reg(fills, onRegion, 'dot-ring-inner')} />
        <circle cx="110" cy="530" r="4" {...reg(fills, onRegion, 'dot-center')} />
        {/* surrounding dots */}
        {Array.from({length: 16}).map((_, i) => {
          const a = i * Math.PI * 2 / 16;
          return <circle key={`dot-${i}`} cx={110 + Math.cos(a)*44} cy={530 + Math.sin(a)*44} r="2.4" fill={STROKE} stroke="none" />;
        })}
        {Array.from({length: 12}).map((_, i) => {
          const a = i * Math.PI * 2 / 12;
          return <circle key={`dot2-${i}`} cx={110 + Math.cos(a)*32} cy={530 + Math.sin(a)*32} r="2" fill={STROKE} stroke="none" />;
        })}
        {Array.from({length: 8}).map((_, i) => {
          const a = i * Math.PI * 2 / 8;
          return <circle key={`dot3-${i}`} cx={110 + Math.cos(a)*20} cy={530 + Math.sin(a)*20} r="1.8" fill={STROKE} stroke="none" />;
        })}
      </g>

      {/* ---- KANGAROO silhouette (right foreground) ---- */}
      <g style={alive ? { animation: 'gentle-bob 2.2s ease-in-out infinite' } : null} transform="translate(440, 540)">
        {/* body */}
        <path d="M 0 0 Q 0 -34 30 -40 L 60 -40 Q 84 -36 80 -10 L 70 8 L 16 8 Z" {...reg(fills, onRegion, 'roo-body')} />
        {/* head — turned profile */}
        <path d="M 60 -40 Q 76 -54 86 -50 Q 92 -40 84 -34 Q 76 -28 60 -32 Z" {...reg(fills, onRegion, 'roo-head')} />
        {/* ear */}
        <path d="M 76 -54 L 80 -68 L 86 -54 Z" {...reg(fills, onRegion, 'roo-ear')} />
        {/* eye */}
        <circle cx="78" cy="-46" r="1.4" fill={STROKE} stroke="none" />
        {/* nose */}
        <circle cx="90" cy="-42" r="1.4" fill={STROKE} stroke="none" />
        {/* tail */}
        <path d="M 0 -6 Q -24 -2 -32 14 Q -30 24 -18 22 Q -8 8 4 6 Z" {...reg(fills, onRegion, 'roo-tail')} />
        {/* legs */}
        <path d="M 14 4 Q 18 22 32 30 L 44 30 L 44 22 Q 38 18 32 8 Z" {...reg(fills, onRegion, 'roo-leg-back')} />
        <path d="M 56 4 L 60 22 L 70 22 L 70 10 Z" {...reg(fills, onRegion, 'roo-leg-front')} />
        {/* small joey arm */}
        <path d="M 52 -22 L 60 -14 L 56 -10 L 50 -16 Z" {...reg(fills, onRegion, 'roo-arm')} />
      </g>

      {/* ---- Boomerang on the ground ---- */}
      <path d="M 240 540 Q 280 540 300 510 Q 290 510 286 516 Q 268 528 250 528 Q 246 534 240 540 Z" {...reg(fills, onRegion, 'boomerang')} />
      {/* boomerang pattern lines */}
      <path d="M 250 532 Q 270 520 290 510" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <path d="M 252 538 Q 268 528 288 514" fill="none" stroke={STROKE} strokeWidth="1.2" />

      {/* ---- Didgeridoo ---- */}
      <path d="M 330 542 L 410 542 L 414 552 L 326 552 Z" {...reg(fills, onRegion, 'didgeridoo')} />
      {/* didgeridoo dot pattern */}
      {[340, 354, 368, 382, 396].map((x,i) => (
        <circle key={`dd-${i}`} cx={x} cy="547" r="1.6" fill={STROKE} stroke="none" />
      ))}

      {/* banner */}
      <rect x="170" y="20" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="43" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>ULURU · ABORIGINAL AUSTRALIA</text>
    </svg>
  );
}

// ============================================================
// Page entries
// ============================================================
const ROUND_14_PAGES = [
  {
    id: 'buddha',
    title: 'The Buddha',
    subtitle: 'Under the Bodhi Tree, c. 500 BC',
    collection: 'world',
    eraLabel: 'Ancient India',
    eraColor: '#D4A02A',
    bgPreview: '#F4DCA0',
    fact: "Prince Siddhartha sat under a fig tree for 49 days until he understood why people suffer. Afterward he was called the Buddha — \u201Cthe awakened one\u201D — and his ideas grew into one of the world's largest religions.",
    Component: BuddhaSVG,
    readingLevel: { lexile: 820, gradeBand: '4–5', guidedReading: 'P', wordCount: 36, complexity: 'Challenging' },
    keyVocab: ['Buddha', 'meditation', 'enlightenment', 'mudra', 'dharma'],
    standards: ['RI.4.4', 'RI.4.1', 'L.4.4', 'SL.4.2'],
    regions: ['sky','halo','stupa-dome','stupa-base','ground','bodhi-trunk','leaf-cluster-l','leaf-cluster-c','leaf-cluster-r','leaf-cluster-ll','leaf-cluster-rr','lotus-base','lotus-petal-l1','lotus-petal-l2','lotus-petal-c','lotus-petal-r2','lotus-petal-r1','legs','foot-l','foot-r','lap-robe','robe','robe-drape','arm-l','arm-r','hands','neck','head','ushnisha','flame-jewel','ear-l','ear-r','urna','floating-lotus-l','floating-lotus-l2','floating-lotus-r','floating-lotus-r2','banner'],
    quest: {
      heading: 'The Awakened One',
      author: 'Ancient India · c. 500 BC',
      lines: [
        'I sat in deep {0} under a wide tree.',
        'I am called the Buddha — the {1} one.',
        'My quiet lessons grew into a great new {2}.',
      ],
      blanks: [
        { answer: 'meditation', choices: ['meditation', 'macaroni',  'magnet',  'mailbox']    },
        { answer: 'awakened',   choices: ['awakened',   'amazing',   'angry',   'allergic']   },
        { answer: 'religion',   choices: ['religion',   'recipe',    'rabbit',  'raindrop']   },
      ],
      voice: {
        // Soft, peaceful narrator
        hints: [/samantha/i, /karen/i, /allison/i, /daniel/i, /microsoft (aria|jenny)/i],
        rate: 0.70, pitch: 0.92,
      },
    },
  },
  {
    id: 'st-basils',
    title: "St. Basil's Cathedral",
    subtitle: 'Moscow, 1561',
    collection: 'world',
    eraLabel: 'Imperial Russia',
    eraColor: '#C8102E',
    bgPreview: '#F2DAE0',
    fact: "Tsar Ivan the Terrible built St. Basil's in the 1500s. Legend says he was so amazed by its swirling, candy-colored onion domes that he blinded the architect so nothing like it could ever be built again.",
    Component: StBasilsSVG,
    readingLevel: { lexile: 800, gradeBand: '4–5', guidedReading: 'P', wordCount: 32, complexity: 'Challenging' },
    keyVocab: ['tsar', 'cathedral', 'onion-dome', 'orthodox'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','cloud','kremlin-wall','square','base-main','main-arch','tower-base-ll','tower-base-rr','tower-base-l','tower-base-r','spire-ll-shaft','spire-rr-shaft','spire-l-shaft','spire-r-shaft','spire-c-shaft','spire-c-tent','dome-ll','dome-rr','dome-l','dome-r','dome-c','banner'],
    quest: {
      heading: 'Domes Like Candy',
      author: 'Moscow · 1561',
      lines: [
        'I am a great cathedral in {0}.',
        'My tops are swirly painted {1}.',
        'I stand in the famous Red {2}.',
      ],
      blanks: [
        { answer: 'Moscow', choices: ['Moscow', 'Muffin', 'Mailbox', 'Macaroni'] },
        { answer: 'domes',  choices: ['domes',  'doors',  'donuts',  'dolphins'] },
        { answer: 'Square', choices: ['Square', 'Snack',  'Slipper', 'Sneaker']  },
      ],
      voice: {
        // Whimsical storyteller
        hints: [/samantha/i, /allison/i, /daniel/i, /serena/i, /microsoft (aria|jenny|guy)/i],
        rate: 0.80, pitch: 0.98,
      },
    },
  },
  {
    id: 'steam-locomotive',
    title: 'The Steam Locomotive',
    subtitle: 'Industrial Revolution, 1830',
    collection: 'world',
    eraLabel: 'Industrial Revolution',
    eraColor: '#4A2E1C',
    bgPreview: '#D6CDC0',
    fact: "Before steam engines, the fastest a person could travel was on horseback. The first steam locomotives could pull dozens of cars at 30 miles an hour — and they changed how people lived all over the world.",
    Component: SteamLocomotiveSVG,
    readingLevel: { lexile: 820, gradeBand: '4–5', guidedReading: 'P', wordCount: 34, complexity: 'Challenging' },
    keyVocab: ['locomotive', 'piston', 'boiler', 'industrial', 'engineer'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','cloud','hills','chimney-1','chimney-2','ground','rail-1','rail-2','tie-0','tie-1','tie-2','tie-3','tie-4','tie-5','tie-6','tie-7','tie-8','tie-9','tie-10','steam-1','steam-2','steam-3','steam-4','cab','cab-roof','cab-window','boiler','boiler-front','headlight','number-plate','smokestack','smokestack-rim','steam-dome','bell','cow-catcher','wheel-big-l','wheel-big-r','piston-rod','wheel-small-r','wheel-small-l','banner'],
    quest: {
      heading: 'The Iron Horse',
      author: 'Industrial Revolution · 1830',
      lines: [
        'I am a giant {0} of iron and brass.',
        'I burn hot {1} to make my steam.',
        'I run on long parallel {2}.',
      ],
      blanks: [
        { answer: 'machine', choices: ['machine', 'muffin',  'mountain', 'minute']  },
        { answer: 'coal',    choices: ['coal',    'cake',    'cabbage',  'carrot']  },
        { answer: 'rails',   choices: ['rails',   'rugs',    'roses',    'recipes'] },
      ],
      voice: {
        // Hearty, bold narrator
        hints: [/daniel/i, /alex/i, /tom/i, /reed/i, /microsoft (mark|guy)/i],
        rate: 0.82, pitch: 0.88,
      },
    },
  },
  {
    id: 'uluru',
    title: 'Uluru',
    subtitle: 'Aboriginal Australia',
    collection: 'world',
    eraLabel: 'Aboriginal Australia',
    eraColor: '#C56340',
    bgPreview: '#F2C9A8',
    fact: "Uluru is a giant red rock in the middle of Australia, sacred to the Anangu people who have lived nearby for over 30,000 years. The rock changes color from gold to deep red as the sun sets.",
    Component: UluruSVG,
    readingLevel: { lexile: 760, gradeBand: '3–4', guidedReading: 'N', wordCount: 34, complexity: 'Moderate' },
    keyVocab: ['Aboriginal', 'monolith', 'sacred', 'outback', 'didgeridoo'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','desert-back','uluru','desert-front','dot-ring-outer','dot-ring-mid','dot-ring-inner','dot-center','roo-body','roo-head','roo-ear','roo-tail','roo-leg-back','roo-leg-front','roo-arm','boomerang','didgeridoo','banner'],
    quest: {
      heading: 'The Heart of the Outback',
      author: 'Anangu People · Australia',
      lines: [
        'I am a giant red rock in the middle of {0}.',
        'I am sacred to the {1} people.',
        'A hopping animal called a {2} lives in my desert.',
      ],
      blanks: [
        { answer: 'Australia',  choices: ['Australia',  'Antarctica', 'Africa',  'Alaska']    },
        { answer: 'Aboriginal', choices: ['Aboriginal', 'Angry',      'Apple',   'Ancient']   },
        { answer: 'kangaroo',   choices: ['kangaroo',   'kitten',     'kazoo',   'koala']     },
      ],
      voice: {
        // Warm, wind-blown storyteller
        hints: [/daniel/i, /samantha/i, /karen/i, /alex/i, /microsoft (mark|aria|guy)/i],
        rate: 0.76, pitch: 0.88,
      },
    },
  },
];

if (window.PAGES_DATA && Array.isArray(window.PAGES_DATA)) {
  ROUND_14_PAGES.forEach(p => window.PAGES_DATA.push(p));
}

Object.assign(window, { BuddhaSVG, StBasilsSVG, SteamLocomotiveSVG, UluruSVG });
