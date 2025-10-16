<?php
header('Content-Type: application/json');
session_start();

require_once __DIR__ . '/db.php';

$response = [
	'success' => false,
	'message' => 'Unknown error',
];

// Ensure user is logged in and language is set in session
if (!isset($_SESSION['user_id']) || !isset($_SESSION['userData']['USERS']['programmingLanguage'])) {
	$response['message'] = 'Unauthorized or language not set.';
	echo json_encode($response);
	exit;
}

$userId = intval($_SESSION['user_id']);
$language = $_SESSION['userData']['USERS']['programmingLanguage'];

// Read POST data
$tier = isset($_POST['tier']) ? trim($_POST['tier']) : '';
$badgeName = isset($_POST['badgeName']) ? trim($_POST['badgeName']) : '';

if ($tier === '' || $badgeName === '') {
	$response['message'] = 'Missing tier or badgeName.';
	echo json_encode($response);
	exit;
}

// Create table schema assumption:
// rewards(userId INT, language VARCHAR, tier VARCHAR, badgeName VARCHAR, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
// Insert only if not exists for same user, language, tier, badgeName

$sqlCheck = "SELECT 1 FROM rewards WHERE userId = ? AND language = ? AND tier = ? AND badgeName = ? LIMIT 1";
if ($stmt = $conn->prepare($sqlCheck)) {
	$stmt->bind_param('isss', $userId, $language, $tier, $badgeName);
	if ($stmt->execute()) {
		$stmt->store_result();
		$exists = $stmt->num_rows > 0;
	} else {
		$response['message'] = 'Check query failed.';
		echo json_encode($response);
		$stmt->close();
		$conn->close();
		exit;
	}
	$stmt->close();
} else {
	$response['message'] = 'Failed to prepare check statement.';
	echo json_encode($response);
	$conn->close();
	exit;
}

if ($exists) {
	$response['success'] = true;
	$response['message'] = 'Badge already awarded.';
	echo json_encode($response);
	$conn->close();
	exit;
}

$sqlInsert = "INSERT INTO rewards (userId, language, tier, badgeName) VALUES (?, ?, ?, ?)";
if ($stmt = $conn->prepare($sqlInsert)) {
	$stmt->bind_param('isss', $userId, $language, $tier, $badgeName);
	if ($stmt->execute()) {
		$response['success'] = true;
		$response['message'] = 'Badge awarded.';
	} else {
		$response['message'] = 'Insert failed.';
	}
	$stmt->close();
} else {
	$response['message'] = 'Failed to prepare insert statement.';
}

$conn->close();
echo json_encode($response);
?>


