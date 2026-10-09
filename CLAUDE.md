# History Coloring Books — notes for Claude

Live on GitHub Pages from the root of `main` (https://highviewone.github.io/history-coloring-books/).
Merging or pushing to `main` publishes it, so confirm with the user first. Work goes through a PR;
CI must be green.

## Workflow

- Edit the `.jsx` files, then `npm run build` and commit `dist/`. The HTML loads `dist/desktop.js` /
  `dist/mobile.js`, never the `.jsx` files. CI fails if `dist/` is stale.
- `npm test` runs `tests/app.test.js` (node:test + playwright-core, offline). Run it before every push.
- New `.jsx` file → add it to the lists in `build.mjs` (they set the load order).

## Gotchas

- The `.jsx` files share one global scope: `build.mjs` joins them in order inside one IIFE rather
  than bundling them as modules, and files use each other's top-level names directly (e.g. `MLKSVG`,
  `STROKE_W`). That's why files alias hooks (`useState: useStateCol`): a duplicate top-level
  `const` breaks the build.
- Logic shared by desktop and mobile lives in `shared-hooks.jsx` (progress store, coloring tools,
  Word Quest, `useDialog`, read-aloud). Fix behavior there, not in one screen.
- `reg(fills, onRegion, id)` in `pages-data.jsx` builds every region's props, including keyboard
  focus and the aria-label (from the id). Display-only renders (thumbnails, celebration,
  dashboard) must pass `onRegion={null}` so they stay out of the Tab order.
- Progress saves wait for a 600 ms pause in edits and save right away on `pagehide` or when the tab
  is hidden. Tests read saved progress via a helper that dispatches `pagehide` first.
- The Tweaks panel only opens on a `__activate_edit_mode` postMessage (built for a design-tool host);
  the mobile ⚙️ button posts it to its own window. Desktop settings live in the Grown-ups dashboard.

## Testing in a browser by hand

- Playwright's `.click()` on desktop library cards silently misses (100vh, overflow-hidden root):
  click with `el.click()` inside `page.evaluate`. Clear/Reset call `confirm()`, so stub it.
- Force the save-failure banner by making `Storage.prototype.setItem` throw for `hcb-progress-v1`.
- Close Chromium when done (this machine has 15 GB RAM).
