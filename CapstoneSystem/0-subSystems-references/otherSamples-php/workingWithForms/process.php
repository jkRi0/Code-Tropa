<?php 
    // process.php 
    if ($_SERVER["REQUEST_METHOD"] == "POST") { 
        $username = $_POST['username']; 
        echo "Hello, " . $username; 
    } 
?> 