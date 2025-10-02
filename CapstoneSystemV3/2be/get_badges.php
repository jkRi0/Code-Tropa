<?php
session_start();
header('Content-Type: application/json');

$selectedLanguage = $_SESSION['userData']['USERS']['programmingLanguage'] ?? null;
$badgesForSelectedLanguage = [];

if (isset($_SESSION['userData']['REWARDS']) && $selectedLanguage !== null) {
    foreach ($_SESSION['userData']['REWARDS'] as $rewardEntry) {
        if (isset($rewardEntry['badges']) && is_array($rewardEntry['badges']) && !empty($rewardEntry['badges'])) {
            // Compare the selected programming language with the first element of the badges array
            if ($rewardEntry['badges'][0] === $selectedLanguage) {
                $badgesForSelectedLanguage = $rewardEntry['badges'];
                break; // Found the badges for the selected language, no need to continue
            }
        }
    }
}

echo json_encode(['badges' => $badgesForSelectedLanguage]);

?>

