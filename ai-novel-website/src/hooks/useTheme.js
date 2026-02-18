import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    const savedTheme = storage.getTheme();
    if (savedTheme) return savedTheme;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    storage.setTheme(theme);
  }, [theme]);

  const setTheme = (newTheme) => setThemeState(newTheme);
  const toggleTheme = () => setThemeState(prev => prev === 'light' ? 'dark' : 'light');

  return { theme, setTheme, toggleTheme };
}
