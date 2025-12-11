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

// Fetch only essential user data for session storage
$userData = [];

// Fetch user details (only essential data)
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

// Note: REWARDS, SAVING, PROGRESS, and PERFORMANCE are fetched on-demand when needed
// This reduces initial session load time

$_SESSION['userData'] = $userData; // Store essential user data in session
$_SESSION['user_id'] = $userID;
$_SESSION['username'] = $username;

echo json_encode(['status' => 'success', 'message' => 'Access granted', 'user' => $username]);
?>