import { currentSelectedLanguage } from './process.js';
import { hideModal } from './hideModal.js';

// Import functions to refresh relevant UI components
import { initializeDomContent } from './domContentLoaded.js'; // For refreshing performance graphs
// Assuming there's a function to refresh badges, or we can add it later if needed
import { refreshBadges } from '../loadBadges.js'; 
import { fetchProfileData } from '../fetchProfileData.js';
import { applyStoryModeLocks } from '../lockStoryMode.js'; // For refreshing story mode locks
import { applyLevelLocks } from '../lockLevels.js'; // For refreshing challenge level locks

export function submitLanguageSelection() {
    // const selectedLanguageInput = document.getElementById('selectedLanguageInput'); // No longer needed
    // Only submit if a language has been selected

    if (currentSelectedLanguage) {
        // selectedLanguageInput.value = currentSelectedLanguage; // No longer needed
        // document.getElementById('languageForm').submit(); // No longer submitting a form, using fetch

        console.log(currentSelectedLanguage);

        fetch('../../2be/update_language.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `language=${encodeURIComponent(currentSelectedLanguage)}`,
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Store the selected language in localStorage
                localStorage.setItem('selectedLanguage', currentSelectedLanguage.toLowerCase());
                console.log('Language saved to localStorage:', currentSelectedLanguage);
                
                // Update the display element immediately
                const languageElement = document.getElementById('currentLanguageDisplay');
                if (languageElement) {
                    languageElement.textContent = currentSelectedLanguage.toUpperCase();
                }
                
                alert(data.message);
                hideModal(); // Hide modal after successful submission
                // Refresh UI components that depend on the programming language
                initializeDomContent(); // Re-run DOM content initialization to refresh performance graphs
                if (typeof refreshBadges === 'function') {
                    refreshBadges(); // Call function to refresh badges if it exists
                }
                if (typeof fetchProfileData === 'function') {
                    fetchProfileData(); // Call function to refresh profile data (including tier)
                }
                // Refresh story mode locks for the new programming language
                if (typeof applyStoryModeLocks === 'function') {
                    applyStoryModeLocks(); // Refresh unlocked episodes based on new language
                }
                // Refresh challenge level locks for the new programming language
                if (typeof applyLevelLocks === 'function') {
                    applyLevelLocks(); // Refresh unlocked challenge levels based on new language
                }
            } else {
                alert(`Error: ${data.message}`);
            }
        })
        .catch(error => console.error('Error updating language:', error));

    } else {
        alert('Please select a programming language.'); // Or provide other feedback
    }
}
