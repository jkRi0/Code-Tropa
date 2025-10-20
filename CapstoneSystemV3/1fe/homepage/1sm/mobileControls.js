document.addEventListener('DOMContentLoaded', function() {
    const toggleEditorBtn = document.getElementById('toggleEditor');
    const toggleTerminalBtn = document.getElementById('toggleTerminal');
    const codeEditor = document.querySelector('.code-editor-div');
    const terminal = document.querySelector('.output-terminal');

    // Add close buttons to panels
    function addCloseButton(panel) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'panel-close-btn';
        closeBtn.innerHTML = '✕';
        closeBtn.addEventListener('click', () => {
            panel.classList.remove('show');
        });
        panel.appendChild(closeBtn);
    }

    // Add close buttons if they don't exist
    if (window.innerWidth <= 768) {
        addCloseButton(codeEditor);
        addCloseButton(terminal);
    }

    toggleEditorBtn.addEventListener('click', () => {
        codeEditor.classList.toggle('show');
        terminal.classList.remove('show');
        // Refresh Monaco editor when shown
        if (codeEditor.classList.contains('show') && window.editor) {
            window.editor.layout();
        }
    });

    toggleTerminalBtn.addEventListener('click', () => {
        terminal.classList.toggle('show');
        codeEditor.classList.remove('show');
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.editor) {
            window.editor.layout();
        }
    });
});