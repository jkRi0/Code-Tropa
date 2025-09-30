<?php
session_start();
$_SESSION['user'] = 'Alice';

// Output session data as JSON
header('Content-Type: application/json');
echo json_encode([
    'user' => $_SESSION['user'] ?? null
]);
?>