// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 11 - Barangay Population Analyzer (Easy) - Java",
        objectives: [
            "Create a Java class named 'BarangayAnalyzer'",
            "Add a main method to start your program",
            "Store 3 barangay names and populations in arrays",
            "Use parallel arrays: String[] barangays and int[] populations",
            "Print each barangay's name and population using a loop"
        ]
    },
    average: {
        title: "Level 11 - Barangay Population Analyzer (Average) - Java",
        objectives: [
            "Calculate and display the total population and average",
            "Create a system that:\n  - Calculates total population across all barangays\n  - Calculates average population\n  - Displays summary statistics",
            "Use loops and mathematical calculations"
        ]
    },
    difficult: {
        title: "Level 11 - Barangay Population Analyzer (Difficult) - Java",
        objectives: [
            "Find the barangay with the highest/lowest population and categorize by size",
            "Create a system that:\n  - Identifies barangay with highest population\n  - Identifies barangay with lowest population\n  - Categorizes barangays by size (small, medium, large)\n  - Displays detailed analysis report",
            "Use complex logic, comparisons, and categorization"
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