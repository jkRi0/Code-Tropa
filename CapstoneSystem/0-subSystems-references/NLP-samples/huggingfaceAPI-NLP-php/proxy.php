
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$api_key = "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";  // Replace with your actual API key
$input_text = $_POST['text'] ?? '';
$direction = $_POST['direction'] ?? 'en-to-tl';  // Default: English → Tagalog

if (empty($input_text)) {
    echo json_encode(["error" => "No input text provided."]);
    exit;
}

// Choose model based on translation direction
if ($direction === 'en-to-tl') {
    $url = "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-tl";
} else if ($direction === 'tl-to-en') {
    $url = "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-tl-en";
} else {
    echo json_encode(["error" => "Invalid translation direction."]);
    exit;
}

$data = json_encode(["inputs" => $input_text]);

$headers = [
    "Authorization: Bearer $api_key",
    "Content-Type: application/json"
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code !== 200) {
    error_log("API request failed. Response: " . $response);
    echo json_encode(["error" => "API request failed.", "status" => $http_code]);
    exit;
}

echo $response;
?>


