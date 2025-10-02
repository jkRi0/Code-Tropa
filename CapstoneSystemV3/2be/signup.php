<?php

// Database connection
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hid1 = $_POST['hid1'] ?? '';
    $hid2 = $_POST['hid2'] ?? '';
    $programmingLanguage = $_POST['programmingLanguage'] ?? 'java'; // Default to 'java' if not provided
    
    // Check if the username already exists
    $checkStmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
    $checkStmt->bind_param("s", $hid1);
    $checkStmt->execute();
    $checkStmt->bind_result($count);
    $checkStmt->fetch();
    $checkStmt->close();

    if ($count > 0) {
        // Username already exists
        echo "<script>alert('Username already exists. Please choose another one.'); window.location.href='../1fe/signup/';</script>";
    } else {
        // Prepare the comment to prevent SQL injection
        $hid1 = mysqli_real_escape_string($conn, $hid1);
        $hid2 = mysqli_real_escape_string($conn, $hid2);
        
        
        $hid2_2 = password_hash($hid2, PASSWORD_DEFAULT);

        $stmt = $conn->prepare(
            "INSERT INTO users (username, password, created_at, programmingLanguage) VALUES (?, ?, NOW(), ?)"
        );
        $stmt->bind_param("sss", $hid1, $hid2_2, $programmingLanguage);

        if ($stmt->execute()) {
            // Get the ID of the newly inserted user
            $newUserId = $conn->insert_id;

            // Insert default values into rewards table
            $languages = ['java', 'c++', 'c#'];
            $defaultTier = '[""]';
            $defaultJsonArray = '[]'; // Default empty JSON array for performance

            foreach ($languages as $lang) {
                // REWARDS table insertion
                $defaultBadges = '["' . $lang . '",""]';
                $stmtRewards = $conn->prepare("INSERT INTO rewards (userId, tier, badges) VALUES (?, ?, ?)");
                $stmtRewards->bind_param("iss", $newUserId, $defaultTier, $defaultBadges);
                $stmtRewards->execute();
                $stmtRewards->close();

                // SAVING table insertion
                $defaultSceneNum = '["' . $lang . '","","",""]';
                $stmtSaving = $conn->prepare("INSERT INTO saving (userId, sceneNum) VALUES (?, ?)");
                $stmtSaving->bind_param("is", $newUserId, $defaultSceneNum);
                $stmtSaving->execute();
                $stmtSaving->close();

                // PROGRESS table insertion
                $defaultStorymode = '[0,0,0,"' . $lang . '",""]';
                $stmtProgressStorymode = $conn->prepare("INSERT INTO progress (userId, storymode, challenges) VALUES (?, ?, ?)");
                $stmtProgressStorymode->bind_param("iss", $newUserId, $defaultStorymode, $defaultStorymode);
                $stmtProgressStorymode->execute();
                $newProgressId = $conn->insert_id; // Get the ID of the newly inserted progress
                $stmtProgressStorymode->close();

                
            }
            // PERFORMANCE table insertion
            $stmtPerformance = $conn->prepare("INSERT INTO performance (userId, progressId, accuracy, efficiency, readability, time, success, failed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $defaultJsonArray = '[0,0,0]'; // Correct default value for performance metrics
            $stmtPerformance->bind_param("iissssss", $newUserId, $newProgressId, $defaultJsonArray, $defaultJsonArray, $defaultJsonArray, $defaultJsonArray, $defaultJsonArray, $defaultJsonArray);
            $stmtPerformance->execute();
            $stmtPerformance->close();
            
            // Insert default values into settings table
            $stmtSettings = $conn->prepare(
                "INSERT INTO settings (userId, controls, volume) VALUES (?, ?, ?)"
            );
            $defaultControls = '["w","a","s","d","click"]';
            $defaultVolume = 50;
            $stmtSettings->bind_param("isi", $newUserId, $defaultControls, $defaultVolume);
            $stmtSettings->execute();
            $stmtSettings->close();

            // Fetch all user data for session storage
            $userData = [];

            // Fetch user details
            $stmtUser = $conn->prepare("SELECT username, programmingLanguage FROM users WHERE id = ?");
            $stmtUser->bind_param("i", $newUserId);
            $stmtUser->execute();
            $stmtUser->bind_result($username, $programmingLanguage); // Changed $userID to $username
            $stmtUser->fetch();
            $userData['USERS'] = [
                'id' => $newUserId, // Add user ID here
                'username' => $username,
                'programmingLanguage' => $programmingLanguage,
            ];
            $stmtUser->close();

            // Fetch rewards
            $userData['REWARDS'] = [];
            $stmtRewards = $conn->prepare("SELECT tier, badges FROM rewards WHERE userId = ?");
            $stmtRewards->bind_param("i", $newUserId);
            $stmtRewards->execute();
            $stmtRewards->bind_result($tier, $badges);
            while ($stmtRewards->fetch()) {
                $userData['REWARDS'][$lang] = [
                    'tier' => json_decode($tier),
                    'badges' => json_decode($badges),
                ];
            }
            $stmtRewards->close();

            // Fetch saving
            $stmtSaving = $conn->prepare("SELECT sceneNum FROM saving WHERE userId = ?");
            $stmtSaving->bind_param("i", $newUserId);
            $stmtSaving->execute();
            $stmtSaving->bind_result($sceneNum);
            $stmtSaving->fetch();
            $userData['SAVING'] = [
                'sceneNum' => json_decode($sceneNum),
            ];
            $stmtSaving->close();

            // Fetch progress
            $stmtProgress = $conn->prepare("SELECT storymode, challenges FROM progress WHERE userId = ?");
            $stmtProgress->bind_param("i", $newUserId);
            $stmtProgress->execute();
            $stmtProgress->bind_result($storymode, $challenges);
            $stmtProgress->fetch();
            $userData['PROGRESS'] = [
                'storymode' => json_decode($storymode),
                'challenges' => json_decode($challenges),
            ];
            $stmtProgress->close();

            // Fetch settings
            $stmtSettings = $conn->prepare("SELECT controls, volume FROM settings WHERE userId = ?");
            $stmtSettings->bind_param("i", $newUserId);
            $stmtSettings->execute();
            $stmtSettings->bind_result($controls, $volume);
            $stmtSettings->fetch();
            $userData['SETTINGS'] = [
                'controls' => json_decode($controls),
                'volume' => $volume,
            ];
            $stmtSettings->close();

            // Fetch performance
            $stmtPerformance = $conn->prepare("SELECT accuracy, efficiency, readability, time, success, failed FROM performance WHERE userId = ?");
            $stmtPerformance->bind_param("i", $newUserId);
            $stmtPerformance->execute();
            $stmtPerformance->bind_result($accuracy, $efficiency, $readability, $time, $success, $failed);
            $stmtPerformance->fetch();
            $userData['PERFORMANCE'] = [
                'accuracy' => json_decode($accuracy),
                'efficiency' => json_decode($efficiency),
                'readability' => json_decode($readability),
                'time' => json_decode($time),
                'success' => json_decode($success),
                'failed' => json_decode($failed),
            ];
            $stmtPerformance->close();

            $_SESSION['userData'] = $userData; // Store all user data in session

            session_start();
            
            $tokenPayload = [
                'id' => $userID,
                'user' => $hid1,
                'pass' => $hid2,
                'exp' => time() + 3600, // 1 hour expiration
            ];
            $token = base64_encode(json_encode($tokenPayload)); // Simplified token, for demo only!
        
            // Set token cookie with HttpOnly, Secure, SameSite flags
            setcookie('auth_token', $token, [
                'expires' => time() + 3600,      // 1 hour
                'path' => '/',                   // available site-wide
                'secure' => true,                // send only over HTTPS
                'httponly' => true,              // JS cannot access
                'samesite' => 'Strict',          // protect against CSRF
            ]);

            echo "<script>alert('Account Added Successfully'); window.location.href='../1fe/homepage/index.html'; </script>";
            
        } else {
            echo "<script>alert('Failed to add account, please try again later'); window.location.href='../1fe/signup/'; </script>";
        }
        $stmt->close();
    }
}

mysqli_close($conn);

?>
