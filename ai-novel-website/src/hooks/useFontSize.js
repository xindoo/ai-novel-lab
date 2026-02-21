import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const FONT_SIZES = { sm: 'text-size-sm', md: 'text-size-md', lg: 'text-size-lg', xl: 'text-size-xl' };
const FONT_SIZE_LABELS = { sm: '小', md: '中', lg: '大', xl: '特大' };
const FONT_SIZE_VALUES = ['sm', 'md', 'lg', 'xl'];

export function useFontSize() {
  const [fontSize, setFontSizeState] = useState(() => storage.getFontSize() || 'md');

  useEffect(() => { storage.setFontSize(fontSize); }, [fontSize]);

  const setFontSize = (size) => { if (FONT_SIZES[size]) setFontSizeState(size); };

  const increaseFontSize = () => {
    setFontSizeState(prev => {
      const currentIndex = FONT_SIZE_VALUES.indexOf(prev);
      return FONT_SIZE_VALUES[Math.min(currentIndex + 1, FONT_SIZE_VALUES.length - 1)];
    });
  };

  const decreaseFontSize = () => {
    setFontSizeState(prev => {
      const currentIndex = FONT_SIZE_VALUES.indexOf(prev);
      return FONT_SIZE_VALUES[Math.max(currentIndex - 1, 0)];
    });
  };

  const canDecrease = FONT_SIZE_VALUES.indexOf(fontSize) > 0;
  const canIncrease = FONT_SIZE_VALUES.indexOf(fontSize) < FONT_SIZE_VALUES.length - 1;

  return {
    fontSize,
    fontSizeClass: FONT_SIZES[fontSize],
    fontSizeLabel: FONT_SIZE_LABELS[fontSize],
    setFontSize,
    increaseFontSize,
    decreaseFontSize,
    canDecrease,
    canIncrease,
    FONT_SIZE_VALUES,
    FONT_SIZE_LABELS
  };
}
