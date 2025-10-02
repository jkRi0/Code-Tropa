import { currentSelectedLanguage } from './process.js';
import { hideModal } from './hideModal.js';

// Import functions to refresh relevant UI components
import { initializeDomContent } from './domContentLoaded.js'; // For refreshing performance graphs
// Assuming there's a function to refresh badges, or we can add it later if needed
// import { refreshBadges } from './loadBadges.js'; 

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
                alert(data.message);
                hideModal(); // Hide modal after successful submission
                // Refresh UI components that depend on the programming language
                initializeDomContent(); // Re-run DOM content initialization to refresh performance graphs
                // if (typeof refreshBadges === 'function') {
                //     refreshBadges(); // Call function to refresh badges if it exists
                // }
            } else {
                alert(`Error: ${data.message}`);
            }
        })
        .catch(error => console.error('Error updating language:', error));

    } else {
        alert('Please select a programming language.'); // Or provide other feedback
    }
}
