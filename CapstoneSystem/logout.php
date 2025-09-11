<?php
// Start the session
session_start();

// Check if the user has confirmed logout
if (isset($_GET['confirm']) && $_GET['confirm'] === 'yes') {
    session_unset();     // Unset all session variables
    session_destroy();   // Destroy the session
    header("Location: login/"); // Redirect to login page or homepage
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