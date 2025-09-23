import { add } from './math.js';

console.log(add(2, 3)); // 5
//WORKS IN VERCEL




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