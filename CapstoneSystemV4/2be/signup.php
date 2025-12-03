<?php

// Database connection
include 'db.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hid1 = $_POST['hid1'] ?? '';
    $hid2 = $_POST['hid2'] ?? '';
    $programmingLanguage = $_POST['programmingLanguage'] ?? 'java'; // Default to 'java' if not provided
    
    // Check if the username already exists
    $checkStmt = mysqli_prepare($conn, "SELECT COUNT(*) FROM users WHERE username = ?");
    mysqli_stmt_bind_param($checkStmt, "s", $hid1);
    mysqli_stmt_execute($checkStmt);
    mysqli_stmt_bind_result($checkStmt, $count);
    mysqli_stmt_fetch($checkStmt);
    mysqli_stmt_close($checkStmt);

    if ($count > 0) {
        // Username already exists
        echo "<script>alert('Username already exists. Please choose another one.'); window.location.href='../1fe/signup/';</script>";
    } else {
        // Prepare the comment to prevent SQL injection
        $hid1 = mysqli_real_escape_string($conn, $hid1);
        $hid2 = mysqli_real_escape_string($conn, $hid2);
        
        
        $hid2_2 = password_hash($hid2, PASSWORD_DEFAULT);

        $stmt = mysqli_prepare(
            $conn, "INSERT INTO users (username, password, created_at, programmingLanguage) VALUES (?, ?, NOW(), ?)"
        );
        mysqli_stmt_bind_param($stmt, "sss", $hid1, $hid2_2, $programmingLanguage);

        if (mysqli_stmt_execute($stmt)) {
            // Get the ID of the newly inserted user
            $newUserId = mysqli_insert_id($conn);

            // Insert default values into rewards table
            $languages = ['java', 'c++', 'c#'];
            
            // // Default reward values
            // $defaultTier = 't1';
            // $defaultBadgeName = 'b1';

            // // Insert a default reward for the user's chosen programming language
            // $stmtRewards = mysqli_prepare($conn, "INSERT INTO rewards (userId, language, tier, badgeName) VALUES (?, ?, ?, ?)");
            // mysqli_stmt_bind_param($stmtRewards, "isss", $newUserId, $programmingLanguage, $defaultTier, $defaultBadgeName);
            // mysqli_stmt_execute($stmtRewards);
            // mysqli_stmt_close($stmtRewards);

            // SAVING table insertion (only for the chosen language)
            $stmtSaving = mysqli_prepare($conn, "INSERT INTO saving (userId, language, chapter, episode, scene) VALUES (?, ?, ?, ?, ?)");
            $defaultChapter = 0;
            $defaultEpisode = 0;
            $defaultScene = 0;
            mysqli_stmt_bind_param($stmtSaving, "isiii", $newUserId, $programmingLanguage, $defaultChapter, $defaultEpisode, $defaultScene);
            mysqli_stmt_execute($stmtSaving);
            mysqli_stmt_close($stmtSaving);

            // PROGRESS table insertion for story mode
            $stmtProgressStorymode = mysqli_prepare($conn, "INSERT INTO progress (userId, type, language, chapter, episode, points, code) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $progressTypeStory = 'story';
            $defaultChapterStory = 0;
            $defaultEpisodeStory = 0;
            $defaultPoints = 0;
            $defaultCode = '';
            mysqli_stmt_bind_param($stmtProgressStorymode, "issiiis", $newUserId, $progressTypeStory, $programmingLanguage, $defaultChapterStory, $defaultEpisodeStory, $defaultPoints, $defaultCode);
            mysqli_stmt_execute($stmtProgressStorymode);
            $storyProgressId = mysqli_insert_id($conn); // Get the ID of the newly inserted story progress
            mysqli_stmt_close($stmtProgressStorymode);

            // PROGRESS table insertion for challenge mode
            $stmtProgressChallenge = mysqli_prepare($conn, "INSERT INTO progress (userId, type, language, difficulty, level, points, code) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $progressTypeChallenge = 'challenge';
            $defaultDifficulty = 'easy';
            $defaultLevel = 0;
            mysqli_stmt_bind_param($stmtProgressChallenge, "issiiis", $newUserId, $progressTypeChallenge, $programmingLanguage, $defaultDifficulty, $defaultLevel, $defaultPoints, $defaultCode);
            mysqli_stmt_execute($stmtProgressChallenge);
            $challengeProgressId = mysqli_insert_id($conn); // Get the ID of the newly inserted challenge progress
            mysqli_stmt_close($stmtProgressChallenge);

            // PERFORMANCE table insertion for story mode
            $stmtPerformanceStory = mysqli_prepare($conn, "INSERT INTO performance (userId, progressId, accuracy, efficiency, readability, timeTaken, success, failed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $defaultAccuracy = 0;
            $defaultEfficiency = 0;
            $defaultReadability = 0;
            $defaultTimeTaken = 0;
            $defaultSuccess = 0;
            $defaultFailed = 0;
            mysqli_stmt_bind_param($stmtPerformanceStory, "iiiiiiii", $newUserId, $storyProgressId, $defaultAccuracy, $defaultEfficiency, $defaultReadability, $defaultTimeTaken, $defaultSuccess, $defaultFailed);
            mysqli_stmt_execute($stmtPerformanceStory);
            mysqli_stmt_close($stmtPerformanceStory);

            // PERFORMANCE table insertion for challenge mode
            $stmtPerformanceChallenge = mysqli_prepare($conn, "INSERT INTO performance (userId, progressId, accuracy, efficiency, readability, timeTaken, success, failed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            mysqli_stmt_bind_param($stmtPerformanceChallenge, "iiiiiiii", $newUserId, $challengeProgressId, $defaultAccuracy, $defaultEfficiency, $defaultReadability, $defaultTimeTaken, $defaultSuccess, $defaultFailed);
            mysqli_stmt_execute($stmtPerformanceChallenge);
            mysqli_stmt_close($stmtPerformanceChallenge);
            
            // Fetch all user data for session storage
            $userData = [];

            // Fetch user details
            $stmtUser = mysqli_prepare($conn, "SELECT username, programmingLanguage FROM users WHERE id = ?");
            mysqli_stmt_bind_param($stmtUser, "i", $newUserId);
            mysqli_stmt_execute($stmtUser);
            mysqli_stmt_bind_result($stmtUser, $username, $programmingLanguage);
            mysqli_stmt_fetch($stmtUser);
            $userData['USERS'] = [
                'id' => $newUserId,
                'username' => $username,
                'programmingLanguage' => $programmingLanguage,
            ];
            mysqli_stmt_close($stmtUser);

            // Fetch rewards
            $userData['REWARDS'] = [];
            $stmtRewards = mysqli_prepare($conn, "SELECT language, tier, badgeName FROM rewards WHERE userId = ?");
            mysqli_stmt_bind_param($stmtRewards, "i", $newUserId);
            mysqli_stmt_execute($stmtRewards);
            mysqli_stmt_bind_result($stmtRewards, $language, $tier, $badgeName);
            while (mysqli_stmt_fetch($stmtRewards)) {
                $userData['REWARDS'][] = [
                    'language' => $language,
                    'tier' => $tier,
                    'badgeName' => $badgeName,
                ];
            }
            mysqli_stmt_close($stmtRewards);

            // Fetch saving
            $userData['SAVING'] = [];
            $stmtSaving = mysqli_prepare($conn, "SELECT language, chapter, episode, scene FROM saving WHERE userId = ?");
            mysqli_stmt_bind_param($stmtSaving, "i", $newUserId);
            mysqli_stmt_execute($stmtSaving);
            mysqli_stmt_bind_result($stmtSaving, $language, $chapter, $episode, $scene);
            while (mysqli_stmt_fetch($stmtSaving)) {
                $userData['SAVING'][] = [
                    'language' => $language,
                    'chapter' => $chapter,
                    'episode' => $episode,
                    'scene' => $scene,
                ];
            }
            mysqli_stmt_close($stmtSaving);

            // Fetch progress
            $userData['PROGRESS'] = [];
            $stmtProgress = mysqli_prepare($conn, "SELECT id, type, language, chapter, episode, difficulty, level, points, code FROM progress WHERE userId = ?");
            mysqli_stmt_bind_param($stmtProgress, "i", $newUserId);
            mysqli_stmt_execute($stmtProgress);
            mysqli_stmt_bind_result($stmtProgress, $id, $type, $language, $chapter, $episode, $difficulty, $level, $points, $code);
            while (mysqli_stmt_fetch($stmtProgress)) {
                $userData['PROGRESS'][] = [
                    'id' => $id,
                    'type' => $type,
                    'language' => $language,
                    'chapter' => $chapter,
                    'episode' => $episode,
                    'difficulty' => $difficulty,
                    'level' => $level,
                    'points' => $points,
                    'code' => $code,
                ];
            }
            mysqli_stmt_close($stmtProgress);

            // Fetch performance
            $userData['PERFORMANCE'] = [];
            $stmtPerformance = mysqli_prepare($conn, "SELECT progressId, accuracy, efficiency, readability, timeTaken, success, failed FROM performance WHERE userId = ?");
            mysqli_stmt_bind_param($stmtPerformance, "i", $newUserId);
            mysqli_stmt_execute($stmtPerformance);
            mysqli_stmt_bind_result($stmtPerformance, $progressId, $accuracy, $efficiency, $readability, $timeTaken, $success, $failed);
            while (mysqli_stmt_fetch($stmtPerformance)) {
                $userData['PERFORMANCE'][] = [
                    'progressId' => $progressId,
                    'accuracy' => $accuracy,
                    'efficiency' => $efficiency,
                    'readability' => $readability,
                    'timeTaken' => $timeTaken,
                    'success' => $success,
                    'failed' => $failed,
                ];
            }
            mysqli_stmt_close($stmtPerformance);

            $_SESSION['userData'] = $userData; // Store all user data in session
            $_SESSION['user_id'] = $newUserId;
            $_SESSION['username'] = $hid1;
            
            $tokenPayload = [
                'id' => $newUserId,
                'user' => $hid1,
                'pass' => $hid2,
                'exp' => time() + 3600, // 1 hour expiration
            ];
            $token = base64_encode(json_encode($tokenPayload));
        
            setcookie('auth_token', $token, [
                'path' => '/',
                'secure' => true,
                'httponly' => true,
                'samesite' => 'Strict',
            ]);

            echo "<script>alert('Account Added Successfully! Please complete the pre-test assessment.'); window.location.href='../1fe/asmt/index.html'; </script>";
            
        } else {
            echo "<script>alert('Failed to add account, please try again later'); window.location.href='../1fe/signup/'; </script>";
        }
        mysqli_stmt_close($stmt);
    }
}

mysqli_close($conn);

?>
