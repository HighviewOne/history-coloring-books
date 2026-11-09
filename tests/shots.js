// Visual check: `npm run shots` (after `npm run build`) captures the main screens into
// shots/<desktop|tablet|phone|phone-desktop-page>/. Nothing here asserts on looks — the pictures are for a
// person (or Claude) to look over for what the tests can't see: clipped text, overlapping
// controls, a cramped phone layout. shots/ is git-ignored; `npm test` skips this file.
// Same offline setup as app.test.js: React from node_modules, every outside request blocked.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright-core');

const root = path.join(__dirname, '..');
const out = path.join(root, 'shots');
const UNPKG = {
  'react@18.3.1/umd/react.production.min.js': path.join(root, 'node_modules/react/umd/react.production.min.js'),
  'react-dom@18.3.1/umd/react-dom.production.min.js': path.join(root, 'node_modules/react-dom/umd/react-dom.production.min.js'),
};
const TYPES = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml' };

const DESKTOP = 'History Coloring Books.html';
const MOBILE = 'History Coloring Books Mobile.html';
const SIZES = [
  { name: 'desktop', html: DESKTOP, viewport: { width: 1280, height: 900 } },
  { name: 'tablet', html: DESKTOP, viewport: { width: 820, height: 1180 } },
  { name: 'phone', html: MOBILE, viewport: { width: 390, height: 844 }, mobile: true },
  // The start page offers both versions, so a phone visitor can open the desktop one too
  { name: 'phone-desktop-page', html: DESKTOP, viewport: { width: 390, height: 844 }, touch: true },
];

// Playwright's own click misses inside the app's 100vh overflow-hidden root
const clickButton = (page, src) => page.evaluate((src) => {
  const re = new RegExp(src, 'i');
  const el = [...document.querySelectorAll('button')].find(b => re.test(b.innerText.trim()));
  if (!el) throw new Error('no button matching ' + src);
  el.click();
}, src);
const openPage = async (page, title) => {
  await page.evaluate((t) => [...document.querySelectorAll('button')]
    .find(b => b.innerText.includes(t) && b.querySelector('svg')).click(), title);
  await page.waitForSelector('[data-region]');
};
const fillSome = async (page) => {
  for (const [crayon, n] of [['Sky', 0], ['Cherry', 1], ['Sunshine', 2]]) {
    await page.click(`button[title="${crayon}"]`).catch(() => {});
    await page.locator('[data-region]').nth(n).dispatchEvent('click');
  }
};

// Each scene gets a fresh page to one state; null means "not on this layout"
const SCENES = {
  '01-library': async () => {},
  '02-coloring-blank': async (page) => { await openPage(page, 'Liberty Bell'); },
  '03-coloring-started': async (page) => { await openPage(page, 'Liberty Bell'); await fillSome(page); },
  '04-celebration': async (page) => {
    await openPage(page, 'Liberty Bell');
    await clickButton(page, 'random$');
    await page.waitForFunction(() => /woohoo/i.test(document.body.innerText), null, { timeout: 5000 });
  },
  '05-word-quest': async (page) => {
    await openPage(page, 'Liberty Bell');
    await page.evaluate(() => [...document.querySelectorAll('button')].find(b => b.innerText.includes('📜')).click());
    await clickButton(page, 'hint');
  },
  '06-world-page': async (page) => { await openPage(page, 'Great Wall'); await fillSome(page); },
  '07-grown-ups-gate': async (page, size) => {
    if (size.mobile) return null;
    await clickButton(page, 'Grown-Ups');
  },
  '08-dashboard': async (page, size) => {
    if (size.mobile) return null;
    await clickButton(page, 'Grown-Ups');
    await page.waitForTimeout(300);
    const [a, b] = (await page.evaluate(() => document.body.innerText)).match(/(\d+) × (\d+)/).slice(1).map(Number);
    await page.evaluate((n) => [...document.querySelectorAll('button')].find(el => el.innerText.trim() === String(n)).click(), a * b);
  },
};

(async () => {
  const server = http.createServer((req, res) => {
    const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch();
  let failed = 0, shot = 0;
  try {
    for (const size of SIZES) {
      fs.mkdirSync(path.join(out, size.name), { recursive: true });
      for (const [name, setUp] of Object.entries(SCENES)) {
        const ctx = await browser.newContext({ viewport: size.viewport, reducedMotion: 'reduce', hasTouch: !!(size.mobile || size.touch) });
        await ctx.route('**/*', r => {
          const url = r.request().url();
          if (url.startsWith('https://unpkg.com/')) {
            const local = UNPKG[url.slice('https://unpkg.com/'.length)];
            return local ? r.fulfill({ path: local, contentType: 'application/javascript', headers: { 'access-control-allow-origin': '*' } }) : r.abort();
          }
          return url.startsWith(base) ? r.continue() : r.abort();
        });
        await ctx.addInitScript(() => {
          window.confirm = () => true;
          localStorage.setItem('hcb-tweaks-v1', JSON.stringify({ auto_narrate: false }));
        });
        const page = await ctx.newPage();
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        try {
          await page.goto(base + encodeURI(size.html));
          await page.waitForFunction(() => document.querySelectorAll('svg').length > 20, null, { timeout: 30000 });
          if (await setUp(page, size) === null) { await ctx.close(); continue; }
          await page.waitForTimeout(500);   // let dialogs and fills settle
          await page.screenshot({ path: path.join(out, size.name, name + '.png'), animations: 'disabled' });
          shot++;
          console.log(`✓ ${size.name}/${name}${errors.length ? '  page errors: ' + errors.join('; ') : ''}`);
        } catch (e) {
          failed++;
          console.log(`✗ ${size.name}/${name}: ${e.message.split('\n')[0]}`);
        }
        await ctx.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
  console.log(`${shot} screenshots in shots/${failed ? `, ${failed} failed` : ''}`);
  process.exitCode = failed ? 1 : 0;
})();
