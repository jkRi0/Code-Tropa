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
