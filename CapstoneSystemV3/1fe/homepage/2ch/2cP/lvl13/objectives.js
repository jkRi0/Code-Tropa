// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 13 - Filipino Family Menu Generator (Easy) - C++",
        objectives: [
            "Create a C++ program with main function",
            "Include necessary headers (iostream, string, iomanip)",
            "Store 3 Filipino dishes and their prices in arrays",
            "Use parallel arrays: string dishes[] and double prices[]",
            "Print each dish and its price using a loop"
        ]
    },
    average: {
        title: "Level 13 - Filipino Family Menu Generator (Average) - C++",
        objectives: [
            "Calculate total cost and apply family discount",
            "Create a system that:\n  - Calculates total cost of all dishes\n  - Applies 10% family discount\n  - Displays original total and discounted total",
            "Use loops and mathematical calculations"
        ]
    },
    difficult: {
        title: "Level 13 - Filipino Family Menu Generator (Difficult) - C++",
        objectives: [
            "Generate personalized menu recommendations and calculate per-person cost",
            "Create a system that:\n  - Generates personalized recommendations based on preferences\n  - Calculates cost per person for family meals\n  - Suggests additional dishes based on budget\n  - Displays detailed menu analysis",
            "Use complex logic, recommendations, and budget calculations"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Filipino Family Menu Generator
============================
Dish 1: Adobo - ₱150.00
Dish 2: Sinigang - ₱180.00
Dish 3: Kare-Kare - ₱220.00
============================`,
    
    average: `
// Expected output:
Filipino Family Menu Generator
============================
Dish 1: Adobo - ₱150.00
Dish 2: Sinigang - ₱180.00
Dish 3: Kare-Kare - ₱220.00
============================

Menu Summary:
Original Total: ₱550.00
Family Discount (10%): ₱55.00
Final Total: ₱495.00
============================`,
    
    difficult: `
// Expected output:
Filipino Family Menu Generator
============================
Dish 1: Adobo - ₱150.00
Dish 2: Sinigang - ₱180.00
Dish 3: Kare-Kare - ₱220.00
============================

Personalized Recommendations:
- Suggested: Lechon Kawali (₱200.00)
- Suggested: Pancit Canton (₱120.00)

Menu Analysis:
Original Total: ₱550.00
With Recommendations: ₱870.00
Family Discount (10%): ₱87.00
Final Total: ₱783.00
Cost per Person (4 people): ₱195.75
============================
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
