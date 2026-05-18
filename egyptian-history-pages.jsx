// =================================================================
// Egyptian history coloring pages — 4 additions:
//   • Tutankhamun's golden mask (1323 BC)
//   • Cleopatra, Queen of the Nile (51–30 BC)
//   • Anubis, god of the afterlife (with scales of Ma'at)
//   • An Egyptian scribe writing hieroglyphs on papyrus
// =================================================================

// ----- 23. KING TUT'S GOLDEN MASK — 1323 BC -----
function TutMaskSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* background — deep blue museum panel */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'background')} />

      {/* hieroglyph column left */}
      <rect x="36" y="64" width="44" height="430" rx="6" {...reg(fills, onRegion, 'glyph-col-l')} />
      {/* simple hieroglyphs inside left column — non-colorable stroke only */}
      <g stroke={STROKE} strokeWidth="2" fill="none">
        {/* ankh */}
        <circle cx="58" cy="92" r="7" />
        <line x1="58" y1="99" x2="58" y2="118" />
        <line x1="48" y1="106" x2="68" y2="106" />
        {/* eye of horus */}
        <path d="M 44 142 Q 58 132 72 142 Q 58 154 44 142 Z" />
        <circle cx="58" cy="142" r="3" fill={STROKE} />
        <line x1="58" y1="146" x2="58" y2="160" />
        <path d="M 58 158 L 70 162" />
        {/* scarab beetle */}
        <ellipse cx="58" cy="190" rx="10" ry="8" />
        <line x1="58" y1="182" x2="58" y2="198" />
        <line x1="48" y1="184" x2="44" y2="180" />
        <line x1="68" y1="184" x2="72" y2="180" />
        <line x1="48" y1="196" x2="44" y2="200" />
        <line x1="68" y1="196" x2="72" y2="200" />
        {/* wavy water lines */}
        <path d="M 46 222 Q 52 218 58 222 Q 64 226 70 222" />
        <path d="M 46 232 Q 52 228 58 232 Q 64 236 70 232" />
        <path d="M 46 242 Q 52 238 58 242 Q 64 246 70 242" />
        {/* feather of Ma'at */}
        <path d="M 58 268 L 50 296 Q 58 304 66 296 Z" />
        <line x1="58" y1="268" x2="58" y2="296" />
        {/* bird (Horus falcon glyph) */}
        <path d="M 48 328 Q 58 320 70 328 L 70 336 Q 58 340 48 336 Z" />
        <line x1="56" y1="336" x2="56" y2="344" />
        <line x1="62" y1="336" x2="62" y2="344" />
        {/* sun disc */}
        <circle cx="58" cy="370" r="8" />
        {/* lotus */}
        <path d="M 58 408 Q 46 396 50 388 Q 58 392 58 408 Z" />
        <path d="M 58 408 Q 70 396 66 388 Q 58 392 58 408 Z" />
        <line x1="58" y1="408" x2="58" y2="424" />
        {/* serpent */}
        <path d="M 48 448 Q 58 442 68 448 Q 58 456 48 462" />
      </g>

      {/* hieroglyph column right */}
      <rect x="520" y="64" width="44" height="430" rx="6" {...reg(fills, onRegion, 'glyph-col-r')} />
      <g stroke={STROKE} strokeWidth="2" fill="none">
        {/* sun disc */}
        <circle cx="542" cy="88" r="8" />
        {/* feather */}
        <path d="M 542 116 L 534 144 Q 542 152 550 144 Z" />
        <line x1="542" y1="116" x2="542" y2="144" />
        {/* eye of horus */}
        <path d="M 528 176 Q 542 166 556 176 Q 542 188 528 176 Z" />
        <circle cx="542" cy="176" r="3" fill={STROKE} />
        <line x1="542" y1="180" x2="542" y2="194" />
        <path d="M 542 192 L 554 196" />
        {/* ankh */}
        <circle cx="542" cy="220" r="7" />
        <line x1="542" y1="227" x2="542" y2="246" />
        <line x1="532" y1="234" x2="552" y2="234" />
        {/* scarab */}
        <ellipse cx="542" cy="272" rx="10" ry="8" />
        <line x1="542" y1="264" x2="542" y2="280" />
        <line x1="532" y1="266" x2="528" y2="262" />
        <line x1="552" y1="266" x2="556" y2="262" />
        {/* wavy water */}
        <path d="M 530 304 Q 536 300 542 304 Q 548 308 554 304" />
        <path d="M 530 314 Q 536 310 542 314 Q 548 318 554 314" />
        <path d="M 530 324 Q 536 320 542 324 Q 548 328 554 324" />
        {/* lotus */}
        <path d="M 542 358 Q 530 346 534 338 Q 542 342 542 358 Z" />
        <path d="M 542 358 Q 554 346 550 338 Q 542 342 542 358 Z" />
        <line x1="542" y1="358" x2="542" y2="374" />
        {/* bird */}
        <path d="M 532 396 Q 542 388 554 396 L 554 404 Q 542 408 532 404 Z" />
        <line x1="540" y1="404" x2="540" y2="412" />
        <line x1="546" y1="404" x2="546" y2="412" />
        {/* serpent */}
        <path d="M 532 440 Q 542 434 552 440 Q 542 448 532 454" />
      </g>

      {/* ---- THE MASK ---- */}
      {/* Nemes back wings (flare out from behind head) */}
      <path d="M 138 308 Q 110 220 162 168 L 198 220 L 196 376 L 174 376 Q 142 360 138 308 Z" {...reg(fills, onRegion, 'nemes-back-l')} />
      <path d="M 462 308 Q 490 220 438 168 L 402 220 L 404 376 L 426 376 Q 458 360 462 308 Z" {...reg(fills, onRegion, 'nemes-back-r')} />
      {/* stripe lines on back-wings — non-colorable */}
      <line x1="156" y1="206" x2="146" y2="296" stroke={STROKE} strokeWidth="1.4" />
      <line x1="174" y1="206" x2="166" y2="320" stroke={STROKE} strokeWidth="1.4" />
      <line x1="444" y1="206" x2="454" y2="296" stroke={STROKE} strokeWidth="1.4" />
      <line x1="426" y1="206" x2="434" y2="320" stroke={STROKE} strokeWidth="1.4" />

      {/* Nemes top cap (dome of headdress) */}
      <path d="M 198 220 Q 200 138 300 130 Q 400 138 402 220 L 380 230 Q 300 214 220 230 Z" {...reg(fills, onRegion, 'nemes-cap')} />

      {/* Forehead band (gold) */}
      <rect x="220" y="226" width="160" height="14" {...reg(fills, onRegion, 'forehead-band')} />
      <line x1="226" y1="226" x2="226" y2="240" stroke={STROKE} strokeWidth="1.2" />
      <line x1="374" y1="226" x2="374" y2="240" stroke={STROKE} strokeWidth="1.2" />

      {/* Left lappet (front flap on chest side, striped) */}
      <path d="M 198 240 L 240 240 L 252 442 L 188 442 Z" {...reg(fills, onRegion, 'lappet-l')} />
      <line x1="192" y1="270" x2="244" y2="270" stroke={STROKE} strokeWidth="1.6" />
      <line x1="190" y1="306" x2="246" y2="306" stroke={STROKE} strokeWidth="1.6" />
      <line x1="188" y1="346" x2="248" y2="346" stroke={STROKE} strokeWidth="1.6" />
      <line x1="186" y1="386" x2="250" y2="386" stroke={STROKE} strokeWidth="1.6" />
      {/* Right lappet mirrored */}
      <path d="M 360 240 L 402 240 L 412 442 L 348 442 Z" {...reg(fills, onRegion, 'lappet-r')} />
      <line x1="356" y1="270" x2="408" y2="270" stroke={STROKE} strokeWidth="1.6" />
      <line x1="354" y1="306" x2="410" y2="306" stroke={STROKE} strokeWidth="1.6" />
      <line x1="352" y1="346" x2="412" y2="346" stroke={STROKE} strokeWidth="1.6" />
      <line x1="350" y1="386" x2="414" y2="386" stroke={STROKE} strokeWidth="1.6" />

      {/* URAEUS — vulture head + cobra rearing on forehead */}
      <g style={alive ? { animation: 'glow-pulse 2.2s ease-in-out infinite', transformOrigin: '300px 220px' } : null}>
        {/* vulture head */}
        <path d="M 280 234 Q 280 218 296 218 L 296 234 Z" {...reg(fills, onRegion, 'vulture')} />
        <path d="M 280 232 L 270 232 L 278 226 Z" fill={STROKE} stroke="none" />
        <circle cx="284" cy="224" r="1.6" fill={STROKE} stroke="none" />
        {/* cobra body (rearing S-curve) */}
        <path d="M 304 234 Q 318 222 322 200 Q 322 184 314 184 Q 306 186 308 200 Q 308 220 304 234 Z" {...reg(fills, onRegion, 'cobra')} />
        {/* cobra hood markings */}
        <line x1="314" y1="196" x2="318" y2="194" stroke={STROKE} strokeWidth="1.4" />
      </g>

      {/* FACE — golden ellipse */}
      <ellipse cx="300" cy="316" rx="54" ry="80" {...reg(fills, onRegion, 'face')} />

      {/* eyes — kohl outline, almond shape, non-colorable */}
      <path d="M 264 296 Q 280 286 296 296 Q 280 304 264 296 Z" fill="#FFFDF5" stroke={STROKE} strokeWidth="2" />
      <path d="M 304 296 Q 320 286 336 296 Q 320 304 304 296 Z" fill="#FFFDF5" stroke={STROKE} strokeWidth="2" />
      <circle cx="280" cy="296" r="3.6" fill={STROKE} stroke="none" />
      <circle cx="320" cy="296" r="3.6" fill={STROKE} stroke="none" />
      {/* kohl extension lines */}
      <path d="M 264 298 Q 252 298 246 292" fill="none" stroke={STROKE} strokeWidth="2.4" />
      <path d="M 336 298 Q 348 298 354 292" fill="none" stroke={STROKE} strokeWidth="2.4" />
      {/* eyebrows */}
      <path d="M 262 280 Q 278 272 296 280" fill="none" stroke={STROKE} strokeWidth="3" />
      <path d="M 304 280 Q 322 272 338 280" fill="none" stroke={STROKE} strokeWidth="3" />

      {/* Nose */}
      <path d="M 300 308 L 292 348 Q 300 356 308 348 Z" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* Mouth */}
      <path d="M 280 372 Q 300 380 320 372" fill="none" stroke={STROKE} strokeWidth="2.4" />
      <path d="M 286 376 Q 300 372 314 376" fill="none" stroke={STROKE} strokeWidth="1.6" />

      {/* False beard — striped, narrowed downward */}
      <path d="M 286 392 L 314 392 L 320 470 Q 300 478 280 470 Z" {...reg(fills, onRegion, 'beard')} />
      <line x1="284" y1="412" x2="316" y2="412" stroke={STROKE} strokeWidth="1.4" />
      <line x1="283" y1="430" x2="317" y2="430" stroke={STROKE} strokeWidth="1.4" />
      <line x1="282" y1="448" x2="318" y2="448" stroke={STROKE} strokeWidth="1.4" />
      <line x1="281" y1="465" x2="319" y2="465" stroke={STROKE} strokeWidth="1.4" />

      {/* Broad collar (wesekh) — concentric bands */}
      <path d="M 152 460 Q 300 488 448 460 Q 446 520 300 528 Q 154 520 152 460 Z" {...reg(fills, onRegion, 'collar-outer')} />
      <path d="M 184 466 Q 300 488 416 466 Q 412 510 300 516 Q 188 510 184 466 Z" {...reg(fills, onRegion, 'collar-mid')} />
      <path d="M 216 472 Q 300 488 384 472 Q 380 500 300 504 Q 220 500 216 472 Z" {...reg(fills, onRegion, 'collar-inner')} />
      {/* bead dots along outer */}
      {[180,210,240,270,300,330,360,390,420].map((x,i) => (
        <circle key={`b-${i}`} cx={x} cy={486 - Math.abs(x-300)*0.04} r="2" fill={STROKE} stroke="none" />
      ))}

      {/* banner */}
      <rect x="160" y="538" width="280" height="36" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="562" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="18" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>TUTANKHAMUN · 1323 BC</text>
    </svg>
  );
}

// ----- 24. CLEOPATRA, QUEEN OF THE NILE -----
function CleopatraSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky panel */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* sun behind crown */}
      <g style={alive ? { animation: 'sun-pulse 2.4s ease-in-out infinite', transformOrigin: '300px 110px' } : null}>
        <circle cx="300" cy="110" r="44" {...reg(fills, onRegion, 'sun')} />
      </g>
      {/* lotus / papyrus decorative columns */}
      <rect x="48" y="180" width="40" height="300" {...reg(fills, onRegion, 'pillar-l')} />
      <path d="M 38 180 L 98 180 L 88 154 L 48 154 Z" {...reg(fills, onRegion, 'pillar-l-cap')} />
      {/* lotus bud capital */}
      <path d="M 50 154 Q 68 124 86 154 Q 78 132 68 124 Q 58 132 50 154 Z" {...reg(fills, onRegion, 'lotus-l')} />
      <rect x="512" y="180" width="40" height="300" {...reg(fills, onRegion, 'pillar-r')} />
      <path d="M 502 180 L 562 180 L 552 154 L 512 154 Z" {...reg(fills, onRegion, 'pillar-r-cap')} />
      <path d="M 514 154 Q 532 124 550 154 Q 542 132 532 124 Q 522 132 514 154 Z" {...reg(fills, onRegion, 'lotus-r')} />
      {/* hieroglyph bands on pillars — non-colorable */}
      <line x1="48" y1="220" x2="88" y2="220" stroke={STROKE} strokeWidth="2" />
      <line x1="48" y1="280" x2="88" y2="280" stroke={STROKE} strokeWidth="2" />
      <line x1="48" y1="340" x2="88" y2="340" stroke={STROKE} strokeWidth="2" />
      <line x1="48" y1="400" x2="88" y2="400" stroke={STROKE} strokeWidth="2" />
      <line x1="512" y1="220" x2="552" y2="220" stroke={STROKE} strokeWidth="2" />
      <line x1="512" y1="280" x2="552" y2="280" stroke={STROKE} strokeWidth="2" />
      <line x1="512" y1="340" x2="552" y2="340" stroke={STROKE} strokeWidth="2" />
      <line x1="512" y1="400" x2="552" y2="400" stroke={STROKE} strokeWidth="2" />
      {/* small ankh in middle of each pillar */}
      <g stroke={STROKE} strokeWidth="1.8" fill="none">
        <circle cx="68" cy="240" r="5" />
        <line x1="68" y1="245" x2="68" y2="262" />
        <line x1="60" y1="252" x2="76" y2="252" />
        <circle cx="68" cy="360" r="5" />
        <line x1="68" y1="365" x2="68" y2="382" />
        <line x1="60" y1="372" x2="76" y2="372" />
        <circle cx="532" cy="240" r="5" />
        <line x1="532" y1="245" x2="532" y2="262" />
        <line x1="524" y1="252" x2="540" y2="252" />
        <circle cx="532" cy="360" r="5" />
        <line x1="532" y1="365" x2="532" y2="382" />
        <line x1="524" y1="372" x2="540" y2="372" />
      </g>

      {/* floor */}
      <path d="M 20 480 L 580 480 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'floor')} />
      <line x1="20" y1="500" x2="580" y2="500" stroke={STROKE} strokeWidth="1.4" />
      <line x1="20" y1="540" x2="580" y2="540" stroke={STROKE} strokeWidth="1.4" />

      {/* ---- THRONE ---- */}
      {/* throne back */}
      <rect x="210" y="240" width="180" height="220" {...reg(fills, onRegion, 'throne-back')} />
      {/* throne back decoration */}
      <rect x="226" y="260" width="148" height="100" {...reg(fills, onRegion, 'throne-panel')} />
      {/* sun disc with horns on throne back */}
      <g stroke={STROKE} strokeWidth="2" fill="none">
        <circle cx="300" cy="290" r="14" />
        <path d="M 286 286 Q 270 274 274 290" />
        <path d="M 314 286 Q 330 274 326 290" />
      </g>
      {/* ankh on panel */}
      <g stroke={STROKE} strokeWidth="2" fill="none">
        <circle cx="300" cy="330" r="6" />
        <line x1="300" y1="336" x2="300" y2="354" />
        <line x1="290" y1="344" x2="310" y2="344" />
      </g>
      {/* lion head finials on throne */}
      <ellipse cx="218" cy="234" rx="14" ry="10" {...reg(fills, onRegion, 'lion-l')} />
      <ellipse cx="382" cy="234" rx="14" ry="10" {...reg(fills, onRegion, 'lion-r')} />
      <circle cx="214" cy="232" r="1.6" fill={STROKE} stroke="none" />
      <circle cx="222" cy="232" r="1.6" fill={STROKE} stroke="none" />
      <circle cx="378" cy="232" r="1.6" fill={STROKE} stroke="none" />
      <circle cx="386" cy="232" r="1.6" fill={STROKE} stroke="none" />

      {/* ---- CLEOPATRA (frontal, seated) ---- */}
      {/* legs / dress lap */}
      <path d="M 224 360 Q 224 420 240 460 L 360 460 Q 376 420 376 360 Z" {...reg(fills, onRegion, 'dress-lap')} />
      {/* feet */}
      <ellipse cx="260" cy="468" rx="18" ry="8" {...reg(fills, onRegion, 'foot-l')} />
      <ellipse cx="340" cy="468" rx="18" ry="8" {...reg(fills, onRegion, 'foot-r')} />
      {/* dress folds */}
      <line x1="270" y1="372" x2="276" y2="456" stroke={STROKE} strokeWidth="1.4" />
      <line x1="300" y1="372" x2="300" y2="458" stroke={STROKE} strokeWidth="1.4" />
      <line x1="330" y1="372" x2="324" y2="456" stroke={STROKE} strokeWidth="1.4" />

      {/* torso — sheath dress upper */}
      <path d="M 244 268 L 356 268 L 360 364 L 240 364 Z" {...reg(fills, onRegion, 'dress-top')} />
      {/* dress strap line */}
      <line x1="252" y1="288" x2="262" y2="270" stroke={STROKE} strokeWidth="1.4" />
      <line x1="348" y1="288" x2="338" y2="270" stroke={STROKE} strokeWidth="1.4" />

      {/* right arm — extended, holding ankh */}
      <path d="M 356 280 Q 400 290 410 370 L 392 374 Q 380 320 352 304 Z" {...reg(fills, onRegion, 'arm-r')} />
      {/* ankh held in right hand */}
      <g style={alive ? { animation: 'glow-pulse 2s ease-in-out infinite', transformOrigin: '400px 380px' } : null}>
        <ellipse cx="400" cy="362" rx="10" ry="14" fill="none" stroke={STROKE} strokeWidth="3.6" {...reg(fills, onRegion, 'ankh-loop')} />
        <line x1="400" y1="376" x2="400" y2="408" stroke={STROKE} strokeWidth="3.6" />
        <line x1="386" y1="386" x2="414" y2="386" stroke={STROKE} strokeWidth="3.6" />
        <rect x="396" y="372" width="8" height="36" {...reg(fills, onRegion, 'ankh-bar')} />
        <rect x="386" y="382" width="28" height="8" {...reg(fills, onRegion, 'ankh-cross')} />
      </g>

      {/* left arm — at side */}
      <path d="M 244 280 Q 200 290 192 370 L 210 374 Q 220 320 248 304 Z" {...reg(fills, onRegion, 'arm-l')} />
      {/* left hand resting */}
      <ellipse cx="200" cy="382" rx="9" ry="11" {...reg(fills, onRegion, 'hand-l')} />

      {/* broad collar (wesekh) — sits over chest */}
      <path d="M 224 264 Q 300 296 376 264 Q 376 296 300 308 Q 224 296 224 264 Z" {...reg(fills, onRegion, 'collar-outer')} />
      <path d="M 244 268 Q 300 290 356 268 Q 356 288 300 296 Q 244 288 244 268 Z" {...reg(fills, onRegion, 'collar-inner')} />
      {/* collar bead dots */}
      {[240,260,280,300,320,340,360].map((x,i) => (
        <circle key={`cb-${i}`} cx={x} cy={290 - Math.abs(x-300)*0.05} r="2" fill={STROKE} stroke="none" />
      ))}

      {/* neck */}
      <path d="M 290 234 L 310 234 L 312 262 L 288 262 Z" {...reg(fills, onRegion, 'neck')} />

      {/* face */}
      <ellipse cx="300" cy="206" rx="34" ry="40" {...reg(fills, onRegion, 'face')} />

      {/* black wig — long hair on both sides of face */}
      <path d="M 266 196 Q 250 240 256 286 L 280 282 Q 274 240 278 196 Z" {...reg(fills, onRegion, 'hair-l')} />
      <path d="M 334 196 Q 350 240 344 286 L 320 282 Q 326 240 322 196 Z" {...reg(fills, onRegion, 'hair-r')} />
      {/* bangs across forehead */}
      <path d="M 268 192 Q 268 170 300 168 Q 332 170 332 192 L 332 200 L 268 200 Z" {...reg(fills, onRegion, 'bangs')} />

      {/* crown — Hathor headdress (sun disc + cow horns) */}
      <g style={alive ? { animation: 'glow-pulse 2.4s ease-in-out infinite', transformOrigin: '300px 132px' } : null}>
        {/* base diadem (golden band over bangs) */}
        <rect x="266" y="166" width="68" height="10" {...reg(fills, onRegion, 'diadem')} />
        {/* cow horns curling up */}
        <path d="M 268 162 Q 244 142 240 108 Q 252 116 264 130 Q 274 144 282 158 Z" {...reg(fills, onRegion, 'horn-l')} />
        <path d="M 332 162 Q 356 142 360 108 Q 348 116 336 130 Q 326 144 318 158 Z" {...reg(fills, onRegion, 'horn-r')} />
        {/* sun disc between horns */}
        <circle cx="300" cy="124" r="22" {...reg(fills, onRegion, 'sun-disc')} />
        {/* cobra (uraeus) on forehead */}
        <path d="M 296 168 Q 286 158 292 144 Q 304 146 304 158 Z" {...reg(fills, onRegion, 'uraeus')} />
      </g>

      {/* face features */}
      <ellipse cx="288" cy="204" rx="6" ry="3" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.6" />
      <ellipse cx="312" cy="204" rx="6" ry="3" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.6" />
      <circle cx="288" cy="204" r="2" fill={STROKE} stroke="none" />
      <circle cx="312" cy="204" r="2" fill={STROKE} stroke="none" />
      {/* kohl extensions */}
      <path d="M 282 205 Q 274 205 270 202" fill="none" stroke={STROKE} strokeWidth="1.8" />
      <path d="M 318 205 Q 326 205 330 202" fill="none" stroke={STROKE} strokeWidth="1.8" />
      <path d="M 280 196 Q 288 192 296 196" fill="none" stroke={STROKE} strokeWidth="1.8" />
      <path d="M 304 196 Q 312 192 320 196" fill="none" stroke={STROKE} strokeWidth="1.8" />
      {/* nose */}
      <path d="M 300 210 L 296 226 Q 300 230 304 226 Z" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* mouth */}
      <path d="M 290 234 Q 300 238 310 234" fill="none" stroke={STROKE} strokeWidth="1.8" />

      {/* banner */}
      <rect x="170" y="540" width="260" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="18" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>CLEOPATRA · 51 BC</text>
    </svg>
  );
}

// ----- 25. ANUBIS, GOD OF THE AFTERLIFE -----
function AnubisSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />
      {/* tomb wall behind */}
      <rect x="20" y="120" width="560" height="360" {...reg(fills, onRegion, 'wall')} />
      {/* wall painting rectangle frames */}
      <rect x="48" y="148" width="80" height="120" fill="none" stroke={STROKE} strokeWidth="2" />
      <rect x="472" y="148" width="80" height="120" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* hieroglyph rows in those rectangles */}
      <g stroke={STROKE} strokeWidth="1.6" fill="none">
        {/* left wall painting */}
        <circle cx="88" cy="170" r="6" />
        <line x1="88" y1="176" x2="88" y2="190" />
        <line x1="80" y1="184" x2="96" y2="184" />
        <path d="M 70 208 Q 78 200 88 208 Q 96 216 106 208" />
        <path d="M 70 222 Q 78 214 88 222 Q 96 230 106 222" />
        <ellipse cx="88" cy="244" rx="10" ry="6" />
        <line x1="88" y1="238" x2="88" y2="250" />
        {/* right wall painting */}
        <circle cx="512" cy="170" r="6" />
        <line x1="512" y1="176" x2="512" y2="190" />
        <line x1="504" y1="184" x2="520" y2="184" />
        <path d="M 494 208 Q 502 200 512 208 Q 520 216 530 208" />
        <path d="M 494 222 Q 502 214 512 222 Q 520 230 530 222" />
        <ellipse cx="512" cy="244" rx="10" ry="6" />
        <line x1="512" y1="238" x2="512" y2="250" />
      </g>
      {/* floor (stone) */}
      <path d="M 20 480 L 580 480 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'floor')} />
      <line x1="20" y1="500" x2="580" y2="500" stroke={STROKE} strokeWidth="1.4" />
      <line x1="180" y1="500" x2="180" y2="580" stroke={STROKE} strokeWidth="1.4" />
      <line x1="420" y1="500" x2="420" y2="580" stroke={STROKE} strokeWidth="1.4" />

      {/* ---- Scales of Ma'at on the left ---- */}
      {/* base */}
      <rect x="80" y="450" width="60" height="30" {...reg(fills, onRegion, 'scales-base')} />
      {/* vertical pillar */}
      <rect x="106" y="240" width="8" height="210" {...reg(fills, onRegion, 'scales-pillar')} />
      {/* horizontal beam */}
      <rect x="40" y="234" width="140" height="8" {...reg(fills, onRegion, 'scales-beam')} />
      {/* chains */}
      <line x1="58" y1="242" x2="58" y2="298" stroke={STROKE} strokeWidth="1.4" />
      <line x1="162" y1="242" x2="162" y2="298" stroke={STROKE} strokeWidth="1.4" />
      {/* left pan (heart side) */}
      <path d="M 38 298 Q 58 322 78 298 Q 58 310 38 298 Z" {...reg(fills, onRegion, 'pan-l')} />
      <line x1="38" y1="298" x2="78" y2="298" stroke={STROKE} strokeWidth="1.6" />
      {/* heart on left pan */}
      <path d="M 50 290 Q 50 282 58 282 Q 66 282 66 290 Q 66 296 58 304 Q 50 296 50 290 Z" {...reg(fills, onRegion, 'heart')} />
      {/* right pan (feather side) */}
      <path d="M 142 298 Q 162 322 182 298 Q 162 310 142 298 Z" {...reg(fills, onRegion, 'pan-r')} />
      <line x1="142" y1="298" x2="182" y2="298" stroke={STROKE} strokeWidth="1.6" />
      {/* feather of Ma'at on right pan */}
      <path d="M 162 290 L 156 308 Q 162 314 168 308 Z" {...reg(fills, onRegion, 'feather')} />
      <line x1="162" y1="278" x2="162" y2="308" stroke={STROKE} strokeWidth="1.6" />

      {/* ---- ANUBIS — standing profile, facing left toward scales ---- */}
      {/* feet/sandals */}
      <ellipse cx="350" cy="470" rx="22" ry="8" {...reg(fills, onRegion, 'sandal-l')} />
      <ellipse cx="430" cy="470" rx="22" ry="8" {...reg(fills, onRegion, 'sandal-r')} />
      {/* sandal straps */}
      <line x1="340" y1="464" x2="362" y2="468" stroke={STROKE} strokeWidth="1.4" />
      <line x1="420" y1="464" x2="442" y2="468" stroke={STROKE} strokeWidth="1.4" />
      {/* legs */}
      <rect x="338" y="380" width="22" height="84" {...reg(fills, onRegion, 'leg-l')} />
      <rect x="418" y="380" width="22" height="84" {...reg(fills, onRegion, 'leg-r')} />
      {/* shendyt (Egyptian kilt) — trapezoidal */}
      <path d="M 326 300 L 460 300 L 470 388 L 316 388 Z" {...reg(fills, onRegion, 'kilt')} />
      {/* kilt center fold */}
      <path d="M 386 300 L 380 388 L 396 388 L 392 300 Z" {...reg(fills, onRegion, 'kilt-fold')} />
      {/* kilt pleats */}
      <line x1="336" y1="316" x2="332" y2="384" stroke={STROKE} strokeWidth="1.4" />
      <line x1="356" y1="316" x2="354" y2="384" stroke={STROKE} strokeWidth="1.4" />
      <line x1="416" y1="316" x2="420" y2="384" stroke={STROKE} strokeWidth="1.4" />
      <line x1="436" y1="316" x2="442" y2="384" stroke={STROKE} strokeWidth="1.4" />
      {/* belt */}
      <rect x="322" y="294" width="144" height="10" {...reg(fills, onRegion, 'belt')} />

      {/* torso — slim, with chiseled chest */}
      <path d="M 332 222 L 460 222 L 462 296 L 326 296 Z" {...reg(fills, onRegion, 'torso')} />
      {/* chest line */}
      <path d="M 360 234 Q 396 250 432 234" fill="none" stroke={STROKE} strokeWidth="1.6" />

      {/* broad collar */}
      <path d="M 320 222 Q 396 250 472 222 Q 472 256 396 264 Q 320 256 320 222 Z" {...reg(fills, onRegion, 'collar')} />
      {/* collar inner ring */}
      <path d="M 340 226 Q 396 248 452 226 Q 452 250 396 256 Q 340 250 340 226 Z" {...reg(fills, onRegion, 'collar-inner')} />
      {/* bead dots */}
      {[348,372,396,420,444].map((x,i) => (
        <circle key={`bd-${i}`} cx={x} cy="244" r="2" fill={STROKE} stroke="none" />
      ))}

      {/* left arm — extended toward scales */}
      <path d="M 332 232 Q 280 254 230 296 L 244 312 Q 290 286 340 268 Z" {...reg(fills, onRegion, 'arm-l')} />
      {/* hand pointing at scales */}
      <ellipse cx="226" cy="304" rx="10" ry="8" {...reg(fills, onRegion, 'hand-l')} />

      {/* right arm — holding was-scepter */}
      <path d="M 460 232 Q 482 270 482 350 L 466 354 Q 458 290 450 264 Z" {...reg(fills, onRegion, 'arm-r')} />
      {/* was-scepter (long staff with forked bottom, animal head on top) */}
      <line x1="476" y1="180" x2="476" y2="400" stroke={STROKE} strokeWidth="3" />
      {/* scepter head — stylized animal head at top */}
      <path d="M 472 180 L 472 162 L 480 156 L 488 162 L 488 180 Z" {...reg(fills, onRegion, 'scepter-head')} />
      <line x1="480" y1="162" x2="480" y2="156" stroke={STROKE} strokeWidth="2" />
      <line x1="478" y1="156" x2="476" y2="148" stroke={STROKE} strokeWidth="1.6" />
      <line x1="482" y1="156" x2="484" y2="148" stroke={STROKE} strokeWidth="1.6" />
      {/* scepter forked bottom */}
      <path d="M 470 400 L 482 400 L 482 416 L 488 416 L 484 422 L 478 422 L 470 416 Z" {...reg(fills, onRegion, 'scepter-base')} />

      {/* ---- JACKAL HEAD ---- */}
      {/* neck */}
      <path d="M 386 200 L 414 200 L 416 226 L 384 226 Z" {...reg(fills, onRegion, 'neck')} />
      {/* head — elongated jackal profile facing left */}
      <path d="M 410 200 Q 414 152 384 144 Q 348 144 332 162 Q 312 168 290 176 Q 280 184 290 192 Q 308 196 332 196 Q 348 200 384 202 Z" {...reg(fills, onRegion, 'jackal-head')} />
      {/* snout extension */}
      <path d="M 290 176 Q 270 174 264 184 Q 270 192 286 192 Z" {...reg(fills, onRegion, 'snout')} />
      {/* nose */}
      <ellipse cx="266" cy="184" rx="4" ry="3" fill={STROKE} stroke="none" />
      {/* mouth line */}
      <path d="M 270 190 Q 286 196 310 192" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* eye — Egyptian kohl-style */}
      <path d="M 354 168 Q 368 162 380 168 Q 368 174 354 168 Z" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.8" />
      <circle cx="368" cy="168" r="2.4" fill={STROKE} stroke="none" />
      <path d="M 380 168 Q 388 168 392 164" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* eyebrow */}
      <path d="M 354 158 Q 368 152 384 158" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* ears — tall pointed jackal ears */}
      <path d="M 392 144 L 396 100 L 416 142 Z" {...reg(fills, onRegion, 'ear-l')} />
      <path d="M 416 142 L 432 110 L 442 146 Z" {...reg(fills, onRegion, 'ear-r')} />
      {/* inner ear shading */}
      <path d="M 400 140 L 402 116 L 412 140 Z" fill={STROKE} stroke="none" opacity="0.4" />
      <path d="M 422 142 L 428 122 L 436 144 Z" fill={STROKE} stroke="none" opacity="0.4" />

      {/* banner */}
      <rect x="190" y="538" width="220" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="300" y="561" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="18" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>ANUBIS · GUIDE OF SOULS</text>
    </svg>
  );
}

// ----- 26. EGYPTIAN SCRIBE WRITING HIEROGLYPHS -----
function ScribeSVG({ fills, onRegion, alive }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" strokeLinecap="round">
      {/* sky */}
      <rect x="20" y="20" width="560" height="560" rx="28" {...reg(fills, onRegion, 'sky')} />

      {/* sandstone wall behind */}
      <rect x="20" y="20" width="560" height="380" {...reg(fills, onRegion, 'wall')} />
      {/* wall stone-block lines — non-colorable */}
      <line x1="20" y1="100" x2="580" y2="100" stroke={STROKE} strokeWidth="1.4" />
      <line x1="20" y1="180" x2="580" y2="180" stroke={STROKE} strokeWidth="1.4" />
      <line x1="20" y1="260" x2="580" y2="260" stroke={STROKE} strokeWidth="1.4" />
      <line x1="20" y1="340" x2="580" y2="340" stroke={STROKE} strokeWidth="1.4" />
      {/* vertical block joints, staggered */}
      <line x1="200" y1="20" x2="200" y2="100" stroke={STROKE} strokeWidth="1.4" />
      <line x1="400" y1="20" x2="400" y2="100" stroke={STROKE} strokeWidth="1.4" />
      <line x1="120" y1="100" x2="120" y2="180" stroke={STROKE} strokeWidth="1.4" />
      <line x1="300" y1="100" x2="300" y2="180" stroke={STROKE} strokeWidth="1.4" />
      <line x1="480" y1="100" x2="480" y2="180" stroke={STROKE} strokeWidth="1.4" />
      <line x1="200" y1="180" x2="200" y2="260" stroke={STROKE} strokeWidth="1.4" />
      <line x1="400" y1="180" x2="400" y2="260" stroke={STROKE} strokeWidth="1.4" />
      <line x1="120" y1="260" x2="120" y2="340" stroke={STROKE} strokeWidth="1.4" />
      <line x1="300" y1="260" x2="300" y2="340" stroke={STROKE} strokeWidth="1.4" />
      <line x1="480" y1="260" x2="480" y2="340" stroke={STROKE} strokeWidth="1.4" />

      {/* Hieroglyph cartouche carved into wall (large oval frame) */}
      <path d="M 360 60 Q 360 40 380 40 L 520 40 Q 540 40 540 60 L 540 320 Q 540 340 520 340 L 380 340 Q 360 340 360 320 Z" {...reg(fills, onRegion, 'cartouche')} />
      {/* cartouche tie at bottom (Egyptian convention) */}
      <line x1="360" y1="340" x2="360" y2="360" stroke={STROKE} strokeWidth="3" />
      <line x1="540" y1="340" x2="540" y2="360" stroke={STROKE} strokeWidth="3" />
      <line x1="360" y1="358" x2="540" y2="358" stroke={STROKE} strokeWidth="3" />
      {/* hieroglyphs inside cartouche — 4 carved symbols */}
      <g stroke={STROKE} strokeWidth="2" fill="none">
        {/* ankh */}
        <circle cx="450" cy="86" r="14" />
        <line x1="450" y1="100" x2="450" y2="134" />
        <line x1="432" y1="116" x2="468" y2="116" />
        {/* eye of horus */}
        <path d="M 410 168 Q 450 152 490 168 Q 450 184 410 168 Z" />
        <circle cx="450" cy="168" r="6" fill={STROKE} />
        <line x1="450" y1="174" x2="450" y2="194" />
        <path d="M 450 192 L 470 200" />
        {/* scarab */}
        <ellipse cx="450" cy="232" rx="20" ry="14" />
        <line x1="450" y1="218" x2="450" y2="246" />
        <line x1="430" y1="222" x2="420" y2="216" />
        <line x1="470" y1="222" x2="480" y2="216" />
        <line x1="430" y1="240" x2="420" y2="246" />
        <line x1="470" y1="240" x2="480" y2="246" />
        {/* feather of Ma'at */}
        <path d="M 450 270 L 436 308 Q 450 318 464 308 Z" />
        <line x1="450" y1="270" x2="450" y2="308" />
      </g>

      {/* floor / reed mat */}
      <path d="M 20 400 L 580 400 L 580 580 L 20 580 Z" {...reg(fills, onRegion, 'floor')} />
      <line x1="20" y1="430" x2="580" y2="430" stroke={STROKE} strokeWidth="1.4" />
      {/* reed mat under scribe */}
      <path d="M 80 530 L 320 530 L 320 564 L 80 564 Z" {...reg(fills, onRegion, 'mat')} />
      {[100,140,180,220,260,300].map((x,i) => (
        <line key={`m-${i}`} x1={x} y1="530" x2={x} y2="564" stroke={STROKE} strokeWidth="1.2" />
      ))}
      {[540,548,556].map((y,i) => (
        <line key={`mh-${i}`} x1="80" y1={y} x2="320" y2={y} stroke={STROKE} strokeWidth="1" />
      ))}

      {/* ---- SCRIBE — sitting cross-legged ---- */}
      {/* legs crossed (one shape) */}
      <path d="M 120 480 Q 90 510 100 540 L 300 540 Q 310 510 280 480 Q 270 472 240 472 L 160 472 Q 130 472 120 480 Z" {...reg(fills, onRegion, 'legs')} />
      {/* visible foot under crossed legs */}
      <ellipse cx="150" cy="528" rx="14" ry="6" {...reg(fills, onRegion, 'foot')} />

      {/* loincloth / kilt */}
      <path d="M 152 432 L 248 432 L 256 476 L 144 476 Z" {...reg(fills, onRegion, 'kilt')} />
      <line x1="200" y1="436" x2="200" y2="472" stroke={STROKE} strokeWidth="1.4" />
      <line x1="172" y1="438" x2="170" y2="472" stroke={STROKE} strokeWidth="1.4" />
      <line x1="228" y1="438" x2="230" y2="472" stroke={STROKE} strokeWidth="1.4" />
      {/* belt sash */}
      <rect x="146" y="428" width="108" height="8" {...reg(fills, onRegion, 'belt')} />

      {/* torso */}
      <path d="M 156 330 L 244 330 L 252 432 L 148 432 Z" {...reg(fills, onRegion, 'torso')} />
      {/* chest definition */}
      <path d="M 170 348 Q 200 360 230 348" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* broad collar */}
      <path d="M 144 332 Q 200 358 256 332 Q 256 360 200 368 Q 144 360 144 332 Z" {...reg(fills, onRegion, 'collar')} />
      {[164,188,212,236].map((x,i) => (
        <circle key={`s-${i}`} cx={x} cy="350" r="1.8" fill={STROKE} stroke="none" />
      ))}

      {/* left arm — supporting papyrus across lap */}
      <path d="M 156 348 Q 130 380 144 432 L 162 430 Q 158 396 172 372 Z" {...reg(fills, onRegion, 'arm-l')} />
      {/* hand */}
      <ellipse cx="148" cy="436" rx="10" ry="8" {...reg(fills, onRegion, 'hand-l')} />

      {/* right arm — holding reed pen, writing */}
      <path d="M 244 348 Q 280 372 304 414 L 290 424 Q 268 396 240 380 Z" {...reg(fills, onRegion, 'arm-r')} />
      <ellipse cx="304" cy="420" rx="10" ry="8" {...reg(fills, onRegion, 'hand-r')} />
      {/* reed pen */}
      <line x1="306" y1="416" x2="350" y2="448" stroke={STROKE} strokeWidth="2.4" />
      <path d="M 348 444 L 358 454 L 348 454 Z" fill={STROKE} stroke="none" />

      {/* papyrus scroll across lap */}
      <path d="M 100 446 L 320 446 L 326 490 L 94 490 Z" {...reg(fills, onRegion, 'papyrus')} />
      {/* lines of writing on papyrus — non-colorable */}
      <g stroke={STROKE} strokeWidth="1.6" fill="none">
        {/* row 1 - eye, ankh, bird */}
        <path d="M 116 458 Q 124 452 132 458 Q 124 466 116 458 Z" />
        <circle cx="124" cy="458" r="2" fill={STROKE} />
        <circle cx="148" cy="456" r="3" />
        <line x1="148" y1="459" x2="148" y2="464" />
        <line x1="145" y1="461" x2="151" y2="461" />
        <path d="M 168 460 L 178 458 L 178 464 L 168 466 Z" />
        {/* row 2 - feather, lotus, wave */}
        <path d="M 200 458 L 196 466 Q 200 470 204 466 Z" />
        <line x1="200" y1="458" x2="200" y2="466" />
        <path d="M 220 466 Q 214 460 218 456 Q 222 460 220 466 Z" />
        <path d="M 240 462 Q 244 458 248 462 Q 252 466 256 462" />
        {/* row 3 */}
        <ellipse cx="118" cy="478" rx="5" ry="3" />
        <line x1="118" y1="475" x2="118" y2="482" />
        <circle cx="142" cy="478" r="3" />
        <line x1="139" y1="478" x2="145" y2="478" />
        <line x1="142" y1="475" x2="142" y2="482" />
        <path d="M 162 480 Q 168 476 174 480 Q 180 484 186 480" />
        <path d="M 200 478 Q 210 474 220 478 L 218 484 L 202 484 Z" />
        <circle cx="244" cy="478" r="4" />
        <path d="M 272 480 L 268 488 Q 272 492 276 488 Z" />
      </g>

      {/* ink palette beside scribe — small dish */}
      <ellipse cx="356" cy="498" rx="22" ry="6" {...reg(fills, onRegion, 'palette')} />
      <ellipse cx="346" cy="496" rx="5" ry="3" fill={STROKE} stroke="none" />
      <ellipse cx="366" cy="496" rx="5" ry="3" fill={STROKE} stroke="none" />

      {/* neck */}
      <path d="M 188 296 L 212 296 L 214 326 L 186 326 Z" {...reg(fills, onRegion, 'neck')} />

      {/* face — profile (facing right toward writing) */}
      <path d="M 168 244 Q 168 296 200 300 Q 240 300 244 254 Q 242 220 220 210 Q 188 210 168 244 Z" {...reg(fills, onRegion, 'face')} />
      {/* ear */}
      <path d="M 174 264 Q 162 264 160 274 Q 168 280 174 278 Z" {...reg(fills, onRegion, 'ear')} />
      <circle cx="170" cy="272" r="2" fill={STROKE} stroke="none" />
      {/* wig — black, sleek bob */}
      <path d="M 168 236 Q 162 192 220 188 Q 252 196 252 236 Q 244 232 244 252 L 168 250 Z" {...reg(fills, onRegion, 'wig')} />
      {/* wig back behind ear */}
      <path d="M 168 250 Q 156 280 162 300 L 178 300 Q 172 280 178 252 Z" {...reg(fills, onRegion, 'wig-back')} />
      {/* eye - profile */}
      <ellipse cx="222" cy="252" rx="5" ry="2.6" fill="#FFFDF5" stroke={STROKE} strokeWidth="1.6" />
      <circle cx="224" cy="252" r="1.6" fill={STROKE} stroke="none" />
      {/* eyebrow */}
      <path d="M 216 244 Q 224 240 232 244" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* nose - profile */}
      <path d="M 240 254 L 248 268 L 242 274" fill="none" stroke={STROKE} strokeWidth="1.6" />
      {/* mouth */}
      <path d="M 232 282 Q 238 286 244 282" fill="none" stroke={STROKE} strokeWidth="1.6" />

      {/* banner */}
      <rect x="350" y="540" width="200" height="34" rx="6" {...reg(fills, onRegion, 'banner')} />
      <text x="450" y="563" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="17" fontWeight="800" fill={STROKE} stroke="none" style={{ pointerEvents: 'none' }}>THE ROYAL SCRIBE</text>
    </svg>
  );
}

// ============================================================
// Page entries
// ============================================================
const EGYPTIAN_PAGES = [
  {
    id: 'tut-mask',
    title: "Tutankhamun's Mask",
    subtitle: 'Valley of the Kings, 1323 BC',
    collection: 'world',
    eraLabel: 'Ancient Egypt',
    eraColor: '#C58D2A',
    bgPreview: '#1B2D52',
    fact: "King Tut was crowned at nine and ruled for ten short years. When his tomb was found in 1922, his golden burial mask was almost untouched after 3,300 years.",
    Component: TutMaskSVG,
    readingLevel: { lexile: 740, gradeBand: '3–4', guidedReading: 'N', wordCount: 24, complexity: 'Moderate' },
    keyVocab: ['pharaoh', 'tomb', 'mask', 'reign'],
    standards: ['RI.3.4', 'RI.4.1', 'SL.3.2', 'L.4.4'],
    regions: ['background','glyph-col-l','glyph-col-r','nemes-back-l','nemes-back-r','nemes-cap','forehead-band','lappet-l','lappet-r','vulture','cobra','face','beard','collar-outer','collar-mid','collar-inner','banner'],
    quest: {
      heading: 'The Boy King',
      author: 'Ancient Egypt · c. 1323 BC',
      lines: [
        'I am the boy king, my name is {0}.',
        'They wrapped my body to last forever as a {1}.',
        'My golden mask was hidden in a {2}.',
      ],
      blanks: [
        { answer: 'Tut',   choices: ['Tut',   'Top',   'Toad',  'Tickle']  },
        { answer: 'mummy', choices: ['mummy', 'muffin','marble','monster'] },
        { answer: 'tomb',  choices: ['tomb',  'toaster','tail',  'tower']  },
      ],
      voice: {
        // Young, soft, mysterious
        hints: [/karen/i, /samantha/i, /allison/i, /ava/i, /microsoft (aria|zira)/i, /susan/i],
        rate: 0.78, pitch: 1.02,
      },
    },
  },
  {
    id: 'cleopatra',
    title: 'Cleopatra',
    subtitle: 'Last Queen of Egypt, 51 BC',
    collection: 'world',
    eraLabel: 'Ptolemaic Egypt',
    eraColor: '#B6735A',
    bgPreview: '#F6DEB0',
    fact: "Cleopatra spoke nine languages and was the first Ptolemaic ruler to learn Egyptian. She wore the cobra crown of the pharaohs and ruled Egypt for nearly 22 years.",
    Component: CleopatraSVG,
    readingLevel: { lexile: 820, gradeBand: '4–5', guidedReading: 'P', wordCount: 26, complexity: 'Challenging' },
    keyVocab: ['queen', 'pharaoh', 'throne', 'reign', 'Ptolemy'],
    standards: ['RI.4.4', 'RI.4.1', 'SL.4.2', 'L.4.4'],
    regions: ['sky','sun','pillar-l','pillar-l-cap','lotus-l','pillar-r','pillar-r-cap','lotus-r','floor','throne-back','throne-panel','lion-l','lion-r','dress-lap','foot-l','foot-r','dress-top','arm-r','ankh-loop','ankh-bar','ankh-cross','arm-l','hand-l','collar-outer','collar-inner','neck','face','hair-l','hair-r','bangs','diadem','horn-l','horn-r','sun-disc','uraeus','banner'],
    quest: {
      heading: 'Queen of the Nile',
      author: 'Cleopatra VII · 51–30 BC',
      lines: [
        'I am Cleopatra, the last {0} of Egypt.',
        'My throne stands by the great river {1}.',
        'In my hand I hold the {2}, the key of life.',
      ],
      blanks: [
        { answer: 'queen', choices: ['queen', 'quail',  'quilt',   'quack']  },
        { answer: 'Nile',  choices: ['Nile',  'Noodle', 'Nest',    'Nickel'] },
        { answer: 'ankh',  choices: ['ankh',  'apple',  'arrow',   'acorn']  },
      ],
      voice: {
        // Regal, measured female voice
        hints: [/samantha/i, /karen/i, /allison/i, /ava/i, /serena/i, /microsoft (aria|zira|jenny)/i],
        rate: 0.80, pitch: 1.00,
      },
    },
  },
  {
    id: 'anubis',
    title: 'Anubis',
    subtitle: 'Guide of Souls',
    collection: 'world',
    eraLabel: 'Egyptian Mythology',
    eraColor: '#3F3F46',
    bgPreview: '#D8C19A',
    fact: "Anubis was the jackal-headed god who watched over tombs. Ancient Egyptians believed he weighed each person's heart against the feather of truth.",
    Component: AnubisSVG,
    readingLevel: { lexile: 780, gradeBand: '3–4', guidedReading: 'O', wordCount: 24, complexity: 'Moderate' },
    keyVocab: ['jackal', 'afterlife', 'scales', 'feather', 'judgment'],
    standards: ['RL.4.3', 'RI.4.4', 'SL.4.2', 'L.4.4'],
    regions: ['sky','wall','floor','scales-base','scales-pillar','scales-beam','pan-l','pan-r','heart','feather','sandal-l','sandal-r','leg-l','leg-r','kilt','kilt-fold','belt','torso','collar','collar-inner','arm-l','hand-l','arm-r','scepter-head','scepter-base','neck','jackal-head','snout','ear-l','ear-r','banner'],
    quest: {
      heading: 'Weigher of Hearts',
      author: 'Egyptian Myth · Book of the Dead',
      lines: [
        'I am Anubis, with the head of a {0}.',
        'I weigh each heart against a soft white {1}.',
        'I guide the soul to the great {2}.',
      ],
      blanks: [
        { answer: 'jackal',    choices: ['jackal',    'jellyfish','jaguar', 'jackrabbit'] },
        { answer: 'feather',   choices: ['feather',   'flower',   'fish',    'frog']      },
        { answer: 'afterlife', choices: ['afterlife', 'aquarium', 'attic',   'avenue']    },
      ],
      voice: {
        // Deep, solemn voice
        hints: [/bruce/i, /daniel/i, /tom/i, /fred/i, /alex/i, /microsoft mark/i],
        rate: 0.70, pitch: 0.72,
      },
    },
  },
  {
    id: 'scribe',
    title: 'The Royal Scribe',
    subtitle: 'Writing on Papyrus',
    collection: 'world',
    eraLabel: 'Ancient Egypt',
    eraColor: '#A07534',
    bgPreview: '#EEDFC0',
    fact: "Only a tiny fraction of ancient Egyptians could read or write. Scribes spent years memorizing more than 700 hieroglyphic symbols and worked for the pharaoh, temples, and tax collectors.",
    Component: ScribeSVG,
    readingLevel: { lexile: 700, gradeBand: '3–4', guidedReading: 'N', wordCount: 26, complexity: 'Moderate' },
    keyVocab: ['scribe', 'papyrus', 'hieroglyph', 'reed', 'cartouche'],
    standards: ['RI.3.7', 'RI.3.4', 'RI.4.1', 'SL.3.2'],
    regions: ['sky','wall','cartouche','floor','mat','legs','foot','kilt','belt','torso','collar','arm-l','hand-l','arm-r','hand-r','papyrus','palette','neck','face','ear','wig','wig-back','banner'],
    quest: {
      heading: 'The Scribe\u2019s Craft',
      author: 'Ancient Egypt · 1500 BC',
      lines: [
        'I sit on my mat and write on {0}.',
        'Each picture I draw is a {1}.',
        'My pen is made of a sharpened {2}.',
      ],
      blanks: [
        { answer: 'papyrus',    choices: ['papyrus',    'pizza',    'pillow',   'pickle']    },
        { answer: 'hieroglyph', choices: ['hieroglyph', 'hamburger','helicopter','hat']     },
        { answer: 'reed',       choices: ['reed',       'rabbit',   'rocket',   'ribbon']    },
      ],
      voice: {
        // Patient, scholarly narrator
        hints: [/daniel/i, /alex/i, /reed/i, /tom/i, /serena/i, /microsoft (mark|guy)/i],
        rate: 0.80, pitch: 0.92,
      },
    },
  },
];

if (window.PAGES_DATA && Array.isArray(window.PAGES_DATA)) {
  EGYPTIAN_PAGES.forEach(p => window.PAGES_DATA.push(p));
}

Object.assign(window, { TutMaskSVG, CleopatraSVG, AnubisSVG, ScribeSVG });
