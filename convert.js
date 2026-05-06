const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');

fs.readdirSync(assetsDir).forEach(file => {
    if (file.endsWith('.png')) {
        const inputPath = path.join(assetsDir, file);
        const outputPath = path.join(assetsDir, file.replace('.png', '.avif'));
        
        sharp(inputPath)
            .avif({ quality: 50 })
            .toFile(outputPath)
            .then(info => {
                console.log(`Converted ${file} to AVIF`);
            })
            .catch(err => {
                console.error(`Error converting ${file}:`, err);
            });
    }
});
