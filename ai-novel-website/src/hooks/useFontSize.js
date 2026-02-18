import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const FONT_SIZES = { sm: 'chinese-sm', md: 'chinese-base', lg: 'chinese-lg', xl: 'chinese-xl' };

export function useFontSize() {
  const [fontSize, setFontSizeState] = useState(() => storage.getFontSize() || 'md');

  useEffect(() => { storage.setFontSize(fontSize); }, [fontSize]);

  const setFontSize = (size) => { if (FONT_SIZES[size]) setFontSizeState(size); };

  const increaseFontSize = () => {
    setFontSizeState(prev => {
      const sizes = Object.keys(FONT_SIZES);
      const currentIndex = sizes.indexOf(prev);
      return sizes[Math.min(currentIndex + 1, sizes.length - 1)];
    });
  };

  const decreaseFontSize = () => {
    setFontSizeState(prev => {
      const sizes = Object.keys(FONT_SIZES);
      const currentIndex = sizes.indexOf(prev);
      return sizes[Math.max(currentIndex - 1, 0)];
    });
  };

  return { fontSize, fontSizeClass: FONT_SIZES[fontSize], setFontSize, increaseFontSize, decreaseFontSize };
}
