import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import chaptersData from '../data/chapters.json';
import { remark } from 'remark';
import html from 'remark-html';

export function Reader() {
  const { chapterNumber } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        
        const filename = chapterInfo.filename.replace('.md', '');
        const response = await fetch(`/ai-novel-lab/chapter/${filename}.md`);
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
    <div className="reader-container">
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
