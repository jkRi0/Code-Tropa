document.addEventListener('DOMContentLoaded', () => {
    const chosenOption = sessionStorage.getItem('chosenOption');
    const mobileLogoutButtonText = document.getElementById('logout-text');
    const mobileLogoutLink = document.getElementById('logout-link');
    const desktopLogoutButtonText = document.getElementById('desktop-logout-text');
    const desktopLogoutLink = document.getElementById('desktop-logout-link');

    async function performLogoutAndRedirect() {
        try {
            const response = await fetch('../../2be/logout.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                credentials: 'same-origin',
                cache: 'no-store',
                body: 'logout=1'
            });
            try { await response.json(); } catch (_) {}
        } catch (error) {
            console.error('Error during logout fetch:', error);
        }

        try {
            sessionStorage.clear();
            localStorage.removeItem('selectedChallenge');
            localStorage.removeItem('tipAnswered');
            // localStorage.clear(); // Uncomment if you want to fully clear
        } catch (e) {
            console.warn('Storage cleanup error:', e);
        }

        window.location.href = './entry.html';
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
                sessionStorage.clear(); // Clear guest session on click
            });
        }
        if (desktopLogoutButtonText) {
            desktopLogoutButtonText.textContent = 'EXIT';
        }
        if (desktopLogoutLink) {
            desktopLogoutLink.href = 'entry.html';
            desktopLogoutLink.addEventListener('click', () => {
                sessionStorage.clear(); // Clear guest session on click
            });
        }
    } else if (chosenOption === 'Account') {
        if (mobileLogoutButtonText) {
            mobileLogoutButtonText.textContent = 'LOGOUT';
        }
        if (mobileLogoutLink) {
            mobileLogoutLink.addEventListener('click', async (e) => {
                e.preventDefault(); // Prevent default link behavior

                if (confirm('Are you sure you want to log out?')) {
                    await performLogoutAndRedirect();
                }
            });
        }
        if (desktopLogoutButtonText) {
            desktopLogoutButtonText.textContent = 'LOGOUT';
        }
        if (desktopLogoutLink) {
            desktopLogoutLink.addEventListener('click', async (e) => {
                e.preventDefault(); // Prevent default link behavior

                if (confirm('Are you sure you want to log out?')) {
                    await performLogoutAndRedirect();
                }
            });
        }
    }
});
