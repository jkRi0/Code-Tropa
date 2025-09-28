
export function generateKeys() {
    // Generate 5 random integers from 0-9
    const keys = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10));
    return keys;
}
