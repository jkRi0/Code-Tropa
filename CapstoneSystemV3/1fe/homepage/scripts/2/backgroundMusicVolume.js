document.addEventListener('DOMContentLoaded', () => {
    const homepageBackgroundMusic = document.getElementById('homepageBackgroundMusic');
    const bgMusicVolumeSlider = document.getElementById('bgMusicVolume');
    const bgMusicValueSpan = document.getElementById('bgMusicValue');

    // Attempt to play background music on load
    if (homepageBackgroundMusic) {
        // Load volume from localStorage if available, otherwise set default
        const savedVolume = localStorage.getItem('backgroundMusicVolume');
        if (savedVolume !== null) {
            const volume = parseFloat(savedVolume);
            homepageBackgroundMusic.volume = volume;
            if (bgMusicVolumeSlider) bgMusicVolumeSlider.value = volume * 100;
            if (bgMusicValueSpan) bgMusicValueSpan.textContent = `${Math.round(volume * 100)}%`;
        } else {
            homepageBackgroundMusic.volume = 0.5; // Default volume
            if (bgMusicVolumeSlider) bgMusicVolumeSlider.value = 50;
            if (bgMusicValueSpan) bgMusicValueSpan.textContent = `50%`;
        }
        
        homepageBackgroundMusic.play().catch(error => {
            console.log("Autoplay prevented for background music: ", error);
            // If autoplay fails, try to play on first user interaction
            document.addEventListener('click', () => {
                if (homepageBackgroundMusic.paused) {
                    homepageBackgroundMusic.play().catch(err => console.log("Play on click failed: ", err));
                }
            }, { once: true });
        });

        // Add event listener for volume slider
        if (bgMusicVolumeSlider) {
            bgMusicVolumeSlider.addEventListener('input', () => {
                const newVolume = bgMusicVolumeSlider.value / 100;
                homepageBackgroundMusic.volume = newVolume;
                localStorage.setItem('backgroundMusicVolume', newVolume.toString());
                if (bgMusicValueSpan) bgMusicValueSpan.textContent = `${bgMusicVolumeSlider.value}%`;
            });
        }
    }
    
    // Note: SFX volume control (sfxVolume, sfxValue) is not handled here 
    // as there's no corresponding sfx audio element defined in index.html
    // If you add an sfx audio element, similar logic would be applied.
});
