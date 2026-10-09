// Browser tests for the built app (dist/). Run with `npm test` after `npm run build`.
// Serves the repo on a local port, loads React from node_modules instead of
// unpkg, and blocks every other outside request (Google Fonts), so it runs offline.
// Needs a Chromium for playwright-core: `npx playwright-core install chromium`.
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright-core');

const root = path.join(__dirname, '..');
const UNPKG = {
  'react@18.3.1/umd/react.production.min.js': path.join(root, 'node_modules/react/umd/react.production.min.js'),
  'react-dom@18.3.1/umd/react-dom.production.min.js': path.join(root, 'node_modules/react-dom/umd/react-dom.production.min.js'),
};
const TYPES = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml' };

let server, base, browser;

test.before(async () => {
  server = http.createServer((req, res) => {
    const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}/`;
  browser = await chromium.launch();
});

test.after(async () => {
  if (browser) await browser.close();
  if (server) server.close();
});

async function openApp(htmlFile, tweaks = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await ctx.route('**/*', r => {
    const url = r.request().url();
    if (url.startsWith('https://unpkg.com/')) {
      const local = UNPKG[url.slice('https://unpkg.com/'.length)];
      return local ? r.fulfill({ path: local, contentType: 'application/javascript', headers: { 'access-control-allow-origin': '*' } }) : r.abort();
    }
    return url.startsWith(base) ? r.continue() : r.abort();
  });
  await ctx.addInitScript((tw) => {
    window.confirm = () => true;
    localStorage.setItem('hcb-tweaks-v1', JSON.stringify({ auto_narrate: false, ...tw }));
  }, tweaks);
  await page.goto(base + encodeURI(htmlFile));
  await page.waitForFunction(() => document.querySelectorAll('svg').length > 20, null, { timeout: 30000 });
  return { ctx, page, errors };
}

// Saves wait for a pause in edits; 'pagehide' (leaving the page) saves right away.
const progress = (page, id) => page.evaluate((id) => {
  window.dispatchEvent(new Event('pagehide'));
  return (JSON.parse(localStorage.getItem('hcb-progress-v1') || '{}'))[id] || {};
}, id);
const bodyText = (page) => page.evaluate(() => document.body.innerText);
// Click the first button whose visible text matches `re` (Playwright's own
// click misses inside the 100vh overflow:hidden root).
const clickText = (page, re) => page.evaluate(([src, flags]) => {
  const re = new RegExp(src, flags);
  const el = [...document.querySelectorAll('button')].find(b => re.test(b.innerText.trim()));
  if (!el) throw new Error('no button matching ' + src);
  el.click();
}, [re.source, re.flags]);

test('every page: regions match the SVG and the Word Quest is solvable', async () => {
  const { ctx, page, errors } = await openApp('History Coloring Books.html');
  const issues = await page.evaluate(async () => {
    const out = [];
    const ids = new Set();
    const host = document.createElement('div');
    document.body.appendChild(host);
    for (const pg of PAGES_DATA) {
      const bad = (m) => out.push(`${pg.id}: ${m}`);
      if (ids.has(pg.id)) bad('duplicate page id');
      ids.add(pg.id);
      for (const k of ['title', 'subtitle', 'eraLabel', 'eraColor', 'bgPreview', 'fact', 'Component', 'regions', 'quest', 'readingLevel']) if (!pg[k]) bad('missing ' + k);
      if (!['us', 'world'].includes(pg.collection)) bad('bad collection ' + pg.collection);
      const rootEl = ReactDOM.createRoot(host);
      await new Promise(r => { rootEl.render(React.createElement(pg.Component, { fills: {}, onRegion: () => {}, alive: false })); setTimeout(r, 20); });
      const inSvg = [...host.querySelectorAll('[data-region]')].map(e => e.getAttribute('data-region'));
      rootEl.unmount();
      const svgSet = new Set(inSvg);
      const missing = pg.regions.filter(r => !svgSet.has(r));
      if (missing.length) bad('listed regions missing from the SVG (page can never reach 100%): ' + missing.join(','));
      const uncounted = [...svgSet].filter(r => !pg.regions.includes(r));
      if (uncounted.length) bad('SVG regions not in the regions list: ' + uncounted.join(','));
      if (new Set(pg.regions).size !== pg.regions.length) bad('duplicate entries in regions list');
      const q = pg.quest;
      const nums = (q.lines.join(' ').match(/\{(\d+)\}/g) || []).map(t => +t.slice(1, -1));
      if (new Set(nums).size !== nums.length) bad('a blank placeholder is repeated');
      nums.forEach(n => { if (n >= q.blanks.length) bad(`{${n}} has no blank`); });
      q.blanks.forEach((b, i) => {
        if (!nums.includes(i)) bad(`blank ${i} has no {${i}} in the lines`);
        if (!b.choices.includes(b.answer)) bad(`blank ${i}: answer "${b.answer}" is not a choice`);
        if (new Set(b.choices).size !== b.choices.length) bad(`blank ${i}: duplicate choices`);
        // A picked word is crossed out everywhere, so two blanks can't share an answer.
        q.blanks.forEach((b2, j) => { if (j > i && b2.answer === b.answer) bad(`blanks ${i} and ${j} share the answer "${b.answer}"`); });
      });
    }
    return out;
  });
  assert.deepEqual(issues, []);
  assert.deepEqual(errors, []);
  await ctx.close();
});

const VARIANTS = [
  { html: 'History Coloring Books.html', mobile: false, style: 'tap-choice' },
  { html: 'History Coloring Books.html', mobile: false, style: 'drag-drop' },
  { html: 'History Coloring Books Mobile.html', mobile: true, style: 'tap-choice' },
];

for (const v of VARIANTS) {
  test(`${v.mobile ? 'mobile' : 'desktop'} (${v.style}): color, celebrate, solve the Word Quest`, async () => {
    const { ctx, page, errors } = await openApp(v.html, { speech_game_style: v.style });
    const ID = 'liberty-bell';
    assert.equal(await page.locator('[data-region][tabindex]').count(), 0, 'library thumbnails take no keyboard focus');
    await page.evaluate(() => [...document.querySelectorAll('button')].find(b => /Liberty Bell/.test(b.innerText) && b.querySelector('svg')).click());
    await page.waitForSelector('[data-region="body"]');

    // Keyboard: regions are focusable buttons; Enter fills with the current crayon
    const region = page.locator('[data-region="body"]').first();
    assert.equal(await region.getAttribute('tabindex'), '0');
    assert.equal(await region.getAttribute('aria-label'), 'body');
    await region.focus();
    await page.keyboard.press('Enter');
    assert.equal((await progress(page, ID)).fills.body, '#E63946', 'Enter fills a focused region');
    assert.equal(await region.getAttribute('aria-label'), 'body, colored');
    await clickText(page, /undo$/i);

    // Fill a region, then undo it
    await page.click('button[title="Sky"]');
    await page.locator('[data-region="body"]').first().dispatchEvent('click');
    assert.equal((await progress(page, ID)).fills.body, '#4361EE', 'fill a region');
    await clickText(page, /undo$/i);
    assert.equal((await progress(page, ID)).fills.body, undefined, 'undo removes the fill');

    // Brush with the eraser crayon erases; turning Erase off paints with Cherry
    await page.click('button[title="Cloud"]');
    await clickText(page, /brush$/i);
    const box = await page.locator('svg[viewBox="0 0 600 600"][style*="touch-action"]').boundingBox();
    const draw = async (x, y) => {
      await page.mouse.move(box.x + x, box.y + y); await page.mouse.down();
      await page.mouse.move(box.x + x + 80, box.y + y + 40, { steps: 5 }); await page.mouse.up();
    };
    await draw(100, 100);
    let strokes = (await progress(page, ID)).strokes;
    assert.deepEqual(strokes.map(s => s.mode), ['erase'], 'eraser crayon + brush erases');
    await clickText(page, /eras/i);
    await draw(300, 300);
    strokes = (await progress(page, ID)).strokes;
    assert.equal(strokes[1].mode, 'paint');
    assert.equal(strokes[1].color, '#E63946', 'erase off paints Cherry');
    await clickText(page, /undo$/i);
    assert.equal((await progress(page, ID)).strokes.length, 1, 'undo removes the stroke');

    // Random fills everything -> celebration; Random is one undo step
    await clickText(page, /random$/i);
    await page.waitForFunction(() => /woohoo/i.test(document.body.innerText), null, { timeout: 5000 });
    const done = await progress(page, ID);
    assert.ok(done.completed && done.celebrated, 'page marked complete');
    assert.ok(await page.evaluate(() => !!document.activeElement.closest('[role="dialog"]')), 'focus moves into the celebration');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    assert.ok(!/woohoo/i.test(await bodyText(page)), 'Escape closes the celebration');
    await clickText(page, /undo$/i);
    assert.deepEqual((await progress(page, ID)).fills, {}, 'undo reverts Random');
    await clickText(page, /random$/i);
    await page.waitForTimeout(700);
    assert.ok(!/woohoo/i.test(await bodyText(page)), 'no second celebration');

    // Word Quest
    await page.evaluate(() => [...document.querySelectorAll('button')].find(b => b.innerText.includes('📜')).click());
    await page.waitForTimeout(500);
    const answers = await page.evaluate((id) => PAGES_DATA.find(p => p.id === id).quest.blanks.map(b => b.answer), ID);
    const pick = async (word) => {
      if (v.style === 'drag-drop') {
        await page.locator('div[draggable="true"]', { hasText: new RegExp('^' + word + '$') })
          .dragTo(page.locator('button', { hasText: /^_____$/ }).first());
      } else {
        await page.evaluate((w) => [...document.querySelectorAll('div,button')].filter(e => e.children.length === 0 && e.innerText === w).pop().click(), word);
      }
      await page.waitForTimeout(80);
    };
    await clickText(page, /hint/i);
    if (v.style === 'tap-choice') {
      // Pick the first answer from the keyboard
      await page.evaluate((w) => [...document.querySelectorAll('div,button')].filter(e => e.children.length === 0 && e.innerText === w).pop().focus(), answers[0]);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(80);
      assert.equal((await progress(page, ID)).quest.correct, 1, 'Enter on a word chip answers the blank');
    } else {
      await pick(answers[0]);
    }
    if (v.mobile) {
      await page.locator('[role="dialog"]').evaluate(d => d.parentElement.click());
      await page.waitForTimeout(200);
      assert.equal(await page.locator('[role="dialog"]').count(), 1, 'tapping the backdrop keeps the Word Quest open');
    }
    assert.ok(!/starts with/i.test(await bodyText(page)), 'hint closes after a correct answer');
    if (v.style === 'tap-choice') {
      await page.evaluate((w) => [...document.querySelectorAll('button')].find(b => b.innerText === w).click(), answers[0]);
      assert.match(await bodyText(page), /blank #2/i, 'tapping a solved blank keeps focus on the next one');
    }
    for (const w of answers.slice(1)) await pick(w);
    await page.waitForTimeout(1300);
    const solved = await progress(page, ID);
    assert.ok(solved.questSolved, 'questSolved saved');
    assert.deepEqual(solved.quest, { correct: answers.length, wrong: 0, solved: true });
    assert.match(await bodyText(page), /Junior Historian/);

    if (!v.mobile && v.style === 'tap-choice') {
      // Time-on-task doesn't count while the tab is hidden
      await clickText(page, /Done/);
      const setHidden = (h) => page.evaluate((h) => {
        Object.defineProperty(document, 'hidden', { configurable: true, get: () => h });
        document.dispatchEvent(new Event('visibilitychange'));
      }, h);
      await setHidden(true);
      await page.waitForTimeout(300);
      const t1 = (await progress(page, ID)).timeMs || 0;
      await page.waitForTimeout(1500);
      await setHidden(false);
      await clickText(page, /Library$/);
      await page.waitForTimeout(300);
      const t2 = (await progress(page, ID)).timeMs || 0;
      assert.ok(t1 > 0 && t2 - t1 < 500, `hidden time not counted (+${t2 - t1}ms)`);

      // Grown-ups dashboard: solve the gate, see the completed page
      await clickText(page, /Grown-Ups/);
      await page.waitForTimeout(300);
      const [a, b] = (await bodyText(page)).match(/(\d+) × (\d+)/).slice(1).map(Number);
      await page.evaluate((n) => [...document.querySelectorAll('button')].find(el => el.innerText.trim() === String(n)).click(), a * b);
      await page.waitForTimeout(300);
      const txt = await bodyText(page);
      const total = await page.evaluate(() => PAGES_DATA.length);
      assert.match(txt, /Grown-Ups Dashboard/);
      assert.ok(txt.includes(`1/${total}`), 'dashboard shows 1 completed page');
    }
    assert.deepEqual(errors, []);
    await ctx.close();
  });
}

test('reduced motion: celebration confetti finishes instantly', async () => {
  const { ctx, page, errors } = await openApp('History Coloring Books.html');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => [...document.querySelectorAll('button')].find(b => /Liberty Bell/.test(b.innerText) && b.querySelector('svg')).click());
  await page.waitForSelector('[data-region="body"]');
  await clickText(page, /random$/i);
  await page.waitForFunction(() => /woohoo/i.test(document.body.innerText), null, { timeout: 5000 });
  const durations = await page.evaluate(() => [...document.querySelectorAll('[role="dialog"] ~ *, [role="dialog"] *, div')]
    .map(el => getComputedStyle(el)).filter(cs => cs.animationName !== 'none').map(cs => parseFloat(cs.animationDuration)));
  assert.ok(durations.length > 0, 'found animated elements');
  assert.ok(durations.every(d => d < 0.001), 'all animations shortened: ' + [...new Set(durations)].join(','));
  assert.deepEqual(errors, []);
  await ctx.close();
});

const openLibertyBell = async (page) => {
  await page.evaluate(() => [...document.querySelectorAll('button')].find(b => /Liberty Bell/.test(b.innerText) && b.querySelector('svg')).click());
  await page.waitForSelector('[data-region="body"]');
};
const fillRegion = async (page, crayonTitle, region) => {
  await page.click(`button[title="${crayonTitle}"]`);
  await page.locator(`[data-region="${region}"]`).first().dispatchEvent('click');
};

test('saves wait for a pause in edits, then land', async () => {
  const { ctx, page, errors } = await openApp('History Coloring Books.html');
  assert.match(await bodyText(page), /Welcome, explorer/i, 'first visit says Welcome');
  await openLibertyBell(page);
  await page.waitForTimeout(800);
  await fillRegion(page, 'Sky', 'body');
  const raw = () => page.evaluate(() => (JSON.parse(localStorage.getItem('hcb-progress-v1') || '{}'))['liberty-bell'] || {});
  assert.equal((await raw()).fills, undefined, 'not saved on every edit');
  await page.waitForTimeout(900);
  assert.equal((await raw()).fills.body, '#4361EE', 'saved after the pause');
  await clickText(page, /Library$/);
  assert.match(await bodyText(page), /Welcome back, explorer/i, 'returning visit says Welcome back');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('two open tabs merge their progress instead of overwriting it', async () => {
  // Two tabs on different pages (the case that used to lose work).
  const a = await openApp('History Coloring Books.html');
  const b = await a.ctx.newPage();
  await b.goto(a.page.url());
  await b.waitForFunction(() => document.querySelectorAll('svg').length > 20);
  await openLibertyBell(a.page);
  await b.evaluate(() => [...document.querySelectorAll('button')].find(el => /President Lincoln/.test(el.innerText) && el.querySelector('svg')).click());
  await b.waitForSelector('[data-region="coat"]');
  await fillRegion(a.page, 'Sky', 'body');
  await fillRegion(b, 'Cherry', 'coat');
  await a.page.waitForTimeout(1500);
  const saved = await a.page.evaluate(() => JSON.parse(localStorage.getItem('hcb-progress-v1')));
  assert.equal(saved['liberty-bell']?.fills?.body, '#4361EE', 'tab A edit kept');
  assert.equal(saved.lincoln?.fills?.coat, '#E63946', 'tab B edit kept');
  // Tab A's own state picked up tab B's page, so its next save won't drop it
  await fillRegion(a.page, 'Sky', 'yoke');
  await a.page.waitForTimeout(1000);
  const again = await a.page.evaluate(() => JSON.parse(localStorage.getItem('hcb-progress-v1')));
  assert.equal(again.lincoln?.fills?.coat, '#E63946', 'tab B edit survives tab A saving again');
  assert.deepEqual(a.errors, []);
  await a.ctx.close();
});

test('a cleared finished page keeps its sticker but is not shown as complete', async () => {
  const { ctx, page, errors } = await openApp('History Coloring Books.html');
  await openLibertyBell(page);
  await clickText(page, /random$/i);
  await page.waitForFunction(() => /woohoo/i.test(document.body.innerText), null, { timeout: 5000 });
  await page.keyboard.press('Escape');
  await clickText(page, /clear$/i);
  await clickText(page, /Library$/);
  const txt = await bodyText(page);
  assert.match(txt, /STICKER EARNED/);
  assert.doesNotMatch(txt, /COMPLETE/);
  assert.match(txt, /\b1\s*\/\s*62\b/, 'sticker still counted');
  assert.deepEqual(errors, []);
  await ctx.close();
});
