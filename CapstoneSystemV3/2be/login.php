<?php

// Database connection
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hid1 = $_POST['username'] ?? '';
    $hid2 = $_POST['pass1'] ?? '';
    
    //Query to get the hashed password and encryption key from the database
    $stmt = mysqli_prepare(
        $conn, "SELECT id, password FROM users WHERE username = ?"
    );
    mysqli_stmt_bind_param($stmt, "s", $hid1);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);

    if (mysqli_stmt_num_rows($stmt) > 0) {
        mysqli_stmt_bind_result($stmt, $userID, $hashedPassword);
        mysqli_stmt_fetch($stmt);

        // Verify the password
        if (password_verify($hid2, $hashedPassword)) {
            session_start();

            // Fetch all user data for session storage
            $userData = [];

            // Fetch user details
            $stmtUser = mysqli_prepare($conn, "SELECT username, programmingLanguage FROM users WHERE id = ?");
            mysqli_stmt_bind_param($stmtUser, "i", $userID);
            mysqli_stmt_execute($stmtUser);
            mysqli_stmt_bind_result($stmtUser, $username, $programmingLanguage);
            mysqli_stmt_fetch($stmtUser);
            $userData['USERS'] = [
                'id' => $userID,
                'username' => $username,
                'programmingLanguage' => $programmingLanguage,
            ];
            mysqli_stmt_close($stmtUser);

            // Fetch rewards
            $stmtRewards = mysqli_prepare($conn, "SELECT tier, badges FROM rewards WHERE userId = ?");
            mysqli_stmt_bind_param($stmtRewards, "i", $userID);
            mysqli_stmt_execute($stmtRewards);
            mysqli_stmt_bind_result($stmtRewards, $tier, $badges);
            $userData['REWARDS'] = [];
            while (mysqli_stmt_fetch($stmtRewards)) {
                $userData['REWARDS'][] = [
                    'tier' => json_decode($tier),
                    'badges' => json_decode($badges),
                ];
            }
            mysqli_stmt_close($stmtRewards);

            // Fetch saving
            $stmtSaving = mysqli_prepare($conn, "SELECT sceneNum FROM saving WHERE userId = ?");
            mysqli_stmt_bind_param($stmtSaving, "i", $userID);
            mysqli_stmt_execute($stmtSaving);
            mysqli_stmt_bind_result($stmtSaving, $sceneNum);
            mysqli_stmt_fetch($stmtSaving);
            $userData['SAVING'] = [
                'sceneNum' => json_decode($sceneNum),
            ];
            mysqli_stmt_close($stmtSaving);

            // Fetch progress
            $stmtProgress = mysqli_prepare($conn, "SELECT storymode, challenges FROM progress WHERE userId = ?");
            mysqli_stmt_bind_param($stmtProgress, "i", $userID);
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
            mysqli_stmt_bind_param($stmtSettings, "i", $userID);
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
            mysqli_stmt_bind_param($stmtPerformance, "i", $userID);
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
            $_SESSION['user_id'] = $userID;
            $_SESSION['username'] = $hid1; // Store the username from the form submission
            
            $tokenPayload = [
                'id' => $userID,
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
        
            echo "<script>alert('Logged in successfully'); window.location.href='../1fe/homepage/index.html'; </script>";
        } else {
            echo "<script>alert('Invalid password'); window.location.href='../1fe/login/'; </script>";
        }
    } else {
        echo "<script>alert('Invalid username'); window.location.href='../1fe/login/'; </script>";
    }
    mysqli_stmt_close($stmt);
}

mysqli_close($conn);

?>
