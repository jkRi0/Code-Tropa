// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 6 - Jeepney Fare Calculator (Easy) - C#",
        objectives: [
            "Create a C# program with Main method",
            "Use System namespace",
            "Create an array of 5 destinations:\n  - Quiapo, Makati, Cubao, Ortigas, BGC",
            "Print each destination using a loop and Console.WriteLine"
        ]
    },
    average: {
        title: "Level 6 - Jeepney Fare Calculator (Average) - C#",
        objectives: [
            "Assign and compute fare for each route",
            "Use parallel arrays to store destinations and fares",
            "Calculate total fare for multiple destinations",
            "Display:\n  - Destination list with fares\n  - Total fare calculation\n  - Fare breakdown",
            "Use Console.WriteLine and loops for output"
        ]
    },
    difficult: {
        title: "Level 6 - Jeepney Fare Calculator (Difficult) - C#",
        objectives: [
            "Apply senior/student discounts and validate if entered destination exists",
            "Create a system that:\n  - Takes user input for destination\n  - Validates destination exists in the list\n  - Applies 20% discount for seniors/students\n  - Calculates final fare with discount",
            "Use input validation, conditional logic, and array searching with Console.ReadLine"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Jeepney Destinations
===================
1. Quiapo
2. Makati
3. Cubao
4. Ortigas
5. BGC`,
    
    average: `
// Expected output:
Jeepney Fare Calculator
======================
Destination: Quiapo - ₱12
Destination: Makati - ₱15
Destination: Cubao - ₱18
Destination: Ortigas - ₱20
Destination: BGC - ₱25
======================
Total Fare: ₱90`,
    
    difficult: `
// Expected output (with input: "Makati", "y"):
Jeepney Fare Calculator
======================
Enter destination: Makati
Are you a senior/student? (y/n): y

Destination: Makati
Regular Fare: ₱15
Discount (20%): ₱3
Final Fare: ₱12
======================
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
