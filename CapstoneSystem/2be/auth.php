<?php

include 'decryptor.php';
include 'encryptor_utility.php';

// Database connection
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hid1 = $_POST['hid1'] ?? '';
    $hid2 = $_POST['hid2'] ?? '';
    $hid3 = $_POST['hid3'] ?? '';
    $hid4 = $_POST['actionType'] ?? '';
    $usernameKeys = json_decode($_POST['usernameKeys'] ?? '[]');
    $passwordKeys = json_decode($_POST['passwordKeys'] ?? '[]');
    $signupPasswordKeys = json_decode($_POST['passwordKeys'] ?? '[]'); // For signup action

    // SIGNUP
    if ($hid4 == 'signup') {
        if ($hid2 == $hid3) {
            // Check if the username already exists
            $checkStmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
            $checkStmt->bind_param("s", $hid1);
            $checkStmt->execute();
            $checkStmt->bind_result($count);
            $checkStmt->fetch();
            $checkStmt->close();

            if ($count > 0) {
                // Username already exists
                echo "<script>alert('Username already exists. Please choose another one.'); window.location.href='../1fe/signup/';</script>";
            } else {
                // Prepare the comment to prevent SQL injection
                $hid1 = mysqli_real_escape_string($conn, $hid1);
                $hid2 = mysqli_real_escape_string($conn, $hid2);
                
                // Decrypt username and password
                // $decryptedUsername = customDecrypt($hid1, $usernameKeys);
                $decryptedPassword = customDecrypt($hid2, $passwordKeys);
                
                $hid2_2 = password_hash($decryptedPassword, PASSWORD_DEFAULT);

                $stmt = $conn->prepare(
                    "INSERT INTO users (username, password, created_at) VALUES (?, ?, NOW())"
                );
                $stmt->bind_param("ss", $hid1, $hid2_2);

                if ($stmt->execute()) {
                    // Get the ID of the newly inserted user
                    $newUserId = $conn->insert_id;

                    // Insert default values into rewards table
                    $stmtRewards = $conn->prepare(
                        "INSERT INTO rewards (userId, tier, badges) VALUES (?, ?, ?)"
                    );
                    $defaultTier = '[""]';
                    $defaultBadges = '["java",""]';
                    $stmtRewards->bind_param("iss", $newUserId, $defaultTier, $defaultBadges);
                    $stmtRewards->execute();
                    $stmtRewards->close();

                    // Insert default values into saving table
                    $stmtSaving = $conn->prepare(
                        "INSERT INTO saving (userId, sceneNum) VALUES (?, ?)"
                    );
                    $defaultSceneNum = '["java","","",""]';
                    $stmtSaving->bind_param("is", $newUserId, $defaultSceneNum);
                    $stmtSaving->execute();
                    $stmtSaving->close();

                    // Insert default values into progress table
                    $stmtProgress = $conn->prepare(
                        "INSERT INTO progress (userId, storymode, challenges) VALUES (?, ?, ?)"
                    );
                    $defaultProgressJson = '[0,0,0,"java",""]';
                    $stmtProgress->bind_param("iss", $newUserId, $defaultProgressJson, $defaultProgressJson);
                    $stmtProgress->execute();
                    $newProgressId = $conn->insert_id; // Get the ID of the newly inserted progress
                    $stmtProgress->close();

                    // Insert default values into performance table
                    $stmtPerformance = $conn->prepare(
                        "INSERT INTO performance (userId, progressId, accuracy, efficiency, readability, time, success, failed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
                    );
                    $defaultJsonArray = '[0,0,0]';
                    $stmtPerformance->bind_param(
                        "isssssss", 
                        $newUserId, 
                        $newProgressId, 
                        $defaultJsonArray, 
                        $defaultJsonArray, 
                        $defaultJsonArray, 
                        $defaultJsonArray, 
                        $defaultJsonArray, 
                        $defaultJsonArray
                    );
                    $stmtPerformance->execute();
                    $stmtPerformance->close();

                    // Insert default values into settings table
                    $stmtSettings = $conn->prepare(
                        "INSERT INTO settings (userId, controls, volume) VALUES (?, ?, ?)"
                    );
                    $defaultControls = '["w","a","s","d","click"]';
                    $defaultVolume = 50;
                    $stmtSettings->bind_param("isi", $newUserId, $defaultControls, $defaultVolume);
                    $stmtSettings->execute();
                    $stmtSettings->close();

                    // After successful signup, redirect to homepage with userData and decryption keys
                    session_start();
                    $_SESSION['username'] = $hid1; // SAVE USERNAME IN SESSION
                    $_SESSION['userID'] = $newUserId; // SAVE USERID IN SESSION
                    $_SESSION['user_programming_language'] = "java"; // Default language for new users
                    
                    $phpSessionId = session_id();
                    $encKeyJson = json_encode($passwordKeys);
                    $updateEncKeyStmt = $conn->prepare("UPDATE users SET encKey = ?, session = ? WHERE id = ?");
                    $updateEncKeyStmt->bind_param("ssi", $encKeyJson, $phpSessionId, $newUserId);
                    $updateEncKeyStmt->execute();
                    $updateEncKeyStmt->close();

                    $userData = [
                        'id' => $newUserId,
                        'username' => $hid1,
                        'programmingLanguage' => "java",
                        'session' => $phpSessionId,
                        'rewards' => json_decode($defaultTier),
                        'badges' => json_decode($defaultBadges),
                        'saving' => json_decode($defaultSceneNum),
                        'progress' => json_decode($defaultProgressJson),
                        'settings' => [
                            'controls' => json_decode($defaultControls),
                            'volume' => $defaultVolume,
                        ],
                        'performance' => [
                            'accuracy' => json_decode($defaultJsonArray),
                            'efficiency' => json_decode($defaultJsonArray),
                            'readability' => json_decode($defaultJsonArray),
                            'time' => json_decode($defaultJsonArray),
                            'success' => json_decode($defaultJsonArray),
                            'failed' => json_decode($defaultJsonArray),
                        ],
                    ];
                    
                    $encryptedUserData = recursiveEncryptUserData($userData, $passwordKeys);
                    $encodedUserData = urlencode(json_encode($encryptedUserData));
                    $encodedDecryptionKeys = urlencode(json_encode($passwordKeys));

                    // sleep(2); // Introduce a 2-second delay
                    echo "<script>alert('Account Added Successfully'); window.location.href='../1fe/homepage/index.html?userData=" . $encodedUserData . "&dk=" . $encodedDecryptionKeys . "'; </script>";
                    
                } else {
                    echo "<script>alert('Failed to add account, please try again later'); window.location.href='../1fe/signup/'; </script>";
                }
                $stmt->close();
            }
        } else {
            echo "<script>alert('Passwords do not match'); window.location.href='../1fe/signup/'; </script>";
        }
    } 
    
    // LOGIN
    else if ($hid4 == 'log') {

        // Decrypt username and password
        $decryptedUsername = customDecrypt($hid1, $usernameKeys);
        $decryptedPassword = customDecrypt($hid2, $passwordKeys);

        // Prepare the comment to prevent SQL injection
        $decryptedUsername = mysqli_real_escape_string($conn, $decryptedUsername);
        
        // Query to get the hashed password and encryption key from the database
        $stmt = $conn->prepare(
            "SELECT id, password, encKey, programmingLanguage FROM users WHERE username = ?"
        );
        $stmt->bind_param("s", $decryptedUsername);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($userID, $hashedPassword, $dbEncKey, $userProgrammingLanguage);
            $stmt->fetch();

            $keysToUseForDecryption = $passwordKeys;
            // Old logic to determine decryption keys:
            // if (is_null($dbEncKey) || empty($dbEncKey)) {
            //     // First time login, use the keys sent from the frontend
            //     $keysToUseForDecryption = $passwordKeys;
            // } else {
            //     // Subsequent login, use the keys stored in the database
            //     $keysToUseForDecryption = json_decode($dbEncKey);
            // }

            // Verify the password
            if (password_verify($decryptedPassword, $hashedPassword)) {
                session_start();
                $_SESSION['username'] = $decryptedUsername; // SAVE USERNAME IN SESSION
                $_SESSION['userID'] = $userID; // SAVE USERID IN SESSION
                $_SESSION['user_programming_language'] = $userProgrammingLanguage; // SAVE PROGRAMMING LANGUAGE IN SESSION
                
                // Get PHP session ID
                $phpSessionId = session_id();

                // If it was a first-time login, save the encKey to the database
                $encKeyJson = json_encode($passwordKeys);
                $updateEncKeyStmt = $conn->prepare("UPDATE users SET encKey = ? WHERE username = ?");
                $updateEncKeyStmt->bind_param("ss", $encKeyJson, $decryptedUsername);
                $updateEncKeyStmt->execute();
                $updateEncKeyStmt->close();

                // Save session ID to DB
                $update = $conn->prepare("UPDATE users SET session = ? WHERE username = ?");
                $update->bind_param("ss", $phpSessionId, $decryptedUsername);
                $update->execute();

                function recursiveEncryptUserData($data, $keys) {
                    $encryptedData = [];
                    foreach ($data as $key => $value) {
                        $processedKey = is_string($key) ? customEncrypt($key, $keys) : $key;
                        if ($key === 'username' && is_string($value)) {
                            $encryptedValue = customEncrypt($value, $keys);
                            $jsonKeys = json_encode($keys);
                            $encryptedData[$processedKey] = $encryptedValue . '---10---' . $jsonKeys;
                        } elseif (is_array($value) || is_object($value)) {
                            $encryptedData[$processedKey] = recursiveEncryptUserData($value, $keys);
                        } elseif (is_string($value)) {
                            $encryptedData[$processedKey] = customEncrypt($value, $keys);
                        } else {
                            $encryptedData[$processedKey] = $value;
                        }
                    }
                    return $encryptedData;
                }

                // --- Fetch all user-related data ---
                $userData = [
                    'id' => $userID,
                    'username' => $decryptedUsername,
                    'programmingLanguage' => $userProgrammingLanguage,
                    'session' => $phpSessionId,
                ];

                // Fetch from USERS table
                $stmtUser = $conn->prepare("SELECT programmingLanguage FROM users WHERE id = ?");
                $stmtUser->bind_param("i", $userID);
                $stmtUser->execute();
                $stmtUser->bind_result($userProgrammingLanguage);
                $stmtUser->fetch();
                $stmtUser->close();
                $userData['programmingLanguage'] = $userProgrammingLanguage;

                // Fetch from REWARDS table
                $stmtRewards = $conn->prepare("SELECT tier, badges FROM rewards WHERE userId = ?");
                $stmtRewards->bind_param("i", $userID);
                $stmtRewards->execute();
                $stmtRewards->bind_result($tier, $badges);
                $stmtRewards->fetch();
                $stmtRewards->close();
                $userData['rewards'] = [
                    'tier' => json_decode($tier),
                    'badges' => json_decode($badges),
                ];

                // Fetch from SAVING table
                $stmtSaving = $conn->prepare("SELECT sceneNum FROM saving WHERE userId = ?");
                $stmtSaving->bind_param("i", $userID);
                $stmtSaving->execute();
                $stmtSaving->bind_result($sceneNum);
                $stmtSaving->fetch();
                $stmtSaving->close();
                $userData['saving'] = [
                    'sceneNum' => json_decode($sceneNum),
                ];

                // Fetch from PROGRESS table
                $stmtProgress = $conn->prepare("SELECT storymode, challenges FROM progress WHERE userId = ?");
                $stmtProgress->bind_param("i", $userID);
                $stmtProgress->execute();
                $stmtProgress->bind_result($storymode, $challenges);
                $stmtProgress->fetch();
                $stmtProgress->close();
                $userData['progress'] = [
                    'storymode' => json_decode($storymode),
                    'challenges' => json_decode($challenges),
                ];

                // Fetch from SETTINGS table
                $stmtSettings = $conn->prepare("SELECT controls, volume FROM settings WHERE userId = ?");
                $stmtSettings->bind_param("i", $userID);
                $stmtSettings->execute();
                $stmtSettings->bind_result($controls, $volume);
                $stmtSettings->fetch();
                $stmtSettings->close();
                $userData['settings'] = [
                    'controls' => json_decode($controls),
                    'volume' => $volume,
                ];

                // Fetch from PERFORMANCE table (using userId instead of progressId)
                $stmtPerformance = $conn->prepare("SELECT accuracy, efficiency, readability, time, success, failed FROM performance WHERE userId = ?");
                $stmtPerformance->bind_param("i", $userID);
                $stmtPerformance->execute();
                $stmtPerformance->bind_result($accuracy, $efficiency, $readability, $time, $success, $failed);
                $stmtPerformance->fetch();
                $stmtPerformance->close();
                $userData['performance'] = [
                    'accuracy' => json_decode($accuracy),
                    'efficiency' => json_decode($efficiency),
                    'readability' => json_decode($readability),
                    'time' => json_decode($time),
                    'success' => json_decode($success),
                    'failed' => json_decode($failed),
                ];

                // Encode all user data into a JSON string and URL-encode it
                $encryptedUserData = recursiveEncryptUserData($userData, $passwordKeys);
                $encodedUserData = urlencode(json_encode($encryptedUserData));
                $encodedDecryptionKeys = urlencode(json_encode($keysToUseForDecryption));

                sleep(2); // Introduce a 2-second delay
                echo "<script>alert('Logged in successfully'); window.location.href='../1fe/homepage/index.html?userData=" . $encodedUserData . "&dk=" . $encodedDecryptionKeys . "'; </script>";
            } else {
                echo "<script>alert('Invalid password'); window.location.href='../1fe/login/'; </script>";
            }
        } else {
            echo "<script>alert('Invalid username'); window.location.href='../1fe/login/'; </script>";
        }

        $stmt->close();
    }
}

mysqli_close($conn);

?>
