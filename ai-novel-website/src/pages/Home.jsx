import { useState } from 'react';
import { Link } from 'react-router-dom';
import chaptersData from '../data/chapters.json';
import { useBookmarks } from '../hooks/useBookmarks';

export function Home() {
  const { novel, chapters } = chaptersData;
  const latestChapters = chapters.slice(-5).reverse();
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1 className="novel-title">{novel.title}</h1>
        <p className="novel-author">作者：{novel.author}</p>
        <p className="novel-description">{novel.description}</p>
        <div className="novel-stats">
          <span className="stat-item">共 {novel.totalChapters} 章</span>
        </div>
        <div className="cta-buttons">
          <Link to={`/chapter/${chapters[0]?.id}`} className="btn btn-primary">
            开始阅读
          </Link>
          <Link to="/chapters" className="btn btn-secondary">
            章节目录
          </Link>
        </div>
      </div>

      {/* 书签列表 */}
      {bookmarks.length > 0 && (
        <div className="bookmarks-section">
          <h2 className="section-title">我的收藏</h2>
          <div className="chapter-list">
            {bookmarks.map((bookmark) => (
              <div key={bookmark.chapterId} className="chapter-item bookmark-item">
                <Link
                  to={`/chapter/${bookmark.chapterId}`}
                  className="bookmark-link"
                >
                  <span className="chapter-number">★ 第{bookmark.chapterNumber}章</span>
                  <span className="chapter-title">{bookmark.title}</span>
                </Link>
                <button
                  className="btn-remove-bookmark"
                  onClick={(e) => {
                    e.preventDefault();
                    removeBookmark(bookmark.chapterId);
                  }}
                  aria-label="移除书签"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="latest-chapters">
        <h2 className="section-title">最新章节</h2>
        <div className="chapter-list">
          {latestChapters.map((chapter) => (
            <Link
              key={chapter.id}
              to={`/chapter/${chapter.id}`}
              className="chapter-item"
            >
              <span className="chapter-number">第{chapter.number}章</span>
              <span className="chapter-title">{chapter.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
