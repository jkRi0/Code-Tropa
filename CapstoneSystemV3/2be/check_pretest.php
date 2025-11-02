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
    // Check if user has taken pre-test by querying assessments table
    $stmt = $conn->prepare("SELECT language FROM assessments WHERE user_id = ? AND test_type = 'pretest' ORDER BY completed_at DESC LIMIT 1");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $pretestLanguage = $row['language'];
        
        echo json_encode([
            'status' => 'success',
            'hasTakenPretest' => true,
            'language' => $pretestLanguage
        ]);
    } else {
        // User hasn't taken pre-test yet
        echo json_encode([
            'status' => 'success',
            'hasTakenPretest' => false,
            'language' => null
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





