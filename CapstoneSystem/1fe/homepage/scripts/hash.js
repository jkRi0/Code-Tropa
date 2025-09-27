/**
 * Hashes a given string value using SHA-256.
 * @param {string} value The string to hash.
 * @returns {Promise<string>} A promise that resolves with the hexadecimal representation of the SHA-256 hash.
 */
async function hashValue(value) {
    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hexHash;
}

export { hashValue };
