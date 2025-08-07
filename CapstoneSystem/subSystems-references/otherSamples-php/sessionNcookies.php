<?php 

session_start();

$username = "justine";
$key = "name";
$_SESSION['name']=$username;
echo $_SESSION['name'];

setcookie($key,$username,(time()+3600),"/");


/* now destroying the session id 

if(isset($_SESSION['username']))
{
    $_SESSION=array();
    unset($_SESSION);
    session_destroy();
    echo "session destroyed...";
}*/


?>