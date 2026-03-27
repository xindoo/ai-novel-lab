import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHAPTER_DIR = path.join(__dirname, '..', '..', 'chapters');
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function parseChapterFilename(filename) {
  const match = filename.match(/^(\d+(\.\d+)?)[_](.+)\.md$/);
  if (!match) return null;
  return {
    number: match[1],
    numValue: parseFloat(match[1]),
    title: match[3],
    filename,
  };
}

function sortChapters(chapters) {
  return chapters.sort((a, b) => a.numValue - b.numValue);
}

function loadChapters() {
  const files = fs.readdirSync(CHAPTER_DIR);
  const chapters = [];
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const chapterInfo = parseChapterFilename(file);
    if (!chapterInfo) continue;
    
    const filePath = path.join(CHAPTER_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const titleMatch = content.match(/^##\s+第\s*\d+(\.\d+)?\s+章\s+(.+)$/m);
    const chapterTitle = titleMatch ? titleMatch[2].trim() : chapterInfo.title;
    const wordCount = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
    
    chapters.push({
      id: chapterInfo.number,
      number: chapterInfo.number,
      numValue: chapterInfo.numValue,
      title: chapterTitle,
      filename: chapterInfo.filename,
      wordCount,
    });
  }
  
  return sortChapters(chapters);
}

function generateChapterData() {
  const chapters = loadChapters();
  
   const chapterData = {
     novel: {
       title: '大厂重生：我用代码征服世界',
       author: 'xindoo with AI',
       description: '程序员林峰重生回到 10 年前，获得超脑系统，从云腾集团开始，用代码征服世界。',
       totalChapters: chapters.length,
     },
    chapters: chapters.map((chapter, index) => ({
      ...chapter,
      prevChapter: index > 0 ? chapters[index - 1].id : null,
      nextChapter: index < chapters.length - 1 ? chapters[index + 1].id : null,
    })),
  };
  
  const chaptersPath = path.join(DATA_DIR, 'chapters.json');
  fs.writeFileSync(chaptersPath, JSON.stringify(chapterData, null, 2), 'utf-8');
  console.log(`Generated ${chaptersPath} with ${chapters.length} chapters`);
  
  const novelInfoPath = path.join(DATA_DIR, 'novel-info.json');
  fs.writeFileSync(novelInfoPath, JSON.stringify(chapterData.novel, null, 2), 'utf-8');
  console.log(`Generated ${novelInfoPath}`);
  
  return chapterData;
}

try {
  const data = generateChapterData();
  console.log(`\n✓ Successfully generated chapter data`);
  console.log(`  Total chapters: ${data.chapters.length}`);
  console.log(`  First chapter: ${data.chapters[0].number} - ${data.chapters[0].title}`);
  console.log(`  Last chapter: ${data.chapters[data.chapters.length - 1].number} - ${data.chapters[data.chapters.length - 1].title}`);
} catch (error) {
  console.error('Error generating chapter data:', error);
  process.exit(1);
}
