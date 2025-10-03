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
            } else {
                console.error('Error fetching profile data:', data.message);
                document.getElementById('playerName').textContent = 'Guest';
                document.getElementById('currentPoints').textContent = 'N/A';
                document.getElementById('currentTier').textContent = 'N/A';
            }
        })
        .catch(error => {
            console.error('Network error or server issue:', error);
            document.getElementById('playerName').textContent = 'Error';
            document.getElementById('currentPoints').textContent = 'Error';
            document.getElementById('currentTier').textContent = 'Error';
        });
}
