<?php 
// Check if the theme is being set through the form 
if ($_SERVER["REQUEST_METHOD"] == "POST") { 
    // Set a cookie to store the user's preferred theme (expires in 30 days) 
    $theme = $_POST['theme']; 
    setcookie("user_theme", $theme, time() + (86400 * 30), "/"); // 86400 = 1 day 
    // Redirect to the same page to apply the theme immediately 
    header("Location: themeSample.php"); 
    exit(); 
} 
 
// Retrieve the user's theme from the cookie if it's set 
$user_theme = isset($_COOKIE['user_theme']) ? $_COOKIE['user_theme'] : 'light'; // Default to 'light' mode 
?> 
 
<!DOCTYPE html> 
<html lang="en"> 
    <head> 
        <meta charset="UTF-8"> 
        <meta name="viewport" content="width=device-width, initialscale=1.0"> 
        <title>Set Preferred Theme</title> 
        <style> 
            body { 
                font-family: Arial, sans-serif; 
                background-color: <?php echo $user_theme == 'dark' ? '#333' : '#fff'; ?>; 
                color: <?php echo $user_theme == 'dark' ? '#fff' : '#000'; ?>; 
            } 
            .container { 
                margin: 50px auto; 
                text-align: center; 
            } 
            select { 
                padding: 10px; 
                font-size: 16px; 
            } 
        </style> 
    </head> 
    <body> 
        <div class="container"> 
            <h1>Select Your Preferred Theme</h1> 
    
            <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"> 
                <label for="theme">Choose Theme:</label> 
                <select name="theme" id="theme"> 
                    <option value="light" <?php echo $user_theme == 'light' ? 'selected' : ''; ?>>Light Mode</option> 
                    <option value="dark" <?php echo $user_theme == 'dark' ? 'selected' : ''; ?>>Dark Mode</option> 
                </select> 
                <br><br> 
                <input type="submit" value="Save Theme"> 
            </form> 
            <p>Current Theme: <strong><?php echo ucfirst($user_theme); ?> Mode</strong></p> 
        </div> 
    </body> 
</html>