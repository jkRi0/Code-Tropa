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
            // Handle both success and queued responses
            const isSuccess = data.status === 'success' || data.queued === true;
            
            if (isSuccess) {
                // Store the selected language in localStorage immediately (optimistic update)
                localStorage.setItem('selectedLanguage', currentSelectedLanguage.toLowerCase());
                console.log('Language saved to localStorage:', currentSelectedLanguage);
                
                // Update the display element immediately
                const languageElement = document.getElementById('currentLanguageDisplay');
                if (languageElement) {
                    languageElement.textContent = currentSelectedLanguage.toUpperCase();
                }
                
                // Update profile cache and invalidate language cache
                import('../dbManager.js').then(({ getProfile, saveProfile, deleteData, STORES, getAllData }) => {
                    getProfile().then(profile => {
                        if (profile) {
                            profile.programmingLanguage = currentSelectedLanguage;
                            saveProfile(profile);
                        }
                    });
                    // Invalidate all cached language responses (they might have different URL formats)
                    getAllData(STORES.CACHE).then(cachedItems => {
                        cachedItems.forEach(item => {
                            if (item.url && item.url.includes('get_current_language.php')) {
                                deleteData(STORES.CACHE, item.url).catch(() => {});
                            }
                        });
                    }).catch(() => {});
                }).catch(() => {});
                
                if (data.queued) {
                    alert('Language change queued for sync when online');
                } else {
                    alert(data.message || 'Language updated successfully');
                }
                
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
                alert(`Error: ${data.message || 'Failed to update language'}`);
            }
        })
        .catch(error => {
            console.error('Error updating language:', error);
            // Even on error, update localStorage optimistically
            localStorage.setItem('selectedLanguage', currentSelectedLanguage.toLowerCase());
            alert('Language change will be synced when online');
        });

    } else {
        alert('Please select a programming language.'); // Or provide other feedback
    }
}
