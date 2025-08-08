<!DOCTYPE html>
<html>
    <head>
        <style>
            body{
                margin: 0;
                max-width: 1366px;
            }
            .background img{
                width: 100%;
                height: 99vh;
                object-fit: contain;
                object-position: center;
                
            }
            /* .main{
                background-color: rgb(64, 0, 255);
            } */
            .background{
                position: absolute;
                
                width: 100%;
            }
            .character{
                display: flex;
                background-color: rgba(255, 209, 209, 0.74);
                position: absolute;
                bottom: 0;
                width: 70%;
                margin-left: 200px;
                border:2px solid black;
            }
            .character img{
                width: 12%;
                object-fit: contain;
                object-position: center;
            }
            .character p{
                font-size: 12px;
                padding: 5px;
                margin: 0;
                color: rgb(0, 0, 0);
                font-family: sans-serif;
            }
            .dialog{
                background-color: bisque;
                height: 50px;
                position: absolute;
                width: 400px;
                height: auto;
                margin-left: 200px;
                margin-top: 30px;
                padding: 20px;
                border: 1px solid grey;
            }
            .textarea{
                display: flex;
                position: absolute;
                width: 100%;
                height: 100%;
                
                flex-direction: column;
                align-items: end;
                margin-right: 200px;
            }
            textarea{
                height: 300px;
                width: 400px;
                margin-top: 30px;
                margin-right: 200px;

            }
            button{
                width: 406px;
                margin-right: 200px;
            }


            /* from ai sample */
            .response-box { margin-top: 20px; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9; }
            .loading { display: none; font-style: italic; color: gray; }
        </style>
    </head>
    <body>
        <div class="main">
            <div class="background">
                <img src="https://64.media.tumblr.com/6a4b8f051bd8fbcf6f0441fdee2156b3/09a454f8a0266891-31/s1280x620/e697f3e386fe767ad3962f83fa755543f3b67a63.gif">
            </div>
            <div class="character">
                <p>sample<br> character</p>
                <img src="https://sparksight.com/wp-content/uploads/2015/04/greg_idle_gif.gif">
                <p><b>RESPONSE:</b></p>
                <p id="response">Hintayin ko yung code mo...</p>
                <p id="loading" class="loading">⏳ Generating response...</p>
            </div>
            <div class="dialog">
                <b>Objective</b><br>
                Create a Java program that simulates a 
                train as a class using Object-Oriented Programming (OOP) concepts.
                 The program should include encapsulation, attributes, 
                 constructors, and methods
            </div>
            <div class="dialog" style="margin-top: 180px;">
                                
                Attributes:<br>

                Defined as private variables (trainNumber, speed, capacity, isMoving).<br><br>
                Constructor:<br>

                Initializes the train with a train number and capacity.<br><br>
                Methods:<br>

                startTrain(int newSpeed): Starts the train.<br>
                stopTrain(): Stops the train.<br>
                getSpeed(), getTrainNumber(), getCapacity(): Returns train details.
            </div>
            <div class="textarea">
                <textarea name="input" id="userInput">paste your code here...</textarea>
                <button id="sendBtn" onclick="sendMessage()">Send</button>
            </div>
            
            
        </div>
        
    </body>
    <script>
        async function sendMessage() {
            const userInput = document.getElementById("userInput").value;
            const responseBox = document.getElementById("response");
            const loadingIndicator = document.getElementById("loading");
            const sendButton = document.getElementById("sendBtn");

            if (!userInput.trim()) {
                alert("Please enter a message.");
                return;
            }
            // Show loading indicator and disable button
            loadingIndicator.style.display = "block";
            sendButton.disabled = true;
            responseBox.textContent = ""; // Clear previous response

            const userInputNew = userInput;
            const res = await fetch("gemini.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userInputNew })
            });

            const data = await res.json();
            console.log("API Response:", data);

            // Hide loading indicator and enable button
            loadingIndicator.style.display = "none";
            sendButton.disabled = false;

            // Display response in HTML
            if (data.candidates && data.candidates[0].content.parts[0].text) {
                responseBox.textContent = data.candidates[0].content.parts[0].text;
            } else {
                responseBox.textContent = "Error: No valid response from Gemini API.";
            }
        }


    </script>
</html>