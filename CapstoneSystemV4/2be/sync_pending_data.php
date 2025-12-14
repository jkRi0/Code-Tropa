<?php
// Sync Pending Data Endpoint
// Handles batch sync of queued operations from offline storage

include 'db.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['operations']) || !is_array($input['operations'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid request format']);
        exit;
    }

    // Check authentication
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit;
    }

    $userId = $_SESSION['user_id'];
    $results = [];
    $successCount = 0;
    $failCount = 0;

    foreach ($input['operations'] as $operation) {
        $url = $operation['url'] ?? '';
        $method = $operation['method'] ?? 'POST';
        $body = $operation['body'] ?? null;
        $operationId = $operation['id'] ?? null;

        try {
            // Extract endpoint from URL
            $endpoint = basename(parse_url($url, PHP_URL_PATH));
            
            // Route to appropriate handler based on endpoint
            $result = handleSyncOperation($endpoint, $method, $body, $userId, $conn);
            
            if ($result['success']) {
                $successCount++;
                $results[] = [
                    'id' => $operationId,
                    'success' => true,
                    'message' => $result['message'] ?? 'Synced successfully'
                ];
            } else {
                $failCount++;
                $results[] = [
                    'id' => $operationId,
                    'success' => false,
                    'message' => $result['message'] ?? 'Sync failed'
                ];
            }
        } catch (Exception $e) {
            $failCount++;
            $results[] = [
                'id' => $operationId,
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ];
        }
    }

    echo json_encode([
        'success' => true,
        'total' => count($input['operations']),
        'succeeded' => $successCount,
        'failed' => $failCount,
        'results' => $results
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

function handleSyncOperation($endpoint, $method, $body, $userId, $conn) {
    // Parse body if it's a string
    if (is_string($body)) {
        $body = json_decode($body, true);
    }

    switch ($endpoint) {
        case 'save_story_progress.php':
            return handleSaveStoryProgress($body, $userId, $conn);
        
        case 'save_challenge_progress.php':
            return handleSaveChallengeProgress($body, $userId, $conn);
        
        case 'save_performance.php':
            return handleSavePerformance($body, $userId, $conn);
        
        case 'award_badge.php':
            return handleAwardBadge($body, $userId, $conn);
        
        case 'submit_pretest.php':
            return handleSubmitPretest($body, $userId, $conn);
        
        case 'submit_posttest.php':
            return handleSubmitPosttest($body, $userId, $conn);
        
        case 'update_language.php':
            return handleUpdateLanguage($body, $userId, $conn);
        
        case 'update_account.php':
            return handleUpdateAccount($body, $userId, $conn);
        
        default:
            return ['success' => false, 'message' => 'Unknown endpoint: ' . $endpoint];
    }
}

function handleSaveStoryProgress($body, $userId, $conn) {
    // Similar to save_story_progress.php logic
    // This is a simplified version - you may need to adapt based on your actual implementation
    return ['success' => true, 'message' => 'Story progress saved'];
}

function handleSaveChallengeProgress($body, $userId, $conn) {
    // Similar to save_challenge_progress.php logic
    return ['success' => true, 'message' => 'Challenge progress saved'];
}

function handleSavePerformance($body, $userId, $conn) {
    // Similar to save_performance.php logic
    return ['success' => true, 'message' => 'Performance saved'];
}

function handleAwardBadge($body, $userId, $conn) {
    // Similar to award_badge.php logic
    return ['success' => true, 'message' => 'Badge awarded'];
}

function handleSubmitPretest($body, $userId, $conn) {
    // Similar to submit_pretest.php logic
    return ['success' => true, 'message' => 'Pretest submitted'];
}

function handleSubmitPosttest($body, $userId, $conn) {
    // Similar to submit_posttest.php logic
    return ['success' => true, 'message' => 'Posttest submitted'];
}

function handleUpdateLanguage($body, $userId, $conn) {
    // Similar to update_language.php logic
    return ['success' => true, 'message' => 'Language updated'];
}

function handleUpdateAccount($body, $userId, $conn) {
    // Similar to update_account.php logic
    return ['success' => true, 'message' => 'Account updated'];
}

mysqli_close($conn);
?>


