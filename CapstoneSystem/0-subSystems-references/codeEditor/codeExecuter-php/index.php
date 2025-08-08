<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Checker</title>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif;  padding: 20px; }
        textarea { width: 90%; height: 150px; margin: 10px 0; font-size: 16px; }
        button { padding: 10px 15px; font-size: 18px; cursor: pointer; }
        p { font-size: 18px; font-weight: bold; }
        .success { color: green; }
        .error { color: red; }
    </style>
</head>
<body>

    <h1>Code Checker</h1>
    <textarea id="codeInput" placeholder="Enter your Java code here..."></textarea><br>
    <button onclick="checkCode()">Check Code</button>
    <p id="result"></p>

    <script>
        async function checkCode() {
            const inputCode = document.getElementById("codeInput").value;
            const language = "java"; // Change to "cpp" or "csharp" for other languages

            document.getElementById("result").innerHTML = "Checking...";

            const apiUrl = "piston_proxy.php"; // Call PHP backend instead of Piston API

            const requestData = {
                language: language,
                code: inputCode
            };

            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestData)
                });

                const result = await response.json();

                if (result.run.stderr) {
                    document.getElementById("result").innerHTML = `<span class="error">❌ Error: ${result.run.stderr}</span>`;
                } else {
                    document.getElementById("result").innerHTML = `<span class="success">✅ Output: ${result.run.stdout}</span>`;
                }
            } catch (error) {
                console.error(error);
                document.getElementById("result").innerHTML = `<span class="error">❌ Error checking code!</span>`;
            }
        }

    </script>

</body>
</html>
