<?php
session_start();
header('Content-Type: application/json');

// Include database connection
require_once 'db.php';

// Check if user is logged in (optional - you might want admin check here)
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'User not logged in'
    ]);
    exit;
}

try {
    // Get all users first
    $usersSql = "SELECT id, username, programmingLanguage FROM users ORDER BY username ASC";
    $usersResult = $conn->query($usersSql);
    $players = [];
    
    while ($userRow = $usersResult->fetch_assoc()) {
        $userId = intval($userRow['id']);
        $player = [
            'id' => $userId,
            'username' => $userRow['username'],
            'programmingLanguage' => $userRow['programmingLanguage'],
            'pretests' => [],  // Array of all pre-tests
            'posttests' => []  // Array of all post-tests
        ];
        
        // Get all pre-test results for this user (latest per language)
        $pretestSql = "
            SELECT a1.*
            FROM assessments a1
            INNER JOIN (
                SELECT user_id, language, MAX(completed_at) as max_date
                FROM assessments
                WHERE user_id = ? AND test_type = 'pretest'
                GROUP BY user_id, language
            ) a2 ON a1.user_id = a2.user_id 
                 AND a1.language = a2.language 
                 AND a1.completed_at = a2.max_date
                 AND a1.test_type = 'pretest'
            ORDER BY a1.language ASC
        ";
        $pretestStmt = $conn->prepare($pretestSql);
        $pretestStmt->bind_param("i", $userId);
        $pretestStmt->execute();
        $pretestResult = $pretestStmt->get_result();
        
        while ($ptRow = $pretestResult->fetch_assoc()) {
            $player['pretests'][] = [
                'score' => intval($ptRow['score']),
                'correct' => intval($ptRow['correct_answers']),
                'total' => intval($ptRow['total_questions']),
                'language' => $ptRow['language'],
                'answers' => json_decode($ptRow['answers'], true),
                'completed_at' => $ptRow['completed_at']
            ];
        }
        $pretestStmt->close();
        
        // Get all post-test results for this user (latest per language)
        $posttestSql = "
            SELECT a1.*
            FROM assessments a1
            INNER JOIN (
                SELECT user_id, language, MAX(completed_at) as max_date
                FROM assessments
                WHERE user_id = ? AND test_type = 'posttest'
                GROUP BY user_id, language
            ) a2 ON a1.user_id = a2.user_id 
                 AND a1.language = a2.language 
                 AND a1.completed_at = a2.max_date
                 AND a1.test_type = 'posttest'
            ORDER BY a1.language ASC
        ";
        $posttestStmt = $conn->prepare($posttestSql);
        $posttestStmt->bind_param("i", $userId);
        $posttestStmt->execute();
        $posttestResult = $posttestStmt->get_result();
        
        while ($pstRow = $posttestResult->fetch_assoc()) {
            $player['posttests'][] = [
                'score' => intval($pstRow['score']),
                'correct' => intval($pstRow['correct_answers']),
                'total' => intval($pstRow['total_questions']),
                'language' => $pstRow['language'],
                'answers' => json_decode($pstRow['answers'], true),
                'completed_at' => $pstRow['completed_at']
            ];
        }
        $posttestStmt->close();
        
        $players[] = $player;
    }
    
    echo json_encode([
        'status' => 'success',
        'players' => $players,
        'total' => count($players)
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}

$conn->close();
?>

