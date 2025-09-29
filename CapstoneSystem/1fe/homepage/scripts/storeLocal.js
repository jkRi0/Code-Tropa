
// This script will run on homepage/index.html after login.

import { decrypt } from './decryptor.js';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userDataEncoded = urlParams.get('userData');
    const decryptionKeysEncoded = urlParams.get('dk');

    if (userDataEncoded && decryptionKeysEncoded) {
        console.log('Raw userDataEncoded from URL:', userDataEncoded);
        console.log('Raw decryptionKeysEncoded from URL:', decryptionKeysEncoded);
        try {
            const userData = JSON.parse(decodeURIComponent(userDataEncoded));
            console.log('User Data:', userData);

            // const decryptionKeys = JSON.parse(localStorage.getItem('encryptionKeys')); // Old: retrieve from localStorage
            const decryptionKeys = JSON.parse(decodeURIComponent(decryptionKeysEncoded)); // New: retrieve from URL
            console.log('Parsed Decryption Keys:', decryptionKeys);

            if (!decryptionKeys) {
                console.error('Decryption keys not found in URL. Cannot decrypt user data.');
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
            urlParams.delete('dk'); // Also remove decryption keys from URL
            const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
            window.history.replaceState(null, '', newUrl);

        } catch (e) {
            console.error('Error parsing user data or decryption keys from URL:', e);
        }
    } else {
        console.log('Missing userData or decryptionKeys parameters in URL. Cannot decrypt.');
    }
});
