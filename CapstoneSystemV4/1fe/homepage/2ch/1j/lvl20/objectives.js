// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 20 - Jeepney Fare Matrix Calculator (Easy) - Java",
        objectives: [
            "Create a Java class named 'JeepneyFareMatrix'",
            "Add a main method to start your program",
            "Store 3 route distances and their base fares in arrays",
            "Use parallel arrays: String[] routes and double[] baseFares",
            "Print each route and its base fare using a loop"
        ]
    },
    average: {
        title: "Level 20 - Jeepney Fare Matrix Calculator (Average) - Java",
        objectives: [
            "Calculate total fare including distance-based pricing and discounts",
            "Create a system that:\n  - Calculates total fare based on distance and base fare\n  - Applies student/senior discounts (20% off)\n  - Shows fare breakdown and total cost",
            "Use loops and conditional logic"
        ]
    },
    difficult: {
        title: "Level 20 - Jeepney Fare Matrix Calculator (Difficult) - Java",
        objectives: [
            "Implement fare optimization and route planning",
            "Create a system that:\n  - Implements fare optimization for multiple routes\n  - Calculates cheapest route between destinations\n  - Tracks fare history and patterns\n  - Displays comprehensive fare analysis and recommendations",
            "Use complex logic, optimization algorithms, and route planning"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Jeepney Fare Matrix Calculator
=============================
Route 1: Quiapo to Cubao - Base Fare: ₱12.00
Route 2: Cubao to Makati - Base Fare: ₱15.00
Route 3: Makati to Alabang - Base Fare: ₱18.00
============================`,
    
    average: `
// Expected output:
Jeepney Fare Matrix Calculator
=============================
Route 1: Quiapo to Cubao - Base Fare: ₱12.00
Route 2: Cubao to Makati - Base Fare: ₱15.00
Route 3: Makati to Alabang - Base Fare: ₱18.00
============================

Fare Calculation:
Route: Quiapo to Cubao
Distance: 8.5 km
Base Fare: ₱12.00
Distance Fare: ₱8.50
Subtotal: ₱20.50
Student Discount (20%): -₱4.10
Total Fare: ₱16.40
============================`,
    
    difficult: `
// Expected output:
Jeepney Fare Matrix Calculator
=============================
Route 1: Quiapo to Cubao - Base Fare: ₱12.00
Route 2: Cubao to Makati - Base Fare: ₱15.00
Route 3: Makati to Alabang - Base Fare: ₱18.00
============================

Fare Optimization Analysis:
Cheapest Route: Quiapo to Cubao (₱16.40)
Most Expensive Route: Makati to Alabang (₱21.60)
Average Fare: ₱19.00

Route Recommendations:
- For Budget Travel: Quiapo to Cubao
- For Speed: Cubao to Makati
- For Comfort: Makati to Alabang

Fare History:
- Lowest recorded fare: ₱16.40
- Highest recorded fare: ₱21.60
- Average fare: ₱19.00
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