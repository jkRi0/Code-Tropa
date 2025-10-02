import { currentSelectedLanguage, setCurrentSelectedLanguage } from './process.js';
import { currentSelectedDifficulty } from '../routeModules.js'; // Import the new variable

export function process1(clickedDiv) {
    // Remove all highlight classes from all language selection divs
    document.querySelectorAll('.outer2-2').forEach(div => {
        div.classList.remove('active-language');
        div.classList.remove('temporary-selected');
    });

    // Add 'temporary-selected' class to the clicked div (gray highlight)
    clickedDiv.classList.add('temporary-selected');

    // Update the currentSelectedLanguage variable
    setCurrentSelectedLanguage(clickedDiv.querySelector('.inner1-2').textContent.trim().toLowerCase());


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
        // targetInner1.style.backgroundColor = "rgb(65, 62, 62)"; // This is now handled by .temporary-selected class
        // currentSelectedLanguage = targetInner1.textContent.trim(); // Update the variable
        // document.getElementById('selectedLanguageInput').value = currentSelectedLanguage;
        // currentSelectedDifficulty = targetInner1.textContent.trim(); // Update selected difficulty
        // console.log("Selected Difficulty: ", currentSelectedDifficulty);
    }
}
