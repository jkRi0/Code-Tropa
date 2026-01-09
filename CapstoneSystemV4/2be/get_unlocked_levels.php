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
    'unlockedLevels' => [],
    'levelPoints' => [], // Map of level number to max points
    'levelPerformance' => [] // Map of level number to performance metrics
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

$sql = "SELECT p.level, MAX(p.points) as maxPoints,
        AVG(perf.accuracy) as avgAccuracy,
        AVG(perf.efficiency) as avgEfficiency,
        AVG(perf.readability) as avgReadability
        FROM progress p
        LEFT JOIN performance perf ON p.id = perf.progressId
        WHERE p.userId = ? AND p.type = 'challenge' AND p.language = ? AND p.level IS NOT NULL
        GROUP BY p.level";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param('is', $userId, $language);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $completedLevels = [];
        $levelPointsMap = []; // Store points for all levels (not just completed)
        $levelPerformanceMap = []; // Store performance metrics for all levels
        while ($row = $result->fetch_assoc()) {
            $lvl = intval($row['level']);
            $maxPoints = intval($row['maxPoints']);
            $avgAccuracy = $row['avgAccuracy'] ? round(floatval($row['avgAccuracy']), 0) : 0;
            $avgEfficiency = $row['avgEfficiency'] ? round(floatval($row['avgEfficiency']), 0) : 0;
            $avgReadability = $row['avgReadability'] ? round(floatval($row['avgReadability']), 0) : 0;
            
            if ($lvl > 0) {
                // Store points for all levels
                $levelPointsMap[$lvl] = $maxPoints;
                // Store performance metrics if available
                if ($avgAccuracy > 0 || $avgEfficiency > 0 || $avgReadability > 0) {
                    $levelPerformanceMap[$lvl] = [
                        'accuracy' => $avgAccuracy,
                        'efficiency' => $avgEfficiency,
                        'readability' => $avgReadability
                    ];
                }
                // Only add to completed if >= 80
                if ($maxPoints >= 80) {
                    $completedLevels[] = $lvl;
                }
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
        $response['levelPoints'] = $levelPointsMap; // Map of level (1-20) to max points
        $response['levelPerformance'] = $levelPerformanceMap; // Map of level (1-20) to performance metrics
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


