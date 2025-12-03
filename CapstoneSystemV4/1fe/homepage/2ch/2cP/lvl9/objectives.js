// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 9 - Fiesta Poster Maker (Easy) - C++",
        objectives: [
            "Create a C++ program with main function",
            "Include necessary headers (iostream, string, algorithm)",
            "Convert a slogan to uppercase and add decorative characters",
            "Use string methods and string concatenation",
            "Print the formatted slogan with borders using std::cout"
        ]
    },
    average: {
        title: "Level 9 - Fiesta Poster Maker (Average) - C++",
        objectives: [
            "Accept a user-input slogan, count characters and words",
            "Create a system that:\n  - Takes slogan input from user\n  - Counts total characters\n  - Counts total words\n  - Displays character and word statistics",
            "Use std::cin for input and string methods for analysis"
        ]
    },
    difficult: {
        title: "Level 9 - Fiesta Poster Maker (Difficult) - C++",
        objectives: [
            "Sanitize slogans by removing offensive words, align output, and auto-suggest better slogans",
            "Create a system that:\n  - Filters out inappropriate words\n  - Aligns text output properly\n  - Suggests improvements based on length and clarity\n  - Generates multiple slogan variations",
            "Use arrays, loops, and complex string manipulation"
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
