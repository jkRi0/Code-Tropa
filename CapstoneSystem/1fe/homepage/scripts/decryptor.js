export function decrypt(value, keys) {
    const shiftKeys = [];
    for (let i = 0; i < keys.length; i++) {
        if ((i + 1) % 2 !== 0) { 
            shiftKeys.push(keys[i]);
        }
    }

    const sectionLength = Math.ceil(value.length / 3);
    const sections = [
        value.substring(0, sectionLength),
        value.substring(sectionLength, 2 * sectionLength),
        value.substring(2 * sectionLength)
    ];

    let decryptedValue = "";

    sections.forEach((section, index) => {
        const shift = shiftKeys[index];
        for (let i = 0; i < section.length; i++) {
            const charCode = section.charCodeAt(i);
            decryptedValue += String.fromCharCode(charCode - shift);
        }
    });

    return decryptedValue;
}
