document.addEventListener('DOMContentLoaded', function() {
    fetch('../../2be/get_badges.php') // Correct path to the PHP endpoint
        .then(response => response.json())
        .then(data => {
            const badgesContainer = document.querySelector('.badges-container');
            if (data.badges && data.badges.length > 0) {
                // Skip the first element as it's for verification
                const badgesToDisplay = data.badges.slice(1);

                badgesToDisplay.forEach(badge => {
                    if (badge !== "") { // Exclude empty badge strings
                        const img = document.createElement('img');
                        img.src = `../.../../assets/${badge}.png`; // Assuming badge images are in assets/badges/
                        img.alt = `${badge} Badge`;
                        img.classList.add('badge-icon'); // Add a class for styling
                        badgesContainer.appendChild(img);
                    }
                });
            } else {
                badgesContainer.innerHTML = '<p>No badges achieved yet.</p>';
            }
        })
        .catch(error => console.error('Error fetching badges:', error));
});
