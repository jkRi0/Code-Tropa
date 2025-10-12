export let currentSelectedLanguage = ''; // New variable to track the selected language

export function setCurrentSelectedLanguage(language) {
    currentSelectedLanguage = language;
}

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

            // Fetch and highlight the currently saved language (green highlight)
            fetch('../../2be/get_current_language.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const currentLanguage = data.currentLanguage.toLowerCase();
                    console.log('Current Language from session (process.js):', currentLanguage); // Debug log
                    document.querySelectorAll('.outer2-2').forEach(div => {
                        div.classList.remove('active-language'); // Remove persistent highlight
                        div.classList.remove('temporary-selected'); // Remove temporary highlight
                        const langText = div.querySelector('.inner1-2').textContent.trim().toLowerCase();
                        // console.log('Comparing ', langText, ' with ', currentLanguage); // Debug log
                        if (langText === currentLanguage) {
                            div.classList.add('active-language'); // Add persistent green highlight
                            console.log('Added active-language to:', langText); // Debug log
                        }
                    });
                })
                .catch(error => console.error('Error fetching current language:', error));
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
