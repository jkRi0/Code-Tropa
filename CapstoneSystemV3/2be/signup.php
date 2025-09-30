<?php

// Database connection
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hid1 = $_POST['hid1'] ?? '';
    $hid2 = $_POST['hid2'] ?? '';
    
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
            "INSERT INTO users (username, password, created_at) VALUES (?, ?, NOW())"
        );
        $stmt->bind_param("ss", $hid1, $hid2_2);

        if ($stmt->execute()) {
            // Get the ID of the newly inserted user
            $newUserId = $conn->insert_id;

            // Insert default values into rewards table
            $stmtRewards = $conn->prepare(
                "INSERT INTO rewards (userId, tier, badges) VALUES (?, ?, ?)"
            );
            $defaultTier = '[""]';
            $defaultBadges = '["java",""]';
            $stmtRewards->bind_param("iss", $newUserId, $defaultTier, $defaultBadges);
            $stmtRewards->execute();
            $stmtRewards->close();

            // Insert default values into saving table
            $stmtSaving = $conn->prepare(
                "INSERT INTO saving (userId, sceneNum) VALUES (?, ?)"
            );
            $defaultSceneNum = '["java","","",""]';
            $stmtSaving->bind_param("is", $newUserId, $defaultSceneNum);
            $stmtSaving->execute();
            $stmtSaving->close();

            // Insert default values into progress table
            $stmtProgress = $conn->prepare(
                "INSERT INTO progress (userId, storymode, challenges) VALUES (?, ?, ?)"
            );
            $defaultProgressJson = '[0,0,0,"java",""]';
            $stmtProgress->bind_param("iss", $newUserId, $defaultProgressJson, $defaultProgressJson);
            $stmtProgress->execute();
            $newProgressId = $conn->insert_id; // Get the ID of the newly inserted progress
            $stmtProgress->close();

            // Insert default values into performance table
            $stmtPerformance = $conn->prepare(
                "INSERT INTO performance (userId, progressId, accuracy, efficiency, readability, time, success, failed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
            );
            $defaultJsonArray = '[0,0,0]';
            $stmtPerformance->bind_param(
                "isssssss", 
                $newUserId, 
                $newProgressId, 
                $defaultJsonArray, 
                $defaultJsonArray, 
                $defaultJsonArray, 
                $defaultJsonArray, 
                $defaultJsonArray, 
                $defaultJsonArray
            );
            $stmtPerformance->execute();
            $stmtPerformance->close();

            // // Insert default values into settings table
            // $stmtSettings = $conn->prepare(
            //     "INSERT INTO settings (userId, controls, volume) VALUES (?, ?, ?)"
            // );
            // $defaultControls = '["w","a","s","d","click"]';
            // $defaultVolume = 50;
            // $stmtSettings->bind_param("isi", $newUserId, $defaultControls, $defaultVolume);
            // $stmtSettings->execute();
            // $stmtSettings->close();



            session_start();
            
            $tokenPayload = [
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
