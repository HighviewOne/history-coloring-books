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
| 📊 **Teacher Dashboard** | KPIs, Lexile reading-level map, era coverage, per-page progress table — PIN gated |
| 📱 **Mobile Version** | iPhone-frame preview with bottom dock, slide-up sheets, and touch-first controls |
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
| UI | React 18.3.1 + ReactDOM (UMD via unpkg — no build step) |
| JSX | Babel Standalone 7.29.0 (transpiled in-browser at runtime) |
| Fonts | Google Fonts: Fraunces · Nunito · Caveat |
| Narration | Web Speech API (voice profiles per historical figure) |
| Sound FX | WebAudio API (crayon scribble, correct arpeggio, cheer sparkle) |
| Drawing | SVG region-fill + SVG freehand brush (midpoint Bézier smoothing; eraser strokes are SVG masks) |
| State | localStorage keys `hcb-progress-v1` (progress) and `hcb-tweaks-v1` (settings) — no backend, single-device. A banner appears if the browser refuses to save |
| Hosting | GitHub Pages (root of `main` branch) |

---

## Running Locally

The JSX files load via relative `src=` references, so opening the HTML as a `file://` URL won't work. Serve it over HTTP:

```bash
git clone https://github.com/HighviewOne/history-coloring-books.git
cd history-coloring-books
python3 -m http.server 8080
```

Then open one of:
- **Landing page:** http://localhost:8080/
- **Desktop:** http://localhost:8080/History%20Coloring%20Books.html
- **Mobile:** http://localhost:8080/History%20Coloring%20Books%20Mobile.html

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
├── brush-layer.jsx                   ← Freehand drawing engine (shared)
├── audio.jsx                         ← Speech + sound wrappers (shared)
├── tweaks-panel.jsx                  ← Settings panel (shared)
│
├── *-pages.jsx                       ← SVG coloring page definitions
└── LICENSE                           ← MIT license
```

---

## License

The code and original artwork are released under the [MIT License](LICENSE).

Word Quest passages quote historical speeches and writings. Those texts are not covered by the MIT license, and their original rights holders keep whatever rights they have. Some, such as Dr. Martin Luther King Jr.'s "I Have a Dream" (1963), are still under copyright and are quoted in short excerpts for educational use. If you reuse or redistribute this project, check the status of any quoted text yourself.

---

## Contributing

Suggestions, bug reports, and new coloring page ideas are welcome — please [open an issue](https://github.com/HighviewOne/history-coloring-books/issues).

---

<div align="center">
  <sub>Made with ✏️ for curious elementary students · Progress saved locally · No accounts required</sub>
</div>
