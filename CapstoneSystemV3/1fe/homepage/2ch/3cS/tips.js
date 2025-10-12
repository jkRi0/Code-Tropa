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
                question: "What is the primary purpose of the 'Main' method in a C# program?",
                options: {
                    a: "To declare global variables",
                    b: "To define a class constructor",
                    c: "To serve as the entry point for program execution",
                    d: "To handle exceptions"
                },
                correctAnswer: "c",
                tip: "The 'Main' method is crucial because it's where the C# program starts executing. Every C# program must have exactly one Main method as the entry point!"
            },
            average: {
                question: "Which of the following is the correct way to add a single-line comment in C#?",
                options: {
                    a: "/* This is a comment */",
                    b: "// This is a comment",
                    c: "# This is a comment",
                    d: "--This is a comment"
                },
                correctAnswer: "b",
                tip: "Single-line comments in C# start with two forward slashes (//). They are used to explain a single line or a small block of code."
            },
            difficult: {
                question: "Which C# class is commonly used for formatted output to the console?",
                options: {
                    a: "Console.WriteLine()",
                    b: "Console.Read()",
                    c: "Console.Error()",
                    d: "Console.Out()"
                },
                correctAnswer: "a",
                tip: "The 'Console.WriteLine()' method is part of the System namespace and is used for standard output. It automatically adds a newline after the output, making it perfect for displaying formatted text."
            }
        },
        // Placeholder data for levels 2-20
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

    // Show tips modal
    showTipsBtn.addEventListener('click', function() {
        const selectedData = JSON.parse(localStorage.getItem('selectedChallenge'));
        if (selectedData) {
            selectedLevel = selectedData.level;
            selectedDifficulty = selectedData.difficulty.toLowerCase();
            
            const levelData = tipsData[selectedLevel];
            if (levelData && levelData[selectedDifficulty]) {
                currentQuestion = levelData[selectedDifficulty];
                displayQuestion();
                tipsModal.style.display = 'block';
            } else {
                alert('No tips available for this level and difficulty combination.');
            }
        } else {
            alert('No challenge data found. Please select a challenge first.');
        }
    });

    // Close tips modal
    closeTipsBtn.addEventListener('click', function() {
        tipsModal.style.display = 'none';
        resetModal();
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === tipsModal) {
            tipsModal.style.display = 'none';
            resetModal();
        }
    });

    // Submit answer
    submitAnswerBtn.addEventListener('click', function() {
        if (currentAnswer) {
            const isCorrect = currentAnswer === currentQuestion.correctAnswer;
            displayFeedback(isCorrect);
        } else {
            alert('Please select an answer before submitting.');
        }
    });

    function displayQuestion() {
        tipQuestionDiv.innerHTML = `<h3>${currentQuestion.question}</h3>`;
        
        const optionsHtml = Object.entries(currentQuestion.options).map(([key, value]) => 
            `<label><input type="radio" name="answer" value="${key}"> ${key.toUpperCase()}. ${value}</label>`
        ).join('<br>');
        
        tipOptionsDiv.innerHTML = optionsHtml;
        
        // Add event listeners to radio buttons
        const radioButtons = tipOptionsDiv.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                currentAnswer = this.value;
            });
        });
        
        // Reset feedback and content
        tipFeedbackDiv.innerHTML = '';
        tipContentDiv.innerHTML = '';
        submitAnswerBtn.style.display = 'block';
    }

    function displayFeedback(isCorrect) {
        if (isCorrect) {
            tipFeedbackDiv.innerHTML = '<p style="color: green;">✓ Correct! Well done!</p>';
        } else {
            tipFeedbackDiv.innerHTML = '<p style="color: red;">✗ Incorrect. The correct answer is ' + 
                currentQuestion.correctAnswer.toUpperCase() + '.</p>';
        }
        
        tipContentDiv.innerHTML = `<div class="tip-content"><h4>💡 Tip:</h4><p>${currentQuestion.tip}</p></div>`;
        submitAnswerBtn.style.display = 'none';
    }

    function resetModal() {
        currentQuestion = null;
        currentAnswer = null;
        tipQuestionDiv.innerHTML = '';
        tipOptionsDiv.innerHTML = '';
        tipFeedbackDiv.innerHTML = '';
        tipContentDiv.innerHTML = '';
        submitAnswerBtn.style.display = 'block';
    }
});

