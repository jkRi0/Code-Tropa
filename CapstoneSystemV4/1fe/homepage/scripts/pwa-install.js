// PWA Install Handler for Code-Tropa
// Handles install prompt and app installation detection

let deferredPrompt;
let installButton = null;
let installStatusElement = null;
let uninstallButton = null;
let uninstallModal = null;

// Initialize install button elements
function initInstallUI() {
    installButton = document.getElementById('pwa-install-btn');
    installStatusElement = document.getElementById('pwa-install-status');
    uninstallButton = document.getElementById('pwa-uninstall-btn');
    uninstallModal = document.getElementById('pwa-uninstall-modal');
}

// Update install/uninstall button visibility
function updateInstallButton() {
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    
    // Update install button
    if (installButton) {
        if (isInstalled) {
            installButton.style.display = 'none';
        } else if (deferredPrompt) {
            installButton.style.display = 'block';
        } else {
            installButton.style.display = 'none';
        }
    }
    
    // Update uninstall button
    if (uninstallButton) {
        uninstallButton.style.display = isInstalled ? 'block' : 'none';
    }
    
    // Update status
    if (installStatusElement) {
        if (isInstalled) {
            installStatusElement.textContent = 'Running as installed app';
            installStatusElement.style.color = '#4CAF50';
        }
    }
}

// Handle beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    console.log('Install prompt available');
    updateInstallButton();
    
    // Show install button if it exists
    if (installButton) {
        installButton.style.display = 'block';
    }
});

// Handle install button click
function handleInstallClick() {
    if (!deferredPrompt) {
        if (installStatusElement) {
            installStatusElement.textContent = 'Install prompt not available.';
            installStatusElement.style.color = '#f44336';
        }
        return;
    }
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
            if (installStatusElement) {
                installStatusElement.textContent = 'App installed successfully!';
                installStatusElement.style.color = '#4CAF50';
            }
        } else {
            console.log('User dismissed the install prompt');
            if (installStatusElement) {
                installStatusElement.textContent = 'App installation cancelled.';
                installStatusElement.style.color = '#f44336';
            }
        }
        
        // Clear the deferredPrompt
        deferredPrompt = null;
        updateInstallButton();
    });
}

// Check if app is already installed
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    deferredPrompt = null;
    if (installStatusElement) {
        installStatusElement.textContent = 'App has been installed!';
        installStatusElement.style.color = '#4CAF50';
    }
    updateInstallButton();
});

// Handle uninstall button click
function handleUninstallClick() {
    if (!uninstallModal) return;
    
    // Detect platform and show appropriate instructions
    const platform = detectPlatform();
    const instructions = getUninstallInstructions(platform);
    
    // Update modal content
    const modalContent = uninstallModal.querySelector('.uninstall-modal-content');
    if (modalContent) {
        modalContent.innerHTML = `
            <h3>How to Uninstall Code-Tropa</h3>
            <div class="uninstall-instructions">
                ${instructions}
            </div>
            <button onclick="closeUninstallModal()" class="uninstall-close-btn">Close</button>
        `;
    }
    
    // Show modal
    uninstallModal.style.display = 'flex';
}

// Close uninstall modal
function closeUninstallModal() {
    if (uninstallModal) {
        uninstallModal.style.display = 'none';
    }
}

// Detect user's platform
function detectPlatform() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    if (/android/i.test(userAgent)) {
        return 'android';
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'ios';
    }
    if (/Win/.test(navigator.platform)) {
        return 'windows';
    }
    if (/Mac/.test(navigator.platform)) {
        return 'mac';
    }
    if (/Linux/.test(navigator.platform)) {
        return 'linux';
    }
    return 'desktop';
}

// Get platform-specific uninstall instructions
function getUninstallInstructions(platform) {
    const instructions = {
        android: `
            <p><strong>Android:</strong></p>
            <ol>
                <li>Long press the Code-Tropa app icon on your home screen</li>
                <li>Tap "App info" or the info icon (i)</li>
                <li>Tap "Uninstall"</li>
                <li>Confirm the uninstallation</li>
            </ol>
            <p><em>Alternatively:</em> Go to Settings → Apps → Code-Tropa → Uninstall</p>
        `,
        ios: `
            <p><strong>iOS (iPhone/iPad):</strong></p>
            <ol>
                <li>Long press the Code-Tropa app icon on your home screen</li>
                <li>Tap "Remove App"</li>
                <li>Select "Delete App"</li>
                <li>Confirm deletion</li>
            </ol>
        `,
        windows: `
            <p><strong>Windows:</strong></p>
            <ol>
                <li>Open Settings (Windows key + I)</li>
                <li>Go to "Apps" → "Apps & features"</li>
                <li>Search for "Code-Tropa"</li>
                <li>Click on it and select "Uninstall"</li>
                <li>Confirm the uninstallation</li>
            </ol>
            <p><em>Alternatively:</em> Right-click the app icon in Start menu → Uninstall</p>
        `,
        mac: `
            <p><strong>macOS:</strong></p>
            <ol>
                <li>Open Finder</li>
                <li>Go to Applications folder</li>
                <li>Find "Code-Tropa"</li>
                <li>Right-click and select "Move to Trash"</li>
                <li>Empty Trash to complete removal</li>
            </ol>
        `,
        desktop: `
            <p><strong>Desktop Browser:</strong></p>
            <ol>
                <li><strong>Chrome/Edge:</strong> Go to Settings → Apps → Installed apps → Find Code-Tropa → Click three dots → Uninstall</li>
                <li><strong>Firefox:</strong> Go to about:preferences → Search for "Code-Tropa" → Remove</li>
                <li>Or use your operating system's app management to uninstall</li>
            </ol>
        `
    };
    
    return instructions[platform] || instructions.desktop;
}

// Check if running as installed app on page load
if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('Running as installed app');
    if (installStatusElement) {
        installStatusElement.textContent = 'Running as installed app!';
        installStatusElement.style.color = '#4CAF50';
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (uninstallModal && e.target === uninstallModal) {
        closeUninstallModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && uninstallModal && uninstallModal.style.display === 'flex') {
        closeUninstallModal();
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initInstallUI();
        updateInstallButton();
    });
} else {
    initInstallUI();
    updateInstallButton();
}

// Export for manual trigger if needed
window.pwaInstall = {
    install: handleInstallClick,
    uninstall: handleUninstallClick,
    isInstalled: () => window.matchMedia('(display-mode: standalone)').matches,
    canInstall: () => deferredPrompt !== null,
    closeUninstallModal: closeUninstallModal
};

// Make closeUninstallModal globally available
window.closeUninstallModal = closeUninstallModal;

