<?php
session_start();

if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $key = $_POST['key'] ?? '';
    $value = $_POST['value'] ?? '';

    switch ($action) {
        case 'createOrUpdate':
            $_SESSION[$key] = $value;
            echo json_encode(['status' => 'success', 'message' => "Session variable '{$key}' created/updated."]);
            break;
        case 'read':
            if (isset($_SESSION[$key])) {
                echo json_encode(['status' => 'success', 'value' => $_SESSION[$key]]);
            } else {
                echo json_encode(['status' => 'error', 'message' => "Session variable '{$key}' not found."]);
            }
            break;
        case 'delete':
            if (isset($_SESSION[$key])) {
                unset($_SESSION[$key]);
                echo json_encode(['status' => 'success', 'message' => "Session variable '{$key}' deleted."]);
            } else {
                echo json_encode(['status' => 'error', 'message' => "Session variable '{$key}' not found. Cannot delete."]);
            }
            break;
        case 'destroy':
            session_destroy();
            echo json_encode(['status' => 'success', 'message' => 'All session variables destroyed.']);
            break;
        default:
            echo json_encode(['status' => 'error', 'message' => 'Invalid action.']);
            break;
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'No action specified.']);
}

?>
