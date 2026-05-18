// =================================================================
// Japanese history coloring pages — 4 additions:
//   • The Samurai Warrior (Feudal Japan)
//   • Mount Fuji with the Chureito Pagoda
//   • The Torii Gate of Itsukushima
//   • Hokusai's "Great Wave off Kanagawa"
// =================================================================

// ----- 31. SAMURAI WARRIOR -----
function SamuraiSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* background — shoji screen */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'background')} />
      {/* shoji grid — non-colorable */}
      {[140,260,380,500].map((x,i) => <line key={`sv-${i}`} x1={x} y1="20" x2={x} y2="460" stroke={STROKE} strokeWidth="1.2" />)}
      {[120,220,320,420].map((y,i) => <line key={`sh-${i}`} x1="20" y1={y} x2="580" y2={y} stroke={STROKE} strokeWidth="1.2" />)}

      {/* tatami floor */}
      <path d="M 20 460 L 580 460 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'tatami')} />
      {/* tatami mat seams */}
      <line x1="20" y1="500" x2="580" y2="500" stroke={STROKE} strokeWidth="1.4" />
      <line x1="20" y1="540" x2="580" y2="540" stroke={STROKE} strokeWidth="1.4" />
      <line x1="200" y1="460" x2="200" y2="580" stroke={STROKE} strokeWidth="1.4" />
      <line x1="400" y1="460" x2="400" y2="580" stroke={STROKE} strokeWidth="1.4" />

      {/* bamboo behind on left */}
      <rect x="60" y="60" width="14" height="380" {...reg(fills, onRegion, 'bamboo')} />
      {[120,180,240,300,360].map((y,i) => (
        <line key={`bn-${i}`} x1="60" y1={y} x2="74" y2={y} stroke={STROKE} strokeWidth="1.6" />
      ))}
      <path d="M 74 200 Q 110 192 130 180 Q 110 196 80 208 Z" {...reg(fills, onRegion, 'bamboo-leaf-1')} />
      <path d="M 74 280 Q 120 272 140 254 Q 116 274 80 288 Z" {...reg(fills, onRegion, 'bamboo-leaf-2')} />

      {/* cherry blossom branch top-right */}
      <path d="M 580 70 Q 520 80 470 120 Q 460 130 470 138 Q 510 110 580 100 Z" {...reg(fills, onRegion, 'branch')} />
      <g style={alive ? { animation: 'gentle-bob 3s ease-in-out infinite' } : null}>
        <circle cx="500" cy="100" r="9" {...reg(fills, onRegion, 'blossom-1')} />
        <circle cx="520" cy="118" r="8" {...reg(fills, onRegion, 'blossom-2')} />
        <circle cx="476" cy="124" r="7" {...reg(fills, onRegion, 'blossom-3')} />
        <circle cx="540" cy="92" r="7" {...reg(fills, onRegion, 'blossom-4')} />
        {/* petal center marks */}
        <circle cx="500" cy="100" r="2" fill={STROKE} stroke="none" />
        <circle cx="520" cy="118" r="2" fill={STROKE} stroke="none" />
        <circle cx="476" cy="124" r="2" fill={STROKE} stroke="none" />
        <circle cx="540" cy="92" r="2" fill={STROKE} stroke="none" />
      </g>

      {/* ---- SAMURAI (front view) ---- */}
      {/* feet — split-toe tabi & sandals */}
      <ellipse cx="270" cy="468" rx="22" ry="8" {...reg(fills, onRegion, 'foot-l')} />
      <ellipse cx="330" cy="468" rx="22" ry="8" {...reg(fills, onRegion, 'foot-r')} />
      {/* legs — hakama (wide armored trousers) */}
      <path d="M 232 360 L 268 360 L 280 458 L 250 458 Z" {...reg(fills, onRegion, 'hakama-l')} />
      <path d="M 332 360 L 368 360 L 350 458 L 320 458 Z" {...reg(fills, onRegion, 'hakama-r')} />
      {/* hakama center pleat */}
      <path d="M 268 360 L 332 360 L 320 458 L 280 458 Z" {...reg(fills, onRegion, 'hakama-c')} />
      <line x1="300" y1="364" x2="300" y2="454" stroke={STROKE} strokeWidth="1.4" />

      {/* kusazuri (skirt-armor panels — five hanging plates) */}
      {[-2,-1,0,1,2].map((i,k) => (
        <rect key={`ku-${k}`} x={300 + i*32 - 16} y="316" width="32" height="50" {...reg(fills, onRegion, `kusazuri-${k}`)} />
      ))}
      {/* lacing lines on kusazuri — non-colorable */}
      {[-2,-1,0,1,2].map((i,k) => (
        <g key={`kl-${k}`} stroke={STROKE} strokeWidth="1.2" fill="none">
          <line x1={300 + i*32 - 14} y1="328" x2={300 + i*32 + 14} y2="328" />
          <line x1={300 + i*32 - 14} y1="342" x2={300 + i*32 + 14} y2="342" />
          <line x1={300 + i*32 - 14} y1="356" x2={300 + i*32 + 14} y2="356" />
        </g>
      ))}

      {/* belt (obi) */}
      <rect x="232" y="304" width="136" height="18" {...reg(fills, onRegion, 'obi')} />
      {/* belt knot */}
      <rect x="284" y="308" width="32" height="14" {...reg(fills, onRegion, 'obi-knot')} />

      {/* dō (chest armor) — segmented horizontal plates */}
      <path d="M 232 226 L 368 226 L 368 304 L 232 304 Z" {...reg(fills, onRegion, 'do-plate')} />
      {/* plate seam lines */}
      <line x1="232" y1="252" x2="368" y2="252" stroke={STROKE} strokeWidth="1.6" />
      <line x1="232" y1="276" x2="368" y2="276" stroke={STROKE} strokeWidth="1.6" />
      {/* lacing dots */}
      {[244,272,300,328,356].map((x,i) => <circle key={`r1-${i}`} cx={x} cy="240" r="2.2" fill={STROKE} stroke="none" />)}
      {[244,272,300,328,356].map((x,i) => <circle key={`r2-${i}`} cx={x} cy="264" r="2.2" fill={STROKE} stroke="none" />)}
      {[244,272,300,328,356].map((x,i) => <circle key={`r3-${i}`} cx={x} cy="288" r="2.2" fill={STROKE} stroke="none" />)}
      {/* clan mon (crest) in center of chest */}
      <circle cx="300" cy="266" r="13" {...reg(fills, onRegion, 'mon')} />
      <path d="M 290 266 L 310 266 M 300 256 L 300 276 M 293 259 L 307 273 M 307 259 L 293 273" stroke={STROKE} strokeWidth="1.6" fill="none" />

      {/* sode (shoulder armor) */}
      <path d="M 196 226 L 240 226 L 240 290 L 196 290 Z" {...reg(fills, onRegion, 'sode-l')} />
      <line x1="196" y1="242" x2="240" y2="242" stroke={STROKE} strokeWidth="1.4" />
      <line x1="196" y1="258" x2="240" y2="258" stroke={STROKE} strokeWidth="1.4" />
      <line x1="196" y1="274" x2="240" y2="274" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 360 226 L 404 226 L 404 290 L 360 290 Z" {...reg(fills, onRegion, 'sode-r')} />
      <line x1="360" y1="242" x2="404" y2="242" stroke={STROKE} strokeWidth="1.4" />
      <line x1="360" y1="258" x2="404" y2="258" stroke={STROKE} strokeWidth="1.4" />
      <line x1="360" y1="274" x2="404" y2="274" stroke={STROKE} strokeWidth="1.4" />

      {/* arms (armored sleeves — kote) */}
      <path d="M 204 290 Q 196 320 200 360 L 220 360 Q 222 326 224 296 Z" {...reg(fills, onRegion, 'arm-l')} />
      <path d="M 396 290 Q 404 320 400 360 L 380 360 Q 378 326 376 296 Z" {...reg(fills, onRegion, 'arm-r')} />
      {/* hands */}
      <ellipse cx="210" cy="370" rx="10" ry="8" {...reg(fills, onRegion, 'hand-l')} />
      <ellipse cx="390" cy="370" rx="10" ry="8" {...reg(fills, onRegion, 'hand-r')} />

      {/* katana held at left side, blade tip toward ground */}
      {/* scabbard (saya) */}
      <path d="M 184 358 L 210 358 L 240 470 L 218 470 Z" {...reg(fills, onRegion, 'saya')} />
      <line x1="200" y1="392" x2="226" y2="392" stroke={STROKE} strokeWidth="1.4" />
      <line x1="206" y1="424" x2="232" y2="424" stroke={STROKE} strokeWidth="1.4" />
      {/* tsuba (guard) */}
      <ellipse cx="200" cy="356" rx="22" ry="6" {...reg(fills, onRegion, 'tsuba')} />
      {/* tsuka (hilt) */}
      <rect x="184" y="320" width="32" height="36" {...reg(fills, onRegion, 'tsuka')} />
      <line x1="184" y1="328" x2="216" y2="328" stroke={STROKE} strokeWidth="1.4" />
      <line x1="184" y1="338" x2="216" y2="338" stroke={STROKE} strokeWidth="1.4" />
      <line x1="184" y1="348" x2="216" y2="348" stroke={STROKE} strokeWidth="1.4" />
      {/* pommel */}
      <ellipse cx="200" cy="320" rx="16" ry="5" {...reg(fills, onRegion, 'pommel')} />

      {/* neck */}
      <path d="M 286 192 L 314 192 L 316 224 L 284 224 Z" {...reg(fills, onRegion, 'neck')} />

      {/* face (visible above mempo line) */}
      <ellipse cx="300" cy="172" rx="30" ry="32" {...reg(fills, onRegion, 'face')} />
      {/* eyes — fierce */}
      <path d="M 282 168 Q 290 162 298 168" fill="none" stroke={STROKE} strokeWidth="2.4" />
      <path d="M 302 168 Q 310 162 318 168" fill="none" stroke={STROKE} strokeWidth="2.4" />
      <circle cx="290" cy="172" r="2.4" fill={STROKE} stroke="none" />
      <circle cx="310" cy="172" r="2.4" fill={STROKE} stroke="none" />
      {/* eyebrows — angled, fierce */}
      <path d="M 278 158 L 296 156" stroke={STROKE} strokeWidth="3" fill="none" />
      <path d="M 304 156 L 322 158" stroke={STROKE} strokeWidth="3" fill="none" />
      {/* mempo (lower face mask) — covers nose & mouth */}
      <path d="M 274 180 Q 274 204 300 208 Q 326 204 326 180 Q 326 196 300 196 Q 274 196 274 180 Z" {...reg(fills, onRegion, 'mempo')} />
      {/* mempo mustache details */}
      <path d="M 282 196 Q 290 200 298 196" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M 302 196 Q 310 200 318 196" fill="none" stroke={STROKE} strokeWidth="1.6" />

      {/* ---- kabuto (helmet) ---- */}
      {/* helmet dome */}
      <path d="M 260 140 Q 260 92 300 86 Q 340 92 340 140 Z" {...reg(fills, onRegion, 'kabuto-dome')} />
      {/* shikoro (neck guard flaring out at sides under brim) */}
      <path d="M 248 140 Q 240 178 252 196 L 270 192 L 270 140 Z" {...reg(fills, onRegion, 'shikoro-l')} />
      <path d="M 352 140 Q 360 178 348 196 L 330 192 L 330 140 Z" {...reg(fills, onRegion, 'shikoro-r')} />
      {/* helmet brim (front) */}
      <path d="M 256 138 L 344 138 L 340 152 L 260 152 Z" {...reg(fills, onRegion, 'kabuto-brim')} />

      {/* kuwagata (horns) — curving up and outward */}
      <g style={alive ? { animation: 'glow-pulse 2.6s ease-in-out infinite' } : null}>
        <path d="M 268 110 Q 240 86 224 56 Q 246 76 268 96 Z" {...reg(fills, onRegion, 'horn-l')} />
        <path d="M 332 110 Q 360 86 376 56 Q 354 76 332 96 Z" {...reg(fills, onRegion, 'horn-r')} />
      </g>
      {/* maedate — central front crest (sun disc) */}
      <circle cx="300" cy="112" r="12" {...reg(fills, onRegion, 'maedate')} />

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>侍 · THE SAMURAI</text>
    </svg>
  );
}

// ----- 32. MOUNT FUJI WITH PAGODA & CHERRY BLOSSOMS -----
function MountFujiSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* rising sun */}
      <g style={alive ? { animation: 'sun-pulse 3s ease-in-out infinite', transformOrigin: '450px 130px' } : null}>
        <circle cx="450" cy="130" r="48" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* sun rays — non-colorable */}
      {Array.from({length:10}).map((_,i)=>{
        const a = -Math.PI/2 + i*0.32 - 0.8;
        const x1 = 450 + Math.cos(a)*60, y1 = 130 + Math.sin(a)*60;
        const x2 = 450 + Math.cos(a)*86, y2 = 130 + Math.sin(a)*86;
        return <line key={`sr-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={STROKE} strokeWidth="2" />;
      })}
      {/* clouds */}
      <path d="M 60 200 Q 60 178 86 178 Q 90 162 116 162 Q 142 162 146 178 Q 172 178 172 200 Z" {...reg(fills, onRegion, 'cloud-l')} />
      <path d="M 380 240 Q 380 220 402 220 Q 406 206 426 206 Q 446 206 450 220 Q 470 220 470 240 Z" {...reg(fills, onRegion, 'cloud-r')} />

      {/* foothills */}
      <path d="M 20 400 Q 100 360 200 396 Q 300 360 400 396 Q 500 360 580 400 L 580 460 L 20 460 Z" {...reg(fills, onRegion, 'hills')} />

      {/* ---- Mount Fuji ---- */}
      {/* main slope */}
      <path d="M 100 440 Q 180 380 240 320 L 360 320 Q 420 380 500 440 Z" {...reg(fills, onRegion, 'fuji-slope')} />
      {/* shaded side */}
      <path d="M 300 180 L 360 320 L 420 380 L 500 440 L 300 440 Z" {...reg(fills, onRegion, 'fuji-shade')} />
      {/* peak */}
      <path d="M 240 320 L 300 180 L 360 320 Z" {...reg(fills, onRegion, 'fuji-peak')} />
      {/* snow cap — three jagged streaks */}
      <path d="M 264 280 L 280 244 L 290 268 L 298 232 L 308 264 L 320 240 L 336 280 L 332 296 L 270 296 Z" {...reg(fills, onRegion, 'snow-cap')} />

      {/* lake reflection */}
      <path d="M 20 460 L 580 460 L 580 510 L 20 510 Z" {...reg(fills, onRegion, 'lake')} />
      <path d="M 60 482 Q 90 478 120 482" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 220 488 Q 250 484 280 488" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 380 482 Q 410 478 440 482" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* near grass */}
      <path d="M 20 510 L 580 510 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'ground')} />

      {/* ---- Chureito pagoda — 5-tier ---- */}
      <g transform="translate(110, 410)">
        {/* spire */}
        <line x1="0" y1="-160" x2="0" y2="-186" stroke={STROKE} strokeWidth="2.4" />
        <circle cx="0" cy="-188" r="3" fill={STROKE} stroke="none" />
        {/* tier 1 (top) */}
        <polygon points="-22,-160 22,-160 14,-172 -14,-172" {...reg(fills, onRegion, 'pagoda-roof-1')} />
        <rect x="-10" y="-160" width="20" height="18" {...reg(fills, onRegion, 'pagoda-body-1')} />
        {/* tier 2 */}
        <polygon points="-30,-142 30,-142 20,-156 -20,-156" {...reg(fills, onRegion, 'pagoda-roof-2')} />
        <rect x="-13" y="-142" width="26" height="22" {...reg(fills, onRegion, 'pagoda-body-2')} />
        {/* tier 3 */}
        <polygon points="-38,-120 38,-120 26,-136 -26,-136" {...reg(fills, onRegion, 'pagoda-roof-3')} />
        <rect x="-16" y="-120" width="32" height="22" {...reg(fills, onRegion, 'pagoda-body-3')} />
        {/* tier 4 */}
        <polygon points="-46,-98 46,-98 32,-114 -32,-114" {...reg(fills, onRegion, 'pagoda-roof-4')} />
        <rect x="-19" y="-98" width="38" height="22" {...reg(fills, onRegion, 'pagoda-body-4')} />
        {/* tier 5 (bottom) */}
        <polygon points="-54,-76 54,-76 38,-92 -38,-92" {...reg(fills, onRegion, 'pagoda-roof-5')} />
        <rect x="-22" y="-76" width="44" height="28" {...reg(fills, onRegion, 'pagoda-body-5')} />
        {/* base */}
        <rect x="-28" y="-48" width="56" height="14" {...reg(fills, onRegion, 'pagoda-base')} />
        {/* door */}
        <rect x="-8" y="-72" width="16" height="24" fill={STROKE} stroke="none" opacity="0.6" />
      </g>

      {/* crane flying */}
      <g style={alive ? { animation: 'gentle-bob 2.6s ease-in-out infinite' } : null}>
        <path d="M 260 110 Q 268 102 280 110 Q 288 102 300 110 L 300 116 Q 288 112 280 116 Q 268 112 260 116 Z" {...reg(fills, onRegion, 'crane')} />
        {/* head & legs */}
        <line x1="300" y1="112" x2="316" y2="108" stroke={STROKE} strokeWidth="2" />
        <circle cx="316" cy="108" r="2" fill={STROKE} stroke="none" />
        <line x1="270" y1="116" x2="266" y2="124" stroke={STROKE} strokeWidth="1.4" />
        <line x1="276" y1="116" x2="272" y2="124" stroke={STROKE} strokeWidth="1.4" />
      </g>

      {/* cherry blossom branch — foreground bottom-right */}
      <path d="M 580 540 Q 510 520 460 540 Q 510 528 580 552 Z" {...reg(fills, onRegion, 'branch')} />
      <g style={alive ? { animation: 'wave-flag 3s ease-in-out infinite', transformOrigin: '500px 540px' } : null}>
        <circle cx="500" cy="526" r="10" {...reg(fills, onRegion, 'blossom-1')} />
        <circle cx="476" cy="544" r="10" {...reg(fills, onRegion, 'blossom-2')} />
        <circle cx="528" cy="544" r="9" {...reg(fills, onRegion, 'blossom-3')} />
        <circle cx="508" cy="556" r="8" {...reg(fills, onRegion, 'blossom-4')} />
        <circle cx="464" cy="528" r="7" {...reg(fills, onRegion, 'blossom-5')} />
        {[[500,526],[476,544],[528,544],[508,556],[464,528]].map((p,i)=>(
          <g key={`pm-${i}`}>
            {[0,1,2,3,4].map(k => {
              const a = (k * Math.PI * 2) / 5 - Math.PI/2;
              return <line key={k} x1={p[0]} y1={p[1]} x2={p[0]+Math.cos(a)*5} y2={p[1]+Math.sin(a)*5} stroke={STROKE} strokeWidth="1" />;
            })}
            <circle cx={p[0]} cy={p[1]} r="1.4" fill={STROKE} stroke="none" />
          </g>
        ))}
      </g>

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="18" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>富士山 · MOUNT FUJI</text>
    </svg>
  );
}

// ----- 33. THE TORII GATE — Itsukushima Shrine -----
function ToriiGateSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun */}
      <g style={alive ? { animation: 'sun-pulse 2.8s ease-in-out infinite', transformOrigin: '120px 100px' } : null}>
        <circle cx="120" cy="100" r="38" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* clouds */}
      <path d="M 380 90 Q 380 70 402 70 Q 408 56 428 56 Q 448 56 452 70 Q 472 70 472 90 Z" {...reg(fills, onRegion, 'cloud-1')} />
      <path d="M 60 200 Q 60 184 80 184 Q 86 170 102 170 Q 118 170 122 184 Q 142 184 142 200 Z" {...reg(fills, onRegion, 'cloud-2')} />

      {/* far mountain (Mt. Misen behind shrine) */}
      <polygon points="20,360 140,200 260,360" {...reg(fills, onRegion, 'mountain-l')} />
      <polygon points="340,360 460,180 580,360" {...reg(fills, onRegion, 'mountain-r')} />
      {/* tree silhouettes on mountains */}
      {[80,110,170,200,420,460,510].map((x,i) => (
        <path key={`t-${i}`} d={`M ${x} 320 L ${x-6} 330 L ${x+6} 330 Z M ${x} 326 L ${x-8} 340 L ${x+8} 340 Z`} fill={STROKE} stroke="none" opacity="0.35" />
      ))}

      {/* sea */}
      <path d="M 20 360 L 580 360 L 580 520 L 20 520 Z" {...reg(fills, onRegion, 'sea')} />
      {/* sea wave lines — non-colorable */}
      <path d="M 40 400 Q 80 392 120 400 Q 160 408 200 400" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M 240 410 Q 280 402 320 410 Q 360 418 400 410" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M 440 400 Q 480 392 520 400 Q 540 408 560 400" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M 60 450 Q 100 444 140 450 Q 180 456 220 450" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 360 460 Q 400 454 440 460 Q 480 466 520 460" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* sandy bank */}
      <path d="M 20 520 L 580 520 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'shore')} />

      {/* ---- TORII GATE ---- */}
      {/* main upper crossbeam (kasagi) — curved with upturned ends */}
      <path d="M 130 218 Q 300 196 470 218 L 478 244 Q 300 222 122 244 Z" {...reg(fills, onRegion, 'kasagi')} />
      {/* kasagi upturned tips */}
      <path d="M 122 244 L 100 240 L 108 224 L 130 226 Z" {...reg(fills, onRegion, 'kasagi-tip-l')} />
      <path d="M 478 244 L 500 240 L 492 224 L 470 226 Z" {...reg(fills, onRegion, 'kasagi-tip-r')} />
      {/* nuki (second beam below) */}
      <rect x="156" y="262" width="288" height="22" {...reg(fills, onRegion, 'nuki')} />
      {/* center support post connecting beams */}
      <rect x="294" y="244" width="12" height="20" {...reg(fills, onRegion, 'support')} />
      {/* gakuzuka (center plaque between beams above nuki) */}
      <rect x="282" y="226" width="36" height="40" {...reg(fills, onRegion, 'plaque')} />
      <text x="300" y="248" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="22" fontWeight="900" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>神</text>

      {/* left pillar */}
      <path d="M 156 284 L 198 284 L 196 460 L 158 460 Z" {...reg(fills, onRegion, 'pillar-l')} />
      {/* right pillar */}
      <path d="M 402 284 L 444 284 L 442 460 L 404 460 Z" {...reg(fills, onRegion, 'pillar-r')} />
      {/* metal collar bands */}
      <rect x="156" y="288" width="42" height="8" {...reg(fills, onRegion, 'collar-l-top')} />
      <rect x="156" y="448" width="42" height="12" {...reg(fills, onRegion, 'collar-l-bot')} />
      <rect x="402" y="288" width="42" height="8" {...reg(fills, onRegion, 'collar-r-top')} />
      <rect x="402" y="448" width="42" height="12" {...reg(fills, onRegion, 'collar-r-bot')} />
      {/* small support struts (nukiae) on outer pillars */}
      <rect x="142" y="324" width="14" height="60" {...reg(fills, onRegion, 'strut-l')} />
      <rect x="444" y="324" width="14" height="60" {...reg(fills, onRegion, 'strut-r')} />

      {/* reflection in water — non-colorable strokes */}
      <g opacity="0.45">
        <line x1="158" y1="460" x2="160" y2="510" stroke={STROKE} strokeWidth="2" />
        <line x1="196" y1="460" x2="198" y2="510" stroke={STROKE} strokeWidth="2" />
        <line x1="404" y1="460" x2="402" y2="510" stroke={STROKE} strokeWidth="2" />
        <line x1="442" y1="460" x2="440" y2="510" stroke={STROKE} strokeWidth="2" />
      </g>

      {/* boat in distance */}
      <g style={alive ? { animation: 'gentle-bob 2.6s ease-in-out infinite' } : null} transform="translate(60, 444)">
        <path d="M 0 0 L 50 0 L 42 12 L 6 12 Z" {...reg(fills, onRegion, 'boat')} />
        <line x1="22" y1="0" x2="22" y2="-22" stroke={STROKE} strokeWidth="2" />
        <path d="M 22 -22 L 42 -2 L 22 -2 Z" {...reg(fills, onRegion, 'boat-sail')} />
      </g>

      {/* seagulls */}
      <path d="M 360 130 Q 368 122 376 130 Q 384 122 392 130" fill="none" stroke={STROKE} strokeWidth="2" />
      <path d="M 480 160 Q 486 154 492 160 Q 498 154 504 160" fill="none" stroke={STROKE} strokeWidth="2" />

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>ITSUKUSHIMA SHRINE · 1168</text>
    </svg>
  );
}

// ----- 34. THE GREAT WAVE OFF KANAGAWA — Hokusai, c. 1831 -----
function GreatWaveSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky panel */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* small distant clouds */}
      <path d="M 380 90 Q 380 74 398 74 Q 404 62 422 62 Q 440 62 444 74 Q 462 74 462 90 Z" {...reg(fills, onRegion, 'cloud')} />

      {/* ---- Mount Fuji small in distance (center-back) ---- */}
      <polygon points="240,300 320,170 400,300" {...reg(fills, onRegion, 'fuji')} />
      <path d="M 290 230 L 304 198 L 314 220 L 322 188 L 330 218 L 340 198 L 354 232 L 348 248 L 296 248 Z" {...reg(fills, onRegion, 'fuji-snow')} />

      {/* sea base */}
      <path d="M 20 320 Q 200 332 400 318 Q 500 330 580 320 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'sea-base')} />

      {/* ---- The Great Wave (left side) ---- */}
      <g style={alive ? { animation: 'gentle-bob 3s ease-in-out infinite' } : null}>
        {/* main wave body (the curling crest) */}
        <path d="M 20 380 Q 60 240 200 200 Q 340 180 440 280 Q 380 320 320 300 Q 260 280 240 320 Q 200 360 160 360 Q 110 360 84 396 Q 60 432 20 440 Z"
              {...reg(fills, onRegion, 'wave-body')} />
        {/* inner wave (lighter trough) */}
        <path d="M 200 232 Q 270 220 340 240 Q 380 260 360 290 Q 320 260 270 260 Q 220 260 200 290 Z"
              {...reg(fills, onRegion, 'wave-inner')} />

        {/* foam claws curling over (Hokusai's signature tendrils) */}
        <path d="M 420 274 Q 430 244 408 224 Q 416 250 400 268 Z" {...reg(fills, onRegion, 'foam-1')} />
        <path d="M 380 256 Q 386 232 370 218 Q 376 240 364 254 Z" {...reg(fills, onRegion, 'foam-2')} />
        <path d="M 336 248 Q 340 226 326 214 Q 330 234 322 246 Z" {...reg(fills, onRegion, 'foam-3')} />
        <path d="M 296 240 Q 298 218 286 208 Q 290 226 284 240 Z" {...reg(fills, onRegion, 'foam-4')} />
        <path d="M 256 240 Q 254 220 240 212 Q 246 230 244 242 Z" {...reg(fills, onRegion, 'foam-5')} />
        <path d="M 216 248 Q 210 230 196 222 Q 206 240 204 252 Z" {...reg(fills, onRegion, 'foam-6')} />
        <path d="M 176 264 Q 168 246 154 240 Q 166 258 164 268 Z" {...reg(fills, onRegion, 'foam-7')} />
        <path d="M 138 286 Q 128 270 114 264 Q 126 282 126 292 Z" {...reg(fills, onRegion, 'foam-8')} />
      </g>

      {/* secondary smaller wave on right */}
      <g style={alive ? { animation: 'gentle-bob 2.6s ease-in-out infinite', animationDelay: '0.3s' } : null}>
        <path d="M 420 380 Q 470 340 540 340 Q 580 350 580 380 Q 540 410 480 410 Q 440 410 420 380 Z" {...reg(fills, onRegion, 'wave-2')} />
        <path d="M 540 358 Q 552 348 568 354 Q 562 364 548 364 Z" {...reg(fills, onRegion, 'foam-r-1')} />
        <path d="M 500 364 Q 514 354 530 360 Q 522 372 508 372 Z" {...reg(fills, onRegion, 'foam-r-2')} />
      </g>

      {/* third wave further right */}
      <g style={alive ? { animation: 'gentle-bob 3s ease-in-out infinite', animationDelay: '0.6s' } : null}>
        <path d="M 360 460 Q 440 420 540 430 Q 580 438 580 460 Q 520 480 440 478 Q 380 478 360 460 Z" {...reg(fills, onRegion, 'wave-3')} />
      </g>

      {/* ---- Boats (oshiokuri-bune) with rowers ---- */}
      <g style={alive ? { animation: 'gentle-bob 2.8s ease-in-out infinite' } : null} transform="translate(140, 380)">
        {/* boat hull — long & slender */}
        <path d="M 0 0 Q 60 -10 130 0 L 124 18 Q 60 24 6 18 Z" {...reg(fills, onRegion, 'boat-1')} />
        {/* hull plank lines */}
        <line x1="6" y1="6" x2="124" y2="6" stroke={STROKE} strokeWidth="1.4" />
        <line x1="8" y1="12" x2="122" y2="12" stroke={STROKE} strokeWidth="1.4" />
        {/* rowers — 4 small huddled figures */}
        {[24,52,80,108].map((x,i) => (
          <g key={`r1-${i}`}>
            <ellipse cx={x} cy="-12" rx="6" ry="10" {...reg(fills, onRegion, `rower1-${i}`)} />
            <circle cx={x} cy="-22" r="4" fill={STROKE} stroke="none" />
          </g>
        ))}
      </g>

      <g style={alive ? { animation: 'gentle-bob 3.2s ease-in-out infinite', animationDelay: '0.4s' } : null} transform="translate(280, 430)">
        <path d="M 0 0 Q 50 -8 110 0 L 104 16 Q 50 22 6 16 Z" {...reg(fills, onRegion, 'boat-2')} />
        <line x1="6" y1="6" x2="104" y2="6" stroke={STROKE} strokeWidth="1.4" />
        {[22,48,74,98].map((x,i) => (
          <g key={`r2-${i}`}>
            <ellipse cx={x} cy="-10" rx="5" ry="8" {...reg(fills, onRegion, `rower2-${i}`)} />
            <circle cx={x} cy="-18" r="3" fill={STROKE} stroke="none" />
          </g>
        ))}
      </g>

      {/* tiny foam droplets in sky (Hokusai's flecks) */}
      {[[260,164],[300,156],[340,162],[380,160],[220,180],[180,176],[400,180],[420,196]].map((p,i)=>(
        <circle key={`fd-${i}`} cx={p[0]} cy={p[1]} r="2.4" fill={STROKE} stroke="none" />
      ))}

      {/* banner */}
      <rect x="160" y="540" width="280" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>THE GREAT WAVE · 北斎</text>
    </svg>
  );
}

// ============================================================
// Page entries
// ============================================================
const JAPAN_PAGES = [
  {
    id: 'samurai',
    title: 'The Samurai',
    subtitle: 'Way of the Warrior',
    collection: 'world',
    eraLabel: 'Feudal Japan',
    eraColor: '#7A1A18',
    bgPreview: '#E8DDC8',
    fact: "Samurai trained from childhood in both sword-fighting and poetry. Their armor was made from hundreds of small iron plates laced together with silk cord, light enough to ride a horse in.",
    Component: SamuraiSVG,
    readingLevel: { lexile: 800, gradeBand: '4–5', guidedReading: 'O', wordCount: 26, complexity: 'Challenging' },
    keyVocab: ['samurai', 'katana', 'shogun', 'honor', 'kabuto'],
    standards: ['RI.4.4', 'RI.4.1', 'L.4.4', 'SL.4.2'],
    regions: ['background','bamboo','bamboo-leaf-1','bamboo-leaf-2','branch','blossom-1','blossom-2','blossom-3','blossom-4','tatami','foot-l','foot-r','hakama-l','hakama-r','hakama-c','kusazuri-0','kusazuri-1','kusazuri-2','kusazuri-3','kusazuri-4','obi','obi-knot','do-plate','mon','sode-l','sode-r','arm-l','arm-r','hand-l','hand-r','saya','tsuba','tsuka','pommel','neck','face','mempo','kabuto-dome','shikoro-l','shikoro-r','kabuto-brim','horn-l','horn-r','maedate','banner'],
    quest: {
      heading: 'The Code of the Warrior',
      author: 'Feudal Japan · Bushidō',
      lines: [
        'I am a brave Japanese {0}.',
        'My sharp curved sword is called a {1}.',
        'My great helmet is the {2}.',
      ],
      blanks: [
        { answer: 'samurai', choices: ['samurai', 'sandwich', 'sailor',   'snowman'] },
        { answer: 'katana',  choices: ['katana',  'kitten',   'kayak',    'kazoo']   },
        { answer: 'kabuto',  choices: ['kabuto',  'koala',    'kimono',   'kiwi']    },
      ],
      voice: {
        // Stern, controlled, slightly formal
        hints: [/daniel/i, /alex/i, /tom/i, /bruce/i, /reed/i, /microsoft (mark|guy)/i],
        rate: 0.74, pitch: 0.84,
      },
    },
  },
  {
    id: 'mount-fuji',
    title: 'Mount Fuji',
    subtitle: 'Land of the Rising Sun',
    collection: 'world',
    eraLabel: 'Edo Period',
    eraColor: '#3B6BA5',
    bgPreview: '#F7DCDA',
    fact: "Mount Fuji is the tallest mountain in Japan and is actually a sleeping volcano. People have climbed its 12,388-foot peak for over 1,300 years to watch the sunrise from the summit.",
    Component: MountFujiSVG,
    readingLevel: { lexile: 720, gradeBand: '3–4', guidedReading: 'N', wordCount: 24, complexity: 'Moderate' },
    keyVocab: ['volcano', 'sacred', 'blossom', 'pagoda'],
    standards: ['RI.3.7', 'RI.3.4', 'RI.4.1', 'SL.3.2'],
    regions: ['sky','sun','cloud-l','cloud-r','hills','fuji-slope','fuji-shade','fuji-peak','snow-cap','lake','ground','pagoda-roof-1','pagoda-body-1','pagoda-roof-2','pagoda-body-2','pagoda-roof-3','pagoda-body-3','pagoda-roof-4','pagoda-body-4','pagoda-roof-5','pagoda-body-5','pagoda-base','crane','branch','blossom-1','blossom-2','blossom-3','blossom-4','blossom-5','banner'],
    quest: {
      heading: 'The Sacred Mountain',
      author: 'Japan · Edo Period',
      lines: [
        'I am the tallest mountain in {0}.',
        'My peak is covered in white {1}.',
        'In spring, pink {2} trees bloom at my feet.',
      ],
      blanks: [
        { answer: 'Japan',  choices: ['Japan',  'Jelly',    'June',     'Juice']   },
        { answer: 'snow',   choices: ['snow',   'soup',     'socks',    'song']    },
        { answer: 'cherry', choices: ['cherry', 'cheese',   'chocolate','chair']   },
      ],
      voice: {
        // Soft, calm, reverent
        hints: [/samantha/i, /karen/i, /ava/i, /allison/i, /microsoft (aria|jenny)/i, /susan/i],
        rate: 0.80, pitch: 1.00,
      },
    },
  },
  {
    id: 'torii-gate',
    title: 'The Floating Torii',
    subtitle: 'Itsukushima Shrine',
    collection: 'world',
    eraLabel: 'Shinto Tradition',
    eraColor: '#C8102E',
    bgPreview: '#D6E8EE',
    fact: "The great red torii gate at Itsukushima Shrine has stood in the sea for over 850 years. At low tide, you can walk right up to it; at high tide, it looks like it floats on the water.",
    Component: ToriiGateSVG,
    readingLevel: { lexile: 760, gradeBand: '3–4', guidedReading: 'N', wordCount: 30, complexity: 'Moderate' },
    keyVocab: ['shrine', 'sacred', 'torii', 'tide', 'Shinto'],
    standards: ['RI.4.7', 'RI.4.4', 'RI.3.7', 'SL.4.2'],
    regions: ['sky','sun','cloud-1','cloud-2','mountain-l','mountain-r','sea','shore','kasagi','kasagi-tip-l','kasagi-tip-r','nuki','support','plaque','pillar-l','pillar-r','collar-l-top','collar-l-bot','collar-r-top','collar-r-bot','strut-l','strut-r','boat','boat-sail','banner'],
    quest: {
      heading: 'Gate of the Spirits',
      author: 'Japan · Shinto Shrine',
      lines: [
        'I am a great wooden gate painted {0}.',
        'I stand in the salty {1}.',
        'I welcome visitors to a holy {2}.',
      ],
      blanks: [
        { answer: 'red',    choices: ['red',    'rainbow', 'rusty',  'rocky']  },
        { answer: 'sea',    choices: ['sea',    'snow',    'sand',   'street'] },
        { answer: 'shrine', choices: ['shrine', 'shoe',    'shovel', 'shark']  },
      ],
      voice: {
        // Gentle, ceremonial
        hints: [/samantha/i, /karen/i, /ava/i, /allison/i, /microsoft (aria|jenny|zira)/i],
        rate: 0.78, pitch: 0.98,
      },
    },
  },
  {
    id: 'great-wave',
    title: 'The Great Wave',
    subtitle: 'A Hokusai Masterpiece',
    collection: 'world',
    eraLabel: 'Edo Period Art',
    eraColor: '#1F4E7F',
    bgPreview: '#E8DCBE',
    fact: "Katsushika Hokusai carved \u201CThe Great Wave off Kanagawa\u201D into wooden blocks around 1831. It is one of the most famous artworks in the world — and Mount Fuji is hiding right in the middle.",
    Component: GreatWaveSVG,
    readingLevel: { lexile: 820, gradeBand: '4–5', guidedReading: 'P', wordCount: 30, complexity: 'Challenging' },
    keyVocab: ['woodblock', 'print', 'crest', 'kana', 'masterpiece'],
    standards: ['RI.4.7', 'RI.4.4', 'L.4.4', 'SL.4.2'],
    regions: ['sky','cloud','fuji','fuji-snow','sea-base','wave-body','wave-inner','foam-1','foam-2','foam-3','foam-4','foam-5','foam-6','foam-7','foam-8','wave-2','foam-r-1','foam-r-2','wave-3','boat-1','rower1-0','rower1-1','rower1-2','rower1-3','boat-2','rower2-0','rower2-1','rower2-2','rower2-3','banner'],
    quest: {
      heading: 'A Print of the Sea',
      author: 'Katsushika Hokusai · c. 1831',
      lines: [
        'I am a famous print made by {0}.',
        'I crash near the country of {1}.',
        'Hidden behind me you can spot Mount {2}.',
      ],
      blanks: [
        { answer: 'Hokusai', choices: ['Hokusai', 'Hammer',  'Hamster', 'Hopscotch'] },
        { answer: 'Japan',   choices: ['Japan',   'Jelly',   'Jacket',  'Jeep']      },
        { answer: 'Fuji',    choices: ['Fuji',    'Fudge',   'Fern',    'Floor']     },
      ],
      voice: {
        // Awe-struck art-curator voice
        hints: [/daniel/i, /samantha/i, /alex/i, /ava/i, /microsoft (mark|aria)/i],
        rate: 0.78, pitch: 0.94,
      },
    },
  },
];

if (window.PAGES_DATA && Array.isArray(window.PAGES_DATA)) {
  JAPAN_PAGES.forEach(p => window.PAGES_DATA.push(p));
}

Object.assign(window, { SamuraiSVG, MountFujiSVG, ToriiGateSVG, GreatWaveSVG });
