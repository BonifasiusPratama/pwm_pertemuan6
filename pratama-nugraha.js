self.addEventListener('install', function(event) {
  console.log('pratamanugraha: berhasil...');
  // TODO 3.4: Skip waiting
  self.skipWaiting();

});

// I'm a new service worker

self.addEventListener('fetch', function(event) {
  console.log('Fetching:', event.request.url);
});


self.addEventListener('activate', function(event) {
  console.log('Service worker activating...');
});

var CACHE_NAME =  'static-cache';

//STEP2: menghubungkan url ke file index dan css
var urlsToCache =  [
  '.',
  'index.html',
  'css/materialize.min.css'
];

//STEP3: menginstall nama cache ke fungsi url
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

//STEP4: menangkap fungsi request event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetchAndCache(event.request);
    })
  );
});

//STEP5: Menangkap dan menghubungkan cache ke url
function fetchAndCache(url) {
  return fetch(url)
  .then(function(response) {
    // Check if we received a valid response
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return caches.open(CACHE_NAME)
    .then(function(cache) {
      cache.put(url, response.clone());
      return response;
    });
  })
  .catch(function(error) {
    console.log('Request failed:', error);
    // You  could return a custom offline 404 page  here
  });
}


