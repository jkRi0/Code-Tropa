<?php
// Expire the cookie
setcookie('auth_token', '', [
    'path' => '/',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Strict',
]);

echo json_encode(['status' => 'success', 'message' => 'Logged out']);