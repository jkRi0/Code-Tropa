
// This script will run on homepage/index.html after login.

import { decrypt } from './decryptor.js';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userDataEncoded = urlParams.get('userData');

    if (userDataEncoded) {
        try {
            const userData = JSON.parse(decodeURIComponent(userDataEncoded));

            // You will need to get the decryption keys from a secure source.
            // For demonstration, we'll use a placeholder. In a real application, ensure secure key management.
            const decryptionKeys = JSON.parse(localStorage.getItem('encryptionKeys')); // Example: retrieve from localStorage

            function recursiveDecryptUserData(data, keys) {
                const decryptedData = {};
                for (const encryptedKey in data) {
                    const decryptedKey = decrypt(encryptedKey, keys);
                    const value = data[encryptedKey];

                    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                        decryptedData[decryptedKey] = recursiveDecryptUserData(value, keys);
                    } else if (Array.isArray(value)) {
                        // If it's an array, decrypt each string element
                        decryptedData[decryptedKey] = value.map(item => typeof item === 'string' ? decrypt(item, keys) : item);
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

            // Optionally, remove the userData parameter from the URL to keep it clean
            urlParams.delete('userData');
            const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
            window.history.replaceState(null, '', newUrl);

        } catch (e) {
            console.error('Error parsing user data from URL:', e);
        }
    }
});
