import { handlePlayOption } from './optionHandler.js';

document.getElementById('play-as-guest').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor link behavior
    handlePlayOption('Guest');
});

document.getElementById('play-with-account').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor link behavior
    handlePlayOption('Account');
});
