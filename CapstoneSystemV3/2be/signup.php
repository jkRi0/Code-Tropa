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
            $defaultTier = '[""]';
            $defaultJsonArray = '[]'; // Default empty JSON array for performance

            foreach ($languages as $lang) {
                // REWARDS table insertion
                $defaultBadges = '["' . $lang . '",""]';
                $stmtRewards = mysqli_prepare($conn, "INSERT INTO rewards (userId, tier, badges) VALUES (?, ?, ?)");
                mysqli_stmt_bind_param($stmtRewards, "iss", $newUserId, $defaultTier, $defaultBadges);
                mysqli_stmt_execute($stmtRewards);
                mysqli_stmt_close($stmtRewards);

                // SAVING table insertion
                $defaultSceneNum = '["' . $lang . '","","",""]';
                $stmtSaving = mysqli_prepare($conn, "INSERT INTO saving (userId, sceneNum) VALUES (?, ?)");
                mysqli_stmt_bind_param($stmtSaving, "is", $newUserId, $defaultSceneNum);
                mysqli_stmt_execute($stmtSaving);
                mysqli_stmt_close($stmtSaving);

                // PROGRESS table insertion
                $defaultStorymode = '[0,0,0,"' . $lang . '",""]';
                $stmtProgressStorymode = mysqli_prepare($conn, "INSERT INTO progress (userId, storymode, challenges) VALUES (?, ?, ?)");
                mysqli_stmt_bind_param($stmtProgressStorymode, "iss", $newUserId, $defaultStorymode, $defaultStorymode);
                mysqli_stmt_execute($stmtProgressStorymode);
                $currentProgressId = mysqli_insert_id($conn); // Get the ID of the newly inserted progress
                mysqli_stmt_close($stmtProgressStorymode);

                
            }
            // PERFORMANCE table insertion for each language
            $stmtPerformance = mysqli_prepare($conn, "INSERT INTO performance (userId, progressId, accuracy, efficiency, readability, time, success, failed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $defaultJsonArray = '[0,0,0]'; // Correct default value for performance metrics
            mysqli_stmt_bind_param($stmtPerformance, "iissssss", $newUserId, $currentProgressId, $defaultJsonArray, $defaultJsonArray, $defaultJsonArray, $defaultJsonArray, $defaultJsonArray, $defaultJsonArray);
            mysqli_stmt_execute($stmtPerformance);
            mysqli_stmt_close($stmtPerformance);

            // Insert default values into settings table
            $stmtSettings = mysqli_prepare(
                $conn, "INSERT INTO settings (userId, controls, volume) VALUES (?, ?, ?)"
            );
            $defaultControls = '["w","a","s","d","click"]';
            $defaultVolume = 50;
            mysqli_stmt_bind_param($stmtSettings, "isi", $newUserId, $defaultControls, $defaultVolume);
            mysqli_stmt_execute($stmtSettings);
            mysqli_stmt_close($stmtSettings);

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
            $stmtRewards = mysqli_prepare($conn, "SELECT tier, badges FROM rewards WHERE userId = ?");
            mysqli_stmt_bind_param($stmtRewards, "i", $newUserId);
            mysqli_stmt_execute($stmtRewards);
            mysqli_stmt_bind_result($stmtRewards, $tier, $badges);
            while (mysqli_stmt_fetch($stmtRewards)) {
                $userData['REWARDS'][] = [
                    'tier' => json_decode($tier),
                    'badges' => json_decode($badges),
                ];
            }
            mysqli_stmt_close($stmtRewards);

            // Fetch saving
            $stmtSaving = mysqli_prepare($conn, "SELECT sceneNum FROM saving WHERE userId = ?");
            mysqli_stmt_bind_param($stmtSaving, "i", $newUserId);
            mysqli_stmt_execute($stmtSaving);
            mysqli_stmt_bind_result($stmtSaving, $sceneNum);
            mysqli_stmt_fetch($stmtSaving);
            $userData['SAVING'] = [
                'sceneNum' => json_decode($sceneNum),
            ];
            mysqli_stmt_close($stmtSaving);

            // Fetch progress
            $stmtProgress = mysqli_prepare($conn, "SELECT storymode, challenges FROM progress WHERE userId = ?");
            mysqli_stmt_bind_param($stmtProgress, "i", $newUserId);
            mysqli_stmt_execute($stmtProgress);
            mysqli_stmt_bind_result($stmtProgress, $storymode, $challenges);
            mysqli_stmt_fetch($stmtProgress);
            $userData['PROGRESS'] = [
                'storymode' => json_decode($storymode),
                'challenges' => json_decode($challenges),
            ];
            mysqli_stmt_close($stmtProgress);

            // Fetch settings
            $stmtSettings = mysqli_prepare($conn, "SELECT controls, volume FROM settings WHERE userId = ?");
            mysqli_stmt_bind_param($stmtSettings, "i", $newUserId);
            mysqli_stmt_execute($stmtSettings);
            mysqli_stmt_bind_result($stmtSettings, $controls, $volume);
            mysqli_stmt_fetch($stmtSettings);
            $userData['SETTINGS'] = [
                'controls' => json_decode($controls),
                'volume' => $volume,
            ];
            mysqli_stmt_close($stmtSettings);

            // Fetch performance
            $stmtPerformance = mysqli_prepare($conn, "SELECT accuracy, efficiency, readability, time, success, failed FROM performance WHERE userId = ?");
            mysqli_stmt_bind_param($stmtPerformance, "i", $newUserId);
            mysqli_stmt_execute($stmtPerformance);
            mysqli_stmt_bind_result($stmtPerformance, $accuracy, $efficiency, $readability, $time, $success, $failed);
            mysqli_stmt_fetch($stmtPerformance);
            $userData['PERFORMANCE'] = [
                'accuracy' => json_decode($accuracy),
                'efficiency' => json_decode($efficiency),
                'readability' => json_decode($readability),
                'time' => json_decode($time),
                'success' => json_decode($success),
                'failed' => json_decode($failed),
            ];
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
                'expires' => time() + 3600,
                'path' => '/',
                'secure' => true,
                'httponly' => true,
                'samesite' => 'Strict',
            ]);

            echo "<script>alert('Account Added Successfully'); window.location.href='../1fe/homepage/index.html'; </script>";
            
        } else {
            echo "<script>alert('Failed to add account, please try again later'); window.location.href='../1fe/signup/'; </script>";
        }
        mysqli_stmt_close($stmt);
    }
}

mysqli_close($conn);

?>
