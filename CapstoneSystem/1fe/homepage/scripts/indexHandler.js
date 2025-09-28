document.addEventListener('DOMContentLoaded', () => {
    const chosenOption = sessionStorage.getItem('chosenOption');
    const mobileLogoutButtonText = document.getElementById('logout-text');
    const mobileLogoutLink = document.getElementById('logout-link');
    const desktopLogoutButtonText = document.getElementById('desktop-logout-text');
    const desktopLogoutLink = document.getElementById('desktop-logout-link');

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
            mobileLogoutLink.href = '../../2be/mid.html?log=0';
        }
        if (desktopLogoutButtonText) {
            desktopLogoutButtonText.textContent = 'LOGOUT';
        }
        if (desktopLogoutLink) {
            desktopLogoutLink.href = '../../2be/mid.html?log=0';
        }
    }
});
