// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 9 - Fiesta Poster Maker (Easy) - Java",
        objectives: [
            "Create a Java class named 'FiestaPoster'",
            "Add a main method to start your program",
            "Convert a slogan to uppercase and add decorative characters",
            "Use String methods: toUpperCase() and string concatenation",
            "Print the formatted slogan with borders"
        ]
    },
    average: {
        title: "Level 9 - Fiesta Poster Maker (Average) - Java",
        objectives: [
            "Use String methods to analyze a slogan: count characters and words",
            "Create a system that:\n  - Uses a String variable to store slogan\n  - Uses length() method to count total characters\n  - Uses split() or manual counting to count words\n  - Displays character and word statistics",
            "Use String methods: length(), toUpperCase(), and string operations"
        ]
    },
    difficult: {
        title: "Level 9 - Fiesta Poster Maker (Difficult) - Java",
        objectives: [
            "Use arrays and string methods to process multiple slogans and format output",
            "Create a system that:\n  - Uses arrays to store multiple slogans\n  - Uses loops to process each slogan\n  - Uses String methods (toUpperCase(), length(), substring()) to format\n  - Generates formatted poster output with borders\n  - Displays multiple slogan variations",
            "Use arrays, loops, and complex string manipulation methods"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Fiesta Poster Maker
==================
Original: "Mabuhay ang Fiesta!"
Formatted: 
==================
*** MABUHAY ANG FIESTA! ***
==================`,
    
    average: `
// Expected output:
Fiesta Poster Maker
==================
Slogan Analysis:
================
Original: Mabuhay ang Fiesta ng Bayan
Uppercase: MABUHAY ANG FIESTA NG BAYAN
Characters: 25
Words: 5
================`,
    
    difficult: `
// Expected output:
Fiesta Poster Maker
==================
Slogan 1:
==================
*** MABUHAY ANG FIESTA NG BAYAN ***
Characters: 25 | Words: 5
==================

Slogan 2:
==================
*** MABUHAY ANG MASAYANG FIESTA! ***
Characters: 26 | Words: 4
==================

Slogan 3:
==================
*** FIESTA NG BAYAN, PAGKAKAISA! ***
Characters: 28 | Words: 4
==================
`
};

// Use namespace to avoid conflicts
window.displayObjectives = window.displayObjectives || function(difficulty) {
    const selectedData = localStorage.getItem('selectedChallenge');
    const data = JSON.parse(selectedData);
    const objectivesContainer = document.querySelector('.objectives-container');
    const difficultyData = window.objectivesData[difficulty.toLowerCase()];

    if (difficultyData) {
        const content = `
                <h3>${difficultyData.title}</h3>
                <ul>
                    ${difficultyData.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
                <div class="example-output">
                    <pre>${window.examples[difficulty.toLowerCase()]}</pre>
                </div>
            `;
        objectivesContainer.innerHTML = content;
    }
};

// Initialize objectives based on selected difficulty
(function() {
    const selectedData = localStorage.getItem('selectedChallenge');
    const data = JSON.parse(selectedData);
    window.displayObjectives(data.difficulty);
})();