/**
 * Handles the click event for the play options.
 * Stores the chosen option in session storage,
 * then redirects to index.html.
 * @param {string} optionName The name of the chosen option (e.g., "Guest", "Account").
 */
function handlePlayOption(optionName) {
    sessionStorage.setItem('chosenOption', optionName);
    window.location.href = 'index.html';
}

export { handlePlayOption };
