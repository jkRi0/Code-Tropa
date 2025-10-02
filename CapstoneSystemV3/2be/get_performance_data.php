<?php
session_start();
// include 'db.php'; // No longer needed as we are not querying the DB

header('Content-Type: application/json');

$response = [
    'accuracy' => 0,
    'efficiency' => 0,
    'readability' => 0,
    'time' => 0,
    'success' => 0,
    'failed' => 0
];

if (isset($_SESSION['userData']['USERS']['id']) && isset($_SESSION['userData']['USERS']['programmingLanguage'])) {
    $userId = $_SESSION['userData']['USERS']['id'];
    $programmingLanguage = $_SESSION['userData']['USERS']['programmingLanguage'];

    // Determine the index based on programming language
    $langIndex = 0; // Default to Java
    if ($programmingLanguage === 'c++') {
        $langIndex = 1;
    } elseif ($programmingLanguage === 'c#') {
        $langIndex = 2;
    }

    // Retrieve data directly from session
    if (isset($_SESSION['userData']['PERFORMANCE']) && isset($_SESSION['userData']['PERFORMANCE'][0])) {
        $performanceDataMain = $_SESSION['userData']['PERFORMANCE'][0];

        $response['accuracy'] = (isset($performanceDataMain['accuracy'][$langIndex]) ? (float) $performanceDataMain['accuracy'][$langIndex] : 0);
        $response['efficiency'] = (isset($performanceDataMain['efficiency'][$langIndex]) ? (float) $performanceDataMain['efficiency'][$langIndex] : 0);
        $response['readability'] = (isset($performanceDataMain['readability'][$langIndex]) ? (float) $performanceDataMain['readability'][$langIndex] : 0);
        $response['time'] = (isset($performanceDataMain['time'][$langIndex]) ? (float) $performanceDataMain['time'][$langIndex] : 0);
        $response['success'] = (isset($performanceDataMain['success'][$langIndex]) ? (float) $performanceDataMain['success'][$langIndex] : 0);
        $response['failed'] = (isset($performanceDataMain['failed'][$langIndex]) ? (float) $performanceDataMain['failed'][$langIndex] : 0);
    }
}

echo json_encode($response);

// mysqli_close($conn); // No longer needed
?>
