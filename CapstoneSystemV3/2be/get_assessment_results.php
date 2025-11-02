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
    // Get current selected language or pretest language
    $stmt = $conn->prepare("SELECT selected_language, pretest_language FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $userData = $result->fetch_assoc();
    $language = $userData['selected_language'] ?? $userData['pretest_language'];
    $stmt->close();
    
    if (!$language) {
        echo json_encode([
            'status' => 'error',
            'message' => 'No language selected'
        ]);
        exit;
    }
    
    // Get pre-test result
    $stmt = $conn->prepare("SELECT * FROM assessments WHERE user_id = ? AND test_type = 'pretest' AND language = ? ORDER BY completed_at DESC LIMIT 1");
    $stmt->bind_param("is", $user_id, $language);
    $stmt->execute();
    $result = $stmt->get_result();
    $pretest = $result->num_rows > 0 ? $result->fetch_assoc() : null;
    $stmt->close();
    
    // Get post-test result
    $stmt = $conn->prepare("SELECT * FROM assessments WHERE user_id = ? AND test_type = 'posttest' AND language = ? ORDER BY completed_at DESC LIMIT 1");
    $stmt->bind_param("is", $user_id, $language);
    $stmt->execute();
    $result = $stmt->get_result();
    $posttest = $result->num_rows > 0 ? $result->fetch_assoc() : null;
    $stmt->close();
    
    // Format the results
    $response = [
        'status' => 'success',
        'language' => $language,
        'pretest' => null,
        'posttest' => null
    ];
    
    if ($pretest) {
        $response['pretest'] = [
            'score' => intval($pretest['score']),
            'correct_answers' => intval($pretest['correct_answers']),
            'total_questions' => intval($pretest['total_questions']),
            'completed_at' => $pretest['completed_at'],
            'language' => $pretest['language']
        ];
    }
    
    if ($posttest) {
        $response['posttest'] = [
            'score' => intval($posttest['score']),
            'correct_answers' => intval($posttest['correct_answers']),
            'total_questions' => intval($posttest['total_questions']),
            'completed_at' => $posttest['completed_at'],
            'language' => $posttest['language']
        ];
    }
    
    echo json_encode($response);
    
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}

$conn->close();
?>





