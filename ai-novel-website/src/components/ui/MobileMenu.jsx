import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAllChapters } from '../../utils/chapterParser';

export function MobileMenu({ isOpen, onClose }) {
  const location = useLocation();
  const chapters = getAllChapters();
  const [currentPage, setCurrentPage] = useState(0);
  const CHAPTERS_PER_PAGE = 20;

  const totalPages = Math.ceil(chapters.length / CHAPTERS_PER_PAGE);
  const startIndex = currentPage * CHAPTERS_PER_PAGE;
  const visibleChapters = chapters.slice(startIndex, startIndex + CHAPTERS_PER_PAGE);

  const handleChapterClick = () => onClose();
  const goToPage = (page) => setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-80 bg-bg-primary shadow-lg transition-theme">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border-medium">
            <h2 className="text-lg font-semibold text-text-primary">目录</h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-bg-tertiary cursor-pointer transition-theme" aria-label="关闭菜单">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {visibleChapters.map((chapter) => (
                <li key={chapter.id}>
                  <Link
                    to={`/chapter/${chapter.number}`}
                    onClick={handleChapterClick}
                    className={`block p-3 rounded-lg transition-theme cursor-pointer ${
                      location.pathname === `/chapter/${chapter.number}`
                        ? 'bg-accent-primary/10 text-accent-primary'
                        : 'hover:bg-bg-tertiary text-text-secondary'
                    }`}
                  >
                    <span className="text-sm">第{chapter.number}章</span>
                    <p className="text-sm truncate">{chapter.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-border-medium">
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 0} className="px-4 py-2 rounded-lg bg-bg-tertiary text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-border-medium transition-theme cursor-pointer">上一页</button>
              <span className="text-sm text-text-tertiary">{currentPage + 1} / {totalPages}</span>
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages - 1} className="px-4 py-2 rounded-lg bg-bg-tertiary text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-border-medium transition-theme cursor-pointer">下一页</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
