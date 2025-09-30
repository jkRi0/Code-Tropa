// import { currentSelectedDifficulty } from "../routeModules.js";

export function difActions(action){
    if(action=="play"){
        const plSelection = document.querySelector('.dif-selection-back1');
        if (plSelection) {
            plSelection.style.visibility = 'visible';
            plSelection.style.opacity = '1';
        }
    }else if(action=="ok"){
        console.log("Checking difficulty. Current selected: ", window.currentSelectedDifficulty);
        if (window.currentSelectedDifficulty) {
            // Redirect to the challenge page
            window.location.href = 'ch/index.html';
        } else {
            alert("Please select a difficulty before proceeding!");
        }
    }else if(action=="back"){
        const difSelection = document.querySelector('.dif-selection-back1');
        if (difSelection) {
            difSelection.style.visibility = 'hidden';
            difSelection.style.opacity = '0';
        }
    }
}
