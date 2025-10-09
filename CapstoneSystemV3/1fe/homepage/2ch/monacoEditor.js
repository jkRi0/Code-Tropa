// Monaco Editor initialization and Java compilation functionality
require.config({ paths: { 'vs': '../../../../node_modules/monaco-editor/min/vs' }});
require(['vs/editor/editor.main'], function() {
    var editor = monaco.editor.create(document.getElementById('monaco-container'), {
        value: [
            'public class MyClass {',
            '    public static void main(String[] args) {',
            '        System.out.println("Hello Java!");',
            '    }',
            '}'
        ].join('\n'),
        language: "java",
        theme: "vs-dark",
        automaticLayout: true,
        fontSize: 16,
        minimap: { enabled: false }
    });
    window.editor = editor; // Make editor globally accessible

    const outputTerminal = document.getElementById('outputTerminal');

    // Redirect console.log and console.error to the output terminal
    (function () {
        var oldLog = console.log;
        var oldError = console.error;
        console.log = function (message) {
            oldLog.apply(console, arguments);
            outputTerminal.textContent += message + '\n';
        };
        console.error = function (message) {
            oldError.apply(console, arguments);
            outputTerminal.textContent += message + '\n';
        };
    })();

    document.getElementById('runCodeBtn').addEventListener('click', function() {
        const code = editor.getValue();
        const outputTerminal = document.getElementById('outputTerminal');
        // outputTerminal.textContent = ''; // Clear terminal

        console.log('Running code:', code); // Debug log
        
        const selectedDifficultySpan = document.getElementById('selectedDifficulty');
        const difficulty = selectedDifficultySpan ? selectedDifficultySpan.textContent.toLowerCase() : 'easy';
        const result = window.compileJavaCode(code, difficulty);
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
