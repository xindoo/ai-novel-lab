import { Link } from 'react-router-dom';
import { getNovelInfo, getAllChapters } from '../utils/chapterParser';

export function Home() {
  const novelInfo = getNovelInfo();
  const chapters = getAllChapters();
  const latestChapters = chapters.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-bg-primary transition-theme">
      <div className="bg-gradient-to-b from-accent-primary/10 to-bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-accent-primary flex items-center justify-center shadow-lg">
              <svg className="w-20 h-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">{novelInfo.title}</h1>
            <p className="text-lg text-text-secondary mb-8">{novelInfo.description}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={`/chapter/${chapters[0].number}`} className="px-8 py-3 rounded-lg bg-accent-primary text-white font-semibold hover:bg-accent-primary/90 transition-theme cursor-pointer shadow-md">开始阅读</Link>
              <Link to="/chapters" className="px-8 py-3 rounded-lg border-2 border-accent-primary text-accent-primary font-semibold hover:bg-accent-primary/10 transition-theme cursor-pointer">查看全部章节</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-lg bg-bg-secondary">
            <div className="text-3xl font-bold text-accent-primary mb-2">{novelInfo.totalChapters}</div>
            <div className="text-text-tertiary">总章节</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-bg-secondary">
            <div className="text-3xl font-bold text-accent-primary mb-2">{chapters.reduce((sum, ch) => sum + ch.wordCount, 0).toLocaleString()}</div>
            <div className="text-text-tertiary">总字数</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-bg-secondary">
            <div className="text-3xl font-bold text-accent-primary mb-2">连载中</div>
            <div className="text-text-tertiary">状态</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-bg-secondary">
            <div className="text-3xl font-bold text-accent-primary mb-2">都市重生</div>
            <div className="text-text-tertiary">类型</div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-2xl font-bold text-text-primary mb-6">最新更新</h2>
        <div className="space-y-3">
          {latestChapters.map((chapter) => (
            <Link key={chapter.id} to={`/chapter/${chapter.number}`} className="block p-4 rounded-lg border border-border-light hover:border-accent-primary hover:bg-bg-tertiary transition-theme cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-accent-primary font-semibold">第{chapter.number}章</span>
                  <span className="mx-2 text-text-tertiary">·</span>
                  <span className="text-text-secondary">{chapter.title}</span>
                </div>
                <span className="text-xs text-text-tertiary">{chapter.wordCount}字</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/chapters" className="text-accent-primary hover:underline cursor-pointer">查看全部章节 →</Link>
        </div>
      </div>
    </div>
  );
}
