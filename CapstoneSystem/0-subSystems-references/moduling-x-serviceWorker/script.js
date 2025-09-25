// import { sayHello } from './offlineJS.js';

// document.getElementById('myButton').addEventListener('click', () => {
//     const inputValue = document.getElementById('myInput').value;
//     checkInternetConnection(inputValue);
// });

function checkInternetConnection(value){
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

        // sayHello(value);
    }
}
setInterval(() => checkInternetConnection(''), 3000);

