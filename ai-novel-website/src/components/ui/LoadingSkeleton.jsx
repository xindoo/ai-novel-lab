export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-bg-tertiary rounded w-3/4"></div>
      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-4 bg-bg-tertiary rounded"></div>
        ))}
      </div>
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-4 bg-bg-tertiary rounded"></div>
        ))}
      </div>
    </div>
  );
}
