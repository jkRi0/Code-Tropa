document.addEventListener('DOMContentLoaded', () => {
    const chosenOption = sessionStorage.getItem('chosenOption');
    const mobileLogoutButtonText = document.getElementById('logout-text');
    const mobileLogoutLink = document.getElementById('logout-link');
    const desktopLogoutButtonText = document.getElementById('desktop-logout-text');
    const desktopLogoutLink = document.getElementById('desktop-logout-link');

    const homepageBackgroundMusic = document.getElementById('homepageBackgroundMusic');

    // Attempt to play background music on load
    if (homepageBackgroundMusic) {
        // Load volume from localStorage if available
        const savedVolume = localStorage.getItem('backgroundMusicVolume');
        if (savedVolume !== null) {
            homepageBackgroundMusic.volume = parseFloat(savedVolume);
        } else {
            homepageBackgroundMusic.volume = 0.5; // Default volume
        }
        
        homepageBackgroundMusic.play().catch(error => {
            console.log("Autoplay prevented for background music: ", error);
            // If autoplay fails, try to play on first user interaction
            document.addEventListener('click', () => {
                if (homepageBackgroundMusic.paused) {
                    homepageBackgroundMusic.play().catch(err => console.log("Play on click failed: ", err));
                }
            }, { once: true });
        });
    }

    if (!chosenOption) {
        console.log('No option chosen. Redirecting to entry.html');
        window.location.href = 'entry.html';
        return; // Stop further execution
    }

    if (chosenOption === 'Guest') {
        if (mobileLogoutButtonText) {
            mobileLogoutButtonText.textContent = 'EXIT';
        }
        if (mobileLogoutLink) {
            mobileLogoutLink.href = 'entry.html';
            mobileLogoutLink.addEventListener('click', () => {
                sessionStorage.removeItem('chosenOption'); // Clear guest session on click
            });
        }
        if (desktopLogoutButtonText) {
            desktopLogoutButtonText.textContent = 'EXIT';
        }
        if (desktopLogoutLink) {
            desktopLogoutLink.href = 'entry.html';
            desktopLogoutLink.addEventListener('click', () => {
                sessionStorage.removeItem('chosenOption'); // Clear guest session on click
            });
        }
    } else if (chosenOption === 'Account') {
        if (mobileLogoutButtonText) {
            mobileLogoutButtonText.textContent = 'LOGOUT';
        }
        if (mobileLogoutLink) {
            mobileLogoutLink.href = '../../2be/logout.php';
        }
        if (desktopLogoutButtonText) {
            desktopLogoutButtonText.textContent = 'LOGOUT';
        }
        if (desktopLogoutLink) {
            desktopLogoutLink.href = '../../2be/logout.php';
        }
    }
});
