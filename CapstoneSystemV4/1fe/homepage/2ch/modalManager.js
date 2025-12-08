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
        const PASSING_SCORE = 80;
        const totalScore = scoringData.totalScore;
        const hasPassed = totalScore >= PASSING_SCORE;
        
        // Update score display
        finalTotalScoreSpan.textContent = totalScore;
        
        // Update pass/fail status
        const passFailStatus = document.getElementById('passFailStatus');
        passFailStatus.className = `pass-fail-status ${hasPassed ? 'passed' : 'failed'}`;
        passFailStatus.textContent = hasPassed ? 'PASSED!' : 'FAILED';
        
        // Update criteria scores display
        criteriaScoresDisplay.innerHTML = '';
        const currentDifficulty = document.querySelector('#selectedDifficulty')?.textContent.toLowerCase() || 'easy';
        const currentRubrics = rubricsCriteria[currentDifficulty] || rubricsCriteria.easy;
        
        for (const criterion in scoringData.criteriaScores) {
            const scoreItem = document.createElement('div');
            const rawScore = scoringData.criteriaScores[criterion];
            const weight = currentRubrics[criterion]?.weight || 0;
            const percentage = weight > 0 ? Math.round((rawScore / weight) * 100) : 0;
            scoreItem.innerHTML = `<strong>${criterion.charAt(0).toUpperCase() + criterion.slice(1)}:</strong> ${percentage}% `;
            criteriaScoresDisplay.appendChild(scoreItem);
        }
        
        // Update action buttons based on pass/fail status
        updateScoringActions(hasPassed);
        
        geminiAiFeedbackDiv.textContent = 'Generating AI feedback...'; // Placeholder
        scoringModal.style.display = 'flex'; // Use flex to center content
    }

    // Function to update scoring action buttons based on pass/fail status
    function updateScoringActions(hasPassed) {
        const scoringActions = document.getElementById('scoringActions');
        scoringActions.innerHTML = '';
        
        if (hasPassed) {
            // Passed: Show Exit and Next Level buttons
            const exitBtn = document.createElement('button');
            exitBtn.className = 'btn-exit';
            exitBtn.textContent = 'Exit';
            exitBtn.onclick = exitToHomepage;
            
            const nextLevelBtn = document.createElement('button');
            nextLevelBtn.className = 'btn-next-level';
            nextLevelBtn.textContent = 'Next Level';
            nextLevelBtn.onclick = goToNextLevel;
            
            scoringActions.appendChild(exitBtn);
            scoringActions.appendChild(nextLevelBtn);
        } else {
            // Failed: Show Exit and Retry buttons
            const exitBtn = document.createElement('button');
            exitBtn.className = 'btn-exit';
            exitBtn.textContent = 'Exit';
            exitBtn.onclick = exitToHomepage;
            
            const retryBtn = document.createElement('button');
            retryBtn.className = 'btn-retry';
            retryBtn.textContent = 'Retry';
            retryBtn.onclick = retryChallenge;
            
            scoringActions.appendChild(exitBtn);
            scoringActions.appendChild(retryBtn);
        }
    }

    // Function to exit to homepage
    function exitToHomepage() {
        // Close the scoring modal
        scoringModal.style.display = 'none';
        // Redirect to homepage
        window.location.href = '../index.html';
    }

    // Function to go to next level
    function goToNextLevel() {
        // Close the scoring modal
        scoringModal.style.display = 'none';
        
        // Get current challenge data
        const selectedData = JSON.parse(localStorage.getItem('selectedChallenge'));
        if (selectedData && selectedData.level) {
            const currentLevelNumber = parseInt(selectedData.level.replace('lev', ''));
            const nextLevelNumber = currentLevelNumber + 1;
            const nextLevel = `lev${nextLevelNumber}`;
            
            // Check if next level exists (you might want to implement level validation)
            // For now, we'll assume levels go up to a certain number
            if (nextLevelNumber <= 10) { // Assuming max 10 levels, adjust as needed
                // Update the selected challenge data
                const updatedData = {
                    ...selectedData,
                    level: nextLevel
                };
                localStorage.setItem('selectedChallenge', JSON.stringify(updatedData));
                
                // Reload the page with the new level
                window.location.reload();
            } else {
                // No more levels, go to homepage
                alert('Congratulations! You have completed all available levels!');
                window.location.href = '../index.html';
            }
        } else {
            // Fallback to homepage if no challenge data
            window.location.href = '../index.html';
        }
    }

    // Function to retry the current challenge
    function retryChallenge() {
        // Close the scoring modal
        scoringModal.style.display = 'none';
        
        // Clear the code editor content
        if (window.monacoEditor) {
            window.monacoEditor.setValue('');
        }
        
        // Clear the output terminal
        const outputTerminal = document.getElementById('outputTerminal');
        if (outputTerminal) {
            outputTerminal.textContent = 'Output/terminal';
        }
        
        // Optionally show a message
        console.log('Challenge retry initiated');
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


    // Load Gemini API Key from config.js (gitignored file)
    // The config.js file is not committed to GitHub for security
    // Make sure config.js is loaded before this script in index.html
    const GEMINI_API_KEY = (window.APP_CONFIG && window.APP_CONFIG.GEMINI_API_KEY) 
        ? window.APP_CONFIG.GEMINI_API_KEY 
        : "YOUR_GEMINI_API_KEY_HERE";

    /**
     * Generate heuristic feedback based on scoring analysis
     * @param {string} submittedCode - The submitted code
     * @param {string} solutionCode - The solution code
     * @param {string} difficulty - Difficulty level
     * @param {object} scoringResult - Scoring result with analysis data
     * @returns {string} Heuristic feedback message
     */
    function generateHeuristicFeedback(submittedCode, solutionCode, difficulty, scoringResult) {
        const feedback = [];
        const analysis = scoringResult.analysis || {};
        const criteriaScores = scoringResult.criteriaScores || {};
        const rubrics = rubricsCriteria[difficulty] || rubricsCriteria.easy;
        
        // Analyze code patterns
        const hasComments = /\/\/|\/\*/.test(submittedCode);
        const hasLoops = /\b(for|while|do)\s*\(/.test(submittedCode);
        const hasMethods = /\b(public|private|static)?\s*\w+\s+\w+\s*\(/.test(submittedCode);
        const variableNames = (submittedCode.match(/\b(int|String|double|float|boolean|char)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*[=;]/g) || [])
            .map(m => m.match(/\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*[=;]/)?.[1])
            .filter(Boolean);
        const meaningfulVars = variableNames.filter(v => v.length >= 3 && !/^[ijklmn]$/.test(v));
        
        // ACCURACY FEEDBACK (includes objectives compliance)
        // Note: criteriaScores contain raw points, not percentages
        const accuracyScore = criteriaScores.accuracy || 0;
        const accuracyWeight = rubrics.accuracy.weight;
        const accuracyPercent = accuracyWeight > 0 ? Math.round((accuracyScore / accuracyWeight) * 100) : 0;
        
        // Check objectives compliance
        const objectivesCompliance = analysis.objectives || null;
        const objectivesMet = objectivesCompliance ? Math.round(objectivesCompliance.complianceScore * 100) : null;
        
        if (accuracyPercent === 100) {
            feedback.push("**Accuracy (100%)**: Excellent! Your code produces the correct output and matches the expected solution.");
            if (objectivesMet !== null && objectivesMet === 100) {
                feedback.push("   - All objectives met! Your code fulfills all requirements.");
            }
        } else if (accuracyPercent >= 80) {
            feedback.push(`**Accuracy (${accuracyPercent}%)**: Your code is mostly correct but has some differences.`);
            if (objectivesCompliance && objectivesCompliance.totalObjectives > 0) {
                if (objectivesMet >= 80) {
                    feedback.push(`   - Objectives compliance: ${objectivesMet}% (${objectivesCompliance.metCount}/${objectivesCompliance.totalObjectives} objectives met)`);
                } else {
                    feedback.push(`   - Objectives compliance: ${objectivesMet}% (${objectivesCompliance.metCount}/${objectivesCompliance.totalObjectives} objectives met)`);
                    if (objectivesCompliance.missedObjectives.length > 0) {
                        const topMissed = objectivesCompliance.missedObjectives.slice(0, 2);
                        feedback.push(`   - Missing objectives: ${topMissed.map(o => o.objective.substring(0, 50) + '...').join(', ')}`);
                    }
                }
            }
            if (analysis.accuracy) {
                if (analysis.accuracy.outputSimilarity !== null && analysis.accuracy.outputSimilarity < 1.0) {
                    const similarity = Math.round(analysis.accuracy.outputSimilarity * 100);
                    feedback.push(`   - Output similarity: ${similarity}% - Your output is close but not exactly matching.`);
                }
                if (analysis.accuracy.codeSimilarity < 0.8) {
                    feedback.push(`   - Code structure similarity: ${Math.round(analysis.accuracy.codeSimilarity * 100)}% - Consider reviewing the solution's approach.`);
                }
            }
        } else if (accuracyPercent >= 50) {
            feedback.push(`**Accuracy (${accuracyPercent}%)**: Your code has significant differences from the expected solution.`);
            if (objectivesCompliance && objectivesCompliance.totalObjectives > 0) {
                feedback.push(`   - Objectives compliance: ${objectivesMet}% (${objectivesCompliance.metCount}/${objectivesCompliance.totalObjectives} objectives met)`);
                if (objectivesCompliance.missedObjectives.length > 0) {
                    const topMissed = objectivesCompliance.missedObjectives.slice(0, 3);
                    feedback.push(`   - Missing objectives:`);
                    topMissed.forEach(obj => {
                        feedback.push(`     • ${obj.objective.substring(0, 60)}${obj.objective.length > 60 ? '...' : ''}`);
                    });
                }
            }
            if (analysis.accuracy) {
                if (analysis.accuracy.outputSimilarity !== null) {
                    feedback.push(`   - Output match: ${Math.round(analysis.accuracy.outputSimilarity * 100)}%`);
                }
                feedback.push(`   - Code structure: ${Math.round(analysis.accuracy.codeSimilarity * 100)}% similar`);
            }
            feedback.push("   - Review the solution code and objectives to understand the correct approach.");
        } else {
            feedback.push(`**Accuracy (${accuracyPercent}%)**: Your code doesn't match the expected solution.`);
            if (objectivesCompliance && objectivesCompliance.totalObjectives > 0) {
                feedback.push(`   - Objectives compliance: ${objectivesMet}% (${objectivesCompliance.metCount}/${objectivesCompliance.totalObjectives} objectives met)`);
                if (objectivesCompliance.missedObjectives.length > 0) {
                    feedback.push(`   - Please review these objectives:`);
                    objectivesCompliance.missedObjectives.slice(0, 3).forEach(obj => {
                        feedback.push(`     • ${obj.objective.substring(0, 60)}${obj.objective.length > 60 ? '...' : ''}`);
                    });
                }
            }
            feedback.push("   - Please review the requirements and objectives of the challenge.");
        }
        
        // EFFICIENCY FEEDBACK
        // Note: criteriaScores contain raw points, not percentages
        const efficiencyScore = criteriaScores.efficiency || 0;
        const efficiencyWeight = rubrics.efficiency.weight;
        const efficiencyPercent = efficiencyWeight > 0 ? Math.round((efficiencyScore / efficiencyWeight) * 100) : 0;
        
        if (efficiencyPercent === 100) {
            feedback.push("**Efficiency (100%)**: Great! Your code uses efficient algorithms and optimal complexity.");
        } else if (efficiencyPercent >= 70) {
            feedback.push(`**Efficiency (${efficiencyPercent}%)**: Your code is reasonably efficient but could be improved.`);
            if (analysis.efficiency) {
                const complexityDiff = analysis.efficiency.complexityDiff;
                if (complexityDiff > 0) {
                    feedback.push(`   - Your code has ${complexityDiff} more complexity points than the solution.`);
                    if (analysis.efficiency.submitted.loops > analysis.efficiency.solution.loops) {
                        feedback.push(`   - Consider reducing the number of loops (you have ${analysis.efficiency.submitted.loops} loops).`);
                    }
                    if (analysis.efficiency.submitted.nestedDepth > analysis.efficiency.solution.nestedDepth) {
                        feedback.push(`   - Your code has deeper nesting (depth: ${analysis.efficiency.submitted.nestedDepth}). Try to flatten the structure.`);
                    }
                }
            }
        } else {
            feedback.push(`**Efficiency (${efficiencyPercent}%)**: Your code has efficiency issues.`);
            if (analysis.efficiency) {
                feedback.push(`   - Complexity: ${analysis.efficiency.submitted.complexity} (solution: ${analysis.efficiency.solution.complexity})`);
                if (analysis.efficiency.submitted.loops > 3) {
                    feedback.push(`   - Too many loops (${analysis.efficiency.submitted.loops}). Consider combining or optimizing loops.`);
                }
                if (analysis.efficiency.submitted.nestedDepth > 3) {
                    feedback.push(`   - Deep nesting (${analysis.efficiency.submitted.nestedDepth} levels). Break into smaller functions.`);
                }
            }
        }
        
        // READABILITY FEEDBACK
        // Note: criteriaScores contain raw points, not percentages
        const readabilityScore = criteriaScores.readability || 0;
        const readabilityWeight = rubrics.readability.weight;
        const readabilityPercent = readabilityWeight > 0 ? Math.round((readabilityScore / readabilityWeight) * 100) : 0;
        
        if (readabilityPercent === 100) {
            feedback.push("**Readability (100%)**: Excellent! Your code is well-documented and follows clean code practices.");
        } else if (readabilityPercent >= 70) {
            feedback.push(`**Readability (${readabilityPercent}%)**: Your code is readable but could use improvements.`);
            if (analysis.readability) {
                if (!analysis.readability.submitted.hasComments) {
                    feedback.push("   - Add comments to explain your code logic.");
                } else if (analysis.readability.submitted.commentRatio < 0.1) {
                    feedback.push(`   - Low comment ratio (${Math.round(analysis.readability.submitted.commentRatio * 100)}%). Add more meaningful comments.`);
                }
                if (analysis.readability.submitted.cleanCodeScore < 30) {
                    feedback.push("   - Improve code organization and naming conventions.");
                }
            }
        } else {
            feedback.push(`**Readability (${readabilityPercent}%)**: Your code needs significant readability improvements.`);
            if (analysis.readability) {
                if (!analysis.readability.submitted.hasComments) {
                    feedback.push("   - Missing comments: Add comments to explain what your code does.");
                }
                if (meaningfulVars.length < variableNames.length * 0.7) {
                    feedback.push(`   - Variable naming: Use more descriptive names (${meaningfulVars.length}/${variableNames.length} variables have meaningful names).`);
                }
                if (analysis.readability.submitted.cleanCodeScore < 20) {
                    feedback.push("   - Improve code formatting, indentation, and structure.");
                }
            }
        }
        
        // CODE PATTERNS FEEDBACK
        const patterns = [];
        if (hasLoops && !/\bfor\s*\([^)]*:\s*/.test(submittedCode)) {
            patterns.push("Consider using enhanced for-loops where appropriate.");
        }
        if (hasMethods && submittedCode.split(/\{/).length > 5) {
            patterns.push("Your code has many nested blocks - consider breaking into smaller methods.");
        }
        if (variableNames.length > 0 && meaningfulVars.length / variableNames.length < 0.5) {
            patterns.push("Use more descriptive variable names (e.g., 'userName' instead of 'n').");
        }
        if (!hasComments && submittedCode.length > 200) {
            patterns.push("Add comments to explain complex logic sections.");
        }
        
        if (patterns.length > 0) {
            feedback.push("\n**Suggestions**:");
            patterns.forEach(p => feedback.push(`   - ${p}`));
        }
        
        // OVERALL SUMMARY
        const totalScore = scoringResult.totalScore || 0;
        if (totalScore >= 80) {
            feedback.push("\n**Overall**: Great work! You've passed the challenge. Keep practicing to improve further!");
        } else if (totalScore >= 60) {
            feedback.push("\n**Overall**: You're on the right track! Focus on the areas mentioned above to improve your score.");
        } else {
            feedback.push("\n**Overall**: Review the solution code and requirements. Practice the concepts and try again!");
        }
        
        return feedback.join('\n');
    }

    async function getGeminiFeedback(submittedCode, solutionCode, difficulty, scoringResult) {
        // List of Gemini models to try in order (most capable first)
        const GEMINI_MODELS = [
            'gemini-2.5-flash',
            'gemini-2.5-pro',
            'gemini-2.0-flash',
            'gemini-2.0-flash-001',
            'gemini-2.0-flash-lite'
        ];

        // Check if API key is configured
        if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE" || GEMINI_API_KEY.trim() === "") {
            console.warn("Gemini API key not set. Falling back to heuristic feedback.");
            const heuristicFeedback = generateHeuristicFeedback(submittedCode, solutionCode, difficulty, scoringResult);
            return { feedback: heuristicFeedback, apiError: "Gemini API key not configured" };
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
        
        The challenge objectives/requirements are:
        ${scoringResult.analysis && scoringResult.analysis.objectives ? 
            `Objectives Compliance: ${Math.round(scoringResult.analysis.objectives.complianceScore * 100)}% (${scoringResult.analysis.objectives.metCount}/${scoringResult.analysis.objectives.totalObjectives} met)
        Met Objectives: ${scoringResult.analysis.objectives.metObjectives.map(o => o.objective).join('; ')}
        Missing Objectives: ${scoringResult.analysis.objectives.missedObjectives.map(o => o.objective).join('; ')}` 
            : 'No objectives data available'}
        
        Please provide constructive feedback to the student based on their submitted code, comparing it to the solution AND checking if it meets the objectives/requirements. Focus on explaining *why* certain aspects received the score they did and how they can improve. Pay special attention to whether the code meets the stated objectives. Provide actionable advice for improving their code in terms of accuracy (including objectives compliance), efficiency, and readability. Keep the feedback concise and encouraging, around 2-3 sentences.
        `;

        // Try each model in sequence until one succeeds
        const errors = [];
        for (let i = 0; i < GEMINI_MODELS.length; i++) {
            const model = GEMINI_MODELS[i];
            try {
                console.log(`Attempting to call Gemini API with model: ${model} (${i + 1}/${GEMINI_MODELS.length})`);
                
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
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

                console.log(`Gemini API response status for ${model}:`, response.status, response.statusText);

                if (!response.ok) {
                    const errorText = await response.text();
                    let errorData;
                    try {
                        errorData = JSON.parse(errorText);
                    } catch (e) {
                        errorData = { error: errorText };
                    }
                    
                    const errorMessage = errorData.error?.message || errorData.message || `API Error: ${response.status} ${response.statusText}`;
                    console.warn(`Model ${model} failed:`, errorMessage);
                    errors.push({ model, error: errorMessage });
                    
                    // If this is not the last model, try the next one
                    if (i < GEMINI_MODELS.length - 1) {
                        console.log(`Trying next model...`);
                        continue;
                    } else {
                        // Last model failed, fall back to heuristic
                        console.error("All Gemini models failed. Falling back to heuristic feedback.");
                        const heuristicFeedback = generateHeuristicFeedback(submittedCode, solutionCode, difficulty, scoringResult);
                        return { 
                            feedback: heuristicFeedback, 
                            apiError: `All models failed. Last error: ${errorMessage}`,
                            errors: errors
                        };
                    }
                }

                const data = await response.json();
                console.log(`Gemini API response data for ${model}:`, data);
                
                // Check for errors in the response body (even if HTTP status is 200)
                if (data.error) {
                    const errorMessage = data.error.message || data.error.code || "Error in API response";
                    console.warn(`Model ${model} returned error in response:`, errorMessage);
                    errors.push({ model, error: errorMessage });
                    
                    // If this is not the last model, try the next one
                    if (i < GEMINI_MODELS.length - 1) {
                        console.log(`Trying next model due to error in response...`);
                        continue;
                    } else {
                        // Last model returned error, fall back to heuristic
                        console.error("All Gemini models returned errors. Falling back to heuristic feedback.");
                        const heuristicFeedback = generateHeuristicFeedback(submittedCode, solutionCode, difficulty, scoringResult);
                        return { 
                            feedback: heuristicFeedback, 
                            apiError: `All models failed. Last error: ${errorMessage}`,
                            errors: errors
                        };
                    }
                }
                
                // Check for prompt feedback issues (blocked content, etc.)
                if (data.promptFeedback && data.promptFeedback.blockReason) {
                    const blockReason = data.promptFeedback.blockReason;
                    console.warn(`Model ${model} blocked the prompt. Reason:`, blockReason);
                    errors.push({ model, error: `Prompt blocked: ${blockReason}` });
                    
                    // If this is not the last model, try the next one
                    if (i < GEMINI_MODELS.length - 1) {
                        console.log(`Trying next model due to blocked prompt...`);
                        continue;
                    } else {
                        // Last model blocked prompt, fall back to heuristic
                        console.error("All Gemini models blocked the prompt. Falling back to heuristic feedback.");
                        const heuristicFeedback = generateHeuristicFeedback(submittedCode, solutionCode, difficulty, scoringResult);
                        return { 
                            feedback: heuristicFeedback, 
                            apiError: `All models blocked the prompt. Last reason: ${blockReason}`,
                            errors: errors
                        };
                    }
                }
                
                // Check if candidates array is empty or missing
                if (!data.candidates || data.candidates.length === 0) {
                    console.warn(`Model ${model} returned no candidates:`, data);
                    errors.push({ model, error: "No candidates in response" });
                    
                    // If this is not the last model, try the next one
                    if (i < GEMINI_MODELS.length - 1) {
                        console.log(`Trying next model due to no candidates...`);
                        continue;
                    } else {
                        // Last model returned no candidates, fall back to heuristic
                        console.error("All Gemini models returned no candidates. Falling back to heuristic feedback.");
                        const heuristicFeedback = generateHeuristicFeedback(submittedCode, solutionCode, difficulty, scoringResult);
                        return { 
                            feedback: heuristicFeedback, 
                            apiError: "All models returned no candidates",
                            errors: errors
                        };
                    }
                }
                
                // Check if candidate has finishReason that indicates an error
                if (data.candidates[0].finishReason && 
                    data.candidates[0].finishReason !== 'STOP' && 
                    data.candidates[0].finishReason !== 'MAX_TOKENS') {
                    const finishReason = data.candidates[0].finishReason;
                    console.warn(`Model ${model} finished with reason:`, finishReason);
                    errors.push({ model, error: `Finish reason: ${finishReason}` });
                    
                    // If this is not the last model, try the next one
                    if (i < GEMINI_MODELS.length - 1) {
                        console.log(`Trying next model due to finish reason: ${finishReason}...`);
                        continue;
                    } else {
                        // Last model had problematic finish reason, fall back to heuristic
                        console.error("All Gemini models had problematic finish reasons. Falling back to heuristic feedback.");
                        const heuristicFeedback = generateHeuristicFeedback(submittedCode, solutionCode, difficulty, scoringResult);
                        return { 
                            feedback: heuristicFeedback, 
                            apiError: `All models had finish reason: ${finishReason}`,
                            errors: errors
                        };
                    }
                }
                
                // Check if response has the expected structure with valid text content
                if (data.candidates[0].content && data.candidates[0].content.parts && 
                    data.candidates[0].content.parts.length > 0 && 
                    data.candidates[0].content.parts[0].text) {
                    const feedback = data.candidates[0].content.parts[0].text.trim();
                    
                    // Check if feedback is empty
                    if (!feedback || feedback.length === 0) {
                        console.warn(`Model ${model} returned empty feedback`);
                        errors.push({ model, error: "Empty feedback text" });
                        
                        // If this is not the last model, try the next one
                        if (i < GEMINI_MODELS.length - 1) {
                            console.log(`Trying next model due to empty feedback...`);
                            continue;
                        } else {
                            // Last model returned empty feedback, fall back to heuristic
                            console.error("All Gemini models returned empty feedback. Falling back to heuristic feedback.");
                            const heuristicFeedback = generateHeuristicFeedback(submittedCode, solutionCode, difficulty, scoringResult);
                            return { 
                                feedback: heuristicFeedback, 
                                apiError: "All models returned empty feedback",
                                errors: errors
                            };
                        }
                    }
                    
                    console.log(`Successfully received Gemini feedback from model: ${model}`);
                    return feedback;
                } else {
                    console.warn(`Unexpected Gemini API response structure for ${model}:`, data);
                    errors.push({ model, error: "Unexpected API response format" });
                    
                    // If this is not the last model, try the next one
                    if (i < GEMINI_MODELS.length - 1) {
                        console.log(`Trying next model due to unexpected response structure...`);
                        continue;
                    } else {
                        // Last model had unexpected structure, fall back to heuristic
                        console.error("All Gemini models returned unexpected structure. Falling back to heuristic feedback.");
                        const heuristicFeedback = generateHeuristicFeedback(submittedCode, solutionCode, difficulty, scoringResult);
                        return { 
                            feedback: heuristicFeedback, 
                            apiError: "All models returned unexpected response format",
                            errors: errors
                        };
                    }
                }
            } catch (error) {
                console.error(`Error calling Gemini API with model ${model}:`, error);
                console.error("Error details:", error.message, error.stack);
                errors.push({ model, error: error.message || "Network error or API unavailable" });
                
                // If this is not the last model, try the next one
                if (i < GEMINI_MODELS.length - 1) {
                    console.log(`Trying next model due to error...`);
                    continue;
                } else {
                    // Last model threw an error, fall back to heuristic
                    console.error("All Gemini models threw errors. Falling back to heuristic feedback.");
                    const heuristicFeedback = generateHeuristicFeedback(submittedCode, solutionCode, difficulty, scoringResult);
                    const errorMessage = error.message || "Network error or API unavailable";
                    return { 
                        feedback: heuristicFeedback, 
                        apiError: `All models failed. Last error: ${errorMessage}`,
                        errors: errors
                    };
                }
            }
        }

        // This should never be reached, but just in case
        console.error("Unexpected: All models exhausted without returning. Using heuristic feedback.");
        const heuristicFeedback = generateHeuristicFeedback(submittedCode, solutionCode, difficulty, scoringResult);
        return { 
            feedback: heuristicFeedback, 
            apiError: "All models failed unexpectedly",
            errors: errors
        };
    }

    window.getGeminiFeedback = getGeminiFeedback;
});