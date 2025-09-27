<?php

header("Content-Type: text/plain"); // Set content type for plain text
header("Access-Control-Allow-Origin: https://code-tropa.vercel.app"); // Allow requests from your Vercel frontend

if (isset($_GET['message'])) {
    echo 'PHP endpoint received: ' . htmlspecialchars($_GET['message']);
} else {
    echo 'PHP endpoint: No message received.';
}

?>
