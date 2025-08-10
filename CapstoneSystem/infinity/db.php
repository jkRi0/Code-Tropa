<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "code_tropa";
try{
    $conn = mysqli_connect($host,$user,$pass,$dbname);

    echo '<script>console.log("Connected")</script>';
}
catch(mysqli_sql_exception){
    echo '<script>console.log("Could not connect!")</script>';
}
?>
