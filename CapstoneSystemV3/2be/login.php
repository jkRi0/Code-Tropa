<?php

// Database connection
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hid1 = $_POST['username'] ?? '';
    $hid2 = $_POST['pass1'] ?? '';
    
    // echo $hid1." ".$hid2;
    
    //Query to get the hashed password and encryption key from the database
    $stmt = $conn->prepare(
        "SELECT id, password FROM users WHERE username = ?"
    );
    $stmt->bind_param("s", $hid1);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($userID, $hashedPassword);
        $stmt->fetch();

        // Verify the password
        if (password_verify($hid2, $hashedPassword)) {
            session_start();

            // Fetch all user data for session storage
            $userData = [];

            // Fetch user details
            $stmtUser = $conn->prepare("SELECT username, programmingLanguage FROM users WHERE id = ?");
            $stmtUser->bind_param("i", $userID);
            $stmtUser->execute();
            $stmtUser->bind_result($username, $programmingLanguage);
            $stmtUser->fetch();
            $userData['USERS'] = [
                'id' => $userID, // Add user ID here
                'username' => $username,
                'programmingLanguage' => $programmingLanguage,
            ];
            $stmtUser->close();

            // Fetch rewards
            $stmtRewards = $conn->prepare("SELECT tier, badges FROM rewards WHERE userId = ?");
            $stmtRewards->bind_param("i", $userID);
            $stmtRewards->execute();
            $stmtRewards->bind_result($tier, $badges);
            $userData['REWARDS'] = [];
            while ($stmtRewards->fetch()) {
                $userData['REWARDS'][] = [
                    'tier' => json_decode($tier),
                    'badges' => json_decode($badges),
                ];
            }
            $stmtRewards->close();

            // Fetch saving
            $stmtSaving = $conn->prepare("SELECT sceneNum FROM saving WHERE userId = ?");
            $stmtSaving->bind_param("i", $userID);
            $stmtSaving->execute();
            $stmtSaving->bind_result($sceneNum);
            $userData['SAVING'] = [];
            while ($stmtSaving->fetch()) {
                $userData['SAVING'][] = [
                    'sceneNum' => json_decode($sceneNum),
                ];
            }
            $stmtSaving->close();

            // Fetch progress
            $stmtProgress = $conn->prepare("SELECT storymode, challenges FROM progress WHERE userId = ?");
            $stmtProgress->bind_param("i", $userID);
            $stmtProgress->execute();
            $stmtProgress->bind_result($storymode, $challenges);
            $userData['PROGRESS'] = [];
            while ($stmtProgress->fetch()) {
                $userData['PROGRESS'][] = [
                    'storymode' => json_decode($storymode),
                    'challenges' => json_decode($challenges),
                ];
            }
            $stmtProgress->close();

            // Fetch settings
            $stmtSettings = $conn->prepare("SELECT controls, volume FROM settings WHERE userId = ?");
            $stmtSettings->bind_param("i", $userID);
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
            $stmtPerformance->bind_param("i", $userID);
            $stmtPerformance->execute();
            $stmtPerformance->bind_result($accuracy, $efficiency, $readability, $time, $success, $failed);
            $userData['PERFORMANCE'] = [];
            while ($stmtPerformance->fetch()) {
                $userData['PERFORMANCE'][] = [
                    'accuracy' => json_decode($accuracy),
                    'efficiency' => json_decode($efficiency),
                    'readability' => json_decode($readability),
                    'time' => json_decode($time),
                    'success' => json_decode($success),
                    'failed' => json_decode($failed),
                ];
            }
            $stmtPerformance->close();

            $_SESSION['userData'] = $userData; // Store all user data in session
            
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
        
            // Respond success (JSON)
            // header('Content-Type: application/json');
            // echo json_encode(['status' => 'success', 'message' => 'Logged in']);
            
            echo "<script>alert('Logged in successfully'); window.location.href='../1fe/homepage/index.html'; </script>";
        } else {
            echo "<script>alert('Invalid password'); window.location.href='../1fe/login/'; </script>";
        }
    } else {
        echo "<script>alert('Invalid username'); window.location.href='../1fe/login/'; </script>";
    }

    $stmt->close();
    mysqli_close($conn);
}
?>
