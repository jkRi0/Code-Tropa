document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('rubricsModal');
    const closeBtn = document.querySelector('.close-rubrics');
    const showRubricsBtn = document.getElementById('showRubricsBtn');
    const rubricsBody = document.querySelector('.rubrics-body');
    const totalScoreSpan = document.getElementById('totalPossibleScore');

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
        totalScoreSpan.textContent = '100';
    }

    // Event Listeners
    showRubricsBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        populateRubrics();
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

window.rubricsCriteria = rubricsCriteria;