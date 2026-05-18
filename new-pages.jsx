// =================================================================
// Additional History Coloring Books pages.
// Each component renders a 600×600 SVG with named regions. Page
// entries are pushed onto window.PAGES_DATA so the rest of the app
// (library, dashboard, coloring screen) picks them up automatically.
// =================================================================

// ----- 7. APOLLO 11 — Moon Landing, 1969 -----
function ApolloSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* black space background */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'space')} />
      {/* stars */}
      <g style={alive ? { animation: 'twinkle 1.6s ease-in-out infinite' } : null}>
        <StarShape cx={90}  cy={70}  size={10} id="star-1" fills={fills} onRegion={onRegion} />
        <StarShape cx={510} cy={90}  size={9}  id="star-2" fills={fills} onRegion={onRegion} />
        <StarShape cx={460} cy={180} size={7}  id="star-3" fills={fills} onRegion={onRegion} />
        <StarShape cx={140} cy={150} size={7}  id="star-4" fills={fills} onRegion={onRegion} />
        <StarShape cx={60}  cy={260} size={6}  id="star-5" fills={fills} onRegion={onRegion} />
      </g>
      {/* earth in distance */}
      <g style={alive ? { animation: 'gentle-bob 4s ease-in-out infinite' } : null}>
        <circle cx="500" cy="200" r="48" {...reg(fills, onRegion, 'earth-sea')} />
        <path d="M 466 184 Q 480 178 488 192 L 484 214 Q 472 220 462 210 Z" {...reg(fills, onRegion, 'earth-land-1')} />
        <path d="M 512 224 Q 530 226 532 240 L 520 246 Q 506 240 504 230 Z" {...reg(fills, onRegion, 'earth-land-2')} />
      </g>
      {/* moon surface */}
      <path d="M 20 460 Q 300 380 580 460 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'moon-ground')} />
      {/* craters */}
      <ellipse cx="120" cy="490" rx="22" ry="8" {...reg(fills, onRegion, 'crater-1')} />
      <ellipse cx="460" cy="500" rx="32" ry="10" {...reg(fills, onRegion, 'crater-2')} />
      <ellipse cx="260" cy="522" rx="14" ry="5" {...reg(fills, onRegion, 'crater-3')} />
      {/* boot print */}
      <ellipse cx="200" cy="478" rx="10" ry="5" {...reg(fills, onRegion, 'bootprint')} />
      {/* lunar lander */}
      <g transform="translate(400, 300)">
        <polygon points="-50,80 50,80 70,40 50,0 -50,0 -70,40" {...reg(fills, onRegion, 'lander-base')} />
        <polygon points="-30,0 30,0 36,-44 -36,-44" {...reg(fills, onRegion, 'lander-top')} />
        <rect x="-10" y="-32" width="20" height="20" {...reg(fills, onRegion, 'lander-window')} />
        <line x1="0" y1="-44" x2="0" y2="-78" stroke={STROKE} strokeWidth="2" />
        <circle cx="0" cy="-82" r="6" {...reg(fills, onRegion, 'lander-antenna')} />
        <path d="M -50 80 L -78 128 L -88 128 L -64 76 Z" {...reg(fills, onRegion, 'lander-leg-l')} />
        <path d="M  50 80 L  78 128 L  88 128 L  64 76 Z" {...reg(fills, onRegion, 'lander-leg-r')} />
        <ellipse cx="-83" cy="130" rx="14" ry="5" {...reg(fills, onRegion, 'lander-pad-l')} />
        <ellipse cx=" 83" cy="130" rx="14" ry="5" {...reg(fills, onRegion, 'lander-pad-r')} />
      </g>
      {/* astronaut */}
      <g transform="translate(180, 340)">
        <ellipse cx="0" cy="40" rx="32" ry="50" {...reg(fills, onRegion, 'astro-suit')} />
        <circle cx="0" cy="-10" r="26" {...reg(fills, onRegion, 'astro-helmet')} />
        {/* visor */}
        <path d="M -16 -16 Q 0 -28 16 -16 Q 18 -2 0 4 Q -18 -2 -16 -16 Z" fill="#1A1A22" stroke="none" />
        <path d="M -10 -18 Q -4 -22 0 -20" stroke="#FFC857" strokeWidth="2" fill="none" />
        <path d="M -28 20 Q -50 30 -52 56 L -42 60 Q -32 40 -22 36 Z" {...reg(fills, onRegion, 'astro-arm-l')} />
        <path d="M  28 20 Q  50 12  56 -10 L 46 -14 Q 34 8 22 20 Z" {...reg(fills, onRegion, 'astro-arm-r')} />
        <rect x="-22" y="14" width="14" height="36" rx="2" {...reg(fills, onRegion, 'astro-pack')} />
      </g>
      {/* US flag */}
      <g style={alive ? { animation: 'wave-flag 2s ease-in-out infinite', transformOrigin: '270px 380px' } : null}>
        <line x1="270" y1="280" x2="270" y2="462" stroke={STROKE} strokeWidth="3" />
        <rect x="270" y="280" width="80" height="50" {...reg(fills, onRegion, 'flag-fabric')} />
        <rect x="270" y="280" width="34" height="22" {...reg(fills, onRegion, 'flag-canton')} />
        <line x1="270" y1="295" x2="350" y2="295" stroke={STROKE} strokeWidth="1.4" />
        <line x1="270" y1="310" x2="350" y2="310" stroke={STROKE} strokeWidth="1.4" />
        <line x1="270" y1="325" x2="350" y2="325" stroke={STROKE} strokeWidth="1.4" />
      </g>
      {/* banner */}
      <rect x="180" y="522" width="240" height="40" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="548" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="20" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>APOLLO 11 · JULY 1969</text>
    </svg>
  );
}

// ----- 8. THE GREAT WALL OF CHINA -----
function GreatWallSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '120px 110px' } : null}>
        <circle cx="120" cy="110" r="38" {...reg(fills, onRegion, 'sun')} />
      </g>
      <path d="M 360 90 Q 360 70 382 70 Q 388 56 408 56 Q 428 56 432 70 Q 452 70 452 90 Z" {...reg(fills, onRegion, 'cloud')} />
      {/* far mountains */}
      <polygon points="60,360 180,200 300,360" {...reg(fills, onRegion, 'mountain-far-l')} />
      <polygon points="240,360 380,180 520,360" {...reg(fills, onRegion, 'mountain-far-r')} />
      {/* near hill */}
      <path d="M 20 460 Q 80 380 160 400 Q 240 360 320 400 Q 400 340 480 400 Q 540 360 580 420 L 580 540 L 20 540 Z" {...reg(fills, onRegion, 'mountain-near')} />
      {/* left tower */}
      <rect x="100" y="350" width="56" height="80" {...reg(fills, onRegion, 'tower-base-l')} />
      <path d="M 92 350 L 164 350 L 158 326 L 98 326 Z" {...reg(fills, onRegion, 'tower-cap-l')} />
      <path d="M 96 326 L 160 326 L 150 296 L 106 296 Z" {...reg(fills, onRegion, 'tower-roof-l')} />
      {/* connecting wall up */}
      <path d="M 156 430 L 360 320 L 360 360 L 156 470 Z" {...reg(fills, onRegion, 'wall-rise')} />
      {/* right tower */}
      <rect x="360" y="280" width="56" height="80" {...reg(fills, onRegion, 'tower-base-r')} />
      <path d="M 352 280 L 424 280 L 418 256 L 358 256 Z" {...reg(fills, onRegion, 'tower-cap-r')} />
      <path d="M 356 256 L 420 256 L 410 226 L 366 226 Z" {...reg(fills, onRegion, 'tower-roof-r')} />
      {/* wall down */}
      <path d="M 416 360 L 580 440 L 580 480 L 416 400 Z" {...reg(fills, onRegion, 'wall-fall')} />
      {/* battlements (non-colorable) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={170 + i * 22} y={425 - i * 11} width="8" height="4" fill={STROKE} stroke="none" />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <rect key={'r' + i} x={428 + i * 30} y={368 + i * 9} width="8" height="4" fill={STROKE} stroke="none" />
      ))}
      {/* lantern */}
      <line x1="450" y1="100" x2="450" y2="160" stroke={STROKE} strokeWidth="2" />
      <g style={alive ? { animation: 'gentle-bob 2.6s ease-in-out infinite' } : null}>
        <ellipse cx="450" cy="184" rx="22" ry="26" {...reg(fills, onRegion, 'lantern-body')} />
        <rect x="436" y="156" width="28" height="6" {...reg(fills, onRegion, 'lantern-cap')} />
        <path d="M 446 210 L 450 230 L 454 210 Z" {...reg(fills, onRegion, 'tassel')} />
      </g>
      {/* dragon banner */}
      <line x1="510" y1="540" x2="510" y2="404" stroke={STROKE} strokeWidth="3" />
      <g style={alive ? { animation: 'wave-flag 2.6s ease-in-out infinite', transformOrigin: '510px 422px' } : null}>
        <path d="M 510 404 L 578 414 Q 568 430 578 446 L 510 436 Z" {...reg(fills, onRegion, 'dragon-banner')} />
      </g>
      <rect x="180" y="510" width="240" height="42" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="538" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="19" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>長城 · GREAT WALL</text>
    </svg>
  );
}

// ----- 9. LEONARDO DA VINCI — Renaissance Workshop, c. 1503 -----
function LeonardoSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* warm wall */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'wall')} />
      {/* window */}
      <rect x="400" y="60" width="140" height="160" rx="6" {...reg(fills, onRegion, 'window-frame')} />
      <rect x="412" y="72" width="116" height="136" {...reg(fills, onRegion, 'window-sky')} />
      <path d="M 412 170 Q 450 152 478 162 Q 510 148 528 162 L 528 208 L 412 208 Z" {...reg(fills, onRegion, 'window-hill')} />
      <line x1="470" y1="72" x2="470" y2="208" stroke={STROKE} strokeWidth="2" />
      <line x1="412" y1="140" x2="528" y2="140" stroke={STROKE} strokeWidth="2" />
      {/* easel legs */}
      <line x1="160" y1="500" x2="200" y2="200" stroke={STROKE} strokeWidth="4" />
      <line x1="280" y1="500" x2="240" y2="200" stroke={STROKE} strokeWidth="4" />
      <line x1="220" y1="500" x2="220" y2="200" stroke={STROKE} strokeWidth="4" />
      <rect x="156" y="290" width="128" height="12" {...reg(fills, onRegion, 'easel-tray')} />
      {/* canvas */}
      <rect x="140" y="160" width="160" height="140" {...reg(fills, onRegion, 'canvas')} />
      <rect x="150" y="170" width="140" height="120" {...reg(fills, onRegion, 'portrait-bg')} />
      {/* portrait — abstracted */}
      <path d="M 174 282 Q 170 222 220 220 Q 270 222 266 282 Z" {...reg(fills, onRegion, 'portrait-dress')} />
      <ellipse cx="220" cy="220" rx="28" ry="34" {...reg(fills, onRegion, 'portrait-face')} />
      <path d="M 192 218 Q 192 188 220 184 Q 248 188 248 218 Q 248 234 240 252 Q 234 234 220 234 Q 206 234 200 252 Q 192 234 192 218 Z" {...reg(fills, onRegion, 'portrait-hair')} />
      <circle cx="211" cy="220" r="2" fill={STROKE} stroke="none" />
      <circle cx="229" cy="220" r="2" fill={STROKE} stroke="none" />
      <path d="M 210 234 Q 220 240 230 234" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* Leonardo */}
      <g transform="translate(420, 300)">
        <path d="M -40 200 Q -42 100 0 80 Q 42 100 40 200 Z" {...reg(fills, onRegion, 'leo-robe')} />
        <path d="M -36 110 Q -70 130 -88 170 L -78 180 Q -56 152 -32 138 Z" {...reg(fills, onRegion, 'leo-sleeve')} />
        <ellipse cx="0" cy="40" rx="26" ry="32" {...reg(fills, onRegion, 'leo-face')} />
        <path d="M -28 22 Q 0 -8 28 22 Q 30 28 0 28 Q -30 28 -28 22 Z" {...reg(fills, onRegion, 'leo-cap')} />
        <path d="M 18 14 Q 32 4 38 14 Q 28 24 18 20 Z" {...reg(fills, onRegion, 'leo-cap-feather')} />
        <path d="M -18 58 Q -16 90 0 96 Q 16 90 18 58 Q 8 74 0 74 Q -8 74 -18 58 Z" {...reg(fills, onRegion, 'leo-beard')} />
        <circle cx="-8" cy="42" r="2" fill={STROKE} stroke="none" />
        <circle cx="8" cy="42" r="2" fill={STROKE} stroke="none" />
        <path d="M -8 60 Q 0 64 8 60" fill="none" stroke={STROKE} strokeWidth="1.6" />
        <line x1="-88" y1="170" x2="-120" y2="200" stroke={STROKE} strokeWidth="3" />
        <ellipse cx="-124" cy="204" rx="6" ry="3" transform="rotate(-30 -124 204)" {...reg(fills, onRegion, 'leo-brush')} />
      </g>
      {/* desk */}
      <rect x="60" y="500" width="500" height="22" {...reg(fills, onRegion, 'desk')} />
      <line x1="60" y1="522" x2="80" y2="562" stroke={STROKE} strokeWidth="3" />
      <line x1="560" y1="522" x2="540" y2="562" stroke={STROKE} strokeWidth="3" />
      {/* notebook */}
      <path d="M 80 500 L 200 500 L 196 466 L 84 466 Z" {...reg(fills, onRegion, 'notebook')} />
      {/* sketch lines (non-colorable) */}
      <path d="M 100 488 Q 116 476 130 488 Q 144 478 158 488" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <circle cx="130" cy="480" r="3" fill="none" stroke={STROKE} strokeWidth="1.2" />
      {/* quill */}
      <line x1="240" y1="500" x2="270" y2="432" stroke={STROKE} strokeWidth="2" />
      <path d="M 270 432 Q 274 416 286 412 Q 282 422 280 432 Q 282 444 272 446 Z" {...reg(fills, onRegion, 'quill')} />
      {/* ink pot */}
      <rect x="300" y="478" width="36" height="22" {...reg(fills, onRegion, 'ink-pot')} />
      <ellipse cx="318" cy="478" rx="18" ry="4" {...reg(fills, onRegion, 'ink-pot-rim')} />
      {/* candle */}
      <rect x="350" y="470" width="14" height="30" {...reg(fills, onRegion, 'candle-stick')} />
      <line x1="357" y1="470" x2="357" y2="450" stroke={STROKE} strokeWidth="2" />
      <g style={alive ? { animation: 'flame-flicker 0.6s ease-in-out infinite', transformOrigin: '357px 446px' } : null}>
        <path d="M 357 452 Q 348 440 357 426 Q 366 440 357 452 Z" {...reg(fills, onRegion, 'candle-flame')} />
      </g>
      {/* banner */}
      <rect x="200" y="540" width="200" height="40" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="566" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="20" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>FIRENZE · 1503</text>
    </svg>
  );
}

// ----- 10. VIKING LONGSHIP — c. 900 AD -----
function VikingSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '486px 110px' } : null}>
        <circle cx="486" cy="110" r="34" {...reg(fills, onRegion, 'sun')} />
      </g>
      <path d="M 80 92 Q 80 72 102 72 Q 108 58 128 58 Q 148 58 152 72 Q 172 72 172 92 Z" {...reg(fills, onRegion, 'cloud')} />
      {/* sea */}
      <rect x="20" y="360" width="560" height="100" {...reg(fills, onRegion, 'sea-far')} />
      <path d="M 20 440 Q 100 430 180 440 Q 260 430 340 440 Q 420 430 500 440 Q 560 430 580 440 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'sea-near')} />
      <path d="M 60 470 Q 90 462 120 470" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M 200 490 Q 230 482 260 490" fill="none" stroke={STROKE} strokeWidth="1.6" />
      <path d="M 360 502 Q 390 494 420 502" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* mast */}
      <line x1="300" y1="160" x2="300" y2="440" stroke={STROKE} strokeWidth="4" />
      {/* sail */}
      <g style={alive ? { animation: 'wave-flag 3.4s ease-in-out infinite', transformOrigin: '300px 230px' } : null}>
        <path d="M 180 160 L 420 160 L 420 320 L 180 320 Z" {...reg(fills, onRegion, 'sail')} />
        <rect x="180" y="200" width="240" height="28" {...reg(fills, onRegion, 'sail-stripe-1')} />
        <rect x="180" y="252" width="240" height="28" {...reg(fills, onRegion, 'sail-stripe-2')} />
        <line x1="180" y1="160" x2="420" y2="160" stroke={STROKE} strokeWidth="2" />
      </g>
      {/* hull */}
      <path d="M 100 410 Q 300 458 500 410 L 480 460 L 120 460 Z" {...reg(fills, onRegion, 'hull')} />
      <rect x="120" y="410" width="360" height="10" {...reg(fills, onRegion, 'hull-rail')} />
      {/* dragon prow */}
      <path d="M 500 410 Q 540 400 540 380 Q 542 360 528 354 Q 542 348 538 332 Q 530 322 516 332 Q 510 320 498 326 L 504 410 Z" {...reg(fills, onRegion, 'dragon-prow')} />
      <circle cx="528" cy="346" r="3" fill={STROKE} stroke="none" />
      {/* dragon tail */}
      <path d="M 100 410 Q 64 400 60 384 Q 56 372 70 366 Q 60 358 70 348 Q 86 348 88 360 Q 98 362 102 374 Z" {...reg(fills, onRegion, 'dragon-tail')} />
      {/* shields */}
      <circle cx="180" cy="432" r="13" {...reg(fills, onRegion, 'shield-1')} />
      <circle cx="225" cy="434" r="13" {...reg(fills, onRegion, 'shield-2')} />
      <circle cx="270" cy="432" r="13" {...reg(fills, onRegion, 'shield-3')} />
      <circle cx="315" cy="434" r="13" {...reg(fills, onRegion, 'shield-4')} />
      <circle cx="360" cy="432" r="13" {...reg(fills, onRegion, 'shield-5')} />
      <circle cx="405" cy="434" r="13" {...reg(fills, onRegion, 'shield-6')} />
      {/* viking on deck */}
      <ellipse cx="240" cy="376" rx="14" ry="22" {...reg(fills, onRegion, 'viking-cloak')} />
      <circle cx="240" cy="354" r="12" {...reg(fills, onRegion, 'viking-face')} />
      <circle cx="236" cy="354" r="1.5" fill={STROKE} stroke="none" />
      <circle cx="244" cy="354" r="1.5" fill={STROKE} stroke="none" />
      <path d="M 234 360 Q 240 364 246 360" fill="none" stroke={STROKE} strokeWidth="1.4" />
      <path d="M 226 346 Q 240 332 254 346 L 250 354 L 230 354 Z" {...reg(fills, onRegion, 'viking-helmet')} />
      <path d="M 226 346 L 218 336 L 222 344 Z" {...reg(fills, onRegion, 'horn-l')} />
      <path d="M 254 346 L 262 336 L 258 344 Z" {...reg(fills, onRegion, 'horn-r')} />
      {/* oars */}
      <line x1="220" y1="442" x2="200" y2="492" stroke={STROKE} strokeWidth="3" />
      <line x1="290" y1="442" x2="280" y2="494" stroke={STROKE} strokeWidth="3" />
      <line x1="360" y1="442" x2="376" y2="492" stroke={STROKE} strokeWidth="3" />
      <ellipse cx="198" cy="496" rx="8" ry="3" transform="rotate(-20 198 496)" {...reg(fills, onRegion, 'oar-blade-1')} />
      <ellipse cx="280" cy="498" rx="8" ry="3" {...reg(fills, onRegion, 'oar-blade-2')} />
      <ellipse cx="378" cy="496" rx="8" ry="3" transform="rotate(15 378 496)" {...reg(fills, onRegion, 'oar-blade-3')} />
      {/* banner */}
      <rect x="200" y="528" width="200" height="36" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="552" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>NORTHMEN · c. 900</text>
    </svg>
  );
}

// ----- Page entries -----
const NEW_PAGES = [
  {
    id: 'apollo',
    title: 'Apollo 11 Moon Landing',
    subtitle: 'Sea of Tranquility, 1969',
    collection: 'us',
    eraLabel: 'Space Age',
    eraColor: '#1A2B4D',
    bgPreview: '#1A1A2E',
    fact: "Astronauts Neil Armstrong and Buzz Aldrin were the first people to walk on the Moon — 238,000 miles from home.",
    Component: ApolloSVG,
    regions: ['space','star-1','star-2','star-3','star-4','star-5','earth-sea','earth-land-1','earth-land-2','moon-ground','crater-1','crater-2','crater-3','bootprint','lander-base','lander-top','lander-window','lander-antenna','lander-leg-l','lander-leg-r','lander-pad-l','lander-pad-r','astro-suit','astro-helmet','astro-arm-l','astro-arm-r','astro-pack','flag-fabric','flag-canton','banner'],
    readingLevel: { lexile: 760, gradeBand: '3–4', guidedReading: 'N', wordCount: 16, complexity: 'Moderate' },
    keyVocab: ['leap', 'mankind', 'module', 'tranquility'],
    standards: ['RI.3.1', 'RI.3.7', 'SL.3.2', 'L.3.4'],
    quest: {
      heading: '"One Small Step"',
      author: 'Neil Armstrong · 1969',
      lines: [
        'That\u2019s one small {0}',
        'for man,',
        'one giant {1}',
        'for {2}.',
      ],
      blanks: [
        { answer: 'step',    choices: ['step',    'hop',     'sneeze',   'dance'] },
        { answer: 'leap',    choices: ['leap',    'snack',   'nap',      'song'] },
        { answer: 'mankind', choices: ['mankind', 'penguins','muffins',  'sneakers'] },
      ],
      voice: {
        // Calm, slightly resonant — measured American radio voice
        hints: [/tom/i, /alex/i, /aaron/i, /daniel/i, /reed/i, /microsoft (guy|mark|davis)/i],
        rate: 0.82, pitch: 0.94,
      },
    },
  },
  {
    id: 'great-wall',
    title: 'The Great Wall of China',
    subtitle: 'Northern China, c. 220 BC',
    collection: 'world',
    eraLabel: 'Imperial China',
    eraColor: '#9B2335',
    bgPreview: '#F5E2C8',
    fact: "The Great Wall is over 13,000 miles long — people have been adding to it for more than 2,000 years.",
    Component: GreatWallSVG,
    regions: ['sky','sun','cloud','mountain-far-l','mountain-far-r','mountain-near','tower-base-l','tower-cap-l','tower-roof-l','wall-rise','tower-base-r','tower-cap-r','tower-roof-r','wall-fall','lantern-body','lantern-cap','tassel','dragon-banner','banner'],
    readingLevel: { lexile: 590, gradeBand: '2–3', guidedReading: 'L', wordCount: 22, complexity: 'Easy' },
    keyVocab: ['stones', 'mountains', 'protect', 'thousand'],
    standards: ['RI.2.4', 'RI.3.1', 'RI.3.7'],
    quest: {
      heading: 'Voice of the Wall',
      author: 'Ancient China · c. 220 BC',
      lines: [
        'I am the Great Wall,',
        'built across the {0}.',
        'My stones have stood for thousands of {1}.',
        'I keep my country {2}.',
      ],
      blanks: [
        { answer: 'mountains', choices: ['mountains','meadows','beaches', 'clouds'] },
        { answer: 'years',     choices: ['years',    'minutes',  'hours',  'jokes'] },
        { answer: 'safe',      choices: ['safe',     'silly',    'sleepy', 'spicy'] },
      ],
      voice: {
        // Stately and slow — like an ancient wall speaking
        hints: [/daniel/i, /tom/i, /bruce/i, /alex/i, /fred/i, /microsoft mark/i],
        rate: 0.74, pitch: 0.84,
      },
    },
  },
  {
    id: 'leonardo',
    title: 'Leonardo\u2019s Workshop',
    subtitle: 'Florence, c. 1503',
    collection: 'world',
    eraLabel: 'Renaissance',
    eraColor: '#7B5E3A',
    bgPreview: '#E8DCC2',
    fact: "Leonardo filled thousands of notebook pages with sketches — flying machines, helicopters, even tanks — 500 years before they were invented.",
    Component: LeonardoSVG,
    regions: ['wall','window-frame','window-sky','window-hill','easel-tray','canvas','portrait-bg','portrait-dress','portrait-face','portrait-hair','leo-robe','leo-sleeve','leo-face','leo-cap','leo-cap-feather','leo-beard','leo-brush','desk','notebook','quill','ink-pot','ink-pot-rim','candle-stick','candle-flame','banner'],
    readingLevel: { lexile: 850, gradeBand: '4–5', guidedReading: 'P', wordCount: 21, complexity: 'Challenging' },
    keyVocab: ['simplicity', 'shadow', 'sketch', 'invention'],
    standards: ['RL.4.4', 'RI.4.1', 'L.4.4', 'SL.4.2'],
    quest: {
      heading: 'From Leonardo\u2019s Notebook',
      author: 'Leonardo da Vinci · c. 1500',
      lines: [
        'Learning never tires the {0}.',
        'I paint with light and {1}.',
        'Simplicity is the truest {2}.',
      ],
      blanks: [
        { answer: 'mind',   choices: ['mind',   'mug',      'moon',      'milk'] },
        { answer: 'shadow', choices: ['shadow', 'sandwich', 'spoon',     'sock'] },
        { answer: 'beauty', choices: ['beauty', 'beaver',   'breakfast', 'badger'] },
      ],
      voice: {
        // Thoughtful, warm — older European-tinged narrator
        hints: [/daniel/i, /alex/i, /tom/i, /reed/i, /serena/i, /microsoft (guy|davis|mark)/i],
        rate: 0.84, pitch: 0.94,
      },
    },
  },
  {
    id: 'viking',
    title: 'Viking Longship',
    subtitle: 'North Sea, c. 900',
    collection: 'world',
    eraLabel: 'Viking Age',
    eraColor: '#3A6B7C',
    bgPreview: '#CDE0EA',
    fact: "Viking longships were so light a crew of 60 could carry them between rivers — and fast enough to sail across the North Sea.",
    Component: VikingSVG,
    regions: ['sky','sun','cloud','sea-far','sea-near','sail','sail-stripe-1','sail-stripe-2','hull','hull-rail','dragon-prow','dragon-tail','shield-1','shield-2','shield-3','shield-4','shield-5','shield-6','viking-cloak','viking-face','viking-helmet','horn-l','horn-r','oar-blade-1','oar-blade-2','oar-blade-3','banner'],
    readingLevel: { lexile: 580, gradeBand: '2–3', guidedReading: 'K', wordCount: 19, complexity: 'Easy' },
    keyVocab: ['longship', 'prow', 'saga', 'northern'],
    standards: ['RL.2.4', 'RL.2.1', 'SL.2.2'],
    quest: {
      heading: 'A Viking Saga',
      author: 'Old Norse · c. 900 AD',
      lines: [
        'I am a longship of the {0},',
        'with a dragon at my {1}.',
        'I sail the cold and salty {2}.',
      ],
      blanks: [
        { answer: 'north', choices: ['north', 'noodle', 'nest',    'noise'] },
        { answer: 'prow',  choices: ['prow',  'pillow', 'plant',   'panda'] },
        { answer: 'sea',   choices: ['sea',   'sand',   'soup',    'swing'] },
      ],
      voice: {
        // Deep, slow, gruff — a Viking storyteller
        hints: [/bruce/i, /daniel/i, /tom/i, /fred/i, /albert/i, /microsoft mark/i],
        rate: 0.74, pitch: 0.78,
      },
    },
  },
];

// Append to the global pages array so the rest of the app picks them up.
if (window.PAGES_DATA && Array.isArray(window.PAGES_DATA)) {
  NEW_PAGES.forEach(p => window.PAGES_DATA.push(p));
}

Object.assign(window, { ApolloSVG, GreatWallSVG, LeonardoSVG, VikingSVG });
