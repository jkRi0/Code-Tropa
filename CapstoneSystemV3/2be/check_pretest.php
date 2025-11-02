<?php
session_start();
header('Content-Type: application/json');

// Include database connection
require_once 'db.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'User not logged in'
    ]);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    // Check if user has taken pre-test
    $stmt = $conn->prepare("SELECT has_taken_pretest, pretest_language FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $hasTakenPretest = (bool)$row['has_taken_pretest'];
        $pretestLanguage = $row['pretest_language'];
        
        echo json_encode([
            'status' => 'success',
            'hasTakenPretest' => $hasTakenPretest,
            'language' => $pretestLanguage
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'User not found'
        ]);
    }
    
    $stmt->close();
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}

$conn->close();
?>





