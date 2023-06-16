if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(registered => {
        console.log('Registered properly', registered);
    }).catch( error => {
        console.log(error);
    }) 
} else {
    console.log('Service Workers not suported');
}