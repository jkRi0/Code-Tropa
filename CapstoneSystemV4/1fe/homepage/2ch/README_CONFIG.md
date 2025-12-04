# API Key Configuration Guide

## Setup Instructions

### For Local Development:
1. Copy `config.js.example` to `config.js`
2. Open `config.js` and replace `YOUR_GEMINI_API_KEY_HERE` with your actual Gemini API key
3. The `config.js` file is gitignored and will NOT be committed to GitHub

### For InfinityFree Deployment:
1. Create a `config.js` file in the `2ch` folder
2. Add your Gemini API key:
   ```javascript
   window.APP_CONFIG = window.APP_CONFIG || {
       GEMINI_API_KEY: "your-actual-api-key-here"
   };
   ```
3. Upload `config.js` to your InfinityFree hosting (it won't be in your GitHub repo)

## Security Notes:
- ✅ `config.js` is in `.gitignore` - safe for GitHub
- ✅ `config.js.example` is committed as a template
- ✅ API key is never hardcoded in source files
- ⚠️ Remember to upload `config.js` separately to InfinityFree (not via Git)

## File Structure:
```
2ch/
├── config.js          (gitignored - contains actual API key)
├── config.js.example  (committed - template file)
├── .gitignore         (excludes config.js)
└── modalManager.js    (loads from config.js)
```

## Troubleshooting:
- If API calls fail, check browser console for "Gemini API key not set"
- Make sure `config.js` is loaded before `modalManager.js` in `index.html`
- Verify the API key is correct in `config.js`

