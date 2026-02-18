import { useParams } from 'react-router-dom';
import { ReaderLayout } from '../components/layout/ReaderLayout';
import { ChapterContent } from '../components/reader/ChapterContent';
import { ChapterNav } from '../components/navigation/ChapterNav';
import { ProgressBar } from '../components/reader/ProgressBar';
import { ReadingSettings } from '../components/reader/ReadingSettings';
import { useFontSize } from '../hooks/useFontSize';

export function Reader() {
  const { chapterNumber } = useParams();
  const { fontSizeClass } = useFontSize();

  return (
    <ReaderLayout>
      <ProgressBar chapterId={chapterNumber} />
      <div className="container mx-auto px-4 py-8 max-w-reading">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text-primary">阅读中</h1>
          <ReadingSettings />
        </div>
        <ChapterContent chapterNumber={chapterNumber} fontSizeClass={fontSizeClass} />
        <div className="mt-8">
          <ChapterNav currentChapterNumber={chapterNumber} />
        </div>
      </div>
    </ReaderLayout>
  );
}
