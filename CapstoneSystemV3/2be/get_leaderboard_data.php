<?php
session_start();
header('Content-Type: application/json');

// Include the database connection file
require_once 'db.php';

$response = [
    'success' => false,
    'message' => 'An unknown error occurred.',
    'leaderboard' => []
];

try {
    // SQL query to get total points and tier for each user
    // We need to join users, progress, and rewards tables.
    // To get the latest tier, we can use a subquery or a JOIN with a GROUP BY and MAX(tier)
    $sql = "
        SELECT
            u.username,
            SUM(p.points) AS totalPoints,
            (SELECT tier FROM rewards r2 WHERE r2.userId = u.id ORDER BY r2.tier DESC LIMIT 1) AS tier
        FROM
            users u
        JOIN
            progress p ON u.id = p.userId
        GROUP BY
            u.id, u.username
        ORDER BY
            totalPoints DESC;
    ";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    $leaderboardData = [];
    while ($row = $result->fetch_assoc()) {
        $leaderboardData[] = $row;
    }

    $response['success'] = true;
    $response['message'] = 'Leaderboard data fetched successfully.';
    $response['leaderboard'] = $leaderboardData;

} catch (Exception $e) {
    $response['message'] = 'Database error: ' . $e->getMessage();
}

echo json_encode($response);

$conn->close();
?>
