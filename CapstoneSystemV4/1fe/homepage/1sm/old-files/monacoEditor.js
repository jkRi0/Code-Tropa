// Monaco Editor initialization and compilation functionality
require.config({ paths: { 'vs': '../../../../node_modules/monaco-editor/min/vs' }});
require(['vs/editor/editor.main'], function() {
    // Initialize with default language - switchMonacoLanguage will update it when ready
    var editor = monaco.editor.create(document.getElementById('monaco-container'), {
        value: window.getDefaultCode('java'),
        language: window.getMonacoLanguage('java'),
        theme: "vs-dark",
        automaticLayout: true,
        fontSize: 16,
        minimap: { enabled: false }
    });
    window.editor = editor; // Make editor globally accessible
    window.monaco = monaco; // Make monaco globally accessible for language switching

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

        const output = window.simulateCode(code, language);

        console.log('Simulation result:', output);
        console.log('Compilation result:', result); // Debug log


        // const astText = result.ast ? `\n\nAST (JavaParser):\n${result.ast}` : '';
        if (result.success&&output[0]!=' ') {
            outputTerminal.style.color = '#00ff00';
            outputTerminal.textContent = `OUTPUT TERMINAL >>>${result.output}\n\n${output}`;
        } else {
            outputTerminal.style.color = '#ff0000';
            outputTerminal.textContent = "❌ Compile-time errors found:\n" + 
                result.errors.map((err, i) => `${i + 1}. [${err.severity.toUpperCase()}] Line ${err.line}: ${err.title} - ${err.desc}`).join('\n')+
                '\n'+(output[0]==' '?output:'');
            // if (astText) {
            //     outputTerminal.textContent += astText;
            // }
        }
    });
});
