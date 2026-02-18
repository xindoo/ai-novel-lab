import chaptersData from '../data/chapters.json';

export function getChapterByNumber(number) {
  return chaptersData.chapters.find(ch => ch.number === number);
}

export function getAllChapters() {
  return chaptersData.chapters;
}

export function getNovelInfo() {
  return chaptersData.novel;
}

export function getPrevChapter(currentNumber) {
  const currentIndex = chaptersData.chapters.findIndex(ch => ch.number === currentNumber);
  if (currentIndex <= 0) return null;
  return chaptersData.chapters[currentIndex - 1];
}

export function getNextChapter(currentNumber) {
  const currentIndex = chaptersData.chapters.findIndex(ch => ch.number === currentNumber);
  if (currentIndex === -1 || currentIndex >= chaptersData.chapters.length - 1) return null;
  return chaptersData.chapters[currentIndex + 1];
}
