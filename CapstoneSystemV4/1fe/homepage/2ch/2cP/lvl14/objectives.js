// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 14 - Filipino Names Analyzer (Easy) - C++",
        objectives: [
            "Create a C++ program with main function",
            "Include necessary headers (iostream, string)",
            "Store 3 Filipino names and their lengths in arrays",
            "Use parallel arrays: string names[] and int lengths[]",
            "Print each name and its length using a loop"
        ]
    },
    average: {
        title: "Level 14 - Filipino Names Analyzer (Average) - C++",
        objectives: [
            "Count vowels and consonants in each name",
            "Create a system that:\n  - Counts vowels (a, e, i, o, u) in each name\n  - Counts consonants in each name\n  - Displays vowel and consonant counts for each name",
            "Use loops and character analysis"
        ]
    },
    difficult: {
        title: "Level 14 - Filipino Names Analyzer (Difficult) - C++",
        objectives: [
            "Identify common Filipino name patterns and generate name suggestions",
            "Create a system that:\n  - Identifies common Filipino name patterns (e.g., Maria, Jose, etc.)\n  - Generates name suggestions based on patterns\n  - Analyzes name popularity and cultural significance\n  - Displays detailed name analysis",
            "Use complex string analysis, pattern recognition, and cultural context"
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
