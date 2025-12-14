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

            // Fetch only essential user data for session storage
            $userData = [];

            // Fetch user details (only essential data)
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

            // Note: REWARDS, SAVING, PROGRESS, and PERFORMANCE are fetched on-demand when needed
            // This reduces initial session load time

            $_SESSION['userData'] = $userData; // Store essential user data in session
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
        
            // Set programming language in localStorage before redirecting
            $lang = $programmingLanguage ?? 'java'; // Default to 'java' if not set
            $langLower = strtolower($lang);
            echo "<script>
                // Set language in localStorage before redirecting
                if (typeof(Storage) !== 'undefined') {
                    localStorage.setItem('selectedLanguage', '" . $langLower . "');
                }
                window.location.href='../1fe/homepage/index.html'; 
            </script>";
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
