import { useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';

export function ChapterContent({ chapterNumber, fontSizeClass }) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChapter() {
      setLoading(true);
      try {
        const paddedNumber = String(chapterNumber).padStart(3, '0');
        const files = import.meta.glob('../../chapter/*.md', { eager: true, as: 'raw' });
        
        let chapterFile = null;
        for (const [path, fileContent] of Object.entries(files)) {
          const filename = path.split('/').pop();
          if (filename.startsWith(paddedNumber)) {
            chapterFile = { path, content: fileContent, filename };
            break;
          }
        }

        if (!chapterFile) {
          setContent('章节文件未找到');
          setTitle(`第${chapterNumber}章`);
          setLoading(false);
          return;
        }

        const processed = await remark().use(html).process(chapterFile.content);
        const htmlContent = processed.toString();
        const titleMatch = chapterFile.content.match(/^##\s+(.+)$/m);
        const chapterTitle = titleMatch ? titleMatch[1] : `第${chapterNumber}章`;
        
        setContent(htmlContent);
        setTitle(chapterTitle);
      } catch (error) {
        console.error('Error loading chapter:', error);
        setContent('加载章节失败');
        setTitle(`第${chapterNumber}章`);
      } finally {
        setLoading(false);
      }
    }

    loadChapter();
  }, [chapterNumber]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <article className={`reader-content ${fontSizeClass}`}>
      <h2>{title}</h2>
      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
