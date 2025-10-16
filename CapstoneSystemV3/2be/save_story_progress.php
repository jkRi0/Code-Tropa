<?php
session_start();
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit();
}

$userId = $_SESSION['user_id'];
$language = $_SESSION['userData']['USERS']['programmingLanguage'] ?? 'java';

// Expect POST: type (story), language, chapter (int), episode (int), points (int), passed (bool)
$type = isset($_POST['type']) ? strtolower(trim($_POST['type'])) : null;
$chapter = isset($_POST['chapter']) ? intval($_POST['chapter']) : null;
$episode = isset($_POST['episode']) ? intval($_POST['episode']) : null;
$points = isset($_POST['points']) ? intval($_POST['points']) : null;
$passed = isset($_POST['passed']) ? filter_var($_POST['passed'], FILTER_VALIDATE_BOOLEAN) : false;

if (!$type || !$chapter || !$episode || $points === null) {
    echo json_encode(['success' => false, 'message' => 'Missing parameters']);
    exit();
}

if ($type !== 'story') {
    echo json_encode(['success' => false, 'message' => 'Invalid type']);
    exit();
}

// Check existing progress for this user/language/chapter/episode
$selectSql = "SELECT id, points FROM progress WHERE userId = ? AND type = 'story' AND language = ? AND chapter = ? AND episode = ? LIMIT 1";
if (!$stmt = $conn->prepare($selectSql)) {
    echo json_encode(['success' => false, 'message' => 'Failed to prepare select']);
    exit();
}
$stmt->bind_param('isii', $userId, $language, $chapter, $episode);
$stmt->execute();
$result = $stmt->get_result();
$existing = $result->fetch_assoc();
$stmt->close();

if ($existing) {
    // Update only if new points are higher
    if (intval($existing['points']) < $points) {
        $updateSql = "UPDATE progress SET points = ? WHERE id = ?";
        if (!$u = $conn->prepare($updateSql)) {
            echo json_encode(['success' => false, 'message' => 'Failed to prepare update']);
            exit();
        }
        $u->bind_param('ii', $points, $existing['id']);
        $ok = $u->execute();
        $u->close();
        echo json_encode(['success' => $ok, 'message' => $ok ? 'Progress updated' : 'Update failed', 'updated' => $ok, 'inserted' => false]);
        exit();
    } else {
        echo json_encode(['success' => true, 'message' => 'Existing score is higher or equal, no update', 'updated' => false, 'inserted' => false]);
        exit();
    }
} else {
    // Insert new progress
    $insertSql = "INSERT INTO progress (userId, type, language, chapter, episode, points) VALUES (?, 'story', ?, ?, ?, ?)";
    if (!$i = $conn->prepare($insertSql)) {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare insert']);
        exit();
    }
    $i->bind_param('isiii', $userId, $language, $chapter, $episode, $points);
    $ok = $i->execute();
    $i->close();
    echo json_encode(['success' => $ok, 'message' => $ok ? 'Progress inserted' : 'Insert failed', 'updated' => false, 'inserted' => $ok]);
    exit();
}
?>
