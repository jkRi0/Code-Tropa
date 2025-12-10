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
        
        // Helper function to convert chapter/episode to global episode number (1-7)
        // Chapter 1: ep1=1, ep2=2, ep3=3
        // Chapter 2: ep1=4, ep2=5
        // Chapter 3: ep1=6, ep2=7
        function chapterEpisodeToGlobal($chapter, $episode) {
            if ($chapter == 1) {
                return $episode; // 1, 2, 3
            } elseif ($chapter == 2) {
                return 3 + $episode; // 4, 5
            } elseif ($chapter == 3) {
                return 5 + $episode; // 6, 7
            }
            return 0;
        }
        
        // Helper function to convert global episode number to chapter/episode
        function globalToChapterEpisode($globalEp) {
            if ($globalEp <= 3) {
                return ['chapter' => 1, 'episode' => $globalEp];
            } elseif ($globalEp <= 5) {
                return ['chapter' => 2, 'episode' => $globalEp - 3];
            } else {
                return ['chapter' => 3, 'episode' => $globalEp - 5];
            }
        }
        
        // Convert completed chapter/episode pairs to global episode numbers
        $completedGlobalEpisodes = [];
        foreach ($completedEpisodes as $ep) {
            $globalEp = chapterEpisodeToGlobal($ep['chapter'], $ep['episode']);
            if ($globalEp > 0 && $globalEp <= 7) {
                $completedGlobalEpisodes[] = $globalEp;
            }
        }
        
        // Determine unlocked chapters and episodes
        $unlockedChapters = [1]; // Chapter 1 is always unlocked
        $unlockedGlobalEpisodes = [1]; // Global Episode 1 is always unlocked
        
        // Check which chapters are unlocked
        // Chapter 2 is unlocked if global episode 3 is completed
        // Chapter 3 is unlocked if global episode 5 is completed
        if (in_array(3, $completedGlobalEpisodes)) {
            $unlockedChapters[] = 2;
        }
        if (in_array(5, $completedGlobalEpisodes)) {
            $unlockedChapters[] = 3;
        }
        
        // Check which global episodes are unlocked sequentially
        // Episode N+1 is unlocked if Episode N is completed (sequential, not per chapter)
        foreach ($completedGlobalEpisodes as $globalEp) {
            if ($globalEp < 7) { // Don't unlock beyond episode 7
                $nextGlobalEp = $globalEp + 1;
                $unlockedGlobalEpisodes[] = $nextGlobalEp;
            }
        }
        
        // Remove duplicates and sort
        $unlockedChapters = array_unique($unlockedChapters);
        $unlockedGlobalEpisodes = array_unique($unlockedGlobalEpisodes);
        sort($unlockedChapters);
        sort($unlockedGlobalEpisodes);
        
        // Convert completed global episodes back to chapter/episode format for response
        $completedEpisodesFormatted = [];
        foreach ($completedGlobalEpisodes as $globalEp) {
            $ce = globalToChapterEpisode($globalEp);
            $completedEpisodesFormatted[] = $ce;
        }
        
        $response['unlockedChapters'] = $unlockedChapters;
        $response['unlockedEpisodes'] = $unlockedGlobalEpisodes; // Now returns global episode numbers (1-7)
        $response['completedEpisodes'] = $completedGlobalEpisodes; // Returns global episode numbers (1-7) for frontend
        $response['completedEpisodesDetailed'] = $completedEpisodesFormatted; // Chapter/episode pairs for debugging
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
