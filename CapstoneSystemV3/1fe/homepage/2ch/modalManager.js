document.addEventListener('DOMContentLoaded', function() {
    const rubricsModal = document.getElementById('rubricsModal');
    const closeRubricsBtn = document.querySelector('.close-rubrics');
    const showRubricsBtn = document.getElementById('showRubricsBtn');
    const rubricsBody = document.querySelector('.rubrics-body');
    const totalPossibleScoreSpan = document.getElementById('totalPossibleScore');

    // New Scoring Modal Elements
    const scoringModal = document.getElementById('scoringModal');
    const closeScoringModalBtn = document.getElementById('closeScoringModal');
    const finalTotalScoreSpan = document.getElementById('finalTotalScore');
    const criteriaScoresDisplay = document.getElementById('criteriaScoresDisplay');
    const geminiAiFeedbackDiv = document.getElementById('geminiAiFeedback');
    const loadingAnimation = document.getElementById('loadingAnimation');

    const rubricsCriteria = {
        easy: {
            accuracy: {
                criteria: 'Accuracy',
                weight: 40,
                description: 'Code produces correct output and follows all requirements'
            },
            efficiency: {
                criteria: 'Efficiency',
                weight: 10,
                description: 'Code uses appropriate methods and minimal resources'
            },
            readability: {
                criteria: 'Readability',
                weight: 30,
                description: 'Code is well-formatted, properly indented, and uses clear naming'
            },
            time: {
                criteria: 'Time',
                weight: 20,
                description: 'Solution submitted within reasonable time frame'
            }
        },
        average: {
            accuracy: {
                criteria: 'Accuracy',
                weight: 30,
                description: 'Code produces correct output with proper error handling'
            },
            efficiency: {
                criteria: 'Efficiency',
                weight: 25,
                description: 'Code uses optimal methods and efficient algorithms'
            },
            readability: {
                criteria: 'Readability',
                weight: 25,
                description: 'Code is well-documented with comments and consistent formatting'
            },
            time: {
                criteria: 'Time',
                weight: 20,
                description: 'Solution submitted within reasonable time frame'
            }
        },
        difficult: {
            accuracy: {
                criteria: 'Accuracy',
                weight: 20,
                description: 'Code produces correct output with comprehensive error handling'
            },
            efficiency: {
                criteria: 'Efficiency',
                weight: 40,
                description: 'Code uses optimal algorithms and best programming practices'
            },
            readability: {
                criteria: 'Readability',
                weight: 25,
                description: 'Code includes detailed documentation and follows clean code principles'
            },
            time: {
                criteria: 'Time',
                weight: 15,
                description: 'Solution submitted within reasonable time frame'
            }
        }
    };

    function populateRubrics() {
        // Get current difficulty from verification panel
        const difficultySpan = document.querySelector('#selectedDifficulty');
        const currentDifficulty = difficultySpan.textContent.toLowerCase();
        const criteriaSet = rubricsCriteria[currentDifficulty];

        rubricsBody.innerHTML = '';
        Object.values(criteriaSet).forEach(item => {
            const row = document.createElement('div');
            row.className = 'rubrics-row';
            row.innerHTML = `
                <div>${item.criteria}</div>
                <div>${item.weight}%</div>
                <div>${item.description}</div>
            `;
            rubricsBody.appendChild(row);
        });

        // Update total score display
        totalPossibleScoreSpan.textContent = '100';
    }

    // Function to display scoring results
    function showScoringModal(scoringData) {
        finalTotalScoreSpan.textContent = scoringData.totalScore;
        criteriaScoresDisplay.innerHTML = '';
        for (const criterion in scoringData.criteriaScores) {
            const scoreItem = document.createElement('div');
            scoreItem.innerHTML = `<strong>${criterion.charAt(0).toUpperCase() + criterion.slice(1)}:</strong> ${scoringData.criteriaScores[criterion]}%`;
            criteriaScoresDisplay.appendChild(scoreItem);
        }
        geminiAiFeedbackDiv.textContent = 'Generating AI feedback...'; // Placeholder
        scoringModal.style.display = 'flex'; // Use flex to center content
    }

    // Functions to manage loading animation
    function showLoadingAnimation() {
        loadingAnimation.classList.add('show');
    }

    function hideLoadingAnimation() {
        loadingAnimation.classList.remove('show');
    }

    // Event Listeners for Rubrics Modal
    showRubricsBtn.addEventListener('click', () => {
        rubricsModal.style.display = 'block';
        populateRubrics();
    });

    closeRubricsBtn.addEventListener('click', () => {
        rubricsModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === rubricsModal) {
            rubricsModal.style.display = 'none';
        }
    });

    // Event Listeners for Scoring Modal
    closeScoringModalBtn.addEventListener('click', () => {
        scoringModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === scoringModal) {
            scoringModal.style.display = 'none';
        }
    });

    // Expose functions to the global scope for use by other scripts
    window.showScoringModal = showScoringModal;
    window.showLoadingAnimation = showLoadingAnimation;
    window.hideLoadingAnimation = hideLoadingAnimation;
    window.rubricsCriteria = rubricsCriteria; // Keep this for codeAnalyzer.js

    // Placeholder for Gemini API Key (User should replace this with their actual key)
    const GEMINI_API_KEY = "AIzaSyB34RNQAx1CxGgjt6FJ6apeKSnsj2GJtf0";

    async function getGeminiFeedback(submittedCode, solutionCode, difficulty, scoringResult) {
        if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
            return "Please replace 'YOUR_GEMINI_API_KEY_HERE' in modalManager.js with your actual Gemini API key to receive AI feedback.";
        }

        const prompt = `
        You are an AI programming tutor. A student has submitted the following Java code for a '${difficulty}' level challenge:
        
        Submitted Code:
        \`\`\`java
        ${submittedCode}
        \`\`\`
        
        The expected solution code was:
        \`\`\`java
        ${solutionCode}
        \`\`\`
        
        Their current score for each criterion is: ${JSON.stringify(scoringResult.criteriaScores, null, 2)}
        Their total score is: ${scoringResult.totalScore}%
        
        Please provide constructive feedback to the student based on their submitted code, comparing it to the solution and considering their scores. Focus on explaining *why* certain aspects received the score they did and how they can improve. Provide actionable advice for improving their code in terms of accuracy, efficiency, and readability. Keep the feedback concise and encouraging, around 2-3 sentences.
        `;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Gemini API error:", errorData);
                return `Error generating AI feedback: ${errorData.error.message || response.statusText}`;
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            return `Failed to get AI feedback: ${error.message}`;
        }
    }

    window.getGeminiFeedback = getGeminiFeedback;
});