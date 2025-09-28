
document.getElementById('play-as-guest').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor link behavior
    handlePlayOption('Guest', 'index.html');
});

document.getElementById('play-with-account').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor link behavior
    handlePlayOption('Account', '../login/index.html'); // Redirect to login page
});


function handlePlayOption(optionName, redirectPath) {
    sessionStorage.setItem('chosenOption', optionName);
    window.location.href = redirectPath;
}