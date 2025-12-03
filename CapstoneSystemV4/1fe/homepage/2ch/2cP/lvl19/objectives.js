// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 19 - Aswang Alert Tracker (Easy) - C++",
        objectives: [
            "Create a C++ program named 'AswangAlertTracker'",
            "Add a main function to start your program",
            "Store 3 alert locations and their threat levels in arrays",
            "Use parallel arrays: string locations[] and int threatLevels[]",
            "Print each location and its threat level using a loop"
        ]
    },
    average: {
        title: "Level 19 - Aswang Alert Tracker (Average) - C++",
        objectives: [
            "Categorize alerts by threat level and display safety recommendations",
            "Create a system that:\n  - Categorizes alerts by threat level (Low, Medium, High)\n  - Displays safety recommendations for each level\n  - Shows alert summary and safety status",
            "Use loops and conditional logic"
        ]
    },
    difficult: {
        title: "Level 19 - Aswang Alert Tracker (Difficult) - C++",
        objectives: [
            "Implement alert prioritization and generate evacuation plans",
            "Create a system that:\n  - Implements alert prioritization based on threat level and proximity\n  - Generates evacuation plans for high-risk areas\n  - Tracks alert history and patterns\n  - Displays comprehensive safety analysis and recommendations",
            "Use complex logic, prioritization algorithms, and safety planning"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Aswang Alert Tracker
===================
Alert 1: Barangay San Jose - Threat Level: 2
Alert 2: Barangay Santa Maria - Threat Level: 5
Alert 3: Barangay San Pedro - Threat Level: 3
==================`,
    
    average: `
// Expected output:
Aswang Alert Tracker
===================
Alert 1: Barangay San Jose - Threat Level: 2
Alert 2: Barangay Santa Maria - Threat Level: 5
Alert 3: Barangay San Pedro - Threat Level: 3
==================

Alert Analysis:
Barangay San Jose: Low Threat - Stay indoors after dark
Barangay Santa Maria: High Threat - Avoid area, seek shelter
Barangay San Pedro: Medium Threat - Travel with caution

Safety Status: 1 High, 1 Medium, 1 Low threat alerts
==================`,
    
    difficult: `
// Expected output:
Aswang Alert Tracker
===================
Alert 1: Barangay San Jose - Threat Level: 2
Alert 2: Barangay Santa Maria - Threat Level: 5
Alert 3: Barangay San Pedro - Threat Level: 3
==================

Alert Prioritization:
1. Barangay Santa Maria (High Threat - Priority 1)
2. Barangay San Pedro (Medium Threat - Priority 2)
3. Barangay San Jose (Low Threat - Priority 3)

Evacuation Plan:
- High Risk Areas: Barangay Santa Maria
- Evacuation Route: Use main roads, avoid shortcuts
- Safe Zones: Barangay San Jose (Low threat area)

Safety Recommendations:
- Avoid Barangay Santa Maria completely
- Travel in groups through Barangay San Pedro
- Stay indoors in Barangay San Jose after sunset
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
