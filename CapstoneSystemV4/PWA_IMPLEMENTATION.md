# PWA Implementation for Code-Tropa

Code-Tropa has been configured as a Progressive Web App (PWA) and can now be installed on devices.

## What Was Implemented

### 1. **Web App Manifest** (`manifest.json`)
- Located at: `CapstoneSystemV4/manifest.json`
- Defines app metadata, theme colors, icons, and display mode
- Theme color: `#8B5A2B` (brown, matching app design)
- Background color: `#CBA35C` (light brown)

### 2. **PWA Install Handler** (`pwa-install.js`)
- Located at: `CapstoneSystemV4/1fe/homepage/scripts/pwa-install.js`
- Handles install prompt events
- Detects if app is already installed
- Provides install button functionality

### 3. **HTML Integration**
- **entry.html**: Added manifest link, theme-color meta tag, install button, and PWA script
- **index.html**: Added manifest link, theme-color meta tag, and PWA script

### 4. **Install Button**
- Appears in the top-right corner of `entry.html` when installation is available
- Automatically hides when app is already installed
- Styled to match Code-Tropa's brown theme

## How to Install

### Desktop (Chrome/Edge):
1. Visit the app in your browser
2. Look for the install icon (➕) in the address bar
3. Or click the "📱 Install App" button (if visible)
4. Click "Install" in the prompt

### Mobile:
1. Visit the app in your mobile browser
2. Use the browser menu (three dots)
3. Select "Add to Home Screen" or "Install App"

## Requirements

- **HTTPS or localhost**: PWAs require a secure context
- **Service Worker**: Already implemented in Code-Tropa
- **Manifest**: ✅ Implemented
- **Icons**: Currently using `favicon.png` (works, but optimal sizes recommended)

## Icon Optimization (Optional)

For best results, create dedicated icon files:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

You can:
1. Use the icon generator in `pwa-sample/generate-icons.html` (modify for Code-Tropa branding)
2. Create icons manually using any image editor
3. Use online PWA icon generators

Update `manifest.json` icon paths once new icons are created.

## Testing

1. **Local Testing**: Serve via localhost (XAMPP works)
2. **Check Installation**: 
   - Open DevTools → Application tab → Manifest
   - Verify manifest loads correctly
3. **Test Install Prompt**:
   - Clear site data
   - Visit the app
   - Install prompt should appear after meeting criteria
4. **Offline Testing**:
   - Install the app
   - Go offline
   - App should still work (thanks to service workers)

## Browser Support

- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support (iOS 11.3+)
- ✅ Opera: Full support

## Notes

- The app uses existing service workers for offline functionality
- Install prompt appears automatically when PWA criteria are met
- App runs in standalone mode when installed (no browser UI)
- Theme colors match Code-Tropa's brown/gold aesthetic

