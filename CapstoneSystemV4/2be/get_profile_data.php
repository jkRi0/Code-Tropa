<?php
session_start();
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');

$response = ['success' => false, 'message' => 'Failed to retrieve profile data.'];

if (!isset($_SESSION['username'])) {
    $response['message'] = 'Not logged in.';
    echo json_encode($response);
    exit();
}

$username = $_SESSION['username'];
$userId = $_SESSION['user_id'];
$programmingLanguage = $_SESSION['userData']['USERS']['programmingLanguage'] ?? 'java'; // Default to 'java' if not set
$totalPoints = 0;
$tier = 'N/A';

// Fetch total points from the 'progress' table
$stmt_progress = $conn->prepare("SELECT SUM(points) AS totalPoints FROM progress WHERE userId = ? AND language = ?");
if ($stmt_progress) {
    $stmt_progress->bind_param("is", $userId, $programmingLanguage);
    $stmt_progress->execute();
    $result_progress = $stmt_progress->get_result();

    if ($row_progress = $result_progress->fetch_assoc()) {
        $totalPoints = $row_progress['totalPoints'] ?? 0;
    }
    $stmt_progress->close();
}

// Fetch tier from the 'rewards' table
// Assuming we want the highest tier achieved for the selected language
$stmt_rewards = $conn->prepare("SELECT tier FROM rewards WHERE userId = ? AND language = ? ORDER BY tier DESC LIMIT 1");
if ($stmt_rewards) {
    $stmt_rewards->bind_param("is", $userId, $programmingLanguage);
    $stmt_rewards->execute();
    $result_rewards = $stmt_rewards->get_result();

    if ($row_rewards = $result_rewards->fetch_assoc()) {
        $tier = $row_rewards['tier'];
    }
    $stmt_rewards->close();
}

$displayTier = 'N/A';
$tierClass = '';

switch ($tier) {
    case 't1':
        $displayTier = 'Tier 1: Syntax Novice';
        $tierClass = 'tier-color-low';
        break;
    case 't2':
        $displayTier = 'Tier 2: Data Handler';
        $tierClass = 'tier-color-low';
        break;
    case 't3':
        $displayTier = 'Tier 3: Algorithm Apprentice'; // Assuming a default name for t3
        $tierClass = 'tier-color-low';
        break;
    case 't4':
        $displayTier = 'Tier 4: Logic Controller';
        $tierClass = 'tier-color-low';
        break;
    case 't5':
        $displayTier = 'Tier 5: Data Manipulator';
        $tierClass = 'tier-color-low';
        break;
    case 't6':
        $displayTier = 'Tier 6: Function Master';
        $tierClass = 'tier-color-low';
        break;
    case 't7':
        $displayTier = 'Tier 7: Logic Legend';
        $tierClass = 'tier-color-high';
        break;
    case 't8':
        $displayTier = 'Tier 8: Syntax Sage';
        $tierClass = 'tier-color-high';
        break;
    case 't9':
        $displayTier = 'Tier 9: Code Virtuoso';
        $tierClass = 'tier-color-high';
        break;
    case 't10':
        $displayTier = 'Tier 10: Code-Tropa Champion';
        $tierClass = 'tier-color-high';
        break;
    default:
        $displayTier = 'N/A';
        $tierClass = '';
        break;
}

if ($tierClass !== '') {
    $displayTier = '<span class="' . $tierClass . '">' . $displayTier . '</span>';
}

if ($username) {
    $response['success'] = true;
    $response['message'] = 'Profile data retrieved successfully.';
    $response['username'] = $username;
    $response['totalPoints'] = $totalPoints;
    $response['tier'] = $displayTier;
} else {
    $response['message'] = 'Username not found in session or database.';
}

echo json_encode($response);

$conn->close();
?>
