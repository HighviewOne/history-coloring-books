// =================================================================
// Chinese history coloring pages — 4 additions:
//   • Zheng He's Treasure Ship (Ming Voyages, 1405)
//   • A Terracotta Warrior (Qin Dynasty, 210 BC)
//   • The Chinese Dragon at Lunar New Year
//   • The Forbidden City (Beijing, 1420)
// =================================================================

// ----- 35. ZHENG HE'S TREASURE SHIP — 1405 -----
function ZhengHeShipSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.6s ease-in-out infinite', transformOrigin: '500px 100px' } : null}>
        <circle cx="500" cy="100" r="30" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds */}
      <path d="M 70 130 Q 70 110 92 110 Q 98 96 118 96 Q 138 96 142 110 Q 162 110 162 130 Z" {...reg(fills, onRegion, 'cloud-l')} />
      <path d="M 380 80 Q 380 64 398 64 Q 404 52 422 52 Q 440 52 444 64 Q 462 64 462 80 Z" {...reg(fills, onRegion, 'cloud-r')} />

      {/* distant land (China coast) — far right */}
      <path d="M 460 430 Q 480 380 510 376 Q 540 380 558 410 Q 568 420 580 420 L 580 442 L 460 442 Z" {...reg(fills, onRegion, 'distant-land')} />
      {/* tiny pagoda on distant land */}
      <rect x="512" y="398" width="12" height="30" {...reg(fills, onRegion, 'distant-pagoda')} />
      <path d="M 506 398 L 530 398 L 524 388 L 512 388 Z" {...reg(fills, onRegion, 'distant-pagoda-roof')} />

      {/* sea */}
      <path d="M 20 442 L 580 442 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'sea')} />
      {/* wave lines — non-colorable */}
      <path d="M 40 470 Q 80 462 120 470 Q 160 478 200 470" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 380 472 Q 420 464 460 472 Q 500 480 540 472" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 60 510 Q 100 502 140 510 Q 180 518 220 510" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 360 514 Q 400 506 440 514 Q 480 522 520 514" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 100 548 Q 140 540 180 548 Q 220 556 260 548" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* tiny escort junk in distance, left */}
      <g style={alive ? { animation: 'gentle-bob 3s ease-in-out infinite' } : null} transform="translate(72, 422)">
        <path d="M 0 0 L 50 0 L 44 14 L 6 14 Z" {...reg(fills, onRegion, 'escort-hull')} />
        <line x1="24" y1="0" x2="24" y2="-30" stroke={STROKE} strokeWidth="1.6" />
        <path d="M 12 -26 L 36 -26 L 36 -4 L 12 -4 Z" {...reg(fills, onRegion, 'escort-sail')} />
        <line x1="12" y1="-18" x2="36" y2="-18" stroke={STROKE} strokeWidth="1" />
        <line x1="12" y1="-10" x2="36" y2="-10" stroke={STROKE} strokeWidth="1" />
      </g>

      {/* ---- TREASURE SHIP — large Chinese junk, center ---- */}
      <g style={alive ? { animation: 'gentle-bob 3.6s ease-in-out infinite' } : null}>
        {/* hull main body — wide, with raised bow & stern (castles) */}
        <path d="M 100 460 Q 100 488 130 506 L 470 506 Q 500 488 500 460 Q 470 446 300 446 Q 130 446 100 460 Z" {...reg(fills, onRegion, 'hull')} />
        {/* hull plank lines */}
        <line x1="108" y1="472" x2="492" y2="472" stroke={STROKE} strokeWidth="1.4" />
        <line x1="112" y1="488" x2="488" y2="488" stroke={STROKE} strokeWidth="1.4" />
        {/* hull eye decoration (Chinese tradition) */}
        <ellipse cx="126" cy="472" rx="10" ry="6" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.6" />
        <circle cx="126" cy="472" r="3" fill={STROKE} stroke="none" />
        {/* row of cargo windows */}
        {[170, 210, 250, 290, 330, 370, 410, 450].map((x,i) => (
          <rect key={`w-${i}`} x={x} y={486} width={20} height={12} fill="none" stroke={STROKE} strokeWidth="1.4" />
        ))}

        {/* stern castle (raised structure at back-right) */}
        <rect x="410" y="396" width="100" height="56" {...reg(fills, onRegion, 'stern-castle')} />
        {/* curved upward sweep of stern */}
        <path d="M 510 452 L 514 432 L 506 430 L 502 446 Z" {...reg(fills, onRegion, 'stern-curve')} />
        {/* stern windows */}
        <rect x="422" y="410" width="16" height="20" fill="none" stroke={STROKE} strokeWidth="1.6" />
        <rect x="446" y="410" width="16" height="20" fill="none" stroke={STROKE} strokeWidth="1.6" />
        <rect x="470" y="410" width="16" height="20" fill="none" stroke={STROKE} strokeWidth="1.6" />
        {/* stern roof (small pagoda-like cap) */}
        <path d="M 408 396 L 512 396 L 506 380 L 414 380 Z" {...reg(fills, onRegion, 'stern-roof')} />

        {/* bow castle (raised at front-left) */}
        <rect x="108" y="416" width="60" height="36" {...reg(fills, onRegion, 'bow-castle')} />
        <path d="M 106 416 L 170 416 L 162 402 L 114 402 Z" {...reg(fills, onRegion, 'bow-roof')} />
        <rect x="118" y="426" width="14" height="18" fill="none" stroke={STROKE} strokeWidth="1.6" />
        <rect x="144" y="426" width="14" height="18" fill="none" stroke={STROKE} strokeWidth="1.6" />

        {/* deck rail between bow & stern */}
        <rect x="168" y="442" width="242" height="6" {...reg(fills, onRegion, 'deck-rail')} />

        {/* tiny sailors on deck — silhouettes */}
        {[200, 240, 280, 320, 360].map((x,i) => (
          <g key={`sl-${i}`}>
            <ellipse cx={x} cy={428} rx="4" ry="6" fill={STROKE} stroke="none" />
            <circle cx={x} cy={418} r="3" fill={STROKE} stroke="none" />
          </g>
        ))}

        {/* ---- masts (3) ---- */}
        {/* fore mast */}
        <line x1="180" y1="402" x2="180" y2="110" stroke={STROKE} strokeWidth="3" />
        {/* main mast (tallest, center) */}
        <line x1="300" y1="442" x2="300" y2="60" stroke={STROKE} strokeWidth="3.2" />
        {/* mizzen mast */}
        <line x1="410" y1="396" x2="410" y2="130" stroke={STROKE} strokeWidth="3" />

        {/* fore sail (battened junk-rig — red) */}
        <path d="M 142 200 L 218 200 L 222 388 L 138 388 Z" {...reg(fills, onRegion, 'sail-fore')} />
        {/* fore sail battens — non-colorable */}
        {[230, 260, 290, 320, 350].map((y,i) => (
          <line key={`bf-${i}`} x1="138" y1={y} x2="222" y2={y} stroke={STROKE} strokeWidth="1.4" />
        ))}

        {/* main sail — largest, center */}
        <path d="M 240 110 L 360 110 L 372 432 L 228 432 Z" {...reg(fills, onRegion, 'sail-main')} />
        {/* main sail battens */}
        {[150, 195, 240, 285, 330, 375, 410].map((y,i) => (
          <line key={`bm-${i}`} x1="228" y1={y} x2="372" y2={y} stroke={STROKE} strokeWidth="1.4" />
        ))}
        {/* dragon emblem on main sail */}
        <g fill="none" stroke={STROKE} strokeWidth="2">
          <path d="M 270 260 Q 300 240 330 260 Q 320 280 300 270 Q 280 280 270 260 Z" />
          <circle cx="320" cy="258" r="1.6" fill={STROKE} />
        </g>

        {/* mizzen sail */}
        <path d="M 372 220 L 452 220 L 456 388 L 368 388 Z" {...reg(fills, onRegion, 'sail-mizzen')} />
        {[252, 282, 312, 342, 370].map((y,i) => (
          <line key={`bz-${i}`} x1="368" y1={y} x2="456" y2={y} stroke={STROKE} strokeWidth="1.4" />
        ))}

        {/* top pennants & flags */}
        <g style={alive ? { animation: 'wave-flag 2.4s ease-in-out infinite', transformOrigin: '300px 80px' } : null}>
          <path d="M 300 60 L 350 66 L 340 76 L 350 86 L 300 92 Z" {...reg(fills, onRegion, 'flag-main')} />
          <text x="320" y="82" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="14" fontWeight="900" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>明</text>
        </g>
        <g style={alive ? { animation: 'wave-flag 2.8s ease-in-out infinite', transformOrigin: '180px 124px', animationDelay: '0.3s' } : null}>
          <path d="M 180 110 L 220 116 L 210 124 L 220 132 L 180 138 Z" {...reg(fills, onRegion, 'flag-fore')} />
        </g>
        <g style={alive ? { animation: 'wave-flag 2.6s ease-in-out infinite', transformOrigin: '410px 144px', animationDelay: '0.5s' } : null}>
          <path d="M 410 130 L 450 136 L 440 144 L 450 152 L 410 158 Z" {...reg(fills, onRegion, 'flag-mizzen')} />
        </g>

        {/* mast top finials */}
        <circle cx="300" cy="56" r="3" fill={STROKE} stroke="none" />
        <circle cx="180" cy="108" r="3" fill={STROKE} stroke="none" />
        <circle cx="410" cy="128" r="3" fill={STROKE} stroke="none" />
      </g>

      {/* seagulls */}
      <g style={alive ? { animation: 'gentle-bob 2.4s ease-in-out infinite' } : null}>
        <path d="M 80 220 Q 90 212 100 220 Q 110 212 120 220" fill="none" stroke={STROKE} strokeWidth="2" />
      </g>
      <g style={alive ? { animation: 'gentle-bob 2.8s ease-in-out infinite', animationDelay: '0.4s' } : null}>
        <path d="M 470 180 Q 478 172 486 180 Q 494 172 502 180" fill="none" stroke={STROKE} strokeWidth="2" />
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>鄭和 · TREASURE FLEET · 1405</text>
    </svg>
  );
}

// ----- 36. TERRACOTTA WARRIOR — Xi'an, 210 BC -----
function TerracottaWarriorSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* tomb pit background — earthen */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'background')} />
      {/* horizontal earth strata */}
      <line x1="20" y1="160" x2="580" y2="160" stroke={STROKE} strokeWidth="1.4" />
      <line x1="20" y1="260" x2="580" y2="260" stroke={STROKE} strokeWidth="1.4" />
      <line x1="20" y1="380" x2="580" y2="380" stroke={STROKE} strokeWidth="1.4" />

      {/* background army silhouettes (rows of dim warriors behind) */}
      <g opacity="0.45">
        {[80,160,240,440,520].map((x,i) => (
          <g key={`bw-${i}`}>
            <ellipse cx={x} cy="180" rx="14" ry="10" fill={STROKE} stroke="none" />
            <rect x={x-12} y="186" width="24" height="40" fill={STROKE} stroke="none" />
            <rect x={x-14} y="226" width="28" height="32" fill={STROKE} stroke="none" />
          </g>
        ))}
        {[120,200,400,480].map((x,i) => (
          <g key={`bw2-${i}`}>
            <ellipse cx={x} cy="200" rx="12" ry="9" fill={STROKE} stroke="none" />
            <rect x={x-10} y="205" width="20" height="30" fill={STROKE} stroke="none" />
          </g>
        ))}
      </g>

      {/* dividing wall (separates army rows — earth ridge) */}
      <rect x="20" y="382" width="560" height="14" {...reg(fills, onRegion, 'ridge')} />

      {/* floor */}
      <path d="M 20 460 L 580 460 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'floor')} />
      <line x1="20" y1="500" x2="580" y2="500" stroke={STROKE} strokeWidth="1.4" />
      <line x1="220" y1="460" x2="220" y2="580" stroke={STROKE} strokeWidth="1.4" />
      <line x1="380" y1="460" x2="380" y2="580" stroke={STROKE} strokeWidth="1.4" />

      {/* ---- WARRIOR (centered, front-facing) ---- */}
      {/* feet — square-toed boots */}
      <path d="M 250 460 L 296 460 L 296 478 L 250 478 Z" {...reg(fills, onRegion, 'boot-l')} />
      <path d="M 304 460 L 350 460 L 350 478 L 304 478 Z" {...reg(fills, onRegion, 'boot-r')} />
      {/* curled toe tips (non-colorable) */}
      <path d="M 250 462 L 244 466 L 246 472 L 252 472" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M 350 462 L 356 466 L 354 472 L 348 472" fill="none" stroke={STROKE} strokeWidth="1.6" />

      {/* trousers */}
      <path d="M 244 380 L 296 380 L 304 460 L 252 460 Z" {...reg(fills, onRegion, 'pants-l')} />
      <path d="M 304 380 L 356 380 L 348 460 L 296 460 Z" {...reg(fills, onRegion, 'pants-r')} />

      {/* tunic skirt — long flowing robe */}
      <path d="M 222 296 L 378 296 L 388 388 L 212 388 Z" {...reg(fills, onRegion, 'tunic-skirt')} />
      {/* tunic skirt drape folds */}
      <line x1="252" y1="304" x2="248" y2="384" stroke={STROKE} strokeWidth="1.4" />
      <line x1="300" y1="304" x2="300" y2="384" stroke={STROKE} strokeWidth="1.4" />
      <line x1="348" y1="304" x2="352" y2="384" stroke={STROKE} strokeWidth="1.4" />

      {/* belt with sash */}
      <rect x="222" y="290" width="156" height="14" {...reg(fills, onRegion, 'belt')} />
      <path d="M 286 304 L 314 304 L 316 360 L 284 360 Z" {...reg(fills, onRegion, 'sash')} />
      {/* belt buckle */}
      <rect x="286" y="290" width="28" height="14" {...reg(fills, onRegion, 'buckle')} />
      <circle cx="300" cy="297" r="3" fill={STROKE} stroke="none" />

      {/* chest armor — scale plates */}
      <path d="M 232 220 L 368 220 L 376 290 L 224 290 Z" {...reg(fills, onRegion, 'chest-armor')} />
      {/* scale plates — small diamonds across the chest */}
      {Array.from({length: 4}).map((_, row) =>
        Array.from({length: 7}).map((_, col) => {
          const cx = 248 + col*16 + (row%2 ? 8 : 0);
          const cy = 234 + row*16;
          if (cx > 360) return null;
          return (
            <path key={`p-${row}-${col}`}
              d={`M ${cx} ${cy} L ${cx+8} ${cy+6} L ${cx} ${cy+12} L ${cx-8} ${cy+6} Z`}
              fill="none" stroke={STROKE} strokeWidth="1.4" />
          );
        })
      )}

      {/* shoulder pads */}
      <path d="M 224 220 Q 210 200 224 196 Q 244 200 244 222 Z" {...reg(fills, onRegion, 'shoulder-l')} />
      <path d="M 376 220 Q 390 200 376 196 Q 356 200 356 222 Z" {...reg(fills, onRegion, 'shoulder-r')} />

      {/* arms — at sides */}
      <path d="M 224 234 Q 204 260 208 320 L 228 320 Q 232 270 244 248 Z" {...reg(fills, onRegion, 'arm-l')} />
      <path d="M 376 234 Q 396 260 392 320 L 372 320 Q 368 270 356 248 Z" {...reg(fills, onRegion, 'arm-r')} />
      {/* hands */}
      <ellipse cx="218" cy="332" rx="10" ry="9" {...reg(fills, onRegion, 'hand-l')} />
      <ellipse cx="382" cy="332" rx="10" ry="9" {...reg(fills, onRegion, 'hand-r')} />

      {/* collar — high standing collar */}
      <path d="M 244 196 Q 300 220 356 196 Q 356 222 300 232 Q 244 222 244 196 Z" {...reg(fills, onRegion, 'collar')} />

      {/* neck */}
      <path d="M 288 178 L 312 178 L 314 200 L 286 200 Z" {...reg(fills, onRegion, 'neck')} />

      {/* face */}
      <ellipse cx="300" cy="148" rx="28" ry="34" {...reg(fills, onRegion, 'face')} />
      {/* eyes — narrow, serious */}
      <path d="M 282 146 Q 290 142 296 146" fill="none" stroke={STROKE} strokeWidth="2.4" />
      <path d="M 304 146 Q 310 142 318 146" fill="none" stroke={STROKE} strokeWidth="2.4" />
      <circle cx="290" cy="149" r="1.6" fill={STROKE} stroke="none" />
      <circle cx="310" cy="149" r="1.6" fill={STROKE} stroke="none" />
      {/* eyebrows */}
      <path d="M 280 138 L 296 136" stroke={STROKE} strokeWidth="2.4" fill="none" />
      <path d="M 304 136 L 320 138" stroke={STROKE} strokeWidth="2.4" fill="none" />
      {/* nose */}
      <path d="M 300 154 L 296 168 Q 300 172 304 168 Z" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* mouth */}
      <path d="M 290 178 Q 300 180 310 178" fill="none" stroke={STROKE} strokeWidth="1.8" />
      {/* mustache */}
      <path d="M 282 174 Q 290 168 300 172 Q 310 168 318 174" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* small beard */}
      <path d="M 294 182 Q 300 192 306 182" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* ear */}
      <path d="M 272 144 Q 264 152 270 162" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M 328 144 Q 336 152 330 162" fill="none" stroke={STROKE} strokeWidth="1.6" />

      {/* topknot bun + cloth band */}
      <path d="M 276 116 Q 276 88 300 84 Q 324 88 324 116 Z" {...reg(fills, onRegion, 'hair-cap')} />
      <ellipse cx="300" cy="78" rx="14" ry="10" {...reg(fills, onRegion, 'topknot')} />
      <rect x="278" y="112" width="44" height="6" {...reg(fills, onRegion, 'headband')} />

      {/* small chip/crack on shoulder (terracotta detail) — non-colorable */}
      <path d="M 244 218 L 252 214 L 250 222 Z" fill={STROKE} stroke="none" />

      {/* banner */}
      <rect x="160" y="540" width="280" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>TERRACOTTA ARMY · 210 BC</text>
    </svg>
  );
}

// ----- 37. CHINESE DRAGON AT LUNAR NEW YEAR -----
function ChineseDragonSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* night sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />

      {/* firework bursts — non-colorable */}
      <g style={alive ? { animation: 'twinkle 1.8s ease-in-out infinite' } : null}>
        {Array.from({length:10}).map((_,i)=>{
          const a = i * Math.PI * 2 / 10;
          return <line key={`f1-${i}`} x1={100} y1={100} x2={100+Math.cos(a)*20} y2={100+Math.sin(a)*20} stroke={STROKE} strokeWidth="1.6" />;
        })}
        <circle cx="100" cy="100" r="3" fill={STROKE} stroke="none" />
      </g>
      <g style={alive ? { animation: 'twinkle 2.2s ease-in-out infinite', animationDelay:'0.4s' } : null}>
        {Array.from({length:8}).map((_,i)=>{
          const a = i * Math.PI * 2 / 8;
          return <line key={`f2-${i}`} x1={520} y1={120} x2={520+Math.cos(a)*16} y2={120+Math.sin(a)*16} stroke={STROKE} strokeWidth="1.6" />;
        })}
        <circle cx="520" cy="120" r="3" fill={STROKE} stroke="none" />
      </g>

      {/* full moon */}
      <g style={alive ? { animation: 'glow-pulse 3s ease-in-out infinite', transformOrigin: '300px 90px' } : null}>
        <circle cx="300" cy="90" r="34" {...reg(fills, onRegion, 'moon')} />
      </g>

      {/* hanging red lanterns */}
      {/* lantern strings — non-colorable */}
      <line x1="60" y1="20" x2="60" y2="120" stroke={STROKE} strokeWidth="1.4" />
      <line x1="160" y1="20" x2="160" y2="80" stroke={STROKE} strokeWidth="1.4" />
      <line x1="440" y1="20" x2="440" y2="80" stroke={STROKE} strokeWidth="1.4" />
      <line x1="540" y1="20" x2="540" y2="120" stroke={STROKE} strokeWidth="1.4" />
      <g style={alive ? { animation: 'gentle-bob 2.8s ease-in-out infinite' } : null}>
        <ellipse cx="60" cy="140" rx="22" ry="26" {...reg(fills, onRegion, 'lantern-1')} />
        <rect x="50" y="116" width="20" height="6" {...reg(fills, onRegion, 'lantern-1-top')} />
        <rect x="50" y="166" width="20" height="6" {...reg(fills, onRegion, 'lantern-1-bot')} />
        <line x1="60" y1="172" x2="56" y2="190" stroke={STROKE} strokeWidth="1.4" />
        <line x1="60" y1="172" x2="60" y2="194" stroke={STROKE} strokeWidth="1.4" />
        <line x1="60" y1="172" x2="64" y2="190" stroke={STROKE} strokeWidth="1.4" />
        <text x="60" y="146" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="18" fontWeight="900" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>福</text>
      </g>
      <g style={alive ? { animation: 'gentle-bob 3s ease-in-out infinite', animationDelay:'0.3s' } : null}>
        <ellipse cx="160" cy="100" rx="18" ry="22" {...reg(fills, onRegion, 'lantern-2')} />
        <rect x="152" y="80" width="16" height="5" {...reg(fills, onRegion, 'lantern-2-top')} />
        <rect x="152" y="120" width="16" height="5" {...reg(fills, onRegion, 'lantern-2-bot')} />
        <line x1="160" y1="125" x2="156" y2="140" stroke={STROKE} strokeWidth="1.2" />
        <line x1="160" y1="125" x2="164" y2="140" stroke={STROKE} strokeWidth="1.2" />
      </g>
      <g style={alive ? { animation: 'gentle-bob 2.8s ease-in-out infinite', animationDelay:'0.6s' } : null}>
        <ellipse cx="440" cy="100" rx="18" ry="22" {...reg(fills, onRegion, 'lantern-3')} />
        <rect x="432" y="80" width="16" height="5" {...reg(fills, onRegion, 'lantern-3-top')} />
        <rect x="432" y="120" width="16" height="5" {...reg(fills, onRegion, 'lantern-3-bot')} />
        <line x1="440" y1="125" x2="436" y2="140" stroke={STROKE} strokeWidth="1.2" />
        <line x1="440" y1="125" x2="444" y2="140" stroke={STROKE} strokeWidth="1.2" />
      </g>
      <g style={alive ? { animation: 'gentle-bob 3.2s ease-in-out infinite', animationDelay:'0.9s' } : null}>
        <ellipse cx="540" cy="140" rx="22" ry="26" {...reg(fills, onRegion, 'lantern-4')} />
        <rect x="530" y="116" width="20" height="6" {...reg(fills, onRegion, 'lantern-4-top')} />
        <rect x="530" y="166" width="20" height="6" {...reg(fills, onRegion, 'lantern-4-bot')} />
        <line x1="540" y1="172" x2="536" y2="190" stroke={STROKE} strokeWidth="1.4" />
        <line x1="540" y1="172" x2="540" y2="194" stroke={STROKE} strokeWidth="1.4" />
        <line x1="540" y1="172" x2="544" y2="190" stroke={STROKE} strokeWidth="1.4" />
        <text x="540" y="146" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="18" fontWeight="900" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>春</text>
      </g>

      {/* ---- DRAGON — long S-curve body ---- */}
      {/* tail (right side, low) */}
      <path d="M 520 460 Q 540 440 558 460 Q 540 470 520 466 Z" {...reg(fills, onRegion, 'tail-fin')} />
      {/* body segments — 5 sausage-like coils along S-curve */}
      <path d="M 460 460 Q 460 432 510 432 Q 540 444 520 466 Q 480 478 460 460 Z" {...reg(fills, onRegion, 'body-5')} />
      <path d="M 380 410 Q 360 380 410 372 Q 460 380 470 420 Q 470 442 420 446 Q 380 444 380 410 Z" {...reg(fills, onRegion, 'body-4')} />
      <path d="M 290 380 Q 290 348 340 348 Q 390 348 400 388 Q 400 414 360 420 Q 310 418 290 380 Z" {...reg(fills, onRegion, 'body-3')} />
      <path d="M 200 348 Q 200 316 250 316 Q 300 316 310 356 Q 310 386 270 388 Q 220 386 200 348 Z" {...reg(fills, onRegion, 'body-2')} />
      <path d="M 130 312 Q 130 280 180 280 Q 230 280 240 320 Q 240 350 200 352 Q 150 350 130 312 Z" {...reg(fills, onRegion, 'body-1')} />

      {/* belly scales — non-colorable arcs along each segment */}
      <path d="M 150 332 Q 180 348 220 340" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <path d="M 220 368 Q 250 384 290 376" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <path d="M 310 400 Q 340 416 380 408" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <path d="M 400 430 Q 430 444 460 440" fill="none" stroke={STROKE} strokeWidth="1.2" />

      {/* spine spikes — small triangles along the top of each body segment */}
      <g fill={STROKE} stroke="none">
        {/* body-1 (top-left coil) */}
        <path d="M 160 286 L 168 274 L 176 286 Z" />
        <path d="M 184 282 L 192 270 L 200 282 Z" />
        {/* body-2 */}
        <path d="M 224 322 L 232 310 L 240 322 Z" />
        <path d="M 252 320 L 260 308 L 268 320 Z" />
        {/* body-3 */}
        <path d="M 308 354 L 316 342 L 324 354 Z" />
        <path d="M 340 354 L 348 342 L 356 354 Z" />
        {/* body-4 */}
        <path d="M 396 380 L 402 368 L 410 380 Z" />
        <path d="M 426 380 L 432 368 L 440 380 Z" />
        {/* body-5 */}
        <path d="M 476 438 L 482 426 L 490 438 Z" />
      </g>

      {/* tiny legs along body (claws) */}
      <g stroke={STROKE} strokeWidth="2" fill="none">
        <path d="M 170 348 L 168 372 L 162 376 M 168 372 L 172 376 M 168 372 L 174 374" />
        <path d="M 220 388 L 218 412 L 212 416 M 218 412 L 222 416 M 218 412 L 224 414" />
        <path d="M 340 416 L 338 440 L 332 444 M 338 440 L 342 444 M 338 440 L 344 442" />
        <path d="M 430 444 L 428 462 L 422 466 M 428 462 L 432 466 M 428 462 L 434 464" />
      </g>

      {/* DRAGON HEAD — facing left */}
      {/* main head */}
      <path d="M 60 284 Q 30 260 50 232 Q 80 220 120 232 Q 150 248 150 280 Q 140 312 100 312 Q 70 308 60 284 Z" {...reg(fills, onRegion, 'head')} />
      {/* horns */}
      <path d="M 96 232 L 92 200 L 108 218 Z" {...reg(fills, onRegion, 'horn-l')} />
      <path d="M 130 240 L 138 210 L 144 234 Z" {...reg(fills, onRegion, 'horn-r')} />
      {/* mane */}
      <path d="M 130 252 Q 156 244 174 256 Q 162 270 144 270 Z" {...reg(fills, onRegion, 'mane-1')} />
      <path d="M 124 282 Q 152 282 168 294 Q 154 304 136 300 Z" {...reg(fills, onRegion, 'mane-2')} />
      {/* eye */}
      <circle cx="80" cy="252" r="5" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.8" />
      <circle cx="80" cy="252" r="2.4" fill={STROKE} stroke="none" />
      {/* nostril */}
      <circle cx="48" cy="270" r="2.4" fill={STROKE} stroke="none" />
      {/* mouth open showing teeth */}
      <path d="M 30 282 L 60 286 L 56 296 L 36 294 Z" {...reg(fills, onRegion, 'mouth')} />
      <path d="M 36 286 L 38 292 L 40 286 Z" fill={STROKE} stroke="none" />
      <path d="M 46 287 L 48 293 L 50 287 Z" fill={STROKE} stroke="none" />
      <path d="M 56 288 L 58 294 L 60 288 Z" fill={STROKE} stroke="none" />
      {/* whiskers — non-colorable */}
      <path d="M 32 286 Q 16 296 8 312" fill="none" stroke={STROKE} strokeWidth="2" />
      <path d="M 36 296 Q 22 312 18 332" fill="none" stroke={STROKE} strokeWidth="2" />

      {/* banner */}
      <rect x="160" y="540" width="280" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>新年快樂 · LUNAR NEW YEAR</text>
    </svg>
  );
}

// ----- 38. THE FORBIDDEN CITY — Beijing, 1420 -----
function ForbiddenCitySVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.6s ease-in-out infinite', transformOrigin: '120px 100px' } : null}>
        <circle cx="120" cy="100" r="34" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds */}
      <path d="M 380 80 Q 380 60 402 60 Q 408 46 428 46 Q 448 46 452 60 Q 472 60 472 80 Z" {...reg(fills, onRegion, 'cloud-l')} />
      <path d="M 470 130 Q 470 114 488 114 Q 492 102 510 102 Q 528 102 532 114 Q 550 114 550 130 Z" {...reg(fills, onRegion, 'cloud-r')} />

      {/* distant hills */}
      <path d="M 20 240 Q 100 200 200 230 Q 300 200 400 230 Q 500 200 580 240 L 580 280 L 20 280 Z" {...reg(fills, onRegion, 'hills')} />

      {/* ---- Forbidden City Palace ---- */}
      {/* lower platform / marble terrace */}
      <rect x="60" y="440" width="480" height="32" {...reg(fills, onRegion, 'platform-1')} />
      <rect x="40" y="472" width="520" height="22" {...reg(fills, onRegion, 'platform-2')} />
      {/* platform balustrade dots */}
      {[80,140,200,260,320,380,440,500].map((x,i) => (
        <circle key={`bp-${i}`} cx={x} cy="446" r="3" fill={STROKE} stroke="none" />
      ))}
      {[80,140,200,260,320,380,440,500].map((x,i) => (
        <circle key={`bp2-${i}`} cx={x} cy="478" r="3" fill={STROKE} stroke="none" />
      ))}

      {/* central stairs */}
      <path d="M 260 440 L 340 440 L 360 494 L 240 494 Z" {...reg(fills, onRegion, 'stairs')} />
      <line x1="248" y1="458" x2="352" y2="458" stroke={STROKE} strokeWidth="1.4" />
      <line x1="244" y1="476" x2="356" y2="476" stroke={STROKE} strokeWidth="1.4" />
      {/* central marble ramp with carving */}
      <rect x="284" y="440" width="32" height="54" {...reg(fills, onRegion, 'marble-ramp')} />
      <path d="M 290 450 Q 300 446 310 450 Q 300 458 290 454 Z" fill={STROKE} stroke="none" opacity="0.45" />
      <path d="M 290 470 Q 300 466 310 470 Q 300 478 290 474 Z" fill={STROKE} stroke="none" opacity="0.45" />

      {/* red palace walls */}
      <rect x="100" y="320" width="400" height="120" {...reg(fills, onRegion, 'wall')} />
      {/* central archway gate */}
      <path d="M 274 440 L 326 440 L 326 380 Q 300 360 274 380 Z" {...reg(fills, onRegion, 'gate')} />
      {/* side gates (smaller) */}
      <path d="M 168 440 L 208 440 L 208 396 Q 188 380 168 396 Z" {...reg(fills, onRegion, 'gate-l')} />
      <path d="M 392 440 L 432 440 L 432 396 Q 412 380 392 396 Z" {...reg(fills, onRegion, 'gate-r')} />
      {/* round window above central gate */}
      <circle cx="300" cy="350" r="14" {...reg(fills, onRegion, 'window')} />
      <line x1="286" y1="350" x2="314" y2="350" stroke={STROKE} strokeWidth="1.4" />
      <line x1="300" y1="336" x2="300" y2="364" stroke={STROKE} strokeWidth="1.4" />

      {/* lower roof — wide, with upturned eaves */}
      <path d="M 80 320 L 520 320 L 510 290 L 90 290 Z" {...reg(fills, onRegion, 'roof-eave-lower')} />
      <path d="M 80 320 L 60 322 L 70 304 L 90 290 Z" {...reg(fills, onRegion, 'eave-tip-ll')} />
      <path d="M 520 320 L 540 322 L 530 304 L 510 290 Z" {...reg(fills, onRegion, 'eave-tip-lr')} />
      {/* lower roof tiles */}
      {[100,130,160,190,220,250,280,310,340,370,400,430,460,490].map((x,i) => (
        <line key={`t1-${i}`} x1={x} y1="290" x2={x+2} y2="320" stroke={STROKE} strokeWidth="1.2" />
      ))}

      {/* upper roof tier — taller, narrower */}
      <rect x="170" y="240" width="260" height="48" {...reg(fills, onRegion, 'roof-mid-wall')} />
      {/* upper-tier red wall windows */}
      <rect x="200" y="252" width="20" height="24" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <rect x="240" y="252" width="20" height="24" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <rect x="280" y="252" width="20" height="24" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <rect x="320" y="252" width="20" height="24" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <rect x="360" y="252" width="20" height="24" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <rect x="400" y="252" width="20" height="24" fill="none" stroke={STROKE} strokeWidth="1.6" />

      {/* upper roof — golden curved with high upturns */}
      <path d="M 150 240 L 450 240 L 442 196 L 158 196 Z" {...reg(fills, onRegion, 'roof-eave-upper')} />
      <path d="M 150 240 L 132 240 L 138 226 L 158 196 Z" {...reg(fills, onRegion, 'eave-tip-ul')} />
      <path d="M 450 240 L 468 240 L 462 226 L 442 196 Z" {...reg(fills, onRegion, 'eave-tip-ur')} />
      {/* upper roof crown — high peak */}
      <path d="M 158 196 L 442 196 L 410 168 L 190 168 Z" {...reg(fills, onRegion, 'roof-peak')} />
      {/* upper roof tiles */}
      {[170,200,230,260,290,320,350,380,410].map((x,i) => (
        <line key={`t2-${i}`} x1={x} y1="196" x2={x+1} y2="240" stroke={STROKE} strokeWidth="1.2" />
      ))}
      {/* roof ridge ornament (chiwen) */}
      <path d="M 190 168 L 188 156 L 196 152 L 200 162 Z" {...reg(fills, onRegion, 'ridge-l')} />
      <path d="M 410 168 L 412 156 L 404 152 L 400 162 Z" {...reg(fills, onRegion, 'ridge-r')} />
      {/* roof-crown ornament */}
      <circle cx="300" cy="160" r="6" {...reg(fills, onRegion, 'ridge-center')} />

      {/* hanging lanterns under eaves */}
      <line x1="200" y1="290" x2="200" y2="298" stroke={STROKE} strokeWidth="1.4" />
      <line x1="400" y1="290" x2="400" y2="298" stroke={STROKE} strokeWidth="1.4" />
      <ellipse cx="200" cy="310" rx="10" ry="12" {...reg(fills, onRegion, 'lantern-l')} />
      <ellipse cx="400" cy="310" rx="10" ry="12" {...reg(fills, onRegion, 'lantern-r')} />

      {/* plaza tile */}
      <path d="M 20 494 L 580 494 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'plaza')} />
      {/* plaza tile lines */}
      {[20,140,260,380,500].map((x,i) => (
        <line key={`pt-${i}`} x1={x} y1="494" x2={x} y2="580" stroke={STROKE} strokeWidth="1" />
      ))}
      <line x1="20" y1="540" x2="580" y2="540" stroke={STROKE} strokeWidth="1" />

      {/* stone lions guarding stairs */}
      <g style={alive ? { animation: 'gentle-bob 3s ease-in-out infinite' } : null} transform="translate(140, 510)">
        <ellipse cx="0" cy="0" rx="22" ry="14" {...reg(fills, onRegion, 'lion-l-body')} />
        <ellipse cx="0" cy="-18" rx="14" ry="12" {...reg(fills, onRegion, 'lion-l-head')} />
        <path d="M -14 -22 Q -16 -36 -8 -32 Q 0 -36 0 -22 Q 0 -36 8 -32 Q 16 -36 14 -22" fill="none" stroke={STROKE} strokeWidth="1.6" />
        <circle cx="-4" cy="-20" r="1.6" fill={STROKE} stroke="none" />
        <circle cx="4" cy="-20" r="1.6" fill={STROKE} stroke="none" />
        <path d="M -4 -14 Q 0 -10 4 -14" fill="none" stroke={STROKE} strokeWidth="1.4" />
        <rect x="-22" y="10" width="44" height="6" {...reg(fills, onRegion, 'lion-l-base')} />
      </g>
      <g style={alive ? { animation: 'gentle-bob 3.2s ease-in-out infinite', animationDelay:'0.4s' } : null} transform="translate(460, 510)">
        <ellipse cx="0" cy="0" rx="22" ry="14" {...reg(fills, onRegion, 'lion-r-body')} />
        <ellipse cx="0" cy="-18" rx="14" ry="12" {...reg(fills, onRegion, 'lion-r-head')} />
        <path d="M -14 -22 Q -16 -36 -8 -32 Q 0 -36 0 -22 Q 0 -36 8 -32 Q 16 -36 14 -22" fill="none" stroke={STROKE} strokeWidth="1.6" />
        <circle cx="-4" cy="-20" r="1.6" fill={STROKE} stroke="none" />
        <circle cx="4" cy="-20" r="1.6" fill={STROKE} stroke="none" />
        <path d="M -4 -14 Q 0 -10 4 -14" fill="none" stroke={STROKE} strokeWidth="1.4" />
        <rect x="-22" y="10" width="44" height="6" {...reg(fills, onRegion, 'lion-r-base')} />
      </g>

      {/* banner */}
      <rect x="160" y="540" width="280" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>紫禁城 · FORBIDDEN CITY</text>
    </svg>
  );
}

// ============================================================
// Page entries
// ============================================================
const CHINA_PAGES = [
  {
    id: 'zheng-he-ship',
    title: "Zheng He's Treasure Ship",
    subtitle: 'The Ming Voyages, 1405',
    collection: 'world',
    eraLabel: 'Ming Voyages',
    eraColor: '#2C5F8B',
    bgPreview: '#D6E0EA',
    fact: "Admiral Zheng He sailed across the Indian Ocean nearly a century before Columbus crossed the Atlantic. His largest junks were 400 feet long — bigger than a football field — and carried hundreds of sailors, soldiers, and gifts for foreign kings.",
    Component: ZhengHeShipSVG,
    readingLevel: { lexile: 820, gradeBand: '4–5', guidedReading: 'P', wordCount: 32, complexity: 'Challenging' },
    keyVocab: ['admiral', 'junk', 'voyage', 'fleet', 'tribute'],
    standards: ['RI.4.4', 'RI.4.7', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','cloud-l','cloud-r','distant-land','distant-pagoda','distant-pagoda-roof','sea','escort-hull','escort-sail','hull','stern-castle','stern-curve','stern-roof','bow-castle','bow-roof','deck-rail','sail-fore','sail-main','sail-mizzen','flag-main','flag-fore','flag-mizzen','banner'],
    quest: {
      heading: 'Admiral of the Seven Seas',
      author: 'Ming Dynasty · 1405',
      lines: [
        'I am a giant Chinese ship with red battened {0}.',
        'My admiral, Zheng He, sailed across the wide {1}.',
        'My fleet carried gold, silk, and gifts to far-off {2}.',
      ],
      blanks: [
        { answer: 'sails', choices: ['sails', 'socks',   'snails',   'spoons']   },
        { answer: 'ocean', choices: ['ocean', 'oven',    'orange',   'octopus']  },
        { answer: 'lands', choices: ['lands', 'lemons',  'ladybugs', 'ladders']  },
      ],
      voice: {
        // Steady, sea-captain narrator
        hints: [/daniel/i, /alex/i, /tom/i, /bruce/i, /reed/i, /microsoft (mark|guy)/i],
        rate: 0.78, pitch: 0.86,
      },
    },
  },
  {
    id: 'terracotta',
    title: 'The Terracotta Warrior',
    subtitle: "Xi'an, 210 BC",
    collection: 'world',
    eraLabel: 'Qin Dynasty',
    eraColor: '#A06038',
    bgPreview: '#E2C9A0',
    fact: "Emperor Qin Shi Huang ordered an army of over 8,000 life-sized clay soldiers to guard his tomb. Every face is different — no two warriors are alike.",
    Component: TerracottaWarriorSVG,
    readingLevel: { lexile: 800, gradeBand: '4–5', guidedReading: 'O', wordCount: 28, complexity: 'Challenging' },
    keyVocab: ['emperor', 'terracotta', 'tomb', 'dynasty', 'archaeologist'],
    standards: ['RI.4.4', 'RI.4.7', 'RI.4.1', 'SL.4.2'],
    regions: ['background','ridge','floor','boot-l','boot-r','pants-l','pants-r','tunic-skirt','belt','sash','buckle','chest-armor','shoulder-l','shoulder-r','arm-l','arm-r','hand-l','hand-r','collar','neck','face','hair-cap','topknot','headband','banner'],
    quest: {
      heading: 'Guardian of the Emperor',
      author: 'Qin Dynasty · 210 BC',
      lines: [
        'I am a soldier made of {0}.',
        'I was buried over two thousand {1} ago.',
        'I guard the tomb of the first Chinese {2}.',
      ],
      blanks: [
        { answer: 'clay',    choices: ['clay',    'cake',     'crayon',   'cloud']    },
        { answer: 'years',   choices: ['years',   'yawns',    'yo-yos',   'yards']    },
        { answer: 'emperor', choices: ['emperor', 'elephant', 'envelope', 'engineer'] },
      ],
      voice: {
        // Silent-soldier narrator — stoic, low
        hints: [/daniel/i, /bruce/i, /tom/i, /reed/i, /microsoft mark/i],
        rate: 0.72, pitch: 0.78,
      },
    },
  },
  {
    id: 'chinese-dragon',
    title: 'The Chinese Dragon',
    subtitle: 'Lunar New Year',
    collection: 'world',
    eraLabel: 'Lunar New Year',
    eraColor: '#D43A20',
    bgPreview: '#F3DDD0',
    fact: "In China, dragons are friendly — they bring rain, harvests, and good luck. At Lunar New Year, dancers run together inside a long dragon costume to scare away bad spirits.",
    Component: ChineseDragonSVG,
    readingLevel: { lexile: 700, gradeBand: '3–4', guidedReading: 'M', wordCount: 32, complexity: 'Moderate' },
    keyVocab: ['dragon', 'lantern', 'fortune', 'parade', 'festival'],
    standards: ['RL.3.2', 'RI.4.4', 'SL.3.2', 'L.4.4'],
    regions: ['sky','moon','lantern-1','lantern-1-top','lantern-1-bot','lantern-2','lantern-2-top','lantern-2-bot','lantern-3','lantern-3-top','lantern-3-bot','lantern-4','lantern-4-top','lantern-4-bot','tail-fin','body-5','body-4','body-3','body-2','body-1','head','horn-l','horn-r','mane-1','mane-2','mouth','banner'],
    quest: {
      heading: 'A Friendly Dragon',
      author: 'China · Lunar New Year',
      lines: [
        'In China, I bring good {0}.',
        'My body is long and painted {1}.',
        'I dance through the streets at Lunar New {2}.',
      ],
      blanks: [
        { answer: 'luck', choices: ['luck', 'lunch',  'lemons', 'laundry'] },
        { answer: 'red',  choices: ['red',  'rusty',  'rainy',  'rolling'] },
        { answer: 'Year', choices: ['Year', 'Yam',    'Yacht',  'Yawn']    },
      ],
      voice: {
        // Festive, bouncy narrator
        hints: [/samantha/i, /allison/i, /karen/i, /ava/i, /microsoft (aria|jenny|zira)/i],
        rate: 0.86, pitch: 1.08,
      },
    },
  },
  {
    id: 'forbidden-city',
    title: 'The Forbidden City',
    subtitle: 'Beijing, 1420',
    collection: 'world',
    eraLabel: 'Ming Dynasty',
    eraColor: '#D4A02A',
    bgPreview: '#F2DC9C',
    fact: "The Forbidden City was the emperor's home for nearly 500 years. It has 9,999 rooms, golden tile roofs, and pairs of stone lions guarding every gate.",
    Component: ForbiddenCitySVG,
    readingLevel: { lexile: 800, gradeBand: '4–5', guidedReading: 'O', wordCount: 26, complexity: 'Challenging' },
    keyVocab: ['emperor', 'palace', 'dynasty', 'imperial', 'forbidden'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.4.1', 'SL.4.2'],
    regions: ['sky','sun','cloud-l','cloud-r','hills','platform-1','platform-2','stairs','marble-ramp','wall','gate','gate-l','gate-r','window','roof-eave-lower','eave-tip-ll','eave-tip-lr','roof-mid-wall','roof-eave-upper','eave-tip-ul','eave-tip-ur','roof-peak','ridge-l','ridge-r','ridge-center','lantern-l','lantern-r','plaza','lion-l-body','lion-l-head','lion-l-base','lion-r-body','lion-r-head','lion-r-base','banner'],
    quest: {
      heading: 'Palace of the Emperor',
      author: 'Ming Dynasty · 1420',
      lines: [
        'I am a great palace with golden {0}.',
        'I was home to China\u2019s mighty {1}.',
        'I stand in the heart of the city of {2}.',
      ],
      blanks: [
        { answer: 'roofs',   choices: ['roofs',   'rugs',     'rocks',  'ropes']    },
        { answer: 'emperor', choices: ['emperor', 'elephant', 'engine', 'envelope'] },
        { answer: 'Beijing', choices: ['Beijing', 'Berry',    'Beanbag','Boots']    },
      ],
      voice: {
        // Stately ceremonial voice
        hints: [/daniel/i, /alex/i, /samantha/i, /serena/i, /microsoft (mark|aria|guy)/i],
        rate: 0.78, pitch: 0.92,
      },
    },
  },
];

if (window.PAGES_DATA && Array.isArray(window.PAGES_DATA)) {
  CHINA_PAGES.forEach(p => window.PAGES_DATA.push(p));
}

Object.assign(window, { ZhengHeShipSVG, TerracottaWarriorSVG, ChineseDragonSVG, ForbiddenCitySVG });
