//通过importScripts加载。被service worker加载的脚本文件会被自动缓存。
//importScripts() 方法将一个或多个脚本同步导入到工作者的作用域中。
importScripts('js/serviceworker-cache-polyfill.js');

var CACHE_VERSION = 'app-v1'; //缓存的版本
var CACHE_FILES = [ //初次缓存的文件
  '/',
  'images/logo.jpeg',
  'js/app.js',
  'css/styles.css',
];

//安装
self.addEventListener('install', function(event) {
  event.waitUntil( //拿到promise的状态得到安装是否成功，如果所有的文件都被缓存成功了，Service Worker就安装成功了。如果有一个文件下载安装失败，Service Worker的安装就失败
    caches.open(CACHE_VERSION)
    .then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(CACHE_FILES); //传入文件数组
    })
  );
});

//可以通过fetch事件拦截请求，给出自己的响应。
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(res) {
      if (res) {
        return res; //返回缓存的值
      }
      requestBackend(event);
    })
  )
});

function requestBackend(event) {
  //实时从网络请求fetch
  var url = event.request.clone(); 
  return fetch(url).then(function(res) {
    //检查收到的响应是否有效，跨域的请求也不能被缓存
    if (!res || res.status !== 200 || res.type !== 'basic') {
      return res; //发给浏览器
    }

    var response = res.clone();

    caches.open(CACHE_VERSION).then(function(cache) {
      cache.put(event.request, response);
    });

    return res; //发给缓存
  })
}

//循环所有的缓存，删除掉所有不在指定位置中的的缓存。
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(key, i) {
        if (key !== CACHE_VERSION) {
          return caches.delete(keys[i]);
        }
      }))
    })
  )
});