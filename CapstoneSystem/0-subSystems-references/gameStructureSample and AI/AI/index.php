<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <title>Notes</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #121212;
            color: rgb(228, 228, 228);
        }

        .container {
            width: 100%;
            background: #1e1e1e;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        h2 {
            text-align: center;
            margin-bottom: 15px;
        }

        textarea {
            width: 100%;
            height: 200px;
            padding: 10px;
            border: 1px solid #333;
            border-radius: 8px;
            background: #262626;
            color: white;
            outline: none;
        }

        button {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            background:rgb(30, 65, 31);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: 0.3s;
        }

        button:hover {
            background:rgb(12, 27, 13);
        }

        .loading {
            text-align: center;
            font-style: italic;
            color: #bbb;
            display: none;
            margin-top: 10px;
        }

        .response-box {
            margin-top: 20px;
            padding: 25px;
            background:rgb(0, 0, 0);
            border-radius: 8px;
        }

        ul {
            padding-left: 20px;
        }

        li {
            margin-bottom: 5px;
        }
        strong{
            color:rgb(63, 188, 255);
        }
        pre {
            background: #222;
            color: #0f0;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
            white-space: pre-wrap;
        }
        code {
            font-family: monospace;
        }
        h3 {
            color:rgb(125, 102, 50);
            margin-top: 15px;
        }
        p {
            margin-top: 10px;
            line-height: 1.5;
        }
        @media (min-width:600px) {
            .response{
                font-size:2.5vw;
            }
        }
        @media (min-width:1000px) {
            .response{
                font-size:2vw;
            }
        }
        @media (min-width:1500px) {
            .response{
                font-size:1vw;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- <h2>Chat with Gemini AI</h2> -->
        <textarea id="userInput"></textarea>
        <button id="sendBtn" onclick="sendMessage()">Send</button>
        <p id="loading" class="loading">Generating response...</p>
        
        <div class="response-box">
            <h3>Response:</h3><br>
            <div id="response" class="response">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
            <br>
            <!-- <h3>API Usage:</h3>
            <p><strong>Tokens Used:</strong> <span id="tokensUsed">-</span></p>
            <p><strong>Available Tokens:</strong> <span id="tokensAvailable">-</span></p> -->
        </div>
    </div>
    
    <script>
        document.getElementById("userInput").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevents a new line in the input field
                sendMessage();
            }
        });

        async function sendMessage() {
            const userInput = document.getElementById("userInput").value;
            const responseBox = document.getElementById("response");
            const loadingIndicator = document.getElementById("loading");
            const sendButton = document.getElementById("sendBtn");

            if (!userInput.trim()) {
                alert("Please enter a message.");
                return;
            }

            loadingIndicator.style.display = "block";
            sendButton.disabled = true;
            responseBox.innerHTML = "";

            const res = await fetch("gemini.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userInput })
            });

            const data = await res.json();
            console.log("API Response:", data);

            loadingIndicator.style.display = "none";
            sendButton.disabled = false;

            if (data.candidates && data.candidates[0].content.parts[0].text) {
                let responseText = data.candidates[0].content.parts[0].text;

                // Use Marked.js to parse and render markdown correctly
                responseBox.innerHTML = marked.parse(responseText);
            } else {
                responseBox.innerHTML = "<span style='color:red;'>Error: No valid response from Gemini API.</span>";
            }
        }


    </script>
</body>
</html>
