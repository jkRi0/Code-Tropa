import { currentSelectedLanguage } from './process.js';

export function hideModal() {
    // When the modal is hidden, clear the selected language
    // currentSelectedLanguage = '';
    const selectedLanguageInput = document.getElementById('selectedLanguageInput');
    if (selectedLanguageInput) {
        selectedLanguageInput.value = '';
    }

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
