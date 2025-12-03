async function simulateCode(code, language = 'java') {
    // Route to appropriate analysis based on language
    switch(language.toLowerCase()) {
        case 'c++':
        case 'cpp':
            if (typeof window.simulateCppOutput === 'function') {
                return await window.simulateCppOutput(code);
            } else {
                return {
                    success: false,
                    output: "",
                    errors: [{
                        id: 'simulator-missing',
                        severity: 'error',
                        title: 'Simulator Error',
                        desc: 'C++ simulator is not loaded. Please refresh the page.',
                        line: 1,
                        excerpt: ''
                    }]
                };
            }
        case 'c#':
        case 'csharp':
            if (typeof window.simulateCsharpOutput === 'function') {
                return await window.simulateCsharpOutput(code);
            } else {
                return {
                    success: false,
                    output: "",
                    errors: [{
                        id: 'simulator-missing',
                        severity: 'error',
                        title: 'Simulator Error',
                        desc: 'C# simulator is not loaded. Please refresh the page.',
                        line: 1,
                        excerpt: ''
                    }]
                };
            }
        case 'java':
        default:
            if (typeof window.simulateJavaOutput === 'function') {
                return await window.simulateJavaOutput(code);
            } else {
                return {
                    success: false,
                    output: "",
                    errors: [{
                        id: 'simulator-missing',
                        severity: 'error',
                        title: 'Simulator Error',
                        desc: 'Java simulator is not loaded. Please refresh the page.',
                        line: 1,
                        excerpt: ''
                    }]
                };
            }
    }
}

// Export to window (browser environment)
window.simulateCode = simulateCode;
