<?php
header("Content-Type: application/json");

// Set your Gemini API key
$api_key = "AIzaSyC-hhUhb-q1Y8GQn0vNh9rld8honW3bMe8"; // Replace with your actual API key

// Get user input from frontend
$data = json_decode(file_get_contents("php://input"), true);
$user_message = $data['message'] ?? "Hello!";

// Gemini API URL
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=$api_key";


// Request payload
$request_data = json_encode([
    "contents" => [[
        "parts" => [[ "text" => 'here are the objective for code input checking.
            OBJECTIVE: "Java program that simulates a 
            train as a class using Object-Oriented Programming (OOP) concepts.
            The program should include encapsulation, attributes, 
            constructors, and methods.
            Attributes:Defined as private variables (trainNumber, speed, capacity, isMoving).
            Constructor:Initializes the train with a train number and capacity.
            Methods:startTrain(int newSpeed): Starts the train.
            stopTrain(): Stops the train.
            getSpeed(), getTrainNumber(), getCapacity(): Returns train details."
            get ready to check my code' ],
            [ "text" => 'give your short evaluation: say "excellent" if the code meets the objectives,
            "good" if the code missing some of the objectives, and "bad" if the code has syntax error
            or does not meet the objectives.' ],
            [ "text" => 'give a message if the input doesnt contain any java code.' ],
            [ "text" => 'Here is my input: ' ],
            [ "text" => $user_message ]]
    ]],
]);

// Initialize cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
curl_setopt($ch, CURLOPT_POSTFIELDS, $request_data);

// Execute request and capture response
$response = curl_exec($ch);
$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE); // Capture HTTP status code
$error_msg = curl_error($ch); // Capture any cURL errors
curl_close($ch);

// Debug output
if ($http_status != 200) {
    echo json_encode([
        "error" => "Invalid JSON response from API.",
        "http_code" => $http_status,
        "api_response" => $response,
        "curl_error" => $error_msg
    ]);
} else {
    echo $response;
}
?>
