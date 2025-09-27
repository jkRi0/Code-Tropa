document.addEventListener('DOMContentLoaded', () => {
    const chosenOption = sessionStorage.getItem('chosenOption');
    const logoutButtonText = document.getElementById('logout-text');
    const logoutLink = document.getElementById('logout-link');

    if (chosenOption) {

        if (chosenOption === 'Guest') {
            if (logoutButtonText) {
                logoutButtonText.textContent = 'EXIT';
            }
            if (logoutLink) {
                logoutLink.href = 'home.html';
            }
        } else { // Assuming 'Account' or any other option
            if (logoutButtonText) {
                logoutButtonText.textContent = 'LOGOUT';
            }
            if (logoutLink) {
                logoutLink.href = '../logout.php';
            }
        }
    } else {
        console.log('No option chosen.');
        // Default to LOGOUT and logout.php if no option is found in session storage
        if (logoutButtonText) {
            logoutButtonText.textContent = 'LOGOUT';
        }
        if (logoutLink) {
            logoutLink.href = '../logout.php';
        }
    }
});
