import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Reader } from './pages/Reader';
import { ChapterListPage } from './pages/ChapterList';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapters" element={<ChapterListPage />} />
        <Route path="/chapter/:chapterNumber" element={<Reader />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
