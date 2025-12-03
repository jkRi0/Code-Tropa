import { fetchProfileData } from './fetchProfileData.js';

document.addEventListener('DOMContentLoaded', async () => {
    const leaderboardContent = document.querySelector('.leaderboard-content');
    const leaderboardHeaders = document.querySelectorAll('.leaderboard-header .header-item');
    let currentLeaderboardData = [];
    let currentSortColumn = 'totalPoints'; // Default sort column
    let currentSortDirection = 'desc'; // Default sort direction

    async function fetchLeaderboard(language = 'all') {
        try {
            const url = `../../2be/get_leaderboard_data.php?language=${encodeURIComponent(language)}`;
            const response = await fetch(url);
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
            // Highlight the current player's entry if logged in
            if (window.currentUser && player.username === window.currentUser) {
                entry.classList.add('current-player');
            }

            // const tierClass = player.tier ? `tier-${player.tier.toLowerCase()}` : 'tier-unranked';

            entry.innerHTML = `
                <div class="entry-item">${index + 1}</div>
                <div class="entry-item">${player.username}</div>
                <div class="entry-item ${player.tierClass}">${player.displayTier || 'Unranked'}</div> <!-- Display formatted tier -->
                <div class="entry-item">${player.totalPoints}</div>
            `;
            leaderboardContent.appendChild(entry);

            // Highlight the current player's entry if logged in
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

    // Function to fetch total points for each language
    async function fetchLanguageTotals() {
        const languages = ['all', 'java', 'c++', 'c#'];
        const languageTotals = {};
        
        for (const language of languages) {
            try {
                const url = `../../2be/get_leaderboard_data.php?language=${encodeURIComponent(language)}`;
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.success && data.leaderboard.length > 0) {
                    // Calculate total points for this language
                    const totalPoints = data.leaderboard.reduce((sum, player) => sum + parseInt(player.totalPoints), 0);
                    languageTotals[language] = totalPoints;
                } else {
                    languageTotals[language] = 0;
                }
            } catch (error) {
                console.error(`Error fetching totals for ${language}:`, error);
                languageTotals[language] = 0;
            }
        }
        
        return languageTotals;
    }

    // Function to sort and reorder language filter buttons by total points
    async function sortLanguageButtonsByPoints() {
        try {
            const languageTotals = await fetchLanguageTotals();
            
            // Create array of language objects with their totals
            const languageData = [
                { language: 'all', total: languageTotals['all'], label: 'All Languages' },
                { language: 'java', total: languageTotals['java'], label: 'Java Points' },
                { language: 'c++', total: languageTotals['c++'], label: 'C++ Points' },
                { language: 'c#', total: languageTotals['c#'], label: 'C# Points' }
            ];
            
            // Sort by total points in descending order (highest to lowest)
            languageData.sort((a, b) => b.total - a.total);
            
            // Get the container for language filter buttons
            const buttonsContainer = document.querySelector('.language-filter-buttons');
            if (!buttonsContainer) return;
            
            // Clear existing buttons
            buttonsContainer.innerHTML = '';
            
            // Create and append buttons in the new order
            languageData.forEach((langData, index) => {
                const button = document.createElement('button');
                button.className = 'language-filter-btn';
                button.setAttribute('data-language', langData.language);
                button.textContent = langData.label;
                
                // Set the first button (highest points) as active by default
                if (index === 0) {
                    button.classList.add('active');
                }
                
                buttonsContainer.appendChild(button);
            });
            
            // Re-setup event listeners for the new buttons
            setupLanguageFilterButtons();
            
        } catch (error) {
            console.error('Error sorting language buttons:', error);
        }
    }

    // Function to initialize leaderboard with default settings
    async function initializeLeaderboard() {
        try {
            // First sort the language buttons by points
            await sortLanguageButtonsByPoints();
            
            // Set the first button (highest points) as active by default
            const firstButton = document.querySelector('.language-filter-btn');
            if (firstButton) {
                const selectedLanguage = firstButton.getAttribute('data-language');
                setActiveLanguageButton(selectedLanguage);
                
                // Fetch leaderboard with the language that has highest points
                await fetchLeaderboard(selectedLanguage);
                sortLeaderboard('Total Points'); // Sort by total points descending by default on load
            } else {
                // Fallback to original behavior
                setActiveLanguageButton('all');
                await fetchLeaderboard('all');
                sortLeaderboard('Total Points');
            }
        } catch (error) {
            console.error('Error initializing leaderboard:', error);
            // Fallback to fetch all languages if initialization fails
            setActiveLanguageButton('all');
            await fetchLeaderboard('all');
            sortLeaderboard('Total Points');
        }
    }

    // Function to set the active language filter button
    function setActiveLanguageButton(language) {
        const languageFilterButtons = document.querySelectorAll('.language-filter-btn');
        
        // Remove active class from all buttons
        languageFilterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to the button matching the language
        const targetButton = document.querySelector(`[data-language="${language}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        } else {
            // Fallback to "All Languages" if language not found
            const allButton = document.querySelector('[data-language="all"]');
            if (allButton) {
                allButton.classList.add('active');
            }
        }
    }

    // Function to manually filter leaderboard by language (can be called from other scripts)
    window.filterLeaderboardByLanguage = async function(language) {
        await fetchLeaderboard(language);
        sortLeaderboard('Total Points'); // Re-sort after filtering
    };

    // Function to handle language filter button clicks
    function setupLanguageFilterButtons() {
        const languageFilterButtons = document.querySelectorAll('.language-filter-btn');
        
        languageFilterButtons.forEach(button => {
            button.addEventListener('click', async () => {
                // Remove active class from all buttons
                languageFilterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get the language from data attribute
                const selectedLanguage = button.getAttribute('data-language');
                
                // Fetch leaderboard with selected language
                await fetchLeaderboard(selectedLanguage);
                sortLeaderboard('Total Points'); // Re-sort after filtering
            });
        });
    }

    // Initial fetch and display with default sorting
    await fetchProfileData(); // Ensure user data is fetched before loading leaderboard
    await initializeLeaderboard();
    
    // Setup language filter button event listeners
    setupLanguageFilterButtons();
});
