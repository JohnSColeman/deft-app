'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "android-icon-144x144.png": "cdc09c471230527e3ad79d4dc7feece9",
"android-icon-192x192.png": "0c1f738ca81051259e743f2513d635e2",
"android-icon-36x36.png": "055a461e7c9b1452cdb4e3b19dfcf3cd",
"android-icon-48x48.png": "48ef743a3733cfff2623a5d7483acc27",
"android-icon-72x72.png": "49d20633579ff6e0f583c28ec8e76419",
"android-icon-96x96.png": "37c25e60d16157c6f10e75de38cec24e",
"apple-icon-114x114.png": "ac587b811a547590a1c31f0e278f04f4",
"apple-icon-120x120.png": "96e237f2ecdc116ea7fac31c303da2c6",
"apple-icon-144x144.png": "18f5510bc20ab40d253779d81a76130a",
"apple-icon-152x152.png": "d3eca047242aa34f1e63e099f84a3324",
"apple-icon-180x180.png": "1b26d4b8631399969e7ffdac3fadbafd",
"apple-icon-57x57.png": "3b8e99640ab147cc1b6c841a7ca6df83",
"apple-icon-60x60.png": "c2e2fdafef03eb86abfd051d6d61036d",
"apple-icon-72x72.png": "49d20633579ff6e0f583c28ec8e76419",
"apple-icon-76x76.png": "41d7c0f064fa46ee4a5a6f494efb3c51",
"apple-icon-precomposed.png": "40adc2b53334cf0a3def3c3ef1e8777a",
"apple-icon.png": "40adc2b53334cf0a3def3c3ef1e8777a",
"assets/AssetManifest.json": "2efbb41d7877d10aac9d091f58ccd7b9",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "262814ca293d51c9b722dbd3201e8821",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "a04e492a05f9fd1a8cc6f12163b184dd",
"browserconfig.xml": "653d077300a12f09a69caeea7a8947f8",
"canvaskit/canvaskit.js": "687636ce014616f8b829c44074231939",
"canvaskit/canvaskit.wasm": "d4972dbefe733345d4eabb87d17fcb5f",
"canvaskit/profiling/canvaskit.js": "ba8aac0ba37d0bfa3c9a5f77c761b88b",
"canvaskit/profiling/canvaskit.wasm": "05ad694fda6cfca3f9bbac4b18358f93",
"favicon-16x16.png": "ce254743497b8f7d362bcbeda6a8023d",
"favicon-32x32.png": "13475511e1d63fdb7a165b252a117ccf",
"favicon-96x96.png": "752b7cace1a592f596f04ed542665841",
"favicon.ico": "cd48ea0ba8f163f178f4358285917879",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "195f32f4217e034162a6697208586f44",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"images/icons/icon-128x128.png": "104b862ddc6c4e059a267ec24586ec17",
"images/icons/icon-144x144.png": "73a9cbd1c454062561919e894c2104fd",
"images/icons/icon-152x152.png": "40f0e110b10e6618c596789210c80fd7",
"images/icons/icon-192x192.png": "99fe6977a1ea30f86a71794e7a308460",
"images/icons/icon-384x384.png": "24b0e184434a4ec8e63581fe6ed0d308",
"images/icons/icon-512x512.png": "e4a02694b021d9e7daa939144b865652",
"images/icons/icon-72x72.png": "e31242f7b86d4a964945108b170c07b3",
"images/icons/icon-96x96.png": "2aeb65615ea486eae310bfeadac977c0",
"index.html": "8f586ca0e991a04b291b2280a2ff6940",
"/": "8f586ca0e991a04b291b2280a2ff6940",
"main.dart.js": "fb96079088d82f114fc7bc95ab96e7cc",
"manifest.json": "63c64b7f399c616c82672afec737d8ee",
"ms-icon-144x144.png": "18f5510bc20ab40d253779d81a76130a",
"ms-icon-150x150.png": "1fb29e8b7e992fa83f8393873d7d959a",
"ms-icon-310x310.png": "49739594a6032f1e21aaa9f7804e0e77",
"ms-icon-70x70.png": "95012745633ed2cbd5571a79d1d234b0",
"version.json": "bf788cd9ed9ea7d2b88c955cd5c32a50"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
