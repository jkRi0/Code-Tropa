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
            $stmtRewards = mysqli_prepare($conn, "SELECT language, tier, badgeName FROM rewards WHERE userId = ?");
            mysqli_stmt_bind_param($stmtRewards, "i", $userID);
            mysqli_stmt_execute($stmtRewards);
            mysqli_stmt_bind_result($stmtRewards, $language, $tier, $badgeName);
            $userData['REWARDS'] = [];
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
            mysqli_stmt_bind_param($stmtSaving, "i", $userID);
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
            mysqli_stmt_bind_param($stmtProgress, "i", $userID);
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
            mysqli_stmt_bind_param($stmtPerformance, "i", $userID);
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
