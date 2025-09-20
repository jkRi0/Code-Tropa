<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "code_tropa";

$conn = mysqli_connect($host, $user, $pass, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// echo '<script>console.log("Connected")</script>'; // Removed for cleaner output in production

?>
