// indent.js

function handleTabIndentation(e, codeEditor) {
    if (e.key === 'Tab') {
        e.preventDefault();

        const { selectionStart, selectionEnd, value } = codeEditor;
        codeEditor.value = value.substring(0, selectionStart) +
                           '    ' +
                           value.substring(selectionEnd);
        codeEditor.selectionStart = codeEditor.selectionEnd = selectionStart + 4;
    }
}




document.addEventListener('DOMContentLoaded', () => {
    const codeEditor = document.getElementById('codeEditor');

    if (codeEditor) {
        codeEditor.addEventListener('keydown', (e) => {
            // Handle Tab key for indentation
            handleTabIndentation(e, codeEditor);

            const { selectionStart, selectionEnd, value } = codeEditor;

            // Handle Enter key for auto-indentation after brackets
            if (e.key === 'Enter') {
                const charBeforeCursor = value.substring(selectionStart - 1, selectionStart);
                const charAfterCursor = value.substring(selectionStart, selectionStart + 1);

                // Auto-indent for curly braces, square brackets, and parentheses
                if ((charBeforeCursor === '{' && charAfterCursor === '}') ||
                    (charBeforeCursor === '[' && charAfterCursor === ']') ||
                    (charBeforeCursor === '(' && charAfterCursor === ')') ||
                    (charBeforeCursor === '<' && charAfterCursor === '>')) {

                    e.preventDefault();

                    const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
                    const currentLine = value.substring(lineStart, selectionStart);
                    const indentMatch = currentLine.match(/^\s*/);
                    const currentIndent = indentMatch ? indentMatch[0] : '';

                    const newString = value.substring(0, selectionStart) +
                                      '\n' + currentIndent + '    ' + // New line with increased indentation
                                      '\n' + currentIndent + // New line with current indentation for the closing bracket
                                      value.substring(selectionEnd);
                    
                    codeEditor.value = newString;
                    codeEditor.selectionStart = codeEditor.selectionEnd = selectionStart + currentIndent.length + 5; // Move cursor to the indented line
                }
                // Basic auto-indentation for new lines
                else {
                    const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
                    const currentLine = value.substring(lineStart, selectionStart);
                    const indentMatch = currentLine.match(/^\s*/);
                    
                    if (indentMatch) {
                        e.preventDefault();
                        const indent = indentMatch[0];
                        const newString = value.substring(0, selectionStart) + '\n' + indent + value.substring(selectionEnd);
                        codeEditor.value = newString;
                        codeEditor.selectionStart = codeEditor.selectionEnd = selectionStart + 1 + indent.length;
                    }
                }
            }
        });

        // Auto-closing brackets functionality
        codeEditor.addEventListener('input', (e) => {
            const { selectionStart, selectionEnd, value } = codeEditor;
            const lastChar = value.substring(selectionStart - 1, selectionStart);
            let closingChar = '';

            switch (lastChar) {
                case '(': closingChar = ')'; break;
                case '[': closingChar = ']'; break;
                case '{': closingChar = '}'; break;
                case '<': closingChar = '>'; break;
                default: return;
            }

            const newString = value.substring(0, selectionStart) + closingChar + value.substring(selectionEnd);
            codeEditor.value = newString;
            codeEditor.selectionStart = codeEditor.selectionEnd = selectionStart;
        });
    }
});
