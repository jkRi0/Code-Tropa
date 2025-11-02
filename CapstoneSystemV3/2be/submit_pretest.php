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

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate input
if (!isset($data['language']) || !isset($data['answers']) || !isset($data['score'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing required data'
    ]);
    exit;
}

$language = strtolower(trim($data['language']));
$answers = json_encode($data['answers']);
$score = intval($data['score']);
$totalQuestions = intval($data['totalQuestions']);
$correctAnswers = intval($data['correctAnswers']);

// Validate language
$allowedLanguages = ['java', 'c++', 'c#'];
if (!in_array($language, $allowedLanguages)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid programming language'
    ]);
    exit;
}

try {
    $conn->begin_transaction();
    
    // Insert assessment result
    $stmt = $conn->prepare("INSERT INTO assessments (user_id, test_type, language, answers, score, total_questions, correct_answers) VALUES (?, 'pretest', ?, ?, ?, ?, ?)");
    $stmt->bind_param("issiii", $user_id, $language, $answers, $score, $totalQuestions, $correctAnswers);
    
    if (!$stmt->execute()) {
        throw new Exception("Failed to save assessment");
    }
    
    $stmt->close();
    
    // Optional user update only if columns exist
    $colsRs = $conn->query("SHOW COLUMNS FROM users LIKE 'has_taken_pretest'");
    if ($colsRs && $colsRs->num_rows) {
        $stmt = $conn->prepare("UPDATE users SET has_taken_pretest = 1, pretest_language = ? WHERE id = ?");
        $stmt->bind_param("si", $language, $user_id);
        if (!$stmt->execute()) {
            throw new Exception("Failed to update user status");
        }
        $stmt->close();
    }
    
    $conn->commit();
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Pre-test submitted successfully',
        'score' => $score,
        'correctAnswers' => $correctAnswers,
        'totalQuestions' => $totalQuestions
    ]);
    
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to submit pre-test: ' . $e->getMessage()
    ]);
}

$conn->close();
?>


