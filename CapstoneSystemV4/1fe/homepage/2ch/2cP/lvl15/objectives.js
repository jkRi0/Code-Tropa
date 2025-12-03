// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 15 - Tricycle Dispatch System (Easy) - C++",
        objectives: [
            "Create a C++ program with main function",
            "Include necessary headers (iostream, string)",
            "Store 3 tricycle drivers and their availability status",
            "Use parallel arrays: string drivers[] and bool available[]",
            "Print each driver's name and availability status using a loop"
        ]
    },
    average: {
        title: "Level 15 - Tricycle Dispatch System (Average) - C++",
        objectives: [
            "Assign passengers to available drivers and calculate fare",
            "Create a system that:\n  - Assigns passengers to available drivers\n  - Calculates fare based on distance\n  - Displays assignment and fare information",
            "Use loops and conditional logic"
        ]
    },
    difficult: {
        title: "Level 15 - Tricycle Dispatch System (Difficult) - C++",
        objectives: [
            "Optimize driver assignments and track earnings",
            "Create a system that:\n  - Optimizes driver assignments based on distance\n  - Tracks driver earnings and performance\n  - Handles multiple passengers and routes\n  - Displays detailed dispatch analytics",
            "Use complex logic, optimization algorithms, and performance tracking"
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
