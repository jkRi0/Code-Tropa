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
        targetInner1.style.backgroundColor = "rgb(65, 62, 62)"; // or any other style
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
