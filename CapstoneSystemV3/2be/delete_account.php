<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in.']);
    exit();
}

$response = ['success' => false, 'message' => 'Invalid request.'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $_SESSION['user_id'];

    // Start a transaction
    mysqli_begin_transaction($conn);
    try {
        // Finally, delete from users table
        $stmt = mysqli_prepare($conn, "DELETE FROM users WHERE id = ?");
        mysqli_stmt_bind_param($stmt, "i", $userId);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);

        mysqli_commit($conn);

        session_destroy();
        // Clear the auth_token cookie
        setcookie('auth_token', '', ['expires' => time() - 3600, 'path' => '/', 'httponly' => true, 'secure' => true, 'samesite' => 'Strict']);

        $response['success'] = true;
        $response['message'] = 'Account deleted successfully.';
    } catch (Exception $e) {
        mysqli_rollback($conn);
        error_log("Account deletion failed: " . $e->getMessage());
        $response['message'] = 'Failed to delete account due to a database error.';
    }
} else {
    $response['message'] = 'Invalid request method.';
}

echo json_encode($response);

mysqli_close($conn);

?>
