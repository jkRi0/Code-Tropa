<?php
session_start();
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit();
}

$userId = $_SESSION['user_id'];

// Expect POST: progressId, accuracy, efficiency, readability, timeTaken, success, failed
$progressId = isset($_POST['progressId']) ? intval($_POST['progressId']) : null;
$accuracy = isset($_POST['accuracy']) ? floatval($_POST['accuracy']) : 0;
$efficiency = isset($_POST['efficiency']) ? floatval($_POST['efficiency']) : 0;
$readability = isset($_POST['readability']) ? floatval($_POST['readability']) : 0;
$timeTaken = isset($_POST['timeTaken']) ? floatval($_POST['timeTaken']) : 0;
$success = isset($_POST['success']) ? intval($_POST['success']) : 0;
$failed = isset($_POST['failed']) ? intval($_POST['failed']) : 0;

// Debug logging
error_log("=== PERFORMANCE SAVING DEBUG ===");
error_log("Received progressId: " . $progressId);
error_log("Received accuracy: " . $accuracy);
error_log("Received efficiency: " . $efficiency);
error_log("Received readability: " . $readability);
error_log("Received timeTaken: " . $timeTaken);
error_log("Received success: " . $success);
error_log("Received failed: " . $failed);
error_log("=== END PERFORMANCE DEBUG ===");

if ($progressId === null) {
    echo json_encode(['success' => false, 'message' => 'Missing progressId']);
    exit();
}

// Check if performance record already exists for this progressId
$selectSql = "SELECT id FROM performance WHERE progressId = ? LIMIT 1";
if (!$stmt = $conn->prepare($selectSql)) {
    echo json_encode(['success' => false, 'message' => 'Failed to prepare select']);
    exit();
}
$stmt->bind_param('i', $progressId);
$stmt->execute();
$result = $stmt->get_result();
$existing = $result->fetch_assoc();
$stmt->close();

if ($existing) {
    // Update existing performance record
    $updateSql = "UPDATE performance SET accuracy = ?, efficiency = ?, readability = ?, timeTaken = ?, success = ?, failed = ? WHERE progressId = ?";
    if (!$u = $conn->prepare($updateSql)) {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare update']);
        exit();
    }
    $u->bind_param('ddddiii', $accuracy, $efficiency, $readability, $timeTaken, $success, $failed, $progressId);
    $ok = $u->execute();
    $u->close();
    echo json_encode(['success' => $ok, 'message' => $ok ? 'Performance updated' : 'Update failed']);
} else {
    // Insert new performance record
    $insertSql = "INSERT INTO performance (userId, progressId, accuracy, efficiency, readability, timeTaken, success, failed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    if (!$i = $conn->prepare($insertSql)) {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare insert']);
        exit();
    }
    $i->bind_param('iiddddii', $userId, $progressId, $accuracy, $efficiency, $readability, $timeTaken, $success, $failed);
    $ok = $i->execute();
    $i->close();
    echo json_encode(['success' => $ok, 'message' => $ok ? 'Performance inserted' : 'Insert failed']);
}
?>
