<?php
session_start();
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');

$response = [
    'success' => false,
    'message' => 'Unable to fetch unlocked story progress.',
    'language' => null,
    'unlockedChapters' => [],
    'unlockedEpisodes' => []
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

// Rule for Story Mode:
// - Chapter 1, Episode 1 is always unlocked (frontend can assume this)
// - A chapter N (>1) is unlocked if the previous chapter's last episode has been completed with 80+ points
// - An episode N (>1) within a chapter is unlocked if the previous episode has been completed with 80+ points

$sql = "SELECT chapter, episode, MAX(points) as maxPoints FROM progress WHERE userId = ? AND type = 'story' AND language = ? AND chapter IS NOT NULL AND episode IS NOT NULL GROUP BY chapter, episode";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param('is', $userId, $language);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $completedEpisodes = [];
        while ($row = $result->fetch_assoc()) {
            $chapter = intval($row['chapter']);
            $episode = intval($row['episode']);
            $maxPoints = intval($row['maxPoints']);
            if ($chapter > 0 && $episode > 0 && $maxPoints >= 80) {
                $completedEpisodes[] = ['chapter' => $chapter, 'episode' => $episode];
            }
        }
        
        // Determine unlocked chapters and episodes
        $unlockedChapters = [1]; // Chapter 1 is always unlocked
        $unlockedEpisodes = [1]; // Episode 1 is always unlocked
        
        // Check which chapters are unlocked
        // Chapter N+1 is unlocked if Chapter N's last episode is completed
        $chapter1Completed = false;
        $chapter2Completed = false;
        $chapter3Completed = false;
        
        foreach ($completedEpisodes as $ep) {
            if ($ep['chapter'] == 1 && $ep['episode'] == 3) { // Chapter 1 has 3 episodes
                $chapter1Completed = true;
                $unlockedChapters[] = 2;
            }
            if ($ep['chapter'] == 2 && $ep['episode'] == 2) { // Chapter 2 has 2 episodes
                $chapter2Completed = true;
                $unlockedChapters[] = 3;
            }
        }
        
        // Check which episodes are unlocked within each chapter
        // Episode N+1 is unlocked if Episode N is completed
        foreach ($completedEpisodes as $ep) {
            $nextEpisode = $ep['episode'] + 1;
            $unlockedEpisodes[] = $nextEpisode;
        }
        
        // Remove duplicates and sort
        $unlockedChapters = array_unique($unlockedChapters);
        $unlockedEpisodes = array_unique($unlockedEpisodes);
        sort($unlockedChapters);
        sort($unlockedEpisodes);
        
        $response['unlockedChapters'] = $unlockedChapters;
        $response['unlockedEpisodes'] = $unlockedEpisodes;
        $response['completedEpisodes'] = $completedEpisodes; // For debugging
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
