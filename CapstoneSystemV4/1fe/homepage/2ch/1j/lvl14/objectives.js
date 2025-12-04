// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 14 - Filipino Names Analyzer (Easy) - Java",
        objectives: [
            "Create a Java class named 'FilipinoNamesAnalyzer'",
            "Add a main method to start your program",
            "Declare an array: String[] names",
            "Store 3 Filipino names in the array",
            "Use a for loop to print each name",
            "Use the length() method to get and display each name's character count"
        ]
    },
    average: {
        title: "Level 14 - Filipino Names Analyzer (Average) - Java",
        objectives: [
            "Use nested loops and string methods to count vowels and consonants",
            "Create a system that:\n  - Uses nested loops (outer for names, inner for characters)\n  - Uses charAt() or toCharArray() to access each character\n  - Uses conditional statements to check if character is vowel (a, e, i, o, u)\n  - Counts vowels and consonants for each name\n  - Displays vowel and consonant counts for each name",
            "Use nested loops, string methods, and character analysis"
        ]
    },
    difficult: {
        title: "Level 14 - Filipino Names Analyzer (Difficult) - Java",
        objectives: [
            "Use methods, string operations, and arrays to analyze names and generate suggestions",
            "Create a system that:\n  - Uses methods to identify name patterns (e.g., check if name equals 'Maria' or 'Jose')\n  - Uses methods to determine cultural significance based on name patterns\n  - Uses arrays to store and display name suggestions\n  - Uses loops to process all names and display detailed analysis",
            "Use methods with return values, string comparisons, arrays, and loops"
        ]
    }
};

// Example solutions to show in comments
// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: `
// Expected output:
Filipino Names Analyzer
======================
Name 1: Maria - 5 characters
Name 2: Jose - 4 characters
Name 3: Ana - 3 characters
======================`,
    
    average: `
// Expected output:
Filipino Names Analyzer
======================
Name 1: Maria - 5 characters
  Vowels: 3 (a, i, a)
  Consonants: 2 (M, r)
Name 2: Jose - 4 characters
  Vowels: 2 (o, e)
  Consonants: 2 (J, s)
Name 3: Ana - 3 characters
  Vowels: 3 (A, a)
  Consonants: 0
======================`,
    
    difficult: `
// Expected output:
Filipino Names Analyzer
======================
Name 1: Maria - 5 characters
  Vowels: 3 (a, i, a)
  Consonants: 2 (M, r)
  Pattern: Common Filipino name
  Cultural Significance: High
Name 2: Jose - 4 characters
  Vowels: 2 (o, e)
  Consonants: 2 (J, s)
  Pattern: Common Filipino name
  Cultural Significance: High
Name 3: Ana - 3 characters
  Vowels: 3 (A, a)
  Consonants: 0
  Pattern: Short Filipino name
  Cultural Significance: Medium

Name Suggestions:
- Maria Clara
- Jose Rizal
- Ana Luna
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