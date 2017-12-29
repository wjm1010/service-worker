//注册一个service worker
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./service-worker.js', {scope: './'})
        .then(function (e) {
            console.log(e);
        })
        .catch(function (e) {
            console.log(e);
        })
} else {
    console.log('Service Worker is not supported in this browser.')
}