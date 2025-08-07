<?php
// Database connection
include 'db.php';

//PHP TO JAVASCRIPT, version 1
//USING OBJECT
// header("Content-Type: application/javascript");
// $try1="test";
// echo "var dataFromPHP = {'asd':'$try1'};";

// //USING ARRAY, retrieve comments from database
// echo "let phpComments = [];";
// $query = "SELECT * FROM comments";
// $result = mysqli_query($conn, $query);
// while ($row = mysqli_fetch_assoc($result)) {
//     $commentCol = $row['comment_text'];
//     echo "phpComments.push('$commentCol');";
// }


//PHP TO JAVASCRIPT, version 2
$data = [
  "username" => "JohnDoe",
  "theme" => "dark"
];

// $query = http_build_query($data);
// header("Location: http://127.0.0.1:5500/index.html?$query");
// exit();

//STRING TO HEX
$string = $data['username'] . $data['theme'];
$hex = '';
for ($i = 0; $i < strlen($string); $i++) {
    $hex .= dechex(ord($string[$i]));
}
echo $hex;

//HEX TO STRING
$string = hex2bin($hex);
echo "<br>".$string;

//HEX TO DECIMAL AND SHIFT
$string = 'Hello';
$shiftedHex = '';
for ($i = 0; $i < strlen($string); $i++) {
    $char = $string[$i];
    $ascii = ord($char);            // Get ASCII value
    $shifted = $ascii + 5;          // Shift by 5
    $hex = dechex($shifted);        // Convert to hex
    $shiftedHex .= $hex;
}
echo $shiftedHex;  // Output: 4d6a717173



?>