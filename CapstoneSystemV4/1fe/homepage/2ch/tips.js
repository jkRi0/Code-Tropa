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

    let tipsData = window.tipsData || {};

    // Update when language-specific tips data loads
    window.addEventListener('tipsDataLoaded', function() {
        tipsData = window.tipsData || {};
    });

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
            // Primary fallback: derive tips from current level's objectives.js
            const objectiveTips = generateTipsFromObjectives(selectedDifficulty);
            let tipsToUse = objectiveTips;
            // Secondary fallback: derive from solutions if objectives unavailable
            if (tipsToUse.length === 0) tipsToUse = generateAutoTipsFromSolution(selectedDifficulty);
            if (tipsToUse.length === 0) {
                tipQuestionDiv.innerHTML = '<p>No tips available for this level/difficulty.</p>';
                submitAnswerBtn.style.display = 'none';
                return;
            }
            tipQuestionDiv.innerHTML = '<p>Here are some tips for this challenge:</p>';
            const tipsListHtml = `<ul>${tipsToUse.map(t => `<li>${t}</li>`).join('')}</ul>`;
            tipContentDiv.innerHTML = `<div class="tip-content"><h4>💡 Tips:</h4>${tipsListHtml}</div>`;
            submitAnswerBtn.style.display = 'none';
            return;
        }

        currentQuestion = levelTips[selectedDifficulty];

        const answeredKey = `tipAnswered_${selectedLevel}_${selectedDifficulty}`;
        const hasBeenAnswered = localStorage.getItem(answeredKey);

        if (hasBeenAnswered) {
            // If already answered, show the tip(s) directly
            tipQuestionDiv.innerHTML = '<p>You have already answered the question for this tip.</p>';
            const tipsArray = Array.isArray(currentQuestion.tips) ? currentQuestion.tips : (currentQuestion.tip ? [currentQuestion.tip] : []);
            const tipsListHtml = tipsArray.length > 0
                ? `<ul>${tipsArray.map(t => `<li>${t}</li>`).join('')}</ul>`
                : '<p>No tips found.</p>';
            tipContentDiv.innerHTML = `<div class="tip-content"><h4>💡 Tips:</h4>${tipsListHtml}</div>`;
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
            tipFeedbackDiv.innerHTML = '<p style="color: green;">Correct! Here are your tip(s):</p>';
            let tipsArray = Array.isArray(currentQuestion.tips) ? currentQuestion.tips : (currentQuestion.tip ? [currentQuestion.tip] : []);
            if (tipsArray.length === 0) tipsArray = generateTipsFromObjectives(selectedDifficulty);
            if (tipsArray.length === 0) tipsArray = generateAutoTipsFromSolution(selectedDifficulty);
            const tipsListHtml = tipsArray.length > 0
                ? `<ul>${tipsArray.map(t => `<li>${t}</li>`).join('')}</ul>`
                : '<p>No tips found.</p>';
            tipContentDiv.innerHTML = `<div class="tip-content"><h4>💡 Tips:</h4>${tipsListHtml}</div>`;
            localStorage.setItem(answeredKey, 'true'); // Mark as answered
            submitAnswerBtn.style.display = 'none';
        } else {
            tipFeedbackDiv.innerHTML = '<p style="color: red;">Incorrect. Please try again!</p>';
            // Optionally, you might want to prevent re-submitting for incorrect answers if the user can only answer once
            // For now, I'll allow retries until correct or until they close the modal.
        }
    };

    // Derive tips from the level's objectives.js data, if loaded
    function generateTipsFromObjectives(difficulty) {
        try {
            const obj = (window.objectivesData && window.objectivesData[difficulty]) ? window.objectivesData[difficulty] : null;
            if (!obj || !Array.isArray(obj.objectives)) return [];
            // Use objectives directly as actionable tips
            return obj.objectives.slice(0, 8);
        } catch (e) {
            return [];
        }
    }

    // Heuristic tip generator from the loaded solution text
    // function generateAutoTipsFromSolution(difficulty) {
    //     try {
    //         const solution = (window.tahoSolutions && window.tahoSolutions[difficulty]) ? String(window.tahoSolutions[difficulty]) : '';
    //         if (!solution || solution.trim().length === 0) return [];

    //         const langEl = document.getElementById('selectedLanguage');
    //         const lang = langEl ? langEl.textContent.toLowerCase() : '';

    //         const tips = [];

    //         // Common patterns
    //         // if (/class\s+\w+/.test(solution)) tips.push('Structure your program into classes with clear responsibilities.');
    //         // if (/main\s*\(/i.test(solution)) tips.push('Use the entry point method to orchestrate input, processing, and output.');
    //         // if (/System\.out\.(print|println|printf|format)/.test(solution)) tips.push('Use appropriate printing methods; prefer formatted output for aligned and precise values.');
    //         // if (/printf|format\(/.test(solution)) tips.push('Use format specifiers (e.g., %.2f, %d, %s) for clean output.');
    //         // if (/Scanner\b/.test(solution)) tips.push('Use a Scanner to read user input and validate it before use.');
    //         // if (/std::cout|std::cin|iostream/.test(solution)) tips.push('Use std::cout/std::cin for I/O; add <iomanip> for alignment and precision.');
    //         // if (/Console\.Write(Line)?\(/.test(solution)) tips.push('Use Console.WriteLine with string interpolation for readable output.');
    //         // if (/for\s*\(|while\s*\(/.test(solution)) tips.push('Use loops to avoid repetition; keep loop bodies focused and clear.');
    //         // if (/(int|double|float|String|char|bool|boolean)\b/.test(solution)) tips.push('Choose correct data types; use integers for counts and doubles for decimals.');
    //         // if (/(ArrayList|List<|\[\]|new\s+\w+\[)/.test(solution)) tips.push('Store collections in arrays/lists; iterate carefully and check bounds.');
    //         // if (/if\s*\(/.test(solution)) tips.push('Use clear conditions; extract complex checks into named variables or methods.');
    //         // if (/printf\(|setprecision|setw/.test(solution)) tips.push('Format numbers and columns for user-friendly output.');
    //         // if (/Map<|HashMap|Dictionary|std::map/.test(solution)) tips.push('Use maps/dictionaries for key–value lookups; verify key presence before access.');
    //         // if (/StringBuilder|std::ostringstream/.test(solution)) tips.push('Build strings efficiently before printing to reduce I/O calls.');
    //         // if (/try\s*\{/.test(solution)) tips.push('Handle potential errors with try/catch and provide helpful messages.');

    //         // De-duplicate and limit
    //         const uniq = Array.from(new Set(tips));
    //         return uniq.slice(0, 8);
    //     } catch (e) {
    //         return [];
    //     }
    // }
});
