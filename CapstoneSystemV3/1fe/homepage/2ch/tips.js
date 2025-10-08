document.addEventListener('DOMContentLoaded', function() {
    const tipsModal = document.getElementById('tipsModal');
    const showTipsBtn = document.getElementById('showTipsBtn');
    const closeTipsBtn = document.querySelector('.close-tips');
    const tipQuestionDiv = document.getElementById('tipQuestion');
    const tipOptionsDiv = document.getElementById('tipOptions');
    const submitAnswerBtn = document.getElementById('submitAnswerBtn');
    const tipFeedbackDiv = document.getElementById('tipFeedback');
    const tipContentDiv = document.getElementById('tipContent');

    let currentQuestion = null;
    let currentAnswer = null;
    let selectedLevel = null;
    let selectedDifficulty = null;

    const tipsData = {
        lvl1: {
            easy: {
                question: "What is the primary purpose of the 'main' method in a Java program?",
                options: {
                    a: "To declare global variables",
                    b: "To define a class constructor",
                    c: "To serve as the entry point for program execution",
                    d: "To handle exceptions"
                },
                correctAnswer: "c",
                tip: "The 'main' method is crucial because it's where the Java Virtual Machine (JVM) starts executing your code. Without it, your program wouldn't know where to begin!"
            },
            average: {
                question: "Which of the following is the correct way to add a single-line comment in Java?",
                options: {
                    a: "/* This is a comment */",
                    b: "// This is a comment",
                    c: "# This is a comment",
                    d: "--This is a comment"
                },
                correctAnswer: "b",
                tip: "Single-line comments in Java start with two forward slashes (//). They are used to explain a single line or a small block of code."
            },
            difficult: {
                question: "Which Java method is commonly used for formatted output to the console?",
                options: {
                    a: "System.out.println()",
                    b: "System.out.print()",
                    c: "System.out.format()",
                    d: "System.out.write()"
                },
                correctAnswer: "c",
                tip: "For more controlled and formatted output in Java, System.out.printf() (or System.out.format()) is often preferred. It allows you to use format specifiers like %d for integers, %s for strings, and %n for newlines, similar to C's printf."
            }
        },
        // Placeholder data for levels 2-20
        // You will need to replace this with actual questions and tips for each level and difficulty
        lvl2: {
            easy: {
                question: "Placeholder question for Level 2 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 2 Easy."
            },
            average: {
                question: "Placeholder question for Level 2 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 2 Average."
            },
            difficult: {
                question: "Placeholder question for Level 2 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 2 Difficult."
            }
        },
        lvl3: {
            easy: {
                question: "Placeholder question for Level 3 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 3 Easy."
            },
            average: {
                question: "Placeholder question for Level 3 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 3 Average."
            },
            difficult: {
                question: "Placeholder question for Level 3 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 3 Difficult."
            }
        },
        lvl4: {
            easy: {
                question: "Placeholder question for Level 4 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 4 Easy."
            },
            average: {
                question: "Placeholder question for Level 4 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 4 Average."
            },
            difficult: {
                question: "Placeholder question for Level 4 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 4 Difficult."
            }
        },
        lvl5: {
            easy: {
                question: "Placeholder question for Level 5 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 5 Easy."
            },
            average: {
                question: "Placeholder question for Level 5 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 5 Average."
            },
            difficult: {
                question: "Placeholder question for Level 5 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 5 Difficult."
            }
        },
        lvl6: {
            easy: {
                question: "Placeholder question for Level 6 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 6 Easy."
            },
            average: {
                question: "Placeholder question for Level 6 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 6 Average."
            },
            difficult: {
                question: "Placeholder question for Level 6 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 6 Difficult."
            }
        },
        lvl7: {
            easy: {
                question: "Placeholder question for Level 7 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 7 Easy."
            },
            average: {
                question: "Placeholder question for Level 7 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 7 Average."
            },
            difficult: {
                question: "Placeholder question for Level 7 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 7 Difficult."
            }
        },
        lvl8: {
            easy: {
                question: "Placeholder question for Level 8 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 8 Easy."
            },
            average: {
                question: "Placeholder question for Level 8 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 8 Average."
            },
            difficult: {
                question: "Placeholder question for Level 8 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 8 Difficult."
            }
        },
        lvl9: {
            easy: {
                question: "Placeholder question for Level 9 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 9 Easy."
            },
            average: {
                question: "Placeholder question for Level 9 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 9 Average."
            },
            difficult: {
                question: "Placeholder question for Level 9 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 9 Difficult."
            }
        },
        lvl10: {
            easy: {
                question: "Placeholder question for Level 10 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 10 Easy."
            },
            average: {
                question: "Placeholder question for Level 10 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 10 Average."
            },
            difficult: {
                question: "Placeholder question for Level 10 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 10 Difficult."
            }
        },
        lvl11: {
            easy: {
                question: "Placeholder question for Level 11 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 11 Easy."
            },
            average: {
                question: "Placeholder question for Level 11 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 11 Average."
            },
            difficult: {
                question: "Placeholder question for Level 11 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 11 Difficult."
            }
        },
        lvl12: {
            easy: {
                question: "Placeholder question for Level 12 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 12 Easy."
            },
            average: {
                question: "Placeholder question for Level 12 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 12 Average."
            },
            difficult: {
                question: "Placeholder question for Level 12 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 12 Difficult."
            }
        },
        lvl13: {
            easy: {
                question: "Placeholder question for Level 13 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 13 Easy."
            },
            average: {
                question: "Placeholder question for Level 13 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 13 Average."
            },
            difficult: {
                question: "Placeholder question for Level 13 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 13 Difficult."
            }
        },
        lvl14: {
            easy: {
                question: "Placeholder question for Level 14 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 14 Easy."
            },
            average: {
                question: "Placeholder question for Level 14 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 14 Average."
            },
            difficult: {
                question: "Placeholder question for Level 14 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 14 Difficult."
            }
        },
        lvl15: {
            easy: {
                question: "Placeholder question for Level 15 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 15 Easy."
            },
            average: {
                question: "Placeholder question for Level 15 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 15 Average."
            },
            difficult: {
                question: "Placeholder question for Level 15 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 15 Difficult."
            }
        },
        lvl16: {
            easy: {
                question: "Placeholder question for Level 16 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 16 Easy."
            },
            average: {
                question: "Placeholder question for Level 16 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 16 Average."
            },
            difficult: {
                question: "Placeholder question for Level 16 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 16 Difficult."
            }
        },
        lvl17: {
            easy: {
                question: "Placeholder question for Level 17 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 17 Easy."
            },
            average: {
                question: "Placeholder question for Level 17 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 17 Average."
            },
            difficult: {
                question: "Placeholder question for Level 17 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 17 Difficult."
            }
        },
        lvl18: {
            easy: {
                question: "Placeholder question for Level 18 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 18 Easy."
            },
            average: {
                question: "Placeholder question for Level 18 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 18 Average."
            },
            difficult: {
                question: "Placeholder question for Level 18 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 18 Difficult."
            }
        },
        lvl19: {
            easy: {
                question: "Placeholder question for Level 19 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 19 Easy."
            },
            average: {
                question: "Placeholder question for Level 19 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 19 Average."
            },
            difficult: {
                question: "Placeholder question for Level 19 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 19 Difficult."
            }
        },
        lvl20: {
            easy: {
                question: "Placeholder question for Level 20 Easy?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "a",
                tip: "Placeholder tip for Level 20 Easy."
            },
            average: {
                question: "Placeholder question for Level 20 Average?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "b",
                tip: "Placeholder tip for Level 20 Average."
            },
            difficult: {
                question: "Placeholder question for Level 20 Difficult?",
                options: {
                    a: "Option A",
                    b: "Option B",
                    c: "Option C",
                    d: "Option D"
                },
                correctAnswer: "c",
                tip: "Placeholder tip for Level 20 Difficult."
            }
        }
    };

    // Open the tips modal
    showTipsBtn.onclick = function() {
        tipsModal.style.display = 'block';
        loadTipContent();
    };

    // Close the tips modal
    closeTipsBtn.onclick = function() {
        tipsModal.style.display = 'none';
        resetTipModal();
    };

    // Close the modal if the user clicks outside of it
    window.onclick = function(event) {
        if (event.target == tipsModal) {
            tipsModal.style.display = 'none';
            resetTipModal();
        }
    };

    function resetTipModal() {
        tipQuestionDiv.innerHTML = '';
        tipOptionsDiv.innerHTML = '';
        tipFeedbackDiv.innerHTML = '';
        tipContentDiv.innerHTML = '';
        submitAnswerBtn.style.display = 'block';
        submitAnswerBtn.disabled = false;
    }

    function loadTipContent() {
        resetTipModal();
        const selectedChallengeData = JSON.parse(localStorage.getItem('selectedChallenge'));
        if (!selectedChallengeData) {
            tipQuestionDiv.innerHTML = '<p>No challenge selected.</p>';
            submitAnswerBtn.style.display = 'none';
            return;
        }

        selectedLevel = selectedChallengeData.level.replace('lev', 'lvl');
        selectedDifficulty = selectedChallengeData.difficulty.toLowerCase();

        const levelTips = tipsData[selectedLevel];

        if (!levelTips || !levelTips[selectedDifficulty]) {
            tipQuestionDiv.innerHTML = '<p>No tips available for this level/difficulty.</p>';
            submitAnswerBtn.style.display = 'none';
            return;
        }

        currentQuestion = levelTips[selectedDifficulty];

        const answeredKey = `tipAnswered_${selectedLevel}_${selectedDifficulty}`;
        const hasBeenAnswered = localStorage.getItem(answeredKey);

        if (hasBeenAnswered) {
            // If already answered, show the tip directly
            tipQuestionDiv.innerHTML = '<p>You have already answered the question for this tip.</p>';
            tipContentDiv.innerHTML = `<p><strong>Tip:</strong> ${currentQuestion.tip}</p>`;
            submitAnswerBtn.style.display = 'none';
        } else {
            // Display the question
            tipQuestionDiv.innerHTML = `<p>${currentQuestion.question}</p>`;
            let optionsHtml = '';
            for (const key in currentQuestion.options) {
                optionsHtml += `
                    <div>
                        <input type="radio" id="${key}" name="tipOption" value="${key}">
                        <label for="${key}">${key.toUpperCase()}. ${currentQuestion.options[key]}</label>
                    </div>
                `;
            }
            tipOptionsDiv.innerHTML = optionsHtml;
            submitAnswerBtn.style.display = 'block';
        }
    }

    submitAnswerBtn.onclick = function() {
        const selectedOption = document.querySelector('input[name="tipOption"]:checked');
        if (!selectedOption) {
            tipFeedbackDiv.innerHTML = '<p style="color: orange;">Please select an answer.</p>';
            return;
        }

        const userAnswer = selectedOption.value;
        const answeredKey = `tipAnswered_${selectedLevel}_${selectedDifficulty}`;

        if (userAnswer === currentQuestion.correctAnswer) {
            tipFeedbackDiv.innerHTML = '<p style="color: green;">Correct! Here is your tip:</p>';
            tipContentDiv.innerHTML = `<p><strong>Tip:</strong> ${currentQuestion.tip}</p>`;
            localStorage.setItem(answeredKey, 'true'); // Mark as answered
            submitAnswerBtn.style.display = 'none';
        } else {
            tipFeedbackDiv.innerHTML = '<p style="color: red;">Incorrect. Please try again!</p>';
            // Optionally, you might want to prevent re-submitting for incorrect answers if the user can only answer once
            // For now, I'll allow retries until correct or until they close the modal.
        }
    };
});
