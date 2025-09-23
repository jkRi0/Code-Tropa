<?php

if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $key = $_POST['key'] ?? '';
    $value = $_POST['value'] ?? '';
    $expiration = time() + (86400 * 30); // 30 days

    switch ($action) {
        case 'createOrUpdate':
            setcookie($key, $value, $expiration, "/");
            echo json_encode(['status' => 'success', 'message' => "Cookie '{$key}' created/updated."]);
            break;
        case 'read':
            if (isset($_COOKIE[$key])) {
                echo json_encode(['status' => 'success', 'value' => $_COOKIE[$key]]);
            } else {
                echo json_encode(['status' => 'error', 'message' => "Cookie '{$key}' not found."]);
            }
            break;
        case 'delete':
            if (isset($_COOKIE[$key])) {
                setcookie($key, "", time() - 3600, "/"); // set expiration to past
                echo json_encode(['status' => 'success', 'message' => "Cookie '{$key}' deleted."]);
            } else {
                echo json_encode(['status' => 'error', 'message' => "Cookie '{$key}' not found. Cannot delete."]);
            }
            break;
        default:
            echo json_encode(['status' => 'error', 'message' => 'Invalid action.']);
            break;
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'No action specified.']);
}

?>
