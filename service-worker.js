/*
Copyright 2021 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
const cacheKey = 'cache-key-v1'

const preCacheResources = ['/', '/index.html', '/css/style.css', '/js/main.js', '/js/app/editor.js', '/js/lib/actions.js'];

self.addEventListener('install', (event) => {
     console.log('Service worker install event:', event);
     event.waitUntil(
          caches.open(cacheKey)
               .then(cache => {
                    return cache.addAll(preCacheResources)
               })

     )
});

self.addEventListener('activate', (event) => {
     console.log('Service worker activate event!', event);
});

self.addEventListener('fetch', (event) => {
     console.log('Fetch intercepted for:', event.request.url);
     event.respondWith(
          caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
               console.log('hit cache', cachedResponse)
               return cachedResponse;
          }
          return fetch(event.request);
          }),
     );
});
   