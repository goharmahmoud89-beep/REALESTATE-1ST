const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = {
    'new_cairo': 'real_new_cairo_1777892277907.png',
    'zayed': 'real_zayed_1777892293006.png',
    'october': 'real_october_1777892308591.png',
    'north_coast': 'real_north_coast_1777892328522.png',
    'sokhna': 'real_sokhna_1777892345081.png',
    'new_capital': 'real_new_capital_1777892357984.png'
};

const sourceDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\2f812cba-35b0-4c7f-82f5-493494cfc0c9';
const assetsDir = path.join(__dirname, 'assets');

Object.keys(images).forEach(key => {
    const srcPath = path.join(sourceDir, images[key]);
    const destPath = path.join(assetsDir, `${key}.avif`);
    
    if (fs.existsSync(srcPath)) {
        sharp(srcPath)
            .avif({ quality: 50 })
            .toFile(destPath)
            .then(() => console.log(`Converted and moved ${key}.avif`))
            .catch(err => console.error(`Failed to process ${key}:`, err));
    } else {
        console.error(`File not found: ${srcPath}`);
    }
});
