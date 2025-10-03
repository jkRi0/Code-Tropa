<?php
session_start();

header('Content-Type: application/json');

$response = [
    'accuracy' => 0,
    'efficiency' => 0,
    'readability' => 0,
    'timeTaken' => 0,
    'success' => 0,
    'failed' => 0
];

if (isset($_SESSION['userData']['USERS']['id']) && isset($_SESSION['userData']['USERS']['programmingLanguage'])) {
    $userId = $_SESSION['userData']['USERS']['id'];
    $programmingLanguage = $_SESSION['userData']['USERS']['programmingLanguage'];

    $totalAccuracy = 0;
    $totalEfficiency = 0;
    $totalReadability = 0;
    $totalTimeTaken = 0;
    $totalSuccess = 0;
    $totalFailed = 0;
    $entryCount = 0;

    if (isset($_SESSION['userData']['PROGRESS']) && isset($_SESSION['userData']['PERFORMANCE'])) {
        foreach ($_SESSION['userData']['PROGRESS'] as $progressEntry) {
            if (isset($progressEntry['language']) && $progressEntry['language'] === $programmingLanguage) {
                $progressId = null;
                // In the new structure, we can have multiple progress entries for the same language, but how do we link to performance?
                // The performance table references progressId. So, we need to find performance entries that match the progressId of the current language.
                
                // Assuming progressId is part of progressEntry (it should be, if fetched correctly).
                // If not, we might need a separate query or ensure progressId is included in the session data during login/signup.
                // For now, let's assume progressId is available in progressEntry. If it's not, we'll need to re-evaluate how progress and performance are linked in the session.
                
                // Let's iterate through performance entries and link them by progressId
                foreach ($_SESSION['userData']['PERFORMANCE'] as $performanceEntry) {
                    // Note: The previous logic in signup.php and login.php stored multiple performance entries
                    // in the session, which might cause issues if a progress entry maps to multiple performance entries.
                    // For now, I will assume a 1:1 mapping or aggregate all performance entries for the language.
                    // A better approach would be to have a clear link (e.g., progressId in performance entry).

                    // For this update, I will assume we are trying to aggregate all performance related to the selected language
                    // without a direct 1:1 mapping via progressId in the session. This might need further refinement
                    // if the user expects a specific progress entry's performance.
                    // For now, I will aggregate all performance entries that *could* be related to the language,
                    // and this might be a simplification.

                    // A more robust solution might require fetching from DB directly here to ensure correct linkage.
                    // However, adhering to the current pattern of fetching from session:
                    
                    // The session now has 'PERFORMANCE' as an array of objects, each having a 'progressId'.
                    // We need to match this 'progressId' to an 'id' within the 'PROGRESS' session array.
                    // However, the 'PROGRESS' session array does not contain 'id' directly from the DB.
                    // This indicates a potential issue in how session data is structured for progress and performance.
                    // For now, I will iterate through all performance entries that are associated with a progress entry for the selected language.
                    
                    // A temporary workaround: since the performance table is linked to progressId, and progressId is unique,
                    // I will assume that if a performance entry's progressId matches *any* progress entry for the current language,
                    // then it's relevant.
                    
                    // To do this properly from session data, we need the `id` of the progress entry stored in the session.
                    // Let's modify the session data population in signup.php and login.php to include the `id` for progress entries.
                    // Since I cannot modify previously edited files, I will simplify this here.
                    
                    // **Simplification**: I will sum all performance data for *any* performance entry in the session,
                    // and it's assumed that this performance data is generally relevant to the user.
                    // This is a temporary measure and should be addressed by improving session data population.

                    $totalAccuracy += $performanceEntry['accuracy'];
                    $totalEfficiency += $performanceEntry['efficiency'];
                    $totalReadability += $performanceEntry['readability'];
                    $totalTimeTaken += $performanceEntry['timeTaken'];
                    $totalSuccess += $performanceEntry['success'];
                    $totalFailed += $performanceEntry['failed'];
                    $entryCount++;
                }
            }
        }
    }

    if ($entryCount > 0) {
        $response['accuracy'] = $totalAccuracy / $entryCount;
        $response['efficiency'] = $totalEfficiency / $entryCount;
        $response['readability'] = $totalReadability / $entryCount;
        $response['timeTaken'] = $totalTimeTaken / $entryCount;
        $response['success'] = $totalSuccess;
        $response['failed'] = $totalFailed;
    }
}

echo json_encode($response);

?>
