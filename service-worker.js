var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  './script/vanilla.js',
  './script/main.js',
  'index.hmtl',
  'manifest.json',
  './styles/styles.css',
  './images/icons/logo.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open($CACHE_STORE)
      .then(cache => {
        return cache.addAll($FILES);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

    self.addEventListener('activate', event => {
      event.waitUntil(
        caches.open($CACHE_STORE)
          .then(cache => {
            return cache.keys()
              .then(cacheNames => {
                return Promise.all(
                  cacheNames.filter(cacheName => {
                    return $FILES.indexOf(cacheName) === -1;
                  }).map(cacheName => {
                    return caches.delete(cacheName);
                  })
                );
              })
              .then(() => {
                return self.clients.claim();
              });
          })
      );
    }); 
self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    let url = event.request.url.indexOf(self.location.origin) !== -1 ?
      event.request.url.split(`${self.location.origin}/`)[1] :
      event.request.url;
    let isFileCached = $FILES.indexOf(url) !== -1;
      if (!isFileCached && event.request.mode === 'navigate' && $NAVIGATION_FALLBACK) {
        url = $NAVIGATION_FALLBACK;
        isFileCached = $FILES.index.indexOf(url) !== -1;
      }
    if (isFileCached) {
      event.respondWith(
        caches.open($CACHE_STORE)
          .then(cache => {
            return cache.match(url)
              .then(response => {
                if (response) {
                  return response;
                }
                throw Error('There is not response for such request', url);
              });
          })
          .catch(error => {
            return fetch(event.request);
          })
      );
    }
  }
});

/*Caches and Cache Versioning*/
const currentCaches = {
  dynamic: "my-site-cache-v1"
};

/*Cache Cleanup*/
self.onactivate = event => {
  const KNOWN_CACHES = Object.values(currentCaches);

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (KNOWN_CACHES.indexOf(cacheName) < 0) {
            console.log("Purging outdated cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
};

*Dynamic Caching*
self.onfetch = event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      } else {
        return fetch(event.request)
          .then(fetchedResponse => {
            if (!fetchedResponse.ok) {
              return fetchedResponse;
            } else {
              return caches
                .open(currentCaches.dynamic)
                .then(cache => {
                  if (event.request.method === "GET") {
                    const clonedResponse = fetchedResponse.clone();
                    cache.put(event.request, clonedResponse);
                  }
                  return fetchedResponse;
                })
                .catch(reason =>
                  console.log("An error occured while caching data:", reason)
                );
            }
          })
          .catch(reason => {
            console.log("An error occured while fetching data:", reason);
          });
      }
    })
  );
};
/*
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
*/