import { useNavigate } from 'react-router-dom';
import { getPrevChapter, getNextChapter } from '../../utils/chapterParser';

export function ChapterNav({ currentChapterNumber }) {
  const navigate = useNavigate();
  const prevChapter = getPrevChapter(currentChapterNumber);
  const nextChapter = getNextChapter(currentChapterNumber);

  const goToPrevChapter = () => { if (prevChapter) navigate(`/chapter/${prevChapter.number}`); };
  const goToNextChapter = () => { if (nextChapter) navigate(`/chapter/${nextChapter.number}`); };
  const goToContents = () => navigate('/');

  return (
    <div className="flex items-center justify-between gap-4 py-4 border-t border-b border-border-light">
      <button onClick={goToPrevChapter} disabled={!prevChapter} className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg border border-border-medium text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-tertiary hover:border-accent-primary transition-theme cursor-pointer">
        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <div className="text-left overflow-hidden">
          <p className="text-xs text-text-tertiary">上一章</p>
          <p className="text-sm truncate">{prevChapter?.title || '无'}</p>
        </div>
      </button>
      <button onClick={goToContents} className="px-4 py-3 rounded-lg bg-accent-primary text-white hover:bg-accent-primary/90 transition-theme cursor-pointer">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      </button>
      <button onClick={goToNextChapter} disabled={!nextChapter} className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg border border-border-medium text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-tertiary hover:border-accent-primary transition-theme cursor-pointer">
        <div className="text-right overflow-hidden">
          <p className="text-xs text-text-tertiary">下一章</p>
          <p className="text-sm truncate">{nextChapter?.title || '无'}</p>
        </div>
        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
