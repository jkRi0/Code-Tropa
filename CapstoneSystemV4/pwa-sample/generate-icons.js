// Simple script to generate PWA icons
// Run with: node generate-icons.js
// Requires: npm install canvas (or use the HTML generator instead)

const fs = require('fs');
const path = require('path');

// Create simple SVG icons and convert them
// Since canvas might not be available, we'll create SVG files instead
// which can be converted to PNG using online tools or ImageMagick

function createSVGIcon(size) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.1}"/>
  <text x="50%" y="50%" font-size="${size * 0.4}" text-anchor="middle" dominant-baseline="central" fill="white">🚀</text>
</svg>`;
}

// Try to use canvas if available, otherwise create SVG
try {
    const { createCanvas } = require('canvas');
    
    function generatePNGIcon(size) {
        const canvas = createCanvas(size, size);
        const ctx = canvas.getContext('2d');
        
        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        
        // Draw rocket emoji (as text)
        ctx.fillStyle = 'white';
        ctx.font = `bold ${size * 0.4}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🚀', size / 2, size / 2);
        
        return canvas.toBuffer('image/png');
    }
    
    // Generate PNG icons
    fs.writeFileSync('icon-192.png', generatePNGIcon(192));
    fs.writeFileSync('icon-512.png', generatePNGIcon(512));
    console.log('✅ Generated icon-192.png and icon-512.png');
} catch (error) {
    // Canvas not available, create SVG files instead
    console.log('Canvas not available. Creating SVG files instead.');
    console.log('You can convert these to PNG using an online tool or ImageMagick.');
    
    fs.writeFileSync('icon-192.svg', createSVGIcon(192));
    fs.writeFileSync('icon-512.svg', createSVGIcon(512));
    
    console.log('✅ Generated icon-192.svg and icon-512.svg');
    console.log('💡 To convert to PNG:');
    console.log('   - Use an online SVG to PNG converter');
    console.log('   - Or use ImageMagick: convert icon-192.svg icon-192.png');
    console.log('   - Or open generate-icons.html in your browser to generate PNG files');
}

