import { currentSelectedLanguage } from './process.js';

export function process1(clickedDiv) {
// Reset all .outer2 divs
    document.querySelectorAll('.outer2-2').forEach(div => {
        // Reset their inner1 styles too (optional)
        const inner = div.querySelector('.inner1-2');
        if (inner) {
            inner.style.backgroundColor = ""; // reset style
        }
    });
    // Change style of clicked div's inner1
    const targetInner = clickedDiv.querySelector('.inner1-2');
    if (targetInner) {
        targetInner.style.backgroundColor = "rgb(65, 62, 62)"; // or any other style
    }



    document.querySelectorAll('.outer2-3').forEach(div => {
        // Reset their inner1 styles too (optional)
        const inner = div.querySelector('.inner1-3');
        if (inner) {
            inner.style.backgroundColor = ""; // reset style
        }
    });
    // Change style of clicked div's inner1
    const targetInner1 = clickedDiv.querySelector('.inner1-2');
    if (targetInner1) {
        targetInner1.style.backgroundColor = "rgb(65, 62, 62)"; // or any other style
        // currentSelectedLanguage = targetInner1.textContent.trim(); // Update the variable
        document.getElementById('selectedLanguageInput').value = currentSelectedLanguage;
    }
}
