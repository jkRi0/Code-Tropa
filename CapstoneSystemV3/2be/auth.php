<?php
// protected.php

include 'db.php'; // Include the database connection

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if token cookie exists
if (!isset($_COOKIE['auth_token'])) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    // echo "<script>window.location.href='../1fe/homepage/entry.html'; </script>";
    exit;
}

$token = $_COOKIE['auth_token'];


// Decode and validate token (for demo, decode base64, check expiry)
$payloadJson = base64_decode($token);
$payload = json_decode($payloadJson, true);

if (!$payload || !isset($payload['exp']) || $payload['exp'] < time()) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Token expired or invalid']);
    exit;
}

// Token valid - user is authenticated
header('Content-Type: application/json');

// Fetch user data from the database using the user_id from the token
$userID = $payload['id'];

$userData = [];

// Fetch user details
$stmtUser = mysqli_prepare($conn, "SELECT username, programmingLanguage FROM users WHERE id = ?");
mysqli_stmt_bind_param($stmtUser, "i", $userID);
mysqli_stmt_execute($stmtUser);
mysqli_stmt_bind_result($stmtUser, $username, $programmingLanguage);
mysqli_stmt_fetch($stmtUser);
$userData['USERS'] = [
    'id' => $userID,
    'username' => $username,
    'programmingLanguage' => $programmingLanguage,
];
mysqli_stmt_close($stmtUser);

// Fetch rewards
$userData['REWARDS'] = [];
$stmtRewards = mysqli_prepare($conn, "SELECT language, tier, badgeName FROM rewards WHERE userId = ?");
mysqli_stmt_bind_param($stmtRewards, "i", $userID);
mysqli_stmt_execute($stmtRewards);
mysqli_stmt_bind_result($stmtRewards, $language, $tier, $badgeName);
while (mysqli_stmt_fetch($stmtRewards)) {
    $userData['REWARDS'][] = [
        'language' => $language,
        'tier' => $tier,
        'badgeName' => $badgeName,
    ];
}
mysqli_stmt_close($stmtRewards);

// Fetch saving
$userData['SAVING'] = [];
$stmtSaving = mysqli_prepare($conn, "SELECT language, chapter, episode, scene FROM saving WHERE userId = ?");
mysqli_stmt_bind_param($stmtSaving, "i", $userID);
mysqli_stmt_execute($stmtSaving);
mysqli_stmt_bind_result($stmtSaving, $language, $chapter, $episode, $scene);
while (mysqli_stmt_fetch($stmtSaving)) {
    $userData['SAVING'][] = [
        'language' => $language,
        'chapter' => $chapter,
        'episode' => $episode,
        'scene' => $scene,
    ];
}
mysqli_stmt_close($stmtSaving);

// Fetch progress
$userData['PROGRESS'] = [];
$stmtProgress = mysqli_prepare($conn, "SELECT type, language, chapter, episode, difficulty, level, points, code FROM progress WHERE userId = ?");
mysqli_stmt_bind_param($stmtProgress, "i", $userID);
mysqli_stmt_execute($stmtProgress);
mysqli_stmt_bind_result($stmtProgress, $type, $language, $chapter, $episode, $difficulty, $level, $points, $code);
while (mysqli_stmt_fetch($stmtProgress)) {
    $userData['PROGRESS'][] = [
        'type' => $type,
        'language' => $language,
        'chapter' => $chapter,
        'episode' => $episode,
        'difficulty' => $difficulty,
        'level' => $level,
        'points' => $points,
        'code' => $code,
    ];
}
mysqli_stmt_close($stmtProgress);

// Fetch performance
$userData['PERFORMANCE'] = [];
$stmtPerformance = mysqli_prepare($conn, "SELECT progressId, accuracy, efficiency, readability, timeTaken, success, failed FROM performance WHERE userId = ?");
mysqli_stmt_bind_param($stmtPerformance, "i", $userID);
mysqli_stmt_execute($stmtPerformance);
mysqli_stmt_bind_result($stmtPerformance, $progressId, $accuracy, $efficiency, $readability, $timeTaken, $success, $failed);
while (mysqli_stmt_fetch($stmtPerformance)) {
    $userData['PERFORMANCE'][] = [
        'progressId' => $progressId,
        'accuracy' => $accuracy,
        'efficiency' => $efficiency,
        'readability' => $readability,
        'timeTaken' => $timeTaken,
        'success' => $success,
        'failed' => $failed,
    ];
}
mysqli_stmt_close($stmtPerformance);

$_SESSION['userData'] = $userData; // Store all user data in session
$_SESSION['user_id'] = $userID;
$_SESSION['username'] = $username;

echo json_encode(['status' => 'success', 'message' => 'Access granted', 'user' => $username]);
?>