import { fetchProfileData } from './fetchProfileData.js';

document.addEventListener('DOMContentLoaded', async () => {
    const leaderboardContent = document.querySelector('.leaderboard-content');
    const leaderboardHeaders = document.querySelectorAll('.leaderboard-header .header-item');
    let currentLeaderboardData = [];
    let currentSortColumn = 'totalPoints'; // Default sort column
    let currentSortDirection = 'desc'; // Default sort direction

    async function fetchLeaderboard() {
        try {
            const response = await fetch('../../2be/get_leaderboard_data.php'); // Adjust path as needed
            const data = await response.json();

            if (data.success) {
                currentLeaderboardData = data.leaderboard; // Store fetched data
                displayLeaderboard(currentLeaderboardData);
            } else {
                console.error('Failed to fetch leaderboard:', data.message);
                leaderboardContent.innerHTML = '<p>Error loading leaderboard. Please try again later.</p>';
            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            leaderboardContent.innerHTML = '<p>Error loading leaderboard. Please check your connection.</p>';
        }
    }

    function displayLeaderboard(leaderboardData) {
        leaderboardContent.innerHTML = ''; // Clear existing static content
        leaderboardData.forEach((player, index) => {
            const entry = document.createElement('div');
            entry.classList.add('leaderboard-entry');
            // Add a class for the current player if their username matches the logged-in user
            // This would require fetching the current user's username as well.
            // For now, let's assume we don't have that info and just display.

            const tierClass = player.tier ? `tier-${player.tier.toLowerCase()}` : 'tier-unranked';

            entry.innerHTML = `
                <div class="entry-item">${index + 1}</div>
                <div class="entry-item">${player.username}</div>
                <div class="entry-item ${tierClass}">${player.tier || 'Unranked'}</div> <!-- Display tier or 'Unranked' -->
                <div class="entry-item">${player.totalPoints}</div>
            `;
            leaderboardContent.appendChild(entry);

            // Highlight the current player's entry if logged in
            if (window.currentUser && player.username === window.currentUser) {
                entry.classList.add('current-player');
            }
        });
    }

    function sortLeaderboard(column) {
        // Remove previous sort indicators
        leaderboardHeaders.forEach(header => {
            header.classList.remove('sort-asc', 'sort-desc');
        });

        if (currentSortColumn === column) {
            currentSortDirection = (currentSortDirection === 'asc') ? 'desc' : 'asc';
        } else {
            currentSortColumn = column;
            currentSortDirection = 'desc'; // Default to descending for new column
        }

        // Add current sort indicator
        const activeHeader = Array.from(leaderboardHeaders).find(header => header.textContent.trim().replace(/\s*\u2195|\u2191|\u2193/g, '') === column);
        if (activeHeader) {
            activeHeader.classList.add(currentSortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
        }

        currentLeaderboardData.sort((a, b) => {
            let valA, valB;

            switch (column) {
                case 'Rank':
                    // Rank is determined by the sorted order, so we don't sort by it directly
                    // We will re-render with new ranks based on the sorted list
                    return 0; 
                case 'Player Name':
                    valA = a.username.toLowerCase();
                    valB = b.username.toLowerCase();
                    break;
                case 'Tier Level':
                    // Custom sorting for tiers if needed, otherwise alphabetical
                    const tierOrder = {'unranked': 0, 'bronze': 1, 'silver': 2, 'gold': 3, 'platinum': 4, 'diamond': 5};
                    valA = tierOrder[a.tier ? a.tier.toLowerCase() : 'unranked'];
                    valB = tierOrder[b.tier ? b.tier.toLowerCase() : 'unranked'];
                    break;
                case 'Total Points':
                    valA = parseInt(a.totalPoints);
                    valB = parseInt(b.totalPoints);
                    break;
                default:
                    return 0;
            }

            if (valA < valB) {
                return currentSortDirection === 'asc' ? -1 : 1;
            } else if (valA > valB) {
                return currentSortDirection === 'asc' ? 1 : -1;
            } else {
                return 0;
            }
        });
        displayLeaderboard(currentLeaderboardData);
    }

    leaderboardHeaders.forEach(header => {
        header.classList.add('sortable'); // Add sortable class to all headers
        header.addEventListener('click', () => {
            const column = header.textContent.trim().replace(/\s*\u2195|\u2191|\u2193/g, ''); // Remove sort icons before getting column name
            sortLeaderboard(column);
        });
    });

    // Initial fetch and display with default sorting
    await fetchProfileData(); // Ensure user data is fetched before loading leaderboard
    fetchLeaderboard().then(() => {
        sortLeaderboard('Total Points'); // Sort by total points descending by default on load
    });
});
