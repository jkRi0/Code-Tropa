// import { currentSelectedDifficulty } from "../routeModules.js";

export function difActions(action){
    if(action=="play"){
        // Find the currently visible episode level
        let currentLevel = 'lev1'; // default
        for(let i=1; i<=20; i++){
            const levelDiv = document.querySelector('.lev'+i);
            if(levelDiv && levelDiv.style.display !== 'none' && levelDiv.style.display !== ''){
                currentLevel = 'lev'+i;
                break;
            }
        }
        
        // Store the current level globally
        window.currentSelectedLevel = currentLevel;
        console.log("Selected Level: ", currentLevel);
        
        const plSelection = document.querySelector('.dif-selection-back1');
        if (plSelection) {
            plSelection.style.visibility = 'visible';
            plSelection.style.opacity = '1';
        }
    }else if(action=="ok"){
        console.log("Checking difficulty. Current selected: ", window.currentSelectedDifficulty);
        if (window.currentSelectedDifficulty) {
            // Map frontend difficulty values to backend expected values
            const difficultyMapping = {
                'EASY': 'easy',
                'AVERAGE': 'average', 
                'DIFFICULT': 'difficult'
            };
            
            const mappedDifficulty = difficultyMapping[window.currentSelectedDifficulty] || 'easy';
            
            // Save to localStorage
            const selectedData = {
                level: window.currentSelectedLevel,
                difficulty: mappedDifficulty,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('selectedChallenge', JSON.stringify(selectedData));
            console.log("Saved to localStorage:", selectedData);
            
            // Redirect to the challenge page
            window.location.href = '2ch/index.html';
        } else {
            alert("Please select a difficulty before proceeding!");
        }
    }else if(action=="back"){
        const difSelection = document.querySelector('.dif-selection-back1');
        if (difSelection) {
            difSelection.style.visibility = 'hidden';
            difSelection.style.opacity = '0';
        }
    }
}
