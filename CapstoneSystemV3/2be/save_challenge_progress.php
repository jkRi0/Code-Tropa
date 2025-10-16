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

// Expect POST: difficulty (easy|medium|hard), level (int), points (int), code (text)
$difficulty = isset($_POST['difficulty']) ? strtolower(trim($_POST['difficulty'])) : null;
$level = isset($_POST['level']) ? intval($_POST['level']) : null;
$points = isset($_POST['points']) ? intval($_POST['points']) : null;
$code = isset($_POST['code']) ? $_POST['code'] : '';

if (!$difficulty || !$level || $points === null) {
    echo json_encode(['success' => false, 'message' => 'Missing parameters']);
    exit();
}

// Validate difficulty
$validDifficulties = ['easy', 'medium', 'hard'];
if (!in_array($difficulty, $validDifficulties, true)) {
    echo json_encode(['success' => false, 'message' => 'Invalid difficulty']);
    exit();
}

// Check existing progress for this user/language/difficulty/level
$selectSql = "SELECT id, points FROM progress WHERE userId = ? AND type = 'challenge' AND language = ? AND difficulty = ? AND level = ? LIMIT 1";
if (!$stmt = $conn->prepare($selectSql)) {
    echo json_encode(['success' => false, 'message' => 'Failed to prepare select']);
    exit();
}
$stmt->bind_param('issi', $userId, $language, $difficulty, $level);
$stmt->execute();
$result = $stmt->get_result();
$existing = $result->fetch_assoc();
$stmt->close();

if ($existing) {
    // Update only if new points are higher
    if (intval($existing['points']) < $points) {
        $updateSql = "UPDATE progress SET points = ?, code = ? WHERE id = ?";
        if (!$u = $conn->prepare($updateSql)) {
            echo json_encode(['success' => false, 'message' => 'Failed to prepare update']);
            exit();
        }
        $u->bind_param('isi', $points, $code, $existing['id']);
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
    $insertSql = "INSERT INTO progress (userId, type, language, difficulty, level, points, code) VALUES (?, 'challenge', ?, ?, ?, ?, ?)";
    if (!$i = $conn->prepare($insertSql)) {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare insert']);
        exit();
    }
    $i->bind_param('issiis', $userId, $language, $difficulty, $level, $points, $code);
    $ok = $i->execute();
    $i->close();
    echo json_encode(['success' => $ok, 'message' => $ok ? 'Progress inserted' : 'Insert failed', 'updated' => false, 'inserted' => $ok]);
    exit();
}
?>


