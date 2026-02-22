import { useState } from 'react';
import { Link } from 'react-router-dom';
import chaptersData from '../data/chapters.json';
import { useBookmarks } from '../hooks/useBookmarks';

const CHAPTERS_PER_PAGE = 20;

export function ChapterListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { chapters, novel } = chaptersData;
  const { isBookmarked } = useBookmarks();
  
  const totalPages = Math.ceil(chapters.length / CHAPTERS_PER_PAGE);
  const startIndex = (currentPage - 1) * CHAPTERS_PER_PAGE;
  const endIndex = startIndex + CHAPTERS_PER_PAGE;
  const currentChapters = chapters.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="chapter-list-page">
      <div className="chapter-list-header">
        <h1 className="chapter-list-title">{novel.title}</h1>
        <p className="chapter-list-subtitle">章节目录</p>
        <Link to="/" className="btn btn-secondary">返回首页</Link>
      </div>

      <div className="chapter-list-container">
        <div className="chapter-list">
          {currentChapters.map((chapter) => (
            <Link
              key={chapter.id}
              to={`/chapter/${chapter.id}`}
              className="chapter-list-item"
            >
              <span className="chapter-num">
                {isBookmarked(chapter.id) && <span className="bookmark-indicator">★</span>}
                第{chapter.number}章
              </span>
              <span className="chapter-name">{chapter.title}</span>
              <span className="chapter-words">{chapter.wordCount}字</span>
            </Link>
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-pagination"
          >
            上一页
          </button>
          <span className="page-info">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-pagination"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  );
}
