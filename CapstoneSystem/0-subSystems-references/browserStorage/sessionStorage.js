function createSessionStorageItem(key, value) {
    sessionStorage.setItem(key, value);
    console.log(`Item with key "${key}" created/updated in session storage.`);
}

function readSessionStorageItem(key) {
    const value = sessionStorage.getItem(key);
    if (value) {
        console.log(`Value for key "${key}" in session storage: ${value}`);
        return value;
    } else {
        console.log(`Item with key "${key}" not found in session storage.`);
        return null;
    }
}

function updateSessionStorageItem(key, newValue) {
    if (sessionStorage.getItem(key) !== null) {
        sessionStorage.setItem(key, newValue);
        console.log(`Item with key "${key}" updated to "${newValue}" in session storage.`);
    } else {
        console.log(`Item with key "${key}" not found in session storage. Cannot update.`);
    }
}

function deleteSessionStorageItem(key) {
    if (sessionStorage.getItem(key) !== null) {
        sessionStorage.removeItem(key);
        console.log(`Item with key "${key}" deleted from session storage.`);
    } else {
        console.log(`Item with key "${key}" not found in session storage. Cannot delete.`);
    }
}
