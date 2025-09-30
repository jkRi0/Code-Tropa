export function initializeDomContent() {
    // Hamburger menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuContainer = document.querySelector('.menu-container');
    const mainContentWrapper = document.querySelector('.main-content-wrapper');

    if (hamburgerMenu && menuContainer) {
        hamburgerMenu.addEventListener('click', () => {
            menuContainer.classList.toggle('open');
            mainContentWrapper.classList.toggle('menu-open');
        });
    }

    // Function to set bar graph heights dynamically
    function setBarGraphHeights() {
        const performanceData = {
            accuracy: 85,
            efficiency: 70,
            readability: 60,
            time: 90,
            success: 95,
            failed: 20
        };

        for (const key in performanceData) {
            if (performanceData.hasOwnProperty(key)) {
                const bar = document.querySelector(`.bar-wrapper .bar-${key}`);
                const percentageLabel = bar ? bar.querySelector('.bar-percentage-label') : null;
                if (bar) {
                    bar.style.height = `${performanceData[key]}%`;
                }
                if (percentageLabel) {
                    percentageLabel.textContent = `${performanceData[key]}%`;
                }
            }
        }
    }

    // Call the function to set bar graph heights and percentages when the DOM is loaded
    setBarGraphHeights();

    // Add event listeners for editing controls
    const editButtons = document.querySelectorAll('.edit-control-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const controlType = button.dataset.control;
            const controlKeySpan = document.getElementById(`${controlType}Key`);

            if (button.textContent === 'Edit') {
                const currentValue = controlKeySpan.textContent;
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('control-input');
                controlKeySpan.replaceWith(input);
                button.textContent = 'Save';
                button.classList.add('save-control-btn');
                button.classList.remove('edit-control-btn');

                if (controlType === 'skipNext') {
                    input.readOnly = true; // Skip/Touch is not a single key input
                    input.style.cursor = 'not-allowed';
                }

            } else if (button.textContent === 'Save') {
                const input = controlKeySpan.previousElementSibling; // Get the input field
                if (input && input.classList.contains('control-input')) {
                    const newValue = input.value;
                    const newSpan = document.createElement('span');
                    newSpan.id = `${controlType}Key`;
                    newSpan.classList.add('control-key');
                    newSpan.textContent = newValue;
                    input.replaceWith(newSpan);
                    button.textContent = 'Edit';
                    button.classList.remove('save-control-btn');
                    button.classList.add('edit-control-btn');
                }
            }
        });
    });
}
