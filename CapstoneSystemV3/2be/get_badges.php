<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['userData']['REWARDS']['badges'])) {
    echo json_encode(['badges' => $_SESSION['userData']['REWARDS']['badges']]);
} else {
    echo json_encode(['badges' => []]);
}
?>

