<?php
session_start();
header('Content-Type: application/json');

$currentLanguage = $_SESSION['userData']['USERS']['programmingLanguage'] ?? 'java'; // Default to 'java'

echo json_encode(['currentLanguage' => $currentLanguage]);

?>
