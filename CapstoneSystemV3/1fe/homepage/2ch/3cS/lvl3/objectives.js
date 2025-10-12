// C# Level 3 Objectives - Template
// Use namespace to avoid conflicts
window.objectivesData = window.objectivesData || {
    easy: {
        title: "Level 3 - C# Challenge (Easy)",
        objectives: [
            "Create a C# program with Main method",
            "Use System namespace",
            "Implement basic C# syntax",
            "Print output using Console.WriteLine"
        ]
    },
    average: {
        title: "Level 3 - C# Challenge (Average)",
        objectives: [
            "Use C# specific features",
            "Implement proper error handling",
            "Use .NET framework classes",
            "Create formatted output"
        ]
    },
    difficult: {
        title: "Level 3 - C# Challenge (Difficult)",
        objectives: [
            "Implement advanced C# concepts",
            "Use object-oriented programming",
            "Handle complex data structures",
            "Use LINQ and modern C# features"
        ]
    }
};

// Use namespace to avoid conflicts
window.examples = window.examples || {
    easy: "// C# Level 3 Easy Example",
    average: "// C# Level 3 Average Example", 
    difficult: "// C# Level 3 Difficult Example"
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

(function() {
    const selectedData = localStorage.getItem('selectedChallenge');
    const data = JSON.parse(selectedData);
    window.displayObjectives(data.difficulty);
})();
