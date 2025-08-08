<?php
if (isset($_POST['userInput'])) {
    // Get the value from the POST request
    $userInput = $_POST['userInput'];
    
    // Process the input (e.g., echo it back)
    echo "<br>You entered: " . htmlspecialchars($userInput)."<br>";
} else {
    echo "No data received.";
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Submission</title>
    
</head>
<body>

    <p id="display"></p>
    <label for="userInput">Enter something:</label>
    <input type="text" id="userInput" name="userInput">
    
    <form id="myForm" action="" method="POST" style="display:none;">
        <input type="text" id="hiddenInput" name="userInput">
    </form>
    <button type="button" onclick="submitForm()">Submit</button>
    

    
    <script>
        function submitForm() {
            var inputData = document.getElementById("userInput").value;
            // Set the value of the hidden input field
            document.getElementById("hiddenInput").value = inputData;
            // Submit the form
            document.getElementById("myForm").submit();
        }


        // Get the input field and display element
        var inputField = document.getElementById("userInput");
        var display = document.getElementById("display");

        // Add an event listener for the 'input' event
        inputField.addEventListener("input", function() {
            // Get the current value of the input field
            var inputValue = inputField.value;

            if(inputValue!=""){
                // Display the input value in the <p> element
                display.innerText = "You entered: " + inputValue;
            }else{
                display.innerText = "";
            }
        });
    </script>
</body>
</html>