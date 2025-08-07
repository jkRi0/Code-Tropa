<?php
// Replace with your actual Google Gemini API Key
$API_KEY = "AIzaSyBVGcMbvqpphBZCbRNsOM-Xuu0pmkCawes";

// Correct Gemini API Endpoint
$API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=$API_KEY";

// Get user input
$user_input = isset($_POST['user_input']) ? trim($_POST['user_input']) : '';

if ($user_input) {
    // ✅ Corrected payload
    $request_data = json_encode([
        "prompt" => ["text" => $user_input]
    ]);

    // cURL request
    $ch = curl_init($API_URL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request_data);

    $response = curl_exec($ch);
    curl_close($ch);

    // Decode JSON response
    $response_data = json_decode($response, true);

    // Extract AI response
    $ai_response = isset($response_data['candidates'][0]['output'])
        ? $response_data['candidates'][0]['output']
        : "No response from AI.";

    // Extract token usage
    $token_usage = isset($response_data['usageMetadata']['totalTokenCount'])
        ? $response_data['usageMetadata']['totalTokenCount']
        : "Unknown";

    // Handle Errors
    if (isset($response_data['error'])) {
        $error_message = $response_data['error']['message'];
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Google Gemini AI Chat</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        textarea, input, button { margin-top: 10px; display: block; }
        .response-box { margin-top: 20px; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9; }
    </style>
</head>
<body>

    <h2>Google Gemini AI Chat</h2>
    
    <form method="POST">
        <textarea name="user_input" placeholder="Enter your message..." rows="4" cols="50"></textarea>
        <button type="submit">Send</button>
    </form>

    <?php if (!empty($user_input)): ?>
        <div class="response-box">
            <h3>AI Response:</h3>
            <p><?php echo nl2br(htmlspecialchars($ai_response)); ?></p>

            <h3>API Usage:</h3>
            <p><strong>Tokens Used:</strong> <?php echo htmlspecialchars($token_usage); ?></p>

            <?php if (!empty($error_message)): ?>
                <p style="color: red;"><strong>Error:</strong> <?php echo htmlspecialchars($error_message); ?></p>
            <?php endif; ?>
        </div>
    <?php endif; ?>

</body>
</html>
