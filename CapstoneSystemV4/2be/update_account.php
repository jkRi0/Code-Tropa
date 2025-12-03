<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

// Assuming session is already started by other means (e.g., global session_start() in index.php or login.php)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in.']);
    exit();
}

$response = ['success' => false, 'message' => 'No changes submitted.'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $_SESSION['user_id'];
    $currentPassword = $_POST['current_password'] ?? '';
    $newUsername = trim($_POST['username'] ?? '');
    $newPassword = $_POST['new_password'] ?? '';
    $confirmNewPassword = $_POST['confirm_new_password'] ?? '';

    $userUpdated = false;
    $passwordUpdated = false;

    // Fetch the current user data to verify password and compare username
    $stmt = mysqli_prepare($conn, "SELECT username, password FROM users WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "i", $userId);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $dbUsername, $dbPassword);
    mysqli_stmt_fetch($stmt);
    mysqli_stmt_close($stmt);

    if (!$dbUsername) {
        $response['message'] = 'User not found.';
        echo json_encode($response);
        exit();
    }

    $currentUsername = $_SESSION['username'];

    // Check if username is being changed
    $isUsernameChanged = (!empty($newUsername) && $newUsername !== $currentUsername);

    // Check if password is being changed
    $isPasswordChanged = (!empty($newPassword));

    // If neither username nor password is being changed, and no new username is provided
    if (!$isUsernameChanged && !$isPasswordChanged) {
        $response['message'] = 'No changes submitted.';
        echo json_encode($response);
        exit();
    }

    // Verify current password if either username is changing or password is changing
    if ($isUsernameChanged || $isPasswordChanged) {
        if (empty($currentPassword)) {
            $response['message'] = 'Current password is required to make changes.';
            echo json_encode($response);
            exit();
        }
        if (!password_verify($currentPassword, $dbPassword)) {
            $response['message'] = 'Incorrect current password.';
            echo json_encode($response);
            exit();
        }
    }

    // Handle username update
    if ($isUsernameChanged) {
        if (strlen($newUsername) < 3) {
            $response['message'] = 'Username must be at least 3 characters long.';
            echo json_encode($response);
            exit();
        }
        $checkUsernameStmt = mysqli_prepare($conn, "SELECT id FROM users WHERE username = ? AND id != ?");
        mysqli_stmt_bind_param($checkUsernameStmt, "si", $newUsername, $userId);
        mysqli_stmt_execute($checkUsernameStmt);
        mysqli_stmt_store_result($checkUsernameStmt);
        if (mysqli_stmt_num_rows($checkUsernameStmt) > 0) {
            $response['message'] = 'Username already taken.';
            echo json_encode($response);
            exit();
        }
        mysqli_stmt_close($checkUsernameStmt);

        $updateStmt = mysqli_prepare($conn, "UPDATE users SET username = ? WHERE id = ?");
        mysqli_stmt_bind_param($updateStmt, "si", $newUsername, $userId);
        if (mysqli_stmt_execute($updateStmt)) {
            $_SESSION['username'] = $newUsername; // Update session with new username
            $userUpdated = true;
            $response['success'] = true;
            $response['message'] = 'Username updated successfully.';
        } else {
            $response['message'] = 'Failed to update username.';
            echo json_encode($response);
            exit();
        }
        mysqli_stmt_close($updateStmt);
    }

    // Handle password update
    if ($isPasswordChanged) {
        if (strlen($newPassword) < 8) {
            $response['message'] = 'New password must be at least 8 characters long.';
            echo json_encode($response);
            exit();
        }
        if ($newPassword !== $confirmNewPassword) {
            $response['message'] = 'New passwords do not match.';
            echo json_encode($response);
            exit();
        }
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $updateStmt = mysqli_prepare($conn, "UPDATE users SET password = ? WHERE id = ?");
        mysqli_stmt_bind_param($updateStmt, "si", $hashedPassword, $userId);
        if (mysqli_stmt_execute($updateStmt)) {
            $passwordUpdated = true;
            $response['success'] = true;
            $response['message'] = (isset($response['message']) ? $response['message'] . ' ' : '') . 'Password updated successfully.';
        } else {
            $response['message'] = (isset($response['message']) ? $response['message'] . ' ' : '') . 'Failed to update password.';
            echo json_encode($response);
            exit();
        }
        mysqli_stmt_close($updateStmt);
    }

    // If any changes were successfully made, regenerate and set a new auth_token
    if ($userUpdated || $passwordUpdated) {
        // Fetch the latest username for the token
        $stmt = mysqli_prepare($conn, "SELECT username FROM users WHERE id = ?"); // Changed to only select username
        mysqli_stmt_bind_param($stmt, "i", $userId);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $latestUsername); // Only bind latestUsername
        mysqli_stmt_fetch($stmt);
        mysqli_stmt_close($stmt);

        $tokenPayload = [
            'id' => $userId,
            'user' => $latestUsername,
            // 'pass' => $latestPassword, // Removed for security and consistency with auth.php
            'exp' => time() + 3600, // 1 hour expiration
        ];
        $newToken = base64_encode(json_encode($tokenPayload));
        setcookie('auth_token', $newToken, [
            'expires' => time() + 3600,
            'path' => '/',
            'secure' => true,
            'httponly' => true,
            'samesite' => 'Strict',
        ]);
    }

} else {
    $response['message'] = 'Invalid request method.';
}

echo json_encode($response);

mysqli_close($conn);

?>
