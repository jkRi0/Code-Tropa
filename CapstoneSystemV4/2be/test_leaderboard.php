<?php
// Simple test script to check the leaderboard data
require_once 'db.php';

echo "<h2>Testing Leaderboard Data</h2>";

// Test 1: Count total users
$countSql = "SELECT COUNT(*) as total_users FROM users";
$countResult = $conn->query($countSql);
$countRow = $countResult->fetch_assoc();
echo "<p><strong>Total users in database:</strong> " . $countRow['total_users'] . "</p>";

// Test 2: Count users with progress
$progressSql = "SELECT COUNT(DISTINCT userId) as users_with_progress FROM progress";
$progressResult = $conn->query($progressSql);
$progressRow = $progressResult->fetch_assoc();
echo "<p><strong>Users with progress records:</strong> " . $progressRow['users_with_progress'] . "</p>";

// Test 3: Show all users
echo "<h3>All Users:</h3>";
$allUsersSql = "SELECT id, username FROM users ORDER BY username";
$allUsersResult = $conn->query($allUsersSql);
echo "<ul>";
while ($user = $allUsersResult->fetch_assoc()) {
    echo "<li>ID: " . $user['id'] . " - Username: " . $user['username'] . "</li>";
}
echo "</ul>";

// Test 4: Test the actual leaderboard query
echo "<h3>Leaderboard Query Result:</h3>";
$sql = "
    SELECT
        u.username,
        COALESCE(SUM(p.points), 0) AS totalPoints,
        (SELECT tier FROM rewards r2 WHERE r2.userId = u.id ORDER BY r2.tier DESC LIMIT 1) AS tier
    FROM
        users u
    LEFT JOIN
        progress p ON u.id = p.userId
    GROUP BY
        u.id, u.username
    ORDER BY
        totalPoints DESC, u.username ASC
";

$result = $conn->query($sql);
echo "<p><strong>Number of rows returned by leaderboard query:</strong> " . $result->num_rows . "</p>";

echo "<table border='1' style='border-collapse: collapse;'>";
echo "<tr><th>Username</th><th>Total Points</th><th>Tier</th></tr>";
while ($row = $result->fetch_assoc()) {
    echo "<tr>";
    echo "<td>" . htmlspecialchars($row['username']) . "</td>";
    echo "<td>" . $row['totalPoints'] . "</td>";
    echo "<td>" . ($row['tier'] ? $row['tier'] : 'NULL') . "</td>";
    echo "</tr>";
}
echo "</table>";

$conn->close();
?>
