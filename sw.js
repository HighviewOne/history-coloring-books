// Offline support. Network first, so kids always get the latest pages when
// online; the cached copy is the fallback when there's no connection.
const CACHE = 'history-coloring-books';
const PAGES = ['index.html', 'History Coloring Books.html', 'History Coloring Books Mobile.html'];
const APP_FILES = [
  './', ...PAGES.map(encodeURI), 'manifest.webmanifest',
  'dist/react.production.min.js', 'dist/react-dom.production.min.js', 'dist/desktop.js', 'dist/mobile.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

// The pages' web fonts (Latin subset only), read from each page's stylesheet
// link. Best effort: offline falls back to system fonts.
async function cacheFonts(cache) {
  const urls = new Set();
  for (const pageName of PAGES) {
    try {
      const html = await (await fetch(encodeURI(pageName), { cache: 'reload' })).text();
      const href = /href="(https:\/\/fonts\.googleapis\.com\/[^"]+)"/.exec(html)?.[1].replace(/&amp;/g, '&');
      if (!href) continue;
      const cssResponse = await fetch(href);
      const css = await cssResponse.clone().text();
      await cache.put(href, cssResponse);
      for (const [, subset, rule] of css.matchAll(/\/\* ([a-z-]+) \*\/\s*@font-face \{([^}]*)\}/g)) {
        const url = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/.exec(rule)?.[1];
        if (url && subset === 'latin') urls.add(url);
      }
    } catch (_) {}
  }
  await Promise.all([...urls].map(u => cache.add(u).catch(() => {})));
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(APP_FILES.map(f => new Request(f, { cache: 'reload' })));
    await cacheFonts(cache);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    // Any other page in the app falls back to the start page
    if (request.mode === 'navigate') return cache.match('index.html');
    throw err;
  }
}

// Fonts never change at a given URL: serve from cache, fetch once
async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok || response.type === 'opaque') cache.put(request, response.clone());
  return response;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin === self.location.origin) event.respondWith(networkFirst(request));
  else if (FONT_HOSTS.includes(url.hostname)) event.respondWith(cacheFirst(request));
});
