<?php
session_start();
header('Content-Type: application/json');

$selectedLanguage = $_SESSION['userData']['USERS']['programmingLanguage'] ?? null;
$badgesForSelectedLanguage = [];

if (isset($_SESSION['userData']['REWARDS']) && $selectedLanguage !== null) {
    foreach ($_SESSION['userData']['REWARDS'] as $rewardEntry) {
        // Now, rewardEntry directly contains 'language' and 'badgeName'
        if (isset($rewardEntry['language']) && $rewardEntry['language'] === $selectedLanguage) {
            $badgesForSelectedLanguage[] = $rewardEntry['badgeName'];
        }
    }
}

echo json_encode(['badges' => $badgesForSelectedLanguage]);

?>

