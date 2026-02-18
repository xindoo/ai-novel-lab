import { useReadingProgress } from '../../hooks/useReadingProgress';

export function ProgressBar({ chapterId }) {
  const { progress } = useReadingProgress(chapterId);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-bg-tertiary z-50">
      <div className="h-full bg-accent-primary transition-all duration-150" style={{ width: `${progress}%` }} />
    </div>
  );
}
