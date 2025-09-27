<?php
// Start the session
session_start();

// Database connection
include 'db.php';

// Check if the user has confirmed logout
if (isset($_GET['confirm']) && $_GET['confirm'] === 'yes') {
    // Retrieve username before unsetting the session
    $username = $_SESSION['username'] ?? '';

    session_unset();     // Unset all session variables
    session_destroy();   // Destroy the session

    // Clear the session from the database
    if (!empty($username)) {
        $updateStmt = $conn->prepare("UPDATE users SET session = NULL WHERE username = ?");
        $updateStmt->bind_param("s", $username);
        $updateStmt->execute();
        $updateStmt->close();
    }

    header("Location: login/"); // Redirect to login page
    exit();
} else {
    // If not confirmed, show confirmation dialog
    echo "<script>
        if (confirm('Are you sure you want to log out?')) {
            window.location.href = 'logout.php?confirm=yes';
        } else {
            window.location.href = 'homepage/index.php'; // Redirect to homepage or wherever you want
        }
    </script>";
}
?>