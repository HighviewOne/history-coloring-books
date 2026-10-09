<div align="center">

# 📚 History Coloring Books

**Color famous scenes from history · Hear the speeches · Earn stickers**

An interactive learning app for elementary students — covering US History and World History through coloring, read-aloud narration, and fill-in-the-blank Word Quests.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-C8102E?style=for-the-badge&logo=github)](https://highviewone.github.io/history-coloring-books/)
[![Desktop](https://img.shields.io/badge/Version-Desktop%20%2F%20Tablet-1B4965?style=for-the-badge&logo=monitor)](https://highviewone.github.io/history-coloring-books/History%20Coloring%20Books.html)
[![Mobile](https://img.shields.io/badge/Version-Mobile%20Preview-E8A33D?style=for-the-badge&logo=apple)](https://highviewone.github.io/history-coloring-books/History%20Coloring%20Books%20Mobile.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-5A8F4A?style=for-the-badge)](LICENSE)

</div>

---

## What It Is

History Coloring Books turns famous moments in history into interactive coloring pages. Students tap to fill regions with color, use a free-form crayon brush, earn animated stickers, and complete **Word Quests** — fill-in-the-blank exercises built from real historical speeches and texts.

**Best experienced in Chrome or Safari.** Firefox has limited Web Speech support.

---

## Features

| Feature | Description |
|---|---|
| 🎨 **Tap-to-Fill + Crayon Brush** | Fill named regions with color, or switch to freehand brush mode with blend-mode layering; the brush eraser removes brush paint without touching the line art |
| 🔊 **Read-Aloud Narration** | Web Speech API voices, tuned per historical figure (Lincoln, MLK, Cleopatra, and more) |
| 📜 **Word Quests** | Fill-in-the-blank on famous speeches; tap-choice or drag-and-drop; line-by-line read-aloud |
| 🏅 **Sticker Rewards** | Animated sticker reveals (waving flags, spinning suns, confetti) after completing each page |
| 📊 **Teacher Dashboard** | KPIs, Lexile reading-level map, era coverage, per-page progress table, time on task — behind a grown-ups times-table question |
| 📱 **Mobile Version** | iPhone-frame preview with bottom dock, slide-up sheets, and touch-first controls |
| ⌨️ **Accessibility** | Color with the keyboard (Tab to a region, Enter or Space to fill); screen-reader names for regions and buttons; pop-ups take focus and close with Escape; animations finish instantly with the system "reduce motion" setting |
| 🎛️ **Settings** | Theme, animation style, sound, auto-narrate, voice speed/pitch, age density (K–2 / Grade 3–5). Desktop: in the Grown-ups dashboard. Mobile: the ⚙️ button on the library screen |

---

## Content — 62 Coloring Pages

### US History
Mayflower 1620 · Liberty Bell 1776 · Lewis & Clark 1804 · Lincoln 1863 · Statue of Liberty 1886 · Wright Brothers 1903 · Rosie the Riveter 1942 · MLK 1963 · Apollo 11 1969 · Harriet Tubman

### World History
**Egypt** — Pyramid, Tutankhamun, Cleopatra, Anubis, Scribe  
**Greece & Rome** — Parthenon, Trojan Horse, Zeus, Colosseum, Legionary, She-Wolf  
**Europe** — Medieval Castle, Shakespeare's Globe, Eiffel Tower, Joan of Arc, Hagia Sophia, Marco Polo  
**China** — Great Wall, Terracotta Warrior, Dragon, Forbidden City, Zheng He  
**Japan** — Samurai, Mt. Fuji, Torii Gate, The Great Wave  
**India** — Taj Mahal, Gandhi, Maharaja, Ganesh  
**Africa** — Mansa Musa, Maasai, Great Zimbabwe, Mandela  
**Latin America** — Machu Picchu, Aztec Sun Stone, Chichén Itzá, Christ the Redeemer  
**Foundational** — Stonehenge, Ziggurat of Ur, Lascaux, Persepolis, Angkor Wat, Moai, Buddha, St. Basil's, Steam Locomotive, Uluru  
**Exploration** — Santa María, Viking Longship, Leonardo's Workshop  

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18.3.1 + ReactDOM (production UMD via unpkg) |
| Build | esbuild compiles the `.jsx` files into `dist/desktop.js` and `dist/mobile.js` (committed) |
| Tests | Node's test runner + Playwright (headless Chromium), offline |
| Fonts | Google Fonts: Fraunces · Nunito · Caveat |
| Narration | Web Speech API (voice profiles per historical figure) |
| Sound FX | WebAudio API (crayon scribble, correct arpeggio, cheer sparkle) |
| Drawing | SVG region-fill + SVG freehand brush (midpoint Bézier smoothing; eraser strokes are SVG masks) |
| State | localStorage keys `hcb-progress-v1` (progress) and `hcb-tweaks-v1` (settings) — no backend, single-device. Saves once edits pause and when the page is hidden; two open tabs merge each other's saves. A banner appears if the browser refuses to save |
| Hosting | GitHub Pages (root of `main` branch) — merging to `main` publishes the site |

---

## Running Locally

You can open the HTML files straight from disk, or serve the folder over HTTP:

```bash
git clone https://github.com/HighviewOne/history-coloring-books.git
cd history-coloring-books
python3 -m http.server 8080
```

Then open one of:
- **Landing page:** http://localhost:8080/
- **Desktop:** http://localhost:8080/History%20Coloring%20Books.html
- **Mobile:** http://localhost:8080/History%20Coloring%20Books%20Mobile.html

## Making Changes

The pages load the compiled `dist/*.js`, not the `.jsx` files. After editing any `.jsx` file:

```bash
npm install          # first time only
npm run build        # rebuild dist/desktop.js and dist/mobile.js
npm test             # browser tests (first time: npx playwright-core install chromium)
```

Commit the rebuilt `dist/` with your change. CI fails if `dist/` doesn't match the sources.
New `.jsx` files must be added to the file lists in `build.mjs`, which set the load order.

The `.jsx` files are plain scripts that share one global scope (the build joins them in order;
it doesn't treat them as modules). Two files can't declare the same top-level `const`; the
build fails if they do.

`npm test` runs the browser tests in `tests/app.test.js` offline. They check every page's
regions and Word Quest, then color, celebrate and solve a quest on desktop and mobile, and cover
keyboard use, reduced motion, saving and two open tabs.

### Adding a coloring page

1. Draw the SVG component in one of the `*-pages.jsx` files. Give each colorable shape
   `{...reg(fills, onRegion, 'region-id')}`. The id is also the name screen readers hear, so make it readable (`hat-brim`).
2. Add the page object to that file's list: `id`, `title`, `subtitle`, `collection` (`us` or `world`),
   `eraLabel`, `eraColor`, `bgPreview`, `fact`, `Component`, `readingLevel`, `regions` (every id from step 1)
   and `quest` (`lines` with `{0}`, `{1}`… blanks, plus `blanks` with `answer` and `choices`).
3. `npm run build && npm test`. The tests fail if a listed region is missing from the SVG, or if a
   quest blank has no matching `{n}` or its answer isn't one of its choices.

---

## Project Structure

```
/
├── index.html                        ← Landing page (GitHub Pages entry point)
├── History Coloring Books.html       ← Desktop/tablet entry point
├── History Coloring Books Mobile.html← Mobile entry point (iPhone frame)
│
├── app.jsx                           ← Desktop routing + state
├── mobile-app.jsx                    ← Mobile routing + state
├── mobile-library.jsx                ← Mobile library screen
├── mobile-coloring.jsx               ← Mobile coloring screen
├── mobile-modals.jsx                 ← Mobile celebration + Word Quest sheets
│
├── library-screen.jsx                ← Desktop library
├── coloring-screen.jsx               ← Desktop coloring
├── celebration.jsx                   ← Desktop sticker celebration
├── speech-game.jsx                   ← Desktop Word Quest
├── dashboard.jsx / dashboard-bits.jsx← Teacher dashboard
│
├── pages-data.jsx                    ← Master page registry (shared)
├── shared-hooks.jsx                  ← Progress, coloring + Word Quest logic (shared)
├── brush-layer.jsx                   ← Freehand drawing engine (shared)
├── audio.jsx                         ← Speech + sound wrappers (shared)
├── tweaks-panel.jsx                  ← Settings panel (shared)
│
├── *-pages.jsx                       ← SVG coloring page definitions
│
├── build.mjs                         ← Compiles the .jsx files (npm run build)
├── dist/                             ← Compiled app code the pages load (committed)
├── tests/                            ← Browser tests (npm test)
├── .github/workflows/ci.yml          ← CI: dist/ up to date + tests, on PRs and main
└── LICENSE                           ← MIT license
```

---

## License

The code and original artwork are released under the [MIT License](LICENSE).

Word Quest passages quote historical speeches and writings. Those texts are not covered by the MIT license, and their original rights holders keep whatever rights they have. Some, such as Dr. Martin Luther King Jr.'s "I Have a Dream" (1963), are still under copyright and are quoted in short excerpts for educational use. If you reuse or redistribute this project, check the status of any quoted text yourself.

---

## Contributing

Suggestions, bug reports, and new coloring page ideas are welcome — please [open an issue](https://github.com/HighviewOne/history-coloring-books/issues).
Pull requests run CI (the build check and browser tests) before they can be merged.

---

<div align="center">
  <sub>Made with ✏️ for curious elementary students · Progress saved locally · No accounts required</sub>
</div>
