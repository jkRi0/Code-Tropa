<?php
// login.php

// Example: Get username/password from POST
$username = $_POST['username'] ?? 'userAckk123';
$password = $_POST['password'] ?? 'pass123';

// Dummy check (replace with your DB validation)
if ($username === 'userAckk123' && $password === 'pass123') {
    // Generate token (example: simple JWT-like token, use real JWT lib in production)
    $tokenPayload = [
        'user' => $username,
        'pass' => $password,
        'exp' => time() + 3600, // 1 hour expiration
    ];
    $token = base64_encode(json_encode($tokenPayload)); // Simplified token, for demo only!

    // Set token cookie with HttpOnly, Secure, SameSite flags
    setcookie('auth_token', $token, [
        'expires' => time() + 3600,      // 1 hour
        'path' => '/',                   // available site-wide
        'secure' => true,                // send only over HTTPS
        'httponly' => true,              // JS cannot access
        'samesite' => 'Strict',          // protect against CSRF
    ]);

    // Respond success (JSON)
    header('Content-Type: application/json');
    echo json_encode(['status' => 'success', 'message' => 'Logged in']);
} else {
    // Invalid login
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
}
?>