<?php
header("Content-Type: application/json");

// Set your Gemini API key
/*
for checking the list of model, visit this on a browser:
    https://generativelanguage.googleapis.com/v1/models?key=YOUR_API_KEY
*/
$api_key = "AIzaSyBVGcMbvqpphBZCbRNsOM-Xuu0pmkCawes";  // Replace with your API key

//new: AIzaSyC-hhUhb-q1Y8GQn0vNh9rld8honW3bMe8

// Get user input from frontend (JavaScript fetch request)
$data = json_decode(file_get_contents("php://input"), true);
$user_message = isset($data['message']) ? trim($data['message']) : "";

// Gemini API URL
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent?key=$api_key";

// Request payload
$request_data = json_encode([
    "contents" => [[
        "parts" => [[ "text" => '' ],
            [ "text" => 'Analyze the following Java code and provide the expected output when executed:' ],
            [ "text" => $user_message ]]
    ]],
]);

// Initialize cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
curl_setopt($ch, CURLOPT_POSTFIELDS, $request_data);

// Execute request and get response
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Handle cURL errors
if ($response === false) {
    echo json_encode(["error" => "API request failed: " . $error]);
    exit;
}

// Ensure valid JSON response
$json_response = json_decode($response, true);
if ($json_response === null) {
    echo json_encode(["error" => "Invalid JSON response from API. HTTP Code: " . $http_code]);
    exit;
}

// Output the actual Gemini API response
echo json_encode($json_response);
?>
