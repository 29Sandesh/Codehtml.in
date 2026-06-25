const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.resolve(__dirname, '../Hero Section img.png');
const outputPath = path.resolve(__dirname, '../public/hero-section-img.png');

// Crop parameters
// Original dimensions: 1572 x 1001
const cropParams = {
  left: 80,
  top: 60,
  width: 1572 - 160,  // 1412
  height: 1001 - 120  // 881
};

console.log('Cropping image with params:', cropParams);

sharp(inputPath)
  .extract(cropParams)
  .toFile(outputPath)
  .then(() => {
    console.log('Success: Cropped image written to', outputPath);
    
    // Also copy to dist/ if it exists
    const distPath = path.resolve(__dirname, '../dist/hero-section-img.png');
    if (fs.existsSync(path.dirname(distPath))) {
      fs.copyFileSync(outputPath, distPath);
      console.log('Success: Copied cropped image to dist/', distPath);
    }
  })
  .catch(err => {
    console.error('Error cropping image:', err);
  });
