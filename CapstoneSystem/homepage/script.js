// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuContainer = document.querySelector('.menu-container');
    const mainContentWrapper = document.querySelector('.main-content-wrapper');

    if (hamburgerMenu && menuContainer) {
        hamburgerMenu.addEventListener('click', () => {
            menuContainer.classList.toggle('open');
            mainContentWrapper.classList.toggle('menu-open');
        });
    }

    // Function to set bar graph heights dynamically
    function setBarGraphHeights() {
        const performanceData = {
            accuracy: 85,
            efficiency: 70,
            readability: 60,
            time: 90,
            success: 95,
            failed: 20
        };

        for (const key in performanceData) {
            if (performanceData.hasOwnProperty(key)) {
                const bar = document.querySelector(`.bar-wrapper .bar-${key}`);
                const percentageLabel = bar ? bar.querySelector('.bar-percentage-label') : null;
                if (bar) {
                    bar.style.height = `${performanceData[key]}%`;
                }
                if (percentageLabel) {
                    percentageLabel.textContent = `${performanceData[key]}%`;
                }
            }
        }
    }

    // Call the function to set bar graph heights and percentages when the DOM is loaded
    setBarGraphHeights();
});


function process(clickedDiv, type) {
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

// FOR BLACK BUTTONS
function process1(clickedDiv) {
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
        document.getElementById('selectedLanguageInput').value = targetInner1.textContent.trim();
    }
}


function hideModal() {
    const plSelection = document.querySelector('.pl-selection-back1');
    if (plSelection) {
        plSelection.style.visibility = 'hidden';
        plSelection.style.opacity = '0';
    }


    const difSelection = document.querySelector('.dif-selection-back1');
    if (difSelection) {
        difSelection.style.visibility = 'hidden';
        difSelection.style.opacity = '0';
    }

    const smSelection = document.querySelector('.sm-back1');
    if (smSelection) {
        smSelection.style.visibility = 'hidden';
        smSelection.style.opacity = '0';
    }

    const chSelection = document.querySelector('.ch-back1');
    if (chSelection) {
        chSelection.style.visibility = 'hidden';
        chSelection.style.opacity = '0';
    }

    const lbSelection = document.querySelector('.lb-back1');
    if (lbSelection) {
        lbSelection.style.visibility = 'hidden';
        lbSelection.style.opacity = '0';
    }

    const seSelection = document.querySelector('.se-back1');
    if (seSelection) {
        seSelection.style.visibility = 'hidden';
        seSelection.style.opacity = '0';
    }
}



//FOR STORY MODE MODAL
function process2(clickedDiv, chapter) {
    document.querySelectorAll('.outer2-3').forEach(div => {
        // Reset their inner1 styles too (optional)
        const inner = div.querySelector('.inner1-3');
        if (inner) {
            inner.style.backgroundColor = ""; // reset style
        }
    });
    // Change style of clicked div's inner1
    const targetInner1 = clickedDiv.querySelector('.inner1-3');
    if (targetInner1) {
        targetInner1.style.backgroundColor = "rgb(65, 62, 62)"; // or any other style
    }

    //FOR SHOWING EPISODES AND SETTINGS SECTIONS
    for(let i=1; i<=3; i++){
        if(chapter=="chap"+i){
            document.querySelectorAll('.chap'+i).forEach(div => {
                div.style.display = "block";
            });
        } else {
            document.querySelectorAll('.chap'+i).forEach(div => {
                div.style.display = "none";
            });
        }
    }

    const profileSection = document.querySelector('.epi-selection.profile');
    const controlsSection = document.querySelector('.epi-selection.controls');
    const volumeSection = document.querySelector('.epi-selection.volume');

    if (profileSection) profileSection.style.display = 'none';
    if (controlsSection) controlsSection.style.display = 'none';
    if (volumeSection) volumeSection.style.display = 'none';

    if (chapter === 'profile') {
        if (profileSection) profileSection.style.display = 'flex';
    } else if (chapter === 'controls') {
        if (controlsSection) controlsSection.style.display = 'flex';
    } else if (chapter === 'volume') {
        if (volumeSection) volumeSection.style.display = 'flex';
    }
}

// Add event listeners for editing controls
document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.edit-control-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const controlType = button.dataset.control;
            const controlKeySpan = document.getElementById(`${controlType}Key`);

            if (button.textContent === 'Edit') {
                const currentValue = controlKeySpan.textContent;
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('control-input');
                controlKeySpan.replaceWith(input);
                button.textContent = 'Save';
                button.classList.add('save-control-btn');
                button.classList.remove('edit-control-btn');

                if (controlType === 'skipNext') {
                    input.readOnly = true; // Skip/Touch is not a single key input
                    input.style.cursor = 'not-allowed';
                }

            } else if (button.textContent === 'Save') {
                const input = controlKeySpan.previousElementSibling; // Get the input field
                if (input && input.classList.contains('control-input')) {
                    const newValue = input.value;
                    const newSpan = document.createElement('span');
                    newSpan.id = `${controlType}Key`;
                    newSpan.classList.add('control-key');
                    newSpan.textContent = newValue;
                    input.replaceWith(newSpan);
                    button.textContent = 'Edit';
                    button.classList.remove('save-control-btn');
                    button.classList.add('edit-control-btn');
                }
            }
        });
    });

    // Volume control functionality
    const bgMusicVolume = document.getElementById('bgMusicVolume');
    const bgMusicValue = document.getElementById('bgMusicValue');
    const sfxVolume = document.getElementById('sfxVolume');
    const sfxValue = document.getElementById('sfxValue');

    if (bgMusicVolume && bgMusicValue) {
        bgMusicVolume.addEventListener('input', () => {
            bgMusicValue.textContent = `${bgMusicVolume.value}%`;
            // Here you would integrate with your actual audio playback
            // For example: backgroundMusic.volume = bgMusicVolume.value / 100;
        });
    }

    if (sfxVolume && sfxValue) {
        sfxVolume.addEventListener('input', () => {
            sfxValue.textContent = `${sfxVolume.value}%`;
            // Here you would integrate with your actual audio playback
            // For example: sfxAudio.volume = sfxVolume.value / 100;
        });
    }
});


//FOR CHALLENGES MODAL
function process3(clickedDiv, level) {
    document.querySelectorAll('.outer2-3').forEach(div => {
        // Reset their inner1 styles too (optional)
        const inner = div.querySelector('.inner1-3');
        if (inner) {
            inner.style.backgroundColor = ""; // reset style
        }
    });
    // Change style of clicked div's inner1
    const targetInner1 = clickedDiv.querySelector('.inner1-3');
    if (targetInner1) {
        targetInner1.style.backgroundColor = "rgb(65, 62, 62)"; // or any other style
    }

    //FOR SHOWING EPISODES
    for(let i=1; i<=20; i++){
        if(level=="lev"+i){
            document.querySelectorAll('.lev'+i).forEach(div => {
                div.style.display = "block";
            });
            continue;
        }
        document.querySelectorAll('.lev'+i).forEach(div => {
            div.style.display = "none";
        });
    }
}
//FOR DIFFICULTIES
function difActions(action){
    if(action=="play"){
        const plSelection = document.querySelector('.dif-selection-back1');
        if (plSelection) {
            plSelection.style.visibility = 'visible';
            plSelection.style.opacity = '1';
        }
    }else if(action=="back"){
        const difSelection = document.querySelector('.dif-selection-back1');
        if (difSelection) {
            difSelection.style.visibility = 'hidden';
            difSelection.style.opacity = '0';
        }
    }
}

