<?php
session_start();
header('Content-Type: application/json');
require_once 'db.php';
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error','message' => 'User not logged in']); exit;
}
$user_id = $_SESSION['user_id'];
$input = file_get_contents('php://input');
$data = json_decode($input, true);
if (!isset($data['language']) || !isset($data['answers']) || !isset($data['score'])) {
    echo json_encode(['status' => 'error','message' => 'Missing required data']); exit;
}
$language = strtolower(trim($data['language']));
$answers = json_encode($data['answers']);
$score = intval($data['score']);
$totalQuestions = intval($data['totalQuestions']);
$correctAnswers = intval($data['correctAnswers']);
$allowedLanguages = ['java', 'c++', 'c#'];
if (!in_array($language, $allowedLanguages)) {
    echo json_encode(['status' => 'error','message' => 'Invalid programming language']); exit;
}
try {
    // Count completed story episodes (points >= 80 for episode completion)
    $stmt = $conn->prepare("SELECT COUNT(*) as completed FROM progress WHERE userId = ? AND language = ? AND type = 'story' AND points >= 80");
    $stmt->bind_param("is", $user_id, $language);
    $stmt->execute(); $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $completedEpisodes = $row ? intval($row['completed']) : 0;
    $stmt->close();
    $totalEpisodes = 7;
    if ($completedEpisodes < $totalEpisodes) {
        echo json_encode([
            'status' => 'error',
            'message' => 'You must complete all story mode episodes before taking the post-test',
            'completedEpisodes' => $completedEpisodes,
            'totalEpisodes' => $totalEpisodes
        ]); exit;
    }
    $conn->begin_transaction();
    $stmt = $conn->prepare("INSERT INTO assessments (user_id, test_type, language, answers, score, total_questions, correct_answers) VALUES (?, 'posttest', ?, ?, ?, ?, ?)");
    $stmt->bind_param("issiii", $user_id, $language, $answers, $score, $totalQuestions, $correctAnswers);
    if (!$stmt->execute()) throw new Exception("Failed to save assessment");
    $stmt->close();
    $conn->commit();
    echo json_encode([
        'status' => 'success',
        'message' => 'Post-test submitted successfully',
        'score' => $score,
        'correctAnswers' => $correctAnswers,
        'totalQuestions' => $totalQuestions
    ]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['status' => 'error','message' => 'Failed to submit post-test: ' . $e->getMessage()]);
}
$conn->close();
?>


