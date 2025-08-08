<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["error" => "Only POST requests allowed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data || !isset($data["language"]) || !isset($data["code"])) {
    echo json_encode(["error" => "Invalid request data"]);
    exit;
}

$api_url = "https://emkc.org/api/v2/piston/execute";

$request_data = [
    "language" => $data["language"],
    "version" => "*",
    "files" => [["content" => $data["code"]]]
];

$options = [
    "http" => [
        "header" => "Content-Type: application/json",
        "method" => "POST",
        "content" => json_encode($request_data)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($api_url, false, $context);

if ($response === FALSE) {
    echo json_encode(["error" => "Piston API request failed"]);
} else {
    echo $response;
}
?>
