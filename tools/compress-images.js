import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

async function compress() {
  const imagesToCompress = [
    {
      input: 'hero-img.webp',
      output: 'hero-img.webp',
      options: { quality: 80 }
    },
    {
      input: 'about-section-img.webp',
      output: 'about-section-img.webp',
      options: { quality: 80 }
    }
  ];

  console.log('🖼️ Running image compression pipeline...');

  for (const img of imagesToCompress) {
    const inputPath = path.join(publicDir, img.input);
    const outputPath = path.join(publicDir, img.output);

    if (fs.existsSync(inputPath)) {
      console.log(`Compressing ${img.input} to ${img.output}...`);
      await sharp(inputPath)
        .webp(img.options)
        .toFile(outputPath);
      const originalSize = fs.statSync(inputPath).size;
      const compressedSize = fs.statSync(outputPath).size;
      console.log(`✓ Saved ${img.output}: ${(originalSize / 1024 / 1024).toFixed(2)} MB -> ${(compressedSize / 1024).toFixed(1)} KB`);
    } else {
      console.log(`⚠️ Input file not found: ${inputPath}`);
    }
  }
  console.log('✅ Image compression complete.');
}

compress().catch(console.error);
