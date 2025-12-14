<?php

// Database connection
include 'db.php';

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
            
            session_start();

            // Fetch only essential user data for session storage
            $userData = [];
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

            // Note: REWARDS, SAVING, PROGRESS, and PERFORMANCE are created/fetched on-demand when needed
            // This reduces initial signup time and session load

            $_SESSION['userData'] = $userData;
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

            // Set programming language in localStorage before redirecting
            $lang = $programmingLanguage ?? 'java'; // Default to 'java' if not set
            $langLower = strtolower($lang);
            echo "<script>
                // Set language in localStorage before redirecting
                if (typeof(Storage) !== 'undefined') {
                    localStorage.setItem('selectedLanguage', '" . $langLower . "');
                }
                alert('Account Added Successfully! Please complete the pre-test assessment.'); 
                window.location.href='../1fe/asmt/index.html'; 
            </script>";
            
        } else {
            echo "<script>alert('Failed to add account, please try again later'); window.location.href='../1fe/signup/'; </script>";
        }
        mysqli_stmt_close($stmt);
    }
}

mysqli_close($conn);

?>
