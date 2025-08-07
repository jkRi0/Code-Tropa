<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Translator (English ↔ Tagalog)</title>
</head>
<body>
    <h1>AI Translator (English ↔ Tagalog)</h1>

    <textarea id="inputText" placeholder="Enter text..."></textarea><br>

    <label for="direction">Translate:</label>
    <select id="direction">
        <option value="en-to-tl">English → Tagalog</option>
        <option value="tl-to-en">Tagalog → English</option>
    </select>

    <button onclick="translateText()">Translate</button>

    <h3>Translation:</h3>
    <p id="outputText"></p>

    <script>
        async function translateText() {
            const inputText = document.getElementById("inputText").value;
            const direction = document.getElementById("direction").value;

            document.getElementById("outputText").innerText = "Translating...";

            const response = await fetch("proxy.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ text: inputText, direction: direction }),
            });

            try {
                const data = await response.json();
                if (data.error) {
                    document.getElementById("outputText").innerText = "Translation failed. " + data.error;
                } else {
                    document.getElementById("outputText").innerText = data[0].translation_text;
                }
            } catch (e) {
                document.getElementById("outputText").innerText = "Translation failed. Please try again.";
            }
        }
    </script>
</body>
</html>
