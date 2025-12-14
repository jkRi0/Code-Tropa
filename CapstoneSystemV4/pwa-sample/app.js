// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
            .then((registration) => {
                console.log('Service Worker registered:', registration);
                updateServiceWorkerStatus(true);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    console.log('New service worker found, updating...');
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('New service worker installed, reload to activate');
                        }
                    });
                });
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
                updateServiceWorkerStatus(false);
            });
        
        // Listen for service worker controller changes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('Service worker controller changed, reloading...');
            window.location.reload();
        });
    });
}

// Update service worker status
function updateServiceWorkerStatus(registered) {
    const swDot = document.getElementById('swDot');
    const swText = document.getElementById('swText');
    
    if (swDot && swText) {
        if (registered) {
            swDot.classList.add('registered');
            swText.textContent = 'Service Worker: Active';
        } else {
            swDot.classList.add('error');
            swText.textContent = 'Service Worker: Error';
        }
    }
}

// Online/Offline Status
function updateOnlineStatus() {
    const onlineStatus = document.getElementById('onlineStatus');
    
    // Only update if the element exists (it's only on the home page)
    if (!onlineStatus) {
        return;
    }
    
    if (navigator.onLine) {
        onlineStatus.innerHTML = '<span class="status-dot online"></span> Online';
    } else {
        onlineStatus.innerHTML = '<span class="status-dot offline"></span> Offline';
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

// Install Prompt
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
const installStatus = document.getElementById('installStatus');

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show the install button
    if (installBtn) {
        installBtn.style.display = 'block';
    }
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) {
        installStatus.textContent = 'Install prompt not available.';
        installStatus.style.color = '#f44336';
        return;
    }
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
        installStatus.textContent = 'App installed successfully!';
        installStatus.style.color = '#4CAF50';
    } else {
        installStatus.textContent = 'App installation cancelled.';
        installStatus.style.color = '#f44336';
    }
    
    // Clear the deferredPrompt
    deferredPrompt = null;
    if (installBtn) {
        installBtn.style.display = 'none';
    }
    });
}

// Check if app is already installed
window.addEventListener('appinstalled', () => {
    if (installStatus) {
        installStatus.textContent = 'App has been installed!';
        installStatus.style.color = '#4CAF50';
    }
    if (installBtn) {
        installBtn.style.display = 'none';
    }
    deferredPrompt = null;
});

// Check if running as installed app
if (window.matchMedia('(display-mode: standalone)').matches) {
    if (installStatus) {
        installStatus.textContent = 'Running as installed app!';
        installStatus.style.color = '#4CAF50';
    }
    if (installBtn) {
        installBtn.style.display = 'none';
    }
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formStatus = document.getElementById('formStatus');
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Simulate form submission (in a real app, you'd send this to a server)
        formStatus.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        formStatus.style.color = '#4CAF50';
        formStatus.style.background = '#e8f5e9';
        formStatus.style.padding = '15px';
        formStatus.style.borderRadius = '6px';
        
        // Reset form
        contactForm.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.style.background = '';
        }, 5000);
        
        console.log('Form submitted:', data);
    });
}

