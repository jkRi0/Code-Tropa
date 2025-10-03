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
$stmt_rewards = $conn->prepare("SELECT tier, badges FROM rewards WHERE userId = ?");
if ($stmt_rewards) {
    $stmt_rewards->bind_param("i", $userId);
    $stmt_rewards->execute();
    $result_rewards = $stmt_rewards->get_result();

    while ($row_rewards = $result_rewards->fetch_assoc()) {
        $decodedBadges = json_decode($row_rewards['badges']);
        if (is_array($decodedBadges) && !empty($decodedBadges) && $decodedBadges[0] === $programmingLanguage) {
            $decodedTier = json_decode($row_rewards['tier']);
            if (is_array($decodedTier) && !empty($decodedTier) && !empty($decodedTier[0])) {
                $tier = $decodedTier[0];
                break; // Found the tier for the selected language, no need to continue
            }
        }
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
