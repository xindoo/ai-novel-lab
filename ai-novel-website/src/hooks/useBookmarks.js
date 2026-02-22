import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';

export function useBookmarks() {
  const [bookmarks, setBookmarksState] = useState(() => storage.getBookmarks());

  // 保存到 localStorage
  useEffect(() => {
    storage.setBookmarks(bookmarks);
  }, [bookmarks]);

  // 添加书签
  const addBookmark = useCallback((bookmark) => {
    setBookmarksState(prev => {
      if (prev.find(b => b.chapterId === bookmark.chapterId)) {
        return prev;
      }
      return [...prev, { ...bookmark, createdAt: Date.now() }];
    });
  }, []);

  // 移除书签
  const removeBookmark = useCallback((chapterId) => {
    setBookmarksState(prev => prev.filter(b => b.chapterId !== chapterId));
  }, []);

  // 切换书签状态
  const toggleBookmark = useCallback((bookmark) => {
    setBookmarksState(prev => {
      const exists = prev.find(b => b.chapterId === bookmark.chapterId);
      if (exists) {
        return prev.filter(b => b.chapterId !== bookmark.chapterId);
      }
      return [...prev, { ...bookmark, createdAt: Date.now() }];
    });
  }, []);

  // 检查是否已书签
  const isBookmarked = useCallback((chapterId) => {
    return bookmarks.some(b => b.chapterId === chapterId);
  }, [bookmarks]);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    setBookmarks: setBookmarksState
  };
}
