// Fetch Wrapper for Code-Tropa
// Replaces global fetch with apiClient to enable offline support

import { apiFetch } from './apiClient.js';

// Replace global fetch
if (typeof window !== 'undefined') {
    // Store original fetch immediately
    const originalFetch = window.fetch;
    window._originalFetch = originalFetch;
    
    // Replace with apiFetch
    window.fetch = function(url, options) {
        // Only intercept API calls to 2be endpoints
        if (typeof url === 'string' && url.includes('/2be/') && url.endsWith('.php')) {
            return apiFetch(url, options);
        }
        // For non-API calls, use original fetch
        return originalFetch(url, options);
    };
    
    console.log('Fetch wrapper initialized - offline support enabled');
}

