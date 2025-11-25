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
    
    const normalizedSubmitted = normalizeCodeForStrictCompare(submittedCode);
    const normalizedSolution = normalizeCodeForStrictCompare(solutionCode);
    console.log('Normalized submitted:', normalizedSubmitted);
    console.log('Normalized solution:', normalizedSolution);
    console.log('Code match:', normalizedSubmitted === normalizedSolution);
    console.log('Output match:', submittedOutput?.trim() === solutionOutput?.trim());

    // Accuracy
    let accuracyScore = 0;
    // First try: exact match of strictly normalized code (ignore whitespace/comments)
    if (normalizeCodeForStrictCompare(submittedCode) === normalizeCodeForStrictCompare(solutionCode)) {
        accuracyScore = rubrics.accuracy.weight;
        console.log('Accuracy: Code match - full points');
    } else if (typeof submittedOutput === 'string' && typeof solutionOutput === 'string') {
        // Fallback: runtime output equivalence after trimming
        if (submittedOutput.trim() === solutionOutput.trim()) {
            accuracyScore = rubrics.accuracy.weight;
            console.log('Accuracy: Output match - full points');
        } else {
            console.log('Accuracy: No match - 0 points');
        }
    } else {
        console.log('Accuracy: No valid comparison - 0 points');
    }
    // More sophisticated accuracy checks would involve AST comparison, output comparison, etc.
    criteriaScores.accuracy = accuracyScore;
    score += accuracyScore;

    // Efficiency (placeholder - needs AST analysis or performance metrics)
    // For now, let's assume maximum efficiency if accuracy is 100% for simplicity.
    let efficiencyScore = 0;
    if (accuracyScore === rubrics.accuracy.weight) {
        efficiencyScore = rubrics.efficiency.weight;
    }
    criteriaScores.efficiency = efficiencyScore;
    score += efficiencyScore;

    // Readability (placeholder - needs static analysis or linting-like checks)
    // For now, let's assume maximum readability if accuracy is 100% for simplicity.
    let readabilityScore = 0;
    if (accuracyScore === rubrics.accuracy.weight) {
        readabilityScore = rubrics.readability.weight;
    }
    criteriaScores.readability = readabilityScore;
    score += readabilityScore;

    // Time (placeholder - for now, assuming 100% if submitted, this will be handled by UI later)
    let timeScore = rubrics.time.weight;
    criteriaScores.time = timeScore;
    score += timeScore;

    console.log('Final score:', score);
    console.log('Criteria scores:', criteriaScores);
    console.log('=== END SCORING DEBUG ===');
    
    return { totalScore: score, criteriaScores: criteriaScores };
}

window.calculateScore = calculateScore;
