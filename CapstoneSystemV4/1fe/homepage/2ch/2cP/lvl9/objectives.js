// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 9 - Fiesta Poster Maker (Easy) - C++",
        objectives: [
            "Create a C++ program with main function",
            "Include necessary headers (iostream, string)",
            "Convert a slogan to uppercase and add decorative characters",
            "Use string methods and string concatenation",
            "Print the formatted slogan with borders using std::cout"
        ]
    },
    average: {
        title: "Level 9 - Fiesta Poster Maker (Average) - C++",
        objectives: [
            "Use string methods to analyze a slogan: count characters and words",
            "Create a system that:\n  - Uses a string variable to store slogan\n  - Uses length() method to count total characters\n  - Uses manual counting or string operations to count words\n  - Displays character and word statistics",
            "Use string methods: length(), string operations, and character analysis"
        ]
    },
    difficult: {
        title: "Level 9 - Fiesta Poster Maker (Difficult) - C++",
        objectives: [
            "Use arrays and string methods to process multiple slogans and format output",
            "Create a system that:\n  - Uses arrays to store multiple slogans\n  - Uses loops to process each slogan\n  - Uses string methods (length(), substr(), string operations) to format\n  - Generates formatted poster output with borders\n  - Displays multiple slogan variations",
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
// Expected output (with input: "Mabuhay ang Fiesta ng Bayan"):
Fiesta Poster Maker
==================
Enter slogan: Mabuhay ang Fiesta ng Bayan

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
Enter slogan: Mabuhay ang Fiesta ng Bayan

Slogan Analysis:
================
Original: Mabuhay ang Fiesta ng Bayan
Sanitized: Mabuhay ang Fiesta ng Bayan
Characters: 25 | Words: 5

Formatted Poster:
==================
*** MABUHAY ANG FIESTA NG BAYAN ***
==================

Suggestions:
- Consider: "Mabuhay ang Masayang Fiesta!"
- Consider: "Fiesta ng Bayan, Pagkakaisa!"
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
