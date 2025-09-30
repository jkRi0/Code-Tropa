<?php
// logout.php

// Expire the cookie
setcookie('auth_token', '', [
    'expires' => time() - 3600,
    'path' => '/',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Strict',
]);

echo json_encode(['status' => 'success', 'message' => 'Logged out']);
?>