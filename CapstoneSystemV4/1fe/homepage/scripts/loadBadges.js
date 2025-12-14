// Helper function to display badges
function displayBadges(badgeNames) {
    const badgesContainer = document.querySelector('.badges-container');
    if (!badgesContainer) {
        console.error('Badges container not found in DOM');
        return;
    }
    
    badgesContainer.innerHTML = ''; // Clear existing badges
    
    if (badgeNames && Array.isArray(badgeNames) && badgeNames.length > 0) {
        const badgesToDisplay = badgeNames.filter(badge => badge && badge !== "" && badge !== null);
        
        if (badgesToDisplay.length > 0) {
            console.log('Displaying badges:', badgesToDisplay);
            badgesToDisplay.forEach(badge => {
                const img = document.createElement('img');
                img.src = `../assets/${badge}.png`; // Path relative to homepage/index.html: ../ goes to 1fe/, then assets/
                img.alt = `${badge} Badge`;
                img.classList.add('badge-icon'); // Add a class for styling
                img.onerror = function() {
                    console.error(`Failed to load badge image: ${this.src}`);
                    this.style.display = 'none'; // Hide broken images
                };
                img.onload = function() {
                    console.log(`Successfully loaded badge: ${badge}`);
                };
                badgesContainer.appendChild(img);
            });
        } else {
            console.log('No valid badges to display after filtering');
            badgesContainer.innerHTML = '<p>No badges achieved yet.</p>';
        }
    } else {
        badgesContainer.innerHTML = '<p>No badges achieved yet.</p>';
    }
}

export async function refreshBadges() {
    console.log('Refreshing badges...');
    
    // Try to load cached badges first
    try {
        const { getBadges } = await import('./dbManager.js');
        const cachedBadges = await getBadges();
        if (cachedBadges && cachedBadges.length > 0) {
            // getBadges now returns an array of badge name strings
            console.log('Using cached badges:', cachedBadges);
            displayBadges(cachedBadges);
        }
    } catch (err) {
        console.log('No cached badges available or error loading cache:', err);
    }
    
    // Then try to fetch from server
    fetch('../../2be/get_badges.php') // Correct path to the PHP endpoint
        .then(response => {
            console.log('Response received:', response.status, response.ok, response.statusText);
            // The apiFetch wrapper returns a custom response object
            // It may not have headers, so check if it exists before accessing
            if (response.headers && typeof response.headers.get === 'function') {
                const contentType = response.headers.get('content-type');
                if (contentType && !contentType.includes('application/json')) {
                    console.warn('Response is not JSON, content-type:', contentType);
                }
            }
            return response.json();
        })
        .then(data => {
            console.log('Badges data received:', data); // Debug log
            
            // Check if request was successful
            if (data && data.success !== undefined) {
                if (data.success && data.badges && Array.isArray(data.badges) && data.badges.length > 0) {
                    displayBadges(data.badges);
                } else {
                    console.log('No badges to display:', data.message || 'No badges found or request failed');
                    displayBadges([]);
                }
            } else {
                console.error('Invalid response format:', data);
                const badgesContainer = document.querySelector('.badges-container');
                if (badgesContainer) {
                    badgesContainer.innerHTML = '<p>Error: Invalid response from server.</p>';
                }
            }
        })
        .catch(error => {
            console.error('Error fetching badges:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack
            });
            // Don't show error if we already have cached badges displayed
            const badgesContainer = document.querySelector('.badges-container');
            if (badgesContainer && badgesContainer.innerHTML === '') {
                badgesContainer.innerHTML = '<p>Error loading badges. Please try again later.</p>';
            }
        });
}

document.addEventListener('DOMContentLoaded', refreshBadges);
