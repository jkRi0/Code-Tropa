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
    if (isset($_SESSION['userData']['PERFORMANCE'])) {
        $performanceData = $_SESSION['userData']['PERFORMANCE'];

        $response['accuracy'] = ($performanceData['accuracy'][$langIndex] ?? 0);
        $response['efficiency'] = ($performanceData['efficiency'][$langIndex] ?? 0);
        $response['readability'] = ($performanceData['readability'][$langIndex] ?? 0);
        $response['time'] = ($performanceData['time'][$langIndex] ?? 0);
        $response['success'] = ($performanceData['success'][$langIndex] ?? 0);
        $response['failed'] = ($performanceData['failed'][$langIndex] ?? 0);
    }
}

echo json_encode($response);

// mysqli_close($conn); // No longer needed
?>
