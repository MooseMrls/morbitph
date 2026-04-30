const fs = require('fs');
const path = require('path');

const imgPath = path.join(__dirname, '../src/images/projects/am1.png');

try {
    const data = fs.readFileSync(imgPath);
    console.log('Successfully read am1.png, size:', data.length);
} catch (err) {
    console.error('Error reading am1.png:', err);
}
