<?php
//sa = success add
//fa = failed add
//se = success edit
//fe = failed edit
//sd = success delete
//fd = failed delete

// Database connection
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $comment = $_POST['comment'] ?? '';
    if (!empty($comment)) {

        // Prepare the comment to prevent SQL injection
        $comment = mysqli_real_escape_string($conn, $comment);
        
        // Insert the comment
        $query = "INSERT INTO comments (comment_text, created_at) VALUES ('$comment', NOW())";
        
        if (mysqli_query($conn, $query)) {
            //DEVELOPMENT
            header("location: http://127.0.0.1:5500/index.html?sa=1&comment=" . urlencode($comment));

            //PRODUCTION
            // header("location: https://vercel-x-infinity-free.vercel.app/?sa=1&comment=" . urlencode($comment));
        } else {
            echo json_encode(['error' => 'Failed to add comment: ' . mysqli_error($conn)]);
        }
    } else {
        echo json_encode(['error' => 'Comment cannot be empty']);
    }
}

mysqli_close($conn);
?>
