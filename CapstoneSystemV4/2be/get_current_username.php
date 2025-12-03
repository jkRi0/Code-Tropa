<?php
require_once __DIR__ . '/db.php';
// require_once __DIR__ . '/auth.php'; // Removed as auth.php no longer provides isLoggedIn function

header('Content-Type: application/json');

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['username'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in.']);
    exit();
}

$response = ['success' => false, 'message' => 'Failed to retrieve username.'];

if (isset($_SESSION['username'])) {
    $response['success'] = true;
    $response['message'] = 'Username retrieved successfully.';
    $response['username'] = $_SESSION['username'];
} else {
    $response['message'] = 'Username not found in session.';
}

echo json_encode($response);
?>
