import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import chaptersData from '../data/chapters.json';
import { remark } from 'remark';
import html from 'remark-html';
import { useFontSize } from '../hooks/useFontSize';
import { useTheme } from '../hooks/useTheme';
import { useBookmarks } from '../hooks/useBookmarks';

export function Reader() {
  const { chapterNumber } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { fontSizeClass, fontSizeLabel, increaseFontSize, decreaseFontSize, canDecrease, canIncrease } = useFontSize();
  const { theme, setTheme } = useTheme();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const chapter = chaptersData.chapters.find(c => c.id === chapterNumber);
  const chapterIndex = chaptersData.chapters.findIndex(c => c.id === chapterNumber);
  const prevChapter = chapterIndex > 0 ? chaptersData.chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < chaptersData.chapters.length - 1 ? chaptersData.chapters[chapterIndex + 1] : null;

  useEffect(() => {
    async function loadChapter() {
      try {
        setLoading(true);
        setError(null);
        
        // Find the chapter file by matching the chapter number
        const chapterInfo = chaptersData.chapters.find(c => c.id === chapterNumber);
        if (!chapterInfo) {
          throw new Error('章节不存在');
        }
        
        const filename = chapterInfo.filename;
        const response = await fetch(`/ai-novel-lab/chapter/${encodeURIComponent(filename)}`);
        if (!response.ok) {
          throw new Error('章节加载失败');
        }
        
        const markdown = await response.text();
        const processed = await remark().use(html).process(markdown);
        setContent(processed.toString());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (chapterNumber) {
      loadChapter();
    }
  }, [chapterNumber]);

  if (loading) {
    return <div className="reader-loading">加载中...</div>;
  }

  if (error || !chapter) {
    return (
      <div className="reader-error">
        <h2>章节不存在</h2>
        <p>{error || '找不到该章节'}</p>
        <Link to="/chapters" className="btn btn-primary">返回目录</Link>
      </div>
    );
  }

  return (
    <div className={`reader-container ${fontSizeClass}`}>
      <div className="reader-header">
        <h1 className="reader-title">第{chapter.number}章 {chapter.title}</h1>
        <div className="reader-nav">
          {prevChapter ? (
            <Link to={`/chapter/${prevChapter.id}`} className="btn btn-nav">
              ← 上一章
            </Link>
          ) : (
            <span className="btn btn-nav disabled">← 上一章</span>
          )}
          <Link to="/chapters" className="btn btn-nav">目录</Link>
          {nextChapter ? (
            <Link to={`/chapter/${nextChapter.id}`} className="btn btn-nav">
              下一章 →
            </Link>
          ) : (
            <span className="btn btn-nav disabled">下一章 →</span>
          )}
        </div>
      </div>

      {/* 阅读设置工具栏 */}
      <div className="reader-settings-bar">
        <div className="settings-group">
          <span className="settings-label">字号</span>
          <button
            className={`btn-settings ${!canDecrease ? 'disabled' : ''}`}
            onClick={decreaseFontSize}
            disabled={!canDecrease}
            aria-label="减小字号"
          >
            A-
          </button>
          <span className="font-size-indicator">{fontSizeLabel}</span>
          <button
            className={`btn-settings ${!canIncrease ? 'disabled' : ''}`}
            onClick={increaseFontSize}
            disabled={!canIncrease}
            aria-label="增大字号"
          >
            A+
          </button>
        </div>

        <div className="settings-group">
          <span className="settings-label">主题</span>
          <button
            className={`btn-settings ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
            aria-label="日间模式"
          >
            ☀ 日间
          </button>
          <button
            className={`btn-settings ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
            aria-label="夜间模式"
          >
            ☾ 夜间
          </button>
        </div>

        <div className="settings-group">
          <button
            className={`btn-settings btn-bookmark ${isBookmarked(chapterNumber) ? 'bookmarked' : ''}`}
            onClick={() => toggleBookmark({
              chapterId: chapter.id,
              chapterNumber: chapter.number,
              title: chapter.title
            })}
            aria-label={isBookmarked(chapterNumber) ? "取消书签" : "添加书签"}
          >
            {isBookmarked(chapterNumber) ? '★ 已收藏' : '☆ 收藏'}
          </button>
        </div>
      </div>

      <article
        className="reader-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="reader-footer">
        <div className="reader-nav-bottom">
          {prevChapter ? (
            <Link to={`/chapter/${prevChapter.id}`} className="btn btn-nav">
              ← 上一章
            </Link>
          ) : (
            <span className="btn btn-nav disabled">← 上一章</span>
          )}
          <Link to="/chapters" className="btn btn-nav">目录</Link>
          {nextChapter ? (
            <Link to={`/chapter/${nextChapter.id}`} className="btn btn-nav">
              下一章 →
            </Link>
          ) : (
            <span className="btn btn-nav disabled">下一章 →</span>
          )}
        </div>
      </div>
    </div>
  );
}
