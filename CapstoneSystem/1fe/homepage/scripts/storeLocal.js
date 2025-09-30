
// This script will run on homepage/index.html after login.

import { decrypt } from './decryptor.js';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    let userDataEncoded = urlParams.get('userData');
    let decryptionKeysEncoded = urlParams.get('dk');

    let userData = null;
    let decryptionKeys = null;

    if (userDataEncoded && decryptionKeysEncoded) {
        // Data present in URL, parse and store it
        try {
            userData = JSON.parse(decodeURIComponent(userDataEncoded));
            decryptionKeys = JSON.parse(decodeURIComponent(decryptionKeysEncoded));

            // Store in localStorage for future use
            localStorage.setItem('encryptedUserData', userDataEncoded);
            localStorage.setItem('encryptionKeys', decryptionKeysEncoded);

            // Clean URL parameters
            urlParams.delete('userData');
            urlParams.delete('dk');
            const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
            window.history.replaceState(null, '', newUrl);

        } catch (e) {
            console.error('Error parsing user data or decryption keys from URL:', e);
            // Fallback to localStorage if URL parsing fails
            userDataEncoded = localStorage.getItem('encryptedUserData');
            decryptionKeysEncoded = localStorage.getItem('encryptionKeys');
        }
    } else {
        // Data not in URL, try to retrieve from localStorage
        userDataEncoded = localStorage.getItem('encryptedUserData');
        decryptionKeysEncoded = localStorage.getItem('encryptionKeys');
    }

    if (userDataEncoded && decryptionKeysEncoded) {
        try {
            // If data was not from URL (i.e., from localStorage), it needs to be parsed
            if (!userData) {
                userData = JSON.parse(decodeURIComponent(userDataEncoded));
            }
            if (!decryptionKeys) {
                decryptionKeys = JSON.parse(decodeURIComponent(decryptionKeysEncoded));
            }

            console.log('User Data:', userData);
            console.log('Parsed Decryption Keys:', decryptionKeys);

            if (!decryptionKeys) {
                console.error('Decryption keys not found. Cannot decrypt user data.');
                window.location.href = '../../1fe/login/'; // Redirect to login page
                return;
            }

            function recursiveDecryptUserData(data, keys) {
                const decryptedData = {};
                for (const encryptedKey in data) {
                    const decryptedKey = decrypt(encryptedKey, keys);
                    const value = data[encryptedKey];

                    if (decryptedKey === 'username' && typeof value === 'string') {
                        const [encryptedUsernameValue, jsonKeys] = value.split('---10---');
                        if (encryptedUsernameValue && jsonKeys) {
                            try {
                                const usernameSpecificKeys = JSON.parse(jsonKeys);
                                decryptedData[decryptedKey] = decrypt(encryptedUsernameValue, usernameSpecificKeys);
                            } catch (e) {
                                console.error('Error parsing username-specific decryption keys:', e);
                                decryptedData[decryptedKey] = value; // Fallback to raw value if parsing fails
                            }
                        } else {
                            decryptedData[decryptedKey] = decrypt(value, keys);
                        }
                    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                        decryptedData[decryptedKey] = recursiveDecryptUserData(value, keys);
                    } else if (Array.isArray(value)) {
                        decryptedData[decryptedKey] = value.map(item => {
                            if (typeof item === 'object' && item !== null) {
                                return recursiveDecryptUserData(item, keys);
                            } else if (typeof item === 'string') {
                                return decrypt(item, keys);
                            } else {
                                return item;
                            }
                        });
                    } else if (typeof value === 'string') {
                        decryptedData[decryptedKey] = decrypt(value, keys);
                    } else {
                        decryptedData[decryptedKey] = value;
                    }
                }
                return decryptedData;
            }

            const decryptedUserData = recursiveDecryptUserData(userData, decryptionKeys);
            console.log('Decrypted User Data:', decryptedUserData);

            // localStorage.setItem('decryptedUserData', JSON.stringify(decryptedUserData)); // Removed: Do not store decrypted user data
            // The encryptionKeys are already in localStorage from initial processing or from retrieval attempt

        } catch (e) {
            console.error('Error processing user data or decryption keys:', e);
            window.location.href = '../../1fe/login/'; // Redirect to login page on error
        }
    } else {
        console.log('No user data or decryption keys found in URL or localStorage. Redirecting to login.');
        window.location.href = '../../1fe/login/'; // Redirect to login page
    }
});
