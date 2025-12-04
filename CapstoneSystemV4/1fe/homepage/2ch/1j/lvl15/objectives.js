// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 15 - Tricycle Dispatch System (Easy) - Java",
        objectives: [
            "Create a Java class named 'TricycleDispatch'",
            "Add a main method to start your program",
            "Declare parallel arrays: String[] drivers and boolean[] available",
            "Store 3 tricycle drivers and their availability status (true/false)",
            "Use a for loop to print each driver's name and availability",
            "Use conditional (if-else) to display 'Available' or 'Busy'"
        ]
    },
    average: {
        title: "Level 15 - Tricycle Dispatch System (Average) - Java",
        objectives: [
            "Use loops and conditionals to assign passengers and calculate fares",
            "Create a system that:\n  - Uses arrays to store passenger names and distances\n  - Uses nested loops to find available drivers\n  - Uses conditional statements to check driver availability\n  - Calculates fare (distance × rate, e.g., ₱10 per km)\n  - Displays assignment and fare information",
            "Use loops, conditionals, and arithmetic calculations"
        ]
    },
    difficult: {
        title: "Level 15 - Tricycle Dispatch System (Difficult) - Java",
        objectives: [
            "Use arrays and loops to optimize assignments and track performance",
            "Create a system that:\n  - Uses loops to find closest available driver for each passenger\n  - Uses arrays to track driver earnings and trip counts\n  - Uses loops to update driver performance data\n  - Calculates fares for multiple passengers\n  - Displays detailed dispatch analytics with driver performance",
            "Use multiple arrays, nested loops, conditionals, and performance tracking"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Tricycle Dispatch System
=======================
Driver 1: Mang Juan - Available
Driver 2: Mang Pedro - Busy
Driver 3: Mang Jose - Available
=======================`,
    
    average: `
// Expected output:
Tricycle Dispatch System
=======================
Driver 1: Mang Juan - Available
Driver 2: Mang Pedro - Busy
Driver 3: Mang Jose - Available
=======================

Dispatch Assignment:
Passenger: Maria
Assigned Driver: Mang Juan
Distance: 2.5 km
Fare: ₱25.00
=======================`,
    
    difficult: `
// Expected output:
Tricycle Dispatch System
=======================
Driver 1: Mang Juan - Available
Driver 2: Mang Pedro - Busy
Driver 3: Mang Jose - Available
=======================

Optimized Dispatch:
Passenger: Maria
Assigned Driver: Mang Juan (closest)
Distance: 2.5 km
Fare: ₱25.00

Passenger: Ana
Assigned Driver: Mang Jose
Distance: 3.0 km
Fare: ₱30.00

Driver Performance:
Mang Juan: 1 trip, ₱25.00 earned
Mang Jose: 1 trip, ₱30.00 earned
Mang Pedro: 0 trips, ₱0.00 earned
=======================
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