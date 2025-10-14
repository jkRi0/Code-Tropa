export function process3(clickedDiv, level) {
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

    //FOR SHOWING EPISODES
    for(let i=1; i<=20; i++){
        if(level=="lev"+i){
            document.querySelectorAll('.lev'+i).forEach(div => {
                div.style.display = "block";
            });
            continue;
        }
        document.querySelectorAll('.lev'+i).forEach(div => {
            div.style.display = "none";
        });
    }
}
