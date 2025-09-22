<?php

// Database connection
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hid1 = $_POST['username'] ?? '';
    $hid2 = $_POST['pass1'] ?? '';
    $hid3 = $_POST['pass2'] ?? '';
    $hid4 = $_POST['submit'] ?? '';

    //SIGNUP
    if ($hid4 == 'signup') {
        if($hid2 == $hid3){
            // Check if the username already exists
            $checkStmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
            $checkStmt->bind_param("s", $hid1);
            $checkStmt->execute();
            $checkStmt->bind_result($count);
            $checkStmt->fetch();
            $checkStmt->close();

            if ($count > 0) {
                // Username already exists
                echo "<script>alert('Username already exists. Please choose another one.'); window.location.href='signup/';</script>";
            } else {
                // Prepare the comment to prevent SQL injection
                $hid1 = mysqli_real_escape_string($conn, $hid1);
                $hid2 = mysqli_real_escape_string($conn, $hid2);
                $hid2_2 = password_hash($hid2, PASSWORD_DEFAULT);
                
                $stmt = $conn->prepare("INSERT INTO users (username, password, created_at) VALUES (?, ?, NOW())");
                $stmt->bind_param("ss", $hid1, $hid2_2);

                if ($stmt->execute()) {
                    echo "<script>alert('Account Added Successfully'); window.location.href='login/';</script>";
                    
                    // Get the ID of the newly inserted user
                    $newUserId = $conn->insert_id;

                    // Insert default values into rewards table
                    $stmtRewards = $conn->prepare("INSERT INTO rewards (userId, tier, badges) VALUES (?, ?, ?)");
                    $defaultTier = '[""]';
                    $defaultBadges = '["java",""]';
                    $stmtRewards->bind_param("iss", $newUserId, $defaultTier, $defaultBadges);
                    $stmtRewards->execute();
                    $stmtRewards->close();

                    // Insert default values into saving table
                    $stmtSaving = $conn->prepare("INSERT INTO saving (userId, sceneNum) VALUES (?, ?)");
                    $defaultSceneNum = '["java","","",""]';
                    $stmtSaving->bind_param("is", $newUserId, $defaultSceneNum);
                    $stmtSaving->execute();
                    $stmtSaving->close();

                    // Insert default values into progress table
                    $stmtProgress = $conn->prepare("INSERT INTO progress (userId, storymode, challenges) VALUES (?, ?, ?)");
                    $defaultProgressJson = '[0,0,0,"java",""]';
                    $stmtProgress->bind_param("iss", $newUserId, $defaultProgressJson, $defaultProgressJson);
                    $stmtProgress->execute();
                    $newProgressId = $conn->insert_id; // Get the ID of the newly inserted progress
                    $stmtProgress->close();

                    // Insert default values into performance table
                    $stmtPerformance = $conn->prepare("INSERT INTO performance (userId, progressId, accuracy, efficiency, readability, time, success, failed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                    $defaultJsonArray = '[0,0,0]';
                    $stmtPerformance->bind_param("isssssss", $newUserId, $newProgressId, $defaultJsonArray, $defaultJsonArray, $defaultJsonArray, $defaultJsonArray, $defaultJsonArray, $defaultJsonArray);
                    $stmtPerformance->execute();
                    $stmtPerformance->close();

                    // Insert default values into settings table
                    $stmtSettings = $conn->prepare("INSERT INTO settings (userId, controls, volume) VALUES (?, ?, ?)");
                    $defaultControls = '["w","a","s","d","click"]';
                    $defaultVolume = 50;
                    $stmtSettings->bind_param("isi", $newUserId, $defaultControls, $defaultVolume);
                    $stmtSettings->execute();
                    $stmtSettings->close();
                } else {
                    echo "<script>alert('Failed to add account, please try again later'); window.location.href='signup/'; </script>";
                }
                $stmt->close();
            }
        }else{
            echo "<script>alert('Passwords do not match'); window.location.href='signup/'; </script>";
        }
    } 
    
    //LOGIN
    else if ($hid4 == 'log') {

        // Prepare the comment to prevent SQL injection
        $hid1 = mysqli_real_escape_string($conn, $hid1);
        
        // Query to get the hashed password from the database
        $stmt = $conn->prepare("SELECT id, password, programmingLanguage FROM users WHERE username = ?");
        $stmt->bind_param("s", $hid1);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($userID, $hashedPassword, $userProgrammingLanguage);
            $stmt->fetch();

            // Verify the password
            if (password_verify($hid2, $hashedPassword)) {
                session_start();
                $_SESSION['username'] = $hid1; //SAVE USERNAME IN SESSION
                $_SESSION['userID'] = $userID; //SAVE USERID IN SESSION
                $_SESSION['user_programming_language'] = $userProgrammingLanguage; // SAVE PROGRAMMING LANGUAGE IN SESSION
                
                // Get PHP session ID
                $phpSessionId = session_id();

                // Save it to DB
                $update = $conn->prepare("UPDATE users SET session = ? WHERE username = ?");
                $update->bind_param("ss", $phpSessionId, $hid1);
                $update->execute();


                echo "<script>alert('Logged in successfully'); window.location.href='homepage/'; </script>";
            } else {
                echo "<script>alert('Invalid password'); window.location.href='login/'; </script>";
            }
        } else {
            echo "<script>alert('Invalid username'); window.location.href='login/'; </script>";
        }

        $stmt->close();
    }
}

mysqli_close($conn);
?>
