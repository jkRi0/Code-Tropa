// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 11 - Barangay Population Analyzer (Easy) - Java",
        objectives: [
            "Create a Java class named 'BarangayAnalyzer'",
            "Add a main method to start your program",
            "Declare parallel arrays: String[] barangays and int[] populations",
            "Store 3 barangay names and their populations in the arrays",
            "Use a for loop to print each barangay's name and population",
            "No calculations needed - just display the data"
        ]
    },
    average: {
        title: "Level 11 - Barangay Population Analyzer (Average) - Java",
        objectives: [
            "Use loops to calculate total and average population",
            "Create a system that:\n  - Uses a loop to sum all population values\n  - Calculates average population (total ÷ number of barangays)\n  - Displays each barangay with its population\n  - Shows summary statistics (total and average)",
            "Use loops, arithmetic operators, and mathematical calculations"
        ]
    },
    difficult: {
        title: "Level 11 - Barangay Population Analyzer (Difficult) - Java",
        objectives: [
            "Use loops and conditionals to find highest/lowest and categorize barangays",
            "Create a system that:\n  - Uses loops to find barangay with highest population\n  - Uses loops to find barangay with lowest population\n  - Uses conditional statements to categorize by size (small < 16,000, medium 16,000-20,000, large > 20,000)\n  - Counts barangays in each category\n  - Displays detailed analysis with all statistics",
            "Use loops, conditionals, comparisons, and multiple calculations"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Barangay Population Analysis
===========================
Barangay 1: San Jose - 15,000 residents
Barangay 2: Santa Maria - 22,000 residents
Barangay 3: San Pedro - 18,500 residents
===========================`,
    
    average: `
// Expected output:
Barangay Population Analysis
===========================
Barangay 1: San Jose - 15,000 residents
Barangay 2: Santa Maria - 22,000 residents
Barangay 3: San Pedro - 18,500 residents
===========================

Summary Statistics:
Total Population: 55,500
Average Population: 18,500
===========================`,
    
    difficult: `
// Expected output:
Barangay Population Analysis
===========================
Barangay 1: San Jose - 15,000 residents (Small)
Barangay 2: Santa Maria - 22,000 residents (Large)
Barangay 3: San Pedro - 18,500 residents (Medium)
===========================

Detailed Analysis:
Highest Population: Santa Maria (22,000)
Lowest Population: San Jose (15,000)
Total Population: 55,500
Average Population: 18,500

Size Categories:
Small (< 16,000): 1 barangay
Medium (16,000-20,000): 1 barangay
Large (> 20,000): 1 barangay
===========================
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