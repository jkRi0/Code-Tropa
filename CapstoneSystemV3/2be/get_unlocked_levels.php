<?php
session_start();
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');

$response = [
    'success' => false,
    'message' => 'Unable to fetch unlocked levels.',
    'language' => null,
    'unlockedLevels' => []
];

if (!isset($_SESSION['user_id'])) {
    $response['message'] = 'Not logged in.';
    echo json_encode($response);
    exit();
}

$userId = $_SESSION['user_id'];

// Determine current language from session (fallback to 'java')
$language = $_SESSION['userData']['USERS']['programmingLanguage'] ?? 'java';
$response['language'] = $language;

// Rule:
// - Level 1 is always unlocked (frontend can assume this)
// - A level N (>1) is considered unlocked if there's at least one progress row
//   in the 'progress' table for the current user, type 'challenge', current language, and level = N

$sql = "SELECT DISTINCT level FROM progress WHERE userId = ? AND type = 'challenge' AND language = ? AND level IS NOT NULL";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param('is', $userId, $language);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $levels = [];
        while ($row = $result->fetch_assoc()) {
            $lvl = intval($row['level']);
            if ($lvl > 0) {
                $levels[] = $lvl;
            }
        }
        sort($levels);
        $response['unlockedLevels'] = $levels;
        $response['success'] = true;
        $response['message'] = 'OK';
    } else {
        $response['message'] = 'Query failed.';
    }
    $stmt->close();
} else {
    $response['message'] = 'Failed to prepare statement.';
}

echo json_encode($response);
exit();
?>


