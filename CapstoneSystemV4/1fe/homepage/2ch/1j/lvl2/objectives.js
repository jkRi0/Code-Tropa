// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 2 - Sari-Sari Store Inventory (Easy) - Java",
        objectives: [
            "Create a Java class named 'SariSariStore'",
            "Add a main method to start your program",
            "Declare three product variables with correct data types:\n  - String suka = \"Vinegar\"\n  - String itlog = \"Eggs\"\n  - String tinapay = \"Bread\"",
            "Print each product name using System.out.println"
        ]
    },
    average: {
        title: "Level 2 - Sari-Sari Store Inventory (Average) - Java",
        objectives: [
            "Add price and stock quantity for each item using appropriate data types",
            "Compute and print the total inventory value",
            "Use variables to store:\n  - Prices (double): suka=25.50, itlog=8.00, tinapay=35.00\n  - Stock (int): suka=50, itlog=100, tinapay=30",
            "Calculate total value = (price × quantity) for each item, then sum all"
        ]
    },
    difficult: {
        title: "Level 2 - Sari-Sari Store Inventory (Difficult) - Java",
        objectives: [
            "Allow input to update stock levels using Scanner",
            "Check if any stock falls below threshold (e.g., 20 items)",
            "Print a restock alert for items below threshold",
            "Create a system that:\n  - Prompts user to enter new stock quantities\n  - Updates the inventory\n  - Displays current inventory status\n  - Shows restock alerts for low stock items"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Vinegar
Eggs
Bread`,
    
    average: `
// Expected output:
Sari-Sari Store Inventory
========================
Vinegar: 50 units @ ₱25.50 = ₱1,275.00
Eggs: 100 units @ ₱8.00 = ₱800.00
Bread: 30 units @ ₱35.00 = ₱1,050.00
========================
Total Inventory Value: ₱3,125.00`,
    
    difficult: `
// Expected output (after user input):
Enter new stock for Vinegar: 15
Enter new stock for Eggs: 25
Enter new stock for Bread: 10

Updated Inventory:
Vinegar: 15 units @ ₱25.50 = ₱382.50
Eggs: 25 units @ ₱8.00 = ₱200.00
Bread: 10 units @ ₱35.00 = ₱350.00

⚠️ RESTOCK ALERT: Vinegar is below threshold (15 < 20)
⚠️ RESTOCK ALERT: Eggs is below threshold (25 < 20)
⚠️ RESTOCK ALERT: Bread is below threshold (10 < 20)
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
})();// objectives for level 2