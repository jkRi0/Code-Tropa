<?php
session_start();
header('Content-Type: application/json');

// Include database connection
require_once 'db.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'User not logged in'
    ]);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    // Get user's selected language
    $stmt = $conn->prepare("SELECT selected_language FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $userData = $result->fetch_assoc();
    $language = $userData['selected_language'] ?? null;
    $stmt->close();
    
    if (!$language) {
        echo json_encode([
            'status' => 'error',
            'message' => 'No programming language selected'
        ]);
        exit;
    }
    
    // Count completed episodes for the selected language
    $stmt = $conn->prepare("SELECT COUNT(*) as completed FROM story_progress WHERE user_id = ? AND language = ? AND completed = 1");
    $stmt->bind_param("is", $user_id, $language);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $completedEpisodes = intval($row['completed']);
    $stmt->close();
    
    // Total episodes per language (as per your requirements: 7 episodes covering all topics)
    $totalEpisodes = 7;
    
    // Check if all episodes are completed
    $allEpisodesCompleted = $completedEpisodes >= $totalEpisodes;
    
    // Get list of completed episode numbers
    $stmt = $conn->prepare("SELECT episode_number FROM story_progress WHERE user_id = ? AND language = ? AND completed = 1 ORDER BY episode_number");
    $stmt->bind_param("is", $user_id, $language);
    $stmt->execute();
    $result = $stmt->get_result();
    $completedEpisodesList = [];
    while ($row = $result->fetch_assoc()) {
        $completedEpisodesList[] = intval($row['episode_number']);
    }
    $stmt->close();
    
    echo json_encode([
        'status' => 'success',
        'allEpisodesCompleted' => $allEpisodesCompleted,
        'completedEpisodes' => $completedEpisodes,
        'totalEpisodes' => $totalEpisodes,
        'completedEpisodesList' => $completedEpisodesList,
        'language' => $language
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}

$conn->close();
?>


