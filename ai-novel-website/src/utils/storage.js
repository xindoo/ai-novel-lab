const STORAGE_KEYS = {
  THEME: 'novel_theme',
  FONT_SIZE: 'novel_font_size',
  READING_PROGRESS: 'novel_reading_progress',
};

export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },
  getTheme() { return this.get(STORAGE_KEYS.THEME, 'light'); },
  setTheme(theme) { return this.set(STORAGE_KEYS.THEME, theme); },
  getFontSize() { return this.get(STORAGE_KEYS.FONT_SIZE, 'md'); },
  setFontSize(size) { return this.set(STORAGE_KEYS.FONT_SIZE, size); },
  getReadingProgress(chapterId) {
    const progress = this.get(STORAGE_KEYS.READING_PROGRESS, {});
    return progress[chapterId] || 0;
  },
  setReadingProgress(chapterId, scrollPosition) {
    const progress = this.get(STORAGE_KEYS.READING_PROGRESS, {});
    progress[chapterId] = scrollPosition;
    return this.set(STORAGE_KEYS.READING_PROGRESS, progress);
  },
  clearReadingProgress() { return this.remove(STORAGE_KEYS.READING_PROGRESS); },
};
