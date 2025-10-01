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
