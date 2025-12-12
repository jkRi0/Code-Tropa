export function process2(clickedDiv, chapter) {
    document.querySelectorAll('.outer2-3').forEach(div => {
        // Reset their inner1 styles too (optional)
        const inner = div.querySelector('.inner1-3');
        if (inner) {
            inner.style.backgroundColor = ""; // reset style
        }
    });
    // Change style of clicked div's inner1
    const targetInner1 = clickedDiv.querySelector('.inner1-3');
    if (targetInner1) {
        targetInner1.style.backgroundColor = "#49af5f"; // or any other style
    }

    //FOR SHOWING EPISODES AND SETTINGS SECTIONS
    for(let i=1; i<=3; i++){
        if(chapter=="chap"+i){
            document.querySelectorAll('.chap'+i).forEach(div => {
                div.style.display = "block";
            });
        } else {
            document.querySelectorAll('.chap'+i).forEach(div => {
                div.style.display = "none";
            });
        }
    }

    const profileSection = document.querySelector('.epi-selection.profile');
    const controlsSection = document.querySelector('.epi-selection.controls');
    const volumeSection = document.querySelector('.epi-selection.volume');

    if (profileSection) profileSection.style.display = 'none';
    if (controlsSection) controlsSection.style.display = 'none';
    if (volumeSection) volumeSection.style.display = 'none';

    if (chapter === 'profile') {
        if (profileSection) profileSection.style.display = 'flex';
    } else if (chapter === 'controls') {
        if (controlsSection) controlsSection.style.display = 'flex';
    } else if (chapter === 'volume') {
        if (volumeSection) volumeSection.style.display = 'flex';
    }
}

// Function to get the correct path based on selected programming language
export function getLanguageBasedPath(episode) {
    // Get the current selected language from multiple sources (priority order)
    let currentLanguage = window.currentSelectedLanguage || '';
    
    // If not in window, check localStorage
    if (!currentLanguage) {
        currentLanguage = localStorage.getItem('selectedLanguage') || '';
    }
    
    // Normalize the language value (handle variations)
    currentLanguage = currentLanguage.toLowerCase().trim();
    
    // Handle common variations
    if (currentLanguage === 'cpp' || currentLanguage === 'c++') {
        currentLanguage = 'c++';
    } else if (currentLanguage === 'csharp' || currentLanguage === 'c#' || currentLanguage === 'c #') {
        currentLanguage = 'c#';
    } else if (currentLanguage === 'java') {
        currentLanguage = 'java';
    }
    
    // Map languages to their folder names
    const languageMap = {
        'java': '1j',
        'c++': '2cP', 
        'c#': '3cS'
    };
    
    const languageFolder = languageMap[currentLanguage];
    
    if (languageFolder) {
        return `1sm/${languageFolder}/${episode}`;
    } else {
        // Default fallback to Java if no language is selected or invalid
        console.warn('No programming language selected or invalid language, defaulting to Java. Current language:', currentLanguage);
        return `1sm/1j/${episode}`;
    }
}

// Function to redirect to episode based on selected language
export function redirectToEpisode(episode) {
    const path = getLanguageBasedPath(episode);
    window.location.href = path;
}