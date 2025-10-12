// C++ Level 3 Objectives - Template
const objectivesData = {
    easy: {
        title: "Level 3 - C++ Challenge (Easy)",
        objectives: [
            "Create a C++ program with main function",
            "Include necessary headers",
            "Implement basic C++ syntax",
            "Print output using std::cout"
        ]
    },
    average: {
        title: "Level 3 - C++ Challenge (Average)",
        objectives: [
            "Use C++ specific features",
            "Implement proper error handling",
            "Use standard library functions",
            "Create formatted output"
        ]
    },
    difficult: {
        title: "Level 3 - C++ Challenge (Difficult)",
        objectives: [
            "Implement advanced C++ concepts",
            "Use object-oriented programming",
            "Handle complex data structures",
            "Optimize code performance"
        ]
    }
};

const examples = {
    easy: "// C++ Level 3 Easy Example",
    average: "// C++ Level 3 Average Example", 
    difficult: "// C++ Level 3 Difficult Example"
};

const selectedData = localStorage.getItem('selectedChallenge');
const data = JSON.parse(selectedData);

function displayObjectives(difficulty) {
    const objectivesContainer = document.querySelector('.objectives-container');
    const difficultyData = objectivesData[difficulty.toLowerCase()];

    if (difficultyData) {
        const content = `
                <h3>${difficultyData.title}</h3>
                <ul>
                    ${difficultyData.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
                <div class="example-output">
                    <pre>${examples[difficulty.toLowerCase()]}</pre>
                </div>
            `;
        objectivesContainer.innerHTML = content;
    }
}

displayObjectives(data.difficulty);
