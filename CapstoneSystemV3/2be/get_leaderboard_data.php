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
        $tier = $row['tier'];
        $displayTier = 'N/A';
        $tierClass = '';

        switch ($tier) {
            case 't1':
                $displayTier = 'Tier 1: Syntax Novice';
                $tierClass = 'tier-bronze';
                break;
            case 't2':
                $displayTier = 'Tier 2: Data Handler';
                $tierClass = 'tier-silver';
                break;
            case 't3':
                $displayTier = 'Tier 3: Algorithm Apprentice';
                $tierClass = 'tier-gold';
                break;
            case 't4':
                $displayTier = 'Tier 4: Logic Controller';
                $tierClass = 'tier-platinum';
                break;
            case 't5':
                $displayTier = 'Tier 5: Data Manipulator';
                $tierClass = 'tier-diamond';
                break;
            case 't6':
                $displayTier = 'Tier 6: Function Master';
                $tierClass = 'tier-diamond';
                break;
            case 't7':
                $displayTier = 'Tier 7: Logic Legend';
                $tierClass = 'tier-diamond';
                break;
            case 't8':
                $displayTier = 'Tier 8: Syntax Sage';
                $tierClass = 'tier-diamond';
                break;
            case 't9':
                $displayTier = 'Tier 9: Code Virtuoso';
                $tierClass = 'tier-diamond';
                break;
            case 't10':
                $displayTier = 'Tier 10: Code-Tropa Champion';
                $tierClass = 'tier-diamond';
                break;
            default:
                $displayTier = 'Unranked';
                $tierClass = 'tier-unranked';
                break;
        }

        $row['displayTier'] = $displayTier;
        $row['tierClass'] = $tierClass;
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
