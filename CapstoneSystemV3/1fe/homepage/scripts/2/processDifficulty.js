// import { currentSelectedDifficulty } from '../routeModules.js';

export function selectDifficulty(clickedDiv) {
    // Reset all .outer2-2 divs within the difficulty selection modal
    document.querySelectorAll('.dif-selection-back1 .outer2-2').forEach(div => {
        const inner = div.querySelector('.inner1-2');
        if (inner) {
            inner.style.backgroundColor = ""; // reset style
        }
    });

    // Change style of clicked div's inner1 and update currentSelectedDifficulty
    const targetInner = clickedDiv.querySelector('.inner1-2');
    if (targetInner) {
        targetInner.style.backgroundColor = "#49af5f"; // or any other style
        window.currentSelectedDifficulty = targetInner.textContent.trim(); // Update selected difficulty globally
        console.log("Selected Difficulty: ", window.currentSelectedDifficulty);

        // Clear error message if a difficulty is selected
        // const errorMessageElement = document.getElementById('difficultyErrorMessage');
        // if (errorMessageElement) {
        //     errorMessageElement.textContent = '';
        // }
    }
}
