// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 16 - Albularyo Potion Log (Easy) - Java",
        objectives: [
            "Create a Java class named 'AlbularyoPotionLog'",
            "Add a main method to start your program",
            "Declare parallel arrays: String[] potions and String[] effects",
            "Store 3 potion names and their effects in the arrays",
            "Use a for loop to print each potion and its effect",
            "No calculations needed - just display the data"
        ]
    },
    average: {
        title: "Level 16 - Albularyo Potion Log (Average) - Java",
        objectives: [
            "Use arrays and loops to track usage and calculate success rates",
            "Create a system that:\n  - Uses arrays to store usage counts and success counts\n  - Uses loops to calculate success rate for each potion (success ÷ usage × 100)\n  - Displays each potion with its usage count and success rate percentage",
            "Use arrays, loops, and percentage calculations"
        ]
    },
    difficult: {
        title: "Level 16 - Albularyo Potion Log (Difficult) - Java",
        objectives: [
            "Use multiple arrays and loops to analyze effectiveness and generate recommendations",
            "Create a system that:\n  - Uses arrays to store additional data (best for conditions, dosages)\n  - Uses loops to display detailed analysis for each potion\n  - Uses string operations to format recommendations\n  - Displays comprehensive potion analysis with effectiveness data and recommendations",
            "Use multiple arrays, loops, string operations, and formatted output"
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