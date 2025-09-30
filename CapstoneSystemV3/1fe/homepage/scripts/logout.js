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
            mobileLogoutLink.addEventListener('click', async (e) => {
                e.preventDefault(); // Prevent default link behavior

                if (confirm('Are you sure you want to log out?')) {
                    try {
                        const response = await fetch('../../2be/logout.php');
                        const data = await response.json();
                        if (data.status === 'success') {
                            console.log(data.message);
                            window.location.href = './entry.html'; // Redirect after successful logout
                        } else {
                            console.error('Logout failed:', data.message);
                            // Optionally, handle error display to user
                        }
                    } catch (error) {
                        console.error('Error during logout fetch:', error);
                        // Optionally, handle network errors
                    }
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
                    try {
                        const response = await fetch('../../2be/logout.php');
                        const data = await response.json();
                        if (data.status === 'success') {
                            console.log(data.message);
                            window.location.href = './entry.html'; // Redirect after successful logout
                        } else {
                            console.error('Logout failed:', data.message);
                            // Optionally, handle error display to user
                        }
                    } catch (error) {
                        console.error('Error during logout fetch:', error);
                        // Optionally, handle network errors
                    }
                }
            });
        }
    }
});
