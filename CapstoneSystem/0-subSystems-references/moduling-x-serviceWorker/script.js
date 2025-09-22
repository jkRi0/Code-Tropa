if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
        .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(error => {
            console.error('ServiceWorker registration failed: ', error);
        });
    });
}

function checkInternetConnection(){
    const isOnline = window.navigator.onLine;
    if (isOnline) {
        console.log("The browser is online.");
        let script = document.createElement("script");
        script.src = "onlineJS.php";
        document.body.appendChild(script);
    } else {
        console.log("The browser is offline.");
        let script = document.createElement("script");
        script.src = "offlineJS.js";
        document.body.appendChild(script);
    }
}
// setInterval(checkInternetConnection, 2000);