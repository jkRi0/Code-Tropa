<?php
session_start();
header('Content-Type: application/json');

require_once __DIR__ . '/db.php';

$prevDisplayErrors = ini_get('display_errors');
ini_set('display_errors', '0');
error_reporting(E_ERROR | E_PARSE);

$response = [
    'accuracy' => 0,
    'efficiency' => 0,
    'readability' => 0,
    'timeTaken' => 0,
    'success' => 0,
    'failed' => 0,
    'successFlag' => false,
    'message' => 'Unknown error'
];

$userId = $_SESSION['user_id'] ?? ($_SESSION['userData']['USERS']['id'] ?? null);
if ($userId === null) {
    $response['message'] = 'Unauthorized';
    echo json_encode($response);
    ini_set('display_errors', $prevDisplayErrors);
    exit;
}

if (!isset($conn) || !$conn) {
    $response['message'] = 'Database connection not available';
    echo json_encode($response);
    ini_set('display_errors', $prevDisplayErrors);
    exit;
}

// Compute averages directly in SQL
$sql = "SELECT 
            AVG(accuracy)   AS avgAccuracy,
            AVG(efficiency) AS avgEfficiency,
            AVG(readability) AS avgReadability,
            AVG(timeTaken)  AS avgTimeTaken,
            AVG(success)    AS avgSuccess,
            AVG(failed)     AS avgFailed
        FROM performance
        WHERE userId = ?";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param('i', $userId);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            $response['accuracy']    = round(floatval($row['avgAccuracy'] ?? 0), 2);
            $response['efficiency']  = round(floatval($row['avgEfficiency'] ?? 0), 2);
            $response['readability'] = round(floatval($row['avgReadability'] ?? 0), 2);
            $response['timeTaken']   = round(floatval($row['avgTimeTaken'] ?? 0), 2);
            $response['success']     = round(floatval($row['avgSuccess'] ?? 0), 2);
            $response['failed']      = round(floatval($row['avgFailed'] ?? 0), 2);
            $response['successFlag'] = true;
            $response['message']     = 'OK';
        } else {
            $response['message'] = 'No performance data';
        }
    } else {
        $response['message'] = 'Query execution failed';
    }
    $stmt->close();
} else {
    $response['message'] = 'Failed to prepare statement';
}

$conn->close();
echo json_encode($response);
ini_set('display_errors', $prevDisplayErrors);
?>
