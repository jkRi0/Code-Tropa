<?php
session_start();
header('Content-Type: application/json');

require_once __DIR__ . '/db.php';

$prevDisplayErrors = ini_get('display_errors');
ini_set('display_errors', '0');
error_reporting(E_ERROR | E_PARSE);

$response = [
    'success' => false,
    'badges' => [],
    'message' => 'Unknown error'
];

$userId = $_SESSION['user_id'] ?? null;
$selectedLanguage = $_SESSION['userData']['USERS']['programmingLanguage'] ?? null;

if ($userId === null || $selectedLanguage === null) {
    $response['message'] = 'Unauthorized or language not set.';
    echo json_encode($response);
    ini_set('display_errors', $prevDisplayErrors);
    exit;
}

if (!isset($conn) || !$conn) {
    $response['message'] = 'Database connection not available.';
    echo json_encode($response);
    ini_set('display_errors', $prevDisplayErrors);
    exit;
}

// Get all badges from rewards table for this user and language
$sql = "SELECT badgeName FROM rewards WHERE userId = ? AND language = ? ";
if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param('is', $userId, $selectedLanguage);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $badges = [];
        while ($row = $result->fetch_assoc()) {
            $badges[] = $row['badgeName'];
        }
        $response['success'] = true;
        $response['badges'] = $badges; // Includes first row as well
        $response['message'] = 'OK';
    } else {
        $response['message'] = 'Query failed.';
    }
    $stmt->close();
} else {
    $response['message'] = 'Failed to prepare statement.';
}

$conn->close();
echo json_encode($response);
ini_set('display_errors', $prevDisplayErrors);

?>

