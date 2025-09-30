<?php
// protected.php

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
echo json_encode(['status' => 'success', 'message' => 'Access granted', 'user' => $payload['user'], 'pass' => $payload['pass']]);
?>