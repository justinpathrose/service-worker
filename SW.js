// Name of the caches used. Update the name to V2 etc when the local
// resources are updated to trigger the install event again
const preCache = 'preCache-V1'

const preCacheUrls = [
  'index.html',
  './', // Alias for index.html
  'icon.png',
]

// install handler will take care of precaching the resources
self.addEventListener('install', event => {
  console.log('installing V1')
  event.waitUntil(
    caches
      .open(preCache)
      .then(cache => cache.addAll(preCacheUrls))
      .then(() => self.skipWaiting())
  )
})

// activate handler takes care of cleaning up the old caches
self.addEventListener('activate', event => {
  const currentCaches = [preCache]
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return cacheNames.filter(
          cacheName => !currentCaches.includes(cacheName)
        )
      })
      .then(cachesToDelete => {
        return Promise.all(
          cachesToDelete.map(cacheToDelete => {
            return caches.delete(cacheToDelete)
          })
        )
      })
      .then(() => self.clients.claim())
  )
})
