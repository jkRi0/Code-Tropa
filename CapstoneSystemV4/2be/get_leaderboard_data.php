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

$language = isset($_GET['language']) ? $_GET['language'] : 'all';
error_log("Language parameter received: " . $language);

try {
    // First, let's check how many users we have in total
    $countSql = "SELECT COUNT(*) as total_users FROM users";
    $countResult = $conn->query($countSql);
    $countRow = $countResult->fetch_assoc();
    error_log("Total users in database: " . $countRow['total_users']);
    
    // Test simple query without GROUP BY
    $simpleSql = "SELECT u.id, u.username FROM users u ORDER BY u.username";
    $simpleResult = $conn->query($simpleSql);
    error_log("Simple users query returned: " . $simpleResult->num_rows . " rows");
    
    // SQL query to get total points and tier for each user
    // We need to join users, progress, and rewards tables.
    // To get the latest tier, we can use a subquery or a JOIN with a GROUP BY and MAX(tier)
    
    if ($language === 'all') {
        // For 'all' languages, sum all points regardless of language
        $sql = "
            SELECT
                u.id,
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
        $params = [];
        $types = '';
    } else {
        // For specific languages, only sum points from that language
        $sql = "
            SELECT
                u.id,
                u.username,
                COALESCE(SUM(CASE WHEN p.language = ? THEN p.points ELSE 0 END), 0) AS totalPoints,
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
        $params = [$language];
        $types = 's';
    }
    
    // Alternative simpler query for debugging
    $debugSql = "
        SELECT 
            u.id, 
            u.username,
            (SELECT COALESCE(SUM(points), 0) FROM progress WHERE userId = u.id) as totalPoints,
            (SELECT tier FROM rewards WHERE userId = u.id ORDER BY tier DESC LIMIT 1) as tier
        FROM users u 
        ORDER BY totalPoints DESC, u.username ASC
    ";
    error_log("Debug SQL: " . $debugSql);

    error_log("Prepared SQL: " . $sql);
    if (!empty($params)) {
        error_log("Bound parameters: " . implode(", ", $params));
    }

    // Test the debug query first
    $debugResult = $conn->query($debugSql);
    error_log("Debug query returned: " . $debugResult->num_rows . " rows");
    
    $stmt = $conn->prepare($sql);
    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }
    $stmt->execute();
    $result = $stmt->get_result();

    $leaderboardData = [];
    error_log("Number of rows returned: " . $result->num_rows);
    
    // Additional debugging - check if there are any SQL errors
    if (!$result) {
        error_log("SQL Error: " . $conn->error);
        $response['message'] = 'SQL Error: ' . $conn->error;
        echo json_encode($response);
        exit;
    }
    
    if ($result->num_rows === 0) {
        error_log("No rows returned for language: " . $language);
    }
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
        
        // Log each user being processed
        error_log("Processing user: " . $row['username'] . " with " . $row['totalPoints'] . " points");
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
