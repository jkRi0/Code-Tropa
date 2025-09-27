export let currentSelectedLanguage = ''; // New variable to track the selected language

export function process(clickedDiv, type) {
    const menuContainer = document.querySelector('.menu-container');
    const mainContentWrapper = document.querySelector('.main-content-wrapper');

    if (menuContainer && mainContentWrapper && menuContainer.classList.contains('open')) {
        menuContainer.classList.remove('open');
        mainContentWrapper.classList.remove('menu-open');
    }
// Reset all .outer2 divs
    document.querySelectorAll('.outer2').forEach(div => {
        // Reset their inner1 styles too (optional)
        const inner = div.querySelector('.outer1');
        if (inner) {
        inner.style.backgroundColor = ""; // reset style
        inner.style.color = ""; // reset style
        }
    });
    // Change style of clicked div's inner1
    const targetInner = clickedDiv.querySelector('.outer1');
    if (targetInner) {
        targetInner.style.backgroundColor = "rgb(163, 109, 47)"; // or any other style
        targetInner.style.color = "black"; // or any other style
    }

    if (type === 'programmingLanguage') {
        const plSelection = document.querySelector('.pl-selection-back1');
        if (plSelection) {
            plSelection.style.visibility = 'visible';
            plSelection.style.opacity = '1';
        }
    }else if(type === 'storyMode'){
        const difSelection = document.querySelector('.sm-back1');
        if (difSelection) {
            difSelection.style.visibility = 'visible';
            difSelection.style.opacity = '1';
        }
    }else if(type === 'challenges'){
        const difSelection = document.querySelector('.ch-back1');
        if (difSelection) {
            difSelection.style.visibility = 'visible';
            difSelection.style.opacity = '1';
        }
    }else if(type === 'leaderboard'){
        const difSelection = document.querySelector('.lb-back1');
        if (difSelection) {
            difSelection.style.visibility = 'visible';
            difSelection.style.opacity = '1';
        }
    }else if(type === 'setting'){
        const difSelection = document.querySelector('.se-back1');
        if (difSelection) {
            difSelection.style.visibility = 'visible';
            difSelection.style.opacity = '1';
        }
    }
}
