import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Reader } from './pages/Reader';
import { ChapterListPage } from './pages/ChapterList';
import { storage } from './utils/storage';

function App() {
  // Initialize theme on app load
  useEffect(() => {
    const theme = storage.getTheme();
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapters" element={<ChapterListPage />} />
        <Route path="/chapters/:chapterNumber" element={<Reader />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
