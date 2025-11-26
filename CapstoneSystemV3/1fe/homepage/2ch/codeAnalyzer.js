function compileCode(code, difficulty, language = 'java') {
    // Route to appropriate analysis based on language
    switch(language.toLowerCase()) {
        case 'c++':
        case 'cpp':
            if (typeof window.compileCppCode === 'function') {
                return window.compileCppCode(code, difficulty);
            } else {
                return {
                    success: false,
                    output: "",
                    errors: [{
                        id: 'compiler-missing',
                        severity: 'error',
                        title: 'Compiler Error',
                        desc: 'C++ compiler is not loaded. Please refresh the page.',
                        line: 1,
                        excerpt: ''
                    }]
                };
            }
        case 'c#':
        case 'csharp':
            if (typeof window.compileCsharpCode === 'function') {
                return window.compileCsharpCode(code, difficulty);
            } else {
                return {
                    success: false,
                    output: "",
                    errors: [{
                        id: 'compiler-missing',
                        severity: 'error',
                        title: 'Compiler Error',
                        desc: 'C# compiler is not loaded. Please refresh the page.',
                        line: 1,
                        excerpt: ''
                    }]
                };
            }
        case 'java':
        default:
            if (typeof window.compileJavaCode === 'function') {
                return window.compileJavaCode(code, difficulty);
            } else {
                return {
                    success: false,
                    output: "",
                    errors: [{
                        id: 'compiler-missing',
                        severity: 'error',
                        title: 'Compiler Error',
                        desc: 'Java compiler is not loaded. Please refresh the page.',
                        line: 1,
                        excerpt: ''
                    }]
                };
            }
    }
}

// Export to window (browser environment)
window.compileCode = compileCode;

// ================================
// SCORING FUNCTIONS
// ================================
function normalizeCode(code) {
    // Remove block comments
    const withoutBlockComments = code.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove line comments
    const withoutLineComments = withoutBlockComments.replace(/\/\/.*$/gm, '');
    // Collapse whitespace
    const collapsedWhitespace = withoutLineComments.replace(/\s+/g, ' ').trim();
    return collapsedWhitespace;
}

function normalizeCodeForStrictCompare(code) {
    // A stricter normalization used for equality checks: remove comments and all whitespace
    return code
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '')
        .replace(/\s+/g, '')
        .trim();
}

function compareASTs(submittedTree, solutionTree) {
    // Placeholder for actual AST comparison logic
    // This would involve traversing both trees and comparing nodes.
    // For now, a simple heuristic or a more advanced diffing algorithm can be used.
    // For a basic implementation, we can convert ASTs to a simplified string representation
    // and compare those. A proper implementation would involve a recursive comparison.
    const submittedString = submittedTree.toStringTree();
    const solutionString = solutionTree.toStringTree();
    return submittedString === solutionString;
}

function containsKeyword(code, keyword) {
    const regex = new RegExp(`\\b${keyword}\\b`);
    return regex.test(code);
}

function containsPrintStatement(code, expectedOutput) {
    // This is a very basic check. A more robust check would involve runtime simulation
    // or AST analysis of print statements.
    return code.includes(`System.out.println("${expectedOutput}")`) || code.includes(`System.out.print("${expectedOutput}")`);
}

// ================================
// N-GRAM COMPARISON FUNCTIONS
// ================================

/**
 * Generate n-grams from a string
 * @param {string} text - Input text
 * @param {number} n - Size of n-gram (default: 2 for bigrams)
 * @returns {Set} Set of n-grams
 */
function generateNGrams(text, n = 2) {
    if (!text || typeof text !== 'string') return new Set();
    const normalized = text.toLowerCase().trim();
    const ngrams = new Set();
    for (let i = 0; i <= normalized.length - n; i++) {
        ngrams.add(normalized.substring(i, i + n));
    }
    return ngrams;
}

/**
 * Calculate Jaccard similarity between two sets of n-grams
 * @param {Set} set1 - First set of n-grams
 * @param {Set} set2 - Second set of n-grams
 * @returns {number} Similarity score between 0 and 1
 */
function jaccardSimilarity(set1, set2) {
    if (set1.size === 0 && set2.size === 0) return 1;
    if (set1.size === 0 || set2.size === 0) return 0;
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
}

/**
 * Compare outputs using n-gram similarity
 * @param {string} output1 - First output
 * @param {string} output2 - Second output
 * @param {number} n - N-gram size (default: 2)
 * @returns {number} Similarity score between 0 and 1
 */
function compareOutputsWithNGrams(output1, output2, n = 2) {
    if (!output1 || !output2) return 0;
    
    const ngrams1 = generateNGrams(output1, n);
    const ngrams2 = generateNGrams(output2, n);
    
    // Try different n-gram sizes for better matching
    const similarities = [];
    for (let i = 1; i <= 3; i++) {
        const ng1 = generateNGrams(output1, i);
        const ng2 = generateNGrams(output2, i);
        similarities.push(jaccardSimilarity(ng1, ng2));
    }
    
    // Use weighted average (higher weight for larger n-grams)
    const weightedAvg = (similarities[0] * 0.2 + similarities[1] * 0.3 + similarities[2] * 0.5);
    
    // Also check exact match (after normalization)
    const exactMatch = output1.trim().toLowerCase() === output2.trim().toLowerCase();
    
    return exactMatch ? 1.0 : weightedAvg;
}

// ================================
// EFFICIENCY ANALYSIS FUNCTIONS
// ================================

/**
 * Analyze code efficiency based on complexity metrics
 * @param {string} code - Code to analyze
 * @returns {object} Efficiency metrics
 */
function analyzeEfficiency(code) {
    if (!code || typeof code !== 'string') {
        return { complexity: 0, loops: 0, nestedDepth: 0, efficiencyScore: 0 };
    }
    
    // Count loops (for, while, do-while)
    const loopPatterns = [
        /\bfor\s*\(/g,
        /\bwhile\s*\(/g,
        /\bdo\s*\{/g,
        /\bforeach\s*\(/g,
        /\bfor\s+\w+\s+in\s+/g
    ];
    let loopCount = 0;
    loopPatterns.forEach(pattern => {
        const matches = code.match(pattern);
        if (matches) loopCount += matches.length;
    });
    
    // Calculate nested depth (count braces)
    let maxDepth = 0;
    let currentDepth = 0;
    for (let char of code) {
        if (char === '{') {
            currentDepth++;
            maxDepth = Math.max(maxDepth, currentDepth);
        } else if (char === '}') {
            currentDepth--;
        }
    }
    
    // Count recursive calls (methods calling themselves)
    const methodCalls = code.match(/\b\w+\s*\(/g) || [];
    const uniqueMethods = new Set(methodCalls.map(m => m.replace(/\s*\(/, '')));
    const recursiveCalls = Array.from(uniqueMethods).filter(m => {
        const methodDef = new RegExp(`\\b${m}\\s*\\([^)]*\\)\\s*\\{`, 'g');
        const methodCall = new RegExp(`\\b${m}\\s*\\(`, 'g');
        const defMatches = code.match(methodDef) || [];
        const callMatches = code.match(methodCall) || [];
        return defMatches.length > 0 && callMatches.length > defMatches.length;
    }).length;
    
    // Calculate complexity score (lower is better)
    // Base complexity: loops + nested depth + recursive calls
    const complexity = loopCount + maxDepth + recursiveCalls;
    
    // Efficiency score: 100 - (complexity penalty)
    // Penalize excessive complexity, but allow reasonable complexity
    let efficiencyScore = 100;
    if (complexity > 10) {
        efficiencyScore = Math.max(0, 100 - (complexity - 10) * 5);
    } else if (complexity > 5) {
        efficiencyScore = 100 - (complexity - 5) * 2;
    }
    
    return {
        complexity,
        loops: loopCount,
        nestedDepth: maxDepth,
        recursiveCalls,
        efficiencyScore: Math.max(0, Math.min(100, efficiencyScore))
    };
}

// ================================
// READABILITY ANALYSIS FUNCTIONS
// ================================

/**
 * Analyze code readability based on comments and clean code practices
 * @param {string} code - Code to analyze
 * @returns {object} Readability metrics
 */
function analyzeReadability(code) {
    if (!code || typeof code !== 'string') {
        return { commentRatio: 0, hasComments: false, cleanCodeScore: 0, readabilityScore: 0 };
    }
    
    // Extract comments
    const blockComments = (code.match(/\/\*[\s\S]*?\*\//g) || []).join('');
    const lineComments = (code.match(/\/\/.*$/gm) || []).join('');
    const allComments = blockComments + lineComments;
    
    // Calculate comment ratio
    const codeLength = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').length;
    const commentLength = allComments.length;
    const commentRatio = codeLength > 0 ? commentLength / (codeLength + commentLength) : 0;
    
    // Check for meaningful comments (not just empty or very short)
    const meaningfulComments = (code.match(/\/\/\s*[A-Za-z]{5,}/g) || []).length +
                              (code.match(/\/\*[\s\S]{10,}?\*\//g) || []).length;
    const hasComments = meaningfulComments > 0;
    
    // Clean code practices
    let cleanCodeScore = 0;
    const maxCleanCodeScore = 50;
    
    // 1. Meaningful variable names (not single letters except in loops)
    const variablePattern = /\b(int|String|double|float|boolean|char)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*[=;]/g;
    const variables = [];
    let match;
    while ((match = variablePattern.exec(code)) !== null) {
        variables.push(match[2]);
    }
    const meaningfulVars = variables.filter(v => v.length >= 3 && !/^[ijklmn]$/.test(v)).length;
    const varScore = variables.length > 0 ? (meaningfulVars / variables.length) * 15 : 0;
    cleanCodeScore += varScore;
    
    // 2. Proper indentation (check for consistent spacing)
    const lines = code.split('\n');
    const indentedLines = lines.filter(line => line.trim().length > 0 && (line.startsWith('    ') || line.startsWith('\t'))).length;
    const indentationScore = lines.length > 0 ? Math.min(15, (indentedLines / lines.length) * 15) : 0;
    cleanCodeScore += indentationScore;
    
    // 3. No magic numbers (numbers should be constants or variables)
    const magicNumbers = (code.match(/\b\d{2,}\b/g) || []).length;
    const magicNumberScore = magicNumbers === 0 ? 10 : Math.max(0, 10 - magicNumbers * 2);
    cleanCodeScore += magicNumberScore;
    
    // 4. Method/function length (shorter is better)
    const methods = code.match(/\b(public|private|static)?\s*\w+\s+\w+\s*\([^)]*\)\s*\{/g) || [];
    const avgMethodLength = methods.length > 0 ? code.length / methods.length : code.length;
    const methodLengthScore = avgMethodLength < 200 ? 10 : Math.max(0, 10 - (avgMethodLength - 200) / 50);
    cleanCodeScore += methodLengthScore;
    
    // Calculate final readability score
    // Comments: 50 points (based on comment ratio and meaningful comments)
    const commentScore = hasComments ? Math.min(50, commentRatio * 100 + (meaningfulComments * 5)) : 0;
    
    // Clean code: 50 points
    const finalCleanCodeScore = Math.min(50, cleanCodeScore);
    
    const readabilityScore = commentScore + finalCleanCodeScore;
    
    return {
        commentRatio,
        hasComments,
        meaningfulComments,
        cleanCodeScore: finalCleanCodeScore,
        readabilityScore: Math.max(0, Math.min(100, readabilityScore))
    };
}

// ================================
// MAIN SCORING FUNCTION
// ================================

function calculateScore(submittedCode, solutionCode, difficulty, submittedOutput, solutionOutput) {
    const rubrics = window.rubricsCriteria[difficulty];
    let score = 0;
    let criteriaScores = {};

    // Debug logging
    console.log('=== SCORING DEBUG ===');
    console.log('Difficulty:', difficulty);
    console.log('Submitted code:', submittedCode);
    console.log('Solution code:', solutionCode);
    console.log('Submitted output:', submittedOutput);
    console.log('Solution output:', solutionOutput);
    
    // Get solution output if not provided (try to execute solution code)
    let actualSolutionOutput = solutionOutput;
    if (!actualSolutionOutput && solutionCode && typeof window.simulateCode === 'function') {
        try {
            const selectedLanguageSpan = document.getElementById('selectedLanguage');
            const language = selectedLanguageSpan ? selectedLanguageSpan.textContent.toLowerCase() : 'java';
            const solutionResult = window.simulateCode(solutionCode, language);
            if (solutionResult && typeof solutionResult === 'string') {
                actualSolutionOutput = solutionResult;
            } else if (solutionResult && solutionResult.outputs) {
                actualSolutionOutput = solutionResult.outputs.join('\n');
            }
        } catch (e) {
            console.warn('Could not execute solution code:', e);
        }
    }
    
    // Get submitted output if not provided
    let actualSubmittedOutput = submittedOutput;
    if (!actualSubmittedOutput && submittedCode && typeof window.simulateCode === 'function') {
        try {
            const selectedLanguageSpan = document.getElementById('selectedLanguage');
            const language = selectedLanguageSpan ? selectedLanguageSpan.textContent.toLowerCase() : 'java';
            const submittedResult = window.simulateCode(submittedCode, language);
            if (submittedResult && typeof submittedResult === 'string') {
                actualSubmittedOutput = submittedResult;
            } else if (submittedResult && submittedResult.outputs) {
                actualSubmittedOutput = submittedResult.outputs.join('\n');
            }
        } catch (e) {
            console.warn('Could not execute submitted code:', e);
        }
    }

    // ================================
    // ACCURACY SCORING (using n-gram comparison)
    // ================================
    let accuracyScore = 0;
    let exactCodeMatch = false;
    let outputSimilarity = null;
    let codeSimilarity = null;
    
    // First check: exact code match (normalized)
    const normalizedSubmitted = normalizeCodeForStrictCompare(submittedCode);
    const normalizedSolution = normalizeCodeForStrictCompare(solutionCode);
    exactCodeMatch = normalizedSubmitted === normalizedSolution;
    
    if (exactCodeMatch) {
        accuracyScore = rubrics.accuracy.weight;
        console.log('Accuracy: Exact code match - full points');
    } else if (actualSubmittedOutput && actualSolutionOutput) {
        // Use n-gram comparison for output matching
        outputSimilarity = compareOutputsWithNGrams(actualSubmittedOutput, actualSolutionOutput);
        accuracyScore = Math.round(rubrics.accuracy.weight * outputSimilarity);
        console.log('Accuracy: Output similarity:', outputSimilarity, '- Score:', accuracyScore);
        
        // Also check for partial code match
        if (outputSimilarity < 1.0) {
            // Check if code structure is similar (using normalized comparison with some tolerance)
            codeSimilarity = jaccardSimilarity(
                generateNGrams(normalizedSubmitted, 3),
                generateNGrams(normalizedSolution, 3)
            );
            // If code is very similar, boost accuracy slightly
            if (codeSimilarity > 0.7) {
                accuracyScore = Math.min(rubrics.accuracy.weight, Math.round(accuracyScore * 1.1));
                console.log('Accuracy: Code structure similar, boosted score');
            }
        }
    } else {
        // Fallback: compare code structure if outputs not available
        codeSimilarity = jaccardSimilarity(
            generateNGrams(normalizedSubmitted, 3),
            generateNGrams(normalizedSolution, 3)
        );
        accuracyScore = Math.round(rubrics.accuracy.weight * codeSimilarity);
        console.log('Accuracy: Code structure similarity:', codeSimilarity, '- Score:', accuracyScore);
    }
    
    criteriaScores.accuracy = accuracyScore;
    score += accuracyScore;

    // ================================
    // EFFICIENCY SCORING
    // ================================
    const submittedEfficiency = analyzeEfficiency(submittedCode);
    const solutionEfficiency = analyzeEfficiency(solutionCode);
    
    // Compare efficiency: if submitted code is more efficient (lower complexity) or similar, give full points
    // If submitted code is less efficient, penalize based on the difference
    let efficiencyScore = 0;
    if (accuracyScore > 0) {
        const complexityDiff = submittedEfficiency.complexity - solutionEfficiency.complexity;
        if (complexityDiff <= 0) {
            // Submitted code is as efficient or more efficient
            efficiencyScore = rubrics.efficiency.weight;
        } else if (complexityDiff <= 3) {
            // Slightly less efficient
            efficiencyScore = Math.round(rubrics.efficiency.weight * 0.8);
        } else if (complexityDiff <= 5) {
            // Moderately less efficient
            efficiencyScore = Math.round(rubrics.efficiency.weight * 0.6);
        } else {
            // Significantly less efficient
            efficiencyScore = Math.round(rubrics.efficiency.weight * 0.4);
        }
        
        // Also factor in the absolute efficiency score
        const efficiencyRatio = submittedEfficiency.efficiencyScore / 100;
        efficiencyScore = Math.round(efficiencyScore * (0.5 + efficiencyRatio * 0.5));
        
        console.log('Efficiency: Complexity diff:', complexityDiff, '- Score:', efficiencyScore);
    }
    
    criteriaScores.efficiency = efficiencyScore;
    score += efficiencyScore;

    // ================================
    // READABILITY SCORING
    // ================================
    const submittedReadability = analyzeReadability(submittedCode);
    const solutionReadability = analyzeReadability(solutionCode);
    
    // Calculate readability score based on submitted code's readability metrics
    let readabilityScore = 0;
    if (accuracyScore > 0) {
        // Base score on submitted code's readability
        const readabilityRatio = submittedReadability.readabilityScore / 100;
        readabilityScore = Math.round(rubrics.readability.weight * readabilityRatio);
        
        // Bonus if readability is better than solution
        if (submittedReadability.readabilityScore > solutionReadability.readabilityScore) {
            readabilityScore = Math.min(rubrics.readability.weight, Math.round(readabilityScore * 1.1));
        }
        
        console.log('Readability: Score:', submittedReadability.readabilityScore, '- Final:', readabilityScore);
    }
    
    criteriaScores.readability = readabilityScore;
    score += readabilityScore;

    // ================================
    // TIME SCORING (handled by UI, default full points)
    // ================================
    let timeScore = rubrics.time.weight;
    criteriaScores.time = timeScore;
    score += timeScore;

    console.log('Final score:', score);
    console.log('Criteria scores:', criteriaScores);
    console.log('=== END SCORING DEBUG ===');
    
    // Return detailed analysis data for feedback generation
    return { 
        totalScore: score, 
        criteriaScores: criteriaScores,
        analysis: {
            accuracy: {
                exactCodeMatch,
                outputSimilarity: actualSubmittedOutput && actualSolutionOutput ? compareOutputsWithNGrams(actualSubmittedOutput, actualSolutionOutput) : null,
                codeSimilarity: jaccardSimilarity(
                    generateNGrams(normalizedSubmitted, 3),
                    generateNGrams(normalizedSolution, 3)
                )
            },
            efficiency: {
                submitted: submittedEfficiency,
                solution: solutionEfficiency,
                complexityDiff: submittedEfficiency.complexity - solutionEfficiency.complexity
            },
            readability: {
                submitted: submittedReadability,
                solution: solutionReadability
            }
        }
    };
}

window.calculateScore = calculateScore;
