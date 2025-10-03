<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$response = ['success' => false, 'message' => 'Failed to retrieve profile data.'];

if (!isset($_SESSION['username'])) {
    $response['message'] = 'Not logged in.';
    echo json_encode($response);
    exit();
}

$username = $_SESSION['username'];
$userId = $_SESSION['user_id'];
$totalPoints = 0;
$tier = 'N/A';

// Fetch total points from the 'progress' table
$stmt_progress = $conn->prepare("SELECT storymode, challenges FROM progress WHERE userId = ?");
if ($stmt_progress) {
    $stmt_progress->bind_param("i", $userId);
    $stmt_progress->execute();
    $result_progress = $stmt_progress->get_result();

    if ($row_progress = $result_progress->fetch_assoc()) {
        $decodedStorymode = json_decode($row_progress['storymode']);
        $decodedChallenges = json_decode($row_progress['challenges']);

        $storymodePoints = 0;
        if (is_array($decodedStorymode) && count($decodedStorymode) >= 3) {
            $storymodePoints = array_sum(array_slice($decodedStorymode, 0, 3));
        }

        $challengePoints = 0;
        if (is_array($decodedChallenges) && count($decodedChallenges) >= 3) {
            $challengePoints = array_sum(array_slice($decodedChallenges, 0, 3));
        }

        $totalPoints = $storymodePoints + $challengePoints;
    }
    $stmt_progress->close();
}

// Fetch tier from the 'rewards' table
$stmt_rewards = $conn->prepare("SELECT tier FROM rewards WHERE userId = ?");
if ($stmt_rewards) {
    $stmt_rewards->bind_param("i", $userId);
    $stmt_rewards->execute();
    $result_rewards = $stmt_rewards->get_result();

    if ($row_rewards = $result_rewards->fetch_assoc()) {
        $decodedTier = json_decode($row_rewards['tier']);
        if (is_array($decodedTier) && !empty($decodedTier) && !empty($decodedTier[0])) {
            $tier = $decodedTier[0];
        }
    }
    $stmt_rewards->close();
}

if ($username) {
    $response['success'] = true;
    $response['message'] = 'Profile data retrieved successfully.';
    $response['username'] = $username;
    $response['totalPoints'] = $totalPoints;
    $response['tier'] = $tier;
} else {
    $response['message'] = 'Username not found in session or database.';
}

echo json_encode($response);

$conn->close();
?>
