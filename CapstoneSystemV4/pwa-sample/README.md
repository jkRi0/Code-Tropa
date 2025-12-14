# PWA Sample App

A simple Progressive Web App (PWA) that can be installed on your device.

## Features

- ✅ **Installable** - Can be installed as an app on desktop and mobile devices
- ✅ **Offline Support** - Works offline using service workers
- ✅ **Responsive Design** - Looks great on all screen sizes
- ✅ **Fast & Reliable** - Cached resources for quick loading

## Getting Started

### 1. Generate Icons

First, you need to generate the app icons. You have two options:

**Option A: Using the HTML Generator (Recommended)**
1. Open `generate-icons.html` in your web browser
2. Click the buttons to generate and download `icon-192.png` and `icon-512.png`
3. Save them in the project root directory

**Option B: Using Node.js Script**
1. Install canvas: `npm install canvas`
2. Run: `node generate-icons.js`

**Option C: Manual Creation**
- Create two PNG files: `icon-192.png` (192x192) and `icon-512.png` (512x512)
- Use any image editor or online tool

### 2. Serve the App

PWAs require HTTPS (or localhost). You can use:

**Option A: VS Code Live Server (Recommended)**
- Install the "Live Server" extension in VS Code
- Right-click on `index.html` and select "Open with Live Server"
- The app will open at `http://127.0.0.1:5500/index.html` (or similar port)

**Option B: Python HTTP Server**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Option C: Node.js HTTP Server**
```bash
npx http-server -p 8000
```

### 3. Access the App

Open your browser and navigate to:
- `http://127.0.0.1:5500/index.html` (Live Server - default port)
- `http://localhost:8000` (Python/Node.js server)

### 4. Install the App

**On Desktop (Chrome/Edge):**
- Look for the install icon (➕) in the address bar
- Or click the "Install App" button on the page

**On Mobile:**
- Use the browser menu (three dots)
- Select "Add to Home Screen" or "Install App"

## File Structure

```
pwa-sample1/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── app.js              # Main JavaScript (service worker registration, install prompt)
├── service-worker.js   # Service worker for offline support
├── manifest.json       # PWA manifest file
├── icon-192.png       # App icon (192x192)
├── icon-512.png       # App icon (512x512)
├── generate-icons.html # Icon generator tool
└── README.md          # This file
```

## How It Works

1. **Service Worker**: Caches resources for offline access
2. **Web App Manifest**: Defines how the app appears when installed
3. **Install Prompt**: Detects when the app can be installed and shows a prompt

## Testing Offline Mode

1. Open the app in your browser
2. Open DevTools (F12) → Application tab → Service Workers
3. Check "Offline" checkbox
4. Refresh the page - it should still work!

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 11.3+)
- Opera: Full support

## Notes

- The app must be served over HTTPS (or localhost) for service workers to work
- Some features may vary by browser
- The install prompt appears automatically when criteria are met

## License

Free to use and modify!

