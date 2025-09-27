import { currentSelectedLanguage } from './process.js';
import { hideModal } from './hideModal.js';

export function submitLanguageSelection() {
    const selectedLanguageInput = document.getElementById('selectedLanguageInput');
    // Only submit if a language has been selected
    if (currentSelectedLanguage) {
        selectedLanguageInput.value = currentSelectedLanguage;
        document.getElementById('languageForm').submit();
        hideModal(); // Hide modal after submission
    } else {
        alert('Please select a programming language.'); // Or provide other feedback
    }
}
