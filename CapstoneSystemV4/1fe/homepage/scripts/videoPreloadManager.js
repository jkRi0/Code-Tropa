/**
 * Video Preloading Manager
 * Shows loading screen while videos are being cached
 */

class VideoPreloadManager {
    constructor() {
        this.isPreloading = false;
        this.preloadProgress = 0;
        this.totalVideos = 0;
        this.cachedVideos = 0;
        this.init();
    }

    init() {
        // Listen for service worker messages
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data.type === 'PRELOAD_PROGRESS') {
                    this.updateProgress(event.data);
                }
            });
        }
    }

    showPreloadScreen() {
        if (this.isPreloading) return;
        
        this.isPreloading = true;
        console.log('🎬 Starting video preloading...');
        
        // Create simple loading screen
        const loadingScreen = document.createElement('div');
        loadingScreen.id = 'videoPreloadScreen';
        loadingScreen.innerHTML = `
            <div class="preload-container">
                <div class="preload-content">
                    <div class="preload-spinner"></div>
                    <h2>🎬 Optimizing Video Experience</h2>
                    <p id="preloadStatus">Caching videos for instant loading...</p>
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div id="progressFill" class="progress-fill"></div>
                        </div>
                        <div id="progressText" class="progress-text">0%</div>
                    </div>
                    <p class="preload-tip">This will only take a moment!</p>
                </div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #videoPreloadScreen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                color: white;
                font-family: Arial, sans-serif;
            }
            
            .preload-container {
                text-align: center;
                max-width: 500px;
                padding: 30px;
            }
            
            .preload-spinner {
                width: 60px;
                height: 60px;
                border: 4px solid #333;
                border-top: 4px solid #4CAF50;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .progress-container {
                margin: 20px 0;
            }
            
            .progress-bar {
                width: 100%;
                height: 25px;
                background: #333;
                border-radius: 12px;
                overflow: hidden;
                margin-bottom: 10px;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #4CAF50, #8BC34A);
                width: 0%;
                transition: width 0.3s ease;
            }
            
            .progress-text {
                font-size: 18px;
                font-weight: bold;
                color: #4CAF50;
            }
            
            .preload-tip {
                font-size: 14px;
                color: #ccc;
                margin-top: 15px;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(loadingScreen);
        
        // Start monitoring progress
        this.monitorProgress();
    }

    updateProgress(data) {
        this.cachedVideos = data.cached || 0;
        this.totalVideos = data.total || 0;
        this.preloadProgress = Math.round((this.cachedVideos / this.totalVideos) * 100);
        
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const preloadStatus = document.getElementById('preloadStatus');
        
        if (progressFill) {
            progressFill.style.width = `${this.preloadProgress}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${this.preloadProgress}%`;
        }
        
        if (preloadStatus) {
            preloadStatus.textContent = `Cached ${this.cachedVideos}/${this.totalVideos} videos...`;
        }
        
        console.log(`📹 Video preload progress: ${this.preloadProgress}% (${this.cachedVideos}/${this.totalVideos})`);
    }

    monitorProgress() {
        // Simple progress monitoring - just wait for service worker to cache background video
        let attempts = 0;
        const maxAttempts = 20; // 10 seconds max
        
        const checkProgress = () => {
            attempts++;
            
            if ('caches' in window) {
                caches.open('code-tropa-videos-v1')
                    .then(cache => cache.keys())
                    .then(keys => {
                        const cachedCount = keys.length;
                        
                        // Show progress
                        this.updateProgress({
                            cached: cachedCount,
                            total: 3 // Expecting background video + a few others
                        });
                        
                        // Hide loading screen when we have at least 1 video cached or after max attempts
                        if (cachedCount >= 1 || attempts >= maxAttempts) {
                            setTimeout(() => {
                                this.hidePreloadScreen();
                            }, 1500);
                        } else {
                            setTimeout(checkProgress, 500);
                        }
                    })
                    .catch(() => {
                        if (attempts < maxAttempts) {
                            setTimeout(checkProgress, 500);
                        } else {
                            this.hidePreloadScreen();
                        }
                    });
            } else {
                if (attempts < maxAttempts) {
                    setTimeout(checkProgress, 500);
                } else {
                    this.hidePreloadScreen();
                }
            }
        };
        
        checkProgress();
    }

    hidePreloadScreen() {
        const loadingScreen = document.getElementById('videoPreloadScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                loadingScreen.remove();
                this.isPreloading = false;
                console.log('✅ Video preloading completed!');
            }, 500);
        }
    }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    window.videoPreloadManager = new VideoPreloadManager();
    
    // Show preload screen after a short delay
    setTimeout(() => {
        if (window.videoPreloadManager) {
            window.videoPreloadManager.showPreloadScreen();
        }
    }, 1000);
});

// Export for use
window.VideoPreloadManager = VideoPreloadManager;
