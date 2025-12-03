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
// - A level N (>1) is considered unlocked if the previous level (N-1) has been completed with 80+ points
//   in the 'progress' table for the current user, type 'challenge', current language

$sql = "SELECT level, MAX(points) as maxPoints FROM progress WHERE userId = ? AND type = 'challenge' AND language = ? AND level IS NOT NULL GROUP BY level";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param('is', $userId, $language);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $completedLevels = [];
        while ($row = $result->fetch_assoc()) {
            $lvl = intval($row['level']);
            $maxPoints = intval($row['maxPoints']);
            if ($lvl > 0 && $maxPoints >= 80) {
                $completedLevels[] = $lvl;
            }
        }
        
        // Determine unlocked levels based on completed levels
        $unlockedLevels = [1]; // Level 1 is always unlocked
        
        // If level N is completed (80+ points), then level N+1 is unlocked
        foreach ($completedLevels as $completedLevel) {
            $nextLevel = $completedLevel + 1;
            if ($nextLevel <= 20 && !in_array($nextLevel, $unlockedLevels)) {
                $unlockedLevels[] = $nextLevel;
            }
        }
        
        sort($unlockedLevels);
        $response['unlockedLevels'] = $unlockedLevels;
        $response['completedLevels'] = $completedLevels; // For debugging
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


