import { ReaderLayout } from '../components/layout/ReaderLayout';
import { ChapterList as ChapterListComponent } from '../components/navigation/ChapterList';

export function ChapterListPage() {
  return (
    <ReaderLayout>
      <ChapterListComponent />
    </ReaderLayout>
  );
}
