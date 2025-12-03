<?php
session_start();

echo "<h1>Session Data:</h1>";

if (isset($_SESSION['userData'])) {
    echo "<pre>";
    print_r($_SESSION['userData']);
    echo "</pre>";
} else {
    echo "<p>No user data found in session.</p>";
}

echo "<p><a href=\"../login/\">Login</a> | <a href=\"../signup/\">Signup</a> | <a href=\"../homepage/index.html\">Homepage</a></p>";

?>
