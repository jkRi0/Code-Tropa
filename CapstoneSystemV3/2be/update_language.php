<?php
session_start();
include 'db.php';

header('Content-Type: application/json');

$response = ['status' => 'error', 'message' => 'An unknown error occurred.'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if session userData and USERS sub-array exist
    if (!isset($_SESSION['userData']['USERS'])) {
        $response = ['status' => 'error', 'message' => 'User session data not found.'];
        echo json_encode($response);
        mysqli_close($conn);
        exit();
    }

    $userId = $_SESSION['userData']['USERS']['id'] ?? null;
    $newLanguage = $_POST['language'] ?? null;


    if ($userId && $newLanguage) {
        // Update the database
        $stmt = $conn->prepare("UPDATE users SET programmingLanguage = ? WHERE id = ?");
        $stmt->bind_param("si", $newLanguage, $userId);

        if ($stmt->execute()) {
            // Update the session data
            $_SESSION['userData']['USERS']['programmingLanguage'] = $newLanguage;
            $response = ['status' => 'success', 'message' => 'Programming language updated successfully.'];
        } else {
            $response = ['status' => 'error', 'message' => 'Database update failed.'];
        }
        $stmt->close();
    } else {
        $response = ['status' => 'error', 'message' => 'User not logged in or language not provided.'];
    }
} else {
    $response = ['status' => 'error', 'message' => 'Invalid request method.'];
}

echo json_encode($response);

mysqli_close($conn);
