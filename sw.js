const CACHE='family-reading-v14-1';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('family-reading-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{if(r.ok&&r.type==='basic'&&!r.redirected){const copy=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));}return r}).catch(()=>caches.match('./index.html')));return}
if(SHELL.some(p=>new URL(p,self.registration.scope).href===u.href))e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});