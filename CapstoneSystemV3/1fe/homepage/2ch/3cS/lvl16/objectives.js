// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 16 - Albularyo Potion Log (Easy) - C#",
        objectives: [
            "Create a C# program with Main method",
            "Use System namespace",
            "Store 3 potion names and their effects in arrays",
            "Use parallel arrays: string[] potions and string[] effects",
            "Print each potion and its effect using a loop"
        ]
    },
    average: {
        title: "Level 16 - Albularyo Potion Log (Average) - C#",
        objectives: [
            "Track potion usage and calculate success rates",
            "Create a system that:\n  - Tracks how many times each potion was used\n  - Calculates success rates for each potion\n  - Displays usage statistics and success rates",
            "Use loops and mathematical calculations"
        ]
    },
    difficult: {
        title: "Level 16 - Albularyo Potion Log (Difficult) - C#",
        objectives: [
            "Analyze potion effectiveness and generate recommendations",
            "Create a system that:\n  - Analyzes potion effectiveness based on usage data\n  - Generates recommendations for potion combinations\n  - Tracks patient outcomes and treatment success\n  - Displays detailed potion analysis and recommendations",
            "Use complex logic, data analysis, and recommendation algorithms"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Albularyo Potion Log
===================
Potion 1: Sampaguita Tea - Calming effect
Potion 2: Ginger Root - Digestive aid
Potion 3: Turmeric Mix - Anti-inflammatory
===================`,
    
    average: `
// Expected output:
Albularyo Potion Log
===================
Potion 1: Sampaguita Tea - Calming effect
Potion 2: Ginger Root - Digestive aid
Potion 3: Turmeric Mix - Anti-inflammatory
===================

Usage Statistics:
Sampaguita Tea: 5 uses, 80% success rate
Ginger Root: 3 uses, 100% success rate
Turmeric Mix: 4 uses, 75% success rate
===================`,
    
    difficult: `
// Expected output:
Albularyo Potion Log
===================
Potion 1: Sampaguita Tea - Calming effect
Potion 2: Ginger Root - Digestive aid
Potion 3: Turmeric Mix - Anti-inflammatory
===================

Detailed Analysis:
Sampaguita Tea: 5 uses, 80% success rate
  Most Effective For: Anxiety, Insomnia
  Recommended Dosage: 2 cups daily
Ginger Root: 3 uses, 100% success rate
  Most Effective For: Nausea, Indigestion
  Recommended Dosage: 1 tablespoon
Turmeric Mix: 4 uses, 75% success rate
  Most Effective For: Joint Pain, Inflammation
  Recommended Dosage: 1 teaspoon

Recommendations:
- For digestive issues: Combine Ginger Root + Turmeric Mix
- For sleep problems: Use Sampaguita Tea before bedtime
- For inflammation: Apply Turmeric Mix externally
===================
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
