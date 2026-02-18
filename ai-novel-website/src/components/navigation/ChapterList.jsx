import { Link, useLocation } from 'react-router-dom';
import { getAllChapters } from '../../utils/chapterParser';

export function ChapterList() {
  const location = useLocation();
  const chapters = getAllChapters();
  const currentPage = parseInt(new URLSearchParams(location.search).get('page') || '1');
  const CHAPTERS_PER_PAGE = 20;

  const totalPages = Math.ceil(chapters.length / CHAPTERS_PER_PAGE);
  const startIndex = (currentPage - 1) * CHAPTERS_PER_PAGE;
  const visibleChapters = chapters.slice(startIndex, startIndex + CHAPTERS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-text-primary mb-2">全部章节</h1>
      <p className="text-text-tertiary mb-8">共 {chapters.length} 章</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleChapters.map((chapter) => (
          <Link
            key={chapter.id}
            to={`/chapter/${chapter.number}`}
            className="group block p-4 rounded-lg border border-border-light hover:border-accent-primary hover:bg-bg-tertiary transition-theme cursor-pointer"
          >
            <span className="text-sm text-accent-primary font-semibold">第{chapter.number}章</span>
            <h3 className="mt-1 text-text-primary group-hover:text-accent-primary transition-theme line-clamp-2">{chapter.title}</h3>
            <p className="mt-2 text-xs text-text-tertiary">{chapter.wordCount}字</p>
          </Link>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Link to={`?page=${currentPage - 1}`} className={`px-4 py-2 rounded-lg border border-border-medium text-text-secondary transition-theme cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-bg-tertiary'}`}>上一页</Link>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link key={page} to={`?page=${page}`} className={`w-10 h-10 flex items-center justify-center rounded-lg transition-theme cursor-pointer ${page === currentPage ? 'bg-accent-primary text-white' : 'text-text-secondary hover:bg-bg-tertiary'}`}>{page}</Link>
            ))}
          </div>
          <Link to={`?page=${currentPage + 1}`} className={`px-4 py-2 rounded-lg border border-border-medium text-text-secondary transition-theme cursor-pointer ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-bg-tertiary'}`}>下一页</Link>
        </div>
      )}
    </div>
  );
}
