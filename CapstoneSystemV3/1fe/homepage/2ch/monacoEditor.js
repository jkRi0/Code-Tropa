// Monaco Editor initialization and compilation functionality
require.config({ paths: { 'vs': '../../../../node_modules/monaco-editor/min/vs' }});
require(['vs/editor/editor.main'], function() {
    // Use shared functions from challengeData.js (will be available globally)
    
    // Get current language from the page (will be set by language switching)
    const selectedLanguageSpan = document.getElementById('selectedLanguage');
    const currentLanguage = selectedLanguageSpan ? selectedLanguageSpan.textContent.toLowerCase() : 'java';
    
    var editor = monaco.editor.create(document.getElementById('monaco-container'), {
        value: window.getDefaultCode(currentLanguage),
        language: window.getMonacoLanguage(currentLanguage),
        theme: "vs-dark",
        automaticLayout: true,
        fontSize: 16,
        minimap: { enabled: false }
    });
    window.editor = editor; // Make editor globally accessible

    const outputTerminal = document.getElementById('outputTerminal');

    // Keep console.log and console.error in browser console only
    // (Removed redirection to output terminal to keep it clean for program output)

    document.getElementById('runCodeBtn').addEventListener('click', function() {
        const code = editor.getValue();
        const outputTerminal = document.getElementById('outputTerminal');
        // outputTerminal.textContent = ''; // Clear terminal

        console.log('Running code:', code); // Debug log
        
        const selectedDifficultySpan = document.getElementById('selectedDifficulty');
        const difficulty = selectedDifficultySpan ? selectedDifficultySpan.textContent.toLowerCase() : 'easy';
        
        // Get current language
        const selectedLanguageSpan = document.getElementById('selectedLanguage');
        const language = selectedLanguageSpan ? selectedLanguageSpan.textContent.toLowerCase() : 'java';
        
        const result = window.compileCode(code, difficulty, language);
        console.log('Compilation result:', result); // Debug log
        
        if (result.success) {
            outputTerminal.style.color = '#00ff00';
            outputTerminal.textContent = `Program Output:\n${result.output}`;
        } else {
            outputTerminal.style.color = '#ff0000';
            outputTerminal.textContent = "❌ Compile-time errors found:\n" + 
                result.errors.map((err, i) => `${i + 1}. [${err.severity.toUpperCase()}] Line ${err.line}: ${err.title} - ${err.desc}`).join('\n');
        }
    });
});
