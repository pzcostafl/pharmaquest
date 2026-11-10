// Service worker do PharmaQuest — cache do app e das estruturas moleculares para uso offline.
const CACHE = 'pharmaquest-v4';
// estruturas baixadas pelo botão "Baixar para offline": cache próprio, que sobrevive às atualizações
const MOLECULAS = 'pharmaquest-moleculas';
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', './index.html', './icone.png', './icone-180.png', './manifest.webmanifest'])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE && k !== MOLECULAS).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // navegação: rede primeiro, cache como reserva
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((r) => { caches.open(CACHE).then((c) => c.put(req, r.clone())); return r; }).catch(() => caches.match(req).then((r) => r || caches.match('./index.html'))));
    return;
  }
  // demais recursos (JS, CSS, moléculas, fontes): cache primeiro, atualiza em segundo plano
  e.respondWith(caches.match(req).then((hit) => {
    const net = fetch(req).then((r) => { if (r.ok || r.type === 'opaque') { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
