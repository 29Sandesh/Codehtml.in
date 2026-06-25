import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CITY_PAGES } from '../data/cityPages.js';
import { blogPosts } from '../data/blogPosts.js';
import { GROWTH_GUIDES } from '../data/growthGuides.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, '..', 'public', 'data');
const citiesDir = path.join(dataDir, 'cities');
const blogsDir = path.join(dataDir, 'blogs');
const growthDir = path.join(dataDir, 'growth');

// 1. Recreate Directories
const cleanDir = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
  fs.mkdirSync(dirPath, { recursive: true });
};

cleanDir(citiesDir);
cleanDir(blogsDir);
cleanDir(growthDir);

console.log('📦 Starting unified data splitting pipeline...');

// 2. Split City Pages
console.log(`Found ${CITY_PAGES.length} city pages. Splitting data...`);
const cityList = CITY_PAGES.map(city => ({
  name: city.name,
  slug: city.slug,
  category: city.category,
  sector: city.sector,
  region: city.region,
  state: city.state || '',
  h1: city.h1,
  serviceType: city.serviceType
}));
fs.writeFileSync(path.join(dataDir, 'cityList.json'), JSON.stringify(cityList));
CITY_PAGES.forEach(city => {
  fs.writeFileSync(path.join(citiesDir, `${city.slug}.json`), JSON.stringify(city));
});
console.log(`✅ Splitted city pages into cityList.json and ${CITY_PAGES.length} granular JSON files.`);

// 3. Split Blog Posts
console.log(`Found ${blogPosts.length} blog posts. Splitting data...`);
const blogList = blogPosts.map(post => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  category: post.category,
  date: post.date,
  excerpt: post.excerpt,
  readTime: post.readTime,
  author: post.author,
  tags: post.tags
}));
fs.writeFileSync(path.join(dataDir, 'blogList.json'), JSON.stringify(blogList));
blogPosts.forEach(post => {
  fs.writeFileSync(path.join(blogsDir, `${post.slug}.json`), JSON.stringify(post));
});
console.log(`✅ Splitted blog posts into blogList.json and ${blogPosts.length} granular JSON files.`);

// 4. Split Growth Guides
console.log(`Found ${GROWTH_GUIDES.length} growth guides. Splitting data...`);
const growthList = GROWTH_GUIDES.map(guide => ({
  slug: guide.slug,
  title: guide.title,
  metaTitle: guide.metaTitle,
  metaDesc: guide.metaDesc,
  region: guide.region,
  category: guide.category,
  basePrice: guide.basePrice
}));
fs.writeFileSync(path.join(dataDir, 'growthList.json'), JSON.stringify(growthList));
GROWTH_GUIDES.forEach(guide => {
  fs.writeFileSync(path.join(growthDir, `${guide.slug}.json`), JSON.stringify(guide));
});
console.log(`✅ Splitted growth guides into growthList.json and ${GROWTH_GUIDES.length} granular JSON files.`);
console.log('🚀 Unified data splitting completed successfully!');
