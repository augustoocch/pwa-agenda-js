const nameCache = 'apv-v4';
const files = [
    './',
    './index.html',
    './error.html',
    './css/bootstrap.css',
    './css/styles.css',
    './js/app.js',
    './js/apv.js',
    './manifest.json'
];

//Instalar el service worker y agregar cache
self.addEventListener('install', e=> {
    
    e.waitUntil(
        caches.open(nameCache)
        .then( cache => {
            console.log('caching');
            cache.addAll(files);
        }) 
    )    
})
    

//Activar el service worker y limpiar cache viejo
self.addEventListener('activate', e => {
    console.log("service worker activado");
    e.waitUntil(
        caches.keys()
            .then(keys => {
                console.log(keys); 

                return Promise.all(keys
                    //Se filtra todo el cache y si la version no es la actual, se borra el cache viejo
                        .filter(key => key !== nombreCache)
                        .map(key => caches.delete(key)) // borrar los demas
                    )
            })
    )
})


//Evento fetch para agregar archivos estaticos
self.addEventListener('fetch', e => {
    console.log('Fetch', e)
   
    e.respondWith(
      caches
        .match(e.request)
        .then(cacheResponse => 
            (cacheResponse ? cacheResponse : caches.match('error.html')))
      
    )
  })