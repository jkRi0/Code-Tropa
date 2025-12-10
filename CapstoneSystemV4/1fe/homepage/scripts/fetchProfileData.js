document.addEventListener("DOMContentLoaded", function() {
    fetchProfileData();
});

export function fetchProfileData() {
    console.log('Fetching profile data...');
    fetch('../../2be/get_profile_data.php')
        .then(response => response.json())
        .then(data => {
            console.log('Profile data received:', data);
            if (data.success) {
                document.getElementById('playerName').textContent = data.username;
                document.getElementById('currentPoints').textContent = data.totalPoints;
                document.getElementById('currentTier').innerHTML = data.tier;
                window.currentUser = data.username; // Store current username globally
            } else {
                console.error('Error fetching profile data:', data.message);
                document.getElementById('playerName').textContent = 'Guest';
                document.getElementById('currentPoints').textContent = 'N/A';
                document.getElementById('currentTier').textContent = 'N/A';
                window.currentUser = null; // No user logged in
            }
        })
        .catch(error => {
            console.error('Network error or server issue:', error);
            document.getElementById('playerName').textContent = 'Error';
            document.getElementById('currentPoints').textContent = 'Error';
            document.getElementById('currentTier').textContent = 'Error';
            window.currentUser = null; // Error, no user logged in
        });

    fetchPerformanceData(); // Call this function after fetching profile data
}

export function fetchPerformanceData() {
    console.log('Fetching performance data...');
    fetch('../../2be/get_performance_data.php')
        .then(response => response.json())
        .then(data => {
            console.log('Performance data received:', data);
            if (data) {
                // Ensure values are within 0-100 range and are numbers
                const accuracy = Math.min(100, Math.max(0, parseFloat(data.accuracy) || 0));
                const efficiency = Math.min(100, Math.max(0, parseFloat(data.efficiency) || 0));
                const readability = Math.min(100, Math.max(0, parseFloat(data.readability) || 0));
                const timeTaken = Math.min(100, Math.max(0, parseFloat(data.timeTaken) || 0));

                // Update bar heights and percentages
                document.querySelector('.bar-accuracy').style.height = `${accuracy}%`;
                document.querySelector('.bar-accuracy .bar-percentage-label').textContent = `${accuracy.toFixed(0)}%`;

                document.querySelector('.bar-efficiency').style.height = `${efficiency}%`;
                document.querySelector('.bar-efficiency .bar-percentage-label').textContent = `${efficiency.toFixed(0)}%`;

                document.querySelector('.bar-readability').style.height = `${readability}%`;
                document.querySelector('.bar-readability .bar-percentage-label').textContent = `${readability.toFixed(0)}%`;

                // The issue was with 'time', now it's 'timeTaken' and it should be a percentage if displayed as a bar
                document.querySelector('.bar-time').style.height = `${timeTaken}%`;
                document.querySelector('.bar-time .bar-percentage-label').textContent = `${timeTaken.toFixed(0)}%`;

            } else {
                console.error('Error: No performance data received.');
            }
        })
        .catch(error => {
            console.error('Network error or server issue fetching performance data:', error);
        });
}
