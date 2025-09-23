function createLocalStorageItem(key, value) {
    localStorage.setItem(key, value);
    console.log(`Item with key "${key}" created/updated.`);
}

function readLocalStorageItem(key) {
    const value = localStorage.getItem(key);
    if (value) {
        console.log(`Value for key "${key}": ${value}`);
        return value;
    } else {
        console.log(`Item with key "${key}" not found.`);
        return null;
    }
}

function updateLocalStorageItem(key, newValue) {
    if (localStorage.getItem(key) !== null) {
        localStorage.setItem(key, newValue);
        console.log(`Item with key "${key}" updated to "${newValue}".`);
    } else {
        console.log(`Item with key "${key}" not found. Cannot update.`);
    }
}

function deleteLocalStorageItem(key) {
    if (localStorage.getItem(key) !== null) {
        localStorage.removeItem(key);
        console.log(`Item with key "${key}" deleted.`);
    } else {
        console.log(`Item with key "${key}" not found. Cannot delete.`);
    }
}
