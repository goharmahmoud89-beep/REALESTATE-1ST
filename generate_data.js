const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// Update getLogoString to use Google Favicons
const googleFaviconGetLogoString = `const getLogo = (devId) => {
            if(devLogos[devId]) return 'https://www.google.com/s2/favicons?domain=' + devLogos[devId] + '&sz=256';
            return defaultLogo;
        };`;

// Replace devLogos
html = html.replace(/const devLogos = \{[\s\S]*?\};/, data.devLogosString);

// Replace getLogo
html = html.replace(/const getLogo = \([\s\S]*?\};/, googleFaviconGetLogoString);

// Fix the fallback for clearbit/google - avoiding undefined variable errors and ensuring English fallback characters
// Note: We use the devKey for the initial because ui-avatars fails with Arabic
html = html.replace(/onerror="this\.onerror=null; this\.src='https:\/\/ui-avatars\.com[^"]*'"/g, `onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent(devKey) + '&background=0A192F&color=D4AF37&size=256'"`);

// Replace destinationsData
html = html.replace(/const destinationsData = \{[\s\S]*?\n        \};\n/, data.destinationsDataString + '\n');

// Ensure modal desc property uses innerHTML
html = html.replace(
    /document\.getElementById\('modal-desc'\)\.innerText = desc;/,
    "document.getElementById('modal-desc').innerHTML = desc;"
);

fs.writeFileSync('index.html', html);
console.log('Successfully updated HTML');
