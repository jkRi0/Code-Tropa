
// This script will run on homepage/index.html after login.

import { decrypt } from './decryptor.js';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userDataEncoded = urlParams.get('userData');

    if (userDataEncoded) {
        console.log('Raw userDataEncoded from URL:', userDataEncoded);
        try {
            const userData = JSON.parse(decodeURIComponent(userDataEncoded));
            console.log('User Data:', userData);

            console.log('Value of localStorage.getItem("encryptionKeys") before parsing:', localStorage.getItem('encryptionKeys'));
            const decryptionKeys = JSON.parse(localStorage.getItem('encryptionKeys')); // Example: retrieve from localStorage
            console.log('Parsed Decryption Keys:', decryptionKeys);

            if (!decryptionKeys) {
                console.error('Encryption keys not found in localStorage. Cannot decrypt user data.');
                return;
            }

            function recursiveDecryptUserData(data, keys) {
                const decryptedData = {};
                for (const encryptedKey in data) {
                    const decryptedKey = decrypt(encryptedKey, keys);
                    const value = data[encryptedKey];

                    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
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

            // Optionally, remove the userData parameter from the URL to keep it clean
            urlParams.delete('userData');
            const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
            window.history.replaceState(null, '', newUrl);

        } catch (e) {
            console.error('Error parsing user data from URL:', e);
        }
    } else {
        console.log('No userData parameter found in URL. Cannot decrypt.');
    }
});
