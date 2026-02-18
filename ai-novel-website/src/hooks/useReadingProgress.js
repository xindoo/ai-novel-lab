import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export function useReadingProgress(chapterId) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!chapterId) return;
    const savedProgress = storage.getReadingProgress(chapterId);
    setProgress(savedProgress);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
      storage.setReadingProgress(chapterId, scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapterId]);

  return { progress };
}
