const preCache = 'preCache-V1'

const preCacheUrls = [
  'index.html',
  './', // Alias for index.html
  'icon.png',
]

self.addEventListener('install', event => {
  console.log('installing V1')
  event.waitUntil()
})
