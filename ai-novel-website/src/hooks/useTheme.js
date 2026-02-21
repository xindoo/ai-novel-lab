import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export function useTheme() {
  const [theme, setThemeState] = useState(() => storage.getTheme() || 'light');

  useEffect(() => {
    storage.setTheme(theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setThemeState(newTheme);
    }
  };

  return { theme, isDark: theme === 'dark', isLight: theme === 'light', toggleTheme, setTheme };
}
